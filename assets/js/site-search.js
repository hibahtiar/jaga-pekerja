/* =====================================================================
   PENCARIAN GABUNGAN (beranda, panel Cari di semua halaman, hub simulasi, 404)
   Satu kotak pencarian untuk:
   1. Layanan & panduan        → data/layanan.js
   2. Pekerjaan BPU            → data/bpu-pekerjaan.js  (deep link ?pekerjaan=)
   3. Jenis usaha PU / Jakon   → data/kamus-usaha-pu.js + finder-engine.js (?q=)
   4. Arahan segmen (BPU/PMI/Jakon) dari lexicon kamus
   Kamus & mesin dimuat otomatis bila belum ada di halaman.

   Cara kerja singkat:
   - Kata layanan ("klaim", "daftar", "formulir"…) dicocokkan dulu ke indeks layanan.
   - Sisa kata (entitas) dicari sebagai pekerjaan BPU dan jenis usaha PU.
   - Niat + entitas digabung: "daftar ojol" → Daftar BPU; "iuran bengkel" → Simulasi PU.
   - Bila segmen terdeteksi, halaman segmen ikut disarankan sebagai jembatan informasi.
   ===================================================================== */
(function(){
  'use strict';
  var SH = window.SH;
  var ROMAN = ['','I','II','III','IV','V'];
  var engPromise = null, eng = null, prepared = false;

  function toSet(a){ var o = {}; a.forEach(function(x){ o[x] = 1; }); return o; }
  /* kata sambung/sapaan yang diabaikan saat mencocokkan layanan dan entitas */
  var SERVICE_STOP = toSet(['saya','aku','kami','kita','anda','mau','ingin','cara','bagaimana','gimana','yang','di','ke','dari','pada','untuk','bagi','dengan','dan','atau','apa','apakah','bisa','bisakah','tolong','dong','nya','info','informasi','tentang','bpjs','ketenagakerjaan','bpjstk','jamsostek','kerja','bekerja','sebagai','jadi','ini','itu','ada','agar','supaya','sudah','belum','mohon','minta','gak','nggak','tidak','kalau','kalo','bagaimanakah','dimana','mana','setelah','sesudah','sebelum','saat','ketika','telah','akan','harus','perlu','boleh','dapat','lagi','masih']);
  /* niat: mendaftar, menghitung iuran, klaim */
  var INTENT_DAFTAR = toSet(['daftar','pendaftaran','mendaftar','daftarkan','didaftarkan','registrasi','gabung','ikut']);
  var INTENT_HITUNG = toSet(['iuran','simulasi','hitung','menghitung','berapa','biaya','tarif','kalkulator','premi','bayar']);
  var INTENT_KLAIM = toSet(['klaim','cair','cairkan','pencairan','mencairkan','santunan']);
  var DAFTAR_DOC = { pu:'daftar-pu', bpu:'daftar-bpu', jakon:'daftar-jakon', pmi:'daftar-pmi' };
  var SEG_INFO = { pu:['Penerima Upah (PU)','building'], bpu:['Pekerja mandiri (BPU)','user'], jakon:['Jasa Konstruksi','helmet'], pmi:['Pekerja Migran Indonesia (PMI)','plane'] };
  var KAT_ICON = { 'Simulasi':'calculator', 'Pendaftaran':'userplus', 'Klaim':'wallet', 'Administrasi':'users', 'SIPP':'monitor', 'JMO':'smartphone',
    'Formulir':'file', 'Peraturan':'scale', 'Kontak':'headset', 'Kanal resmi':'external', 'Program':'shield', 'Segmen peserta':'layers', 'Pengelola':'settings' };

  function load(src){ return SH.loadScript ? SH.loadScript(src) : new Promise(function(res, rej){ var s = document.createElement('script'); s.src = src; s.onload = res; s.onerror = function(){ rej(new Error('Gagal memuat ' + src)); }; document.head.appendChild(s); }); }
  function ensureEngine(){
    if(eng) return Promise.resolve(eng);
    if(!engPromise){
      engPromise = (window.KAMUS_USAHA_PU ? Promise.resolve() : load('data/kamus-usaha-pu.js'))
        .then(function(){ return window.createFinderEngine ? null : load('assets/js/finder-engine.js'); })
        .then(function(){ eng = window.createFinderEngine(window.KAMUS_USAHA_PU); prepare(); return eng; });
      engPromise.catch(function(){ engPromise = null; });
    }
    return engPromise;
  }
  function containsSeq(hay, needle){
    if(!needle.length || needle.length > hay.length) return false;
    outer: for(var i = 0; i <= hay.length - needle.length; i++){
      for(var j = 0; j < needle.length; j++) if(hay[i+j] !== needle[j]) continue outer;
      return true;
    }
    return false;
  }
  function stemSet(tokens){ var s = new Set(); tokens.forEach(function(t){ eng.stems(t).forEach(function(x){ s.add(x); }); }); return s; }
  function clean(tokens){ return tokens.filter(function(t){ return !SERVICE_STOP[t]; }); }

  /* ---------- persiapan indeks ---------- */
  var SERVICES = [], BYID = {}, JOBS = [], SITE_TOK = new Set();
  function prepare(){
    if(prepared) return; prepared = true;
    ((window.LAYANAN_INDEX || {}).docs || []).forEach(function(d){
      var kata = (d.kata || []).map(function(k){ return eng.canon(k); }).filter(function(k){ return k.length; });
      var title = eng.canon(d.judul);
      var toks = new Set(); kata.forEach(function(k){ k.forEach(function(t){ toks.add(t); }); }); title.forEach(function(t){ toks.add(t); });
      toks.forEach(function(t){ SITE_TOK.add(t); });
      var x = { d: d, kata: kata, toks: toks, stems: stemSet(Array.from(toks)) };
      SERVICES.push(x); BYID[d.id] = x;
    });
    ((window.BPU_PEKERJAAN || {}).groups || []).forEach(function(g){
      g.jobs.forEach(function(j){
        var kata = (j.kata || []).concat([j.label]).map(function(k){ return clean(eng.canon(k)); }).filter(function(k){ return k.length; });
        kata.forEach(function(k){ k.forEach(function(t){ SITE_TOK.add(t); }); });
        JOBS.push({ g: g, j: j, kata: kata });
      });
    });
  }

  /* ---------- skor layanan ----------
     frasa: 100 bila sama persis; 30–75 bila frasa kata kunci terkandung di kueri; 25 bila kueri awalan frasa.
     cakupan: porsi kata kueri (tanpa kata sambung) yang dikenal dokumen, dikuadratkan agar cakupan penuh unggul. */
  function scoreService(x, q){
    var phrase = 0, used = [];
    x.kata.forEach(function(k){
      var kt = k.join(' ');
      if(kt === q.text){ phrase = 100; used.push(k); }
      else if(k.length <= q.toks.length && containsSeq(q.toks, k)){
        phrase = Math.max(phrase, 30 + 15 * Math.min(k.length, 3) * Math.min(1, k.length / q.n)); used.push(k);
      }
      else if(q.text.length >= 3 && kt.indexOf(q.text) === 0) phrase = Math.max(phrase, 25);
    });
    var hit = 0, n = 0;
    q.toks.forEach(function(t){
      if(SERVICE_STOP[t]) return; n++;
      if(x.toks.has(t)) hit++;
      else { var ok = false; eng.stems(t).forEach(function(s){ if(x.stems.has(s)) ok = true; }); if(ok) hit += 0.8; }
    });
    var cov = n ? hit / n : 0;
    if(phrase === 0 && cov < 0.85) return null;
    return { score: phrase + 80 * cov * cov, exact: phrase === 100, used: used };
  }

  /* ---------- jenis usaha PU (mesin Business Finder) ----------
     Koreksi ejaan mesin PU diabaikan bila kata itu sebenarnya kata layanan/pekerjaan
     (mis. "sipp" jangan dikoreksi menjadi "siap"). */
  function puSearch(text){
    var res = eng.search(text), guard = 0;
    while(res.corrected && res.corrected.length && guard++ < 3){
      var bad = res.corrected.filter(function(c){ return SITE_TOK.has(c.from); }).map(function(c){ return c.from; });
      if(!bad.length) break;
      var rest = eng.canon(text).filter(function(t){ return bad.indexOf(t) < 0; });
      if(!rest.length) return null;
      text = rest.join(' '); res = eng.search(text);
    }
    res.text = text;
    return res;
  }

  /* ---------- pekerjaan BPU ---------- */
  function scoreJob(x, toks){
    var text = toks.join(' '), best = 0;
    x.kata.forEach(function(k){
      var kt = k.join(' '), s = 0;
      if(kt === text) s = 95;
      else if(k.length >= 2 && containsSeq(toks, k)) s = Math.min(90, 60 + 10 * k.length);
      else if(k.length === 1 && toks.indexOf(k[0]) >= 0) s = 58;
      if(s > best) best = s;
    });
    return best;
  }
  function matchJobs(toks, res){
    var hits = [];
    JOBS.forEach(function(x){
      var s = scoreJob(x, toks);
      if(!s && res && res.analysis && res.analysis.corrected.length) s = Math.max(0, scoreJob(x, clean(res.analysis.mean)) - 5);
      if(s > 0) hits.push({ x: x, s: s });
    });
    return hits.sort(function(a, b){ return b.s - a.s || a.x.j.label.length - b.x.j.label.length; });
  }

  /* ---------- pencarian ---------- */
  function search(raw){
    var out = { query: raw, items: [], hints: [], tips: [] };
    var toks = eng.canon(raw);
    if(!toks.length) return out;
    var q = { toks: toks, text: toks.join(' '), n: clean(toks).length || 1 };
    var hasDaftar = toks.some(function(t){ return INTENT_DAFTAR[t]; });
    var hasHitung = toks.some(function(t){ return INTENT_HITUNG[t]; });
    var hasKlaim = toks.some(function(t){ return INTENT_KLAIM[t]; });
    var usedTok = {}, exactService = false;

    // 1) layanan & panduan
    SERVICES.forEach(function(x){
      var r = scoreService(x, q);
      if(!r) return;
      var d = x.d;
      if(r.exact) exactService = true;
      r.used.forEach(function(k){ k.forEach(function(t){ usedTok[t] = 1; }); });
      out.items.push({ type:'layanan', id:d.id, kat:d.kat, judul:d.judul, desc:d.desc, score:r.score, exact:r.exact,
        icon: d.ikon || KAT_ICON[d.kat] || 'chevron', href: d.ext ? SH.link(d.ext) : SH.url(d.page, d.query, d.hash), ext: !!d.ext });
    });

    // 2) arahan segmen dari kueri utuh
    var full = eng.search(raw);
    out.hints = full.hints || []; out.tips = full.tips || [];
    var hint = {}; out.hints.forEach(function(h){ hint[h.id] = h; });

    // 3) entitas: kata yang tersisa setelah kata layanan, niat, dan kata sambung dibuang
    var etoks = toks.filter(function(t){ return !SERVICE_STOP[t] && !INTENT_DAFTAR[t] && !INTENT_HITUNG[t] && !usedTok[t]; });
    var res = etoks.length ? puSearch(etoks.join(' ')) : null;
    var jobHits = etoks.length ? matchJobs(etoks, res) : [];
    var seg = {}, segScore = {};   // segmen yang terdeteksi → keyakinan 0..1 & skor entitas utamanya

    jobHits.slice(0, 2).forEach(function(h, k){
      out.items.push({ type:'bpu', kat:'Pekerja mandiri (BPU)', judul:h.x.j.label, entity:true, icon:'user',
        desc:'Simulasi iuran BPU dengan pekerjaan ini sudah terpilih. Untuk yang bekerja sendiri tanpa pemberi kerja.',
        score:h.s, href:SH.url('bpu', {pekerjaan:h.x.j.id}) });
      if(k === 0){ seg.bpu = h.s >= 95 ? 1 : 0.7; segScore.bpu = h.s; }
    });

    if(res && res.status === 'route'){
      out.items.push({ type:'pu', kat:'Jasa Konstruksi', judul:'Proyek jasa konstruksi', entity:true, icon:'helmet',
        desc:'Bedakan pekerja proyek dan karyawan tetap, lalu hitung iurannya.', score:90, href:SH.url('pu', {view:'konstruksi'}) });
      seg.jakon = 1; segScore.jakon = 90;
    } else if(res && ['strong','consensus','weak','question'].indexOf(res.status) >= 0 && res.candidates.length){
      var top = res.candidates[0], e = top.e, pu;
      var fix = (res.corrected || []).length ? ' Ejaan disesuaikan: ' + res.corrected.map(function(c){ return c.from + ' → ' + c.to; }).join(', ') + '.' : '';
      var base = { type:'pu', kat:'Jenis usaha · Penerima Upah', href:SH.url('pu', {q:res.text}), entity:true, status:res.status, icon:'building' };
      if(res.status === 'question'){
        pu = Object.assign(base, { judul:'“' + res.text + '” — pilih kegiatan usahanya', desc:res.question.title + ' Jawab satu pertanyaan untuk menentukan kelompok risiko.' + fix, score:74 });
      } else {
        var sameAll = res.candidates.length > 1 && res.candidates.every(function(c){ return c.e.group === e.group; });
        pu = Object.assign(base, { judul:e.official_name,
          desc:(top.label ? 'Dikenali dari “' + top.label + '”. ' : '') + 'Kelompok risiko ' + ROMAN[e.group] + ' · JKK ' + String(e.jkk_percent).replace('.', ',') +
               (top.viaInferred ? ' · kategori terdekat, perlu konfirmasi' : '') + (sameAll ? ' · kandidat lain bertarif sama' : '') + '.' + fix,
          score: res.status === 'strong' ? 88 : res.status === 'consensus' ? 82 : 52 });
      }
      var bpuFirst = !!(hint.bpu && jobHits.length);   // kueri bernuansa pekerja mandiri: PU jadi alternatif
      if(bpuFirst) pu.score = Math.min(pu.score, jobHits[0].s - 1);
      // kueri campuran ("lupa kata sandi jmo", "beasiswa anak sekolah"): kata layanan (bukan niat) sudah terpakai,
      // jadi tebakan jenis usaha yang masih ragu (question/weak) hanya jadi alternatif di bawah
      var svcUsed = Object.keys(usedTok).some(function(t){ return !INTENT_DAFTAR[t] && !INTENT_HITUNG[t] && !INTENT_KLAIM[t]; });
      var mixedWeak = svcUsed && (res.status === 'question' || res.status === 'weak');
      if(mixedWeak) pu.score = Math.min(pu.score, 40);
      var weak = res.status === 'weak';
      if((pu.score >= 50 || mixedWeak) && !(weak && (exactService || (bpuFirst && jobHits[0].s >= 95)))){
        out.items.push(pu);
        if(!bpuFirst && !mixedWeak){ seg.pu = { strong:0.9, consensus:0.8, question:0.6, weak:0.4 }[res.status]; segScore.pu = pu.score; }
      }
    }

    // 4) arahan segmen sebagai hasil bila belum terwakili
    if(hint.pmi){
      seg.pmi = 1; segScore.pmi = 80;
      if(!out.items.some(function(i){ return i.href.indexOf(SH.url('pmi')) === 0; }))
        out.items.push({ type:'hint', kat:'Pekerja Migran', judul:'Simulasi PMI', desc:hint.pmi.message, score:80, href:SH.url('pmi'), entity:true, icon:'plane' });
    }
    if(hint.bpu && !jobHits.length){
      seg.bpu = seg.bpu || 0.6; segScore.bpu = segScore.bpu || 66;
      out.items.push({ type:'hint', kat:'Pekerja mandiri (BPU)', judul:'Simulasi BPU', desc:hint.bpu.message, score:66, href:SH.url('bpu'), entity:true, icon:'user' });
    }
    if(hint.jakon){
      seg.jakon = seg.jakon || 0.6; segScore.jakon = segScore.jakon || 64;
      if(!out.items.some(function(i){ return i.href.indexOf('view=konstruksi') >= 0; }))
        out.items.push({ type:'hint', kat:'Jasa Konstruksi', judul:'Cek jalur Jasa Konstruksi', desc:hint.jakon.message, score:64, href:SH.url('pu', {view:'konstruksi'}), entity:true, icon:'helmet' });
    }

    // 5) niat + entitas
    if(hasDaftar){
      Object.keys(seg).forEach(function(s){
        var x = BYID[DAFTAR_DOC[s]]; if(!x) return;
        var d = x.d, sc = 120 + 30 * seg[s], href = SH.url(d.page, d.query, d.hash);
        var cur = out.items.filter(function(i){ return i.href === href; })[0];
        if(cur) cur.score = Math.max(cur.score, sc);
        else out.items.push({ type:'layanan', id:d.id, kat:d.kat, judul:d.judul, desc:d.desc, score:sc, href:href, icon:KAT_ICON[d.kat] });
      });
    }
    if(hasHitung) out.items.forEach(function(i){ if(i.entity) i.score += 60; });
    // "klaim ojol": panduan klaim tetap di atas; entitas hanya memperjelas segmen
    if(hasKlaim) out.items.forEach(function(i){ if(i.kat === 'Klaim') i.score += 45; });
    // 6) jembatan: halaman segmen (program, iuran, cara daftar, kontak) disarankan tepat di bawah entitasnya
    if(!hasDaftar && !hasHitung && !hasKlaim){
      Object.keys(segScore).forEach(function(s){
        if(!SEG_INFO[s] || seg[s] < 0.6) return;
        out.items.push({ type:'segmen', kat:'Segmen peserta', judul:'Tentang ' + SEG_INFO[s][0], icon:SEG_INFO[s][1],
          desc:'Program yang diikuti, gambaran iuran, cara daftar, dan kontak petugas.', score:segScore[s] - 3, href:SH.url('segmen-' + s) });
      });
    }

    // urutkan & buang duplikat tautan
    var seen = {};
    out.items = out.items.sort(function(a, b){ return b.score - a.score; }).filter(function(i){
      if(!i.href || seen[i.href]) return false; seen[i.href] = 1; return true;
    }).slice(0, 7);
    return out;
  }

  /* ---------- tampilan ---------- */
  function itemHtml(i, first){
    var I = SH.icon, t = i.ext ? 'ext' : i.type;
    return '<a class="sh-res-item' + (first ? ' top' : '') + '" href="' + SH.esc(i.href) + '"' + (i.ext ? ' target="_blank" rel="noopener noreferrer"' : '') + '>' +
      '<span class="ic t-' + t + '">' + I(i.icon || 'chevron', 'sm') + '</span>' +
      '<span class="sh-res-main"><span class="sh-res-kat">' + SH.esc(i.kat) + (first ? '<span class="sh-res-best">Paling sesuai</span>' : '') + '</span>' +
      '<strong>' + SH.esc(i.judul) + '</strong><span class="sh-res-desc">' + SH.esc(i.desc || '') + (i.ext ? ' Membuka situs resmi.' : '') + '</span></span>' +
      '<span class="sh-res-go">' + I(i.ext ? 'external' : 'chevron', 'xs') + '</span></a>';
  }
  function render(box, out, opts){
    if(!out.query || !out.query.trim()){ box.innerHTML = ''; box.classList.remove('show'); if(opts && opts.onRender) opts.onRender(out); return; }
    var h = '';
    if(out.items.length){
      h += out.items.map(function(i, k){ return itemHtml(i, k === 0); }).join('');
    } else {
      h += '<div class="sh-res-item"><span class="ic">' + SH.icon('info', 'sm') + '</span><span class="sh-res-main"><span class="sh-res-kat">Belum ditemukan</span><strong>Belum ada panduan untuk “' + SH.esc(out.query) + '”</strong>' +
        '<span class="sh-res-desc">Coba kata lain: nama program (JHT, JKK), layanan (daftar, klaim), jenis usaha, atau pekerjaan. Atau minta dihubungi petugas.</span></span>' +
        '<button type="button" class="sh-res-ask" data-ask="1">Konsultasi</button></div>';
    }
    (out.tips || []).forEach(function(t){ h += '<div class="sh-res-note">' + SH.esc(t.message) + '</div>'; });
    box.innerHTML = h; box.classList.add('show');
    if(opts && opts.onRender) opts.onRender(out);
  }

  SH.initSiteSearch = function(opts){
    var form = document.getElementById(opts.form), input = document.getElementById(opts.input), box = document.getElementById(opts.results);
    if(!input || !box) return;
    var root = opts.root || (form ? form.parentNode : document);
    var timer = null, seq = 0;
    box.classList.add('sh-res');
    function run(q, fromSubmit){
      q = (q == null ? input.value : q);
      var my = ++seq;
      if(!q.trim()){ render(box, {query:''}, opts); return; }
      if(!eng){ box.innerHTML = '<div class="sh-res-note">Memuat kamus pencarian…</div>'; box.classList.add('show'); }
      ensureEngine().then(function(){
        if(my !== seq) return;               // hasil ketikan lama tidak menimpa yang baru
        render(box, search(q), opts);
        if(fromSubmit && opts.updateUrl !== false){
          try{ var u = new URL(location.href); u.searchParams.set('q', q); history.replaceState(null, '', u.toString()); }catch(e){}
        }
      }).catch(function(err){ box.innerHTML = '<div class="sh-res-note">' + SH.esc(err.message) + '. Periksa koneksi lalu coba lagi.</div>'; box.classList.add('show'); });
    }
    input.addEventListener('input', function(){ clearTimeout(timer); timer = setTimeout(function(){ run(); }, 120); });
    if(form) form.addEventListener('submit', function(e){
      e.preventDefault(); clearTimeout(timer); run(null, true);
      var first = box.querySelector('.sh-res-item[href]');
      if(first && opts.enterOpens) first.click();
    });
    /* panah bawah/atas: berpindah di antara hasil */
    function links(){ return Array.prototype.slice.call(box.querySelectorAll('a.sh-res-item')); }
    input.addEventListener('keydown', function(e){
      if(e.key === 'ArrowDown'){ var l = links(); if(l.length){ e.preventDefault(); l[0].focus(); } }
    });
    box.addEventListener('keydown', function(e){
      var l = links(), i = l.indexOf(document.activeElement);
      if(i < 0) return;
      if(e.key === 'ArrowDown'){ e.preventDefault(); (l[i + 1] || l[i]).focus(); }
      else if(e.key === 'ArrowUp'){ e.preventDefault(); if(i === 0) input.focus(); else l[i - 1].focus(); }
    });
    box.addEventListener('click', function(e){
      if(e.target.closest('[data-ask]')){
        e.preventDefault();
        if(SH.hasWhatsApp()) SH.openWhatsApp('Halo Pak/Bu, saya mencari informasi tentang "' + input.value + '" di ' + SH.config.brand.name + '. Mohon bantuannya.');
        else SH.konsultasi.open({ konteks:'Mencari "' + input.value + '" tetapi belum menemukan panduan' });
      }
    });
    root.addEventListener('click', function(e){
      var c = e.target.closest('[data-q]'); if(!c || !root.contains(c)) return;
      e.preventDefault(); input.value = c.getAttribute('data-q'); input.dispatchEvent(new Event('input', { bubbles:true })); run(null, true); input.focus();
    });
    var q0 = SH.param('q');
    if(q0 && opts.readUrl !== false){ input.value = q0; run(q0); }
    // muat kamus di latar belakang agar pencarian pertama cepat
    (window.requestIdleCallback || function(f){ return setTimeout(f, 300); })(function(){ ensureEngine().catch(function(){}); });
    SH.siteSearch.run = run;
    return { run: run };
  };
  /* dipakai juga oleh status-konten.html (uji pencarian) tanpa kotak pencarian */
  SH.siteSearch = { run: null, engine: ensureEngine, search: function(q){ return ensureEngine().then(function(){ return search(q); }); } };
})();

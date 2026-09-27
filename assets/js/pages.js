/* =====================================================================
   HALAMAN KONTEN — dirender dari data/konten.js, data/program.js,
   data/peraturan.js, dan SITE_CONFIG. Satu berkas untuk semua halaman;
   renderer dipilih dari <body data-page="…">.
   Isi teks diubah di folder data/, bukan di sini.
   ===================================================================== */
(function(){
  'use strict';
  var SH = window.SH, C = SH.config, K = window.KONTEN || {}, PG = window.PROGRAM_BPJSTK || { program:[], segmen:[], iuran:{} };
  var esc = SH.esc, I = SH.icon, R = {};

  var TITLES = {
    program:'Program BPJS Ketenagakerjaan', segmen:'Segmen Peserta',
    simulasi:'Simulasi Iuran', daftar:'Pendaftaran', klaim:'Panduan Klaim', administrasi:'Tambah / Nonaktif Pekerja',
    sipp:'SIPP Online', jmo:'JMO', formulir:'Formulir', peraturan:'Peraturan & Dasar Hukum', kontak:'Kantor & Kontak',
    status:'Status Konten'
  };
  var SEG_TAB = { pu:'Perusahaan (PU)', bpu:'Mandiri (BPU)', jakon:'Jasa Konstruksi', pmi:'Migran (PMI)' };
  /* 'skala' = wajib atau boleh ditambah tergantung skala usaha (Penerima Upah: JHT & JP) */
  var BADGE = { wajib:'Wajib', pilihan:'Pilihan', otomatis:'Otomatis', skala:'Sesuai skala usaha', '':'—' };
  var BADGE_SHORT = { skala:'Sesuai skala' };
  function progById(id){ return PG.program.filter(function(p){ return p.id === id; })[0]; }
  function segById(id){ return PG.segmen.filter(function(s){ return s.id === id; })[0]; }

  /* ---------- potongan HTML ---------- */
  function steps(list){
    return list && list.length ? '<ol class="sh-steps">' + list.map(function(s){ return '<li>' + esc(s) + '</li>'; }).join('') + '</ol>' : '';
  }
  function bullets(list){
    return list && list.length ? '<ul class="sh-bullets">' + list.map(function(s){ return '<li>' + esc(s) + '</li>'; }).join('') + '</ul>' : '';
  }
  function checklist(list){
    return list && list.length ? '<ul class="sh-checklist">' + list.map(function(x){ return '<li>' + I('check') + '<span>' + esc(x) + '</span></li>'; }).join('') + '</ul>' : '';
  }
  function btn(o, cls){
    if(!SH.href(o)) return '<span class="sh-chip">' + esc(o.label) + '</span>';
    return '<a class="sh-btn ' + (cls || 'is-outline') + ' is-small"' + SH.aAttrs(o) + '>' + esc(o.label) + ' ' + I(SH.isExternal(o) ? 'external' : 'arrow', 'xs') + '</a>';
  }
  function btnRow(list, firstCls){
    return list && list.length ? '<div class="sh-btn-row">' + list.map(function(o, i){ return btn(o, i === 0 && firstCls ? firstCls : 'is-outline'); }).join('') + '</div>' : '';
  }
  function head(title, status, date, tag){
    tag = tag || 'h2';
    return '<div class="sh-block-head"><' + tag + ' class="' + (tag === 'h3' ? 'sh-h3' : 'sh-h2') + '">' + esc(title) + '</' + tag + '>' +
      (status ? SH.statusBadge(status, date) : '') + '</div>';
  }
  function sectionHead(title, sub, more, id){
    return '<div class="sh-section-head"><div><h2 class="sh-h2"' + (id ? ' id="' + id + '"' : '') + '>' + esc(title) + '</h2>' + (sub ? '<p class="sh-sub">' + sub + '</p>' : '') + '</div>' +
      (more ? '<a href="' + esc(more.href) + '">' + esc(more.label) + ' →</a>' : '') + '</div>';
  }
  /* ubin aksi besar: {label, desc, ikon, page|ext|url|wa|konsul, primary} */
  function action(o){
    var inner = '<span class="ic">' + I(o.ikon || 'arrow') + '</span><span><strong>' + esc(o.label) + '</strong>' + (o.desc ? '<small>' + esc(o.desc) + '</small>' : '') + '</span>';
    var cls = 'sh-action' + (o.primary ? ' is-primary' : '');
    if(o.konsul != null) return '<button type="button" class="' + cls + '" data-sh-konsul="' + esc(o.konsul) + '">' + inner + '</button>';
    if(o.wa != null) return '<button type="button" class="' + cls + '" data-sh-wa="' + esc(o.wa) + '">' + inner + '</button>';
    if(o.flow) return '<button type="button" class="' + cls + '" data-flow="' + esc(o.flow) + '">' + inner + '</button>';
    return '<a class="' + cls + '"' + SH.aAttrs(o) + '>' + inner + (SH.isExternal(o) ? '<span class="ext">' + I('external', 'xs') + '</span>' : '') + '</a>';
  }
  /* baris daftar: {label, desc, note, ikon, code, badge, page|ext|url} */
  function item(o){
    var ext = SH.isExternal(o), u = SH.href(o);
    var ic = o.code ? '<span class="ic code">' + esc(o.code) + '</span>' : '<span class="ic">' + I(o.ikon || 'chevron', 'sm') + '</span>';
    var body = '<span class="body"><span class="t">' + esc(o.label) + (o.badge ? ' ' + o.badge : '') + '</span>' +
      (o.desc ? '<span class="d">' + esc(o.desc) + '</span>' : '') + (o.note ? '<span class="n">' + o.note + '</span>' : '') + '</span>';
    if(!u) return '<div class="sh-item">' + ic + body + '</div>';
    return '<a class="sh-item"' + SH.aAttrs(o) + '>' + ic + body + '<span class="chev">' + I(ext ? 'external' : 'chevron', 'xs') + '</span></a>';
  }
  function list(items){ return items && items.length ? '<div class="sh-list">' + items.map(item).join('') + '</div>' : ''; }
  function badge(v, short){
    if(!v) return '<span class="sh-badge tidak"><span aria-hidden="true">—</span><span class="sh-sr">Tidak tersedia</span></span>';
    return '<span class="sh-badge ' + v + '">' + ((short && BADGE_SHORT[v]) || BADGE[v]) + '</span>';
  }
  function noteBox(html, warn){ return '<div class="' + (warn ? 'sh-warn' : 'sh-note') + '">' + I(warn ? 'alert' : 'info', 'sm') + '<div>' + html + '</div></div>'; }
  function note(c){
    return noteBox(esc(c.teks) +
      (c.sumber ? ' <a' + SH.aAttrs(c.sumber) + '>' + esc(c.sumber.label) + (SH.isExternal(c.sumber) ? ' ↗' : ' →') + '</a>' : '') +
      (c.link ? ' <a' + SH.aAttrs(c.link) + '>' + esc(c.link.label) + (SH.isExternal(c.link) ? ' ↗' : ' →') + '</a>' : ''));
  }
  function disclosure(l, open){
    return '<details class="sh-disclosure"' + (open ? ' open' : '') + '><summary>' + esc(l.judul) + '</summary><div class="sh-disclosure-body">' +
      (l.items || []).map(function(it){
        return '<div class="sh-disclosure-item"><strong>' + esc(it.judul) + '</strong><span>' + esc(it.teks || '') + '</span>' +
          ((it.tautan || []).length ? '<div class="sh-disclosure-links">' + it.tautan.map(function(t){
            return '<a' + SH.aAttrs(t) + '>' + esc(t.label) + ' ' + I(SH.isExternal(t) ? 'external' : 'arrow', 'xs') + '</a>';
          }).join('') + '</div>' : '') + '</div>';
      }).join('') + '</div></details>';
  }
  function tabBar(items, label, small, grid){
    return '<div class="sh-tabs sh-anchor' + (small ? ' sh-tabs-sm' : '') + (grid ? ' sh-tabs-grid' : '') + '" role="tablist" aria-label="' + esc(label || 'Pilihan') + '">' + items.map(function(it){
      return '<a class="sh-tab" role="tab" href="#' + esc(it.id) + '" data-tab="' + esc(it.id) + '" aria-controls="' + esc(it.id) + '" aria-selected="false">' + esc(it.label) + '</a>';
    }).join('') + '</div>';
  }
  function chipsNav(items, label){
    return '<nav class="sh-chips" aria-label="' + esc(label) + '">' + items.map(function(t){
      return '<a class="sh-chip" href="#' + esc(t.id) + '">' + esc(t.label) + '</a>';
    }).join('') + '</nav>';
  }
  /* lompat ke elemen tanpa animasi (dipakai saat halaman dibuka dengan #tautan).
     SH.jumpTo menyetel ulang posisi setelah font & gambar termuat agar mendarat konsisten di ponsel. */
  function jumpTo(el){ SH.jumpTo(el); }
  function listText(a){ return a.length < 3 ? a.join(' dan ') : a.slice(0, -1).join(', ') + ', dan ' + a[a.length - 1]; }
  function norm(s){ return String(s || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, ' ').trim(); }
  function ago(ts){
    var m = Math.round((Date.now() - (ts || 0)) / 60000);
    if(m < 2) return 'Baru saja'; if(m < 60) return m + ' menit lalu';
    var h = Math.round(m / 60); if(h < 24) return h + ' jam lalu';
    var d = Math.round(h / 24); return d === 1 ? 'Kemarin' : d + ' hari lalu';
  }
  function waText(topik){ return 'Halo Pak/Bu, saya ingin bertanya tentang ' + topik + '.'; }

  /* ---------- formulir: rujukan ke item atau grup ---------- */
  function groupCode(g){ return g.items.length ? g.items[0].kode.split(' ')[0] : g.id.toUpperCase(); }
  function formRef(id){
    var gs = (K.formulir || {}).grup || [];
    for(var i = 0; i < gs.length; i++){
      var g = gs[i];
      if(g.id === id) return { id:id, kode:groupCode(g), nama:g.judul, fungsi:g.items.length + ' formulir: ' + g.items.map(function(x){ return x.kode; }).join(', '), group:true };
      for(var j = 0; j < g.items.length; j++) if(g.items[j].id === id) return g.items[j];
    }
    return null;
  }
  function formRows(ids){
    var rows = (ids || []).map(formRef).filter(Boolean);
    return rows.length ? list(rows.map(function(f){ return { code:f.kode, label:f.nama, desc:f.fungsi, page:'formulir', hash:f.id }; })) : '';
  }
  function formUsage(){
    var map = {};
    function add(id, label, href){ (map[id] = map[id] || []).push({ label:label, href:href }); }
    ((K.daftar || {}).segmen || []).forEach(function(s){ (s.formulir || []).forEach(function(id){ add(id, 'Pendaftaran ' + (SEG_TAB[s.id] || s.judul), SH.url('daftar', null, s.id)); }); });
    ((K.klaim || {}).program || []).forEach(function(p){ (p.formulir || []).forEach(function(id){ add(id, 'Klaim ' + p.kode, SH.url('klaim', null, p.id)); }); });
    return map;
  }

  /* ---------- matriks program × segmen ---------- */
  function matrix(){
    var segs = PG.segmen, progs = PG.program;
    return '<div class="sh-matrix-wrap"><table class="sh-matrix"><caption class="sh-sr">Program yang dapat diikuti setiap segmen peserta</caption>' +
      '<thead><tr><th scope="col">Program</th>' + segs.map(function(s){ return '<th scope="col"><a href="' + esc(SH.url('segmen-' + s.id)) + '">' + esc(s.kode) + '</a></th>'; }).join('') + '</tr></thead><tbody>' +
      progs.map(function(p){
        return '<tr><th scope="row"><a href="' + esc(SH.url('program', null, p.id)) + '">' + esc(p.kode) + '<small>' + esc(p.nama.replace('Jaminan ', '')) + '</small></a></th>' +
          segs.map(function(s){ var v = (s.program || {})[p.id] || ''; return '<td>' + badge(v, true) + ((s.catatan || {})[p.id] && v && v !== 'skala' ? '<sup aria-hidden="true">*</sup>' : '') + '</td>'; }).join('') + '</tr>';
      }).join('') + '</tbody></table>' +
      '<div class="sh-matrix-legend"><span>' + badge('wajib') + ' harus diikuti</span>' +
        (hasSkala ? '<span>' + badge('skala', true) + ' wajib atau boleh ditambah, tergantung <a href="' + esc(SH.url('program', null, 'skala-usaha')) + '">skala usaha</a></span>' : '') +
        '<span>' + badge('pilihan') + ' boleh ditambah</span><span>' + badge('otomatis') + ' tanpa iuran tambahan</span><span>* ada ketentuan, lihat halaman segmen</span></div></div>';
  }
  var hasSkala = PG.segmen.some(function(s){ return Object.keys(s.program || {}).some(function(k){ return s.program[k] === 'skala'; }); });

  /* ---------- Penerima Upah: program wajib menurut skala usaha (data: PROGRAM_BPJSTK.skalaUsaha) ---------- */
  function skalaHtml(){
    var S = PG.skalaUsaha; if(!S || !S.baris) return '';
    var ids = S.program || ['jkk','jkm','jht','jp'];
    return '<div class="sh-skala">' + S.baris.map(function(r){
      return '<div class="sh-skala-row"><div><strong>' + esc(r.skala) + '</strong>' + (r.acuan ? '<small>' + esc(r.acuan) + '</small>' : '') + '</div>' +
        '<div class="sh-skala-progs">' + ids.map(function(id){
          var p = progById(id), w = r.wajib.indexOf(id) >= 0;
          if(!p) return '';
          return '<span class="' + (w ? 'is-w' : 'opt') + '">' + (w ? I('check', 'xs') : '+') + esc(p.kode) + '<i class="sh-sr">' + (w ? ' wajib' : ' boleh ditambah') + '</i></span>';
        }).join('') + '</div></div>';
    }).join('') +
    '<div class="sh-skala-foot"><b>' + I('check', 'xs') + ' = wajib</b> · <b>+ = boleh ditambah</b>. ' + esc(S.catatan || '') + SH.statusBadge(S.status, S.diperiksa) + SH.sourceHtml(S.sumber, 'Dasar') + '</div></div>';
  }

  /* ---------- halaman Program: pemilih menempel + penanda program yang sedang dibaca ---------- */
  function progSwitch(app){
    var nav = app.querySelector('.sh-progswitch'); if(!nav) return;
    var chips = {}, secs = [];
    nav.querySelectorAll('[data-prog-chip]').forEach(function(c){ chips[c.getAttribute('data-prog-chip')] = c; });
    PG.program.forEach(function(p){ var s = document.getElementById(p.id); if(s) secs.push(s); });
    var cur = null, ticking = false;
    function set(id){
      if(id === cur) return; cur = id;
      Object.keys(chips).forEach(function(k){ if(k === id) chips[k].setAttribute('aria-current', 'true'); else chips[k].removeAttribute('aria-current'); });
      var c = chips[id];
      if(c && nav.scrollWidth > nav.clientWidth){
        var left = Math.max(0, c.offsetLeft - (nav.clientWidth - c.offsetWidth) / 2);
        try{ nav.scrollTo({ left:left, behavior:SH.motion ? 'smooth' : 'auto' }); }catch(e){ nav.scrollLeft = left; }
      }
    }
    function update(){
      ticking = false;
      var top = parseFloat(getComputedStyle(nav).top) || 0, nr = nav.getBoundingClientRect();
      nav.classList.toggle('is-stuck', nr.top <= top + 1 && window.scrollY > 0);
      var line = Math.max(nr.bottom + 24, (window.innerHeight || 700) * 0.35), id = null;
      secs.forEach(function(s){ if(s.getBoundingClientRect().top <= line) id = s.id; });
      set(id);
    }
    window.addEventListener('scroll', function(){ if(!ticking){ ticking = true; requestAnimationFrame(update); } }, { passive:true });
    window.addEventListener('resize', update);
    update();
  }

  /* ---------- tab dengan sinkronisasi #hash ---------- */
  function hashTabs(bar, ids, opts){
    opts = opts || {};
    function show(id){
      if(ids.indexOf(id) < 0) id = opts.defaultId || ids[0];
      ids.forEach(function(x){
        var p = document.getElementById(x), b = bar.querySelector('[data-tab="' + x + '"]');
        if(p) p.hidden = x !== id;
        if(b){ b.setAttribute('aria-selected', x === id ? 'true' : 'false'); b.tabIndex = x === id ? 0 : -1; }
      });
      return id;
    }
    bar.addEventListener('click', function(e){
      var b = e.target.closest('[data-tab]'); if(!b) return;
      e.preventDefault();
      var id = show(b.getAttribute('data-tab'));
      try{ history.replaceState(null, '', '#' + id); }catch(err){}
    });
    bar.addEventListener('keydown', function(e){
      if(e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
      var sel = bar.querySelector('[aria-selected="true"]'), cur = sel ? ids.indexOf(sel.getAttribute('data-tab')) : 0;
      var nx = ids[(Math.max(cur, 0) + (e.key === 'ArrowRight' ? 1 : ids.length - 1)) % ids.length];
      show(nx); try{ history.replaceState(null, '', '#' + nx); }catch(err){}
      var b = bar.querySelector('[data-tab="' + nx + '"]'); if(b) b.focus();
      e.preventDefault();
    });
    window.addEventListener('hashchange', function(){
      var h = decodeURIComponent(location.hash.slice(1));
      if(ids.indexOf(h) >= 0){ show(h); bar.scrollIntoView({ block:'start' }); }
    });
    var h0 = decodeURIComponent(location.hash.slice(1));
    show(h0);
    if(ids.indexOf(h0) >= 0 && SH.navType !== 'back_forward') setTimeout(function(){ jumpTo(bar); }, 0);
  }

  /* ---------- media tutorial (video / foto) ---------- */
  function ytId(v){
    if(!v) return '';
    var m = String(v).match(/(?:youtu\.be\/|[?&]v=|embed\/|shorts\/|live\/)([\w-]{11})/);
    if(m) return m[1];
    return /^[\w-]{11}$/.test(String(v)) ? String(v) : '';
  }
  function hasMedia(k, m){
    if(k === 'video') return !!(m.video && (ytId(m.video.youtube) || m.video.url));
    if(k === 'foto') return !!(m.foto && m.foto.length);
    return true;
  }
  function mediaHtml(k, t){
    var m = t.media || {};
    if(k === 'video'){
      var id = ytId(m.video.youtube);
      if(id) return '<div class="sh-embed video"><iframe src="https://www.youtube-nocookie.com/embed/' + id + '?rel=0" title="Video: ' + esc(t.judul) + '" loading="lazy" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen" allowfullscreen referrerpolicy="strict-origin-when-cross-origin"></iframe></div>';
      return '<video class="sh-embed" style="background:#000" controls preload="none" src="' + esc(m.video.url) + '"></video>';
    }
    if(k === 'foto'){
      return '<div class="sh-photos">' + m.foto.map(function(f, i){
        f = typeof f === 'string' ? { src:f } : f;
        return '<figure><a href="' + esc(f.src) + '" target="_blank" rel="noopener"><img loading="lazy" src="' + esc(f.src) + '" alt="' + esc(f.alt || f.caption || (t.judul + ' — langkah ' + (i + 1))) + '"></a>' +
          '<figcaption>' + esc(f.caption || ('Langkah ' + (i + 1))) + '</figcaption></figure>';
      }).join('') + '</div>';
    }
    return '';
  }
  var MEDIA_LABEL = { langkah:'Langkah', flowchart:'Flowchart', video:'Video', foto:'Foto' };
  var MEDIA_ICON = { langkah:'check', flowchart:'flow', video:'play', foto:'image' };
  /* Tampilan yang tersedia untuk satu topik: Langkah selalu ada; Flowchart bila topik punya alur;
     Video/Foto hanya bila slotnya terisi (slot kosong disebut "segera hadir"). */
  function topicKinds(t){
    var m = t.media || {}, k = ['langkah'];
    if(t.alur && window.SHFlow) k.push('flowchart');
    ['video','foto'].forEach(function(x){ if((x in m) && hasMedia(x, m)) k.push(x); });
    return k;
  }
  function topicSoon(t){
    var m = t.media || {};
    return ['video','foto'].filter(function(x){ return (x in m) && !hasMedia(x, m); }).map(function(x){ return MEDIA_LABEL[x].toLowerCase(); });
  }
  function alurIds(t){
    if(!t.alur || !window.SHFlow) return [];
    return t.alur === 'semua' ? SHFlow.data.alur.map(function(a){ return a.id; }) : [].concat(t.alur);
  }

  /* ---------- tutorial SIPP / JMO: menu pilihan → halaman topik ----------
     sipp.html            → menu kartu pilihan (Tambah TK, Kurangi TK, …)
     sipp.html#tambah-tk  → hanya topik itu, dengan saklar Langkah | Flowchart
     ?tab=flowchart|langkah|video|foto memilih tampilan · ?ke=<id alur> memilih alur (topik "semua") */
  function tutorial(app, T, opt){
    var topik = T.topik || [], byId = {};
    topik.forEach(function(t){ byId[t.id] = t; });
    var menu = (T.menu && T.menu.length) ? T.menu : [{ judul:'', topik:topik.map(function(t){ return t.id; }) }];
    var tab0 = SH.param('tab'), ke0 = SH.param('ke'), first = true, file = SH.url(opt.page);

    function card(t){
      return '<a class="sh-topiccard" href="#' + esc(t.id) + '"><span class="ic">' + I(t.ikon || 'book') + '</span>' +
        '<span><strong>' + esc(t.pendek || t.judul) + '</strong><small>' + esc(t.ringkas) + '</small></span>' +
        '<span class="kinds">' + topicKinds(t).map(function(k){ return '<span>' + I(MEDIA_ICON[k], 'xs') + MEDIA_LABEL[k] + '</span>'; }).join('') + '</span></a>';
    }
    function menuHtml(){
      return '<div class="sh-topicmenu">' +
        '<div class="sh-section-head" style="margin:0"><div><h2 class="sh-h2">' + esc(opt.tanya) + '</h2><p class="sh-sub">Pilih satu, lalu ikuti langkahnya. Tersedia versi langkah' + (opt.flow ? ' dan flowchart' : '') + '.</p></div></div>' +
        menu.map(function(g){
          return '<section class="sh-topicgroup">' + (g.judul && menu.length > 1 ? '<h2>' + esc(g.judul) + '</h2>' : '') +
            '<div class="sh-topicgrid">' + g.topik.map(function(id){ return byId[id] ? card(byId[id]) : ''; }).join('') + '</div></section>';
        }).join('') +
        (opt.after || '') + '</div>';
    }
    function topicHtml(t, view){
      var kinds = topicKinds(t), soon = topicSoon(t);
      var others = topik.filter(function(x){ return x.id !== t.id; });
      return '<div class="sh-topic-view">' +
        '<a class="sh-backlink" href="#">' + I('back', 'sm') + 'Semua topik ' + esc(opt.nama) + '</a>' +
        '<section class="sh-card sh-topic" data-topic="' + esc(t.id) + '" style="margin-top:4px">' +
          '<div class="sh-topic-head"><span class="ic">' + I(t.ikon || 'book') + '</span><div>' +
            '<h2 class="sh-h2">' + esc(t.judul) + '</h2><p>' + esc(t.ringkas) + '</p>' + SH.statusBadge(t.status, t.diperiksa) + '</div></div>' +
          (kinds.length > 1 ? '<div class="sh-viewswitch" role="tablist" aria-label="Pilih tampilan">' + kinds.map(function(k){
            return '<button type="button" role="tab" data-view="' + k + '" aria-selected="' + (k === view) + '">' + I(MEDIA_ICON[k], 'sm') + MEDIA_LABEL[k] + '</button>';
          }).join('') + '</div>' : '') +
          '<div data-body></div>' +
          (soon.length ? '<div class="sh-soon"><span class="sh-tag soon">Segera hadir</span> Panduan ' + listText(soon) + ' untuk topik ini.</div>' : '') +
          SH.sourceHtml(t.sumber) +
        '</section>' +
        (opt.afterTopic || '') +
        '<div class="sh-topic-more"><div class="sh-chips-label">Topik lain</div><div class="sh-chips">' +
          others.map(function(x){ return '<a class="sh-chip" href="#' + esc(x.id) + '">' + I(x.ikon || 'book', 'xs') + esc(x.pendek || x.judul) + '</a>'; }).join('') +
        '</div></div>' +
      '</div>';
    }
    function drawBody(sec, t, view){
      var holder = sec.querySelector('[data-body]'), body = document.createElement('div');
      body.setAttribute('data-panel', view);
      holder.replaceWith(body); body.setAttribute('data-body', '');
      if(view === 'langkah' || view === 'flowchart'){
        if(t.alur && window.SHFlow){
          var ids = alurIds(t);
          SHFlow.mount(body, { ids:ids, aktif:(first && ke0) || ids[0], cabang:t.cabang, mode:view,
            fullBase:SH.url('flowchart/mutasi-data.html'), showTitle:false });
        } else body.innerHTML = steps(t.langkah) || '<div class="sh-media">Langkah tertulis sedang disiapkan.</div>';
      } else body.innerHTML = mediaHtml(view, t);
    }
    function route(){
      var id = decodeURIComponent(location.hash.slice(1)), t = byId[id], was = first;
      if(!t && id && !was) return;   // mis. #main dari tautan "Langsung ke isi": jangan tutup topik
      if(!t){
        app.innerHTML = menuHtml();
        SH.recent.touch({ u:file });
        if(!was) app.scrollIntoView({ block:'start' });
      } else {
        var kinds = topicKinds(t), pref = SH.store.get('sh-tutor-view', 'langkah');
        var view = (was && tab0 && kinds.indexOf(tab0) >= 0) ? tab0 : (kinds.indexOf(pref) >= 0 ? pref : kinds[0]);
        app.innerHTML = topicHtml(t, view);
        var sec = app.querySelector('.sh-topic');
        drawBody(sec, t, view);
        var sw = sec.querySelector('.sh-viewswitch');
        if(sw) sw.addEventListener('click', function(e){
          var b = e.target.closest('[data-view]'); if(!b) return;
          var k = b.getAttribute('data-view');
          sw.querySelectorAll('[data-view]').forEach(function(x){ x.setAttribute('aria-selected', x === b ? 'true' : 'false'); });
          if(k === 'langkah' || k === 'flowchart') SH.store.set('sh-tutor-view', k);
          drawBody(sec, t, k);
        });
        SH.recent.touch({ t:opt.nama + ' · ' + (t.pendek || t.judul), u:file + '#' + t.id });
        if((!was || id) && !(was && SH.navType === 'back_forward')) setTimeout(function(){ jumpTo(app); }, 0);
      }
      SH.applyLinks(app);
      SH.reveal(app.querySelectorAll('.sh-topicgroup, .sh-topic-more'));
      first = false;
    }
    window.addEventListener('hashchange', route);
    route();
  }

  /* ---------- lembar pilihan (alur cepat beranda) ---------- */
  function buildFlows(flows){
    var ov = document.createElement('div');
    ov.className = 'sh-sheet-overlay'; ov.id = 'flowOverlay';
    ov.innerHTML = '<div class="sh-sheet" role="dialog" aria-modal="true" aria-labelledby="flowTitle"><div class="sh-sheet-handle"></div>' +
      '<div class="sh-sheet-head"><div><h2 id="flowTitle">Pilih</h2><p id="flowDesc"></p></div><button type="button" class="sh-iconbtn" data-close aria-label="Tutup">' + I('close', 'sm') + '</button></div>' +
      '<div id="flowBody"></div></div>';
    document.body.appendChild(ov);
    var lastFocus = null;
    function open(key){
      var f = flows[key]; if(!f) return;
      document.getElementById('flowTitle').textContent = f.title;
      document.getElementById('flowDesc').textContent = f.desc;
      document.getElementById('flowBody').innerHTML = (f.back ? '<button type="button" class="sh-back-mini" data-next="' + f.back + '">' + I('back', 'xs') + ' Kembali</button>' : '') +
        '<div class="sh-list">' + f.options.map(function(o){
          var inner = '<span class="ic">' + I(o.ikon || 'chevron', 'sm') + '</span><span class="body"><span class="t">' + esc(o.title) + '</span><span class="d">' + esc(o.desc || '') + '</span></span><span class="chev">' + I('chevron', 'xs') + '</span>';
          return o.href ? '<a class="sh-item" href="' + esc(o.href) + '">' + inner + '</a>' : '<button type="button" class="sh-item" data-next="' + o.next + '">' + inner + '</button>';
        }).join('') + '</div>';
      if(!ov.classList.contains('open')){ lastFocus = document.activeElement; ov.classList.add('open'); document.body.classList.add('sh-no-scroll'); }
      setTimeout(function(){ var el = ov.querySelector('.sh-item'); if(el) el.focus(); }, 30);
    }
    function close(){ ov.classList.remove('open'); document.body.classList.remove('sh-no-scroll'); if(lastFocus && lastFocus.focus) lastFocus.focus(); }
    document.addEventListener('click', function(e){ var b = e.target.closest('[data-flow]'); if(b){ e.preventDefault(); open(b.getAttribute('data-flow')); } });
    ov.addEventListener('click', function(e){
      if(e.target === ov || e.target.closest('[data-close]')){ close(); return; }
      var n = e.target.closest('[data-next]'); if(n) open(n.getAttribute('data-next'));
    });
    document.addEventListener('keydown', function(e){ if(e.key === 'Escape' && ov.classList.contains('open')) close(); });
  }
  var FLOWS = {
    daftar: { title:'Daftar sebagai apa?', desc:'Pilih segmen. Halaman berikutnya menjelaskan langkah singkat dan kanal resmi.', options:[
      { title:'Penerima Upah (PU)', desc:'Perusahaan mendaftarkan karyawan yang menerima upah.', href:SH.url('daftar', null, 'pu'), ikon:'building' },
      { title:'Bukan Penerima Upah (BPU)', desc:'Pekerja mandiri: petani, nelayan, ojol, pedagang, tukang, dan lainnya.', href:SH.url('daftar', null, 'bpu'), ikon:'user' },
      { title:'Jasa Konstruksi', desc:'Pendaftaran pekerja pada proyek konstruksi.', href:SH.url('daftar', null, 'jakon'), ikon:'helmet' },
      { title:'Pekerja Migran Indonesia', desc:'CPMI / PMI sesuai jalur penempatan.', href:SH.url('daftar', null, 'pmi'), ikon:'plane' }
    ]},
    klaim: { title:'Manfaat apa yang ingin diklaim?', desc:'Pilih program untuk melihat kanal, langkah, dan formulirnya.', options:[
      { title:'JHT — Jaminan Hari Tua', desc:'Pencairan saldo: berhenti kerja, PHK, usia pensiun, dan lainnya.', href:SH.url('klaim', null, 'jht'), ikon:'coins' },
      { title:'JKK — Jaminan Kecelakaan Kerja', desc:'Kecelakaan kerja atau penyakit akibat kerja.', href:SH.url('klaim', null, 'jkk'), ikon:'shield' },
      { title:'JKM — Jaminan Kematian', desc:'Diajukan ahli waris.', href:SH.url('klaim', null, 'jkm'), ikon:'heart' },
      { title:'JP — Jaminan Pensiun', desc:'Manfaat pensiun bulanan atau sekaligus.', href:SH.url('klaim', null, 'jp'), ikon:'calendar' },
      { title:'JKP — Jaminan Kehilangan Pekerjaan', desc:'Terkena PHK, klaim melalui SIAPkerja.', href:SH.url('klaim', null, 'jkp'), ikon:'briefcase' }
    ]},
    pekerja: { title:'Anda mengurus dari posisi apa?', desc:'Jalur administrasi perusahaan dan peserta perorangan berbeda.', options:[
      { title:'HRD / pengurus perusahaan', desc:'Tambah, nonaktif, atau ubah data pekerja perusahaan.', href:SH.url('administrasi', {peran:'hrd'}), ikon:'building' },
      { title:'Saya pekerja / peserta', desc:'Status saya perlu ditambah atau dinonaktifkan.', next:'peserta', ikon:'user' }
    ]},
    peserta: { title:'Kepesertaan Anda segmen apa?', desc:'Jalur perubahan status berbeda antara pekerja perusahaan dan pekerja mandiri.', back:'pekerja', options:[
      { title:'Penerima Upah (PU)', desc:'Saya bekerja pada perusahaan / menerima upah.', href:SH.url('administrasi', {peran:'peserta', segmen:'pu'}), ikon:'building' },
      { title:'Bukan Penerima Upah (BPU)', desc:'Saya pekerja mandiri / usaha sendiri.', href:SH.url('administrasi', {peran:'peserta', segmen:'bpu'}), ikon:'user' }
    ]}
  };

  /* ---------- kartu segmen & program (dipakai beranda dan halaman ringkasan) ---------- */
  function segCard(s, mine){
    var progs = PG.program.filter(function(p){ return (s.program || {})[p.id]; });
    return '<a class="sh-segcard" href="' + esc(SH.url('segmen-' + s.id)) + '">' +
      (mine ? '<span class="mine">Terakhir dilihat</span>' : '') +
      '<span class="ic"><img src="' + esc(SH.artSrc(s.id)) + '" alt="" width="60" height="45" loading="lazy"></span>' +
      '<span class="q">' + esc(s.tanya) + '</span>' +
      '<span class="seg">' + esc(s.nama) + ' (' + esc(s.kode) + ')</span>' +
      '<span class="ex">Contoh: ' + esc(s.contoh.slice(0, 4).join(', ')) + '.</span>' +
      '<span class="prog">' + progs.map(function(p){ return '<span class="sh-badge ' + s.program[p.id] + '">' + esc(p.kode) + '</span>'; }).join('') + '</span></a>';
  }
  function progCard(p){
    return '<a class="sh-progcard" href="' + esc(SH.url('program', null, p.id)) + '"><span class="ic">' + I(p.ikon, 'sm') + '</span>' +
      '<span><strong>' + esc(p.kode) + '</strong><span>' + esc(p.nama) + '</span></span><span class="chev">' + I('chevron', 'xs') + '</span></a>';
  }

  /* =================================================================
     BERANDA
     ================================================================= */
  /* pengantar singkat: website ini tentang apa (teks diubah di sini) */
  function aboutHtml(){
    var b = C.brand || {};
    return '<section class="sh-about" aria-labelledby="aboutTitle">' +
      (b.logo ? '<img src="' + esc(b.logo) + '" alt="" width="52" height="52" loading="lazy">' : '') +
      '<div><h2 id="aboutTitle">Tentang ' + SH.brandName(b.name) + '</h2>' +
        '<p>' + esc(b.name) + ' berisi informasi keperluan perlindungan pekerja melalui program BPJS Ketenagakerjaan: mengenal program dan manfaatnya, cara mendaftar, perkiraan iuran, panduan klaim, formulir, hingga kantor cabang terdekat. Disusun dengan bahasa sehari-hari untuk semua pekerja, dari karyawan kantor sampai petani dan nelayan.</p>' +
        '<ul>' + ['Program & manfaat', 'Cara daftar', 'Simulasi iuran', 'Panduan klaim', 'Konsultasi langsung'].map(function(t){ return '<li>' + I('check', 'xs') + esc(t) + '</li>'; }).join('') + '</ul>' +
        '<small>Website informasi: pendaftaran, pembayaran, klaim, dan data pribadi tetap diproses melalui kanal resmi BPJS Ketenagakerjaan.</small>' +
      '</div></section>';
  }
  R.home = function(app){
    var hero = document.getElementById('heroSearch');
    if(hero){
      var input = document.getElementById('searchInput'), chips = document.getElementById('heroChips'), clear = hero.querySelector('.sh-clear');
      chips.innerHTML = SH.popularChips(true);
      if(SH.initSiteSearch) SH.initSiteSearch({ form:'homeSearch', input:'searchInput', results:'results', root:hero,
        onRender:function(out){ chips.hidden = !!(out && out.query && out.query.trim()); } });
      SH.attachVoice(hero.querySelector('.sh-mic'), input, document.getElementById('heroListen'));
      input.addEventListener('input', function(){ clear.hidden = !input.value; });
      clear.addEventListener('click', function(){ input.value = ''; input.dispatchEvent(new Event('input', { bubbles:true })); input.focus(); });
      if(input.value) clear.hidden = false;
    }
    var recent = SH.recent.list().slice(0, 4), mySeg = SH.store.get('sh-segmen', '');
    var segs = PG.segmen.slice().sort(function(a, b){ return (b.id === mySeg) - (a.id === mySeg); });
    app.innerHTML =
      (recent.length ? '<section class="sh-section" style="margin-top:18px" aria-labelledby="recentTitle">' +
        sectionHead('Lanjutkan', 'Halaman yang terakhir Anda buka di perangkat ini.', null, 'recentTitle') +
        '<div class="sh-recent">' + recent.map(function(r){
          return '<a href="' + esc(r.u) + '"><span class="ic">' + I(r.i || 'history', 'sm') + '</span><span><strong>' + esc(r.t) + '</strong><small>' + esc(ago(r.ts)) + '</small></span></a>';
        }).join('') + '</div></section>' : '') +
      '<section class="sh-section" aria-labelledby="quickTitle">' + sectionHead('Akses cepat', '', null, 'quickTitle') +
        '<div class="sh-actions">' + [
          { label:'Simulasi iuran', desc:'Hitung perkiraan iuran', ikon:'calculator', page:'simulasi', primary:true },
          { label:'Cara daftar', desc:'Pilih segmen & kanal resmi', ikon:'userplus', flow:'daftar' },
          { label:'Klaim manfaat', desc:'JHT, JKK, JKM, JP, JKP', ikon:'wallet', flow:'klaim' },
          { label:'Tambah / nonaktif pekerja', desc:'HRD atau peserta', ikon:'users', flow:'pekerja' },
          { label:'Formulir', desc:'Unduh formulir resmi', ikon:'file', page:'formulir' },
          { label:'Kantor & konsultasi', desc:SH.officeShort() + ' · minta dihubungi', ikon:'pin', page:'kontak', hash:'kantor' }
        ].map(action).join('') + '</div></section>' +
      aboutHtml() +
      '<section class="sh-section" aria-labelledby="segTitle">' +
        sectionHead('Anda termasuk yang mana?', 'Pilih yang paling sesuai untuk melihat program, iuran, dan cara daftarnya.', { label:'Semua segmen', href:SH.url('segmen') }, 'segTitle') +
        '<div class="sh-segcards">' + segs.map(function(x){ return segCard(x, x.id === mySeg); }).join('') + '</div></section>' +
      '<section class="sh-section" aria-labelledby="progTitle">' +
        sectionHead('Program perlindungan', 'Lima program BPJS Ketenagakerjaan dan manfaatnya.', { label:'Semua program', href:SH.url('program') }, 'progTitle') +
        '<div class="sh-progrow">' + PG.program.map(progCard).join('') + '</div></section>' +
      '<section class="sh-section" aria-labelledby="tutTitle">' + sectionHead('Tutorial & referensi', '', null, 'tutTitle') +
        list([
          { label:'SIPP Online', desc:'Untuk perusahaan: tambah & nonaktif pekerja, upah, iuran, NPP.', ikon:'monitor', page:'sipp' },
          { label:'Aplikasi JMO', desc:'Untuk peserta: aktivasi akun, cek saldo JHT, klaim JHT.', ikon:'smartphone', page:'jmo' },
          { label:'Peraturan & dasar hukum', desc:'PP dan Permenaker beserta PDF resmi.', ikon:'scale', page:'peraturan' }
        ]) + '</section>';
    buildFlows(FLOWS);
  };

  /* =================================================================
     PROGRAM BPJS KETENAGAKERJAAN
     ================================================================= */
  R.program = function(app){
    var S = PG.skalaUsaha;
    app.innerHTML =
      '<nav class="sh-chips sh-progswitch" aria-label="Pilih program">' + PG.program.map(function(p){
        return '<a class="sh-chip" href="#' + esc(p.id) + '" data-prog-chip="' + esc(p.id) + '">' + esc(p.kode) + ' · ' + esc(p.nama.replace('Jaminan ', '')) + '</a>';
      }).join('') + '</nav>' +
      '<section class="sh-section" aria-labelledby="mxTitle">' +
        sectionHead('Siapa bisa ikut program apa?', 'Program yang diikuti bergantung pada segmen kepesertaan. Ketuk kode segmen untuk detailnya.', null, 'mxTitle') +
        matrix() + '</section>' +
      (S ? '<section class="sh-section sh-anchor" id="skala-usaha" aria-labelledby="skTitle">' + sectionHead(S.judul, esc(S.sub || ''), null, 'skTitle') + skalaHtml() + '</section>' : '') +
      PG.program.map(function(p){
        var segs = PG.segmen.filter(function(s){ return (s.program || {})[p.id]; });
        var iur = PG.segmen.filter(function(s){ return (p.iuran || {})[s.id]; });
        return '<section class="sh-card sh-anchor" id="' + esc(p.id) + '">' +
          '<div class="sh-block-head"><div class="sh-prog-head"><span class="ic">' + I(p.ikon) + '</span><div><div class="code">' + esc(p.kode) + '</div><h2 class="sh-h2">' + esc(p.nama) + '</h2></div></div>' + SH.statusBadge(p.status, p.diperiksa) + '</div>' +
          '<p>' + esc(p.singkat) + '</p>' +
          '<h3 class="sh-h3" style="margin-top:14px">Manfaat utama</h3>' + bullets(p.manfaat) +
          '<details class="sh-disclosure"><summary>Siapa yang bisa ikut' + (iur.length ? ' & berapa iurannya' : '') + '</summary><div class="sh-disclosure-body">' +
            '<div class="sh-prog-for" style="margin-top:0">' + segs.map(function(s){ return '<a href="' + esc(SH.url('segmen-' + s.id)) + '">' + esc(s.nama) + ' ' + badge(s.program[p.id]) + '</a>'; }).join('') + '</div>' +
            (iur.length ? '<div class="sh-iuran">' + iur.map(function(s){ return '<div><b>' + esc(s.kode) + '</b><span>' + esc(p.iuran[s.id]) + '</span></div>'; }).join('') + '</div>' : '') +
          '</div></details>' +
          btnRow([{ label:'Cara klaim ' + p.kode, page:p.klaim.page, hash:p.klaim.hash }, { label:'Simulasi iuran', page:'simulasi' }, { label:'Dasar hukum', page:'peraturan', query:{ program:p.id } }], 'is-primary') +
          SH.sourceHtml(p.sumber) +
        '</section>';
      }).join('');
    progSwitch(app);
  };

  /* =================================================================
     SEGMEN PESERTA (ringkasan)
     ================================================================= */
  R.segmen = function(app){
    app.innerHTML =
      '<section class="sh-section" style="margin-top:6px" aria-labelledby="qTitle">' + sectionHead('Anda termasuk yang mana?', 'Pilih yang paling sesuai. Setiap halaman segmen berisi program, gambaran iuran, cara daftar, dan kontak petugas.', null, 'qTitle') +
        '<div class="sh-segcards">' + PG.segmen.map(segCard).join('') + '</div></section>' +
      '<section class="sh-section" aria-labelledby="mxTitle">' + sectionHead('Program per segmen', '', null, 'mxTitle') + matrix() + '</section>' +
      '<section class="sh-section" id="cari" aria-labelledby="cariTitle">' + sectionHead('Belum yakin? Ketik pekerjaan atau usaha Anda', 'Contoh: <b>petani</b>, <b>ojol</b>, <b>karyawan pabrik</b>, <b>kontraktor</b>, <b>TKI</b>.', null, 'cariTitle') +
        '<div id="segSearchWrap"><form class="sh-search" id="segSearch" role="search" action="' + SH.url('segmen') + '" method="get">' + I('search') +
          '<label class="sh-sr" for="segInput">Cari pekerjaan atau jenis usaha</label>' +
          '<input id="segInput" name="q" type="search" autocomplete="off" enterkeyhint="search" placeholder="Ketik pekerjaan atau usaha…"><button type="submit" class="sh-go">Cari</button></form>' +
        '<div id="segResults" aria-live="polite"></div></div></section>' +
      noteBox('Karyawan tetap perusahaan konstruksi (staf kantor, admin, supervisor tetap) termasuk <strong>Penerima Upah</strong>. Segmen Jasa Konstruksi untuk tenaga kerja proyek.');
    if(SH.initSiteSearch) SH.initSiteSearch({ form:'segSearch', input:'segInput', results:'segResults', root:document.getElementById('segSearchWrap') });
  };

  /* =================================================================
     HALAMAN PER SEGMEN (segmen-pu / bpu / jakon / pmi)
     ================================================================= */
  R.segmenDetail = function(app, id){
    var s = segById(id); if(!s){ app.innerHTML = '<div class="sh-empty">Segmen tidak ditemukan.</div>'; return; }
    var daftar = ((K.daftar || {}).segmen || []).filter(function(d){ return d.id === id; })[0] || {};
    var o = C.office || {}, job = id === 'bpu' ? SH.param('pekerjaan') : null;
    var sim = Object.assign({}, s.aksi.simulasi);
    if(job) sim.query = Object.assign({}, sim.query || {}, { pekerjaan:job });
    // kepala halaman dari data
    var ph = document.querySelector('.sh-pagehead');
    if(ph){
      var sb = SH.statusBadge(s.status, s.diperiksa);
      ph.classList.remove('has-art', 'has-photo');
      ph.innerHTML =
        '<div class="sh-kicker">' + I(s.ikon, 'xs') + 'Segmen peserta · ' + esc(s.kode) + '</div>' +
        '<h1 class="sh-h1">' + esc(s.nama) + '</h1>' +
        '<p class="sh-lead">' + esc(s.singkat) + '</p>' +
        '<div class="sh-examples">' + s.contoh.map(function(c){ return '<span>' + esc(c) + '</span>'; }).join('') + '</div>' +
        (sb ? '<div style="margin-top:10px">' + sb + '</div>' : '');
      SH.headMedia(ph, s.id);   // banner foto bila terdaftar, selain itu ilustrasi
    }
    /* "Hubungi petugas" → Konsultasi Langsung (pengunjung meninggalkan nomor HP, petugas menghubungi) */
    var hubungi = { label:'Konsultasi langsung', desc:'Tinggalkan nomor HP, kami yang menghubungi', ikon:'headset', konsul:'Segmen ' + s.nama + ' (' + s.kode + ')' };
    var actions = [
      { label:sim.label, desc:'Simulasi iuran', ikon:'calculator', page:sim.page, query:sim.query, primary:true },
      { label:'Cara daftar', desc:'Langkah & kanal resmi', ikon:'userplus', page:'daftar', hash:id },
      hubungi,
      { label:'Lokasi kantor', desc:SH.officeShort(), ikon:'pin', page:'kontak', hash:'kantor' }
    ].concat((s.aksi.khusus || []).map(function(k){ return { label:k.label, desc:k.desc, ikon:k.ikon, page:k.page, query:k.query, hash:k.hash, ext:k.ext }; }));
    var progItems = PG.program.map(function(p){
      var v = (s.program || {})[p.id];
      if(!v) return null;
      var n = (s.catatan || {})[p.id] ? esc(s.catatan[p.id]) : '';
      return { label:p.kode + ' · ' + p.nama, desc:p.singkat, note:n, ikon:p.ikon, page:'program', hash:p.id, badge:badge(v) };
    }).filter(Boolean);
    var tidak = PG.program.filter(function(p){ return !(s.program || {})[p.id]; }).map(function(p){ return p.kode; });
    var iur = (PG.iuran || {})[id] || [];
    var forms = daftar.formulir || [];
    var jobName = '';
    if(job) ((window.BPU_PEKERJAAN || {}).groups || []).forEach(function(g){ g.jobs.forEach(function(j){ if(j.id === job) jobName = j.label; }); });
    app.innerHTML =
      (jobName ? noteBox('Pekerjaan Anda: <strong>' + esc(jobName) + '</strong>. Tombol <strong>' + esc(sim.label) + '</strong> akan membuka simulator dengan pekerjaan ini sudah terpilih.') : '') +
      '<section class="sh-section" style="margin-top:4px" aria-label="Tindakan"><div class="sh-actions">' + actions.map(action).join('') + '</div></section>' +
      (s.penting ? noteBox(esc(s.penting), true) : '') +
      '<section class="sh-section" aria-labelledby="pTitle">' + sectionHead('Program yang diikuti', tidak.length ? 'Tidak tersedia untuk segmen ini: ' + esc(listText(tidak)) + '.' : '', null, 'pTitle') + list(progItems) +
        (Object.keys(s.program || {}).some(function(k){ return s.program[k] === 'skala'; }) && PG.skalaUsaha
          ? '<h3 class="sh-h3" id="skala-usaha" style="margin:18px 0 8px">' + esc(PG.skalaUsaha.judulPendek || PG.skalaUsaha.judul) + '</h3>' + skalaHtml() : '') +
      '</section>' +
      '<section class="sh-section" aria-labelledby="iTitle">' + sectionHead('Iuran secara singkat', '', null, 'iTitle') +
        '<div class="sh-table-wrap"><table class="sh-table"><thead><tr><th>Program</th><th>Dibayar oleh</th><th>Besaran</th></tr></thead><tbody>' +
          iur.map(function(r){ return '<tr><td><b>' + esc(r.program) + '</b></td><td>' + esc(r.oleh) + '</td><td>' + esc(r.besaran) + '</td></tr>'; }).join('') +
        '</tbody></table></div>' +
        (s.iuranRingkas ? '<p class="sh-sub" style="margin-top:10px">' + esc(s.iuranRingkas) + '</p>' : '') +
        '<div class="sh-btn-row"><a class="sh-btn is-primary"' + SH.aAttrs(sim) + '>' + I('calculator', 'sm') + esc(sim.label) + '</a></div>' +
        ((s.lipat || []).length ? s.lipat.map(function(l){ return disclosure(l); }).join('') : '') +
      '</section>' +
      '<section class="sh-section" aria-labelledby="dTitle">' + sectionHead('Cara daftar', '', { label:'Panduan lengkap', href:SH.url('daftar', null, id) }, 'dTitle') +
        '<div class="sh-card is-flat" style="margin-top:0">' + steps(daftar.langkah) +
          (s.persiapan ? '<h3 class="sh-h3" style="margin-top:6px">' + (id === 'pu' ? 'Siapkan dokumen' : 'Kanal pendaftaran') + '</h3>' + bullets(s.persiapan.items) + SH.sourceHtml(s.persiapan.sumber) : '') +
          btnRow(daftar.kanal, 'is-soft') +
        '</div></section>' +
      '<section class="sh-section" aria-labelledby="tTitle">' + sectionHead('Informasi terkait', '', null, 'tTitle') +
        list(s.terkait || []) + (forms.length ? '<h3 class="sh-h3" style="margin:16px 0 8px">Formulir terkait</h3>' + formRows(forms) : '') + '</section>' +
      SH.sourceHtml(s.sumber);
    SH.crumbs([{ label:'Segmen Peserta', href:SH.url('segmen') }, { label:s.nama }]);
  };

  /* =================================================================
     SIMULASI (hub)
     ================================================================= */
  R.simulasi = function(app){
    var S = K.simulasi || {}, segs = S.segmen || [], P = S.pertanyaan || { opsi:[] }, by = {};
    segs.forEach(function(s){ by[s.id] = s; });
    var ICON = { pu:'building', bpu:'user', jakon:'helmet', pmi:'plane' };
    app.innerHTML =
      '<section class="sh-section" style="margin-top:4px" aria-labelledby="simQ">' + sectionHead(P.judul, 'Pilih jawaban yang paling sesuai, lalu Anda diarahkan ke simulator yang tepat.', null, 'simQ') +
        '<div class="sh-simcards">' + P.opsi.map(function(o){
          var s = by[o.ke]; if(!s) return '';
          return '<a class="sh-simcard"' + SH.aAttrs({ page:s.page, query:s.query }) + '>' +
            '<span class="art"><img src="' + esc(SH.artSrc(s.id)) + '" alt="" width="320" height="240" loading="lazy"></span>' +
            '<span class="tx"><small class="seg">' + I(ICON[s.id], 'xs') + esc(s.label) + '</small><strong>' + esc(o.label) + '</strong>' +
              '<small>' + esc(s.untuk) + '</small><small class="ex">Contoh: ' + esc(s.contoh) + '</small>' +
              '<span class="go">Mulai hitung ' + I('arrow', 'xs') + '</span></span></a>';
        }).join('') + '</div>' +
        '<p class="sh-sub" style="margin-top:10px">Ingin memahami segmennya dulu? <a href="' + SH.url('segmen') + '">Kenali segmen peserta</a>.</p></section>' +
      '<section class="sh-section" id="cari" aria-labelledby="simCari">' + sectionHead('Belum yakin? Cari dari usaha atau pekerjaan', 'Contoh: <b>bengkel las</b> (perusahaan), <b>ojol</b> (pekerja mandiri), <b>kontraktor</b> (jasa konstruksi), <b>TKI</b> (pekerja migran).', null, 'simCari') +
        '<div id="simSearchWrap"><form class="sh-search" id="simSearch" role="search" action="' + SH.url('simulasi') + '" method="get">' + I('search') +
          '<label class="sh-sr" for="simInput">Cari jenis usaha atau pekerjaan</label>' +
          '<input id="simInput" name="q" type="search" autocomplete="off" enterkeyhint="search" placeholder="Ketik jenis usaha atau pekerjaan…"><button type="submit" class="sh-go">Cari</button></form>' +
        '<div id="simResults" aria-live="polite"></div></div></section>' +
      noteBox('<strong>Catatan:</strong> hasil simulasi adalah perkiraan untuk membantu persiapan. Besaran resmi mengikuti ketentuan dan tagihan dari kanal resmi. Dasar hukum tiap simulator ada di halaman <a href="' + SH.url('peraturan') + '">Peraturan</a>.');
    if(SH.initSiteSearch) SH.initSiteSearch({ form:'simSearch', input:'simInput', results:'simResults', root:document.getElementById('simSearchWrap') });
  };

  /* =================================================================
     PENDAFTARAN
     ================================================================= */
  R.daftar = function(app){
    var segs = (K.daftar || {}).segmen || [];
    app.innerHTML =
      SH.safe('Website ini hanya memberi informasi. Data pribadi (NIK, KK, rekening) diisi di kanal resmi, bukan di sini atau lewat chat.') +
      '<p class="sh-sub">Belum yakin segmen yang tepat? <a href="' + SH.url('segmen') + '">Kenali segmen peserta</a>.</p>' +
      tabBar(segs.map(function(s){ return { id:s.id, label:SEG_TAB[s.id] || s.judul }; }), 'Segmen peserta', false, true) +
      segs.map(function(s){
        var sim = s.simulasi;
        return '<section class="sh-panel sh-anchor" id="' + esc(s.id) + '" role="tabpanel">' +
          '<div class="sh-card">' + head(s.judul, s.status, s.diperiksa) + '<p>' + esc(s.ringkas) + '</p>' +
            '<h3 class="sh-h3" style="margin-top:18px">Langkah umum</h3>' + steps(s.langkah) +
            '<div class="sh-btn-row">' + (sim ? '<a class="sh-btn is-primary"' + SH.aAttrs(sim) + '>' + I('calculator', 'sm') + esc(sim.label) + '</a>' : '') +
              '<a class="sh-btn is-outline" href="' + esc(SH.url('segmen-' + s.id)) + '">Tentang segmen ini ' + I('arrow', 'xs') + '</a></div>' +
          '</div>' +
          '<div class="sh-card"><h3 class="sh-h3">Kanal pendaftaran</h3><p>Pendaftaran dan data pribadi hanya melalui kanal berikut.</p>' + btnRow(s.kanal, 'is-soft') + '</div>' +
          ((s.formulir || []).length ? '<div class="sh-card"><h3 class="sh-h3" style="margin-bottom:10px">Formulir terkait</h3>' + formRows(s.formulir) + '</div>' : '') +
          SH.sourceHtml(s.sumber) +
        '</section>';
      }).join('');
    hashTabs(app.querySelector('.sh-tabs'), segs.map(function(s){ return s.id; }));
  };

  /* =================================================================
     KLAIM
     ================================================================= */
  R.klaim = function(app){
    var KL = K.klaim || {}, P = KL.program || [];
    function alurKicker(p, i){
      var n = (p.alur || []).length;
      if(n < 2) return '';
      return '<div class="sh-kicker">' + (p.alurTipe === 'pilihan' ? 'Pilihan ' + (i + 1) + (i < n - 1 ? ' · atau' : '') : 'Tahap ' + (i + 1) + ' dari ' + n) + '</div>';
    }
    app.innerHTML =
      '<div class="sh-btn-row" style="margin:0 0 10px">' + btn({ label:'Lacak status klaim', ext:'trackingKlaim' }, 'is-soft') + btn({ label:'Klaim JHT lewat JMO', page:'jmo', hash:'klaim-jht' }) + '</div>' +
      tabBar(P.map(function(p){ return { id:p.id, label:p.kode }; }), 'Program') +
      P.map(function(p){
        var pr = progById(p.id);
        return '<section class="sh-panel sh-anchor" id="' + esc(p.id) + '" role="tabpanel">' +
          '<div class="sh-card">' + head(p.kode + ' — ' + p.judul, p.status, p.diperiksa) + '<p>' + esc(p.ringkas) + '</p>' +
            '<h3 class="sh-h3" style="margin-top:16px">Kanal pengajuan</h3>' + btnRow(p.kanal, 'is-soft') +
            (pr ? '<p class="sh-sub" style="margin-top:12px">Manfaat dan siapa yang bisa ikut: <a href="' + esc(SH.url('program', null, p.id)) + '">tentang program ' + esc(p.kode) + '</a>.</p>' : '') +
          '</div>' +
          (p.alur || []).map(function(a, i){ return '<div class="sh-card">' + alurKicker(p, i) + '<h3 class="sh-h3">' + esc(a.judul) + '</h3>' + steps(a.langkah) + '</div>'; }).join('') +
          (p.dokumen ? '<div class="sh-card"><div class="sh-block-head"><h3 class="sh-h3">Dokumen yang umumnya disiapkan</h3>' + SH.statusBadge(p.dokumen.status, p.dokumen.diperiksa) + '</div>' +
            checklist(p.dokumen.items) + SH.safe('Siapkan dokumen asli. Jangan kirim foto dokumen melalui chat; unggah hanya di kanal resmi.') + SH.sourceHtml(p.dokumen.sumber) + '</div>' : '') +
          ((p.formulir || []).length ? '<div class="sh-card"><h3 class="sh-h3" style="margin-bottom:10px">Formulir</h3>' + formRows(p.formulir) + '</div>' : '') +
          (p.catatan || []).map(note).join('') +
          SH.sourceHtml(KL.sumberUmum) +
        '</section>';
      }).join('');
    hashTabs(app.querySelector('.sh-tabs'), P.map(function(p){ return p.id; }));
  };

  /* =================================================================
     TAMBAH / NONAKTIF PEKERJA
     ================================================================= */
  R.administrasi = function(app){
    var A = K.administrasi || {}, st = { peran:SH.param('peran'), segmen:SH.param('segmen') };
    function choice(name, val, title, sub){
      return '<button type="button" class="sh-choice" data-' + name + '="' + val + '" aria-pressed="false"><strong>' + esc(title) + '</strong><span>' + esc(sub) + '</span></button>';
    }
    var h = A.hrd || {}, pu = A.pesertaPu || {}, bpu = A.pesertaBpu || {};
    app.innerHTML =
      '<section class="sh-card"><h2 class="sh-h2">Anda mengurus dari posisi apa?</h2>' +
        '<div class="sh-seg" role="group" aria-label="Peran">' +
          choice('peran', 'hrd', 'HRD / pengurus perusahaan', 'Tambah, nonaktif, atau ubah data dan upah pekerja.') +
          choice('peran', 'peserta', 'Saya pekerja / peserta', 'Status kepesertaan saya perlu ditambah atau dinonaktifkan.') +
        '</div>' +
        '<div id="segWrap" hidden><h3 class="sh-h3" style="margin-top:16px">Kepesertaan Anda segmen apa?</h3><div class="sh-seg" role="group" aria-label="Segmen">' +
          choice('segmen', 'pu', 'Penerima Upah (PU)', 'Bekerja pada perusahaan / menerima upah.') +
          choice('segmen', 'bpu', 'Bukan Penerima Upah (BPU)', 'Pekerja mandiri / usaha sendiri.') +
        '</div></div>' +
      '</section>' +
      '<section id="p-hrd" class="sh-panel sh-anchor" hidden><div class="sh-card">' + head(h.judul || 'Administrasi pekerja perusahaan', h.status, h.diperiksa) + '<p>' + esc(h.ringkas) + '</p>' +
        '<div class="sh-actions" style="margin-top:14px">' + (h.aksi || []).map(function(a){
          var tp = ((K.sipp || {}).topik || []).filter(function(t){ return t.id === a.hash; })[0];
          return action({ label:a.label, desc:a.desc, ikon:(tp && tp.ikon) || 'monitor', page:a.page, hash:a.hash });
        }).join('') + '</div>' +
        btnRow([{ label:'Buka SIPP Online (resmi)', ext:'sipp' }], 'is-primary') + '</div></section>' +
      '<section id="p-pu" class="sh-panel sh-anchor" hidden><div class="sh-card">' + head(pu.judul || '', pu.status, pu.diperiksa) + '<p>' + esc(pu.teks) + '</p>' + btnRow(pu.aksi, 'is-soft') + '</div></section>' +
      '<section id="p-bpu" class="sh-panel sh-anchor" hidden><div class="sh-card">' + head(bpu.judul || '', bpu.status, bpu.diperiksa) + '<p>' + esc(bpu.teks) + '</p>' +
        (bpu.catatan ? noteBox(esc(bpu.catatan)) : '') + btnRow(bpu.aksi, 'is-soft') + '</div></section>';
    function update(push){
      app.querySelectorAll('[data-peran]').forEach(function(b){ b.setAttribute('aria-pressed', b.getAttribute('data-peran') === st.peran ? 'true' : 'false'); });
      app.querySelectorAll('[data-segmen]').forEach(function(b){ b.setAttribute('aria-pressed', b.getAttribute('data-segmen') === st.segmen ? 'true' : 'false'); });
      document.getElementById('segWrap').hidden = st.peran !== 'peserta';
      var show = st.peran === 'hrd' ? 'p-hrd' : (st.peran === 'peserta' && st.segmen === 'pu') ? 'p-pu' : (st.peran === 'peserta' && st.segmen === 'bpu') ? 'p-bpu' : '';
      ['p-hrd','p-pu','p-bpu'].forEach(function(pid){ document.getElementById(pid).hidden = pid !== show; });
      if(push){
        try{ history.replaceState(null, '', SH.url('administrasi', { peran:st.peran, segmen:st.peran === 'peserta' ? st.segmen : null })); }catch(e){}
        var target = show ? document.getElementById(show) : (st.peran === 'peserta' ? document.getElementById('segWrap') : null);
        if(target) setTimeout(function(){ target.scrollIntoView({ behavior:'smooth', block:'start' }); }, 30);
      }
    }
    app.addEventListener('click', function(e){
      var b = e.target.closest('[data-peran],[data-segmen]'); if(!b) return;
      if(b.hasAttribute('data-peran')){ st.peran = b.getAttribute('data-peran'); if(st.peran === 'hrd') st.segmen = null; }
      else st.segmen = b.getAttribute('data-segmen');
      update(true);
    });
    if(st.peran !== 'hrd' && st.peran !== 'peserta') st.peran = null;
    if(st.segmen !== 'pu' && st.segmen !== 'bpu') st.segmen = null;
    update(false);
  };

  /* =================================================================
     SIPP ONLINE & JMO
     ================================================================= */
  R.sipp = function(app){
    var S = K.sipp || {};
    tutorial(app, S, { page:'sipp', nama:'SIPP', flow:true, tanya:'Apa yang ingin Anda kerjakan di SIPP?',
      after:'<div class="sh-card is-accent"><p style="margin-top:0">' + esc(S.ringkas) + '</p>' +
          btnRow([{ label:'Buka SIPP Online (resmi)', ext:'sipp' }, { label:'Jalur administrasi pekerja', page:'administrasi', query:{ peran:'hrd' } }], 'is-primary') + '</div>' +
        SH.safe('Jangan bagikan akun, kata sandi, atau OTP SIPP kepada siapa pun, termasuk pihak yang mengaku petugas.'),
      afterTopic:SH.safe('Kerjakan langsung di <a' + SH.aAttrs({ ext:'sipp' }) + '>SIPP Online resmi ↗</a>. Jangan bagikan akun, kata sandi, atau OTP kepada siapa pun.') });
  };
  R.jmo = function(app){
    var J = K.jmo || {};
    var unduh = '<div class="sh-btn-row"><a class="sh-btn is-primary is-small"' + SH.aAttrs({ ext:'jmoPlayStore' }) + '>' + I('download', 'sm') + 'Google Play</a>' +
      '<a class="sh-btn is-primary is-small"' + SH.aAttrs({ ext:'jmoAppStore' }) + '>' + I('download', 'sm') + 'App Store</a></div>';
    tutorial(app, J, { page:'jmo', nama:'JMO', flow:false, tanya:'Apa yang ingin Anda lakukan di JMO?',
      after:'<div class="sh-card is-accent"><p style="margin-top:0">' + esc(J.ringkas) + '</p>' + unduh + '</div>' +
        (J.keamanan ? SH.safe(esc(J.keamanan)) : '') +
        '<p class="sh-sub">Syarat, dokumen, dan kanal lain untuk klaim JHT: <a href="' + SH.url('klaim', null, 'jht') + '">Panduan klaim JHT</a>.</p>',
      afterTopic:(J.keamanan ? SH.safe(esc(J.keamanan)) : '') });
  };

  /* =================================================================
     FORMULIR
     ================================================================= */
  R.formulir = function(app){
    var F = K.formulir || {}, G = F.grup || [], used = formUsage();
    app.innerHTML =
      noteBox(esc(F.catatan || '') + (SH.link('formulirResmi') ? ' <a' + SH.aAttrs({ ext:'formulirResmi' }) + '>Halaman formulir resmi ↗</a>' : '')) +
      '<div class="sh-search" style="margin:14px 0 6px;box-shadow:none">' + I('search') + '<label class="sh-sr" for="fq">Cari formulir</label>' +
        '<input id="fq" type="search" autocomplete="off" placeholder="Cari: JHT, kecelakaan, F5, beasiswa…"><button type="button" class="sh-clear" id="fqClear" aria-label="Hapus pencarian">' + I('close', 'sm') + '</button></div>' +
      chipsNav(G.map(function(g){ return { id:g.id, label:g.judul }; }), 'Kelompok formulir') +
      G.map(function(g){
        return '<section class="sh-section sh-anchor" id="' + esc(g.id) + '" data-group><h2 class="sh-h2" style="margin-bottom:10px">' + esc(g.judul) + '</h2><div class="sh-list">' +
          g.items.map(function(f){
            var u = (used[f.id] || []).concat(used[g.id] || []);
            var text = norm([f.kode, f.nama, f.fungsi, g.judul].concat(u.map(function(x){ return x.label; })).join(' '));
            return '<div class="sh-item sh-anchor" id="' + esc(f.id) + '" data-text="' + esc(text) + '">' +
              '<span class="ic code">' + esc(f.kode) + '</span>' +
              '<span class="body"><span class="t">' + esc(f.nama) + '</span><span class="d">' + esc(f.fungsi || '') + '</span>' +
                (u.length ? '<span class="n">Dipakai untuk: ' + u.map(function(x){ return '<a href="' + esc(x.href) + '">' + esc(x.label) + '</a>'; }).join(' · ') + '</span>' : '') +
                '<span class="n">' + SH.statusBadge(f.status, f.diperiksa) + '</span></span>' +
              '<a class="sh-btn is-soft is-small side" href="' + esc(f.url) + '" target="_blank" rel="noopener noreferrer" aria-label="Unduh PDF: ' + esc(f.nama) + '">' + I('download', 'xs') + 'PDF</a>' +
            '</div>';
          }).join('') + '</div></section>';
      }).join('') +
      '<div class="sh-empty" id="fEmpty" hidden>Tidak ada formulir yang cocok. <button type="button" class="sh-linkbtn" data-sh-konsul="Mencari formulir di halaman Formulir">Konsultasi langsung</button>, kami bantu carikan.</div>';
    var input = document.getElementById('fq');
    function filter(){
      var q = norm(input.value).split(' ').filter(Boolean), any = false;
      app.querySelectorAll('[data-group]').forEach(function(sec){
        var vis = 0;
        sec.querySelectorAll('[data-text]').forEach(function(r){
          var t = r.getAttribute('data-text'), ok = q.every(function(w){ return t.indexOf(w) >= 0; });
          r.hidden = !ok; if(ok) vis++;
        });
        sec.hidden = !vis; if(vis) any = true;
      });
      document.getElementById('fEmpty').hidden = any;
    }
    input.addEventListener('input', filter);
    document.getElementById('fqClear').addEventListener('click', function(){ input.value = ''; filter(); input.focus(); });
  };

  /* =================================================================
     PERATURAN
     ================================================================= */
  R.peraturan = function(app){
    var P = window.PERATURAN || { items:[], programs:{} }, prog = SH.param('program') || '';
    if(!P.programs[prog]) prog = '';
    var SIM = { pu:{ page:'pu', label:'Simulasi PU' }, bpu:{ page:'bpu', label:'Simulasi BPU' }, pmi:{ page:'pmi', label:'Simulasi PMI' }, jakon:{ page:'pu', query:{ view:'konstruksi' }, label:'Jasa Konstruksi' } };
    app.innerHTML =
      noteBox('Ringkasan di halaman ini disusun untuk memudahkan dan <strong>bukan pengganti teks resmi</strong>. Tautan mengarah ke PDF di JDIH BPK, JDIH Kemnaker, atau situs BPJS Ketenagakerjaan. ' +
        (P.diperiksa ? 'Tautan terakhir diperiksa ' + esc(SH.fmtDate(P.diperiksa)) + '.' : '')) +
      '<div class="sh-chips" role="group" aria-label="Saring menurut program">' +
        [''].concat(Object.keys(P.programs)).map(function(k){
          return '<button type="button" class="sh-chip" data-prog="' + k + '" aria-pressed="false">' + esc(k ? P.programs[k] : 'Semua') + '</button>';
        }).join('') + '</div>' +
      '<div id="perList" style="margin-top:6px"></div>';
    function draw(){
      app.querySelectorAll('[data-prog]').forEach(function(b){ b.setAttribute('aria-pressed', b.getAttribute('data-prog') === prog ? 'true' : 'false'); });
      var items = P.items.filter(function(it){ return !prog || it.program.indexOf(prog) >= 0; });
      document.getElementById('perList').innerHTML = items.map(function(it){
        return '<article class="sh-card sh-anchor" id="' + esc(it.id) + '"><div class="sh-kicker">' + I('scale', 'xs') + esc(it.nomor) + '</div><h2 class="sh-h3">' + esc(it.judul) + '</h2><p>' + esc(it.ringkas) + '</p>' +
          '<div style="margin-top:10px">' + it.program.map(function(p){ return '<span class="sh-tag">' + esc(P.programs[p] || p) + '</span>'; }).join('') + '</div>' +
          ((it.dipakai || []).length ? '<div class="sh-source">Dipakai di: ' + it.dipakai.map(function(d){ var s = SIM[d]; return s ? '<a href="' + esc(SH.url(s.page, s.query)) + '">' + esc(s.label) + '</a>' : esc(d); }).join(' · ') + '</div>' : '') +
          btnRow((it.tautan || []).map(function(t){ return { label:t.label, url:t.url }; }), 'is-soft') +
        '</article>';
      }).join('') || '<div class="sh-empty">Belum ada peraturan untuk program ini.</div>';
    }
    app.addEventListener('click', function(e){
      var b = e.target.closest('[data-prog]'); if(!b) return;
      prog = b.getAttribute('data-prog'); draw();
      try{ history.replaceState(null, '', SH.url('peraturan', prog ? { program:prog } : null)); }catch(err){}
    });
    draw();
  };

  /* =================================================================
     KANTOR & KONTAK
     ================================================================= */
  R.kontak = function(app){
    var o = C.office || {}, ct = C.contact || {}, cc = ct.callCenter || '175';
    var hasOffice = !!(o.name || o.address || o.hours || o.mapsUrl);
    var rows = [
      o.address ? ['pin', 'Alamat', esc(o.address)] : null,
      o.hours ? ['clock', 'Jam layanan', esc(o.hours)] : null,
      o.phone ? ['phone', 'Telepon', '<a href="tel:' + esc(String(o.phone).replace(/[^\d+]/g, '')) + '">' + esc(o.phone) + '</a>']
              : ['headset', 'Telepon', 'Tidak perlu menelepon: gunakan <button type="button" class="sh-linkbtn" data-sh-konsul="Kantor cabang">Konsultasi Langsung</button>, kami yang menghubungi Anda.']
    ].filter(Boolean);
    var CHANNELS = [
      { ikon:'phone', label:'Contact Center ' + cc, desc:'Layanan informasi dan pengaduan resmi.', url:'tel:' + cc },
      { ikon:'external', label:'Website resmi BPJS Ketenagakerjaan', desc:'bpjsketenagakerjaan.go.id', ext:'officialSite' },
      { ikon:'smartphone', label:'Aplikasi JMO', desc:'Panduan dan tautan unduh resmi.', page:'jmo' },
      { ikon:'wallet', label:'Lapak Asik', desc:'Layanan klaim secara daring.', ext:'lapakAsik' },
      { ikon:'search', label:'Lacak status klaim', desc:'Pelacakan pengajuan klaim.', ext:'trackingKlaim' },
      { ikon:'monitor', label:'SIPP Online', desc:'Administrasi kepesertaan perusahaan.', ext:'sipp' },
      { ikon:'helmet', label:'E-Jakon', desc:'Pendaftaran proyek Jasa Konstruksi.', ext:'ejakon' },
      { ikon:'plane', label:'Portal PMI', desc:'Perlindungan Pekerja Migran Indonesia.', ext:'pmiPortal' },
      { ikon:'briefcase', label:'SIAPkerja (Kemnaker)', desc:'Lapor PHK dan klaim JKP.', ext:'siapKerja' }
    ];
    app.innerHTML =
      '<div class="sh-actions" style="margin-top:4px">' + [
        { label:'Konsultasi langsung', desc:'Tinggalkan nomor HP, kami yang menghubungi', ikon:'headset', konsul:'Halaman Kantor & Kontak', primary:true },
        { label:'Kantor cabang', desc:hasOffice ? SH.officeShort() : 'Alamat & jam layanan', ikon:'pin', hash:'kantor' },
        { label:'Contact Center ' + cc, desc:'Telepon layanan resmi', ikon:'phone', url:'tel:' + cc }
      ].map(action).join('') + '</div>' +
      '<section class="sh-section sh-anchor" id="kantor"><h2 class="sh-h2" style="margin-bottom:10px">Kantor cabang</h2>' +
        (hasOffice
          ? '<div class="sh-office">' +
              '<div class="sh-office-head"><span class="ic">' + I('building') + '</span><div><small>Kantor cabang website ini</small><h3>' + esc(o.name || 'Kantor cabang') + '</h3></div></div>' +
              '<dl class="sh-office-dl">' + rows.map(function(r){ return '<div><dt>' + I(r[0], 'sm') + esc(r[1]) + '</dt><dd>' + r[2] + '</dd></div>'; }).join('') + '</dl>' +
              '<div class="sh-btn-row">' +
                (o.mapsUrl ? '<a class="sh-btn is-primary" href="' + esc(o.mapsUrl) + '" target="_blank" rel="noopener noreferrer">' + I('navigate', 'sm') + 'Petunjuk arah (Google Maps)</a>' : '') +
                (o.address ? '<button type="button" class="sh-btn is-outline" data-copy-address>' + I('copy', 'sm') + 'Salin alamat</button>' : '') +
              '</div>' +
            '</div>'
          : '<div class="sh-card" style="margin-top:0"><p><span class="sh-status draft">Belum diatur</span> Alamat, jam layanan, dan peta kantor cabang belum diisi oleh pengelola. Sementara itu, gunakan direktori kantor resmi di bawah.</p></div>') +
        list([{ ikon:'pin', label:'Cari kantor terdekat lainnya', desc:'Direktori kantor cabang resmi BPJS Ketenagakerjaan di seluruh Indonesia.', ext:'officeDirectory' }]) +
      '</section>' +
      '<section class="sh-section sh-anchor" id="konsultasi"><span id="petugas"></span><h2 class="sh-h2" style="margin-bottom:10px">Konsultasi langsung</h2>' +
        '<div class="sh-card sh-konsul-intro" style="margin-top:0">' +
          '<p style="margin-top:0">Punya pertanyaan yang belum terjawab di website ini? Tinggalkan nomor HP Anda, kami yang menghubungi melalui telepon atau WhatsApp' + (o.hours ? ' pada jam layanan (' + esc(o.hours) + ')' : '') + '.</p>' +
          '<ol class="sh-konsul-steps"><li><b>1</b><span>Ketuk <strong>Konsultasi Langsung</strong></span></li><li><b>2</b><span>Isi nomor HP: 08…, 628…, atau +628…</span></li><li><b>3</b><span>Tekan <strong>Kirim Permintaan</strong>, lalu tunggu dihubungi</span></li></ol>' +
          '<div class="sh-btn-row"><button type="button" class="sh-btn is-primary" data-sh-konsul="Halaman Kantor & Kontak">' + I('headset', 'sm') + 'Konsultasi Langsung</button>' +
            (SH.hasWhatsApp() ? '<button type="button" class="sh-btn is-outline" data-sh-wa="">' + I('chat', 'sm') + 'Chat WhatsApp</button>' : '') + '</div>' +
          SH.safe('Kami hanya menerima nomor HP untuk menghubungi Anda. Jangan kirim NIK, nomor KPJ, foto KTP/KK, nomor rekening, OTP, atau kata sandi. Bila data pribadi diperlukan, petugas akan mengarahkan Anda ke kanal resmi.') +
        '</div></section>' +
      '<section class="sh-section sh-anchor" id="kanal"><h2 class="sh-h2">Contact Center & kanal resmi</h2>' +
        '<p class="sh-sub">Transaksi dan data pribadi hanya diproses di kanal resmi. Alamat kanal resmi BPJS Ketenagakerjaan berakhiran <b>bpjsketenagakerjaan.go.id</b>; portal SIAPkerja dikelola Kemnaker (<b>kemnaker.go.id</b>).</p>' +
        list(CHANNELS) + '</section>';
    app.addEventListener('click', function(e){
      if(e.target.closest('[data-copy-address]')) SH.copyText((o.name ? o.name + ', ' : '') + o.address, 'Alamat kantor disalin.');
    });
  };

  /* =================================================================
     404
     ================================================================= */
  R['404'] = function(app){
    app.innerHTML =
      '<div id="nfWrap"><form class="sh-search" id="nfSearch" role="search" action="' + SH.url('home') + '" method="get">' + I('search') + '<label class="sh-sr" for="nfInput">Cari layanan</label>' +
        '<input id="nfInput" name="q" type="search" autocomplete="off" placeholder="Cari: klaim JHT, daftar BPU, bengkel, ojol…"><button type="submit" class="sh-go">Cari</button></form>' +
      '<div id="nfResults" aria-live="polite"></div></div>' +
      '<section class="sh-section"><div class="sh-actions">' + [
        { label:'Beranda', desc:'Mulai dari pencarian utama', ikon:'home', page:'home', primary:true },
        { label:'Simulasi iuran', desc:'PU, BPU, Jasa Konstruksi, PMI', ikon:'calculator', page:'simulasi' },
        { label:'Panduan klaim', desc:'JHT, JKK, JKM, JP, JKP', ikon:'wallet', page:'klaim' }
      ].map(action).join('') + '</div></section>';
    if(SH.initSiteSearch){
      SH.initSiteSearch({ form:'nfSearch', input:'nfInput', results:'nfResults', root:document.getElementById('nfWrap'), readUrl:false, updateUrl:false });
      var guess = decodeURIComponent(location.pathname.split('/').pop() || '').replace(/\.html?$/i, '').replace(/[-_]+/g, ' ').trim();
      if(guess && guess !== '404' && SH.siteSearch && SH.siteSearch.run){ document.getElementById('nfInput').value = guess; SH.siteSearch.run(guess); }
    }
  };

  /* =================================================================
     STATUS KONTEN (untuk pengelola)
     ================================================================= */
  R.status = function(app){
    var rows = [], media = [], ext = [];
    function stat(section, label, status, href, date){ rows.push({ section:section, label:label, status:status || 'draf', href:href, date:date }); }
    PG.program.forEach(function(p){ stat('Program', p.kode + ' — ' + p.nama, p.status, SH.url('program', null, p.id), p.diperiksa); });
    PG.segmen.forEach(function(s){ stat('Segmen', s.nama + ' (' + s.kode + ')', s.status, SH.url('segmen-' + s.id), s.diperiksa); });
    ((K.daftar || {}).segmen || []).forEach(function(s){ stat('Pendaftaran', s.judul, s.status, SH.url('daftar', null, s.id), s.diperiksa); });
    ((K.klaim || {}).program || []).forEach(function(p){
      stat('Klaim', p.kode + ' — isi panduan', p.status, SH.url('klaim', null, p.id), p.diperiksa);
      if(p.dokumen) stat('Klaim', p.kode + ' — daftar dokumen', p.dokumen.status, SH.url('klaim', null, p.id), p.dokumen.diperiksa);
    });
    var A = K.administrasi || {};
    [['hrd','HRD',{ peran:'hrd' }],['pesertaPu','Peserta PU',{ peran:'peserta', segmen:'pu' }],['pesertaBpu','Peserta BPU',{ peran:'peserta', segmen:'bpu' }]].forEach(function(x){
      if(A[x[0]]) stat('Administrasi', x[1] + ' — ' + (A[x[0]].judul || ''), A[x[0]].status, SH.url('administrasi', x[2]), A[x[0]].diperiksa);
    });
    [['sipp','SIPP'],['jmo','JMO']].forEach(function(x){
      (((K[x[0]] || {}).topik) || []).forEach(function(t, i){
        stat(x[1], t.judul, t.status, SH.url(x[0], null, t.id), t.diperiksa);
        var m = t.media || {};
        if(x[0] === 'sipp') media.push({ where:x[1] + ' · ' + t.judul, kind:'Langkah & flowchart', filled:!!t.alur,
          path:t.alur ? 'data/tutorial-sipp.js → alur ' + (t.alur === 'semua' ? '(semua)' : t.alur) : x[0] + '.topik[' + i + '].langkah',
          note:t.alur ? '' : 'Belum punya alur: hanya versi langkah (tanpa flowchart).' });
        ['video','foto'].forEach(function(k){
          if(!(k in m)) return;
          media.push({ where:x[1] + ' · ' + t.judul, kind:MEDIA_LABEL[k], filled:hasMedia(k, m), path:x[0] + '.topik[' + i + '].media.' + k + (k === 'video' ? '.youtube' : ''), note:'' });
        });
      });
    });
    ((window.TUTORIAL_SIPP || {}).alur || []).forEach(function(a){ stat('Alur SIPP', a.nomor + ' · ' + a.judul, a.status, 'flowchart/mutasi-data.html?ke=' + a.id, a.diperiksa); });
    (((K.formulir || {}).grup) || []).forEach(function(g){ g.items.forEach(function(f){ stat('Formulir', f.kode + ' — ' + f.nama, f.status, SH.url('formulir', null, f.id), f.diperiksa); ext.push({ label:'Formulir ' + f.kode, url:f.url }); }); });
    ((window.PERATURAN || {}).items || []).forEach(function(it){ (it.tautan || []).forEach(function(t){ ext.push({ label:it.nomor + ' — ' + t.label, url:t.url }); }); });
    PG.program.concat(PG.segmen).forEach(function(x){ (x.sumber || []).forEach(function(s){ if(s.url) ext.push({ label:'Sumber ' + (x.kode || '') + ' — ' + s.label, url:s.url }); }); });
    Object.keys(C.links || {}).reverse().forEach(function(k){ if(C.links[k]) ext.unshift({ label:'links.' + k, url:C.links[k] }); });
    var seenU = {}; ext = ext.filter(function(x){ if(seenU[x.url]) return false; seenU[x.url] = 1; return true; });

    var ok = rows.filter(function(r){ return r.status === 'terverifikasi'; }).length;
    var filled = media.filter(function(m){ return m.filled; }).length;
    var o = C.office || {}, KS = C.konsultasi || {}, SIM = C.simulasi || {};
    var kCara = KS.appsScriptUrl ? 'Google Apps Script (email + rekap Sheets)' : (KS.emailTujuan ? 'FormSubmit → ' + KS.emailTujuan : '');
    /* [label, kunci, nilai, wajib?] — isian opsional yang kosong tidak dihitung kurang */
    var cfg = [
      ['Nama kantor cabang', 'office.name', o.name, 1], ['Alamat kantor', 'office.address', o.address, 1],
      ['Jam layanan', 'office.hours', o.hours, 1], ['Tautan Google Maps', 'office.mapsUrl', o.mapsUrl, 1],
      ['Konsultasi Langsung: cara kirim', 'konsultasi.appsScriptUrl / emailTujuan', kCara, 1],
      ['Telepon kantor (opsional)', 'office.phone', o.phone, 0],
      ['Nomor WhatsApp petugas (opsional)', 'contact.whatsappNumber', (C.contact || {}).whatsappNumber, 0],
      ['Batas upah minimal simulasi PU / BPU', 'simulasi.minUpahPU / minPenghasilanBPU', (SIM.minUpahPU ? SH.rupiah(SIM.minUpahPU) : '—') + ' / ' + (SIM.minPenghasilanBPU ? SH.rupiah(SIM.minPenghasilanBPU) : '—'), 0],
      ['Banner foto terdaftar (opsional)', 'heroImages', Object.keys(C.heroImages || {}).join(', '), 0]
    ];
    var cfgNeed = cfg.filter(function(c){ return c[3]; }), cfgOk = cfgNeed.filter(function(c){ return c[2]; }).length;
    function table(headCells, bodyRows){ return '<div class="sh-table-wrap"><table class="sh-table"><thead><tr>' + headCells.map(function(h){ return '<th>' + h + '</th>'; }).join('') + '</tr></thead><tbody>' + bodyRows.join('') + '</tbody></table></div>'; }
    app.innerHTML =
      noteBox('Halaman ini untuk <strong>pengelola</strong>. Ringkasan dibuat otomatis dari berkas di folder <code>data/</code> dan <code>assets/js/site-config.js</code>.') +
      '<div class="sh-kv">' +
        '<div><small>Konten terverifikasi</small><b>' + ok + ' dari ' + rows.length + ' blok</b></div>' +
        '<div><small>Slot media terisi</small><b>' + filled + ' dari ' + media.length + ' slot</b></div>' +
        '<div><small>Konfigurasi wajib (kantor & konsultasi)</small><b' + (cfgOk < cfgNeed.length ? ' class="unset"' : '') + '>' + cfgOk + ' dari ' + cfgNeed.length + ' terisi</b></div>' +
        '<div><small>Uji pencarian beranda</small><b id="testSummary">Menjalankan…</b></div>' +
      '</div>' +
      '<section class="sh-section"><h2 class="sh-h2">Konfigurasi</h2><p class="sh-sub">Ubah di <code>assets/js/site-config.js</code>.</p>' +
        table(['Isian','Kunci','Status'], cfg.map(function(c){
          return '<tr><td>' + esc(c[0]) + (c[2] && typeof c[2] === 'string' && c[2].length < 70 ? '<br><small class="sh-muted">' + esc(c[2]) + '</small>' : '') + '</td><td><code>' + esc(c[1]) + '</code></td><td>' +
            (c[2] ? '<span class="sh-status ok">Terisi</span>' : (c[3] ? '<span class="sh-status draft">Kosong</span>' : '<span class="sh-badge tidak">Kosong</span>')) + '</td></tr>';
        })) +
        (KS.emailTujuan && !KS.appsScriptUrl ? '<p class="sh-sub" style="margin-top:10px">Konsultasi Langsung memakai FormSubmit. Kirim satu permintaan uji dari website yang sudah online, lalu klik <b>Activate Form</b> di email yang masuk ke ' + esc(KS.emailTujuan) + '. Untuk rekap otomatis di Google Sheets, pakai <code>tools/konsultasi-apps-script.gs</code> (README bagian 11).</p>' : '') +
        '<div class="sh-btn-row"><button type="button" class="sh-btn is-soft is-small" data-sh-konsul="Uji dari halaman Status Konten">' + I('headset', 'xs') + 'Uji formulir Konsultasi Langsung</button></div>' +
      '</section>' +
      '<section class="sh-section"><h2 class="sh-h2">Status konten</h2><p class="sh-sub">Setelah dicek terhadap sumber resmi, ubah <code>status</code> menjadi <code>\'terverifikasi\'</code> dan isi <code>diperiksa</code> (YYYY-MM-DD) di <code>data/konten.js</code> atau <code>data/program.js</code>.</p>' +
        table(['Bagian','Blok','Status'], rows.map(function(r){ return '<tr><td>' + esc(r.section) + '</td><td><a href="' + esc(r.href) + '">' + esc(r.label) + '</a></td><td>' + SH.statusBadge(r.status, r.date) + '</td></tr>'; })) + '</section>' +
      '<section class="sh-section"><h2 class="sh-h2">Slot media tutorial</h2><p class="sh-sub">Langkah &amp; flowchart SIPP dibuat dari <code>data/tutorial-sipp.js</code> (isian <code>alur</code> per topik di <code>data/konten.js</code>). Video: ID atau URL YouTube. Foto: daftar <code>{src, caption}</code>.</p>' +
        table(['Topik','Media','Lokasi isian','Status'], media.map(function(m){ return '<tr><td>' + esc(m.where) + (m.note ? '<br><small class="sh-muted">' + esc(m.note) + '</small>' : '') + '</td><td>' + esc(m.kind) + '</td><td><code>' + esc(m.path) + '</code></td><td>' + (m.filled ? '<span class="sh-status ok">Terisi</span>' : '<span class="sh-status draft">Kosong</span>') + '</td></tr>'; })) + '</section>' +
      '<section class="sh-section"><h2 class="sh-h2">Kamus & data pencarian</h2><div id="dataStats" class="sh-card"><p>Memuat kamus…</p></div></section>' +
      '<section class="sh-section"><h2 class="sh-h2">Uji pencarian beranda</h2><p class="sh-sub">Kasus uji ada di <code>data/uji-pencarian.js</code>. Jalankan ulang setelah mengubah kata kunci.</p><div id="testTable"></div></section>' +
      '<section class="sh-section"><h2 class="sh-h2">Tautan eksternal (' + ext.length + ')</h2><p class="sh-sub">Periksa berkala; tautan resmi dapat berubah sewaktu-waktu.</p>' +
        '<details class="sh-disclosure"><summary>Tampilkan daftar tautan</summary><div class="sh-disclosure-body">' +
        table(['Label','URL'], ext.map(function(x){ return '<tr><td>' + esc(x.label) + '</td><td style="word-break:break-all"><a href="' + esc(x.url) + '" target="_blank" rel="noopener noreferrer">' + esc(x.url) + '</a></td></tr>'; })) +
      '</div></details></section>';

    if(!SH.siteSearch) return;
    SH.siteSearch.engine().then(function(eng){
      var au = eng.audit(), jobs = 0;
      ((window.BPU_PEKERJAAN || {}).groups || []).forEach(function(g){ jobs += g.jobs.length; });
      var meta = (window.KAMUS_USAHA_PU || {}).metadata || {};
      document.getElementById('dataStats').innerHTML = '<div class="sh-kv">' +
        '<div><small>Kamus jenis usaha PU</small><b>v' + esc(meta.version || eng.version || '?') + ' · ' + au.entries + ' jenis usaha</b></div>' +
        '<div><small>Alias kamus PU</small><b>' + au.aliases + ' alias + ' + au.inferred + ' turunan</b></div>' +
        '<div><small>Alias berstatus draf</small><b' + (au.draft ? ' class="unset"' : '') + '>' + au.draft + ' jenis usaha</b></div>' +
        '<div><small>Pekerjaan BPU · layanan terindeks</small><b>' + jobs + ' pekerjaan · ' + (((window.LAYANAN_INDEX || {}).docs || []).length) + ' layanan</b></div>' +
      '</div>' + btnRow([{ label:'Buka mode kurator kamus PU', page:'pu', query:{ kurator:1 } }], 'is-soft');
      var cases = window.UJI_PENCARIAN || [], pass = 0, out = [];
      var chain = Promise.resolve();
      cases.forEach(function(c){
        chain = chain.then(function(){ return SH.siteSearch.search(c.q); }).then(function(r){
          var top = r.items[0] ? r.items[0].href : '', good = top.indexOf(c.top) === 0;
          if(good) pass++;
          out.push('<tr><td><a href="' + esc(SH.url('home', { q:c.q })) + '">' + esc(c.q) + '</a></td><td><code>' + esc(c.top) + '</code></td><td>' + (good ? '<span class="sh-status ok">Lulus</span>' : '<span class="sh-status draft">Gagal</span><br><small>' + esc(top || '(tanpa hasil)') + '</small>') + '</td></tr>');
        });
      });
      chain.then(function(){
        var el = document.getElementById('testSummary');
        el.textContent = pass + ' dari ' + cases.length + ' lulus';
        if(pass < cases.length) el.className = 'unset';
        document.getElementById('testTable').innerHTML = table(['Kueri','Hasil teratas diharapkan','Status'], out);
      });
    }).catch(function(e){ document.getElementById('dataStats').innerHTML = '<p>' + esc(e.message) + '</p>'; });
  };

  /* ---------- jalankan ---------- */
  SH.ready(function(){
    var app = document.getElementById('app'), pg = SH.page;
    var seg = /^segmen-(pu|bpu|jakon|pmi)$/.exec(pg);
    if(TITLES[pg]) SH.crumbs([{ label:TITLES[pg] }]);
    if(!app) return;
    try {
      if(seg) R.segmenDetail(app, seg[1]);
      else if(R[pg]) R[pg](app);
      else return;
    } catch(err){
      app.innerHTML = '<div class="sh-warn">Konten gagal dimuat: ' + esc(err.message) + '. Periksa berkas di folder data/.</div>';
      if(window.console) console.error(err);
      return;
    }
    SH.applyLinks(app);
    SH.reviewPill();
    if(pg !== 'sipp' && pg !== 'jmo') SH.reveal(app.children);
    // hash menuju elemen yang baru dirender (bukan tab). Saat pengguna menekan "Kembali",
    // posisi gulir terakhir dipulihkan browser — jangan dipaksa kembali ke #target.
    var h = decodeURIComponent(location.hash.slice(1)), el = h && document.getElementById(h);
    if(el && !el.hasAttribute('role') && SH.navType !== 'back_forward') setTimeout(function(){ jumpTo(el); }, 0);
  });
})();

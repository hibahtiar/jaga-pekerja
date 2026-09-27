/* =====================================================================
   JagaPekerja — renderer tutorial SIPP (satu sumber, dua tampilan)
   Data: data/tutorial-sipp.js. Berkas ini tidak memuat konten.

   - Versi LANGKAH   : daftar bernomor; bila ada cabang, pengguna menjawab
                       pertanyaannya dulu lalu langkah cabang itu muncul.
                       Nomor langkah bisa diketuk untuk menandai selesai.
   - Versi FLOWCHART : diagram kotak & panah; semua cabang tampil berdampingan
                       (di ponsel digeser ke samping).

   Dipakai oleh:
   - sipp.html  → window.SHFlow.mount(el, {...}) dari assets/js/pages.js
   - flowchart/mutasi-data.html → halaman mandiri (layar penuh / tujuan QR);
     halaman itu tidak memuat site.js sehingga berkas ini berdiri sendiri.
   ===================================================================== */
(function(){
  'use strict';

  var D = window.TUTORIAL_SIPP || { alur:[] };

  /* ---------- ikon (subset site.js, agar halaman mandiri tetap jalan) ---------- */
  var ICONS = {
    play:'<circle cx="12" cy="12" r="9"/><path d="m10 8.5 5.5 3.5-5.5 3.5z"/>',
    check:'<path d="m5 12.5 4.5 4.5L19 7.5"/>',
    alert:'<path d="M10.3 4.2 2.6 17.5A2 2 0 0 0 4.3 20.5h15.4a2 2 0 0 0 1.7-3L13.7 4.2a2 2 0 0 0-3.4 0z"/><path d="M12 9.5v4M12 17h.01"/>',
    flow:'<rect x="3" y="3.5" width="7" height="5" rx="1.5"/><rect x="14" y="15.5" width="7" height="5" rx="1.5"/><path d="M6.5 8.5V13a2 2 0 0 0 2 2H14"/>',
    info:'<circle cx="12" cy="12" r="9"/><path d="M12 11v5.5M12 7.8h.01"/>',
    clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3.2 2"/>',
    back:'<path d="M19 12H5M11 18l-6-6 6-6"/>',
    external:'<path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"/>'
  };
  function I(name, cls){
    return '<svg class="sh-i' + (cls ? ' ' + cls : '') + '" viewBox="0 0 24 24" aria-hidden="true" focusable="false">' + (ICONS[name] || ICONS.info) + '</svg>';
  }
  function E(s){
    return String(s == null ? '' : s).replace(/[&<>"']/g, function(c){
      return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];
    });
  }
  /* label DRAF per alur hanya untuk pengelola (?pengelola=1), sama seperti site.js */
  function pengelola(){
    if(window.SH && typeof SH.pengelola === 'boolean') return SH.pengelola;
    try{ return /[?&]pengelola=1/.test(location.search) || localStorage.getItem('sh-pengelola') === '1'; }catch(e){ return false; }
  }
  function badge(a){
    if(!pengelola()) return '';
    return a.status === 'terverifikasi'
      ? '<span class="sh-status ok">✓ Terverifikasi' + (a.diperiksa ? ' · ' + E(a.diperiksa) : '') + '</span>'
      : '<span class="sh-status draft">DRAF · belum diverifikasi</span>';
  }

  function byId(id){ for(var i = 0; i < D.alur.length; i++) if(D.alur[i].id === id) return D.alur[i]; return null; }
  function count(list){ return list.filter(function(x){ return x.t === 'langkah'; }).length; }
  function split(a){
    var iP = -1;
    for(var i = 0; i < a.node.length; i++){ if(a.node[i].t === 'pilihan'){ iP = i; break; } }
    return iP < 0 ? { before:a.node, p:null, after:[] } : { before:a.node.slice(0, iP), p:a.node[iP], after:a.node.slice(iP + 1) };
  }
  function cabangIndex(a, c){
    var p = split(a).p; if(!p) return 0;
    if(typeof c === 'number') return c >= 0 && c < p.cabang.length ? c : 0;
    for(var i = 0; i < p.cabang.length; i++) if(p.cabang[i].label === c) return i;
    return 0;
  }

  /* ---------- versi LANGKAH ---------- */
  function lkItem(n, num){
    if(n.t === 'mulai') return '<li class="sh-lk-start">' + I('play', 'sm') + '<span>' + E(n.teks) + '</span></li>';
    if(n.t === 'selesai') return '<li class="sh-lk-end' + (n.nada === 'tahan' ? ' is-tahan' : '') + '">' + I(n.nada === 'tahan' ? 'clock' : 'check', 'sm') +
      '<span>' + E(n.teks) + (n.ket ? '<small>' + E(n.ket) + '</small>' : '') + '</span></li>';
    if(n.t === 'aturan') return '<li class="sh-lk-tip">' + I('alert', 'sm') + '<span>' + E(n.teks) + '</span></li>';
    return '<li class="sh-lk-step"><button type="button" class="n" aria-pressed="false" aria-label="Tandai langkah ' + num + ' selesai">' + num + '</button>' +
      '<div><b>' + E(n.teks) + '</b>' + (n.ket ? '<small>' + E(n.ket) + '</small>' : '') + '</div></li>';
  }
  function lkList(nodes, start){
    var n = start;
    return nodes.map(function(x){ var h = lkItem(x, n); if(x.t === 'langkah') n++; return h; }).join('');
  }
  function langkahHtml(a, ci){
    var s = split(a), nB = count(s.before);
    var h = '<div class="sh-lk-when"><b>Kapan dipakai?</b> ' + E(a.kapan) + '</div><ol class="sh-lk">' + lkList(s.before, 1);
    if(s.p){
      var c = s.p.cabang[ci] || s.p.cabang[0];
      h += '<li class="sh-lk-q"><b><span class="q" aria-hidden="true">?</span>' + E(s.p.tanya) + '</b>' +
        '<div class="sh-lk-opts" role="group" aria-label="' + E(s.p.tanya) + '">' + s.p.cabang.map(function(o, k){
          return '<button type="button" data-cabang="' + k + '" aria-pressed="' + (k === ci) + '">' + E(o.label) + '</button>';
        }).join('') + '</div></li>' +
        '<li><ol class="sh-lk sh-lk-branch" style="margin:0" aria-live="polite">' + lkList(c.node, nB + 1) + '</ol></li>' +
        lkList(s.after, nB + count(c.node) + 1);
    }
    return h + '</ol>';
  }

  /* ---------- versi FLOWCHART ---------- */
  function fdNode(n, num){
    if(n.t === 'aturan') return '<div class="sh-fd-note">' + I('alert', 'xs') + '<span>' + E(n.teks) + '</span></div>';
    return '<div class="sh-fd-node is-' + n.t + (n.nada === 'tahan' ? ' is-tahan' : '') + '">' +
      (n.t === 'langkah' ? '<span class="n" aria-hidden="true">' + num + '</span>' : '') + E(n.teks) +
      (n.ket ? '<small>' + E(n.ket) + '</small>' : '') + '</div>';
  }
  function fdChain(nodes, start, lead){
    var n = start, out = [], box = !!lead;
    nodes.forEach(function(x){
      if(x.t === 'aturan'){ out.push(fdNode(x)); return; }
      if(box) out.push('<div class="sh-fd-arrow" aria-hidden="true"></div>');
      out.push(fdNode(x, n)); if(x.t === 'langkah') n++; box = true;
    });
    return out.join('');
  }
  function diagramHtml(a){
    var s = split(a), nB = count(s.before);
    var h = '<div class="sh-lk-when"><b>Kapan dipakai?</b> ' + E(a.kapan) + '</div><div class="sh-fd">' + fdChain(s.before, 1);
    if(s.p){
      var maxC = Math.max.apply(null, s.p.cabang.map(function(c){ return count(c.node); }));
      h += '<div class="sh-fd-arrow" aria-hidden="true"></div><div class="sh-fd-decision">' + E(s.p.tanya) + '</div>' +
        '<div class="sh-fd-arrow" aria-hidden="true"></div>' +
        '<div class="sh-fd-lanes-wrap"><div class="sh-fd-hint"><span class="swipe">Geser ke samping untuk cabang lain →</span>' +
          '<div class="sh-chips">' + s.p.cabang.map(function(c, k){ return '<button type="button" class="sh-chip" data-lane="' + k + '">' + E(c.label) + '</button>'; }).join('') + '</div></div>' +
        '<div class="sh-fd-lanes" style="--lanes:' + s.p.cabang.length + '">' + s.p.cabang.map(function(c, k){
          return '<div class="sh-fd-lane" data-lane-box="' + k + '"><div class="sh-fd-label">' + E(c.label) + '</div>' + fdChain(c.node, nB + 1) + '</div>';
        }).join('') + '</div></div>' +
        fdChain(s.after, nB + maxC + 1);
    }
    return h + '</div>';
  }

  /* ---------- pasang ke elemen ----------
     o = { ids:[id alur], aktif:id, cabang:indeks|label, mode:'langkah'|'flowchart',
           fullBase:'flowchart/mutasi-data.html' (tautan layar penuh, opsional),
           onAlur:function(id) (dipanggil saat tab alur berganti) } */
  function mount(el, o){
    o = o || {};
    var ids = (o.ids && o.ids.length ? o.ids : D.alur.map(function(a){ return a.id; })).filter(byId);
    if(!ids.length){ el.innerHTML = '<div class="sh-warn">Data alur belum termuat. Pastikan <code>data/tutorial-sipp.js</code> ikut diunggah.</div>'; return null; }
    var st = { aktif: ids.indexOf(o.aktif) >= 0 ? o.aktif : ids[0], mode: o.mode === 'flowchart' ? 'flowchart' : 'langkah' };
    st.cabang = cabangIndex(byId(st.aktif), o.cabang);

    function draw(){
      var a = byId(st.aktif);
      el.innerHTML =
        (ids.length > 1 ? '<div class="sh-tabs sh-tabs-sm sh-flow-tabs" role="tablist" aria-label="Pilih alur">' + ids.map(function(id){
          var x = byId(id);
          return '<button type="button" class="sh-tab" role="tab" data-alur="' + E(id) + '" aria-selected="' + (id === st.aktif) + '">' + E(x.nomor) + ' · ' + E(x.pil) + '</button>';
        }).join('') + '</div>' : '') +
        '<div class="sh-flow-card">' +
          (ids.length > 1 || o.showTitle ? '<div class="sh-block-head" style="margin-top:10px"><div><div class="sh-kicker">' + I('flow', 'xs') + 'Alur ' + E(a.nomor) + ' · ' + E(a.rujukan) + '</div>' +
            '<h3 class="sh-h2">' + E(a.judul) + '</h3></div>' + badge(a) + '</div>' : (badge(a) ? '<div style="margin-top:10px">' + badge(a) + '</div>' : '')) +
          (st.mode === 'flowchart' ? diagramHtml(a) : langkahHtml(a, st.cabang)) +
          (o.fullBase && st.mode === 'flowchart' ? '<div class="sh-btn-row"><a class="sh-btn is-outline is-small" href="' + E(o.fullBase + '?ke=' + encodeURIComponent(st.aktif)) + '" target="_blank" rel="noopener">' + I('external', 'xs') + 'Buka flowchart layar penuh</a></div>' : '') +
        '</div>';
      var tabs = el.querySelector('.sh-flow-tabs');
      if(tabs){
        var ujung = function(){ tabs.classList.toggle('is-end', tabs.scrollLeft + tabs.clientWidth >= tabs.scrollWidth - 2); };
        tabs.addEventListener('scroll', ujung); ujung();
        var on = tabs.querySelector('[aria-selected="true"]');
        if(on) tabs.scrollLeft = Math.max(0, on.offsetLeft - 16);
      }
    }
    el.addEventListener('click', function(e){
      var t = e.target.closest('[data-alur],[data-cabang],[data-lane],.sh-lk-step .n');
      if(!t || !el.contains(t)) return;
      if(t.hasAttribute('data-alur')){
        st.aktif = t.getAttribute('data-alur'); st.cabang = 0; draw();
        if(o.onAlur) o.onAlur(st.aktif);
      } else if(t.hasAttribute('data-cabang')){
        st.cabang = Number(t.getAttribute('data-cabang')); draw();
        var q = el.querySelector('.sh-lk-q');
        if(q && q.getBoundingClientRect().top < 0) q.scrollIntoView({ block:'start' });
      } else if(t.hasAttribute('data-lane')){
        var box = el.querySelector('[data-lane-box="' + t.getAttribute('data-lane') + '"]'), lanes = el.querySelector('.sh-fd-lanes');
        if(box && lanes) lanes.scrollTo({ left: box.offsetLeft - lanes.offsetLeft - 2, behavior:'smooth' });
      } else {
        var li = t.closest('.sh-lk-step'), done = !li.classList.contains('is-done');
        li.classList.toggle('is-done', done); t.setAttribute('aria-pressed', done ? 'true' : 'false');
        t.innerHTML = done ? I('check', 'xs') : t.getAttribute('aria-label').replace(/\D+/g, '');
      }
    });
    draw();
    return {
      setMode: function(m){ st.mode = m === 'flowchart' ? 'flowchart' : 'langkah'; draw(); },
      aktif: function(){ return st.aktif; }
    };
  }

  window.SHFlow = { data:D, byId:byId, mount:mount, langkahHtml:langkahHtml, diagramHtml:diagramHtml };

  /* ---------- halaman mandiri: flowchart/mutasi-data.html ---------- */
  var app = document.getElementById('app');
  if(!app || !document.body.classList.contains('sh-flow-page')) return;
  var ke = null;
  try{ var semua = new URLSearchParams(location.search).getAll('ke'); ke = semua.length ? semua[semua.length - 1] : null; }catch(e){}
  var mode = 'flowchart';
  try{ if(new URLSearchParams(location.search).get('tab') === 'langkah') mode = 'langkah'; }catch(e){}
  app.innerHTML =
    '<a class="sh-backlink" href="../sipp.html#mutasi-data">' + I('back', 'sm') + 'Kembali ke SIPP Online</a>' +
    '<div class="sh-pagehead has-art" style="margin-top:6px">' +
      '<div class="sh-kicker">' + I('flow', 'xs') + E(D.untuk) + '</div>' +
      '<h1 class="sh-h1">' + E(D.judul) + '</h1>' +
      '<p class="sh-lead">Pilih yang sedang Anda kerjakan, lalu ikuti cabang yang sesuai kondisi perusahaan.</p>' +
      (D.status !== 'terverifikasi' ? (pengelola() && D.catatanDraf
        ? '<div class="sh-warn">' + I('alert', 'sm') + '<div><strong>Masih draf.</strong> ' + E(D.catatanDraf) + '</div></div>'
        : '<div class="sh-review-pill" style="margin-top:12px">' + I('info', 'xs') + 'Isi sedang ditinjau · cocokkan dengan tampilan SIPP terbaru</div>') : '') +
      '<img class="sh-art" src="../assets/img/ilustrasi/sipp.svg" alt="" width="320" height="240">' +
    '</div>' +
    '<div class="sh-viewswitch" role="tablist" aria-label="Tampilan">' +
      '<button type="button" role="tab" data-mode="flowchart" aria-selected="' + (mode === 'flowchart') + '">' + I('flow', 'sm') + 'Flowchart</button>' +
      '<button type="button" role="tab" data-mode="langkah" aria-selected="' + (mode === 'langkah') + '">' + I('check', 'sm') + 'Langkah</button>' +
    '</div>' +
    '<div id="flowMount"></div>' +
    '<p class="sh-source">Sumber: ' + E(D.sumber) + '.</p>';
  var m = mount(document.getElementById('flowMount'), { aktif:ke, mode:mode, onAlur:function(id){
    try{ var u = new URL(location.href); u.searchParams.delete('ke'); u.searchParams.set('ke', id); history.replaceState(null, '', u.toString()); }catch(e){}
  }});
  app.querySelector('.sh-viewswitch').addEventListener('click', function(e){
    var b = e.target.closest('[data-mode]'); if(!b || !m) return;
    app.querySelectorAll('[data-mode]').forEach(function(x){ x.setAttribute('aria-selected', x === b ? 'true' : 'false'); });
    m.setMode(b.getAttribute('data-mode'));
  });
})();

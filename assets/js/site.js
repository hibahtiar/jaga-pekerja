/* =====================================================================
   JagaPekerja — inti bersama
   Header, navigasi bawah (ponsel), menu lengkap, panel pencarian global,
   Konsultasi Langsung (tombol + formulir nomor HP → email pengelola),
   kotak bantuan, footer, ikon, banner kepala halaman, dan helper (SH.*).
   Dimuat tepat setelah <header data-sh-header> di setiap halaman.
   ===================================================================== */
(function(){
  'use strict';
  var C = window.SITE_CONFIG || {};
  var SH = window.SH = { config: C };

  /* ---------- helper umum ---------- */
  SH.esc = function(s){
    return String(s == null ? '' : s).replace(/[&<>"']/g, function(c){
      return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];
    });
  };
  SH.rupiah = function(n){
    return new Intl.NumberFormat('id-ID',{style:'currency',currency:'IDR',maximumFractionDigits:0}).format(Math.round(n || 0));
  };
  SH.param = function(name){
    try { return new URLSearchParams(location.search).get(name); } catch(e){ return null; }
  };
  SH.url = function(page, query, hash){
    var u = (C.pages || {})[page] || page || '';
    if(query){
      var q = [];
      Object.keys(query).forEach(function(k){
        var v = query[k];
        if(v !== undefined && v !== null && v !== '') q.push(encodeURIComponent(k) + '=' + encodeURIComponent(v));
      });
      if(q.length) u += '?' + q.join('&');
    }
    if(hash) u += '#' + hash;
    return u;
  };
  SH.link = function(key){ return (C.links || {})[key] || ''; };
  /* Tautan dari data: {ext:'kunci'} → kanal resmi · {url} → langsung · {page, query, hash} → halaman situs */
  SH.href = function(o){
    if(!o) return '';
    if(o.ext) return SH.link(o.ext);
    if(o.url) return o.url;
    if(o.page) return SH.url(o.page, o.query, o.hash);
    if(o.hash) return '#' + o.hash;
    return '';
  };
  SH.isExternal = function(o){ return !!(o && (o.ext || /^https?:/i.test(o.url || ''))); };
  SH.aAttrs = function(o){
    return ' href="' + SH.esc(SH.href(o)) + '"' + (SH.isExternal(o) ? ' target="_blank" rel="noopener noreferrer"' : '');
  };
  SH.fmtDate = function(iso){
    if(!iso) return '';
    var d = new Date(iso + 'T00:00:00');
    if(isNaN(d)) return String(iso);
    try{ return d.toLocaleDateString('id-ID', {day:'numeric', month:'short', year:'numeric'}); }catch(e){ return String(iso); }
  };
  SH.ready = function(fn){
    if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', fn); else fn();
  };
  /* penyimpanan browser: bisa kosong / ditolak (mode privat), jadi selalu dibungkus try */
  SH.store = {
    get: function(k, d){ try{ var v = localStorage.getItem(k); return v == null ? d : JSON.parse(v); }catch(e){ return d; } },
    set: function(k, v){ try{ localStorage.setItem(k, JSON.stringify(v)); }catch(e){} },
    del: function(k){ try{ localStorage.removeItem(k); }catch(e){} }
  };
  function mq(q){ try{ return !!(window.matchMedia && matchMedia(q).matches); }catch(e){ return false; } }
  SH.motion = !mq('(prefers-reduced-motion: reduce)');
  /* layar sentuh (ponsel/tablet): dipakai untuk menghindari autofocus yang memunculkan keyboard */
  SH.touch = mq('(pointer: coarse)');
  var loaded = {};
  SH.loadScript = function(src){
    if(!loaded[src]) loaded[src] = new Promise(function(res, rej){
      var s = document.createElement('script'); s.src = src; s.onload = res;
      s.onerror = function(){ delete loaded[src]; rej(new Error('Gagal memuat ' + src)); };
      document.head.appendChild(s);
    });
    return loaded[src];
  };
  /* nama kantor ringkas untuk tombol kecil: "BPJS Ketenagakerjaan Kantor Cabang X" → "Kantor Cabang X" */
  SH.officeShort = function(){
    var n = (C.office || {}).name || '';
    return n.replace(/^BPJS\s+Ketenagakerjaan\s+/i, '') || 'Kantor cabang terdekat';
  };
  /* jenis navigasi: 'back_forward' berarti pengguna menekan Kembali — posisi gulir dipulihkan browser */
  SH.navType = (function(){
    try{ var n = performance.getEntriesByType('navigation')[0]; return n ? n.type : ''; }catch(e){ return ''; }
  })();

  /* ---------- ikon (SVG garis, 24×24) ---------- */
  var ICONS = {
    search:'<circle cx="11" cy="11" r="7"/><path d="m20 20-3.6-3.6"/>',
    mic:'<rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5.5 11a6.5 6.5 0 0 0 13 0M12 17.5V21"/>',
    close:'<path d="M6 6l12 12M18 6 6 18"/>',
    back:'<path d="M19 12H5M11 18l-6-6 6-6"/>',
    arrow:'<path d="M5 12h14M13 6l6 6-6 6"/>',
    chevron:'<path d="m9 6 6 6-6 6"/>',
    external:'<path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"/>',
    home:'<path d="M3.5 11 12 4l8.5 7"/><path d="M5.5 9.5V20h4.5v-6h4v6h4.5V9.5"/>',
    menu:'<path d="M4 7h16M4 12h16M4 17h16"/>',
    calculator:'<rect x="5" y="3" width="14" height="18" rx="2.5"/><path d="M8.5 7.5h7M8.5 11.5h.01M12 11.5h.01M15.5 11.5h.01M8.5 15h.01M12 15h.01M15.5 15h.01M8.5 18h.01M12 18h3.5"/>',
    userplus:'<circle cx="10" cy="8" r="4"/><path d="M3 20a7 7 0 0 1 12.5-4.3M19 8v6M16 11h6"/>',
    wallet:'<path d="M4 7.5A2.5 2.5 0 0 1 6.5 5H17v3"/><rect x="4" y="8" width="16" height="12" rx="2.5"/><path d="M20 12h-4a2 2 0 0 0 0 4h4"/>',
    users:'<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0"/><path d="M16 4.6a3.5 3.5 0 0 1 0 6.8M18.5 14.5A6.5 6.5 0 0 1 21.5 20"/>',
    building:'<rect x="4" y="3" width="11" height="18" rx="1.5"/><path d="M15 9h4a1 1 0 0 1 1 1v11h-5M7.5 7h4M7.5 11h4M7.5 15h4M9.5 21v-3"/>',
    user:'<circle cx="12" cy="8" r="4"/><path d="M4.5 21a7.5 7.5 0 0 1 15 0"/>',
    helmet:'<rect x="2.5" y="16" width="19" height="3.5" rx="1.75"/><path d="M5 16v-1a7 7 0 0 1 14 0v1"/><path d="M12 8v4.5M9.2 9l.9 3.5M14.8 9l-.9 3.5"/>',
    plane:'<path d="M12 3c.9 0 1.5.8 1.5 1.7V10l7 4v2l-7-2v4.3l2 1.4V21l-3.5-1-3.5 1v-1.3l2-1.4V14l-7 2v-2l7-4V4.7C10.5 3.8 11.1 3 12 3z"/>',
    shield:'<path d="M12 3 5 6v5.5c0 4.3 3 7.8 7 9.5 4-1.7 7-5.2 7-9.5V6z"/><path d="M12 8.5v6M9 11.5h6"/>',
    heart:'<path d="M12 20s-7.5-4.6-7.5-10.3A4.2 4.2 0 0 1 12 7.2a4.2 4.2 0 0 1 7.5 2.5C19.5 15.4 12 20 12 20z"/>',
    coins:'<ellipse cx="12" cy="6.5" rx="7" ry="3"/><path d="M5 6.5v4c0 1.7 3.1 3 7 3s7-1.3 7-3v-4M5 10.5v4c0 1.7 3.1 3 7 3s7-1.3 7-3v-4M5 14.5v3c0 1.7 3.1 3 7 3s7-1.3 7-3v-3"/>',
    calendar:'<rect x="4" y="5" width="16" height="15" rx="2.5"/><path d="M4 10h16M8.5 3v4M15.5 3v4M8 14h3M8 17h6"/>',
    briefcase:'<rect x="3" y="7" width="18" height="13" rx="2.5"/><path d="M9 7V5.5A1.5 1.5 0 0 1 10.5 4h3A1.5 1.5 0 0 1 15 5.5V7M3 12.5h18M11 12.5v2h2v-2"/>',
    file:'<path d="M14 3H7.5A2.5 2.5 0 0 0 5 5.5v13A2.5 2.5 0 0 0 7.5 21h9a2.5 2.5 0 0 0 2.5-2.5V8z"/><path d="M14 3v5h5M9 13h6M9 17h4"/>',
    scale:'<path d="M12 4v16M8 20h8M5 7.5h14M5 7.5 2.5 13a2.6 2.6 0 0 0 5 0zM19 7.5 16.5 13a2.6 2.6 0 0 0 5 0z"/>',
    pin:'<path d="M12 21s-7-6.1-7-11.2a7 7 0 0 1 14 0C19 14.9 12 21 12 21z"/><circle cx="12" cy="9.8" r="2.6"/>',
    chat:'<path d="M20.5 11.5a8 8 0 0 1-11.7 7.1L4 20l1.3-4.4A8 8 0 1 1 20.5 11.5z"/><path d="M9 11.5h.01M12.5 11.5h.01M16 11.5h.01"/>',
    headset:'<path d="M4 14v-2a8 8 0 0 1 16 0v2"/><rect x="3" y="13.5" width="4" height="6" rx="1.5"/><rect x="17" y="13.5" width="4" height="6" rx="1.5"/><path d="M19 19.5c0 1.4-1.3 2-3 2h-2.5"/>',
    phone:'<path d="M6.5 3.5h3l1.8 4.6-2.3 1.4a11 11 0 0 0 5.5 5.5l1.4-2.3 4.6 1.8v3a2 2 0 0 1-2.1 2A16.5 16.5 0 0 1 4.5 5.6a2 2 0 0 1 2-2.1z"/>',
    smartphone:'<rect x="7" y="2.5" width="10" height="19" rx="2.5"/><path d="M11 18.5h2"/>',
    monitor:'<rect x="3" y="4" width="18" height="12" rx="2"/><path d="M8.5 20h7M12 16v4"/>',
    book:'<path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H19v15H6.5A2.5 2.5 0 0 0 4 20.5z"/><path d="M4 20.5v-15M8.5 7.5h6"/>',
    info:'<circle cx="12" cy="12" r="9"/><path d="M12 11v5.5M12 7.8h.01"/>',
    alert:'<path d="M10.3 4.2 2.6 17.5A2 2 0 0 0 4.3 20.5h15.4a2 2 0 0 0 1.7-3L13.7 4.2a2 2 0 0 0-3.4 0z"/><path d="M12 9.5v4M12 17h.01"/>',
    check:'<path d="m5 12.5 4.5 4.5L19 7.5"/>',
    receipt:'<path d="M6 3h12v18l-3-2-3 2-3-2-3 2z"/><path d="M9 8h6M9 12h6M9 16h3"/>',
    refresh:'<path d="M20 11a8 8 0 0 0-14.5-4.5L4 8M4 4v4h4M4 13a8 8 0 0 0 14.5 4.5L20 16M20 20v-4h-4"/>',
    layers:'<path d="m12 3.5 9 5-9 5-9-5z"/><path d="m3 13 9 5 9-5"/>',
    lock:'<rect x="5" y="10.5" width="14" height="10" rx="2"/><path d="M8 10.5V8a4 4 0 0 1 8 0v2.5"/>',
    download:'<path d="M12 4v11M7 10.5l5 5 5-5M5 20h14"/>',
    clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3.2 2"/>',
    settings:'<circle cx="12" cy="12" r="3.2"/><path d="M12 2.5v3M12 18.5v3M4.3 4.3l2.1 2.1M17.6 17.6l2.1 2.1M2.5 12h3M18.5 12h3M4.3 19.7l2.1-2.1M17.6 6.4l2.1-2.1"/>',
    userminus:'<circle cx="10" cy="8" r="4"/><path d="M3 20a7 7 0 0 1 12.5-4.3M16 11h6"/>',
    key:'<circle cx="8" cy="15" r="4"/><path d="m11 12 8.5-8.5M16 7l2.5 2.5M14 9l2 2"/>',
    idcard:'<rect x="3" y="5" width="18" height="14" rx="2.5"/><circle cx="8.5" cy="11" r="2"/><path d="M5.5 16a3.2 3.2 0 0 1 6 0M14 10h4M14 13.5h3"/>',
    printer:'<path d="M7 9V4h10v5"/><rect x="3" y="9" width="18" height="8" rx="2"/><path d="M7 14h10v6H7zM17.5 12h.01"/>',
    share:'<circle cx="18" cy="5.5" r="2.5"/><circle cx="6" cy="12" r="2.5"/><circle cx="18" cy="18.5" r="2.5"/><path d="m8.2 10.8 7.6-4.1M8.2 13.2l7.6 4.1"/>',
    pdf:'<path d="M14 3H7.5A2.5 2.5 0 0 0 5 5.5v13A2.5 2.5 0 0 0 7.5 21h9a2.5 2.5 0 0 0 2.5-2.5V8z"/><path d="M14 3v5h5M12 11v6M9.5 14.5 12 17l2.5-2.5"/>',
    history:'<path d="M3.5 12a8.5 8.5 0 1 0 2.5-6"/><path d="M3 4v4h4M12 8v4.5l3 1.8"/>',
    play:'<circle cx="12" cy="12" r="9"/><path d="m10 8.5 5.5 3.5-5.5 3.5z"/>',
    image:'<rect x="3" y="4.5" width="18" height="15" rx="2.5"/><circle cx="9" cy="10" r="1.8"/><path d="m21 16-5-5-8.5 8.5"/>',
    flow:'<rect x="3" y="3.5" width="7" height="5" rx="1.5"/><rect x="14" y="15.5" width="7" height="5" rx="1.5"/><path d="M6.5 8.5V13a2 2 0 0 0 2 2H14"/>',
    send:'<path d="M21 3 10.5 13.5M21 3l-6.5 18-4-7.5L3 9.5z"/>',
    copy:'<rect x="8" y="8" width="12" height="12" rx="2.5"/><path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2"/>',
    navigate:'<path d="M3.5 11 20.5 3.5 13 20.5l-2-7.5z"/>',
    sparkle:'<path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M6 18l2.5-2.5M15.5 8.5 18 6"/>'
  };
  SH.icon = function(name, cls){
    return '<svg class="sh-i' + (cls ? ' ' + cls : '') + '" viewBox="0 0 24 24" aria-hidden="true" focusable="false">' + (ICONS[name] || ICONS.info) + '</svg>';
  };

  /* ---------- toast ---------- */
  var toastEl = null, toastTimer = null;
  SH.toast = function(msg, ms){
    if(!toastEl){
      toastEl = document.createElement('div');
      toastEl.className = 'sh-toast'; toastEl.setAttribute('role','status'); toastEl.setAttribute('aria-live','polite');
      document.body.appendChild(toastEl);
    }
    toastEl.textContent = msg; toastEl.classList.add('show');
    clearTimeout(toastTimer); toastTimer = setTimeout(function(){ toastEl.classList.remove('show'); }, ms || 3600);
  };

  /* ---------- WhatsApp & bagikan ----------
     Selama nomor WhatsApp petugas belum diisi, tombol "Chat petugas" membuka Konsultasi Langsung
     (isi pesan yang sudah disiapkan ikut terkirim sebagai konteks, tanpa data pribadi). */
  SH.hasWhatsApp = function(){ return !!((C.contact || {}).whatsappNumber); };
  SH.openWhatsApp = function(text){
    var num = (C.contact || {}).whatsappNumber;
    if(!num){
      SH.konsultasi.open({ konteks: String(text || '').replace(/^Halo Pak\/Bu,?\s*/i, '') });
      return false;
    }
    window.open('https://wa.me/' + num + '?text=' + encodeURIComponent(text || ''), '_blank', 'noopener');
    return true;
  };
  SH.share = function(opt){
    opt = opt || {};
    var text = [opt.text, opt.url].filter(Boolean).join('\n');
    if(navigator.share){
      return navigator.share({ title: opt.title, text: opt.text, url: opt.url }).catch(function(e){
        if(e && e.name === 'AbortError') return;
        return copy();
      });
    }
    return copy();
    function copy(){
      if(navigator.clipboard && navigator.clipboard.writeText){
        return navigator.clipboard.writeText(text).then(function(){ SH.toast('Disalin. Tempelkan ke WhatsApp atau aplikasi lain.'); })
          .catch(function(){ window.prompt('Salin teks berikut:', text); });
      }
      window.prompt('Salin teks berikut:', text);
    }
  };
  SH.copyText = function(text, done){
    function fallback(){ window.prompt('Salin teks berikut:', text); }
    if(navigator.clipboard && navigator.clipboard.writeText){
      navigator.clipboard.writeText(text).then(function(){ SH.toast(done || 'Disalin.'); }).catch(fallback);
    } else fallback();
  };

  /* ---------- status konten & sumber ----------
     Label DRAF per blok hanya tampil untuk pengelola: buka halaman mana pun dengan
     ?pengelola=1 (tersimpan di browser itu), matikan dengan ?pengelola=0.
     Pengunjung umum cukup melihat satu pita kecil "Isi sedang ditinjau". */
  (function(){
    var v = SH.param('pengelola');
    if(v === '1') SH.store.set('sh-pengelola', 1);
    else if(v === '0') SH.store.del('sh-pengelola');
  })();
  SH.pengelola = !!SH.store.get('sh-pengelola', 0) || (document.body && document.body.getAttribute('data-page')) === 'status';
  SH.hasDraft = false;
  SH.statusBadge = function(status, date){
    if(status === 'terverifikasi')
      return SH.pengelola ? '<span class="sh-status ok">✓ Terverifikasi' + (date ? ' · ' + SH.esc(SH.fmtDate(date)) : '') + '</span>' : '';
    SH.hasDraft = true;
    return SH.pengelola ? '<span class="sh-status draft">DRAF · belum diverifikasi</span>' : '';
  };
  /* satu pita ringkas di kepala halaman bila ada isi yang belum diverifikasi */
  SH.reviewPill = function(){
    if(!SH.hasDraft || SH.pengelola) return;
    var ph = document.querySelector('.sh-pagehead'); if(!ph || ph.querySelector('.sh-review-pill')) return;
    var p = document.createElement('div');
    p.className = 'sh-review-pill';
    p.innerHTML = SH.icon('info', 'xs') + 'Isi sedang ditinjau · ikuti ketentuan di kanal resmi';
    var body = ph.querySelector('.sh-head-body');
    if(body){ body.appendChild(p); return; }
    var art = ph.querySelector('.sh-art');
    ph.insertBefore(p, art || null);
  };
  /* catatan keamanan ringkas (satu baris) */
  SH.safe = function(html){ return '<p class="sh-safe">' + SH.icon('lock', 'sm') + '<span>' + html + '</span></p>'; };
  SH.sourceHtml = function(src, label){
    if(!src) return '';
    var list = (Array.isArray(src) ? src : [src]).filter(Boolean);
    if(!list.length) return '';
    return '<div class="sh-source">' + SH.esc(label || 'Sumber untuk verifikasi') + ': ' + list.map(function(s){
      var u = SH.href(s);
      return u ? '<a' + SH.aAttrs(s) + '>' + SH.esc(s.label) + (SH.isExternal(s) ? ' ↗' : '') + '</a>' : SH.esc(s.label);
    }).join(' · ') + '</div>';
  };

  /* ---------- suara (pencarian lisan, bila browser mendukung) ---------- */
  SH.attachVoice = function(btn, input, statusEl){
    var SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if(!SR || !btn || !input) return false;
    btn.hidden = false;
    var rec = null, on = false;
    function set(v){ on = v; btn.classList.toggle('on', v); btn.setAttribute('aria-pressed', v ? 'true' : 'false'); if(statusEl) statusEl.classList.toggle('on', v); }
    btn.addEventListener('click', function(){
      if(on){ try{ rec.stop(); }catch(e){} return; }
      try{ rec = new SR(); }catch(e){ SH.toast('Pencarian suara tidak didukung di browser ini.'); return; }
      rec.lang = 'id-ID'; rec.interimResults = true; rec.maxAlternatives = 1;
      rec.onstart = function(){ set(true); };
      rec.onresult = function(ev){
        var t = '';
        for(var i = 0; i < ev.results.length; i++) t += ev.results[i][0].transcript;
        input.value = t.trim();
        input.dispatchEvent(new Event('input', { bubbles:true }));
      };
      rec.onerror = function(ev){
        if(ev.error === 'not-allowed' || ev.error === 'service-not-allowed') SH.toast('Izin mikrofon ditolak. Aktifkan mikrofon di pengaturan browser, atau ketik pencarian Anda.');
        else if(ev.error === 'no-speech') SH.toast('Suara belum terdengar. Tekan ikon mikrofon lalu bicara.');
        else if(ev.error === 'network') SH.toast('Pencarian suara memerlukan koneksi internet.');
      };
      rec.onend = function(){ set(false); };
      try{ rec.start(); }catch(e){ set(false); }
    });
    return true;
  };

  /* ---------- halaman aktif ---------- */
  var page = (document.body && document.body.getAttribute('data-page')) || '';
  SH.page = page;
  function navHref(it){ return SH.url(it.page, it.query, it.hash); }
  function isCurrent(it){
    if(it.page === page){
      if(it.query && it.query.view) return SH.param('view') === it.query.view;
      return true;
    }
    return (it.cocok || []).indexOf(page) >= 0;
  }
  var I = SH.icon, E = SH.esc;

  /* ---------- header ---------- */
  /* "JagaPekerja" → <span>Jaga</span><span>Pekerja</span> (warna mengikuti logo) */
  SH.brandName = function(n){
    var m = /^([A-Z][a-z]+)([A-Z][A-Za-z]*)$/.exec(n || '');
    return m ? '<span class="b1">' + E(m[1]) + '</span><span class="b2">' + E(m[2]) + '</span>' : E(n || '');
  };
  function renderHeader(){
    var host = document.querySelector('[data-sh-header]');
    if(!host) return;
    var b = C.brand || {};
    host.classList.add('sh-header');
    host.innerHTML =
      '<a class="sh-skip" href="#main">Langsung ke isi</a>' +
      '<div class="sh-header-inner">' +
        '<a class="sh-brand" href="' + SH.url('home') + '" aria-label="' + E(b.name) + ' — Beranda">' +
          (b.logo ? '<img class="sh-logo" src="' + E((SH.base || '') + b.logo) + '" alt="" width="42" height="42" decoding="async">'
                  : '<span class="sh-mark" aria-hidden="true"><i></i><i></i><i></i></span>') +
          '<span class="sh-brand-text"><strong>' + SH.brandName(b.name) + '</strong><small>' + E(b.sub) + '</small></span>' +
        '</a>' +
        '<nav class="sh-topnav" aria-label="Navigasi utama">' + (C.topNav || []).map(function(it){
          return '<a href="' + E(navHref(it)) + '"' + (isCurrent(it) ? ' aria-current="page"' : '') + '>' + E(it.label) + '</a>';
        }).join('') + '</nav>' +
        '<button type="button" class="sh-hbtn" data-sh-search>' + I('search', 'sm') + 'Cari</button>' +
        '<button type="button" class="sh-hbtn" data-sh-menu aria-expanded="false" aria-controls="sh-drawer">' + I('menu', 'sm') + 'Menu</button>' +
      '</div>';
  }

  /* ---------- navigasi bawah (ponsel) ---------- */
  function renderBottomNav(){
    var nav = document.createElement('nav');
    nav.className = 'sh-bottomnav'; nav.setAttribute('aria-label', 'Navigasi cepat');
    nav.innerHTML =
      '<a href="' + SH.url('home') + '"' + (page === 'home' ? ' aria-current="page"' : '') + '>' + I('home') + '<span>Beranda</span></a>' +
      '<button type="button" data-sh-search>' + I('search') + '<span>Cari</span></button>' +
      '<a href="' + SH.url('kontak') + '"' + (page === 'kontak' ? ' aria-current="page"' : '') + '>' + I('headset') + '<span>Bantuan</span></a>' +
      '<button type="button" data-sh-menu aria-expanded="false" aria-controls="sh-drawer">' + I('menu') + '<span>Menu</span></button>';
    document.body.appendChild(nav);
    document.body.classList.add('sh-has-nav');
  }

  /* ---------- menu lengkap (laci) ---------- */
  var ov = null, lastFocus = null;
  function buildDrawer(){
    ov = document.createElement('div');
    ov.className = 'sh-overlay'; ov.id = 'sh-overlay';
    ov.innerHTML =
      '<aside class="sh-drawer" id="sh-drawer" role="dialog" aria-modal="true" aria-label="Menu">' +
        '<div class="sh-drawer-head"><strong>Menu</strong><button type="button" class="sh-iconbtn" data-close aria-label="Tutup menu">' + I('close', 'sm') + '</button></div>' +
        '<button type="button" class="sh-drawer-search" data-sh-search>' + I('search', 'sm') + 'Cari informasi…</button>' +
        '<button type="button" class="sh-drawer-konsul" data-sh-konsul>' + I('headset', 'sm') + '<span><strong>Konsultasi Langsung</strong><small>Tinggalkan nomor HP, kami yang menghubungi</small></span></button>' +
        (C.nav || []).map(function(g){
          return '<div class="sh-menu-group"><div class="sh-menu-title">' + E(g.title) + '</div><div class="sh-menu-list">' +
            g.items.map(function(it){
              return '<a class="sh-menu-item" href="' + E(navHref(it)) + '"' + (isCurrent(it) ? ' aria-current="page"' : '') + '>' +
                '<span class="ic">' + I(it.ikon || 'chevron', 'sm') + '</span>' +
                '<span class="tx"><strong>' + E(it.label) + '</strong>' + (it.sub ? '<small>' + E(it.sub) + '</small>' : '') + '</span>' +
                '<span class="chev">' + I('chevron', 'xs') + '</span></a>';
            }).join('') + '</div></div>';
        }).join('') +
        '<div class="sh-drawer-foot">' + E((C.brand || {}).name || '') + ' adalah portal informasi dan panduan. Pendaftaran, pembayaran, klaim, dan data pribadi hanya melalui kanal resmi BPJS Ketenagakerjaan.</div>' +
      '</aside>';
    document.body.appendChild(ov);
    ov.addEventListener('click', function(e){
      if(e.target === ov || e.target.closest('[data-close]')){ SH.closeMenu(); return; }
      var a = e.target.closest('a.sh-menu-item');
      if(a && a.getAttribute('href').split('#')[0] === location.pathname.split('/').pop()) SH.closeMenu();
    });
  }
  function setExpanded(v){ document.querySelectorAll('[data-sh-menu]').forEach(function(b){ b.setAttribute('aria-expanded', v ? 'true' : 'false'); }); }
  SH.openMenu = function(){
    if(!ov) buildDrawer();
    lastFocus = document.activeElement;
    ov.classList.add('open'); document.body.classList.add('sh-no-scroll'); setExpanded(true);
    setTimeout(function(){ var c = ov.querySelector('[data-close]'); if(c) c.focus(); }, 30);
  };
  SH.closeMenu = function(){
    if(!ov || !ov.classList.contains('open')) return;
    ov.classList.remove('open'); document.body.classList.remove('sh-no-scroll'); setExpanded(false);
    if(lastFocus && lastFocus.focus) lastFocus.focus();
  };

  /* ---------- panel pencarian global ---------- */
  var sp = null, spReady = null, spFocus = null;
  var POPULER = C.searchPopular || ['Cairkan JHT','Daftar pekerja mandiri','Iuran karyawan','Kecelakaan kerja','Kena PHK','Kantor terdekat'];
  SH.popularChips = function(bare){
    var h = POPULER.map(function(p){ return '<button type="button" class="sh-chip" data-q="' + E(p.toLowerCase()) + '">' + E(p) + '</button>'; }).join('');
    return bare ? h : '<div class="sh-chips">' + h + '</div>';
  };
  function ensureSearchScripts(){
    if(!spReady){
      var need = [];
      if(!window.LAYANAN_INDEX) need.push('data/layanan.js');
      if(!window.BPU_PEKERJAAN) need.push('data/bpu-pekerjaan.js');
      if(!SH.initSiteSearch) need.push('assets/js/site-search.js');
      spReady = need.reduce(function(p, src){ return p.then(function(){ return SH.loadScript(src); }); }, Promise.resolve());
    }
    return spReady;
  }
  function buildSearchPanel(){
    sp = document.createElement('div');
    sp.className = 'sh-searchpanel'; sp.id = 'sh-searchpanel';
    sp.setAttribute('role', 'dialog'); sp.setAttribute('aria-modal', 'true'); sp.setAttribute('aria-label', 'Cari informasi');
    sp.innerHTML =
      '<div class="sh-searchpanel-box">' +
        '<div class="sh-searchpanel-top">' +
          '<form class="sh-search" id="shq-form" role="search" action="' + SH.url('home') + '" method="get">' +
            '<button type="button" class="sh-back" data-close aria-label="Tutup pencarian">' + I('back') + '</button>' +
            '<label class="sh-sr" for="shq">Cari informasi</label>' +
            '<input id="shq" name="q" type="search" autocomplete="off" enterkeyhint="search" placeholder="Ketik kebutuhan Anda…">' +
            '<button type="button" class="sh-clear" hidden aria-label="Hapus teks">' + I('close', 'sm') + '</button>' +
            '<button type="button" class="sh-mic" hidden aria-label="Cari dengan suara" aria-pressed="false">' + I('mic') + '</button>' +
          '</form>' +
          '<div class="sh-searchpanel-inner"><div class="sh-listen" id="shq-listen">Mendengarkan… silakan bicara.</div></div>' +
        '</div>' +
        '<div class="sh-searchpanel-body"><div class="sh-searchpanel-inner">' +
          '<div id="shq-results" aria-live="polite"></div>' +
          '<div id="shq-idle">' +
            '<div class="sh-chips-label">Sering dicari</div>' + SH.popularChips() +
            '<div class="sh-chips-label">Akses cepat</div>' +
            '<div class="sh-list" style="margin-top:10px">' + [
              { page:'simulasi', label:'Simulasi iuran', ikon:'calculator' },
              { page:'daftar', label:'Cara mendaftar', ikon:'userplus' },
              { page:'klaim', label:'Klaim manfaat', ikon:'wallet' },
              { page:'segmen', label:'Segmen peserta: saya termasuk yang mana?', ikon:'layers' },
              { page:'kontak', hash:'kantor', label:'Kantor cabang & konsultasi', ikon:'pin' }
            ].map(function(x){ return '<a class="sh-item" href="' + E(SH.url(x.page, null, x.hash)) + '"><span class="ic">' + I(x.ikon, 'sm') + '</span><span class="body"><span class="t">' + E(x.label) + '</span></span><span class="chev">' + I('chevron', 'xs') + '</span></a>'; }).join('') +
            '</div>' +
          '</div>' +
        '</div></div>' +
      '</div>';
    document.body.appendChild(sp);
    var input = sp.querySelector('#shq'), clear = sp.querySelector('.sh-clear');
    sp.addEventListener('click', function(e){
      if(e.target === sp || e.target.closest('[data-close]')) SH.closeSearch();
    });
    clear.addEventListener('click', function(){ input.value = ''; input.dispatchEvent(new Event('input', { bubbles:true })); input.focus(); });
    input.addEventListener('input', function(){ clear.hidden = !input.value; });
    SH.attachVoice(sp.querySelector('.sh-mic'), input, sp.querySelector('#shq-listen'));
  }
  SH.openSearch = function(q){
    SH.closeMenu();
    var inline = document.querySelector('[data-sh-inline-search]');
    if(inline){
      inline.scrollIntoView({ block:'center' });
      if(q != null){ inline.value = q; inline.dispatchEvent(new Event('input', { bubbles:true })); }
      inline.focus();
      return;
    }
    if(!sp) buildSearchPanel();
    SH.closeMenu();
    spFocus = document.activeElement;
    sp.classList.add('open'); document.body.classList.add('sh-no-scroll');
    var input = sp.querySelector('#shq');
    setTimeout(function(){ input.focus(); }, 30);
    ensureSearchScripts().then(function(){
      if(!sp.getAttribute('data-ready')){
        sp.setAttribute('data-ready', '1');
        SH.initSiteSearch({ form:'shq-form', input:'shq', results:'shq-results', root:sp, readUrl:false, updateUrl:false,
          onRender:function(out){ document.getElementById('shq-idle').hidden = !!(out && out.query && out.query.trim()); } });
      }
      if(q != null) input.value = q;
      // teks yang sudah diketik selagi skrip pencarian dimuat tetap diproses
      if(input.value.trim()) input.dispatchEvent(new Event('input', { bubbles:true }));
    }).catch(function(err){ document.getElementById('shq-results').innerHTML = '<div class="sh-res show"><div class="sh-res-note">' + E(err.message) + '</div></div>'; });
  };
  SH.closeSearch = function(){
    if(!sp || !sp.classList.contains('open')) return;
    sp.classList.remove('open'); document.body.classList.remove('sh-no-scroll');
    if(spFocus && spFocus.focus) spFocus.focus();
  };

  /* =====================================================================
     KONSULTASI LANGSUNG
     Alur: tombol "Konsultasi" → formulir nomor HP → validasi format Indonesia
     (08…, 628…, +628…) → "Kirim Permintaan" → email ke pengelola
     (Google Apps Script bila appsScriptUrl diisi, selain itu FormSubmit ke emailTujuan)
     → pengelola menghubungi nomor tersebut secara manual.
     Tidak ada data selain nomor HP, waktu, dan halaman asal yang dikirim.
     ===================================================================== */
  /* Validasi nomor HP Indonesia. Spasi, tanda hubung, titik, dan kurung diabaikan. */
  SH.validasiHP = function(raw){
    var s = String(raw == null ? '' : raw).trim();
    if(!s) return { ok:false, pesan:'Masukkan nomor HP Anda.' };
    if(/[^\d\s+().\-]/.test(s)) return { ok:false, pesan:'Nomor HP hanya boleh berisi angka (boleh diawali tanda +).' };
    var plus = s.charAt(0) === '+';
    if((s.match(/\+/g) || []).length > (plus ? 1 : 0)) return { ok:false, pesan:'Tanda + hanya boleh di depan, contoh: +6281234567890.' };
    var d = s.replace(/\D/g, ''), nsn;
    if(plus){
      if(d.indexOf('62') !== 0) return { ok:false, pesan:'Gunakan nomor Indonesia: +62 lalu 8…, contoh +6281234567890.' };
      nsn = d.slice(2);
    } else if(d.indexOf('62') === 0) nsn = d.slice(2);
    else if(d.charAt(0) === '0') nsn = d.slice(1);
    else return { ok:false, pesan:'Awali nomor dengan 08, 628, atau +628.' };
    if(nsn.charAt(0) === '0') return { ok:false, pesan:'Setelah 62 langsung angka 8, tanpa 0. Contoh: 6281234567890.' };
    if(nsn.charAt(0) !== '8') return { ok:false, pesan:'Nomor HP Indonesia diawali 08 (atau 628 / +628). Nomor telepon rumah/kantor belum bisa dipakai.' };
    if(!/^8[1-9]/.test(nsn)) return { ok:false, pesan:'Nomor HP tidak dikenali. Periksa lagi angka setelah 08.' };
    var len = nsn.length + 1;            // panjang dalam format 08…
    if(len < 10) return { ok:false, pesan:'Nomor terlalu pendek. Nomor HP Indonesia umumnya 10–13 angka (08…).' };
    if(len > 13) return { ok:false, pesan:'Nomor terlalu panjang. Nomor HP Indonesia umumnya 10–13 angka (08…).' };
    if(/^(\d)\1+$/.test(nsn.slice(2))) return { ok:false, pesan:'Nomor HP tidak valid. Periksa kembali.' };
    var lok = '0' + nsn, rest = lok.slice(4), half = Math.ceil(rest.length / 2);
    return { ok:true, lokal:lok, intl:'62' + nsn, e164:'+62' + nsn, tampil:lok.slice(0, 4) + '-' + rest.slice(0, half) + '-' + rest.slice(half) };
  };
  var KF = null, kState = { konteks:'', busy:false, lastFocus:null };
  function kcfg(){ return C.konsultasi || {}; }
  function kReady(){ var k = kcfg(); return !!(k.appsScriptUrl || k.emailTujuan); }
  /* waktu dalam WIB, apa pun zona waktu perangkat pengunjung */
  function wib(d){
    try{
      var tgl = new Intl.DateTimeFormat('id-ID', { timeZone:'Asia/Jakarta', weekday:'long', day:'numeric', month:'long', year:'numeric' }).format(d);
      var jam = new Intl.DateTimeFormat('id-ID', { timeZone:'Asia/Jakarta', hour:'2-digit', minute:'2-digit', hour12:false }).format(d).replace(':', '.');
      return { panjang: tgl + ' pukul ' + jam + ' WIB', jam: jam, singkat: new Intl.DateTimeFormat('id-ID', { timeZone:'Asia/Jakarta', day:'2-digit', month:'2-digit' }).format(d) + ' ' + jam + ' WIB' };
    }catch(e){ var t = d.toLocaleString(); return { panjang:t, jam:t, singkat:t }; }
  }
  function kodeId(d){
    var p = function(n){ return ('0' + n).slice(-2); };
    var j = new Date(d.getTime() + (7 * 60 + d.getTimezoneOffset()) * 60000);   // WIB
    var r = Math.random().toString(36).slice(2, 5).toUpperCase();
    return 'KL-' + String(j.getFullYear()).slice(2) + p(j.getMonth() + 1) + p(j.getDate()) + '-' + p(j.getHours()) + p(j.getMinutes()) + '-' + r;
  }
  function pageLabel(){
    var h = document.querySelector('main h1, .container h1');
    var t = (h && h.textContent) || document.title || '';
    return t.replace(/\s+/g, ' ').trim().slice(0, 90);
  }
  function fetchTimeout(url, opt, ms){
    var ctl = window.AbortController ? new AbortController() : null, timer = null;
    if(ctl){ opt.signal = ctl.signal; timer = setTimeout(function(){ ctl.abort(); }, ms || 15000); }
    return fetch(url, opt).then(function(r){ clearTimeout(timer); return r; }, function(e){ clearTimeout(timer); throw e; });
  }
  /* kirim permintaan → Promise {id} */
  SH.kirimKonsultasi = function(v, konteks, trap){
    var k = kcfg(), now = new Date(), w = wib(now), id = kodeId(now);
    var halaman = pageLabel(), url = location.href.split('#')[0];
    var perangkat = SH.touch ? 'Ponsel/tablet' : 'Komputer';
    if(trap) return new Promise(function(res){ setTimeout(function(){ res({ id:id }); }, 600); });   // jebakan bot: pura-pura berhasil
    if(k.appsScriptUrl){
      // text/plain = "simple request" → tanpa preflight CORS; Apps Script membaca e.postData.contents
      return fetchTimeout(k.appsScriptUrl, { method:'POST', body:JSON.stringify({
        id:id, nomor:v.lokal, nomorIntl:v.intl, waktu:w.panjang, halaman:halaman, url:url, konteks:konteks || '', perangkat:perangkat, situs:(C.brand || {}).name || ''
      }) }).then(function(r){ return r.json(); }).then(function(j){
        if(!j || j.ok !== true) throw new Error((j && j.error) || 'Server menolak permintaan');
        return { id:j.id || id };
      });
    }
    if(k.emailTujuan){
      var brand = (C.brand || {}).name || 'Website';
      var body = {
        'Jenis permintaan':'KONSULTASI LANGSUNG — pengunjung minta dihubungi',
        'Nomor HP':v.tampil,
        'Nomor internasional':v.e164,
        'Chat WhatsApp':'https://wa.me/' + v.intl,
        'Waktu permintaan':w.panjang,
        'Dari halaman':halaman + ' — ' + url,
        'Konteks':konteks || '-',
        'Perangkat':perangkat,
        'ID permintaan':id,
        'Tindak lanjut':'Hubungi nomor di atas secara manual pada jam layanan.',
        _subject:'[' + brand + '] Konsultasi Langsung · ' + v.tampil + ' · ' + w.singkat,
        _template:'table', _captcha:'false', _honey:''
      };
      return fetchTimeout('https://formsubmit.co/ajax/' + encodeURIComponent(k.emailTujuan), {
        method:'POST', headers:{ 'Content-Type':'application/json', 'Accept':'application/json' }, body:JSON.stringify(body)
      }).then(function(r){ return r.json(); }).then(function(j){
        if(!j || String(j.success) !== 'true'){
          var msg = (j && j.message) || '';
          var err = new Error(msg || 'Pengiriman gagal');
          if(/activat/i.test(msg)) err.kode = 'aktivasi';
          throw err;
        }
        return { id:id };
      });
    }
    return Promise.reject(Object.assign(new Error('Belum diatur'), { kode:'belum' }));
  };
  function buildKonsul(){
    var k = kcfg(), o = C.office || {}, cc = (C.contact || {}).callCenter || '175';
    KF = document.createElement('div');
    KF.className = 'sh-konsul-ov'; KF.id = 'sh-konsul';
    KF.innerHTML =
      '<div class="sh-konsul" role="dialog" aria-modal="true" aria-labelledby="skTitle" aria-describedby="skDesc">' +
        '<div class="sh-konsul-head">' +
          '<span class="ic">' + I('headset') + '</span>' +
          '<div><h2 id="skTitle">' + E(k.judul || 'Konsultasi Langsung') + '</h2><p id="skDesc">Tinggalkan nomor HP Anda, kami yang menghubungi.</p></div>' +
          '<button type="button" class="sh-iconbtn" data-close aria-label="Tutup">' + I('close', 'sm') + '</button>' +
        '</div>' +
        /* langkah 1: formulir */
        '<div class="sh-konsul-body" data-step="form">' +
          '<ol class="sh-konsul-flow" aria-label="Cara kerja"><li><b>1</b>Isi nomor HP</li><li><b>2</b>Kirim permintaan</li><li><b>3</b>Kami menghubungi Anda</li></ol>' +
          '<form id="skForm" novalidate>' +
            '<label class="sh-konsul-label" for="skHp">Nomor HP / WhatsApp aktif</label>' +
            '<div class="sh-hp">' + I('phone', 'sm') +
              '<input id="skHp" name="hp" type="tel" inputmode="tel" autocomplete="tel" maxlength="22" placeholder="Contoh: 0812 3456 7890" aria-describedby="skHelp skMsg" aria-invalid="false">' +
              '<span class="sh-hp-ok" aria-hidden="true">' + I('check', 'xs') + '</span>' +
            '</div>' +
            '<div class="sh-hp-help" id="skHelp">Format: <b>08…</b>, <b>628…</b>, atau <b>+628…</b></div>' +
            '<div class="sh-hp-msg" id="skMsg" aria-live="polite"></div>' +
            '<div class="sh-hp-trap" aria-hidden="true"><label>Website<input type="text" name="website" tabindex="-1" autocomplete="off"></label></div>' +
            '<div class="sh-konsul-ctx" id="skCtx" hidden></div>' +
            '<button type="submit" class="sh-btn is-primary is-block sh-konsul-send">' + I('send', 'sm') + '<span>Kirim Permintaan</span></button>' +
            '<p class="sh-konsul-note">' + I('lock', 'xs') + '<span>Kami menghubungi Anda melalui telepon atau WhatsApp' + (o.hours ? ' pada jam layanan <b>' + E(o.hours) + '</b>' : '') +
              '. Dengan menekan <b>Kirim Permintaan</b>, Anda setuju dihubungi melalui nomor ini. Jangan kirim NIK, nomor KPJ, OTP, atau kata sandi.</span></p>' +
          '</form>' +
          '<div class="sh-konsul-alt">Perlu jawaban sekarang? <a href="tel:' + E(cc) + '">Telepon ' + E(cc) + '</a>' +
            (SH.hasWhatsApp() ? ' · <button type="button" class="sh-linkbtn" data-sh-wa>Chat WhatsApp</button>' : '') +
            ' · <a href="' + SH.url('kontak', null, 'kantor') + '">Kantor cabang</a></div>' +
        '</div>' +
        /* langkah 2: berhasil */
        '<div class="sh-konsul-body sh-konsul-done" data-step="ok" hidden>' +
          '<div class="sh-konsul-badge">' + I('check') + '</div>' +
          '<h3 tabindex="-1">Permintaan terkirim</h3>' +
          '<p>Kami akan menghubungi <b data-ok-hp></b> melalui telepon atau WhatsApp' + (o.hours ? ' pada jam layanan (' + E(o.hours) + ')' : '') + '. Pastikan HP aktif.</p>' +
          '<div class="sh-konsul-ref">Kode permintaan <b data-ok-id></b> · <span data-ok-time></span></div>' +
          '<button type="button" class="sh-btn is-primary is-block" data-close>Selesai</button>' +
        '</div>' +
        /* langkah 3: gagal */
        '<div class="sh-konsul-body sh-konsul-done is-err" data-step="err" hidden>' +
          '<div class="sh-konsul-badge">' + I('alert') + '</div>' +
          '<h3 tabindex="-1">Permintaan belum terkirim</h3>' +
          '<p data-err-msg></p>' +
          '<div class="sh-btn-row" style="justify-content:center">' +
            '<button type="button" class="sh-btn is-primary" data-k-retry>' + I('refresh', 'sm') + 'Coba lagi</button>' +
            '<a class="sh-btn is-outline" href="tel:' + E(cc) + '">' + I('phone', 'sm') + 'Telepon ' + E(cc) + '</a>' +
          '</div>' +
        '</div>' +
      '</div>';
    document.body.appendChild(KF);
    var input = KF.querySelector('#skHp'), msg = KF.querySelector('#skMsg'), wrap = KF.querySelector('.sh-hp'), touched = false;
    function paint(v, force){
      var empty = !input.value.trim();
      wrap.classList.toggle('is-ok', !!v.ok);
      wrap.classList.toggle('is-bad', !v.ok && (touched || force) && !empty);
      input.setAttribute('aria-invalid', !v.ok && (touched || force) ? 'true' : 'false');
      if(v.ok){ msg.className = 'sh-hp-msg ok'; msg.textContent = 'Nomor valid: ' + v.tampil; }
      else if((touched || force) && (!empty || force)){ msg.className = 'sh-hp-msg bad'; msg.textContent = v.pesan; }
      else { msg.className = 'sh-hp-msg'; msg.textContent = ''; }
    }
    input.addEventListener('input', function(){ paint(SH.validasiHP(input.value)); });
    input.addEventListener('blur', function(){ if(input.value.trim()){ touched = true; paint(SH.validasiHP(input.value)); } });
    KF.querySelector('#skForm').addEventListener('submit', function(e){
      e.preventDefault();
      if(kState.busy) return;
      var v = SH.validasiHP(input.value);
      touched = true; paint(v, true);
      if(!v.ok){
        wrap.classList.remove('shake'); void wrap.offsetWidth; wrap.classList.add('shake');
        input.focus(); return;
      }
      var K2 = kcfg(), last = SH.store.get('sh-konsul', null), now = Date.now();
      if(last && last.n === v.intl && now - last.t < (K2.ulangMenit || 30) * 60000){
        showDone({ id:last.id, tampil:v.tampil, waktu:last.w, ulang:true }); return;
      }
      if(last && now - last.t < (K2.jedaDetik || 60) * 1000){
        msg.className = 'sh-hp-msg bad'; msg.textContent = 'Permintaan baru saja dikirim. Tunggu sebentar sebelum mengirim lagi.'; return;
      }
      if(!kReady()){ showErr('Fitur ini belum diaktifkan oleh pengelola. Silakan telepon Contact Center ' + ((C.contact || {}).callCenter || '175') + ' atau datang ke kantor cabang.'); return; }
      if(navigator.onLine === false){ showErr('Perangkat sedang tidak terhubung ke internet. Periksa koneksi, lalu coba lagi.'); return; }
      var trap = (KF.querySelector('input[name="website"]').value || '').trim();
      setBusy(true);
      SH.kirimKonsultasi(v, kState.konteks, trap).then(function(r){
        var w = wib(new Date());
        SH.store.set('sh-konsul', { t:Date.now(), n:v.intl, id:r.id, w:w.panjang });
        setBusy(false); showDone({ id:r.id, tampil:v.tampil, waktu:w.panjang });
      }).catch(function(err){
        setBusy(false);
        if(err && err.kode === 'aktivasi') showErr('Layanan pengiriman sedang diaktifkan oleh pengelola. Silakan coba lagi nanti, atau telepon Contact Center ' + ((C.contact || {}).callCenter || '175') + '.');
        else if(err && err.name === 'AbortError') showErr('Koneksi terlalu lambat sehingga permintaan belum terkirim. Coba lagi sebentar lagi.');
        else showErr('Terjadi gangguan saat mengirim. Periksa koneksi internet lalu coba lagi. Bila tetap gagal, telepon Contact Center ' + ((C.contact || {}).callCenter || '175') + ' atau datang ke kantor cabang.');
      });
    });
    KF.addEventListener('click', function(e){
      if(e.target === KF || e.target.closest('[data-close]')){ SH.konsultasi.close(); return; }
      if(e.target.closest('[data-k-retry]')){ step('form'); setTimeout(function(){ input.focus(); }, 30); }
    });
    KF.addEventListener('keydown', function(e){
      if(e.key !== 'Tab') return;   // fokus tetap di dalam dialog
      var f = Array.prototype.filter.call(KF.querySelectorAll('button, a[href], input:not([tabindex="-1"])'), function(x){ return x.offsetParent !== null; });
      if(!f.length) return;
      if(e.shiftKey && document.activeElement === f[0]){ e.preventDefault(); f[f.length - 1].focus(); }
      else if(!e.shiftKey && document.activeElement === f[f.length - 1]){ e.preventDefault(); f[0].focus(); }
    });
    function setBusy(on){
      kState.busy = on;
      var b = KF.querySelector('.sh-konsul-send');
      b.disabled = on; b.classList.toggle('is-busy', on);
      b.querySelector('span').textContent = on ? 'Mengirim…' : 'Kirim Permintaan';
    }
    function step(s){
      KF.querySelectorAll('[data-step]').forEach(function(x){ x.hidden = x.getAttribute('data-step') !== s; });
      var h = KF.querySelector('[data-step="' + s + '"] h3'); if(h) setTimeout(function(){ h.focus(); }, 30);
    }
    function showDone(o){
      KF.querySelector('[data-ok-hp]').textContent = o.tampil;
      KF.querySelector('[data-ok-id]').textContent = o.id;
      KF.querySelector('[data-ok-time]').textContent = o.ulang ? 'sudah diterima ' + (o.waktu || '') : (o.waktu || '');
      KF.querySelector('[data-step="ok"] h3').textContent = o.ulang ? 'Permintaan sudah kami terima' : 'Permintaan terkirim';
      step('ok');
    }
    function showErr(t){ KF.querySelector('[data-err-msg]').textContent = t; step('err'); }
    SH._konsulStep = step;
  }
  SH.konsultasi = {
    open: function(opt){
      opt = opt || {};
      if(!KF) buildKonsul();
      SH.closeMenu(); SH.closeSearch();
      kState.konteks = String(opt.konteks || '').slice(0, 600);
      kState.lastFocus = document.activeElement;
      var ctx = KF.querySelector('#skCtx');
      ctx.hidden = !kState.konteks;
      ctx.innerHTML = kState.konteks ? I('info', 'xs') + '<span>Ikut terkirim: ' + E(kState.konteks.length > 140 ? kState.konteks.slice(0, 137) + '…' : kState.konteks) + '</span>' : '';
      if(!kState.busy) SH._konsulStep('form');
      KF.classList.add('open'); document.body.classList.add('sh-no-scroll');
      var input = KF.querySelector('#skHp');
      // di ponsel keyboard angka langsung muncul; dialog ditempatkan di atas agar tidak tertutup keyboard
      setTimeout(function(){ try{ input.focus({ preventScroll:true }); }catch(e){ input.focus(); } }, 60);
    },
    close: function(){
      if(!KF || !KF.classList.contains('open')) return;
      KF.classList.remove('open'); document.body.classList.remove('sh-no-scroll');
      if(kState.lastFocus && kState.lastFocus.focus) kState.lastFocus.focus();
    },
    siap: kReady
  };

  /* tombol mengambang "Konsultasi" (semua halaman kecuali Kontak & Status) */
  function renderFab(){
    // Kontak & Status punya tombolnya sendiri; di simulator banyak kontrol di tepi kanan sehingga
    // dipakai tautan "Butuh bantuan? Konsultasi Langsung" di kepala simulator (tidak menutupi isian)
    if(['kontak', 'status', 'pu', 'bpu', 'pmi'].indexOf(page) >= 0 || document.body.hasAttribute('data-sh-nofab')) return;
    var b = document.createElement('button');
    b.type = 'button'; b.className = 'sh-fab'; b.setAttribute('data-sh-konsul', '');
    b.setAttribute('aria-label', 'Konsultasi Langsung: tinggalkan nomor HP, kami yang menghubungi');
    b.innerHTML = '<span class="ic">' + I('headset') + '</span><span class="tx">Konsultasi</span>';
    document.body.appendChild(b);
    document.body.classList.add('sh-has-fab');
    // saat mengetik (keyboard ponsel terbuka) tombol disembunyikan agar tidak menutupi isian
    document.addEventListener('focusin', function(e){ if(e.target.matches && e.target.matches('input, select, textarea') && !e.target.closest('.sh-konsul')) b.classList.add('is-typing'); });
    document.addEventListener('focusout', function(){ b.classList.remove('is-typing'); });
    // ringkas menjadi ikon saat menggulir ke bawah, tampil penuh saat menggulir ke atas
    var lastY = window.scrollY || 0, ticking = false;
    window.addEventListener('scroll', function(){
      if(ticking) return; ticking = true;
      requestAnimationFrame(function(){
        var y = window.scrollY || 0;
        if(Math.abs(y - lastY) > 8){ b.classList.toggle('is-compact', y > lastY && y > 240); lastY = y; }
        ticking = false;
      });
    }, { passive:true });
    // sembunyikan saat tombol penting terlihat agar tidak tertutup: kotak "Masih butuh bantuan?",
    // perkiraan simulasi, catatan upah minimal, panel langkah berikutnya, dan tombol simpan hasil
    if('IntersectionObserver' in window){
      var seen = new Set();
      SH._fabIO = new IntersectionObserver(function(en){
        en.forEach(function(x){ if(x.isIntersecting) seen.add(x.target); else seen.delete(x.target); });
        b.classList.toggle('is-away', seen.size > 0);
      }, { threshold:0.12 });
      SH.fabAvoid = function(root){ (root || document).querySelectorAll('.sh-help, .live, .min-note, .next-panel, .rs-save, [data-fab-avoid]').forEach(function(el){ SH._fabIO.observe(el); }); };
      SH.fabAvoid();
    }
  }

  /* ---------- bantuan & footer ---------- */
  function renderHelp(){
    var foot = document.querySelector('[data-sh-footer]');
    if(!foot || page === 'kontak' || page === 'status' || document.body.hasAttribute('data-sh-nohelp')) return;
    var ct = C.contact || {}, cc = ct.callCenter || '175';
    var sec = document.createElement('section');
    sec.className = 'sh-help'; sec.setAttribute('aria-label', 'Bantuan');
    sec.innerHTML = '<div class="sh-help-card"><div><h2>Masih butuh bantuan?</h2><p>Tinggalkan nomor HP Anda, kami yang menghubungi. Jangan pernah membagikan NIK, OTP, atau kata sandi.</p></div>' +
      '<div class="sh-help-actions">' +
        '<button type="button" class="is-main" data-sh-konsul>' + I('headset') + 'Konsultasi Langsung</button>' +
        '<a href="' + SH.url('kontak', null, 'kantor') + '">' + I('pin') + 'Kantor terdekat</a>' +
        '<a href="tel:' + E(cc) + '">' + I('phone') + 'Telepon ' + E(cc) + '</a>' +
      '</div></div>';
    foot.parentNode.insertBefore(sec, foot);
  }
  function renderFooter(){
    var host = document.querySelector('[data-sh-footer]');
    if(!host) return;
    var b = C.brand || {}, o = C.office || {}, P = function(p, l, h){ return '<a href="' + SH.url(p, null, h) + '">' + l + '</a>'; };
    host.classList.add('sh-footer');
    host.innerHTML =
      '<div class="sh-footer-inner">' +
        '<div><b class="sh-footer-brand">' + (b.logo ? '<img src="' + E((SH.base || '') + b.logo) + '" alt="" width="28" height="28" loading="lazy">' : '') + '<span>' + SH.brandName(b.name) + '</span></b>' + E(b.tagline || '') +
          ' Website ini adalah lapisan informasi: pendaftaran, pembayaran, klaim, dan data pribadi hanya diproses melalui kanal resmi BPJS Ketenagakerjaan. Website tidak pernah meminta NIK, nomor KPJ, OTP, atau kata sandi.' +
          (o.name ? '<span class="sh-footer-office">' + I('pin', 'xs') + E(o.name) + (o.hours ? ' · ' + E(o.hours) : '') + '</span>' : '') + '</div>' +
        '<div><b>Jelajahi</b><div class="sh-footer-links">' +
          P('program', 'Program') + P('segmen', 'Segmen Peserta') + P('simulasi', 'Simulasi') + P('daftar', 'Pendaftaran') + P('klaim', 'Klaim') +
          P('sipp', 'SIPP') + P('jmo', 'JMO') + P('formulir', 'Formulir') + P('peraturan', 'Peraturan') + P('kontak', 'Kontak') +
        '</div></div>' +
        '<div class="sh-footer-meta"><span>' + E(C.version || '') + ' · Sebagian isi masih ditinjau; ketentuan resmi mengikuti kanal BPJS Ketenagakerjaan.</span>' +
          '<a href="' + SH.url('status') + '">Status konten</a></div>' +
      '</div>';
  }

  /* ---------- breadcrumb ---------- */
  SH.crumbs = function(items){
    var host = document.querySelector('[data-sh-crumbs]');
    if(!host) return;
    host.className = 'sh-crumbs'; host.setAttribute('aria-label', 'Jejak halaman');
    host.innerHTML = '<a href="' + SH.url('home') + '">Beranda</a>' + (items || []).map(function(it){
      return ' <span aria-hidden="true">›</span> ' + (it.href ? '<a href="' + E(it.href) + '">' + E(it.label) + '</a>' : '<span aria-current="page">' + E(it.label) + '</span>');
    }).join('');
  };

  /* ---------- kepala halaman: ilustrasi SVG atau banner foto ----------
     <div class="sh-pagehead" data-art="pu"> →
       · bila SITE_CONFIG.heroImages.pu ada: banner foto assets/img/hero/pu.webp (+ pu-m.webp di ponsel)
       · selain itu: ilustrasi assets/img/ilustrasi/pu.svg di sisi kanan */
  SH.artSrc = function(name){ return (SH.base || '') + 'assets/img/ilustrasi/' + name + '.svg'; };
  SH.art = function(name, cls){
    return '<img class="sh-art' + (cls ? ' ' + cls : '') + '" src="' + E(SH.artSrc(name)) + '" alt="" width="320" height="240" decoding="async">';
  };
  SH.heroInfo = function(name){ var h = (C.heroImages || {})[name]; return h ? (h === true ? {} : h) : null; };
  SH.headMedia = function(el, name){
    if(!el || !name || el.classList.contains('has-art') || el.classList.contains('has-photo')) return;
    var h = SH.heroInfo(name);
    if(!h){ el.classList.add('has-art'); el.insertAdjacentHTML('beforeend', SH.art(name)); return; }
    var base = (SH.base || '') + 'assets/img/hero/' + name;
    var body = document.createElement('div'); body.className = 'sh-head-body';
    while(el.firstChild) body.appendChild(el.firstChild);
    var pic = document.createElement('picture'); pic.className = 'sh-photo';
    pic.innerHTML = '<source media="(max-width: 699px)" srcset="' + E(base) + '-m.webp">' +
      '<img src="' + E(base) + '.webp" alt="" width="1600" height="900" decoding="async" fetchpriority="high">';
    var img = pic.querySelector('img');
    if(h.posisi) img.style.setProperty('--pos', h.posisi);
    el.appendChild(pic); el.appendChild(body); el.classList.add('has-photo');
    // gambar gagal dimuat → kembali ke ilustrasi SVG
    img.addEventListener('error', function(){
      if(!el.contains(pic) || !el.contains(body)) return;   // kepala halaman sudah digambar ulang
      pic.remove(); while(body.firstChild) el.insertBefore(body.firstChild, body); body.remove();
      el.classList.remove('has-photo'); el.classList.add('has-art'); el.insertAdjacentHTML('beforeend', SH.art(name));
    }, { once:true });
  };
  SH.decorateHeads = function(root){
    (root || document).querySelectorAll('[data-art]').forEach(function(el){ SH.headMedia(el, el.getAttribute('data-art')); });
  };

  /* ---------- lanjutkan: halaman terakhir dibuka (hanya di browser ini, tanpa data pribadi) ---------- */
  var PAGE_META = { pu:{ t:'Simulasi PU & Jasa Konstruksi', i:'calculator' }, bpu:{ t:'Simulasi BPU', i:'calculator' }, pmi:{ t:'Simulasi PMI', i:'calculator' } };
  (C.nav || []).forEach(function(g){ g.items.forEach(function(it){ if(!PAGE_META[it.page]) PAGE_META[it.page] = { t:it.label, i:it.ikon }; }); });
  var SEG_OF = { 'segmen-pu':'pu', 'segmen-bpu':'bpu', 'segmen-jakon':'jakon', 'segmen-pmi':'pmi', pu:'pu', bpu:'bpu', pmi:'pmi' };
  SH.recent = {
    list: function(){ var a = SH.store.get('sh-recent', []); return Array.isArray(a) ? a : []; },
    /* catat halaman ini; label/URL boleh diganti (mis. topik SIPP yang sedang dibuka) */
    touch: function(o){
      o = o || {};
      var m = PAGE_META[page]; if(!m || page === 'home' || page === 'status' || page === '404') return;
      var file = location.pathname.split('/').pop() || SH.url(page);
      var entry = { p:page, t:o.t || m.t, i:o.i || m.i, u:o.u || (file + location.search + location.hash), ts:Date.now() };
      var a = SH.recent.list().filter(function(x){ return x && x.p !== page; });
      a.unshift(entry); SH.store.set('sh-recent', a.slice(0, 6));
      if(SEG_OF[page]) SH.store.set('sh-segmen', SEG_OF[page]);
    }
  };

  /* ---------- lompat ke elemen (tautan #…) ----------
     Posisi mendarat konsisten di semua perangkat: jarak atas diatur satu variabel CSS
     (--anchor-offset). Setelah font & gambar selesai dimuat, posisi disetel ulang sekali
     agar pergeseran tata letak tidak membuat target bergeser — kecuali pengguna sudah menggulir. */
  SH.jumpTo = function(el, opt){
    if(!el) return;
    opt = opt || {};
    var de = document.documentElement;
    function go(){ var prev = de.style.scrollBehavior; de.style.scrollBehavior = 'auto'; el.scrollIntoView({ block:'start' }); de.style.scrollBehavior = prev; }
    if(el.classList.contains('sh-rv')) el.classList.add('sh-in');
    go();
    if(opt.settle === false) return;
    var moved = false, EV = ['wheel', 'touchstart', 'keydown', 'pointerdown'];
    function stop(){ moved = true; off(); }
    function off(){ EV.forEach(function(t){ window.removeEventListener(t, stop, true); }); }
    EV.forEach(function(t){ window.addEventListener(t, stop, { capture:true, passive:true }); });
    var waits = [];
    if(document.fonts && document.fonts.ready) waits.push(document.fonts.ready.catch(function(){}));
    if(document.readyState !== 'complete') waits.push(new Promise(function(r){ window.addEventListener('load', r, { once:true }); }));
    Promise.all(waits).then(function(){
      requestAnimationFrame(function(){ if(!moved) go(); });
      setTimeout(function(){ if(!moved) go(); off(); }, 400);
    });
  };

  /* ---------- efek muncul saat digulir ----------
     Hanya di layar lebar dengan mouse (desktop) dan bila gerak diizinkan. Di ponsel konten
     selalu langsung terlihat — tidak ada area kosong saat menggulir cepat, dan posisi
     tautan #… tidak bergeser. Halaman yang dibuka dengan #… juga tidak memakai efek ini. */
  SH.revealOn = SH.motion && mq('(min-width: 960px) and (hover: hover) and (pointer: fine)');
  SH.reveal = function(els){
    if(!SH.revealOn || !('IntersectionObserver' in window) || location.hash) return;
    var io = SH._io || (SH._io = new IntersectionObserver(function(entries){
      entries.forEach(function(en){ if(en.isIntersecting){ en.target.classList.add('sh-in'); io.unobserve(en.target); } });
    }, { rootMargin:'0px 0px -4% 0px', threshold:0.01 }));
    var vh = window.innerHeight || 800;
    Array.prototype.forEach.call(els || [], function(el){
      if(!el || el.classList.contains('sh-rv')) return;
      if(el.getBoundingClientRect().top < vh * 0.92) return;   // yang sudah terlihat tidak dianimasikan
      el.classList.add('sh-rv'); io.observe(el);
    });
  };
  /* tautan # di halaman yang sama: target langsung ditampilkan sebelum digulir */
  window.addEventListener('hashchange', function(){
    var h = decodeURIComponent(location.hash.slice(1)), el = h && document.getElementById(h);
    if(el && el.classList.contains('sh-rv')) el.classList.add('sh-in');
  });

  /* Tautan kanal resmi dari konfigurasi: <a data-link="kunci"> → SITE_CONFIG.links[kunci] */
  SH.applyLinks = function(root){
    (root || document).querySelectorAll('[data-link]').forEach(function(a){
      var u = SH.link(a.getAttribute('data-link'));
      if(u) a.setAttribute('href', u);
    });
  };

  /* ---------- event bersama ---------- */
  document.addEventListener('click', function(e){
    var s = e.target.closest('[data-sh-search]');
    if(s){ e.preventDefault(); SH.openSearch(); return; }
    var m = e.target.closest('[data-sh-menu]');
    if(m){ e.preventDefault(); SH.openMenu(); return; }
    var k = e.target.closest('[data-sh-konsul]');
    if(k){ e.preventDefault(); SH.konsultasi.open({ konteks: k.getAttribute('data-sh-konsul') || '' }); return; }
    var w = e.target.closest('[data-sh-wa]');
    if(w){ e.preventDefault(); SH.openWhatsApp(w.getAttribute('data-sh-wa') || 'Halo Pak/Bu, saya membutuhkan bantuan informasi layanan BPJS Ketenagakerjaan.'); }
  });
  document.addEventListener('keydown', function(e){
    if(e.key !== 'Escape') return;
    if(KF && KF.classList.contains('open')) SH.konsultasi.close();
    else if(sp && sp.classList.contains('open')) SH.closeSearch();
    else if(ov && ov.classList.contains('open')) SH.closeMenu();
  });

  renderHeader();
  SH.ready(function(){
    renderBottomNav();
    buildDrawer();
    renderHelp();
    renderFooter();
    renderFab();
    SH.applyLinks();
    SH.decorateHeads();
    SH.recent.touch();
    SH.reveal(document.querySelectorAll('.sh-help'));
    // ?konsultasi=1 (mis. dari QR atau poster) langsung membuka formulir Konsultasi Langsung
    if(SH.param('konsultasi') === '1') setTimeout(function(){ SH.konsultasi.open({ konteks:'Dibuka dari tautan/QR konsultasi' }); }, 250);
  });
})();

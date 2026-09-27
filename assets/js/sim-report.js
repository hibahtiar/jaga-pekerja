/* =====================================================================
   JagaPekerja — hasil simulasi yang seragam + PDF
   Dipakai simulasi-pu.html (PU & Jasa Konstruksi), simulasi-bpu.html, simulasi-pmi.html.

   Setiap simulator cukup menyusun satu "model" hasil, lalu:
     SHR.render(elemen, model)  → tampilan hasil di layar
   Tombol di dalam tampilan hasil:
     Unduh PDF  → berkas PDF dibuat di browser (jsPDF, dimuat hanya saat diperlukan)
     Bagikan    → bagikan berkas PDF (bila perangkat mendukung) atau teks ringkas
     Cetak      → dialog cetak / "Simpan sebagai PDF" dengan tata letak A4

   Model:
   { kode:'PU', segmen:'Penerima Upah', judul:'…', label:'Total iuran per bulan', total:Number, sub:'…',
     split:[{label, nilai}], banner:{nada:'ok'|'info'|'warn', judul, teks, tautan:{label,url}},
     masukan:[[label, nilai]], program:[{kode, nama, ket, nilai, unit, coret, rincian, total}],
     programJudul:'Rincian per program', catatan:['…'], tabel:{judul, kolom:[], baris:[[]]},
     dasar:['…'], tautan:'https://…', berkas:'simulasi-iuran-pu' }
   Tidak ada data pribadi di model maupun PDF.
   ===================================================================== */
(function(){
  'use strict';
  var SH = window.SH, esc = SH.esc, I = SH.icon, R = SH.rupiah;
  var JSPDF = 'assets/vendor/jspdf.umd.min.js';
  var SHR = window.SHR = {};
  /* nama situs untuk kepala PDF/cetak & teks bagikan (SITE_CONFIG.brand) */
  function brand(){ var b = (SH.config || {}).brand || {}; return (b.name || 'JagaPekerja') + (b.sub ? ' · ' + b.sub : ''); }

  function fmtNow(){
    try{ return new Intl.DateTimeFormat('id-ID', { dateStyle:'long', timeStyle:'short' }).format(new Date()); }
    catch(e){ return new Date().toLocaleString(); }
  }
  function ymd(){ var d = new Date(); return d.getFullYear() + '-' + ('0' + (d.getMonth() + 1)).slice(-2) + '-' + ('0' + d.getDate()).slice(-2); }
  function money(v){ return typeof v === 'number' ? R(v) : String(v == null ? '' : v); }

  /* ---------- tampilan di layar ---------- */
  function programHtml(p){
    return '<div class="rs-prog">' +
      '<span class="rs-code">' + esc(p.kode) + '</span>' +
      '<div class="rs-prog-body"><strong>' + esc(p.nama) + '</strong>' + (p.ket ? '<small>' + esc(p.ket) + '</small>' : '') +
        (p.rincian ? '<small class="rs-rinci">' + esc(p.rincian) + '</small>' : '') + '</div>' +
      '<div class="rs-prog-amt">' + (p.coret != null ? '<s>' + esc(money(p.coret)) + '</s>' : '') +
        '<b>' + esc(money(p.nilai)) + '</b>' + (p.unit ? '<small>' + esc(p.unit) + '</small>' : '') +
        (p.total != null ? '<small class="rs-x">' + esc(p.totalLabel || 'Total') + ' ' + esc(money(p.total)) + '</small>' : '') + '</div>' +
    '</div>';
  }
  function splitHtml(split){
    if(!split || split.length < 2) return '';
    var sum = split.reduce(function(s, x){ return s + (x.nilai || 0); }, 0) || 1;
    return '<div class="rs-split"><div class="rs-bar" role="img" aria-label="' + esc(split.map(function(x){ return x.label + ' ' + money(x.nilai); }).join(', ')) + '">' +
      split.map(function(x, i){ return '<span class="t' + i + '" style="width:' + Math.max(2, Math.round((x.nilai || 0) / sum * 1000) / 10) + '%"></span>'; }).join('') + '</div>' +
      '<div class="rs-legend">' + split.map(function(x, i){ return '<span><i class="t' + i + '"></i>' + esc(x.label) + ' <b>' + esc(money(x.nilai)) + '</b></span>'; }).join('') + '</div></div>';
  }
  function bannerHtml(b){
    if(!b) return '';
    return '<div class="rs-banner ' + esc(b.nada || 'info') + '">' + I(b.nada === 'ok' ? 'check' : b.nada === 'warn' ? 'alert' : 'info', 'sm') +
      '<div><strong>' + esc(b.judul) + '</strong>' + (b.teks ? '<span>' + esc(b.teks) + '</span>' : '') +
      (b.tautan ? '<a href="' + esc(b.tautan.url) + '" target="_blank" rel="noopener noreferrer">' + esc(b.tautan.label) + ' ↗</a>' : '') + '</div></div>';
  }
  function tableHtml(t){
    if(!t || !t.baris || !t.baris.length) return '';
    return '<details class="legal-box rs-table-box"' + (t.buka ? ' open' : '') + '><summary>' + esc(t.judul) + '</summary><div class="legal-content"><div class="rs-table-wrap"><table class="rs-table"><thead><tr>' +
      t.kolom.map(function(k){ return '<th>' + esc(k) + '</th>'; }).join('') + '</tr></thead><tbody>' +
      t.baris.map(function(r){ return '<tr>' + r.map(function(c){ return '<td>' + esc(money(c)) + '</td>'; }).join('') + '</tr>'; }).join('') +
      '</tbody></table></div></div></details>';
  }
  SHR.render = function(el, m){
    if(!el || !m) return;
    SHR.last = m; cache = null;
    el.innerHTML =
      '<div class="rs-hero">' +
        '<div class="rs-hero-main"><span class="rs-label">' + esc(m.label) + '</span>' +
          (m.totalCoret != null ? '<s class="rs-was">' + esc(money(m.totalCoret)) + '</s>' : '') +
          '<strong class="rs-amount">' + esc(money(m.total)) + '</strong>' +
          (m.sub ? '<span class="rs-sub">' + esc(m.sub) + '</span>' : '') + '</div>' +
        splitHtml(m.split) +
      '</div>' +
      bannerHtml(m.banner) +
      (m.masukan && m.masukan.length ? '<div class="rs-inputs"><div class="rs-inputs-head"><span>Data yang dihitung</span>' +
        (m.ubah ? '<button type="button" class="rs-edit" data-rs-edit>' + I('back', 'xs') + 'Ubah</button>' : '') + '</div>' +
        '<dl>' + m.masukan.map(function(x){ return '<div><dt>' + esc(x[0]) + '</dt><dd>' + esc(money(x[1])) + '</dd></div>'; }).join('') + '</dl></div>' : '') +
      (m.program && m.program.length ? '<h2 class="rs-h2">' + esc(m.programJudul || 'Rincian per program') + '</h2><div class="rs-list">' + m.program.map(programHtml).join('') +
        (m.programTotal ? '<div class="rs-prog rs-prog-total"><span class="rs-code">Σ</span><div class="rs-prog-body"><strong>' + esc(m.programTotal.label) + '</strong></div>' +
          '<div class="rs-prog-amt"><b>' + esc(money(m.programTotal.nilai)) + '</b>' + (m.programTotal.unit ? '<small>' + esc(m.programTotal.unit) + '</small>' : '') + '</div></div>' : '') +
        '</div>' : '') +
      (m.extraHtml || '') +
      tableHtml(m.tabel) +
      (m.catatan && m.catatan.length ? '<ul class="rs-notes">' + m.catatan.map(function(c){ return '<li>' + I('info', 'xs') + '<span>' + esc(c) + '</span></li>'; }).join('') + '</ul>' : '') +
      '<div class="rs-save"><div class="rs-save-head"><strong>Simpan atau bagikan hasil ini</strong><span>PDF ringkas satu halaman, tanpa data pribadi.</span></div>' +
        '<div class="rs-save-btns">' +
          '<button type="button" class="rs-btn is-main" data-rs="pdf">' + I('pdf', 'sm') + 'Unduh PDF</button>' +
          '<button type="button" class="rs-btn" data-rs="share">' + I('share', 'sm') + 'Bagikan</button>' +
          '<button type="button" class="rs-btn" data-rs="print">' + I('printer', 'sm') + 'Cetak</button>' +
        '</div></div>';
    if(SH.fabAvoid) SH.fabAvoid(el);   // tombol Konsultasi mengambang tidak menutupi tombol simpan
    if(!el._rsBound){
      el._rsBound = true;
      el.addEventListener('click', function(e){
        var b = e.target.closest('[data-rs]');
        if(b){ var a = b.getAttribute('data-rs'); if(a === 'pdf') SHR.download(SHR.last); else if(a === 'share') SHR.share(SHR.last); else SHR.print(SHR.last); return; }
        if(e.target.closest('[data-rs-edit]') && SHR.last && SHR.last.ubah) SHR.last.ubah();
      });
    }
  };

  /* ---------- teks ringkas (WhatsApp / bagikan) ---------- */
  SHR.text = function(m){
    var L = ['Simulasi iuran ' + m.segmen + ' — ' + (((SH.config || {}).brand || {}).name || 'JagaPekerja'), m.label + ': ' + money(m.total) + (m.sub ? ' (' + m.sub + ')' : '')];
    (m.split || []).forEach(function(x){ L.push('• ' + x.label + ': ' + money(x.nilai)); });
    if(m.banner && m.banner.judul) L.push(m.banner.judul);
    (m.masukan || []).forEach(function(x){ L.push(x[0] + ': ' + money(x[1])); });
    L.push('Hasil ini perkiraan, bukan tagihan resmi.');
    if(m.tautan) L.push(m.tautan);
    return L.join('\n');
  };

  /* ---------- CETAK (opsi A): tata letak A4 khusus cetak ---------- */
  function reportHtml(m){
    function rows(list){ return list.map(function(x){ return '<tr><th>' + esc(x[0]) + '</th><td>' + esc(money(x[1])) + '</td></tr>'; }).join(''); }
    return '<div class="shr-doc">' +
      '<header class="shr-head"><div><small>' + esc(brand()) + '</small><h1>Ringkasan Simulasi Iuran — ' + esc(m.segmen) + '</h1></div><span>Dibuat ' + esc(fmtNow()) + '</span></header>' +
      '<section class="shr-main"><span>' + esc(m.label) + '</span><strong>' + esc(money(m.total)) + '</strong>' + (m.sub ? '<em>' + esc(m.sub) + '</em>' : '') +
        (m.split && m.split.length > 1 ? '<div class="shr-split">' + m.split.map(function(x){ return '<div><small>' + esc(x.label) + '</small><b>' + esc(money(x.nilai)) + '</b></div>'; }).join('') + '</div>' : '') + '</section>' +
      (m.banner ? '<p class="shr-banner"><b>' + esc(m.banner.judul) + '.</b> ' + esc(m.banner.teks || '') + '</p>' : '') +
      '<div class="shr-cols">' +
        '<section><h2>Data yang dihitung</h2><table class="shr-kv">' + rows(m.masukan || []) + '</table></section>' +
        '<section><h2>' + esc(m.programJudul || 'Rincian per program') + '</h2><table class="shr-prog"><tbody>' + (m.program || []).map(function(p){
          return '<tr><th>' + esc(p.kode) + '<small>' + esc(p.nama) + (p.ket ? ' · ' + esc(p.ket) : '') + '</small></th><td>' + esc(money(p.nilai)) + (p.unit ? '<small>' + esc(p.unit) + '</small>' : '') + '</td></tr>';
        }).join('') + (m.programTotal ? '<tr class="tot"><th>' + esc(m.programTotal.label) + '</th><td>' + esc(money(m.programTotal.nilai)) + '</td></tr>' : '') + '</tbody></table></section>' +
      '</div>' +
      (m.tabel && m.tabel.baris && m.tabel.baris.length ? '<section><h2>' + esc(m.tabel.judul) + '</h2><table class="shr-grid"><thead><tr>' + m.tabel.kolom.map(function(k){ return '<th>' + esc(k) + '</th>'; }).join('') + '</tr></thead><tbody>' +
        m.tabel.baris.map(function(r){ return '<tr>' + r.map(function(c){ return '<td>' + esc(money(c)) + '</td>'; }).join('') + '</tr>'; }).join('') + '</tbody></table></section>' : '') +
      (m.catatan && m.catatan.length ? '<section><h2>Catatan</h2><ul>' + m.catatan.map(function(c){ return '<li>' + esc(c) + '</li>'; }).join('') + '</ul></section>' : '') +
      (m.dasar && m.dasar.length ? '<section><h2>Dasar perhitungan</h2><ul>' + m.dasar.map(function(c){ return '<li>' + esc(c) + '</li>'; }).join('') + '</ul></section>' : '') +
      '<footer class="shr-foot">Hasil simulasi adalah perkiraan untuk persiapan, bukan tagihan resmi. Besaran resmi mengikuti ketentuan dan tagihan dari kanal resmi BPJS Ketenagakerjaan. ' +
        'Pendaftaran, pembayaran, dan data pribadi hanya melalui kanal resmi; website ini tidak pernah meminta NIK, OTP, atau kata sandi. Informasi: Contact Center ' + esc(((SH.config || {}).contact || {}).callCenter || '175') + '.' +
        (m.tautan ? '<br>Buka kembali simulasi: ' + esc(m.tautan) : '') + '</footer>' +
    '</div>';
  }
  SHR.print = function(m){
    if(!m) return;
    var box = document.getElementById('shReport');
    if(!box){ box = document.createElement('div'); box.id = 'shReport'; box.className = 'shr-print'; document.body.appendChild(box); }
    box.innerHTML = reportHtml(m);
    var t = document.title; document.title = (m.berkas || 'simulasi-iuran') + '-' + ymd();
    document.body.classList.add('shr-printing');
    var restore = function(){ document.title = t; document.body.classList.remove('shr-printing'); window.removeEventListener('afterprint', restore); };
    window.addEventListener('afterprint', restore);
    setTimeout(function(){ window.print(); setTimeout(restore, 1500); }, 30);
    SHR._restorePrint = restore;
  };

  /* ---------- PDF (opsi B): dibuat di browser dengan jsPDF ---------- */
  function clean(s){
    return String(s == null ? '' : s).replace(/ | /g, ' ').replace(/[→➜]/g, '->').replace(/[↗✓✔]/g, '').replace(/≈/g, '~')
      .replace(/[‘’]/g, "'").replace(/[“”]/g, '"').replace(/Σ/g, '').replace(/[^\x00-\xff–—•…€]/g, '');
  }
  function build(m){
    var J = window.jspdf && window.jspdf.jsPDF; if(!J) throw new Error('jsPDF belum termuat');
    var doc = new J({ unit:'mm', format:'a4', compress:true });
    var W = 210, M = 16, CW = W - 2 * M, y = 0;
    var C = { brand:[13,148,136], dark:[8,127,117], ink:[23,42,42], muted:[88,112,112], line:[215,232,229], soft:[240,253,250], accent:[242,201,76], white:[255,255,255] };
    function col(c, what){ if(what === 'f') doc.setFillColor(c[0], c[1], c[2]); else if(what === 'd') doc.setDrawColor(c[0], c[1], c[2]); else doc.setTextColor(c[0], c[1], c[2]); }
    function font(style, size, c){ doc.setFont('helvetica', style); doc.setFontSize(size); col(c || C.ink); }
    function need(h, lim){ if(y + h > (lim || 282)){ doc.addPage(); y = 18; } }
    function para(t, x, w, size, style, c, lh){
      font(style || 'normal', size || 9.5, c); var lines = doc.splitTextToSize(clean(t), w);
      var step = (lh || 1.35) * (size || 9.5) * 0.3528;
      lines.forEach(function(ln){ need(step, 287); doc.text(ln, x, y); y += step; });
    }
    function h2(t){ y += 2.5; need(10); font('bold', 10.5, C.dark); doc.text(clean(t), M, y); y += 1.8; col(C.line, 'd'); doc.setLineWidth(0.3); doc.line(M, y, W - M, y); y += 4.6; }

    // kepala
    col(C.brand, 'f'); doc.rect(0, 0, W, 30, 'F');
    col(C.dark, 'f'); doc.rect(0, 26, W, 4, 'F');
    col(C.accent, 'f'); doc.roundedRect(M, 8.5, 3, 12, 1.5, 1.5, 'F');
    font('normal', 8.5, C.white); doc.text(clean(brand()), M + 6, 11.5);
    font('bold', 15, C.white); doc.text(clean('Ringkasan Simulasi Iuran - ' + m.segmen), M + 6, 19.5);
    font('normal', 8, C.white); doc.text(clean('Dibuat ' + fmtNow()), W - M, 11.5, { align:'right' });
    y = 40;

    // angka utama
    var boxH = 24 + (m.split && m.split.length > 1 ? 12 : 0);
    col(C.soft, 'f'); col(C.line, 'd'); doc.setLineWidth(0.3); doc.roundedRect(M, y - 6, CW, boxH, 3, 3, 'FD');
    font('bold', 9, C.muted); doc.text(clean(m.label), M + 6, y);
    font('bold', 22, C.dark); doc.text(clean(money(m.total)), M + 6, y + 10);
    if(m.sub){ font('normal', 9, C.muted); doc.text(clean(m.sub), M + 6, y + 15.5); }
    if(m.split && m.split.length > 1){
      var sw = (CW - 12) / m.split.length;
      m.split.forEach(function(x, i){
        font('normal', 8, C.muted); doc.text(clean(x.label), M + 6 + i * sw, y + 22.5);
        font('bold', 10, C.ink); doc.text(clean(money(x.nilai)), M + 6 + i * sw, y + 27.5);
      });
    }
    y += boxH - 1;

    if(m.banner){
      y += 2; var bt = clean(m.banner.judul + '. ' + (m.banner.teks || ''));
      font('normal', 9, C.ink); var bl = doc.splitTextToSize(bt, CW - 10), bh = bl.length * 4.4 + 5;
      need(bh + 2); col([255,244,199], 'f'); doc.roundedRect(M, y, CW, bh, 2.5, 2.5, 'F');
      col(C.accent, 'f'); doc.rect(M, y, 1.6, bh, 'F');
      font('normal', 9, C.ink); bl.forEach(function(ln, i){ doc.text(ln, M + 5, y + 5 + i * 4.4); });
      y += bh + 5;
    }

    // data masukan
    if(m.masukan && m.masukan.length){
      h2('Data yang dihitung');
      m.masukan.forEach(function(x){
        font('normal', 9.5, C.muted); var lab = doc.splitTextToSize(clean(x[0]), 55);
        font('bold', 9.5, C.ink); var val = doc.splitTextToSize(clean(money(x[1])), CW - 62);
        var h = Math.max(lab.length, val.length) * 4.1 + 1.3; need(h);
        font('normal', 9.5, C.muted); doc.text(lab, M, y);
        font('bold', 9.5, C.ink); doc.text(val, M + 62, y);
        y += h;
      });
    }

    // rincian program
    if(m.program && m.program.length){
      h2(m.programJudul || 'Rincian per program');
      m.program.forEach(function(p){
        var desc = [p.ket, p.rincian].filter(Boolean).map(clean).join(' · ');
        font('bold', 9.5, C.ink); var nl = doc.splitTextToSize(clean(p.nama), CW - 62);
        font('normal', 8.5, C.muted); var dl = desc ? doc.splitTextToSize(desc, CW - 62) : [];
        var h = Math.max(nl.length * 4.2 + dl.length * 3.7, p.unit ? 8 : 5) + 4.2; need(h);
        col([228,244,241], 'f'); doc.roundedRect(M, y - 4, 16, 7, 2, 2, 'F');
        font('bold', 8.5, C.dark); doc.text(clean(p.kode), M + 8, y + 0.7, { align:'center' });
        font('bold', 9.5, C.ink); doc.text(nl, M + 20, y + 0.7);
        if(dl.length){ font('normal', 8.5, C.muted); doc.text(dl, M + 20, y + 0.7 + nl.length * 4.2); }
        font('bold', 10.5, C.ink); doc.text(clean(money(p.nilai)), W - M, y + 0.7, { align:'right' });
        if(p.unit){ font('normal', 7.5, C.muted); doc.text(clean(p.unit), W - M, y + 4.6, { align:'right' }); }
        if(p.coret != null){ font('normal', 7.5, C.muted); doc.text(clean('Normal ' + money(p.coret)), W - M, y - 3.6, { align:'right' }); }
        y += h;
        col(C.line, 'd'); doc.setLineWidth(0.2); doc.line(M, y - 3.5, W - M, y - 3.5);
      });
      if(m.programTotal){
        need(8); font('bold', 10, C.ink); doc.text(clean(m.programTotal.label), M + 20, y + 0.5);
        font('bold', 11, C.dark); doc.text(clean(money(m.programTotal.nilai)), W - M, y + 0.5, { align:'right' });
        y += 7;
      }
    }

    // tabel tambahan (mis. lapisan nilai proyek)
    if(m.tabel && m.tabel.baris && m.tabel.baris.length){
      h2(m.tabel.judul);
      var n = m.tabel.kolom.length, first = CW * 0.34, cw = (CW - first) / (n - 1);
      var xs = [M]; for(var i = 1; i < n; i++) xs.push(M + first + (i - 1) * cw);
      font('bold', 8, C.muted); m.tabel.kolom.forEach(function(k, i){ doc.text(clean(k), i ? xs[i] + cw - 1 : xs[i], y, i ? { align:'right' } : undefined); });
      y += 4.5;
      m.tabel.baris.forEach(function(r){
        need(6); font('normal', 8.5, C.ink);
        r.forEach(function(c, i){ doc.text(clean(money(c)), i ? xs[i] + cw - 1 : xs[i], y, i ? { align:'right' } : undefined); });
        y += 5;
      });
    }

    if(m.catatan && m.catatan.length){ h2('Catatan'); m.catatan.forEach(function(c){ para('•  ' + c, M, CW, 8.8, 'normal', C.ink, 1.3); y += 0.6; }); }
    if(m.dasar && m.dasar.length){ h2('Dasar perhitungan'); m.dasar.forEach(function(c){ para('•  ' + c, M, CW, 8, 'normal', C.muted, 1.25); y += 0.3; }); }

    // kaki
    y += 3; need(20, 286);
    col(C.line, 'd'); doc.setLineWidth(0.3); doc.line(M, y, W - M, y); y += 4.5;
    para('Hasil simulasi adalah perkiraan untuk persiapan, bukan tagihan resmi. Besaran resmi mengikuti ketentuan dan tagihan dari kanal resmi BPJS Ketenagakerjaan. ' +
      'Pendaftaran, pembayaran, dan data pribadi hanya melalui kanal resmi; website ini tidak pernah meminta NIK, OTP, atau kata sandi. Informasi: Contact Center ' + (((SH.config || {}).contact || {}).callCenter || '175') + '.', M, CW, 7.6, 'normal', C.muted, 1.3);
    if(m.tautan){ y += 0.8; font('normal', 7.6, C.dark); need(4, 287); doc.textWithLink(clean('Buka kembali simulasi ini: ' + m.tautan).slice(0, 140), M, y, { url:m.tautan }); y += 4; }
    var pages = doc.getNumberOfPages();
    for(var pg = 1; pg <= pages; pg++){ doc.setPage(pg); font('normal', 7.5, C.muted); doc.text('Halaman ' + pg + ' dari ' + pages, W - M, 292, { align:'right' }); }
    return doc;
  }
  var cache = null;   // {m, blob}
  function makeBlob(m){
    if(cache && cache.m === m) return Promise.resolve(cache.blob);
    return SH.loadScript(JSPDF).then(function(){ var b = build(m).output('blob'); cache = { m:m, blob:b }; return b; });
  }
  function fileName(m){ return (m.berkas || 'simulasi-iuran') + '-' + ymd() + '.pdf'; }
  function saveBlob(blob, name){
    var a = document.createElement('a'), u = URL.createObjectURL(blob);
    a.href = u; a.download = name; document.body.appendChild(a); a.click();
    setTimeout(function(){ URL.revokeObjectURL(u); a.remove(); }, 1500);
  }
  function busy(on){ document.querySelectorAll('[data-rs]').forEach(function(b){ b.disabled = on; }); }
  SHR.download = function(m){
    if(!m) return;
    busy(true); SH.toast('Menyiapkan PDF…', 1600);
    makeBlob(m).then(function(blob){ saveBlob(blob, fileName(m)); SH.toast('PDF tersimpan: ' + fileName(m)); })
      .catch(function(){ SH.toast('PDF belum bisa dibuat di perangkat ini. Gunakan tombol Cetak lalu pilih "Simpan sebagai PDF".', 6000); })
      .then(function(){ busy(false); });
  };
  SHR.share = function(m){
    if(!m) return;
    var text = SHR.text(m);
    function shareText(){ return SH.share({ title:'Simulasi iuran ' + m.segmen, text:text }); }
    if(!(navigator.canShare && window.File)) return shareText();
    var ready = cache && cache.m === m;
    if(ready){
      var f = new File([cache.blob], fileName(m), { type:'application/pdf' });
      if(!navigator.canShare({ files:[f] })) return shareText();
      return navigator.share({ files:[f], title:'Simulasi iuran ' + m.segmen, text:text }).catch(function(e){
        if(e && e.name === 'AbortError') return;
        return shareText();
      });
    }
    // Berkas belum siap: buat dulu. Bila izin berbagi sudah kedaluwarsa, minta ketuk sekali lagi.
    busy(true); SH.toast('Menyiapkan PDF untuk dibagikan…', 1800);
    makeBlob(m).then(function(){
      busy(false);
      var f = new File([cache.blob], fileName(m), { type:'application/pdf' });
      if(!navigator.canShare({ files:[f] })) return shareText();
      return navigator.share({ files:[f], title:'Simulasi iuran ' + m.segmen, text:text }).catch(function(e){
        if(e && e.name === 'AbortError') return;
        SH.toast('PDF siap. Ketuk "Bagikan" sekali lagi.', 5000);
      });
    }).catch(function(){ busy(false); shareText(); });
  };
  SHR.build = build;   // untuk pengujian
})();

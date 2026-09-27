/**
 * =====================================================================
 * JagaPekerja — penerima "Konsultasi Langsung" (Google Apps Script)
 * ---------------------------------------------------------------------
 * Pengunjung website mengisi nomor HP → skrip ini:
 *   1. memeriksa format nomor HP Indonesia (08…, 628…, +628…),
 *   2. mencatat permintaan di Google Sheets (rekap otomatis, kolom Status untuk ditandai),
 *   3. mengirim email yang mudah dikenali ke EMAIL_TUJUAN.
 * Pengelola lalu menghubungi nomor tersebut secara manual.
 *
 * PEMASANGAN (±5 menit, gratis, cukup akun Google):
 *   1. Buka https://sheets.new → beri nama, mis. "JagaPekerja — Konsultasi Langsung".
 *   2. Menu Ekstensi → Apps Script. Hapus isi Code.gs, tempel SELURUH berkas ini, simpan (ikon disket).
 *   3. Pilih fungsi tesKirim → Jalankan → izinkan akses (Google akan meminta izin Sheets & kirim email).
 *      Cek email: harus masuk satu email uji "[JagaPekerja] Konsultasi Langsung".
 *   4. Terapkan (Deploy) → Deployment baru → jenis: Aplikasi web
 *        Jalankan sebagai: Saya (akun Anda)   ·   Yang memiliki akses: Siapa saja
 *      → Terapkan → salin URL yang berakhiran /exec
 *   5. Tempel URL itu di website: assets/js/site-config.js → konsultasi.appsScriptUrl
 *   6. (Opsional) Rekap harian: Pemicu (ikon jam) → Tambahkan pemicu → fungsi rekapHarian →
 *      Berbasis waktu → Pemicu harian → pukul 15.00–16.00.
 *
 * Mengubah skrip? Deploy → Kelola deployment → edit (ikon pensil) → Versi: Baru → Terapkan.
 * URL /exec tetap sama sehingga website tidak perlu diubah.
 *
 * Keamanan: URL /exec memang publik (dipanggil website). Skrip hanya menerima nomor HP berformat
 * Indonesia, membatasi jumlah kiriman, dan menolak nomor yang sama dalam 30 menit.
 * Jangan menyimpan data lain selain yang tercantum di bawah.
 * =====================================================================
 */

var EMAIL_TUJUAN = 'hi.bahtiar@gmail.com';   // penerima notifikasi (boleh beberapa, pisahkan dengan koma)
var NAMA_SITUS   = 'JagaPekerja';
var NAMA_SHEET   = 'Permintaan Konsultasi';
var ZONA         = 'Asia/Jakarta';
var JAM_LAYANAN  = 'Senin–Jumat 08.00–15.00';
var BATAS_PER_JAM = 40;      // pengaman bila ada kiriman beruntun (bot)
var ULANG_MENIT   = 30;      // nomor yang sama dalam rentang ini tidak dicatat ulang

var KOLOM = ['ID', 'Waktu (WIB)', 'Nomor HP', 'Nomor 62', 'WhatsApp', 'Dari halaman', 'Konteks', 'Perangkat', 'Status', 'Catatan petugas'];

/* ---------- menerima permintaan dari website ---------- */
function doPost(e) {
  try {
    var data = JSON.parse((e && e.postData && e.postData.contents) || '{}');
    if (data.website) return json_({ ok: true, id: 'KL-SPAM' });                 // jebakan bot
    var hp = validasiHP_(data.nomor || data.nomorIntl);
    if (!hp.ok) return json_({ ok: false, error: 'nomor_tidak_valid', pesan: hp.pesan });

    var cache = CacheService.getScriptCache();
    var dup = cache.get('n:' + hp.intl);
    if (dup) return json_({ ok: true, id: dup, duplikat: true });
    var jam = Utilities.formatDate(new Date(), ZONA, 'yyyyMMddHH');
    var hitung = Number(cache.get('r:' + jam) || 0);
    if (hitung >= BATAS_PER_JAM) return json_({ ok: false, error: 'terlalu_banyak' });
    cache.put('r:' + jam, String(hitung + 1), 3600);

    var lock = LockService.getScriptLock();
    lock.waitLock(15000);
    var sh = sheet_();
    var waktu = new Date();
    var urut = Math.max(1, sh.getLastRow());                                        // baris 1 = judul kolom
    var id = 'KL-' + Utilities.formatDate(waktu, ZONA, 'yyMMdd') + '-' + ('000' + urut).slice(-4);
    var halaman = teks_(data.halaman, 120) + (data.url ? ' — ' + teks_(data.url, 200) : '');
    sh.appendRow([id, waktu, hp.tampil, "'" + hp.intl, 'https://wa.me/' + hp.intl, halaman,
                  teks_(data.konteks, 600) || '-', teks_(data.perangkat, 40), 'Belum dihubungi', '']);
    sh.getRange(sh.getLastRow(), 2).setNumberFormat('dd/MM/yyyy HH:mm');
    SpreadsheetApp.flush();
    lock.releaseLock();
    cache.put('n:' + hp.intl, id, ULANG_MENIT * 60);

    kirimEmail_({ id: id, waktu: waktu, hp: hp, halaman: halaman, konteks: teks_(data.konteks, 600), perangkat: teks_(data.perangkat, 40),
                  rekap: SpreadsheetApp.getActiveSpreadsheet().getUrl() + '#gid=' + sh.getSheetId(),
                  belum: hitungBelum_(sh) });
    return json_({ ok: true, id: id });
  } catch (err) {
    console.error(err);
    return json_({ ok: false, error: 'server', pesan: String(err) });
  }
}

/* buka URL /exec di browser untuk memastikan skrip aktif */
function doGet() {
  return json_({ ok: true, layanan: NAMA_SITUS + ' — Konsultasi Langsung', status: 'aktif' });
}

/* ---------- email notifikasi ---------- */
function kirimEmail_(o) {
  var tgl = Utilities.formatDate(o.waktu, ZONA, "EEEE, d MMMM yyyy 'pukul' HH.mm");
  tgl = hariBulan_(tgl) + ' WIB';
  var singkat = Utilities.formatDate(o.waktu, ZONA, 'dd/MM HH.mm') + ' WIB';
  var subjek = '[' + NAMA_SITUS + '] Konsultasi Langsung · ' + o.hp.tampil + ' · ' + singkat;
  var wa = 'https://wa.me/' + o.hp.intl;
  var baris = function (label, isi) {
    return '<tr><td style="padding:8px 12px;color:#587070;font-size:13px;width:150px;vertical-align:top">' + label + '</td>' +
           '<td style="padding:8px 12px;color:#172A2A;font-size:14px;font-weight:600">' + isi + '</td></tr>';
  };
  var html =
    '<div style="font-family:Arial,Helvetica,sans-serif;max-width:560px;margin:0 auto;border:1px solid #D7E8E5;border-radius:14px;overflow:hidden">' +
      '<div style="background:#0D9488;color:#fff;padding:16px 20px">' +
        '<div style="font-size:12px;letter-spacing:.08em;text-transform:uppercase;opacity:.9">' + NAMA_SITUS + ' · permintaan baru</div>' +
        '<div style="font-size:20px;font-weight:700;margin-top:4px">Konsultasi Langsung</div>' +
      '</div>' +
      '<div style="padding:18px 20px 6px">' +
        '<div style="font-size:13px;color:#587070">Nomor HP pengunjung</div>' +
        '<div style="font-size:28px;font-weight:700;color:#087F75;letter-spacing:.02em;margin:2px 0 12px">' + o.hp.tampil + '</div>' +
        '<a href="tel:' + o.hp.e164 + '" style="display:inline-block;background:#07786F;color:#fff;text-decoration:none;padding:10px 16px;border-radius:10px;font-weight:700;margin:0 6px 8px 0">Telepon</a>' +
        '<a href="' + wa + '" style="display:inline-block;background:#E4F4F1;color:#066A62;text-decoration:none;padding:10px 16px;border-radius:10px;font-weight:700;margin:0 6px 8px 0">Chat WhatsApp</a>' +
      '</div>' +
      '<table style="width:100%;border-collapse:collapse;border-top:1px solid #EAF6F3">' +
        baris('Permintaan', 'Pengunjung meminta <b>konsultasi langsung</b> dan menunggu dihubungi') +
        baris('Waktu permintaan', tgl) +
        baris('Dari halaman', esc_(o.halaman || '-')) +
        baris('Konteks', esc_(o.konteks || '-')) +
        baris('Perangkat', esc_(o.perangkat || '-')) +
        baris('ID permintaan', o.id) +
      '</table>' +
      '<div style="padding:14px 20px;background:#F2FBF9;border-top:1px solid #D7E8E5;font-size:13px;color:#34504E;line-height:1.5">' +
        '<b>Tindak lanjut:</b> hubungi nomor di atas secara manual pada jam layanan (' + JAM_LAYANAN + '), lalu ubah kolom <b>Status</b> di rekap menjadi "Sudah dihubungi".' +
        (o.belum > 1 ? '<br>Masih ada <b>' + o.belum + '</b> permintaan berstatus "Belum dihubungi".' : '') +
        '<br><a href="' + o.rekap + '" style="color:#07786F;font-weight:700">Buka rekap (Google Sheets) →</a>' +
      '</div>' +
    '</div>';
  var teks = 'KONSULTASI LANGSUNG — ' + NAMA_SITUS + '\n\n' +
    'Nomor HP     : ' + o.hp.tampil + ' (' + o.hp.e164 + ')\n' +
    'WhatsApp     : ' + wa + '\n' +
    'Waktu        : ' + tgl + '\n' +
    'Dari halaman : ' + (o.halaman || '-') + '\n' +
    'Konteks      : ' + (o.konteks || '-') + '\n' +
    'ID           : ' + o.id + '\n\n' +
    'Tindak lanjut: hubungi nomor ini secara manual pada jam layanan, lalu tandai di rekap:\n' + o.rekap;
  MailApp.sendEmail({ to: EMAIL_TUJUAN, subject: subjek, body: teks, htmlBody: html, name: NAMA_SITUS + ' Konsultasi' });
}

/* ---------- rekap harian (opsional, lewat pemicu berbasis waktu) ---------- */
function rekapHarian() {
  var sh = sheet_(), n = sh.getLastRow();
  if (n < 2) return;
  var rows = sh.getRange(2, 1, n - 1, KOLOM.length).getValues();
  var hariIni = Utilities.formatDate(new Date(), ZONA, 'yyyyMMdd');
  var baru = rows.filter(function (r) { return r[1] instanceof Date && Utilities.formatDate(r[1], ZONA, 'yyyyMMdd') === hariIni; });
  var belum = rows.filter(function (r) { return String(r[8]).toLowerCase().indexOf('belum') === 0; });
  if (!baru.length && !belum.length) return;
  var li = function (r) { return '<li><b>' + r[2] + '</b> · ' + Utilities.formatDate(r[1], ZONA, 'dd/MM HH.mm') + ' · ' + esc_(String(r[5]).split(' — ')[0]) + ' · <i>' + esc_(r[8]) + '</i></li>'; };
  var html = '<div style="font-family:Arial,sans-serif;font-size:14px;color:#172A2A">' +
    '<h2 style="color:#087F75;margin:0 0 8px">Rekap Konsultasi Langsung — ' + Utilities.formatDate(new Date(), ZONA, 'dd/MM/yyyy') + '</h2>' +
    '<p>Permintaan baru hari ini: <b>' + baru.length + '</b> · Belum dihubungi (semua): <b>' + belum.length + '</b></p>' +
    (belum.length ? '<p><b>Belum dihubungi:</b></p><ul>' + belum.slice(-30).map(li).join('') + '</ul>' : '') +
    '<p><a href="' + SpreadsheetApp.getActiveSpreadsheet().getUrl() + '" style="color:#07786F;font-weight:700">Buka rekap lengkap →</a></p></div>';
  MailApp.sendEmail({ to: EMAIL_TUJUAN, subject: '[' + NAMA_SITUS + '] Rekap Konsultasi Langsung · ' + baru.length + ' baru, ' + belum.length + ' belum dihubungi',
                      htmlBody: html, body: 'Permintaan baru hari ini: ' + baru.length + '. Belum dihubungi: ' + belum.length + '.', name: NAMA_SITUS + ' Konsultasi' });
}

/* ---------- uji dari editor Apps Script ---------- */
function tesKirim() {
  var r = doPost({ postData: { contents: JSON.stringify({ nomor: '081234567890', halaman: 'Uji dari editor Apps Script', konteks: 'Tes pemasangan', perangkat: 'Editor' }) } });
  Logger.log(r.getContent());
}

/* ---------- pembantu ---------- */
function sheet_() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sh = ss.getSheetByName(NAMA_SHEET);
  if (!sh) {
    sh = ss.insertSheet(NAMA_SHEET);
    sh.appendRow(KOLOM);
    sh.setFrozenRows(1);
    sh.getRange(1, 1, 1, KOLOM.length).setFontWeight('bold').setBackground('#E4F4F1');
    sh.setColumnWidths(1, KOLOM.length, 150);
    var aturan = SpreadsheetApp.newDataValidation().requireValueInList(['Belum dihubungi', 'Sudah dihubungi', 'Tidak dapat dihubungi', 'Selesai'], true).build();
    sh.getRange('I2:I').setDataValidation(aturan);
  }
  return sh;
}
function hitungBelum_(sh) {
  var n = sh.getLastRow(); if (n < 2) return 0;
  return sh.getRange(2, 9, n - 1, 1).getValues().filter(function (r) { return String(r[0]).toLowerCase().indexOf('belum') === 0; }).length;
}
/* Validasi sama dengan website: 08…, 628…, +628…; 10–13 angka dalam format 08… */
function validasiHP_(raw) {
  var s = String(raw || '').trim();
  if (!s) return { ok: false, pesan: 'kosong' };
  if (/[^\d\s+().\-]/.test(s)) return { ok: false, pesan: 'karakter' };
  var plus = s.charAt(0) === '+', d = s.replace(/\D/g, ''), nsn;
  if (plus) { if (d.indexOf('62') !== 0) return { ok: false, pesan: 'bukan +62' }; nsn = d.slice(2); }
  else if (d.indexOf('62') === 0) nsn = d.slice(2);
  else if (d.charAt(0) === '0') nsn = d.slice(1);
  else return { ok: false, pesan: 'awalan' };
  if (!/^8[1-9]\d{7,10}$/.test(nsn)) return { ok: false, pesan: 'format' };
  if (/^(\d)\1+$/.test(nsn.slice(2))) return { ok: false, pesan: 'berulang' };
  var lok = '0' + nsn, rest = lok.slice(4), half = Math.ceil(rest.length / 2);
  return { ok: true, intl: '62' + nsn, e164: '+62' + nsn, tampil: lok.slice(0, 4) + '-' + rest.slice(0, half) + '-' + rest.slice(half) };
}
function teks_(v, max) { return String(v == null ? '' : v).replace(/[\u0000-\u001f]/g, ' ').trim().slice(0, max || 200); }
function esc_(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
function json_(o) { return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON); }
/* nama hari & bulan bahasa Indonesia (formatDate memakai bahasa Inggris) */
function hariBulan_(t) {
  var m = { Monday: 'Senin', Tuesday: 'Selasa', Wednesday: 'Rabu', Thursday: 'Kamis', Friday: 'Jumat', Saturday: 'Sabtu', Sunday: 'Minggu',
            January: 'Januari', February: 'Februari', March: 'Maret', April: 'April', May: 'Mei', June: 'Juni', July: 'Juli',
            August: 'Agustus', September: 'September', October: 'Oktober', November: 'November', December: 'Desember' };
  return t.replace(/[A-Z][a-z]+/g, function (w) { return m[w] || w; });
}

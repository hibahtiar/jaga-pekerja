/* =====================================================================
   KONFIGURASI SITUS JagaPekerja — cukup ubah file ini untuk nama, kontak,
   kantor, Konsultasi Langsung, batas simulasi, banner foto, tautan resmi,
   dan menu. Tidak perlu menyentuh kode halaman lain.
   ===================================================================== */
window.SITE_CONFIG = {
  brand: {
    name: 'JagaPekerja',
    sub: 'Info perlindungan pekerja',
    tagline: 'Pusat informasi perlindungan pekerja melalui program BPJS Ketenagakerjaan.',
    logo: 'assets/img/brand/logo-mark.png'   // lambang di header (gambar persegi, latar transparan)
  },
  version: 'V6 · prototipe 1.1 · 27 Sep 2026',

  /* Kontak petugas. Nomor WhatsApp: format internasional tanpa + / spasi / nol awal, mis. 6281234567890.
     Selama kosong, tombol "Chat petugas" membuka formulir Konsultasi Langsung. */
  contact: {
    whatsappNumber: '',
    whatsappLabel: 'Petugas BPJS Ketenagakerjaan',
    callCenter: '175'
  },

  /* Kantor cabang yang menjadi "rumah" website ini. Saat pindah tugas cukup ubah bagian ini. */
  office: {
    name: 'BPJS Ketenagakerjaan Kantor Cabang Pamekasan',
    address: 'Ruko Bani Residence, Jl. Jokotole, Kel. Barurambat Timur, Kec. Pademawu, Kabupaten Pamekasan, Jawa Timur',
    hours: 'Senin–Jumat 08.00–15.00',
    phone: '',           // sengaja kosong: pengunjung diarahkan ke Konsultasi Langsung (kami yang menghubungi)
    mapsUrl: 'https://share.google/Z0tyMh4dLQJJdRuB1'
  },

  /* KONSULTASI LANGSUNG — pengunjung meninggalkan nomor HP, pengelola menerima email lalu menghubungi manual.
     Pilih SATU cara kirim (panduan lengkap: README bagian 11):
     A. appsScriptUrl  → Google Apps Script milik Anda (tools/konsultasi-apps-script.gs):
                         email rapi + rekap otomatis di Google Sheets, alamat email tidak tampil di website. DISARANKAN.
     B. emailTujuan    → dipakai bila appsScriptUrl kosong: dikirim lewat FormSubmit.co tanpa server.
                         Permintaan PERTAMA memicu email aktivasi ke alamat ini; klik "Activate Form" sekali.
                         Setelah aktif, FormSubmit mengirim kode acak — boleh dipakai di sini menggantikan alamat email
                         agar alamat asli tidak terlihat di kode website. */
  konsultasi: {
    appsScriptUrl: 'https://script.google.com/macros/s/AKfycbzvNeROqg5s5DgoDxEnWuNCTrdfcdjO7u6CukbFFS8ZlRon0lCuVvRpqECKPcxxZ4nwxA/exec',
    emailTujuan: 'hi.bahtiar@gmail.com',
    judul: 'Konsultasi Langsung',
    jedaDetik: 60,         // jeda minimal antar-kiriman dari browser yang sama
    ulangMenit: 30         // nomor yang sama tidak dikirim ulang dalam rentang ini
  },

  /* SIMULASI — batas bawah upah/penghasilan SEBULAN yang bisa disimulasikan.
     Di bawah nilai ini pengunjung diarahkan ke Konsultasi Langsung atau kantor cabang. Isi 0 untuk tanpa batas. */
  simulasi: {
    minUpahPU: 1500000,
    minPenghasilanBPU: 0          // 0 = tanpa batas (BPU memakai tabel resmi mulai penghasilan terendah)
  },

  /* BANNER FOTO kepala halaman. Nama = nilai data-art halaman (beranda, program, segmen, pu, bpu, jakon, pmi,
     simulasi, daftar, klaim, administrasi, sipp, jmo, formulir, peraturan, kontak, hilang). Panduan: README bagian 12.
     Dua cara mendaftarkan (tulis SETELAH berkasnya diunggah ke assets/img/hero/):
       · cara cepat, satu berkas:  klaim: { berkas: 'klaim.jpg' }      → dipakai di desktop & ponsel
       · hasil tools/buat-hero.py: pu: { posisi: 'center 28%' }        → pu.webp (desktop) + pu-m.webp (ponsel)
     posisi (opsional) = titik fokus gambar desktop, format CSS object-position, mis. 'center 28%' (geser ke atas: 'center 15%'). */
  heroImages: {
    pu: { posisi: 'center 28%' }
  },

  /* Kanal resmi (transaksi & data pribadi hanya di kanal ini) */
  links: {
    officialSite:     'https://www.bpjsketenagakerjaan.go.id/',
    officeDirectory:  'https://www.bpjsketenagakerjaan.go.id/kontak.html',
    daftarPu:         'https://www.bpjsketenagakerjaan.go.id/cara-mendaftar-jadi-peserta.html',
    daftarBpu:        'https://www.bpjsketenagakerjaan.go.id/bpu',
    ejakon:           'https://ejakon.bpjsketenagakerjaan.go.id/',
    ejakonKuitansi:   'https://ejakon.bpjsketenagakerjaan.go.id/cek-kuitansi',
    pmiPortal:        'https://pmi.bpjsketenagakerjaan.go.id/',
    caraKlaim:        'https://www.bpjsketenagakerjaan.go.id/cara-klaim.html',
    lapakAsik:        'https://lapakasik.bpjsketenagakerjaan.go.id',
    trackingKlaim:    'https://www.bpjsketenagakerjaan.go.id/tracking',
    siapKerja:        'https://siapkerja.kemnaker.go.id/',
    sipp:             'https://sipp.bpjsketenagakerjaan.go.id/',
    jmoPlayStore:     'https://play.google.com/store/apps/details?id=com.bpjstku',
    jmoAppStore:      'https://apps.apple.com/id/app/jmo-jamsostek-mobile/id1444834757',
    formulirResmi:    ''   // halaman daftar formulir resmi; kosong = tidak ditampilkan (formulir.html resmi mengembalikan 404 saat diperiksa 25 Sep 2026)
  },

  /* Halaman di dalam situs (dipakai menu, pencarian, dan deep link) */
  pages: {
    home: 'index.html',
    program: 'program.html',
    segmen: 'segmen.html',
    'segmen-pu': 'segmen-pu.html',
    'segmen-bpu': 'segmen-bpu.html',
    'segmen-jakon': 'segmen-jakon.html',
    'segmen-pmi': 'segmen-pmi.html',
    simulasi: 'simulasi.html',
    pu: 'simulasi-pu.html',
    bpu: 'simulasi-bpu.html',
    pmi: 'simulasi-pmi.html',
    daftar: 'daftar.html',
    klaim: 'klaim.html',
    administrasi: 'administrasi-pekerja.html',
    sipp: 'sipp.html',
    jmo: 'jmo.html',
    formulir: 'formulir.html',
    peraturan: 'peraturan.html',
    kontak: 'kontak.html',
    status: 'status-konten.html'
  },

  /* Tombol "Sering dicari" di beranda dan panel Cari (teks tombol = kata yang dicari) */
  searchPopular: ['Cairkan JHT', 'Daftar pekerja mandiri', 'Iuran karyawan', 'Kecelakaan kerja', 'Kena PHK', 'Kantor terdekat'],

  /* Navigasi atas (layar lebar). "cocok" = halaman lain yang ikut menandai tautan ini aktif. */
  topNav: [
    { page: 'program', label: 'Program' },
    { page: 'segmen', label: 'Segmen Peserta', cocok: ['segmen-pu', 'segmen-bpu', 'segmen-jakon', 'segmen-pmi'] },
    { page: 'simulasi', label: 'Simulasi', cocok: ['pu', 'bpu', 'pmi'] },
    { page: 'klaim', label: 'Klaim' },
    { page: 'kontak', label: 'Bantuan' }
  ],

  /* Menu lengkap (laci). ikon: lihat daftar ikon di assets/js/site.js */
  nav: [
    { title: 'Kenali dulu', items: [
      { page: 'program', label: 'Program BPJS Ketenagakerjaan', sub: 'JKK · JKM · JHT · JP · JKP', ikon: 'shield' },
      { page: 'segmen', label: 'Segmen Peserta', sub: 'Anda termasuk yang mana?', ikon: 'layers' }
    ]},
    { title: 'Segmen peserta', items: [
      { page: 'segmen-pu', label: 'Penerima Upah (PU)', sub: 'Karyawan / pekerja bergaji', ikon: 'building' },
      { page: 'segmen-bpu', label: 'Bukan Penerima Upah (BPU)', sub: 'Pekerja mandiri: petani, nelayan, ojol, pedagang', ikon: 'user' },
      { page: 'segmen-jakon', label: 'Jasa Konstruksi', sub: 'Pekerja proyek konstruksi', ikon: 'helmet' },
      { page: 'segmen-pmi', label: 'Pekerja Migran Indonesia', sub: 'Bekerja di luar negeri', ikon: 'plane' }
    ]},
    { title: 'Layanan', items: [
      { page: 'simulasi', label: 'Simulasi Iuran', sub: 'Hitung perkiraan iuran', ikon: 'calculator', cocok: ['pu', 'bpu', 'pmi'] },
      { page: 'daftar', label: 'Pendaftaran', sub: 'Langkah & kanal resmi per segmen', ikon: 'userplus' },
      { page: 'klaim', label: 'Klaim Manfaat', sub: 'JHT · JKK · JKM · JP · JKP', ikon: 'wallet' },
      { page: 'administrasi', label: 'Tambah / Nonaktif Pekerja', sub: 'HRD perusahaan atau peserta', ikon: 'users' }
    ]},
    { title: 'Tutorial', items: [
      { page: 'sipp', label: 'SIPP Online', sub: 'Untuk perusahaan', ikon: 'monitor' },
      { page: 'jmo', label: 'Aplikasi JMO', sub: 'Untuk peserta', ikon: 'phone' }
    ]},
    { title: 'Referensi & bantuan', items: [
      { page: 'formulir', label: 'Formulir', sub: 'Formulir resmi untuk diunduh', ikon: 'file' },
      { page: 'peraturan', label: 'Peraturan & Dasar Hukum', sub: 'PP, Permenaker, dan PDF resmi', ikon: 'scale' },
      { page: 'kontak', label: 'Kantor & Kontak', sub: 'Konsultasi langsung, kantor cabang, Contact Center 175', ikon: 'headset' }
    ]}
  ]
};

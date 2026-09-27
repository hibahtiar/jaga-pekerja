/* =====================================================================
   KONTEN HALAMAN — Pendaftaran, Klaim, Administrasi, SIPP, JMO, Formulir
   Setiap blok punya status: 'draf' (belum diverifikasi) atau 'terverifikasi'.
   Setelah dicek terhadap sumber resmi, ubah status menjadi 'terverifikasi'
   dan isi tanggal di "diperiksa". Halaman status-konten.html merangkum semuanya.
   Tautan: page = kunci SITE_CONFIG.pages · ext = kunci SITE_CONFIG.links · url = tautan langsung
   Alur klaim: alurTipe 'pilihan' (salah satu jalur) atau 'tahap' (berurutan).
   ===================================================================== */
window.KONTEN = {
  version: '1.1.0',
  diperbarui: '2026-09-26',

  /* ---------------- Simulasi (hub) ---------------- */
  simulasi: {
    segmen: [
      { id:'pu', ikon:'🏢', judul:'Perusahaan / pemberi kerja', label:'Penerima Upah (PU)',
        untuk:'Mendaftarkan karyawan yang menerima upah. Kelompok risiko JKK ditentukan dari jenis usaha.',
        contoh:'toko, rumah makan, bengkel, pabrik, kantor', page:'pu' },
      { id:'bpu', ikon:'👤', judul:'Pekerja mandiri', label:'Bukan Penerima Upah (BPU)',
        untuk:'Bekerja atau berusaha sendiri tanpa hubungan kerja formal.',
        contoh:'ojol, petani, nelayan, pedagang, tukang, freelancer', page:'bpu' },
      { id:'jakon', ikon:'🏗️', judul:'Proyek konstruksi', label:'Jasa Konstruksi',
        untuk:'Tenaga kerja proyek (harian lepas, borongan, musiman). Iuran dari nilai proyek atau upah.',
        contoh:'proyek jalan, gedung, renovasi, instalasi', page:'pu', query:{view:'konstruksi'} },
      { id:'pmi', ikon:'✈️', judul:'Bekerja ke luar negeri', label:'Pekerja Migran Indonesia (PMI)',
        untuk:'CPMI/PMI melalui Pelaksana Penempatan atau perseorangan.',
        contoh:'PMI, TKI, CPMI', page:'pmi' }
    ],
    pertanyaan: {
      judul:'Siapa yang akan didaftarkan?',
      opsi: [
        { label:'Karyawan di usaha/perusahaan saya', ke:'pu' },
        { label:'Diri saya sendiri, bekerja mandiri tanpa pemberi kerja', ke:'bpu' },
        { label:'Pekerja pada proyek konstruksi', ke:'jakon' },
        { label:'Saya (atau calon pekerja) akan bekerja ke luar negeri', ke:'pmi' }
      ]
    }
  },

  /* ---------------- Pendaftaran ---------------- */
  daftar: {
    status:'draf', diperiksa:'',
    segmen: [
      { id:'pu', judul:'Perusahaan / pemberi kerja (PU)', status:'draf',
        ringkas:'Pemberi kerja mendaftarkan badan usahanya dan pekerja yang menerima upah. Setelah terdaftar, administrasi pekerja (tambah, nonaktif, upah) dilakukan melalui SIPP Online.',
        langkah:[
          'Cek kelompok risiko jenis usaha dan perkiraan iuran di Simulasi PU.',
          'Siapkan data perusahaan dan data pekerja (lihat Formulir 1 dan Formulir 1A).',
          'Daftar melalui kanal resmi BPJS Ketenagakerjaan atau datang ke kantor cabang.',
          'Setelah terdaftar, kelola pekerja, upah, dan tagihan iuran melalui SIPP Online.'
        ],
        kanal:[ {label:'Cara mendaftar (resmi)', ext:'daftarPu'}, {label:'SIPP Online', ext:'sipp'}, {label:'Kantor cabang', page:'kontak', hash:'kantor'} ],
        formulir:['f1','f1a'], simulasi:{page:'pu', label:'Hitung iuran perusahaan'},
        sumber:[ {label:'Cara mendaftar jadi peserta', ext:'daftarPu'} ] },
      { id:'bpu', judul:'Pekerja mandiri (BPU)', status:'draf',
        ringkas:'Pekerja mandiri mendaftarkan dirinya sendiri. JKK dan JKM merupakan program wajib; JHT dapat ditambahkan secara sukarela. Untuk BPU yang berstatus pemberi kerja, JHT juga wajib.',
        langkah:[
          'Pilih pekerjaan dan masukkan penghasilan di Simulasi BPU untuk melihat iuran.',
          'Daftar melalui kanal resmi pendaftaran BPU atau kantor cabang.',
          'Bayar iuran sesuai pilihan program.',
          'Pantau kepesertaan dan kartu digital melalui aplikasi JMO.'
        ],
        kanal:[ {label:'Pendaftaran BPU (resmi)', ext:'daftarBpu'}, {label:'Panduan JMO', page:'jmo'}, {label:'Kantor cabang', page:'kontak', hash:'kantor'} ],
        formulir:['f1a'], simulasi:{page:'bpu', label:'Hitung iuran BPU'},
        sumber:[ {label:'Halaman BPU resmi', ext:'daftarBpu'} ] },
      { id:'jakon', judul:'Proyek Jasa Konstruksi', status:'draf',
        ringkas:'Pemberi kerja jasa konstruksi mendaftarkan proyek untuk melindungi tenaga kerja proyek. Karyawan tetap perusahaan konstruksi didaftarkan sebagai Penerima Upah.',
        langkah:[
          'Hitung iuran proyek dari nilai kontrak atau total upah di simulator Jasa Konstruksi.',
          'Daftarkan proyek melalui E-Jakon resmi.',
          'Bayar iuran sesuai tagihan proyek.',
          'Cek atau cetak kuitansi melalui E-Jakon.'
        ],
        kanal:[ {label:'E-Jakon (resmi)', ext:'ejakon'}, {label:'Cek kuitansi E-Jakon', ext:'ejakonKuitansi'} ],
        formulir:[], simulasi:{page:'pu', query:{view:'konstruksi'}, label:'Hitung iuran proyek'},
        sumber:[ {label:'E-Jakon', ext:'ejakon'} ] },
      { id:'pmi', judul:'Pekerja Migran Indonesia (PMI)', status:'draf',
        ringkas:'CPMI/PMI didaftarkan melalui Pelaksana Penempatan atau secara perseorangan. Perlindungan mencakup masa sebelum, selama, dan setelah bekerja.',
        langkah:[
          'Hitung iuran di Simulasi PMI sesuai jalur penempatan dan masa perjanjian kerja.',
          'Daftar melalui portal PMI resmi atau melalui Pelaksana Penempatan.',
          'Bayar iuran sesuai paket perlindungan.',
          'Simpan bukti kepesertaan sebelum berangkat.'
        ],
        kanal:[ {label:'Portal PMI (resmi)', ext:'pmiPortal'} ],
        formulir:[], simulasi:{page:'pmi', label:'Hitung iuran PMI'},
        sumber:[ {label:'Permenaker 4/2023', url:'https://jdih.kemnaker.go.id/asset/data_puu/2023pmnaker004.pdf'} ] }
    ]
  },

  /* ---------------- Klaim ---------------- */
  klaim: {
    sumberUmum:{ label:'Prosedur klaim resmi (bpjsketenagakerjaan.go.id/cara-klaim)', ext:'caraKlaim' },
    program: [
      { id:'jht', kode:'JHT', judul:'Jaminan Hari Tua', status:'draf',
        ringkas:'Manfaat uang tunai berupa akumulasi iuran yang telah disetor ditambah hasil pengembangannya.',
        kanal:[ {label:'Aplikasi JMO', page:'jmo', hash:'klaim-jht'}, {label:'Lapak Asik (online)', ext:'lapakAsik'}, {label:'Kantor cabang', page:'kontak', hash:'kantor'} ],
        alurTipe:'pilihan',
        alur:[
          { judul:'Online melalui Lapak Asik', langkah:['Masuk ke portal Lapak Asik.','Isi data diri (NIK, nama, nomor kepesertaan).','Unggah dokumen dan foto (JPG/JPEG/PNG/PDF, maks. 6 MB).','Simpan konfirmasi pengajuan.','Terima jadwal wawancara melalui email.','Ikuti verifikasi data melalui panggilan video.','Dana masuk ke rekening.'] },
          { judul:'Di kantor cabang', langkah:['Siapkan dokumen asli.','Isi formulir klaim.','Ambil nomor antrean.','Dipanggil dan dilayani petugas (verifikasi).','Terima tanda terima.','Dana masuk ke rekening; isi e-survey.'] }
        ],
        dokumen:{ status:'draf', items:['Identitas diri (KTP elektronik).','Kartu peserta atau nomor kepesertaan BPJS Ketenagakerjaan.','Buku tabungan/rekening atas nama peserta.','Dokumen sesuai alasan klaim, misalnya surat keterangan berhenti bekerja.','Dokumen lain sesuai ketentuan (misalnya Kartu Keluarga atau NPWP).'],
          sumber:[ {label:'Kriteria pengajuan klaim JHT dan dokumen pendukung', url:'https://www.bpjsketenagakerjaan.go.id/artikel/18927/artikel-kriteria-pengajuan-klaim-jht-(jaminan-hari-tua)-dan-dokumen-pendukung.bpjs'} ] },
        formulir:['f5'],
        catatan:[
          { teks:'Tersedia klaim prioritas (misalnya peserta hamil, lanjut usia, atau sakit) di kantor cabang.' },
          { teks:'Klaim JHT sebagian (10% atau 30%) memiliki syarat tersendiri.', sumber:{label:'Cara klaim JHT sebagian', url:'https://www.bpjsketenagakerjaan.go.id/artikel/18919/artikel-cara-klaim-dana-jht-sebagian-bpjs-ketenagakerjaan-dan-persyaratannya.bpjs'} },
          { teks:'Panduan pencairan JHT melalui aplikasi JMO.', sumber:{label:'Mencairkan JHT melalui JMO', url:'https://www.bpjsketenagakerjaan.go.id/artikel/18879/artikel-cara-mudah-mencairkan-jaminan-hari-tua-(jht)-melalui-jmo.bpjs'} }
        ] },
      { id:'jkk', kode:'JKK', judul:'Jaminan Kecelakaan Kerja', status:'draf',
        ringkas:'Pelayanan kesehatan sesuai kebutuhan medis dan santunan ketika peserta mengalami kecelakaan kerja atau penyakit akibat kerja.',
        kanal:[ {label:'Kantor cabang', page:'kontak', hash:'kantor'}, {label:'PLKK (fasilitas kesehatan kerja sama)'} ],
        alurTipe:'tahap',
        alur:[
          { judul:'Pelaporan', langkah:['Laporan tahap I paling lambat 2×24 jam sejak kejadian.','Laporan tahap II setelah peserta selesai perawatan/dinyatakan sembuh.'] },
          { judul:'Pengajuan manfaat', langkah:['Isi formulir dan lengkapi dokumen pelaporan.','Ambil nomor antrean.','Dipanggil dan dilayani petugas.','Terima tanda terima.','Manfaat masuk ke rekening; isi e-survey.'] }
        ],
        dokumen:{ status:'draf', items:['Formulir laporan kecelakaan kerja tahap I dan tahap II.','Surat keterangan dokter.','Identitas dan kartu peserta.','Dokumen pendukung kejadian sesuai permintaan petugas.'] },
        formulir:['f3'],
        catatan:[ { teks:'Untuk Pekerja Migran Indonesia, lihat penjelasan klaim JKK saat dirawat di luar negeri pada Simulasi PMI.', link:{page:'pmi', label:'Buka Simulasi PMI'} } ] },
      { id:'jkm', kode:'JKM', judul:'Jaminan Kematian', status:'draf',
        ringkas:'Manfaat bagi ahli waris ketika peserta meninggal dunia bukan karena kecelakaan kerja, meliputi santunan dan beasiswa anak sesuai syarat.',
        kanal:[ {label:'Kantor cabang', page:'kontak', hash:'kantor'} ],
        alur:[ { judul:'Di kantor cabang', langkah:['Siapkan dokumen asli.','Isi formulir klaim JKM.','Ambil nomor antrean.','Dipanggil dan dilayani petugas.','Terima tanda terima.','Santunan masuk ke rekening ahli waris; isi e-survey.'] } ],
        dokumen:{ status:'draf', items:['Identitas peserta dan ahli waris.','Surat keterangan kematian.','Kartu Keluarga atau dokumen yang menunjukkan hubungan ahli waris.','Kartu peserta.','Rekening atas nama ahli waris.'] },
        formulir:['f4','beasiswa'], catatan:[] },
      { id:'jp', kode:'JP', judul:'Jaminan Pensiun', status:'draf',
        ringkas:'Manfaat uang tunai untuk mempertahankan derajat kehidupan yang layak, dibayarkan bulanan atau sekaligus sesuai masa iur dan ketentuan.',
        kanal:[ {label:'Kantor cabang', page:'kontak', hash:'kantor'} ],
        alur:[ { judul:'Di kantor cabang', langkah:['Isi formulir dan lengkapi dokumen.','Ambil nomor antrean.','Dipanggil dan dilayani petugas.','Terima tanda terima.','Manfaat masuk ke rekening; isi e-survey.'] } ],
        dokumen:{ status:'draf', items:['Identitas diri dan kartu peserta.','Kartu Keluarga.','Rekening atas nama penerima manfaat.','Dokumen pendukung sesuai jenis manfaat pensiun.'] },
        formulir:['f7'],
        catatan:[ { teks:'Halaman prosedur resmi menyebut manfaat dibayarkan 15 hari kerja setelah berkas disetujui.' } ] },
      { id:'jkp', kode:'JKP', judul:'Jaminan Kehilangan Pekerjaan', status:'draf',
        ringkas:'Manfaat bagi pekerja yang mengalami PHK: uang tunai, akses informasi pasar kerja, dan pelatihan kerja. Diajukan melalui portal SIAPkerja.',
        kanal:[ {label:'Portal SIAPkerja (resmi)', ext:'siapKerja'} ],
        alurTipe:'tahap',
        alur:[
          { judul:'Lapor PHK', langkah:['Aktivasi akun di portal SIAPkerja.','Dapatkan bukti PHK dari perusahaan.','Laporkan PHK di portal dengan mengunggah bukti PHK.'] },
          { judul:'Klaim bulan pertama', langkah:['Buka portal SIAPkerja dan pilih menu Ajukan Klaim.','Lengkapi data pribadi dan rekening, lalu tanda tangani KAPK.','Tunggu validasi BPJS Ketenagakerjaan.','Terima notifikasi email proses klaim.','Dana masuk ke rekening.'] },
          { judul:'Klaim bulan ke-2 sampai ke-6', langkah:['Lakukan asesmen diri.','Lamar pekerjaan (minimal 5 perusahaan, atau 1 perusahaan dengan wawancara).','Ikuti konseling (opsional).','Ikuti pelatihan kerja (kehadiran minimal 80%, bulan ke-2 sampai ke-5).','Ajukan klaim sesuai tanggal di akun.','Dana masuk ke rekening.'] }
        ],
        dokumen:{ status:'draf', items:['Bukti PHK dari perusahaan.','Data rekening atas nama peserta.'] },
        formulir:['f6'], catatan:[] }
    ]
  },

  /* ---------------- Tambah / nonaktif pekerja ---------------- */
  administrasi: {
    hrd: { status:'draf',
      judul:'Administrasi pekerja perusahaan',
      ringkas:'Untuk Penerima Upah, penambahan, penonaktifan, dan perubahan upah pekerja dilakukan oleh pemberi kerja melalui SIPP Online.',
      aksi:[
        { label:'Tambah tenaga kerja', desc:'Individu atau massal (unggah template).', page:'sipp', hash:'tambah-tk' },
        { label:'Kurangi / nonaktifkan tenaga kerja', desc:'Pekerja berhenti, resign, atau PHK.', page:'sipp', hash:'nonaktif-tk' },
        { label:'Ubah upah & data pekerja', desc:'Kenaikan upah, rapel, atau profil.', page:'sipp', hash:'upah' },
        { label:'Kelola NPP', desc:'Tambah atau nonaktifkan NPP.', page:'sipp', hash:'npp' }
      ] },
    pesertaPu: { status:'draf',
      judul:'Hubungi HRD / pemberi kerja',
      teks:'Untuk pekerja Penerima Upah yang sudah berhenti bekerja tetapi statusnya masih aktif, FAQ resmi BPJS Ketenagakerjaan mengarahkan pekerja untuk menghubungi HRD. Pemberi kerja kemudian melaporkan penonaktifan, termasuk melalui SIPP Online.',
      aksi:[ {label:'Cek status di JMO', page:'jmo', hash:'saldo'}, {label:'Tutorial nonaktif (untuk HRD)', page:'sipp', hash:'nonaktif-tk'} ] },
    pesertaBpu: { status:'draf',
      judul:'Jika iuran BPU tidak dibayar',
      teks:'FAQ resmi BPJS Ketenagakerjaan menyebut tunggakan iuran BPU diperhitungkan maksimal 3 bulan berturut-turut. Jika setelah 3 bulan tidak ada pembayaran, masa perlindungan menjadi nonaktif. Peserta yang sudah nonaktif dapat mengaktifkan kembali perlindungan; tunggakan sebelumnya tidak diperhitungkan saat aktivasi kembali.',
      catatan:'Untuk mengecek status aktual, gunakan JMO, Contact Center 175, atau kantor cabang.',
      aksi:[ {label:'Cek status di JMO', page:'jmo', hash:'saldo'}, {label:'Hitung iuran BPU', page:'bpu'} ] }
  },

  /* ---------------- SIPP Online ---------------- */
  sipp: {
    ringkas:'SIPP Online adalah kanal resmi pemberi kerja untuk mengelola data pekerja, upah, iuran, dan NPP.',
    /* Halaman SIPP dibuka dengan menu pilihan ini. topik = daftar id di bawah. */
    menu: [
      { judul:'Kelola tenaga kerja', topik:['tambah-tk','nonaktif-tk','upah','mutasi-data'] },
      { judul:'Iuran & pembayaran', topik:['iuran'] },
      { judul:'Akun perusahaan', topik:['akun','npp'] }
    ],
    /* alur  = id alur di data/tutorial-sipp.js → versi Langkah DAN Flowchart dibuat dari data itu
               ('semua' = semua alur, dengan tab). Topik tanpa alur memakai daftar "langkah".
       cabang = cabang yang dibuka lebih dulu (label cabang pada alur).
       pendek = judul singkat pada kartu menu. media = video YouTube / foto (tab muncul bila terisi). */
    topik: [
      { id:'tambah-tk', judul:'Tambah tenaga kerja', pendek:'Tambah TK', ikon:'userplus', status:'draf',
        ringkas:'Menambahkan karyawan baru, satu per satu atau massal lewat template.',
        alur:'tambah-tk', media:{ video:{youtube:''}, foto:[] } },
      { id:'nonaktif-tk', judul:'Kurangi / nonaktifkan tenaga kerja', pendek:'Kurangi / nonaktifkan TK', ikon:'userminus', status:'draf',
        ringkas:'Karyawan berhenti, resign, PHK, atau peserta baru yang salah input.',
        alur:'kurang-tk', media:{ video:{youtube:''}, foto:[] } },
      { id:'upah', judul:'Ubah upah & data tenaga kerja', pendek:'Ubah upah / data TK', ikon:'coins', status:'draf',
        ringkas:'Kenaikan upah, rapel, atau perubahan profil karyawan.',
        alur:'ubah-tk', cabang:'Peserta Aktif', media:{ video:{youtube:''}, foto:[] } },
      { id:'mutasi-data', judul:'Mutasi data (semua alur)', pendek:'Mutasi data lengkap', ikon:'flow', status:'draf',
        ringkas:'Seluruh alur menu Mutasi Data: periode, tambah, kurangi, ubah, finalisasi, sinkronisasi.',
        alur:'semua', media:{ video:{youtube:''}, foto:[] } },
      { id:'iuran', judul:'Hitung ulang, finalisasi & bayar iuran', pendek:'Finalisasi & bayar iuran', ikon:'wallet', status:'draf',
        ringkas:'Menutup periode pelaporan, memeriksa tagihan, lalu membayar.',
        alur:'finalisasi', media:{ video:{youtube:''}, foto:[] } },
      { id:'akun', judul:'Akun & login', pendek:'Akun & login', ikon:'key', status:'draf',
        ringkas:'Masuk ke SIPP Online dan menjaga keamanan akun perusahaan.',
        media:{ video:{youtube:''}, foto:[] },
        langkah:['Buka SIPP Online resmi.','Masuk dengan akun perusahaan yang terdaftar.','Bila lupa kata sandi, gunakan fitur pemulihan di halaman login.','Jangan membagikan akun, kata sandi, atau OTP kepada pihak lain.'] },
      { id:'npp', judul:'Kelola NPP', pendek:'Kelola NPP', ikon:'idcard', status:'draf',
        ringkas:'Menambah atau menonaktifkan NPP pada akun perusahaan.',
        media:{ video:{youtube:''}, foto:[] },
        langkah:['Masuk ke SIPP Online.','Pilih menu pengelolaan NPP.','Tambah atau nonaktifkan NPP sesuai kebutuhan unit usaha.','Ikuti verifikasi yang diminta.'] }
    ]
  },

  /* ---------------- JMO ---------------- */
  jmo: {
    ringkas:'JMO (Jamsostek Mobile) adalah aplikasi resmi BPJS Ketenagakerjaan untuk peserta: cek saldo dan kepesertaan, kartu digital, serta pengajuan layanan seperti klaim JHT.',
    keamanan:'Unduh JMO hanya dari Google Play atau App Store resmi. Petugas tidak pernah meminta OTP atau kata sandi Anda.',
    menu: [ { judul:'Pilih yang ingin Anda lakukan', topik:['akun','saldo','klaim-jht','status'] } ],
    topik: [
      { id:'akun', judul:'Unduh & aktivasi akun', pendek:'Unduh & aktivasi', ikon:'smartphone', status:'draf', ringkas:'Memasang aplikasi dan menyiapkan akun.',
        media:{ video:{youtube:''}, foto:[] },
        langkah:['Unduh JMO dari Google Play atau App Store resmi.','Daftar/aktivasi akun mengikuti petunjuk di aplikasi.','Aktifkan pengamanan akun; jangan bagikan OTP atau kata sandi.'] },
      { id:'saldo', judul:'Cek saldo JHT & kartu digital', pendek:'Cek saldo & kartu', ikon:'idcard', status:'draf', ringkas:'Melihat saldo JHT, status kepesertaan, dan kartu digital.',
        media:{ video:{youtube:''}, foto:[] },
        langkah:['Masuk ke JMO.','Buka menu saldo/kepesertaan untuk melihat saldo JHT dan status.','Tampilkan kartu digital bila diperlukan.'] },
      { id:'klaim-jht', judul:'Klaim JHT melalui JMO', pendek:'Klaim JHT', ikon:'coins', status:'draf', ringkas:'Mengajukan pencairan JHT dari aplikasi.',
        media:{ video:{youtube:''}, foto:[] },
        langkah:['Masuk ke JMO.','Pilih layanan klaim JHT.','Ikuti verifikasi data dan unggah dokumen yang diminta.','Pantau status pengajuan.'],
        sumber:[ {label:'Mencairkan JHT melalui JMO', url:'https://www.bpjsketenagakerjaan.go.id/artikel/18879/artikel-cara-mudah-mencairkan-jaminan-hari-tua-(jht)-melalui-jmo.bpjs'} ] },
      { id:'status', judul:'Lacak status klaim', pendek:'Lacak status klaim', ikon:'search', status:'draf', ringkas:'Memantau proses pengajuan klaim.',
        media:{ video:{youtube:''}, foto:[] },
        langkah:['Buka layanan pelacakan klaim resmi.','Masukkan data yang diminta.','Periksa status dan tindak lanjut yang diperlukan.'],
        sumber:[ {label:'Pelacakan klaim resmi', ext:'trackingKlaim'} ] }
    ]
  },

  /* ---------------- Formulir ---------------- */
  formulir: {
    /* Catatan pengelola: berkas resmi dapat diperbarui sewaktu-waktu; periksa berkala lalu ubah status menjadi 'terverifikasi'. */
    catatan:'Tautan mengarah ke berkas PDF di situs resmi BPJS Ketenagakerjaan. Bila berkas tidak dapat dibuka atau Anda ragu versi terbarunya, tanyakan ke kantor cabang atau Contact Center 175.',
    grup: [
      { id:'pendaftaran', judul:'Pendaftaran', items:[
        { id:'f1', kode:'F1', nama:'Formulir 1 — Pendaftaran pemberi kerja', fungsi:'Pendaftaran perusahaan/badan usaha sebagai peserta.', status:'draf',
          url:'https://www.bpjsketenagakerjaan.go.id/assets/uploads/formulir/Formulir_1_BPJS_Ketenagakerjaan.pdf' },
        { id:'f1a', kode:'F1A', nama:'Formulir 1A — Pendaftaran atau perubahan data pekerja', fungsi:'Pendaftaran baru atau perubahan data pekerja (PU/BPU).', status:'draf',
          url:'https://www.bpjsketenagakerjaan.go.id/assets/uploads/formulir/F1A_Pendaftaran_Atau_Perubahan_Data_Pekerja.pdf' }
      ]},
      { id:'f3', judul:'Kecelakaan kerja & penyakit akibat kerja (JKK)', items:[
        { id:'f3kk1', kode:'F3 KK1', nama:'Laporan kecelakaan kerja tahap I', fungsi:'Dilaporkan segera setelah kejadian.', status:'draf',
          url:'https://www.bpjsketenagakerjaan.go.id/assets/uploads/formulir/Formulir_3KK1_BPJS_Ketenagakerjaan.pdf' },
        { id:'f3akk2', kode:'F3a KK2', nama:'Laporan kecelakaan kerja tahap II', fungsi:'Dilaporkan setelah perawatan selesai.', status:'draf',
          url:'https://www.bpjsketenagakerjaan.go.id/assets/uploads/formulir/FORM_3A_KK_2_BPJS_Ketenagakerjaan.pdf' },
        { id:'f3bkk3', kode:'F3b KK3', nama:'Surat keterangan dokter (kecelakaan kerja)', fungsi:'Diisi dokter pemeriksa.', status:'draf',
          url:'https://www.bpjsketenagakerjaan.go.id/assets/uploads/formulir/Formulir_3bKK3_BPJS_Ketenagakerjaan.pdf' },
        { id:'f3pak1', kode:'F3 PAK1', nama:'Laporan penyakit akibat kerja tahap I', fungsi:'Pelaporan awal penyakit akibat kerja.', status:'draf',
          url:'https://www.bpjsketenagakerjaan.go.id/assets/uploads/formulir/Formulir_3_PAK1_Bpjs_Ketenagakerjaan.pdf' },
        { id:'f3apak2', kode:'F3a PAK2', nama:'Laporan penyakit akibat kerja tahap II', fungsi:'Pelaporan lanjutan penyakit akibat kerja.', status:'draf',
          url:'https://bpjsketenagakerjaan.go.id/assets/uploads/formulir/Formulir_3_PAK_2_BPJS_Ketenagakerjaan.pdf' },
        { id:'f3bpak3', kode:'F3b PAK3', nama:'Surat keterangan dokter (penyakit akibat kerja)', fungsi:'Diisi dokter pemeriksa.', status:'draf',
          url:'https://www.bpjsketenagakerjaan.go.id/assets/uploads/formulir/F3B_PAK_Surat_Keterangan_dokter_kasus_penyakit_akibat_kerja.pdf' },
        { id:'f3pmi', kode:'F3 PMI', nama:'Laporan kecelakaan kerja PMI', fungsi:'Untuk Pekerja Migran Indonesia.', status:'draf',
          url:'https://www.bpjsketenagakerjaan.go.id/assets/uploads/formulir/Formulir_F3_KK_PMI.pdf' }
      ]},
      { id:'klaim-lain', judul:'Klaim JKM, JHT, JP, dan JKP', items:[
        { id:'f4', kode:'F4', nama:'Formulir 4 — Pengajuan pembayaran jaminan kematian dan jaminan hari tua', fungsi:'Diajukan oleh ahli waris ketika peserta meninggal dunia; memuat bagian beasiswa.', status:'draf',
          url:'https://www.bpjsketenagakerjaan.go.id/assets/uploads/formulir/F4_Pengajuan_pembayaran_jaminan_kematian_dan_jaminan_hari_tua.pdf' },
        { id:'f5', kode:'F5', nama:'Formulir 5 — Pengajuan pembayaran jaminan hari tua', fungsi:'Pengajuan klaim JHT.', status:'draf',
          url:'https://www.bpjsketenagakerjaan.go.id/assets/uploads/formulir/F5_Pengajuan_pembayaran_jaminan_hari_tua.pdf' },
        { id:'f7', kode:'F7', nama:'Formulir 7 — Pengajuan pembayaran jaminan pensiun', fungsi:'Pengajuan manfaat JP.', status:'draf',
          url:'https://www.bpjsketenagakerjaan.go.id/assets/uploads/formulir/FORMULIR_7_-_PENGAJUAN_PEMBAYARAN_JAMINAN_PENSIUN.pdf' },
        { id:'f7a', kode:'F7A', nama:'Formulir 7A — Lembar konfirmasi jaminan pensiun berkala', fungsi:'Konfirmasi penerima JP berkala.', status:'draf',
          url:'https://bpjsketenagakerjaan.go.id/assets/uploads/formulir/FORMULIR_7A_-_LEMBAR_KONFIRMASI_JAMINAN_PENSIUN_BERKALA.pdf' },
        { id:'f6', kode:'F6', nama:'Formulir 6 — Pengajuan manfaat uang tunai JKP', fungsi:'Pengajuan manfaat uang tunai Jaminan Kehilangan Pekerjaan. Jalur utama klaim JKP melalui portal SIAPkerja.', status:'draf',
          url:'https://www.bpjsketenagakerjaan.go.id/assets/uploads/formulir/Formulir_6_BPJS_Ketenagakerjaan__.pdf' }
      ]},
      { id:'beasiswa', judul:'Beasiswa', items:[
        { id:'beasiswa-ajukan', kode:'BSW', nama:'Pengajuan pembayaran manfaat beasiswa', fungsi:'Untuk anak peserta yang memenuhi syarat.', status:'draf',
          url:'https://www.bpjsketenagakerjaan.go.id/assets/uploads/formulir/Form_Beasiswa_BPJS_Ketenagakerjaan.pdf' },
        { id:'beasiswa-ubah', kode:'BSW-U', nama:'Perubahan data beasiswa', fungsi:'Perubahan data penerima beasiswa.', status:'draf',
          url:'https://www.bpjsketenagakerjaan.go.id/assets/uploads/formulir/Form_Perubahan_Beasiswa_BPJS_Ketenagakerjaan.pdf' }
      ]}
    ]
  }
};

/* =====================================================================
   PROGRAM & SEGMEN PESERTA — halaman "Program BPJSTK", "Segmen Peserta",
   dan halaman per segmen (segmen-pu/bpu/jakon/pmi.html).
   Status: 'draf' (kuning) → 'terverifikasi' (hijau) + isi diperiksa: 'YYYY-MM-DD'.
   Tautan: page = kunci SITE_CONFIG.pages · ext = kunci SITE_CONFIG.links · url = langsung
   Keikutsertaan: 'wajib' | 'skala' (wajib/boleh ditambah menurut skala usaha) | 'pilihan' | 'otomatis' | '' (tidak tersedia)
   ===================================================================== */
window.PROGRAM_BPJSTK = {
  version: '1.1.0',
  diperbarui: '2026-09-27',   // fakta utama dicek silang dengan halaman resmi 26 Sep 2026; tetap DRAF sampai diverifikasi pengelola

  /* ---------------- Program ---------------- */
  program: [
    { id:'jkk', kode:'JKK', nama:'Jaminan Kecelakaan Kerja', ikon:'shield', status:'draf',
      singkat:'Perlindungan ketika peserta mengalami kecelakaan kerja atau penyakit akibat kerja.',
      manfaat:[
        'Perawatan dan pengobatan sesuai kebutuhan medis.',
        'Santunan uang, antara lain selama tidak mampu bekerja, cacat, atau meninggal dunia karena kecelakaan kerja.',
        'Program kembali bekerja.',
        'Beasiswa pendidikan anak sesuai ketentuan.'
      ],
      iuran:{ pu:'0,24%–1,74% dari upah sebulan sesuai kelompok risiko usaha, dibayar pemberi kerja.',
              bpu:'1% dari penghasilan yang dilaporkan.',
              jakon:'Dihitung per proyek dari nilai kontrak atau total upah.',
              pmi:'Termasuk dalam paket JKK + JKM.' },
      klaim:{ page:'klaim', hash:'jkk' },
      sumber:[ {label:'Manfaat Penerima Upah (resmi)', url:'https://www.bpjsketenagakerjaan.go.id/penerima-upah.html'},
               {label:'Manfaat BPU (resmi)', url:'https://www.bpjsketenagakerjaan.go.id/bukan-penerima-upah.html'} ] },

    { id:'jkm', kode:'JKM', nama:'Jaminan Kematian', ikon:'heart', status:'draf',
      singkat:'Uang tunai bagi ahli waris ketika peserta meninggal dunia bukan karena kecelakaan kerja.',
      manfaat:[
        'Santunan kematian Rp20.000.000.',
        'Santunan berkala Rp12.000.000 (dibayar sekaligus).',
        'Biaya pemakaman Rp10.000.000.',
        'Beasiswa untuk paling banyak 2 anak bila masa iur minimal 3 tahun.'
      ],
      iuran:{ pu:'0,30% dari upah sebulan, dibayar pemberi kerja.',
              bpu:'Rp6.800 per bulan.',
              jakon:'Termasuk dalam iuran proyek.',
              pmi:'Termasuk dalam paket JKK + JKM.' },
      klaim:{ page:'klaim', hash:'jkm' },
      sumber:[ {label:'Manfaat Penerima Upah (resmi)', url:'https://www.bpjsketenagakerjaan.go.id/penerima-upah.html'} ] },

    { id:'jht', kode:'JHT', nama:'Jaminan Hari Tua', ikon:'coins', status:'draf',
      singkat:'Tabungan hari tua berupa akumulasi iuran ditambah hasil pengembangannya, dibayar tunai.',
      manfaat:[
        'Dibayar saat usia pensiun (56 tahun), cacat total tetap, atau meninggal dunia.',
        'Dapat diajukan saat berhenti bekerja, terkena PHK, kontrak kerja berakhir, atau berhenti usaha (BPU), sesuai syarat klaim.',
        'Dapat diambil sebagian satu kali setelah kepesertaan minimal 10 tahun: maksimal 10%, atau maksimal 30% untuk kepemilikan rumah.'
      ],
      iuran:{ pu:'5,7% dari upah: 3,7% pemberi kerja + 2% pekerja. Wajib untuk usaha kecil, menengah, dan besar; usaha mikro boleh menambahkan.',
              bpu:'2% dari penghasilan yang dilaporkan (pilihan).',
              pmi:'Pilihan; nominal iuran tertentu dipilih peserta, mulai Rp50.000 per bulan.' },
      klaim:{ page:'klaim', hash:'jht' },
      sumber:[ {label:'Kriteria klaim JHT (resmi)', url:'https://www.bpjsketenagakerjaan.go.id/artikel/18927/artikel-kriteria-pengajuan-klaim-jht-(jaminan-hari-tua)-dan-dokumen-pendukung.bpjs'},
               {label:'Manfaat Penerima Upah (resmi)', url:'https://www.bpjsketenagakerjaan.go.id/penerima-upah.html'} ] },

    { id:'jp', kode:'JP', nama:'Jaminan Pensiun', ikon:'calendar', status:'draf',
      singkat:'Uang tunai bulanan untuk menjaga penghasilan ketika peserta memasuki usia pensiun.',
      manfaat:[
        'Pensiun hari tua, pensiun cacat, pensiun janda/duda, pensiun anak, atau pensiun orang tua.',
        'Dibayar bulanan bila masa iur minimal 15 tahun; bila kurang, dibayar sekaligus.'
      ],
      iuran:{ pu:'3% dari upah: 2% pemberi kerja + 1% pekerja, dengan batas upah tertinggi. Wajib untuk usaha menengah dan besar; usaha mikro dan kecil boleh menambahkan.' },
      klaim:{ page:'klaim', hash:'jp' },
      sumber:[ {label:'Manfaat Penerima Upah (resmi)', url:'https://www.bpjsketenagakerjaan.go.id/penerima-upah.html'} ] },

    { id:'jkp', kode:'JKP', nama:'Jaminan Kehilangan Pekerjaan', ikon:'briefcase', status:'draf',
      singkat:'Bantuan bagi pekerja yang terkena PHK agar bisa bertahan dan kembali bekerja.',
      manfaat:[
        'Uang tunai 60% dari upah, paling lama 6 bulan (upah dihitung paling tinggi Rp5.000.000).',
        'Akses informasi pasar kerja.',
        'Pelatihan kerja.',
        'Syarat utama: masa iur minimal 12 bulan dalam 24 bulan terakhir.',
        'Peserta: pekerja WNI yang didaftarkan sebelum berusia 54 tahun, terdaftar di program sesuai skala usaha, dan terdaftar di JKN.'
      ],
      iuran:{ pu:'Tidak ada tagihan tambahan: dibiayai pemerintah (0,22%) dan rekomposisi iuran JKK (0,14%).' },
      klaim:{ page:'klaim', hash:'jkp' },
      sumber:[ {label:'Jaminan Kehilangan Pekerjaan (resmi)', url:'https://www.bpjsketenagakerjaan.go.id/jaminan-kehilangan-pekerjaan.html'},
               {label:'Manfaat Penerima Upah (resmi)', url:'https://www.bpjsketenagakerjaan.go.id/penerima-upah.html'} ] }
  ],

  /* ---------------- Segmen peserta ---------------- */
  segmen: [
    { id:'pu', kode:'PU', nama:'Penerima Upah', ikon:'building', status:'draf',
      tanya:'Saya karyawan atau pekerja bergaji',
      singkat:'Pekerja yang menerima gaji atau upah dari pemberi kerja, misalnya perusahaan, toko, pabrik, atau usaha lain. Pendaftaran dilakukan oleh pemberi kerja.',
      contoh:['karyawan kantor','buruh pabrik','pegawai toko','karyawan rumah makan','staf bengkel'],
      /* JHT & JP bukan wajib untuk semua: mengikuti skala usaha pemberi kerja (Perpres 109/2013 Pasal 6) */
      program:{ jkk:'wajib', jkm:'wajib', jht:'skala', jp:'skala', jkp:'otomatis' },
      catatan:{ jht:'Wajib untuk usaha kecil, menengah, dan besar. Usaha mikro: boleh ditambahkan.',
                jp:'Wajib untuk usaha menengah dan besar. Usaha mikro dan kecil: boleh ditambahkan.',
                jkp:'Tanpa iuran tambahan, bagi pekerja yang memenuhi syarat.' },
      iuranRingkas:'Iuran dihitung dari upah sebulan. Program yang wajib diikuti bergantung pada skala usaha (lihat tabel di atas). JKK dan JKM dibayar pemberi kerja; JHT dan JP (bila diikuti) sebagian dipotong dari upah pekerja.',
      persiapan:{ items:['NPWP perusahaan.','KTP pemilik atau pengurus.','KTP tenaga kerja.','Izin usaha.'],
                  sumber:{label:'Manfaat Penerima Upah (resmi)', url:'https://www.bpjsketenagakerjaan.go.id/penerima-upah.html'} },
      aksi:{ simulasi:{ page:'pu', label:'Hitung iuran perusahaan' },
             khusus:[ { label:'SIPP Online', desc:'Tutorial administrasi perusahaan', page:'sipp', ikon:'monitor' },
                      { label:'Tambah / nonaktif pekerja', desc:'Untuk HRD perusahaan', page:'administrasi', query:{peran:'hrd'}, ikon:'users' } ] },
      terkait:[ { label:'Panduan klaim', desc:'JHT, JKK, JKM, JP, dan JKP', page:'klaim', ikon:'wallet' },
                { label:'Sudah berhenti kerja, status masih aktif', desc:'Langkah untuk peserta PU', page:'administrasi', query:{peran:'peserta', segmen:'pu'}, ikon:'users' },
                { label:'Dasar hukum PU', desc:'PP dan Permenaker terkait', page:'peraturan', query:{program:'pu'}, ikon:'scale' } ],
      sumber:[ {label:'Manfaat Penerima Upah (resmi)', url:'https://www.bpjsketenagakerjaan.go.id/penerima-upah.html'} ] },

    { id:'bpu', kode:'BPU', nama:'Bukan Penerima Upah', ikon:'user', status:'draf',
      tanya:'Saya bekerja atau berusaha sendiri',
      singkat:'Pekerja mandiri yang bekerja atau berusaha sendiri tanpa menerima upah dari pemberi kerja. Mendaftarkan dirinya sendiri.',
      contoh:['petani','nelayan','ojol','pedagang','tukang','freelancer'],
      program:{ jkk:'wajib', jkm:'wajib', jht:'pilihan', jp:'', jkp:'' },
      catatan:{ jht:'Dapat ditambahkan sesuai pilihan peserta.' },
      iuranRingkas:'Mulai Rp16.800 per bulan untuk JKK + JKM (tarif normal, penghasilan terendah). Keringanan 50% iuran JKK dan JKM sesuai PP 50/2025: sektor transportasi Januari 2026–Maret 2027, sektor lain April–Desember 2026. Simulator menerapkannya otomatis sesuai periode.',
      persiapan:{ items:['Pendaftaran dapat melalui situs BPU resmi atau kantor cabang.','Juga tersedia melalui agen Perisai dan mitra resmi, misalnya bank, kantor pos, gerai ritel, dan aplikasi mitra.'],
                  sumber:{label:'Kanal pendaftaran BPU (resmi)', url:'https://www.bpjsketenagakerjaan.go.id/bukan-penerima-upah.html'} },
      aksi:{ simulasi:{ page:'bpu', label:'Hitung iuran BPU' },
             khusus:[ { label:'Aplikasi JMO', desc:'Cek kepesertaan & kartu digital', page:'jmo', ikon:'phone' },
                      { label:'Iuran telat / status nonaktif', desc:'Aktifkan kembali perlindungan', page:'administrasi', query:{peran:'peserta', segmen:'bpu'}, ikon:'refresh' } ] },
      terkait:[ { label:'Panduan klaim', desc:'JHT, JKK, dan JKM', page:'klaim', ikon:'wallet' },
                { label:'Dasar hukum BPU', desc:'Termasuk PP 50/2025', page:'peraturan', query:{program:'bpu'}, ikon:'scale' } ],
      sumber:[ {label:'Manfaat BPU (resmi)', url:'https://www.bpjsketenagakerjaan.go.id/bukan-penerima-upah.html'},
               {label:'Iuran mulai Rp16.800 (berita resmi)', url:'https://www.bpjsketenagakerjaan.go.id/berita/28039/Bayar-Iuran-Rp16.800-per-Bulan,-Pekerja-Informal-Terlindungi-BPJAMSOSTEK'} ] },

    { id:'jakon', kode:'Jakon', nama:'Jasa Konstruksi', ikon:'helmet', status:'draf',
      tanya:'Saya bekerja di proyek konstruksi',
      singkat:'Tenaga kerja pada proyek konstruksi, seperti pekerja harian lepas, borongan, atau musiman. Didaftarkan oleh pemberi kerja/kontraktor per proyek melalui E-Jakon.',
      contoh:['tukang proyek','pekerja harian lepas','pekerja borongan','mandor proyek','proyek jalan & gedung'],
      program:{ jkk:'wajib', jkm:'wajib', jht:'', jp:'', jkp:'' },
      catatan:{},
      iuranRingkas:'Dihitung per proyek dari nilai kontrak (progresif, setelah PPN dikeluarkan) atau dari total upah pekerja sebulan (JKK 1,74% + JKM 0,30%).',
      penting:'Karyawan tetap perusahaan konstruksi (staf kantor, admin, supervisor tetap) didaftarkan sebagai Penerima Upah, bukan Jasa Konstruksi.',
      persiapan:null,
      aksi:{ simulasi:{ page:'pu', query:{view:'jakon'}, label:'Hitung iuran proyek' },
             khusus:[ { label:'E-Jakon (resmi)', desc:'Pendaftaran & pembayaran proyek', ext:'ejakon', ikon:'external' },
                      { label:'Karyawan tetap konstruksi', desc:'Hitung sebagai Penerima Upah', page:'pu', query:{view:'konstruksi'}, ikon:'building' } ] },
      /* Informasi tambahan (gaya kotak lipat, sama dengan di simulator Jasa Konstruksi) */
      lipat:[
        { judul:'Dasar hukum perhitungan Jasa Konstruksi', items:[
            { judul:'Permenaker Nomor 5 Tahun 2021 jo. Permenaker Nomor 1 Tahun 2025', teks:'Mengatur tata cara kepesertaan Jasa Konstruksi serta dasar iuran JKK dan JKM untuk pekerja proyek.',
              tautan:[ {label:'Permenaker 5/2021 PDF', url:'https://jdih.kemnaker.go.id/asset/data_puu/21permenaker005.pdf'}, {label:'Permenaker 1/2025 PDF', url:'https://jdih.kemnaker.go.id/asset/data_puu/2025pmnaker001.pdf'} ] },
            { judul:'PP Nomor 44 Tahun 2015 sebagaimana diubah dengan PP Nomor 82 Tahun 2019 dan PP Nomor 49 Tahun 2023', teks:'Kerangka penyelenggaraan Program JKK dan JKM yang menjadi dasar perlindungan pekerja Jasa Konstruksi.',
              tautan:[ {label:'PP 44/2015 PDF', url:'https://peraturan.bpk.go.id/Download/28927/PP%20Nomor%2044%20Tahun%202015.pdf'}, {label:'PP 49/2023 PDF', url:'https://peraturan.bpk.go.id/Download/323386/PP%20Nomor%2049%20Tahun%202023.pdf'} ] } ] },
        { judul:'Cek / cetak kuitansi iuran proyek di E-Jakon', items:[
            { judul:'Layanan resmi E-Jakon BPJS Ketenagakerjaan', teks:'Kuitansi iuran proyek dicek dan dicetak di E-Jakon resmi. Website ini tidak membuat atau menyimpan kuitansi.',
              tautan:[ {label:'Buka Cek Kuitansi di E-Jakon', ext:'ejakonKuitansi'} ] } ] }
      ],
      terkait:[ { label:'Panduan klaim JKK', desc:'Pelaporan kecelakaan kerja', page:'klaim', hash:'jkk', ikon:'wallet' },
                { label:'Dasar hukum Jasa Konstruksi', desc:'Permenaker 5/2021 & 1/2025', page:'peraturan', query:{program:'jakon'}, ikon:'scale' } ],
      sumber:[ {label:'E-Jakon (resmi)', ext:'ejakon'} ] },

    { id:'pmi', kode:'PMI', nama:'Pekerja Migran Indonesia', ikon:'plane', status:'draf',
      tanya:'Saya (akan) bekerja di luar negeri',
      singkat:'Warga negara Indonesia yang akan, sedang, atau telah bekerja dengan menerima upah di luar negeri, baik calon PMI (CPMI) maupun PMI.',
      contoh:['calon PMI (CPMI)','PMI melalui Pelaksana Penempatan','PMI perseorangan'],
      program:{ jkk:'wajib', jkm:'wajib', jht:'pilihan', jp:'', jkp:'' },
      catatan:{ jht:'Program tambahan; besar iuran dipilih peserta.' },
      iuranRingkas:'Untuk perjanjian kerja 24 bulan melalui Pelaksana Penempatan: Rp370.000 untuk 31 bulan perlindungan JKK + JKM (Rp37.500 sebelum bekerja + Rp332.500 selama dan setelah bekerja); perseorangan Rp332.500. Perjanjian 6 atau 12 bulan iurannya lebih kecil. JHT pilihan dengan nominal tertentu, mulai Rp50.000 per bulan. Hitung pastinya di simulator PMI.',
      persiapan:{ items:['Daftar melalui portal PMI resmi, kantor cabang, atau layanan mitra (KP2MI, LTSA, LTSP, P4TKI).'],
                  sumber:{label:'Portal Perlindungan PMI (resmi)', url:'https://www.bpjsketenagakerjaan.go.id/pekerja-migran-indonesia.html'} },
      aksi:{ simulasi:{ page:'pmi', label:'Hitung iuran PMI' },
             khusus:[ { label:'Portal PMI (resmi)', desc:'Pendaftaran perlindungan PMI', ext:'pmiPortal', ikon:'external' },
                      { label:'PMI perseorangan', desc:'Simulasi tanpa Pelaksana Penempatan', page:'pmi', query:{jalur:'perseorangan'}, ikon:'user' } ] },
      terkait:[ { label:'Klaim JKK saat di luar negeri', desc:'Lihat panduan klaim JKK', page:'klaim', hash:'jkk', ikon:'wallet' },
                { label:'Dasar hukum PMI', desc:'Permenaker 4/2023', page:'peraturan', query:{program:'pmi'}, ikon:'scale' } ],
      sumber:[ {label:'Portal Perlindungan PMI (resmi)', url:'https://www.bpjsketenagakerjaan.go.id/pekerja-migran-indonesia.html'} ] }
  ],

  /* Penerima Upah: program wajib menurut skala usaha pemberi kerja.
     Dasar: Perpres 109/2013 Pasal 6 ayat (3). Acuan skala usaha: PP 7/2021 (modal usaha / hasil penjualan tahunan). */
  skalaUsaha: {
    judul:'Penerima Upah: program wajib menurut skala usaha',
    judulPendek:'Wajib menurut skala usaha pemberi kerja',
    sub:'JKK dan JKM wajib untuk semua. JHT dan JP mengikuti skala usaha pemberi kerja.',
    status:'draf',
    program:['jkk','jkm','jht','jp'],
    baris:[
      { skala:'Usaha mikro', wajib:['jkk','jkm'],
        acuan:'Modal usaha sampai Rp1 miliar (di luar tanah & bangunan) atau hasil penjualan sampai Rp2 miliar per tahun.' },
      { skala:'Usaha kecil', wajib:['jkk','jkm','jht'],
        acuan:'Modal usaha di atas Rp1–5 miliar atau hasil penjualan di atas Rp2–15 miliar per tahun.' },
      { skala:'Usaha menengah & besar', wajib:['jkk','jkm','jht','jp'],
        acuan:'Modal usaha di atas Rp5 miliar atau hasil penjualan di atas Rp15 miliar per tahun.' }
    ],
    catatan:'Program di luar kewajiban minimum boleh diikutkan. JKP diperoleh pekerja yang memenuhi syarat tanpa iuran tambahan. Skala usaha dipastikan petugas saat pendaftaran.',
    sumber:[ {label:'Perpres 109/2013 Pasal 6 (PDF resmi)', url:'https://www.bpjsketenagakerjaan.go.id/assets/uploads/peraturan/09012015_111102_Perpres_1092013_Penahapan.pdf'},
             {label:'Kriteria skala usaha: PP 7/2021', url:'https://peraturan.bpk.go.id/Details/161837/pp-no-7-tahun-2021'} ]
  },

  /* Rincian iuran per segmen (tabel "Iuran secara singkat") */
  iuran: {
    pu:[ { program:'JKK', oleh:'Pemberi kerja', besaran:'0,24%–1,74% dari upah (sesuai kelompok risiko)' },
         { program:'JKM', oleh:'Pemberi kerja', besaran:'0,30% dari upah' },
         { program:'JHT', oleh:'Pemberi kerja 3,7% + pekerja 2%', besaran:'5,7% dari upah · wajib mulai usaha kecil' },
         { program:'JP',  oleh:'Pemberi kerja 2% + pekerja 1%', besaran:'3% dari upah (ada batas upah) · wajib usaha menengah & besar' },
         { program:'JKP', oleh:'Pemerintah + rekomposisi JKK', besaran:'Tanpa tagihan tambahan' } ],
    bpu:[ { program:'JKK', oleh:'Peserta', besaran:'1% dari penghasilan yang dilaporkan' },
          { program:'JKM', oleh:'Peserta', besaran:'Rp6.800 per bulan' },
          { program:'JHT', oleh:'Peserta (pilihan)', besaran:'2% dari penghasilan yang dilaporkan' } ],
    jakon:[ { program:'JKK + JKM', oleh:'Pemberi kerja / kontraktor', besaran:'Dari nilai kontrak (progresif) atau total upah' } ],
    pmi:[ { program:'JKK + JKM', oleh:'CPMI/PMI', besaran:'Perjanjian 24 bulan: Rp370.000 (melalui Pelaksana Penempatan) atau Rp332.500 (perseorangan); lebih kecil untuk 6/12 bulan' },
          { program:'JHT', oleh:'CPMI/PMI (pilihan)', besaran:'Nominal tertentu dipilih peserta, mulai Rp50.000 per bulan' } ]
  }
};

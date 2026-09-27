/* =====================================================================
   TUTORIAL SIPP — Menu Mutasi Data, dalam bentuk alur keputusan
   Sumber: Panduan Pengguna Menu Mutasi Data Aplikasi SIPP BPJS
   Ketenagakerjaan (2024). Seluruh isi berstatus 'draf' sampai
   dicocokkan dengan tampilan SIPP terbaru oleh pengelola.

   Dipakai oleh sipp.html (versi Langkah & Flowchart setiap topik) dan
   flowchart/mutasi-data.html (flowchart layar penuh / tujuan QR).
   Deep link: flowchart/mutasi-data.html?ke=<id alur>

   Jenis node:
     mulai    — titik awal alur
     langkah  — dinomori otomatis oleh renderer
     aturan   — syarat atau peringatan, tidak dinomori
     selesai  — hasil akhir; nada:'tahan' untuk hasil yang menggantung
     pilihan  — percabangan; maksimal satu per alur
   ===================================================================== */
window.TUTORIAL_SIPP = {
  version: '1.1.0',
  diperbarui: '2026-09-26',
  status: 'draf',
  diperiksa: '',
  judul: 'Menu Mutasi Data SIPP Online',
  untuk: 'Pemberi kerja dan admin HRD',
  sumber: 'Panduan Pengguna Menu Mutasi Data pada Aplikasi SIPP BPJS Ketenagakerjaan, 2024',
  catatanDraf: 'Alur disusun ulang dari panduan pengguna 2024. Cocokkan dengan tampilan SIPP Online terbaru sebelum dipakai sebagai materi pelayanan.',

  alur: [
  {
    id: 'periode', nomor: '01', pil: 'Periode',
    judul: 'Siklus periode pelaporan',
    rujukan: 'Panduan bab 1',
    status: 'draf', diperiksa: '',
    kapan: 'Dipakai setiap awal bulan saat membuka periode baru, dan setiap kali periode perlu diubah, dicetak, atau dibatalkan finalisasinya.',
    node: [
      { t:'mulai', teks:'Masuk SIPP Online, buka menu Mutasi Data' },
      { t:'langkah', teks:'Klik Tambah Periode Pelaporan',
        ket:'Bulan iuran baru muncul di baris No. 1 dengan status Draft, lengkap dengan jumlah TK, nominal iuran, dan denda.' },
      { t:'pilihan', tanya:'Apa status periode yang ingin dikerjakan?', cabang:[
        { label:'Draft', node:[
          { t:'langkah', teks:'Tombol yang tersedia: Edit, Cetak, Hapus' },
          { t:'langkah', teks:'Klik Edit, lalu OK pada pop-up Pemberitahuan',
            ket:'Pemberitahuan mengingatkan agar pekerja yang belum berhenti tetap didaftarkan.' },
          { t:'langkah', teks:'Jawab Ya pada konfirmasi perubahan data PK/BU' },
          { t:'selesai', teks:'Masuk ke Dashboard Pengelolaan TK',
            ket:'Dari sini lanjut ke alur Tambah TK atau Ubah data TK.' },
          { t:'aturan', teks:'Ingin membatalkan periode ini? Klik Hapus, lalu Ya! dan OK. Hanya bisa selama status masih Draft.' }
        ]},
        { label:'Finalisasi', node:[
          { t:'langkah', teks:'Tombol yang tersedia: Batal, Cetak' },
          { t:'langkah', teks:'Klik Batal, lalu Ya! dan OK' },
          { t:'selesai', nada:'tahan', teks:'Status kembali menjadi Draft',
            ket:'Setelah kembali Draft, data TK dan upah bisa diubah lagi.' },
          { t:'aturan', teks:'Selama status masih Finalisasi, tidak ada data yang bisa diubah. Batalkan finalisasinya lebih dulu.' }
        ]},
        { label:'Posting', node:[
          { t:'langkah', teks:'Tombol yang tersedia: Cetak' },
          { t:'selesai', teks:'Periode terkunci — iuran sudah terposting' },
          { t:'aturan', teks:'Perubahan untuk bulan yang sudah terposting dibicarakan dengan petugas kantor cabang tempat perusahaan terdaftar.' }
        ]}
      ]},
      { t:'aturan', teks:'Cetak tersedia di semua status. Hasilnya terbuka di tab baru berupa Rincian Iuran Tenaga Kerja siap tanda tangan.' }
    ]
  },

  {
    id: 'tambah-tk', nomor: '02', pil: 'Tambah TK',
    judul: 'Menambah tenaga kerja',
    rujukan: 'Panduan bab 2',
    status: 'draf', diperiksa: '',
    kapan: 'Dipakai saat ada karyawan baru pada periode berjalan. Jalurnya berbeda tergantung jumlah orang dan apakah karyawan sudah pernah punya kartu BPJS Ketenagakerjaan.',
    node: [
      { t:'mulai', teks:'Dari Dashboard Pengelolaan TK, klik Tambah TK' },
      { t:'pilihan', tanya:'Berapa orang, dan apakah sudah punya kartu BPJSTK?', cabang:[
        { label:'1 orang · belum punya', node:[
          { t:'langkah', teks:'Pilih Tambah Individu, klik Pilih' },
          { t:'langkah', teks:'Pada pertanyaan kepemilikan kartu, klik Belum' },
          { t:'langkah', teks:'Pilih kewarganegaraan WNI atau WNA, klik Pilih' },
          { t:'langkah', teks:'Isi Form Tenaga Kerja: NIK, nama lengkap, tanggal lahir, kode captcha',
            ket:'Isi persis seperti KTP. Salah satu huruf saja bisa membuat data gagal terverifikasi.' },
          { t:'langkah', teks:'Klik Daftar, lalu Setuju pada pop-up Persetujuan' },
          { t:'langkah', teks:'Lengkapi Form Profil Tenaga Kerja, klik Lanjut',
            ket:'Status pegawai, tanggal awal bekerja, upah, alamat, dan lokasi pekerjaan.' },
          { t:'langkah', teks:'Periksa ulang di halaman Konfirmasi, klik Simpan',
            ket:'Masih ada yang keliru? Klik Kembali lebih dulu.' },
          { t:'selesai', teks:'Peserta baru tersimpan dan masuk daftar TK' }
        ]},
        { label:'1 orang · sudah punya', node:[
          { t:'langkah', teks:'Pilih Tambah Individu, klik Pilih' },
          { t:'langkah', teks:'Pada pertanyaan kepemilikan kartu, klik Sudah' },
          { t:'langkah', teks:'Masukkan nomor KPJ, klik Lanjut' },
          { t:'langkah', teks:'Muncul pemberitahuan bahwa TK sudah terdaftar sebagai peserta',
            ket:'Data dasar terisi otomatis. Tinggal melengkapi profil kerjanya.' },
          { t:'langkah', teks:'Lengkapi Form Tenaga Kerja, klik Lanjut' },
          { t:'langkah', teks:'Periksa profil, klik Simpan' },
          { t:'selesai', teks:'TK lanjutan masuk daftar periode pelaporan' }
        ]},
        { label:'Banyak · belum punya', node:[
          { t:'langkah', teks:'Pilih Tambah Massal (Upload), klik Pilih' },
          { t:'langkah', teks:'Pada Pilihan Upload, pastikan terpilih Upload TK Mendaftar' },
          { t:'langkah', teks:'Klik Download Template Mendaftar' },
          { t:'langkah', teks:'Isi data pada sheet data_tk_baru',
            ket:'Jangan mengubah nama file. Tambahan seperti (1) atau _1 membuat unggahan ditolak.' },
          { t:'langkah', teks:'Klik Choose File, pilih berkasnya, lalu klik Upload' },
          { t:'langkah', teks:'Periksa hasil pada List History Upload TK',
            ket:'Lihat kolom Total Valid dan Total Tidak Valid.' },
          { t:'selesai', teks:'Data valid masuk daftar TK periode berjalan' },
          { t:'aturan', teks:'Ada baris tidak valid? Unduh daftar gagal lewat tombol Download di tabel history, perbaiki, lalu unggah ulang.' }
        ]},
        { label:'Banyak · sudah punya', node:[
          { t:'langkah', teks:'Pilih Tambah Massal (Upload), klik Pilih' },
          { t:'langkah', teks:'Buka dropdown Pilihan Upload, pilih Upload TK Lanjutan' },
          { t:'langkah', teks:'Klik Download Template TK Lanjutan',
            ket:'Template ini berbeda dari template Mendaftar. Jangan tertukar.' },
          { t:'langkah', teks:'Isi data TK lanjutan pada template' },
          { t:'langkah', teks:'Klik Choose File, pilih berkasnya, klik Upload' },
          { t:'selesai', teks:'Unggahan berhasil — periksa kategori Peserta Baru' }
        ]}
      ]},
      { t:'aturan', teks:'Aturan berkas unggahan: format .xls atau .xlsx, maksimal 10.000 baris, dan seluruh sel data berformat teks.' },
      { t:'aturan', teks:'Setiap penambahan TK mengubah nominal iuran. Lanjutkan ke alur Hitung ulang & finalisasi.' }
    ]
  },

  {
    /* Disusun ulang dari node bab 3–6 (teks sama) agar topik "Kurangi TK" punya alur sendiri. */
    id: 'kurang-tk', nomor: '03', pil: 'Kurangi TK',
    judul: 'Mengurangi / menonaktifkan tenaga kerja',
    rujukan: 'Panduan bab 3–6',
    status: 'draf', diperiksa: '',
    kapan: 'Dipakai saat karyawan berhenti, resign, atau terkena PHK, saat banyak karyawan berhenti sekaligus, saat peserta baru salah dimasukkan, atau saat penonaktifan perlu dibatalkan.',
    node: [
      { t:'mulai', teks:'Buka Dashboard Pengelolaan Periode Pelaporan' },
      { t:'pilihan', tanya:'Apa yang ingin dilakukan?', cabang:[
        { label:'1 orang berhenti', node:[
          { t:'langkah', teks:'Klik ikon Action pada baris TK yang dituju' },
          { t:'langkah', teks:'Karyawan berhenti? Pilih Nonaktif' },
          { t:'selesai', teks:'TK berpindah ke kategori Peserta Nonaktif' },
          { t:'aturan', teks:'TK yang dinonaktifkan otomatis hilang dari daftar SIPP maupun SMILE pada bulan berikutnya.' }
        ]},
        { label:'Banyak orang sekaligus', node:[
          { t:'langkah', teks:'Klik Upload TK NA, lalu Download Template' },
          { t:'langkah', teks:'Isi sheet data_tk_na',
            ket:'Kolomnya: KPJ, nama lengkap, tanggal lahir, sebab NA, tanggal kejadian, keterangan.' },
          { t:'langkah', teks:'Klik Choose File tanpa mengubah nama berkas, lalu Upload' },
          { t:'selesai', teks:'Penonaktifan massal berhasil diproses' },
          { t:'aturan', teks:'Fitur ini untuk TK yang tidak dalam status meninggal. Kasus meninggal ditangani lewat prosedur klaim JKM.' }
        ]},
        { label:'Salah input TK baru', node:[
          { t:'langkah', teks:'Ganti kategori pada dropdown menjadi Peserta Baru' },
          { t:'langkah', teks:'Klik tombol Hapus pada kolom Action, lalu Ya! dan OK' },
          { t:'selesai', teks:'TK baru batal didaftarkan pada periode ini' },
          { t:'aturan', teks:'Hanya berlaku untuk TK yang baru dimasukkan pada periode berjalan dan belum difinalisasi.' }
        ]},
        { label:'Batalkan penonaktifan', node:[
          { t:'langkah', teks:'Ganti kategori pada dropdown menjadi Peserta Nonaktif' },
          { t:'langkah', teks:'Klik ikon Delete pada kolom Action, lalu Ya! dan OK',
            ket:'Tombol ini membatalkan penonaktifan, bukan menghapus peserta.' },
          { t:'selesai', teks:'Status TK kembali aktif' }
        ]}
      ]},
      { t:'aturan', teks:'Setiap perubahan jumlah TK membuat perhitungan iuran menjadi kedaluwarsa. Lanjutkan ke alur Hitung ulang & finalisasi.' }
    ]
  },

  {
    id: 'ubah-tk', nomor: '04', pil: 'Ubah data',
    judul: 'Mengelola tenaga kerja per kategori',
    rujukan: 'Panduan bab 3–6',
    status: 'draf', diperiksa: '',
    kapan: 'Dipakai saat ada kenaikan upah, perubahan profil, karyawan berhenti, atau salah input peserta baru. Tindakan yang tersedia ditentukan oleh kategori peserta yang sedang dipilih.',
    node: [
      { t:'mulai', teks:'Buka Dashboard Pengelolaan Periode Pelaporan' },
      { t:'pilihan', tanya:'Kategori peserta mana yang ingin diubah?', cabang:[
        { label:'Peserta Aktif', node:[
          { t:'langkah', teks:'Klik ikon Action pada baris TK yang dituju' },
          { t:'langkah', teks:'Naik upah? Pilih Edit Upah, isi Upah dan Rapel, klik Simpan lalu OK',
            ket:'Nilai pada daftar periode pelaporan langsung ikut berubah.' },
          { t:'langkah', teks:'Ganti data pribadi? Pilih Edit Profil, klik Save Changes',
            ket:'Muncul DISCLAIMER pertanggungjawaban kebenaran data. Baca dulu, lalu klik Setuju.' },
          { t:'langkah', teks:'Karyawan berhenti? Pilih Nonaktif' },
          { t:'selesai', teks:'TK berpindah ke kategori Peserta Nonaktif' },
          { t:'aturan', teks:'TK yang dinonaktifkan otomatis hilang dari daftar SIPP maupun SMILE pada bulan berikutnya.' }
        ]},
        { label:'Peserta Baru', node:[
          { t:'langkah', teks:'Ganti kategori pada dropdown menjadi Peserta Baru' },
          { t:'langkah', teks:'Klik tombol Hapus pada kolom Action, lalu Ya! dan OK' },
          { t:'selesai', teks:'TK baru batal didaftarkan pada periode ini' },
          { t:'aturan', teks:'Hanya berlaku untuk TK yang baru dimasukkan pada periode berjalan dan belum difinalisasi.' }
        ]},
        { label:'Peserta Nonaktif', node:[
          { t:'langkah', teks:'Ganti kategori pada dropdown menjadi Peserta Nonaktif' },
          { t:'langkah', teks:'Klik ikon Delete pada kolom Action, lalu Ya! dan OK',
            ket:'Tombol ini membatalkan penonaktifan, bukan menghapus peserta.' },
          { t:'selesai', teks:'Status TK kembali aktif' }
        ]},
        { label:'Nonaktif massal', node:[
          { t:'langkah', teks:'Klik Upload TK NA, lalu Download Template' },
          { t:'langkah', teks:'Isi sheet data_tk_na',
            ket:'Kolomnya: KPJ, nama lengkap, tanggal lahir, sebab NA, tanggal kejadian, keterangan.' },
          { t:'langkah', teks:'Klik Choose File tanpa mengubah nama berkas, lalu Upload' },
          { t:'selesai', teks:'Penonaktifan massal berhasil diproses' },
          { t:'aturan', teks:'Fitur ini untuk TK yang tidak dalam status meninggal. Kasus meninggal ditangani lewat prosedur klaim JKM.' }
        ]}
      ]},
      { t:'aturan', teks:'Setiap perubahan jumlah TK atau nominal upah membuat perhitungan iuran menjadi kedaluwarsa. Lanjutkan ke alur Hitung ulang & finalisasi.' }
    ]
  },

  {
    id: 'finalisasi', nomor: '05', pil: 'Finalisasi',
    judul: 'Hitung ulang, finalisasi, dan pembayaran',
    rujukan: 'Panduan bab 7–8',
    status: 'draf', diperiksa: '',
    kapan: 'Langkah penutup setiap periode pelaporan, dilakukan setelah seluruh perubahan TK bulan berjalan selesai.',
    node: [
      { t:'mulai', teks:'Seluruh perubahan TK bulan ini sudah dimasukkan' },
      { t:'langkah', teks:'Klik Hitung Iuran, lalu OK pada pemberitahuan berhasil' },
      { t:'langkah', teks:'Periksa nominal baru pada dashboard',
        ket:'Contoh pada panduan: TK berkurang dari 6 menjadi 5 orang, total iuran turun dari Rp207.900 menjadi Rp105.900.' },
      { t:'pilihan', tanya:'Apakah seluruh data sudah sesuai?', cabang:[
        { label:'Belum sesuai', node:[
          { t:'langkah', teks:'Kembali ke alur Ubah data TK dan perbaiki datanya' },
          { t:'langkah', teks:'Klik Hitung Iuran lagi setelah perbaikan' },
          { t:'selesai', nada:'tahan', teks:'Ulangi pemeriksaan sampai angkanya benar' }
        ]},
        { label:'Sudah sesuai', node:[
          { t:'langkah', teks:'Klik Finalisasi' },
          { t:'langkah', teks:'Klik Lakukan Finalisasi',
            ket:'Bila diminta melengkapi data sensus, pilih Lanjut Sensus lebih dulu.' },
          { t:'langkah', teks:'Periksa rincian pada Konfirmasi Finalisasi',
            ket:'Tenaga kerja aktif, penambahan, pengurangan, perubahan upah, iuran dihitung, denda, dan total yang harus dibayar.' },
          { t:'langkah', teks:'Klik Finalisasi, lalu Ya! pada konfirmasi terakhir' },
          { t:'langkah', teks:'Halaman Pembayaran Iuran terbuka, klik Print Informasi' },
          { t:'selesai', teks:'Bayar melalui bank atau merchant yang bekerja sama' }
        ]}
      ]},
      { t:'aturan', teks:'Salah finalisasi? Batalkan lewat alur Siklus periode pelaporan — status kembali menjadi Draft.' }
    ]
  },

  {
    id: 'sinkronisasi', nomor: '06', pil: 'Data tak cocok',
    judul: 'Menyinkronkan data tenaga kerja',
    rujukan: 'Panduan bab 9',
    status: 'draf', diperiksa: '',
    kapan: 'Dipakai ketika daftar TK di SIPP tidak sesuai kondisi sebenarnya — misalnya karyawan sudah didaftarkan tapi belum muncul, atau jumlah TK berbeda dengan catatan HRD.',
    node: [
      { t:'mulai', teks:'Daftar TK di SIPP tidak sesuai kondisi sebenarnya' },
      { t:'langkah', teks:'Buka menu Mutasi Data, klik Refresh TK' },
      { t:'langkah', teks:'Pada pop-up konfirmasi, klik Proses' },
      { t:'langkah', teks:'Sistem menyinkronkan data tenaga kerja' },
      { t:'pilihan', tanya:'Apakah data sudah sesuai setelah sinkronisasi?', cabang:[
        { label:'Sudah sesuai', node:[
          { t:'selesai', teks:'Lanjutkan ke alur Hitung ulang & finalisasi' }
        ]},
        { label:'Masih tidak sesuai', node:[
          { t:'langkah', teks:'Catat NPP, bulan iuran, dan selisih data yang terjadi' },
          { t:'selesai', nada:'tahan', teks:'Hubungi petugas kantor cabang tempat perusahaan terdaftar' }
        ]}
      ]},
      { t:'aturan', teks:'Jangan melakukan mutasi tenaga kerja selama proses sinkronisasi masih berjalan.' }
    ]
  }
  ]
};

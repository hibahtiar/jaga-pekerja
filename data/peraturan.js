/* =====================================================================
   REGISTRI PERATURAN — sumber tunggal tautan dasar hukum
   Dikumpulkan dari kotak "Dasar hukum" di simulator PU, BPU, Jasa Konstruksi, dan PMI.
   program: jkk, jkm, jht, jp, jkp, bpu, pmi, jakon, pu
   ===================================================================== */
window.PERATURAN = {
  version: '1.1.0',
  diperiksa: '2026-09-25',   // Perpres 109/2013 ditambahkan dan tautannya dicek 27 Sep 2026
  programs: {
    pu:'Penerima Upah', bpu:'Bukan Penerima Upah', jakon:'Jasa Konstruksi', pmi:'Pekerja Migran',
    jkk:'JKK', jkm:'JKM', jht:'JHT', jp:'JP', jkp:'JKP'
  },
  items: [
    { id:'perpres-109-2013', nomor:'Perpres Nomor 109 Tahun 2013', judul:'Penahapan Kepesertaan Program Jaminan Sosial',
      ringkas:'Pasal 6: program wajib bagi pekerja Penerima Upah menurut skala usaha pemberi kerja — usaha mikro JKK & JKM; usaha kecil JKK, JHT & JKM; usaha menengah dan besar JKK, JHT, JP & JKM.',
      program:['pu','jkk','jkm','jht','jp'], dipakai:['pu'],
      tautan:[ {label:'PDF Perpres 109/2013 (BPJS Ketenagakerjaan)', url:'https://www.bpjsketenagakerjaan.go.id/assets/uploads/peraturan/09012015_111102_Perpres_1092013_Penahapan.pdf'} ] },
    { id:'pp-44-2015', nomor:'PP Nomor 44 Tahun 2015', judul:'Penyelenggaraan Program Jaminan Kecelakaan Kerja dan Jaminan Kematian',
      ringkas:'Dasar penyelenggaraan JKK dan JKM, termasuk tarif iuran JKK per kelompok risiko. Lampiran II memuat tabel penghasilan dan dasar penghasilan peserta BPU.',
      program:['jkk','jkm','pu','bpu','jakon'], dipakai:['pu','bpu'],
      tautan:[ {label:'PDF PP 44/2015', url:'https://peraturan.bpk.go.id/Download/28927/PP%20Nomor%2044%20Tahun%202015.pdf'},
               {label:'Lampiran II (tabel BPU)', url:'https://peraturan.bpk.go.id/Download/28929/PP%20Nomor%2044%20Tahun%202015%20-%20Lampiran%202.pdf'} ] },
    { id:'pp-82-2019', nomor:'PP Nomor 82 Tahun 2019', judul:'Perubahan atas PP 44/2015',
      ringkas:'Lampiran I memuat pembagian kelompok tingkat risiko lingkungan kerja — dasar Business Finder dan kamus jenis usaha PU.',
      program:['jkk','jkm','pu'], dipakai:['pu'],
      tautan:[ {label:'Lampiran I (kelompok risiko)', url:'https://peraturan.bpk.go.id/Download/118686/PP%20Nomor%2082%20Tahun%202019%20-%20Lamp%20I.pdf'} ] },
    { id:'pp-49-2023', nomor:'PP Nomor 49 Tahun 2023', judul:'Perubahan kedua atas PP 44/2015',
      ringkas:'Mengubah pasal kepesertaan, rekomposisi iuran JKK/JKM untuk JKP, manfaat pada dugaan kecelakaan kerja, pelaporan, dan promotif-preventif. Tidak mengubah Lampiran I.',
      program:['jkk','jkm','pu','jakon'], dipakai:['pu'],
      tautan:[ {label:'PDF PP 49/2023', url:'https://peraturan.bpk.go.id/Download/323386/PP%20Nomor%2049%20Tahun%202023.pdf'},
               {label:'Halaman JDIH BPK', url:'https://peraturan.bpk.go.id/Details/266186/pp-no-49-tahun-2023'} ] },
    { id:'pp-46-2015', nomor:'PP Nomor 46 Tahun 2015', judul:'Penyelenggaraan Program Jaminan Hari Tua',
      ringkas:'Dasar penyelenggaraan JHT; iuran JHT peserta BPU 2% dari dasar penghasilan.',
      program:['jht','pu','bpu'], dipakai:['pu','bpu'],
      tautan:[ {label:'PDF PP 46/2015', url:'https://peraturan.bpk.go.id/Download/28934/PP%20Nomor%2046%20Tahun%202015.pdf'} ] },
    { id:'pp-60-2015', nomor:'PP Nomor 60 Tahun 2015', judul:'Perubahan atas PP 46/2015',
      ringkas:'Perubahan ketentuan penyelenggaraan Program Jaminan Hari Tua.',
      program:['jht','pu','bpu'], dipakai:['pu','bpu'],
      tautan:[ {label:'PDF PP 60/2015', url:'https://peraturan.bpk.go.id/Download/29100/PP%20Nomor%2060%20Tahun%202015.pdf'} ] },
    { id:'pp-45-2015', nomor:'PP Nomor 45 Tahun 2015', judul:'Penyelenggaraan Program Jaminan Pensiun',
      ringkas:'Dasar penyelenggaraan JP, termasuk mekanisme iuran dan batas upah.',
      program:['jp','pu'], dipakai:['pu'],
      tautan:[ {label:'PDF PP 45/2015', url:'https://peraturan.bpk.go.id/Download/28931/PP%20Nomor%2045%20Tahun%202015.pdf'} ] },
    { id:'pp-6-2025', nomor:'PP Nomor 6 Tahun 2025', judul:'Perubahan atas PP 37/2021 tentang Penyelenggaraan Program JKP',
      ringkas:'Mengatur iuran JKP dan rekomposisi iuran JKK.',
      program:['jkp','pu'], dipakai:['pu'],
      tautan:[ {label:'PDF PP 6/2025', url:'https://peraturan.bpk.go.id/Download/375603/PP%20Nomor%206%20Tahun%202025.pdf'} ] },
    { id:'pp-50-2025', nomor:'PP Nomor 50 Tahun 2025', judul:'Penyesuaian Iuran JKK dan JKM bagi Peserta Bukan Penerima Upah',
      ringkas:'Penyesuaian sementara iuran JKK dan JKM peserta BPU sesuai sektor dan periode berlaku; dibaca otomatis oleh simulator BPU.',
      program:['bpu','jkk','jkm'], dipakai:['bpu'],
      tautan:[ {label:'PDF PP 50/2025', url:'https://peraturan.bpk.go.id/Download/402226/PP%20Nomor%2050%20Tahun%202025.pdf'},
               {label:'Halaman JDIH BPK', url:'https://peraturan.bpk.go.id/Details/339151/pp-no-50-tahun-2025'} ] },
    { id:'permenaker-5-2021', nomor:'Permenaker Nomor 5 Tahun 2021', judul:'Tata Cara Penyelenggaraan Program JKK, JKM, dan JHT',
      ringkas:'Pedoman teknis kepesertaan (termasuk definisi BPU dan Jasa Konstruksi) serta tata cara penyelenggaraan JKK, JKM, dan JHT.',
      program:['jkk','jkm','jht','pu','bpu','jakon'], dipakai:['pu','bpu'],
      tautan:[ {label:'PDF (JDIH Kemnaker)', url:'https://jdih.kemnaker.go.id/asset/data_puu/21permenaker005.pdf'},
               {label:'PDF (BPJS Ketenagakerjaan)', url:'https://www.bpjsketenagakerjaan.go.id/assets/uploads/peraturan/Permenaker_Nomor_5_Tahun_2021_Tata_Cara_Penyelenggaraan_Program_JKK%2C_JKM%2C_dan_JHT.pdf'} ] },
    { id:'permenaker-1-2025', nomor:'Permenaker Nomor 1 Tahun 2025', judul:'Perubahan atas Permenaker 5/2021',
      ringkas:'Perubahan tata cara penyelenggaraan, termasuk konteks kepesertaan Jasa Konstruksi.',
      program:['jkk','jkm','jht','pu','jakon'], dipakai:['pu'],
      tautan:[ {label:'PDF (JDIH Kemnaker)', url:'https://jdih.kemnaker.go.id/asset/data_puu/2025pmnaker001.pdf'} ] },
    { id:'permenaker-4-2023', nomor:'Permenaker Nomor 4 Tahun 2023', judul:'Jaminan Sosial Pekerja Migran Indonesia',
      ringkas:'Kepesertaan CPMI/PMI, masa perlindungan, besaran iuran JKK/JKM, pilihan iuran JHT, manfaat, dan perlindungan sebelum, selama, serta setelah bekerja.',
      program:['pmi','jkk','jkm','jht'], dipakai:['pmi'],
      tautan:[ {label:'PDF (JDIH Kemnaker)', url:'https://jdih.kemnaker.go.id/asset/data_puu/2023pmnaker004.pdf'} ] }
  ]
};

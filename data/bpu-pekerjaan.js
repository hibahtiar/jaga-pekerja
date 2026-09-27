/* =====================================================================
   DAFTAR PEKERJAAN BPU (Bukan Penerima Upah)
   Dipakai simulasi-bpu.html (pilihan pekerjaan) dan pencarian beranda.
   - id pekerjaan dipakai untuk deep link: simulasi-bpu.html?pekerjaan=<id>
   - kata = kata kunci pencarian (bahasa sehari-hari)
   - policySector dipakai mesin kebijakan iuran (transport / other)
   ===================================================================== */
window.BPU_PEKERJAAN = {
  version: '1.1.0',
  groups: [
    { id:'transport', title:'Transportasi & Pengantaran', desc:'Ojol, sopir, kurir, pengemudi dan angkutan mandiri', policySector:'transport', jobs:[
      { id:'ojek-ojol', label:'Pengemudi ojek / ojol', kata:['ojol','ojek','ojek online','ojek pangkalan','tukang ojek','pengemudi ojek','sopir ojol','mitra ojol','driver ojol','ojek motor'] },
      { id:'sopir-angkot-taksi', label:'Sopir angkot / taksi', kata:['sopir angkot','supir angkot','pengemudi angkot','sopir taksi','supir taksi','taksi online','sopir online','driver online','driver taksi'] },
      { id:'kurir', label:'Kurir / pengantar barang', kata:['kurir mandiri','kurir online','mitra kurir','pengantar barang','pengantar paket','kurir paket','kurir lepas'] },
      { id:'sopir-logistik', label:'Sopir logistik mandiri', kata:['sopir truk','supir truk','sopir logistik','driver truk','sopir pickup','sopir box'] },
      { id:'becak-bentor', label:'Pengemudi becak / bentor', kata:['becak','tukang becak','pengayuh becak','bentor','becak motor'] },
      { id:'transportasi-lainnya', label:'Pengemudi transportasi lainnya', kata:['kusir','delman','andong','dokar','pengemudi perahu','tukang perahu','sopir mandiri'] }
    ]},
    { id:'education_religion', title:'Pendidikan & Keagamaan', desc:'Guru nonformal, guru ngaji, imam, marbot, khotib dan pengajar mandiri', policySector:'other', jobs:[
      { id:'guru-les', label:'Guru les / pengajar privat', kata:['guru les','les privat','guru privat','pengajar privat','tutor','tentor'] },
      { id:'guru-nonformal', label:'Guru nonformal / honorer non-upah tetap', kata:['guru honorer','guru nonformal','pengajar nonformal','guru paud nonformal'] },
      { id:'guru-ngaji', label:'Guru ngaji', kata:['guru ngaji','pengajar ngaji','ustadzah ngaji','guru tpa','guru tpq','guru mengaji'] },
      { id:'ustaz', label:'Ustaz / pengajar agama mandiri', kata:['ustaz','ustadz','ustadzah','pendakwah','penceramah','mubaligh','dai'] },
      { id:'imam-masjid', label:'Imam masjid', kata:['imam masjid','imam musholla','imam'] },
      { id:'marbot', label:'Marbot masjid', kata:['marbot','marbut','penjaga masjid','pengurus masjid'] },
      { id:'khotib', label:'Khotib', kata:['khotib','khatib'] },
      { id:'pengajar-agama-lainnya', label:'Pengajar keagamaan lainnya', kata:['guru agama','pengajar agama','pemuka agama','guru sekolah minggu'] }
    ]},
    { id:'construction_repair', title:'Bangunan & Perbaikan', desc:'Tukang bangunan, tukang servis, montir dan pekerja teknis mandiri', policySector:'other', jobs:[
      { id:'tukang-bangunan', label:'Tukang bangunan', kata:['tukang bangunan','kuli bangunan','buruh bangunan','tukang'] },
      { id:'tukang-batu', label:'Tukang batu', kata:['tukang batu'] },
      { id:'tukang-kayu', label:'Tukang kayu', kata:['tukang kayu'] },
      { id:'tukang-cat', label:'Tukang cat', kata:['tukang cat'] },
      { id:'tukang-listrik', label:'Tukang listrik', kata:['tukang listrik','teknisi listrik'] },
      { id:'tukang-las', label:'Tukang las', kata:['tukang las','welder'] },
      { id:'tukang-servis-elektronik', label:'Tukang servis elektronik', kata:['tukang servis','tukang servis hp','teknisi hp','tukang servis tv','teknisi elektronik'] },
      { id:'teknisi-ac', label:'Teknisi AC / kulkas', kata:['teknisi ac','tukang ac','teknisi kulkas','tukang servis ac'] },
      { id:'montir', label:'Montir / mekanik mandiri', kata:['montir','mekanik','montir panggilan','mekanik motor','tukang bengkel'] },
      { id:'tukang-servis-lainnya', label:'Tukang servis lainnya', kata:['tukang servis pompa','tukang sumur','tukang pipa'] }
    ]},
    { id:'agri', title:'Pertanian & Perkebunan', desc:'Petani, buruh tani mandiri, pekebun dan pekerja komoditas', policySector:'other', jobs:[
      { id:'petani', label:'Petani', kata:['petani','tani','bertani','petani sayur','petani cabai','petani sawah','sawah','garap sawah','berkebun sendiri','ladang'] },
      { id:'petani-tembakau', label:'Petani tembakau', kata:['petani tembakau'] },
      { id:'petani-padi', label:'Petani padi', kata:['petani padi','petani sawah'] },
      { id:'petani-jagung', label:'Petani jagung', kata:['petani jagung'] },
      { id:'pekebun', label:'Pekebun', kata:['pekebun','petani kebun','petani sawit','petani karet','petani kopi','penyadap karet','penderes'] },
      { id:'buruh-tani', label:'Buruh tani / pekerja kebun mandiri', kata:['buruh tani','buruh kebun','pekerja kebun'] },
      { id:'penggarap', label:'Penggarap lahan', kata:['penggarap','penggarap lahan','petani penggarap'] },
      { id:'pertanian-lainnya', label:'Pekerja pertanian lainnya', kata:['pekerja pertanian'] }
    ]},
    { id:'livestock', title:'Peternakan', desc:'Peternak dan pekerja ternak mandiri', policySector:'other', jobs:[
      { id:'peternak-sapi', label:'Peternak sapi', kata:['peternak sapi'] },
      { id:'peternak-kambing', label:'Peternak kambing / domba', kata:['peternak kambing','peternak domba'] },
      { id:'peternak-ayam', label:'Peternak ayam / unggas', kata:['peternak ayam','peternak unggas','peternak bebek','peternak puyuh'] },
      { id:'pekerja-ternak', label:'Pekerja ternak mandiri', kata:['pekerja ternak','buruh ternak','penggembala'] },
      { id:'peternak-lainnya', label:'Peternak lainnya', kata:['peternak'] }
    ]},
    { id:'fish', title:'Perikanan & Kelautan', desc:'Nelayan, petambak dan pembudidaya ikan', policySector:'other', jobs:[
      { id:'nelayan', label:'Nelayan', kata:['nelayan','nelayan tradisional','melaut','pencari ikan','nelayan kecil'] },
      { id:'petambak-garam', label:'Petambak garam', kata:['petambak garam','petani garam'] },
      { id:'petambak-ikan', label:'Petambak ikan / udang', kata:['petambak','petambak udang','petambak ikan','petambak bandeng'] },
      { id:'pembudidaya-ikan', label:'Pembudidaya ikan', kata:['pembudidaya ikan','peternak ikan','peternak lele'] },
      { id:'pekerja-perikanan', label:'Pekerja perikanan mandiri', kata:['buruh nelayan','pekerja perikanan','anak buah nelayan'] },
      { id:'kelautan-lainnya', label:'Pekerja kelautan lainnya', kata:['pencari kerang','penyelam','pengumpul rumput laut'] }
    ]},
    { id:'business_trade', title:'Usaha, Perdagangan & Kuliner', desc:'Pemilik usaha, pedagang, warung, toko kecil dan usaha makanan', policySector:'other', jobs:[
      { id:'pemilik-usaha', label:'Pemilik usaha / pengusaha', kata:['pemilik usaha','pengusaha','wirausaha','owner usaha'] },
      { id:'pedagang-pasar', label:'Pedagang pasar', kata:['pedagang pasar','penjual di pasar'] },
      { id:'pkl', label:'Pedagang kaki lima', kata:['pedagang kaki lima','pkl','kaki lima'] },
      { id:'warung-kecil', label:'Pemilik warung / toko kecil', kata:['pemilik warung','warung kecil','toko kecil','warung rumahan'] },
      { id:'penjual-online', label:'Penjual online / reseller', kata:['penjual online','jualan online','reseller','dropshipper','seller online'] },
      { id:'usaha-makanan', label:'Usaha makanan / minuman', kata:['jualan makanan','penjual makanan','jualan kue','jualan minuman','jual makanan','jual bakso','jualan bakso','jual gorengan','jualan gorengan','jual nasi','jual minuman','jual kopi'] },
      { id:'pedagang-keliling', label:'Pedagang keliling', kata:['pedagang keliling','asongan','penjual keliling','tukang sayur keliling'] },
      { id:'umkm-lainnya', label:'Pelaku UMKM lainnya', kata:['pelaku umkm','umkm','usaha mikro'] }
    ]},
    { id:'daily_casual', title:'Pekerja Harian & Serabutan', desc:'Pekerja serabutan, harian lepas, tukang angkut dan pekerjaan tidak tetap', policySector:'other', jobs:[
      { id:'serabutan', label:'Pekerja serabutan', kata:['serabutan','kerja serabutan','pekerja serabutan'] },
      { id:'harian-lepas', label:'Pekerja harian lepas mandiri', kata:['harian lepas','pekerja harian'] },
      { id:'kuli-angkut', label:'Tukang angkut / kuli angkut', kata:['kuli angkut','kuli panggul','buruh angkut','porter'] },
      { id:'tukang-parkir', label:'Tukang parkir', kata:['tukang parkir','juru parkir','jukir'] },
      { id:'penjaga-lepas', label:'Penjaga / pekerja lepas', kata:['penjaga lepas','penjaga malam'] },
      { id:'buruh-lepas', label:'Buruh lepas non-perusahaan', kata:['buruh lepas'] },
      { id:'pekerja-panggilan', label:'Pekerja panggilan', kata:['pekerja panggilan','tenaga panggilan'] },
      { id:'harian-lainnya', label:'Pekerja harian lainnya', kata:['pekerja tidak tetap'] }
    ]},
    { id:'personal_service', title:'Jasa Pribadi & Rumah Tangga', desc:'ART, penjahit, salon, rias dan jasa personal mandiri', policySector:'other', jobs:[
      { id:'art', label:'Asisten rumah tangga', kata:['asisten rumah tangga','prt','pembantu rumah tangga','pekerja rumah tangga','pembantu','babysitter','pengasuh anak'] },
      { id:'penjahit', label:'Penjahit', kata:['penjahit','tukang jahit','penjahit rumahan'] },
      { id:'tukang-cukur', label:'Tukang cukur / barber', kata:['tukang cukur','tukang pangkas'] },
      { id:'perias', label:'Perias / makeup artist', kata:['perias','makeup artist','mua','tukang rias'] },
      { id:'pekerja-salon', label:'Pekerja salon mandiri', kata:['pekerja salon','kapster'] },
      { id:'laundry-mandiri', label:'Laundry mandiri', kata:['laundry rumahan','tukang cuci','jasa setrika rumahan'] },
      { id:'jasa-rt-lainnya', label:'Jasa rumah tangga lainnya', kata:['tukang kebun','sopir pribadi'] }
    ]},
    { id:'professional', title:'Jasa & Profesi', desc:'Freelancer, sales, agen, konsultan dan profesi mandiri', policySector:'other', jobs:[
      { id:'freelancer', label:'Freelancer / pekerja lepas', kata:['freelancer','freelance','pekerja lepas'] },
      { id:'sales-freelance', label:'Sales freelance', kata:['sales freelance','sales lepas','marketing freelance'] },
      { id:'agen-asuransi', label:'Agen asuransi', kata:['agen asuransi perorangan','agen asuransi mandiri'] },
      { id:'agen-perantara', label:'Agen / perantara mandiri', kata:['perantara mandiri','makelar mandiri','broker mandiri'] },
      { id:'dokter-mandiri', label:'Dokter praktik mandiri', kata:['dokter praktik mandiri','dokter mandiri'] },
      { id:'advokat-mandiri', label:'Pengacara / advokat mandiri', kata:['pengacara mandiri','advokat mandiri'] },
      { id:'konsultan-mandiri', label:'Konsultan mandiri', kata:['konsultan mandiri','konsultan freelance'] },
      { id:'penerjemah', label:'Penerjemah', kata:['penerjemah lepas','translator freelance'] },
      { id:'profesi-lainnya', label:'Profesi mandiri lainnya', kata:['profesional mandiri'] }
    ]},
    { id:'creative', title:'Kreatif, Seni & Olahraga', desc:'Atlet, pelatih, seniman, musisi dan pekerja kreatif', policySector:'other', jobs:[
      { id:'atlet', label:'Atlet / olahragawan', kata:['atlet','atlit','olahragawan'] },
      { id:'pelatih', label:'Pelatih olahraga', kata:['pelatih','pelatih olahraga','coach'] },
      { id:'seniman', label:'Seniman', kata:['seniman','pelukis','pematung'] },
      { id:'musisi', label:'Musisi / penyanyi', kata:['musisi','penyanyi','pemain musik','biduan'] },
      { id:'content-creator', label:'Content creator', kata:['content creator','kreator konten','youtuber','selebgram','influencer','tiktoker'] },
      { id:'fotografer-mandiri', label:'Fotografer / videografer mandiri', kata:['fotografer lepas','fotografer freelance','videografer lepas'] },
      { id:'crew-event', label:'Crew event / EO freelance', kata:['crew event','kru event','crew eo'] },
      { id:'hiburan-lainnya', label:'Pekerja hiburan lainnya', kata:['pekerja hiburan'] }
    ]},
    { id:'craft', title:'Kerajinan & Produksi Rumahan', desc:'Pengrajin dan usaha produksi rumahan', policySector:'other', jobs:[
      { id:'pengrajin', label:'Pengrajin', kata:['pengrajin','perajin'] },
      { id:'kerajinan-rumah', label:'Pembuat kerajinan rumah tangga', kata:['kerajinan rumahan'] },
      { id:'makanan-rumahan', label:'Produksi makanan rumahan', kata:['produksi makanan rumahan','bikin kue rumahan'] },
      { id:'produsen-kecil', label:'Produsen kecil mandiri', kata:['produsen kecil'] },
      { id:'pembuat-mebel', label:'Pembuat mebel / kerajinan kayu', kata:['pembuat mebel','tukang mebel mandiri'] },
      { id:'produksi-rumahan-lainnya', label:'Produksi rumahan lainnya', kata:['produksi rumahan'] }
    ]},
    { id:'social_other', title:'Sosial & Pekerjaan Lainnya', desc:'Relawan aktif dan pekerjaan mandiri yang belum tercantum', policySector:'other', jobs:[
      { id:'relawan', label:'Relawan sosial / kebencanaan', kata:['relawan','relawan bencana','sukarelawan'] },
      { id:'mandiri-lainnya', label:'Pekerjaan mandiri lainnya', kata:['pekerja mandiri','kerja sendiri','bekerja sendiri'] },
      { id:'belum-ada', label:'Pekerjaan saya belum ada di daftar', kata:[] }
    ]}
  ]
};

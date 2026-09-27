/* =====================================================================
   KAMUS JENIS USAHA — Penerima Upah (PU) · v0.3.0
   Dipakai oleh simulasi-pu.html (Business Finder) dan pencarian beranda.
   Dasar klasifikasi: Lampiran I PP 82 Tahun 2019. Status alias: draf (perlu review petugas).
   Uji perubahan kamus di: simulasi-pu.html?kurator=1 → "Jalankan uji regresi".
   ===================================================================== */
window.KAMUS_USAHA_PU = {
 "metadata": {
  "name": "BPJSTK Business Risk Finder Master Data",
  "version": "0.3.0",
  "created": "2026-09-25",
  "official_entry_count": 191,
  "group_counts": {
   "1": 23,
   "2": 25,
   "3": 96,
   "4": 23,
   "5": 24
  },
  "source_basis": "Lampiran I PP 82 Tahun 2019 (perubahan atas PP 44 Tahun 2015)",
  "legal_review_note": "Klasifikasi memakai Lampiran I PP 82/2019. PP 49/2023 (perubahan kedua PP 44/2015) mengubah pasal kepesertaan, rekomposisi iuran JKK/JKM untuk JKP, manfaat dugaan kecelakaan kerja, pelaporan, dan promotif-preventif, tetapi tidak mengubah Lampiran I. Tetap lakukan verifikasi hukum final sebelum produksi.",
  "alias_scope": "v0.3.0: seluruh 191 entri memiliki alias. \"aliases\" = istilah sehari-hari yang langsung masuk kategori; \"aliases_inferred\" = jenis usaha yang tidak disebut eksplisit di Lampiran I dan dipetakan ke kategori terdekat (hasil selalu ditandai perlu konfirmasi). Status \"draft_v0_3\" = perlu review petugas.",
  "notes_v0_2": [
   "Menambahkan negative_terms untuk membedakan kandidat yang mirip.",
   "Menambahkan konfigurasi skor pencarian dan confidence band.",
   "Menambahkan prototype browser tanpa backend/database."
  ],
  "previous_version": "0.2.0",
  "notes_v0_3": [
   "Semua entri diperkaya alias (langsung + inferensi) dan diberi sectors & activity.",
   "Lexicon baru: varian ejaan, stopword, sinyal kegiatan, konflik kegiatan, segment hint BPU/PMI/Jakon, tips.",
   "Decision rules diperbarui (trigger eksplisit) dan ditambah: warung, travel, rental kendaraan, kaos, roti/kue, limbah, developer, perikanan.",
   "needs_confirmation kini berarti label \"perlu konfirmasi\", bukan memaksa pertanyaan. Pertanyaan hanya muncul bila tarif kandidat berbeda.",
   "Alias tunggal yang terlalu ambigu dikeluarkan dari satu kategori agar memicu pertanyaan (lihat removed_v0_3).",
   "test_cases ditambahkan untuk uji regresi di mode kurator."
  ],
  "stats_v0_3": {
   "entries": 191,
   "aliases": 3478,
   "aliases_inferred": 536,
   "entries_draft_review": 191,
   "decision_rules": 17,
   "test_cases": 414
  }
 },
 "risk_groups": {
  "1": {
   "label": "Sangat rendah",
   "jkk_rate": 0.0024,
   "jkk_percent": "0.24%"
  },
  "2": {
   "label": "Rendah",
   "jkk_rate": 0.0054,
   "jkk_percent": "0.54%"
  },
  "3": {
   "label": "Sedang",
   "jkk_rate": 0.0089,
   "jkk_percent": "0.89%"
  },
  "4": {
   "label": "Tinggi",
   "jkk_rate": 0.0127,
   "jkk_percent": "1.27%"
  },
  "5": {
   "label": "Sangat tinggi",
   "jkk_rate": 0.0174,
   "jkk_percent": "1.74%"
  }
 },
 "sectors": [
  {
   "id": "perdagangan",
   "label": "Perdagangan, toko & koperasi"
  },
  {
   "id": "kuliner_properti",
   "label": "Rumah makan, penginapan & properti"
  },
  {
   "id": "jasa_perorangan",
   "label": "Salon, laundry, foto & jasa perorangan"
  },
  {
   "id": "kantor_keuangan",
   "label": "Kantor, keuangan, profesi & kreatif"
  },
  {
   "id": "publik_sosial",
   "label": "Pendidikan, kesehatan, sosial, keagamaan & pemerintahan"
  },
  {
   "id": "hiburan_media",
   "label": "Hiburan, media, olahraga & telekomunikasi"
  },
  {
   "id": "pertanian",
   "label": "Pertanian, perkebunan & kehutanan"
  },
  {
   "id": "peternakan_perikanan",
   "label": "Peternakan & perikanan"
  },
  {
   "id": "industri_makanan",
   "label": "Industri makanan, minuman & tembakau"
  },
  {
   "id": "industri_tekstil",
   "label": "Industri tekstil, pakaian, kulit & alas kaki"
  },
  {
   "id": "industri_kayu_kertas",
   "label": "Industri kayu, mebel, kertas & percetakan"
  },
  {
   "id": "industri_kimia",
   "label": "Industri kimia, farmasi, karet & plastik"
  },
  {
   "id": "industri_mineral",
   "label": "Industri semen, keramik, kaca & bahan bangunan"
  },
  {
   "id": "industri_logam",
   "label": "Industri logam, mesin, kendaraan & kapal"
  },
  {
   "id": "industri_lainnya",
   "label": "Industri alat musik, olahraga, mainan, optik & perhiasan"
  },
  {
   "id": "bengkel_reparasi",
   "label": "Bengkel & reparasi"
  },
  {
   "id": "transportasi",
   "label": "Transportasi, ekspedisi & pergudangan"
  },
  {
   "id": "energi_utilitas",
   "label": "Energi, BBM, air, sampah & limbah"
  },
  {
   "id": "tambang",
   "label": "Pertambangan & penggalian"
  },
  {
   "id": "konstruksi",
   "label": "Konstruksi & perbaikan bangunan"
  }
 ],
 "activities": {
  "budidaya": {
   "label": "Menanam, beternak, atau membudidayakan",
   "short": "Budidaya"
  },
  "ekstraksi": {
   "label": "Menangkap, menebang, menggali, atau menambang",
   "short": "Tangkap/tambang"
  },
  "produksi": {
   "label": "Mengolah atau memproduksi barang",
   "short": "Produksi"
  },
  "perdagangan": {
   "label": "Menjual atau memperdagangkan barang",
   "short": "Perdagangan"
  },
  "sajian": {
   "label": "Menyajikan makanan/minuman kepada pelanggan",
   "short": "Rumah makan/kafe"
  },
  "reparasi": {
   "label": "Memperbaiki atau menservis barang/kendaraan",
   "short": "Servis/reparasi"
  },
  "angkutan": {
   "label": "Mengangkut barang/penumpang atau mengurus pengiriman",
   "short": "Angkutan"
  },
  "properti": {
   "label": "Menyewakan aset (properti, alat, kendaraan) atau penginapan",
   "short": "Sewa/penginapan"
  },
  "konstruksi": {
   "label": "Membangun atau memperbaiki bangunan/infrastruktur",
   "short": "Konstruksi"
  },
  "utilitas": {
   "label": "Menyediakan listrik, gas, air, BBM, atau mengelola sampah/limbah",
   "short": "Utilitas"
  },
  "jasa": {
   "label": "Memberikan jasa/layanan (kantor, profesi, kesehatan, pendidikan, hiburan)",
   "short": "Jasa"
  }
 },
 "lexicon": {
  "variants": {
   "kost": "kos",
   "kostan": "kos",
   "kosan": "kos",
   "indekos": "kos",
   "indekost": "kos",
   "koskosan": "kos",
   "laundri": "laundry",
   "londri": "laundry",
   "londry": "laundry",
   "loundri": "laundry",
   "laundrie": "laundry",
   "londre": "laundry",
   "loundry": "laundry",
   "laundy": "laundry",
   "katering": "catering",
   "ketering": "catering",
   "catring": "catering",
   "cathering": "catering",
   "kafe": "cafe",
   "caffe": "cafe",
   "cafee": "cafe",
   "kafee": "cafe",
   "caf": "cafe",
   "resto": "restoran",
   "restauran": "restoran",
   "restaurant": "restoran",
   "restoran": "restoran",
   "restaurants": "restoran",
   "apotik": "apotek",
   "atlit": "atlet",
   "meubel": "mebel",
   "mebeler": "mebel",
   "meubelair": "mebel",
   "furnitur": "mebel",
   "furniture": "mebel",
   "funiture": "mebel",
   "furnitures": "mebel",
   "photo": "foto",
   "poto": "foto",
   "photography": "fotografi",
   "photographer": "fotografer",
   "serpis": "servis",
   "servise": "servis",
   "service": "servis",
   "servic": "servis",
   "sevis": "servis",
   "supir": "sopir",
   "driver": "sopir",
   "handphone": "hp",
   "ponsel": "hp",
   "hape": "hp",
   "smartphone": "hp",
   "gadget": "hp",
   "baju": "pakaian",
   "busana": "pakaian",
   "sandang": "pakaian",
   "apparel": "pakaian",
   "clothing": "pakaian",
   "garment": "garmen",
   "garmen": "garmen",
   "warehouse": "gudang",
   "logistic": "logistik",
   "logistics": "logistik",
   "expedisi": "ekspedisi",
   "ekspidisi": "ekspedisi",
   "expedition": "ekspedisi",
   "courier": "kurir",
   "cargo": "kargo",
   "bakeri": "bakery",
   "coffee": "kopi",
   "cofee": "kopi",
   "kopii": "kopi",
   "elektrik": "listrik",
   "electric": "listrik",
   "electrical": "listrik",
   "electronic": "elektronik",
   "electronics": "elektronik",
   "elektronika": "elektronik",
   "computer": "komputer",
   "insurance": "asuransi",
   "school": "sekolah",
   "clinic": "klinik",
   "truck": "truk",
   "trucks": "truk",
   "taxi": "taksi",
   "bis": "bus",
   "klontong": "kelontong",
   "kelontongan": "kelontong",
   "jait": "jahit",
   "jaitan": "jahitan",
   "njahit": "jahit",
   "wash": "cuci",
   "repair": "reparasi",
   "rent": "sewa",
   "renting": "sewa",
   "property": "properti",
   "contractor": "kontraktor",
   "consultant": "konsultan",
   "accountant": "akuntan",
   "doctor": "dokter",
   "fish": "ikan",
   "shrimp": "udang",
   "chicken": "ayam",
   "telor": "telur",
   "ice": "es",
   "cream": "krim",
   "chocolate": "coklat",
   "cokelat": "coklat",
   "candy": "permen",
   "kripik": "keripik",
   "kerpik": "keripik",
   "krupuk": "kerupuk",
   "tempeh": "tempe",
   "mi": "mie",
   "mee": "mie",
   "noodle": "mie",
   "noodles": "mie",
   "baso": "bakso",
   "satay": "sate",
   "juice": "jus",
   "milk": "susu",
   "beverage": "minuman",
   "beverages": "minuman",
   "food": "makanan",
   "plastic": "plastik",
   "paper": "kertas",
   "wood": "kayu",
   "steel": "baja",
   "cement": "semen",
   "glass": "kaca",
   "rubber": "karet",
   "leather": "kulit",
   "shoes": "sepatu",
   "shoe": "sepatu",
   "toys": "mainan",
   "toy": "mainan",
   "cosmetic": "kosmetik",
   "cosmetics": "kosmetik",
   "kosmetika": "kosmetik",
   "perfume": "parfum",
   "parfume": "parfum",
   "soap": "sabun",
   "paint": "cat",
   "ink": "tinta",
   "glue": "lem",
   "fertilizer": "pupuk",
   "farm": "farm",
   "gym": "gym",
   "fitnes": "fitness",
   "karoke": "karaoke",
   "bilyar": "biliar",
   "billiard": "biliar",
   "bilyard": "biliar",
   "sekuriti": "security",
   "satpam": "satpam",
   "tekstil": "tekstil",
   "textile": "tekstil",
   "textil": "tekstil",
   "vulkanisasi": "vulkanisir",
   "vulkanisir": "vulkanisir",
   "pertamini": "pertamini",
   "sparepart": "sparepart",
   "spare": "spare",
   "onderdil": "sparepart",
   "trainning": "training",
   "kursus": "kursus",
   "cource": "kursus",
   "sablon": "sablon",
   "printing": "printing",
   "print": "printing",
   "rumahsakit": "rumah sakit",
   "rs": "rumah sakit",
   "batubara": "batu bara",
   "coffeeshop": "kopi shop",
   "carwash": "cuci mobil",
   "petshop": "pet shop",
   "barbershop": "barber shop",
   "pombensin": "pom bensin",
   "olshop": "online shop",
   "onlineshop": "online shop",
   "minimarket": "minimarket",
   "supermarket": "supermarket",
   "realestate": "real estate",
   "homestay": "homestay",
   "guesthouse": "guest house",
   "softlens": "softlens",
   "eo": "event organizer",
   "wo": "wedding organizer"
  },
  "stopwords": [
   "ada",
   "adalah",
   "aja",
   "akan",
   "aku",
   "atau",
   "badan",
   "bagaimana",
   "bang",
   "banyak",
   "baru",
   "beberapa",
   "bekerja",
   "berapa",
   "bergerak",
   "berupa",
   "besar",
   "bidang",
   "bisnis",
   "bpjs",
   "bu",
   "buka",
   "contoh",
   "cv",
   "daftar",
   "dalam",
   "dan",
   "dari",
   "deh",
   "dengan",
   "di",
   "dll",
   "dong",
   "dsb",
   "dua",
   "firma",
   "gua",
   "gue",
   "hitung",
   "ingin",
   "ini",
   "itu",
   "iuran",
   "jenis",
   "jkk",
   "juga",
   "kak",
   "kami",
   "karyawan",
   "kategori",
   "ke",
   "kecil",
   "kecilan",
   "kegiatan",
   "kelompok",
   "kerja",
   "kerjakan",
   "ketenagakerjaan",
   "kita",
   "lain",
   "lainnya",
   "lama",
   "macam",
   "mau",
   "membuka",
   "memiliki",
   "mempunyai",
   "mendaftar",
   "menengah",
   "mikro",
   "milik",
   "misalnya",
   "nih",
   "oleh",
   "orang",
   "pada",
   "pak",
   "pegawai",
   "pekerja",
   "pekerjaan",
   "pendaftaran",
   "persero",
   "perseroan",
   "perusahaan",
   "pt",
   "punya",
   "resiko",
   "risiko",
   "saja",
   "sama",
   "satu",
   "saya",
   "sebagai",
   "sebuah",
   "sejenis",
   "sejenisnya",
   "sektor",
   "sendiri",
   "seperti",
   "sih",
   "simulasi",
   "sudah",
   "tarif",
   "tbk",
   "tenaga",
   "tentang",
   "tersebut",
   "ud",
   "ukm",
   "umkm",
   "untuk",
   "usaha",
   "ya",
   "yang"
  ],
  "weak_tokens": {
   "jasa": 0.35,
   "layanan": 0.35,
   "lembaga": 0.4,
   "pusat": 0.4,
   "online": 0.4,
   "tradisional": 0.4,
   "swasta": 0.35,
   "negeri": 0.4,
   "umum": 0.35,
   "khusus": 0.4,
   "tempat": 0.35,
   "rumahan": 0.5,
   "industri": 0.5,
   "pabrik": 0.6,
   "produksi": 0.6,
   "kantor": 0.6,
   "unit": 0.3,
   "cabang": 0.3,
   "modern": 0.3,
   "profesional": 0.5,
   "lokal": 0.4,
   "rakyat": 0.6,
   "mandiri": 0.4
  },
  "no_stem": [
   "bengkel",
   "beras",
   "berkas",
   "besi",
   "betawi",
   "diesel",
   "digital",
   "dinas",
   "dinding",
   "distribusi",
   "distributor",
   "kebun",
   "kecap",
   "kedai",
   "keju",
   "kelapa",
   "kelinci",
   "kelontong",
   "kemasan",
   "kembang",
   "kemenyan",
   "kemiri",
   "kepiting",
   "kerai",
   "keramik",
   "kerang",
   "keranjang",
   "kerapu",
   "keripik",
   "kertas",
   "kerupuk",
   "keset",
   "ketupat",
   "mebel",
   "media",
   "medis",
   "meja",
   "memori",
   "menara",
   "mentega",
   "mesin",
   "minimarket",
   "pakaian",
   "pelayaran",
   "pelumas",
   "pemuda",
   "pengacara",
   "perahu",
   "perak",
   "perangkat",
   "perekat",
   "perhiasan",
   "pertamina",
   "pertamini",
   "perumahan",
   "pesantren",
   "pesawat",
   "petasan",
   "peti",
   "tenaga",
   "teras",
   "terasi",
   "terigu",
   "ternak",
   "terpal"
  ],
  "activity_signals": {
   "produksi": [
    "pabrik",
    "produksi",
    "memproduksi",
    "industri",
    "manufaktur",
    "manufacturing",
    "bikin",
    "olah",
    "rakit",
    "rajin",
    "maklon",
    "konveksi",
    "giling",
    "awet",
    "suling",
    "pintal",
    "tenun",
    "cor",
    "fabrikasi",
    "lebur",
    "smelter",
    "home industry",
    "produsen",
    "pembuatan",
    "membuat"
   ],
   "perdagangan": [
    "toko",
    "jual",
    "dagang",
    "retail",
    "ritel",
    "eceran",
    "grosir",
    "grosiran",
    "distributor",
    "agen",
    "reseller",
    "dropship",
    "supplier",
    "pemasok",
    "kios",
    "lapak",
    "gerai",
    "outlet",
    "minimarket",
    "swalayan",
    "supermarket",
    "showroom",
    "dealer",
    "olshop",
    "online shop",
    "trading",
    "ekspor",
    "impor",
    "pengepul",
    "kulakan"
   ],
   "sajian": [
    "warung makan",
    "rumah makan",
    "restoran",
    "cafe",
    "kedai",
    "warkop",
    "warteg",
    "angkringan",
    "kantin",
    "catering",
    "depot makan",
    "food court",
    "prasmanan",
    "jasa boga",
    "coffee shop",
    "bistro"
   ],
   "budidaya": [
    "kebun",
    "tanam",
    "budidaya",
    "ternak",
    "tambak",
    "kolam",
    "keramba",
    "sawah",
    "tani",
    "bibit",
    "benih",
    "peternak",
    "petani",
    "pekebun",
    "petambak",
    "pembudidaya"
   ],
   "ekstraksi": [
    "tambang",
    "gali",
    "galian",
    "tebang",
    "tangkap",
    "nelayan",
    "melaut",
    "buru",
    "quarry",
    "mining",
    "dulang"
   ],
   "reparasi": [
    "servis",
    "reparasi",
    "tambal",
    "overhaul",
    "montir",
    "mekanik",
    "betulin",
    "benerin"
   ],
   "angkutan": [
    "angkut",
    "ekspedisi",
    "kurir",
    "kirim",
    "logistik",
    "armada",
    "trucking",
    "kargo",
    "shuttle",
    "pelayaran",
    "maskapai",
    "forwarder",
    "forwarding"
   ],
   "properti": [
    "sewa",
    "rental",
    "persewaan",
    "kontrakan",
    "kos",
    "inap",
    "penginapan",
    "sewakan"
   ],
   "konstruksi": [
    "kontraktor",
    "konstruksi",
    "renovasi",
    "membangun",
    "pembangunan",
    "pemborong",
    "instalasi",
    "pasang",
    "pemasangan"
   ]
  },
  "activity_conflicts": {
   "produksi": [
    "perdagangan",
    "sajian",
    "reparasi",
    "budidaya"
   ],
   "perdagangan": [
    "produksi",
    "sajian",
    "budidaya",
    "ekstraksi",
    "reparasi"
   ],
   "sajian": [
    "produksi",
    "perdagangan",
    "budidaya"
   ],
   "budidaya": [
    "produksi",
    "perdagangan",
    "sajian",
    "ekstraksi"
   ],
   "ekstraksi": [
    "budidaya",
    "produksi",
    "perdagangan"
   ],
   "reparasi": [
    "produksi",
    "perdagangan"
   ],
   "angkutan": [
    "produksi"
   ],
   "properti": [
    "produksi"
   ],
   "konstruksi": [
    "produksi",
    "perdagangan"
   ]
  },
  "segment_hints": [
   {
    "id": "bpu",
    "target": "bpu",
    "title": "Bekerja sendiri tanpa pemberi kerja?",
    "message": "Kalau yang didaftarkan adalah diri Anda sendiri sebagai pekerja mandiri (bukan karyawan perusahaan), gunakan Simulasi BPU. Business Finder ini untuk perusahaan/pemberi kerja yang mendaftarkan pekerjanya (PU).",
    "cta": "Buka Simulasi BPU",
    "terms": [
     "ojol",
     "ojek",
     "ojek online",
     "ojek pangkalan",
     "sopir online",
     "ojek sopir online",
     "kurir mandiri",
     "kurir online",
     "freelance",
     "freelancer",
     "pekerja lepas",
     "pekerja mandiri",
     "bekerja sendiri",
     "tanpa karyawan",
     "pedagang kaki lima",
     "pkl",
     "pedagang keliling",
     "asongan",
     "tukang",
     "petani",
     "buruh tani",
     "nelayan",
     "peternak",
     "pekebun",
     "petambak",
     "penderes",
     "penyadap",
     "guru ngaji",
     "ustadz",
     "ustaz",
     "imam masjid",
     "marbot",
     "khotib",
     "relawan",
     "pemulung",
     "serabutan",
     "kuli",
     "kuli angkut",
     "buruh harian",
     "seniman",
     "musisi",
     "content creator",
     "youtuber",
     "selebgram",
     "influencer",
     "dropshipper",
     "mitra ojol",
     "mitra sopir",
     "mitra kurir",
     "sopir angkot",
     "asisten rumah tangga",
     "prt",
     "pembantu rumah tangga",
     "babysitter",
     "pengasuh",
     "sopir pribadi",
     "montir",
     "mekanik",
     "penjahit",
     "tukang jahit",
     "tukang cukur",
     "perias",
     "makeup artist",
     "mua",
     "pengemudi ojek",
     "tukang parkir",
     "juru parkir",
     "atlet",
     "pelatih"
    ]
   },
   {
    "id": "pmi",
    "target": "pmi",
    "title": "Bekerja ke luar negeri?",
    "message": "Perlindungan Pekerja Migran Indonesia (PMI) memakai skema tersendiri. Gunakan Simulasi PMI.",
    "cta": "Buka Simulasi PMI",
    "terms": [
     "tki",
     "tkw",
     "pmi",
     "cpmi",
     "pekerja migran",
     "kerja di luar negeri",
     "kerja luar negeri",
     "luar negeri",
     "migran"
    ]
   },
   {
    "id": "jakon",
    "target": "jakon",
    "title": "Ada proyek konstruksi?",
    "message": "Tenaga kerja pada proyek konstruksi (harian lepas, borongan, musiman) dihitung dengan skema Jasa Konstruksi, bukan PU biasa.",
    "cta": "Cek jalur Jasa Konstruksi",
    "terms": [
     "proyek",
     "kontraktor",
     "pemborong",
     "borongan",
     "mandor",
     "tukang bangunan",
     "developer",
     "pengembang perumahan",
     "konsultan konstruksi",
     "konsultan pengawas",
     "konsultan perencana",
     "renovasi",
     "bangun rumah",
     "sub kontraktor",
     "subkon"
    ]
   }
  ],
  "tips": [
   {
    "terms": [
     "bumdes",
     "badan usaha milik desa"
    ],
    "message": "BUMDes diklasifikasikan menurut kegiatan usaha utamanya. Ketik kegiatannya, misalnya 'pengelola wisata', 'toko', atau 'penggilingan padi'."
   },
   {
    "terms": [
     "yayasan"
    ],
    "message": "Yayasan diklasifikasikan menurut kegiatannya: pendidikan, sosial, keagamaan, atau kesehatan. Tambahkan kegiatannya, misalnya 'yayasan pendidikan'."
   },
   {
    "terms": [
     "koperasi"
    ],
    "message": "Koperasi termasuk kategori perdagangan (Kelompok I). Bila koperasi menjalankan usaha lain seperti pabrik atau angkutan, klasifikasi dapat mengikuti kegiatan utamanya."
   },
   {
    "terms": [
     "holding",
     "grup",
     "group",
     "kantor pusat"
    ],
    "message": "Kelompok risiko ditetapkan per jenis kegiatan usaha. Bila perusahaan punya beberapa kegiatan, gunakan kegiatan utama pada unit/NPP yang didaftarkan."
   },
   {
    "terms": [
     "outsourcing",
     "alih daya",
     "penyalur tenaga kerja",
     "penyedia jasa pekerja"
    ],
    "message": "Untuk perusahaan alih daya, konfirmasikan ke petugas apakah kelompok risiko mengikuti jenis pekerjaan yang dialihdayakan di lokasi kerja."
   }
  ],
  "construction_route_terms": [
   "konstruksi",
   "jasa konstruksi",
   "kontraktor",
   "pekerjaan konstruksi",
   "proyek konstruksi",
   "konstruksi berat",
   "proyek jalan",
   "proyek jembatan",
   "proyek gedung",
   "proyek bangunan",
   "pemborong",
   "pemborong bangunan",
   "sub kontraktor",
   "subkon"
  ],
  "generic_entries": [
   {
    "entry": "G1-008",
    "terms": [
     "toko",
     "jual",
     "penjual",
     "jualan",
     "berjualan",
     "dagang",
     "pedagang",
     "kios",
     "lapak",
     "retail",
     "ritel",
     "eceran",
     "olshop",
     "online shop",
     "reseller",
     "dropship",
     "gerai",
     "outlet",
     "minimarket",
     "swalayan",
     "showroom",
     "dealer"
    ]
   },
   {
    "entry": "G1-007",
    "terms": [
     "grosir",
     "grosiran",
     "agen",
     "distributor",
     "supplier",
     "pemasok",
     "pengepul",
     "kulakan",
     "sub distributor",
     "perdagangan besar",
     "pedagang besar"
    ]
   },
   {
    "entry": "G1-006",
    "terms": [
     "ekspor",
     "impor",
     "eksportir",
     "importir"
    ]
   },
   {
    "entry": "G2-024",
    "terms": [
     "warung makan",
     "rumah makan",
     "restoran",
     "cafe",
     "kedai",
     "depot makan",
     "kantin",
     "warkop",
     "angkringan",
     "catering",
     "bistro",
     "food court",
     "warung nasi",
     "lesehan"
    ]
   },
   {
    "entry": "G1-019",
    "terms": [
     "ternak",
     "peternakan",
     "beternak",
     "peternak"
    ]
   },
   {
    "entry": "G2-016",
    "terms": [
     "sewa",
     "rental",
     "persewaan",
     "penyewaan",
     "disewakan",
     "menyewakan"
    ]
   },
   {
    "entry": "G5-016",
    "terms": [
     "tambang",
     "penambangan",
     "pertambangan"
    ]
   },
   {
    "entry": "G4-010",
    "terms": [
     "angkutan",
     "transportasi",
     "armada"
    ]
   }
  ],
  "generic_queries": [
   {
    "terms": [
     "pabrik",
     "industri",
     "produksi",
     "manufaktur",
     "pabrikan",
     "home industry",
     "industri rumahan",
     "produsen"
    ],
    "message": "Kata kunci terlalu umum. Tambahkan produk yang dibuat, misalnya:",
    "examples": [
     "pabrik roti",
     "pabrik tahu",
     "pabrik plastik",
     "pabrik mebel",
     "konveksi",
     "pabrik es batu"
    ]
   },
   {
    "terms": [
     "jasa",
     "layanan",
     "jasa layanan",
     "penyedia jasa"
    ],
    "message": "Jasa apa yang Anda berikan? Contohnya:",
    "examples": [
     "jasa laundry",
     "jasa kebersihan",
     "jasa ekspedisi",
     "jasa konsultan",
     "jasa foto",
     "jasa keamanan"
    ]
   },
   {
    "terms": [
     "kantor",
     "perkantoran",
     "kantor cabang"
    ],
    "message": "Kegiatan kantor Anda apa? Contohnya:",
    "examples": [
     "kantor notaris",
     "kantor akuntan",
     "bank",
     "asuransi",
     "software house",
     "kantor pemerintah"
    ]
   },
   {
    "terms": [
     "dagang",
     "perdagangan",
     "berdagang",
     "pedagang"
    ],
    "message": "Perdagangannya eceran atau grosir? Contohnya:",
    "examples": [
     "toko kelontong",
     "toko baju",
     "grosir sembako",
     "distributor minuman",
     "ekspor impor"
    ]
   }
  ]
 },
 "entries": [
  {
   "id": "G1-001",
   "group": 1,
   "risk_label": "Sangat rendah",
   "jkk_rate": 0.0024,
   "jkk_percent": "0.24%",
   "official_name": "Penjahitan/konveksi",
   "sectors": [
    "industri_tekstil"
   ],
   "activity": [
    "produksi"
   ],
   "aliases": [
    "jahit",
    "penjahit",
    "konveksi",
    "usaha jahit",
    "produksi pakaian",
    "garment kecil",
    "menjahit",
    "jahitan",
    "tukang jahit",
    "penjahitan",
    "tailor",
    "taylor",
    "jasa jahit",
    "konveksi pakaian",
    "konveksi kaos",
    "konveksi seragam",
    "pembuatan seragam",
    "produksi seragam",
    "bikin seragam",
    "seragam sekolah",
    "seragam kerja",
    "pakaian jadi",
    "garmen",
    "pabrik garmen",
    "industri garmen",
    "vermak",
    "permak",
    "vermak jeans",
    "modiste",
    "butik jahit",
    "baju muslim produksi",
    "jahit kebaya",
    "jahit gorden"
   ],
   "aliases_inferred": [
    "sablon kaos",
    "sablon pakaian",
    "kaos custom",
    "jaket custom"
   ],
   "negative_terms": [
    "retail",
    "eceran",
    "grosir",
    "distributor",
    "butik online"
   ],
   "ambiguity_tags": [],
   "needs_confirmation": false,
   "source": {
    "regulation": "PP 82 Tahun 2019",
    "attachment": "Lampiran I",
    "title": "Pembagian Kelompok Tingkat Risiko Lingkungan Kerja"
   },
   "alias_review_status": "draft_v0_3",
   "added_v0_3": [
    "menjahit",
    "jahitan",
    "tukang jahit",
    "penjahitan",
    "tailor",
    "taylor",
    "jasa jahit",
    "konveksi pakaian",
    "konveksi kaos",
    "konveksi seragam",
    "pembuatan seragam",
    "produksi seragam",
    "bikin seragam",
    "seragam sekolah",
    "seragam kerja",
    "pakaian jadi",
    "garmen",
    "pabrik garmen",
    "industri garmen",
    "vermak",
    "permak",
    "vermak jeans",
    "modiste",
    "butik jahit",
    "baju muslim produksi",
    "jahit kebaya",
    "jahit gorden"
   ],
   "removed_v0_3": []
  },
  {
   "id": "G1-002",
   "group": 1,
   "risk_label": "Sangat rendah",
   "jkk_rate": 0.0024,
   "jkk_percent": "0.24%",
   "official_name": "Pabrik topi",
   "sectors": [
    "industri_tekstil"
   ],
   "activity": [
    "produksi"
   ],
   "aliases": [
    "topi",
    "pembuatan topi",
    "produksi topi",
    "konveksi topi",
    "bikin topi",
    "topi custom",
    "industri topi"
   ],
   "aliases_inferred": [
    "peci",
    "kopiah",
    "songkok",
    "pabrik peci"
   ],
   "negative_terms": [],
   "ambiguity_tags": [],
   "needs_confirmation": false,
   "source": {
    "regulation": "PP 82 Tahun 2019",
    "attachment": "Lampiran I",
    "title": "Pembagian Kelompok Tingkat Risiko Lingkungan Kerja"
   },
   "alias_review_status": "draft_v0_3",
   "added_v0_3": [
    "topi",
    "pembuatan topi",
    "produksi topi",
    "konveksi topi",
    "bikin topi",
    "topi custom",
    "industri topi"
   ],
   "removed_v0_3": []
  },
  {
   "id": "G1-003",
   "group": 1,
   "risk_label": "Sangat rendah",
   "jkk_rate": 0.0024,
   "jkk_percent": "0.24%",
   "official_name": "Industri pakaian lainnya (payung, kulit ikat pinggang, gantungan celana/bretel)",
   "sectors": [
    "industri_tekstil"
   ],
   "activity": [
    "produksi"
   ],
   "aliases": [
    "payung",
    "pabrik payung",
    "pembuatan payung",
    "ikat pinggang",
    "sabuk kulit",
    "gesper",
    "bretel",
    "suspender",
    "gantungan celana",
    "aksesoris pakaian",
    "produksi aksesoris pakaian"
   ],
   "aliases_inferred": [
    "dasi",
    "pabrik dasi"
   ],
   "negative_terms": [],
   "ambiguity_tags": [],
   "needs_confirmation": false,
   "source": {
    "regulation": "PP 82 Tahun 2019",
    "attachment": "Lampiran I",
    "title": "Pembagian Kelompok Tingkat Risiko Lingkungan Kerja"
   },
   "alias_review_status": "draft_v0_3",
   "added_v0_3": [
    "payung",
    "pabrik payung",
    "pembuatan payung",
    "ikat pinggang",
    "sabuk kulit",
    "gesper",
    "bretel",
    "suspender",
    "gantungan celana",
    "aksesoris pakaian",
    "produksi aksesoris pakaian"
   ],
   "removed_v0_3": []
  },
  {
   "id": "G1-004",
   "group": 1,
   "risk_label": "Sangat rendah",
   "jkk_rate": 0.0024,
   "jkk_percent": "0.24%",
   "official_name": "Pembuatan layar dan krey dari tekstil",
   "sectors": [
    "industri_tekstil"
   ],
   "activity": [
    "produksi"
   ],
   "aliases": [
    "krey",
    "kerai kain",
    "tirai kain",
    "roller blind",
    "layar kain",
    "layar kapal",
    "pembuatan tirai",
    "pembuatan tenda",
    "tenda kain",
    "kanopi kain",
    "pembuatan layar"
   ],
   "aliases_inferred": [],
   "negative_terms": [
    "sewa",
    "rental",
    "persewaan"
   ],
   "ambiguity_tags": [],
   "needs_confirmation": false,
   "source": {
    "regulation": "PP 82 Tahun 2019",
    "attachment": "Lampiran I",
    "title": "Pembagian Kelompok Tingkat Risiko Lingkungan Kerja"
   },
   "alias_review_status": "draft_v0_3",
   "added_v0_3": [
    "krey",
    "kerai kain",
    "tirai kain",
    "roller blind",
    "layar kain",
    "layar kapal",
    "pembuatan tirai",
    "pembuatan tenda",
    "tenda kain",
    "kanopi kain",
    "pembuatan layar"
   ],
   "removed_v0_3": []
  },
  {
   "id": "G1-005",
   "group": 1,
   "risk_label": "Sangat rendah",
   "jkk_rate": 0.0024,
   "jkk_percent": "0.24%",
   "official_name": "Pabrik keperluan rumah tangga (sprei, selimut, terpal, gorden, dan lain-lain yang ditenun)",
   "sectors": [
    "industri_tekstil"
   ],
   "activity": [
    "produksi"
   ],
   "aliases": [
    "sprei",
    "seprai",
    "bed cover",
    "selimut",
    "gorden",
    "gordyn",
    "hordeng",
    "terpal",
    "handuk",
    "taplak meja",
    "sarung bantal",
    "produksi sprei",
    "pabrik handuk",
    "tekstil rumah tangga",
    "home textile",
    "pabrik selimut",
    "keset kain"
   ],
   "aliases_inferred": [
    "keset"
   ],
   "negative_terms": [
    "laundry",
    "cuci"
   ],
   "ambiguity_tags": [],
   "needs_confirmation": false,
   "source": {
    "regulation": "PP 82 Tahun 2019",
    "attachment": "Lampiran I",
    "title": "Pembagian Kelompok Tingkat Risiko Lingkungan Kerja"
   },
   "alias_review_status": "draft_v0_3",
   "added_v0_3": [
    "sprei",
    "seprai",
    "bed cover",
    "selimut",
    "gorden",
    "gordyn",
    "hordeng",
    "terpal",
    "handuk",
    "taplak meja",
    "sarung bantal",
    "produksi sprei",
    "pabrik handuk",
    "tekstil rumah tangga",
    "home textile",
    "pabrik selimut",
    "keset kain"
   ],
   "removed_v0_3": []
  },
  {
   "id": "G1-006",
   "group": 1,
   "risk_label": "Sangat rendah",
   "jkk_rate": 0.0024,
   "jkk_percent": "0.24%",
   "official_name": "Perdagangan ekspor impor",
   "sectors": [
    "perdagangan"
   ],
   "activity": [
    "perdagangan"
   ],
   "aliases": [
    "ekspor impor",
    "export import",
    "importir",
    "eksportir",
    "ekspor",
    "impor",
    "import",
    "export",
    "importir umum",
    "perdagangan internasional",
    "trading internasional",
    "perusahaan ekspor",
    "perusahaan impor",
    "jasa impor",
    "ekspor hasil bumi",
    "ekspor furniture"
   ],
   "aliases_inferred": [],
   "negative_terms": [
    "freight forwarding",
    "forwarder",
    "ekspedisi"
   ],
   "ambiguity_tags": [],
   "needs_confirmation": false,
   "source": {
    "regulation": "PP 82 Tahun 2019",
    "attachment": "Lampiran I",
    "title": "Pembagian Kelompok Tingkat Risiko Lingkungan Kerja"
   },
   "alias_review_status": "draft_v0_3",
   "added_v0_3": [
    "ekspor",
    "impor",
    "import",
    "export",
    "importir umum",
    "perdagangan internasional",
    "trading internasional",
    "perusahaan ekspor",
    "perusahaan impor",
    "jasa impor",
    "ekspor hasil bumi",
    "ekspor furniture"
   ],
   "removed_v0_3": []
  },
  {
   "id": "G1-007",
   "group": 1,
   "risk_label": "Sangat rendah",
   "jkk_rate": 0.0024,
   "jkk_percent": "0.24%",
   "official_name": "Perdagangan besar lainnya (agen perdagangan besar, distributor, makelar, dan lain-lain)",
   "sectors": [
    "perdagangan"
   ],
   "activity": [
    "perdagangan"
   ],
   "aliases": [
    "grosir",
    "distributor",
    "agen",
    "wholesale",
    "supplier besar",
    "makelar",
    "perdagangan besar",
    "pedagang besar",
    "agen besar",
    "sub distributor",
    "subdistributor",
    "supplier",
    "pemasok",
    "grosiran",
    "kulakan",
    "toko grosir",
    "agen sembako",
    "agen beras",
    "distributor minuman",
    "distributor makanan",
    "distributor obat",
    "pedagang besar farmasi",
    "pbf",
    "perantara dagang",
    "broker",
    "general trading",
    "trading",
    "agen semen",
    "distributor semen",
    "distributor pupuk",
    "agen pupuk",
    "distributor bahan bangunan",
    "distributor elektronik",
    "agen gas",
    "agen elpiji",
    "agen minyak goreng",
    "agen telur",
    "distributor sparepart",
    "distributor alat kesehatan",
    "supplier bahan baku"
   ],
   "aliases_inferred": [
    "pengepul",
    "pengepul rongsok",
    "rongsok",
    "rongsokan",
    "barang bekas",
    "lapak rongsok",
    "pengepul barang bekas",
    "pengepul hasil bumi",
    "pengepul gabah",
    "pengepul kopi",
    "pengepul karet",
    "ram sawit",
    "peron sawit",
    "pengepul sawit",
    "loading ramp sawit",
    "pengepul ikan",
    "tpi",
    "tempat pelelangan ikan",
    "pelelangan ikan",
    "pengepul plastik",
    "bandar sayur",
    "agen koran"
   ],
   "negative_terms": [
    "retail",
    "eceran",
    "langsung ke konsumen",
    "produksi",
    "pabrik",
    "konveksi"
   ],
   "ambiguity_tags": [],
   "needs_confirmation": false,
   "source": {
    "regulation": "PP 82 Tahun 2019",
    "attachment": "Lampiran I",
    "title": "Pembagian Kelompok Tingkat Risiko Lingkungan Kerja"
   },
   "alias_review_status": "draft_v0_3",
   "added_v0_3": [
    "perdagangan besar",
    "pedagang besar",
    "agen besar",
    "sub distributor",
    "subdistributor",
    "supplier",
    "pemasok",
    "grosiran",
    "kulakan",
    "toko grosir",
    "agen sembako",
    "agen beras",
    "distributor minuman",
    "distributor makanan",
    "distributor obat",
    "pedagang besar farmasi",
    "pbf",
    "perantara dagang",
    "broker",
    "general trading",
    "trading",
    "agen semen",
    "distributor semen",
    "distributor pupuk",
    "agen pupuk",
    "distributor bahan bangunan",
    "distributor elektronik",
    "agen gas",
    "agen elpiji",
    "agen minyak goreng",
    "agen telur",
    "distributor sparepart",
    "distributor alat kesehatan",
    "supplier bahan baku"
   ],
   "removed_v0_3": []
  },
  {
   "id": "G1-008",
   "group": 1,
   "risk_label": "Sangat rendah",
   "jkk_rate": 0.0024,
   "jkk_percent": "0.24%",
   "official_name": "Perdagangan lainnya (toko, koperasi, penjualan makanan, dan lain-lain)",
   "sectors": [
    "perdagangan"
   ],
   "activity": [
    "perdagangan"
   ],
   "aliases": [
    "toko",
    "retail",
    "eceran",
    "jualan",
    "warung",
    "toko baju",
    "butik",
    "toko pakaian",
    "toko sepatu",
    "toko hp",
    "toko kosmetik",
    "toko kelontong",
    "minimarket",
    "toko bangunan",
    "koperasi",
    "kopkar",
    "koperasi karyawan",
    "kud",
    "koperasi unit desa",
    "koperasi simpan pinjam",
    "ksp",
    "kopdit",
    "koperasi kredit",
    "credit union",
    "koperasi syariah",
    "bmt",
    "penjualan makanan",
    "jual makanan",
    "jual beli",
    "dagang",
    "pedagang",
    "berdagang",
    "penjual",
    "perdagangan eceran",
    "toko online",
    "online shop",
    "e-commerce",
    "marketplace",
    "seller online",
    "supermarket",
    "swalayan",
    "toserba",
    "hypermarket",
    "department store",
    "toko sembako",
    "sembako",
    "kelontong",
    "warung kelontong",
    "warung sembako",
    "toko buah",
    "toko sayur",
    "toko daging",
    "toko ikan",
    "toko roti",
    "toko kue",
    "toko emas",
    "toko perhiasan",
    "toko elektronik",
    "toko komputer",
    "konter hp",
    "counter hp",
    "konter pulsa",
    "counter pulsa",
    "toko pulsa",
    "jual pulsa",
    "toko mainan",
    "toko buku",
    "toko alat tulis",
    "toko atk",
    "atk",
    "toko kain",
    "toko tekstil",
    "toko karpet",
    "toko mebel",
    "toko furniture",
    "toko material",
    "toko besi",
    "toko bahan bangunan",
    "toko cat",
    "toko listrik",
    "toko lampu",
    "toko sparepart",
    "toko onderdil",
    "toko aki",
    "toko ban",
    "toko oli",
    "toko pertanian",
    "kios pupuk",
    "toko pupuk",
    "toko pakan",
    "toko bibit",
    "pet shop",
    "toko hewan",
    "toko bunga",
    "florist",
    "toko oleh oleh",
    "toko souvenir",
    "toko kado",
    "toko perlengkapan bayi",
    "baby shop",
    "toko olahraga",
    "toko sepeda",
    "dealer motor",
    "dealer mobil",
    "showroom mobil",
    "showroom motor",
    "jual beli mobil",
    "mobil bekas",
    "motor bekas",
    "toko obat pertanian",
    "toko plastik",
    "toko kertas",
    "toko parfum",
    "refill parfum",
    "toko skincare",
    "toko jilbab",
    "toko hijab",
    "toko tas",
    "distro",
    "fashion",
    "toko batik",
    "toko beras",
    "toko telur",
    "toko susu",
    "toko kopi",
    "toko teh",
    "toko gas",
    "pangkalan gas",
    "pangkalan elpiji",
    "toko air galon",
    "agen air galon",
    "toko semen",
    "toko kaca",
    "toko aluminium",
    "toko alat pancing",
    "toko alat musik",
    "toko jam",
    "kios",
    "lapak",
    "gerai",
    "outlet",
    "kedai kelontong",
    "retail modern",
    "retail pakaian",
    "jualan pakaian",
    "toko pakaian anak"
   ],
   "aliases_inferred": [
    "agen pulsa",
    "toko frozen food",
    "jual frozen food",
    "minimarket waralaba",
    "franchise retail"
   ],
   "negative_terms": [
    "grosir",
    "distributor",
    "agen",
    "pabrik",
    "produksi",
    "konveksi",
    "maklon"
   ],
   "ambiguity_tags": [
    "retail_vs_wholesale_vs_manufacturing",
    "food_shop_vs_restaurant"
   ],
   "needs_confirmation": false,
   "source": {
    "regulation": "PP 82 Tahun 2019",
    "attachment": "Lampiran I",
    "title": "Pembagian Kelompok Tingkat Risiko Lingkungan Kerja"
   },
   "alias_review_status": "draft_v0_3",
   "added_v0_3": [
    "koperasi",
    "kopkar",
    "koperasi karyawan",
    "kud",
    "koperasi unit desa",
    "koperasi simpan pinjam",
    "ksp",
    "kopdit",
    "koperasi kredit",
    "credit union",
    "koperasi syariah",
    "bmt",
    "penjualan makanan",
    "jual makanan",
    "jual beli",
    "dagang",
    "pedagang",
    "berdagang",
    "penjual",
    "perdagangan eceran",
    "toko online",
    "online shop",
    "e-commerce",
    "marketplace",
    "seller online",
    "supermarket",
    "swalayan",
    "toserba",
    "hypermarket",
    "department store",
    "toko sembako",
    "sembako",
    "kelontong",
    "warung kelontong",
    "warung sembako",
    "toko buah",
    "toko sayur",
    "toko daging",
    "toko ikan",
    "toko roti",
    "toko kue",
    "toko emas",
    "toko perhiasan",
    "toko elektronik",
    "toko komputer",
    "konter hp",
    "counter hp",
    "konter pulsa",
    "counter pulsa",
    "toko pulsa",
    "jual pulsa",
    "toko mainan",
    "toko buku",
    "toko alat tulis",
    "toko atk",
    "atk",
    "toko kain",
    "toko tekstil",
    "toko karpet",
    "toko mebel",
    "toko furniture",
    "toko material",
    "toko besi",
    "toko bahan bangunan",
    "toko cat",
    "toko listrik",
    "toko lampu",
    "toko sparepart",
    "toko onderdil",
    "toko aki",
    "toko ban",
    "toko oli",
    "toko pertanian",
    "kios pupuk",
    "toko pupuk",
    "toko pakan",
    "toko bibit",
    "pet shop",
    "toko hewan",
    "toko bunga",
    "florist",
    "toko oleh oleh",
    "toko souvenir",
    "toko kado",
    "toko perlengkapan bayi",
    "baby shop",
    "toko olahraga",
    "toko sepeda",
    "dealer motor",
    "dealer mobil",
    "showroom mobil",
    "showroom motor",
    "jual beli mobil",
    "mobil bekas",
    "motor bekas",
    "toko obat pertanian",
    "toko plastik",
    "toko kertas",
    "toko parfum",
    "refill parfum",
    "toko skincare",
    "toko jilbab",
    "toko hijab",
    "toko tas",
    "distro",
    "fashion",
    "toko batik",
    "toko beras",
    "toko telur",
    "toko susu",
    "toko kopi",
    "toko teh",
    "toko gas",
    "pangkalan gas",
    "pangkalan elpiji",
    "toko air galon",
    "agen air galon",
    "toko semen",
    "toko kaca",
    "toko aluminium",
    "toko alat pancing",
    "toko alat musik",
    "toko jam",
    "kios",
    "lapak",
    "gerai",
    "outlet",
    "kedai kelontong",
    "retail modern",
    "retail pakaian",
    "jualan pakaian",
    "toko pakaian anak"
   ],
   "removed_v0_3": []
  },
  {
   "id": "G1-009",
   "group": 1,
   "risk_label": "Sangat rendah",
   "jkk_rate": 0.0024,
   "jkk_percent": "0.24%",
   "official_name": "Bank dan kantor-kantor perdagangan",
   "sectors": [
    "kantor_keuangan"
   ],
   "activity": [
    "jasa"
   ],
   "aliases": [
    "bank",
    "kantor perdagangan",
    "perbankan",
    "bpr",
    "bank perkreditan rakyat",
    "bprs",
    "bank syariah",
    "bank umum",
    "kantor bank",
    "kantor dagang",
    "kantor pemasaran",
    "kantor penjualan",
    "sales office",
    "kantor perwakilan dagang",
    "trading office"
   ],
   "aliases_inferred": [
    "leasing",
    "multifinance",
    "perusahaan pembiayaan",
    "pembiayaan",
    "finance",
    "pegadaian",
    "gadai",
    "pergadaian",
    "fintech",
    "fintech lending",
    "pinjaman online",
    "money changer",
    "penukaran valas",
    "valas",
    "sekuritas",
    "perusahaan sekuritas",
    "manajer investasi",
    "modal ventura",
    "dana pensiun",
    "agen brilink",
    "agen bank",
    "agen laku pandai",
    "ppob",
    "loket pembayaran",
    "payment point",
    "call center",
    "telemarketing",
    "bpo",
    "biro perjalanan",
    "travel agent",
    "agen travel",
    "biro travel",
    "agen perjalanan",
    "tour and travel",
    "tour travel",
    "travel umroh",
    "travel haji",
    "biro umroh",
    "ppiu",
    "agen tiket",
    "tiket pesawat",
    "perkantoran",
    "kantor administrasi",
    "back office",
    "kantor pusat perusahaan"
   ],
   "negative_terms": [
    "gudang",
    "pabrik"
   ],
   "ambiguity_tags": [],
   "needs_confirmation": false,
   "source": {
    "regulation": "PP 82 Tahun 2019",
    "attachment": "Lampiran I",
    "title": "Pembagian Kelompok Tingkat Risiko Lingkungan Kerja"
   },
   "alias_review_status": "draft_v0_3",
   "added_v0_3": [
    "perbankan",
    "bpr",
    "bank perkreditan rakyat",
    "bprs",
    "bank syariah",
    "bank umum",
    "kantor bank",
    "kantor dagang",
    "kantor pemasaran",
    "kantor penjualan",
    "sales office",
    "kantor perwakilan dagang",
    "trading office"
   ],
   "removed_v0_3": []
  },
  {
   "id": "G1-010",
   "group": 1,
   "risk_label": "Sangat rendah",
   "jkk_rate": 0.0024,
   "jkk_percent": "0.24%",
   "official_name": "Perusahaan pertanggungan/asuransi",
   "sectors": [
    "kantor_keuangan"
   ],
   "activity": [
    "jasa"
   ],
   "aliases": [
    "asuransi",
    "perusahaan asuransi",
    "pertanggungan",
    "asuransi jiwa",
    "asuransi umum",
    "asuransi kesehatan swasta",
    "broker asuransi",
    "pialang asuransi",
    "agen asuransi",
    "kantor agen asuransi",
    "reasuransi",
    "asuransi syariah",
    "takaful",
    "penilai kerugian asuransi",
    "loss adjuster"
   ],
   "aliases_inferred": [],
   "negative_terms": [],
   "ambiguity_tags": [],
   "needs_confirmation": false,
   "source": {
    "regulation": "PP 82 Tahun 2019",
    "attachment": "Lampiran I",
    "title": "Pembagian Kelompok Tingkat Risiko Lingkungan Kerja"
   },
   "alias_review_status": "draft_v0_3",
   "added_v0_3": [
    "pertanggungan",
    "asuransi jiwa",
    "asuransi umum",
    "asuransi kesehatan swasta",
    "broker asuransi",
    "pialang asuransi",
    "agen asuransi",
    "kantor agen asuransi",
    "reasuransi",
    "asuransi syariah",
    "takaful",
    "penilai kerugian asuransi",
    "loss adjuster"
   ],
   "removed_v0_3": []
  },
  {
   "id": "G1-011",
   "group": 1,
   "risk_label": "Sangat rendah",
   "jkk_rate": 0.0024,
   "jkk_percent": "0.24%",
   "official_name": "Jasa pemerintahan",
   "sectors": [
    "publik_sosial"
   ],
   "activity": [
    "jasa"
   ],
   "aliases": [
    "kantor pemerintah",
    "instansi pemerintah",
    "pemda",
    "dinas",
    "pemerintahan",
    "pemerintah daerah",
    "pemkab",
    "pemkot",
    "pemprov",
    "kementerian",
    "lembaga negara",
    "instansi",
    "kantor desa",
    "pemerintah desa",
    "pemdes",
    "kelurahan",
    "kecamatan",
    "perangkat desa",
    "aparatur desa",
    "honorer",
    "tenaga honorer",
    "non asn",
    "pegawai non asn",
    "satuan kerja",
    "satker",
    "sekretariat dprd",
    "badan pemerintah",
    "lembaga pemerintah",
    "kantor dinas",
    "pemerintah kota",
    "pemerintah kabupaten",
    "pemerintah provinsi"
   ],
   "aliases_inferred": [],
   "negative_terms": [],
   "ambiguity_tags": [],
   "needs_confirmation": false,
   "source": {
    "regulation": "PP 82 Tahun 2019",
    "attachment": "Lampiran I",
    "title": "Pembagian Kelompok Tingkat Risiko Lingkungan Kerja"
   },
   "alias_review_status": "draft_v0_3",
   "added_v0_3": [
    "pemerintahan",
    "pemerintah daerah",
    "pemkab",
    "pemkot",
    "pemprov",
    "kementerian",
    "lembaga negara",
    "instansi",
    "kantor desa",
    "pemerintah desa",
    "pemdes",
    "kelurahan",
    "kecamatan",
    "perangkat desa",
    "aparatur desa",
    "honorer",
    "tenaga honorer",
    "non asn",
    "pegawai non asn",
    "satuan kerja",
    "satker",
    "sekretariat dprd",
    "badan pemerintah",
    "lembaga pemerintah",
    "kantor dinas",
    "pemerintah kota",
    "pemerintah kabupaten",
    "pemerintah provinsi"
   ],
   "removed_v0_3": []
  },
  {
   "id": "G1-012",
   "group": 1,
   "risk_label": "Sangat rendah",
   "jkk_rate": 0.0024,
   "jkk_percent": "0.24%",
   "official_name": "Apotek, pengobatan, dan kesehatan lainnya",
   "sectors": [
    "publik_sosial"
   ],
   "activity": [
    "jasa"
   ],
   "aliases": [
    "apotek",
    "apotik",
    "klinik",
    "pengobatan",
    "layanan kesehatan",
    "rumah sakit",
    "rsud",
    "rsia",
    "rumah sakit ibu dan anak",
    "rumah sakit swasta",
    "puskesmas",
    "klinik pratama",
    "klinik utama",
    "klinik gigi",
    "dokter gigi",
    "praktik dokter",
    "praktek dokter",
    "praktik bidan",
    "bidan",
    "bidan praktik mandiri",
    "bpm",
    "klinik bersalin",
    "rumah bersalin",
    "laboratorium klinik",
    "lab klinik",
    "laboratorium kesehatan",
    "klinik fisioterapi",
    "fisioterapi",
    "klinik hemodialisa",
    "akupunktur",
    "pengobatan tradisional",
    "pengobatan alternatif",
    "bekam",
    "kesehatan",
    "fasilitas kesehatan",
    "faskes",
    "klinik kesehatan",
    "klinik umum",
    "poliklinik",
    "balai pengobatan",
    "apotek klinik",
    "optik klinik"
   ],
   "aliases_inferred": [
    "klinik kecantikan",
    "klinik estetika",
    "toko obat",
    "toko obat berizin",
    "klinik hewan",
    "dokter hewan",
    "praktik dokter hewan",
    "rumah sakit hewan",
    "home care",
    "perawat home care",
    "layanan perawat",
    "ambulans",
    "jasa ambulans",
    "klinik skincare",
    "posyandu swasta"
   ],
   "negative_terms": [],
   "ambiguity_tags": [],
   "needs_confirmation": false,
   "source": {
    "regulation": "PP 82 Tahun 2019",
    "attachment": "Lampiran I",
    "title": "Pembagian Kelompok Tingkat Risiko Lingkungan Kerja"
   },
   "alias_review_status": "draft_v0_3",
   "added_v0_3": [
    "rumah sakit",
    "rsud",
    "rsia",
    "rumah sakit ibu dan anak",
    "rumah sakit swasta",
    "puskesmas",
    "klinik pratama",
    "klinik utama",
    "klinik gigi",
    "dokter gigi",
    "praktik dokter",
    "praktek dokter",
    "praktik bidan",
    "bidan",
    "bidan praktik mandiri",
    "bpm",
    "klinik bersalin",
    "rumah bersalin",
    "laboratorium klinik",
    "lab klinik",
    "laboratorium kesehatan",
    "klinik fisioterapi",
    "fisioterapi",
    "klinik hemodialisa",
    "akupunktur",
    "pengobatan tradisional",
    "pengobatan alternatif",
    "bekam",
    "kesehatan",
    "fasilitas kesehatan",
    "faskes",
    "klinik kesehatan",
    "klinik umum",
    "poliklinik",
    "balai pengobatan",
    "apotek klinik",
    "optik klinik"
   ],
   "removed_v0_3": []
  },
  {
   "id": "G1-013",
   "group": 1,
   "risk_label": "Sangat rendah",
   "jkk_rate": 0.0024,
   "jkk_percent": "0.24%",
   "official_name": "Organisasi-organisasi keagamaan",
   "sectors": [
    "publik_sosial"
   ],
   "activity": [
    "jasa"
   ],
   "aliases": [
    "masjid",
    "musholla",
    "mushola",
    "musala",
    "gereja",
    "pura",
    "vihara",
    "klenteng",
    "tempat ibadah",
    "rumah ibadah",
    "dkm",
    "takmir masjid",
    "yayasan masjid",
    "yayasan keagamaan",
    "organisasi keagamaan",
    "ormas keagamaan",
    "majelis taklim",
    "lembaga dakwah",
    "yayasan dakwah",
    "lembaga amil zakat",
    "laz",
    "rumah zakat",
    "badan amil zakat",
    "kemasjidan",
    "keagamaan"
   ],
   "aliases_inferred": [
    "pondok pesantren",
    "pesantren",
    "ponpes",
    "madrasah diniyah",
    "tpq",
    "taman pendidikan quran"
   ],
   "negative_terms": [],
   "ambiguity_tags": [],
   "needs_confirmation": false,
   "source": {
    "regulation": "PP 82 Tahun 2019",
    "attachment": "Lampiran I",
    "title": "Pembagian Kelompok Tingkat Risiko Lingkungan Kerja"
   },
   "alias_review_status": "draft_v0_3",
   "added_v0_3": [
    "masjid",
    "musholla",
    "mushola",
    "musala",
    "gereja",
    "pura",
    "vihara",
    "klenteng",
    "tempat ibadah",
    "rumah ibadah",
    "dkm",
    "takmir masjid",
    "yayasan masjid",
    "yayasan keagamaan",
    "organisasi keagamaan",
    "ormas keagamaan",
    "majelis taklim",
    "lembaga dakwah",
    "yayasan dakwah",
    "lembaga amil zakat",
    "laz",
    "rumah zakat",
    "badan amil zakat",
    "kemasjidan",
    "keagamaan"
   ],
   "removed_v0_3": []
  },
  {
   "id": "G1-014",
   "group": 1,
   "risk_label": "Sangat rendah",
   "jkk_rate": 0.0024,
   "jkk_percent": "0.24%",
   "official_name": "Lembaga kesejahteraan/sosial",
   "sectors": [
    "publik_sosial"
   ],
   "activity": [
    "jasa"
   ],
   "aliases": [
    "panti asuhan",
    "panti jompo",
    "panti werdha",
    "panti sosial",
    "lks",
    "lembaga kesejahteraan sosial",
    "yayasan sosial",
    "lsm",
    "ngo",
    "organisasi nirlaba",
    "nirlaba",
    "lembaga nirlaba",
    "yayasan",
    "lembaga amal",
    "filantropi",
    "rumah singgah",
    "rehabilitasi sosial",
    "lembaga sosial",
    "kesejahteraan sosial",
    "sosial"
   ],
   "aliases_inferred": [
    "penitipan anak",
    "tempat penitipan anak",
    "daycare",
    "day care",
    "panti rehabilitasi"
   ],
   "negative_terms": [],
   "ambiguity_tags": [],
   "needs_confirmation": false,
   "source": {
    "regulation": "PP 82 Tahun 2019",
    "attachment": "Lampiran I",
    "title": "Pembagian Kelompok Tingkat Risiko Lingkungan Kerja"
   },
   "alias_review_status": "draft_v0_3",
   "added_v0_3": [
    "panti asuhan",
    "panti jompo",
    "panti werdha",
    "panti sosial",
    "lks",
    "lembaga kesejahteraan sosial",
    "yayasan sosial",
    "lsm",
    "ngo",
    "organisasi nirlaba",
    "nirlaba",
    "lembaga nirlaba",
    "yayasan",
    "lembaga amal",
    "filantropi",
    "rumah singgah",
    "rehabilitasi sosial",
    "lembaga sosial",
    "kesejahteraan sosial",
    "sosial"
   ],
   "removed_v0_3": []
  },
  {
   "id": "G1-015",
   "group": 1,
   "risk_label": "Sangat rendah",
   "jkk_rate": 0.0024,
   "jkk_percent": "0.24%",
   "official_name": "Persatuan perdagangan dan organisasi buruh",
   "sectors": [
    "publik_sosial"
   ],
   "activity": [
    "jasa"
   ],
   "aliases": [
    "serikat pekerja",
    "serikat buruh",
    "organisasi buruh",
    "federasi buruh",
    "konfederasi serikat",
    "asosiasi",
    "asosiasi pengusaha",
    "asosiasi dagang",
    "kamar dagang",
    "kadin",
    "himpunan pengusaha",
    "perkumpulan pedagang",
    "persatuan pedagang",
    "paguyuban pedagang",
    "organisasi profesi",
    "ikatan profesi",
    "perkumpulan"
   ],
   "aliases_inferred": [
    "ormas",
    "organisasi masyarakat",
    "partai politik",
    "kantor partai"
   ],
   "negative_terms": [],
   "ambiguity_tags": [],
   "needs_confirmation": false,
   "source": {
    "regulation": "PP 82 Tahun 2019",
    "attachment": "Lampiran I",
    "title": "Pembagian Kelompok Tingkat Risiko Lingkungan Kerja"
   },
   "alias_review_status": "draft_v0_3",
   "added_v0_3": [
    "serikat pekerja",
    "serikat buruh",
    "organisasi buruh",
    "federasi buruh",
    "konfederasi serikat",
    "asosiasi",
    "asosiasi pengusaha",
    "asosiasi dagang",
    "kamar dagang",
    "kadin",
    "himpunan pengusaha",
    "perkumpulan pedagang",
    "persatuan pedagang",
    "paguyuban pedagang",
    "organisasi profesi",
    "ikatan profesi",
    "perkumpulan"
   ],
   "removed_v0_3": []
  },
  {
   "id": "G1-016",
   "group": 1,
   "risk_label": "Sangat rendah",
   "jkk_rate": 0.0024,
   "jkk_percent": "0.24%",
   "official_name": "Balai penyidikan yang berdiri sendiri",
   "sectors": [
    "publik_sosial"
   ],
   "activity": [
    "jasa"
   ],
   "aliases": [
    "balai penelitian",
    "lembaga penelitian",
    "lembaga riset",
    "pusat riset",
    "laboratorium penelitian",
    "lab riset",
    "balai pengujian",
    "laboratorium pengujian",
    "lab uji",
    "laboratorium uji",
    "balai penyidikan",
    "penelitian",
    "riset"
   ],
   "aliases_inferred": [
    "lembaga survei",
    "lembaga sertifikasi",
    "inspeksi dan sertifikasi",
    "laboratorium lingkungan",
    "tera ulang"
   ],
   "negative_terms": [],
   "ambiguity_tags": [],
   "needs_confirmation": false,
   "source": {
    "regulation": "PP 82 Tahun 2019",
    "attachment": "Lampiran I",
    "title": "Pembagian Kelompok Tingkat Risiko Lingkungan Kerja"
   },
   "alias_review_status": "draft_v0_3",
   "added_v0_3": [
    "balai penelitian",
    "lembaga penelitian",
    "lembaga riset",
    "pusat riset",
    "laboratorium penelitian",
    "lab riset",
    "balai pengujian",
    "laboratorium pengujian",
    "lab uji",
    "laboratorium uji",
    "balai penyidikan",
    "penelitian",
    "riset"
   ],
   "removed_v0_3": []
  },
  {
   "id": "G1-017",
   "group": 1,
   "risk_label": "Sangat rendah",
   "jkk_rate": 0.0024,
   "jkk_percent": "0.24%",
   "official_name": "Jasa pengamanan dan jasa umum lainnya seperti museum, perpustakaan, kebun binatang, dan lain-lain",
   "sectors": [
    "publik_sosial"
   ],
   "activity": [
    "jasa"
   ],
   "aliases": [
    "security",
    "satpam",
    "jasa pengamanan",
    "museum",
    "perpustakaan",
    "kebun binatang",
    "jasa umum",
    "jasa keamanan",
    "bujp",
    "badan usaha jasa pengamanan",
    "pengamanan",
    "keamanan",
    "penjaga keamanan",
    "outsourcing satpam",
    "cleaning service",
    "jasa kebersihan",
    "jasa kebersihan gedung",
    "kebersihan gedung",
    "janitor",
    "housekeeping",
    "jasa cleaning",
    "cleaning",
    "cleaner",
    "galeri",
    "galeri seni",
    "taman budaya",
    "cagar budaya",
    "kebun raya",
    "akuarium publik",
    "planetarium",
    "jasa pemakaman",
    "pemakaman",
    "rumah duka",
    "krematorium"
   ],
   "aliases_inferred": [
    "outsourcing",
    "alih daya",
    "perusahaan alih daya",
    "penyedia jasa tenaga kerja",
    "penyalur tenaga kerja",
    "yayasan penyalur",
    "penyalur art",
    "penyalur pembantu",
    "lpprt",
    "p3mi",
    "perusahaan penempatan pmi",
    "facility management",
    "sekolah",
    "sekolah swasta",
    "yayasan pendidikan",
    "lembaga pendidikan",
    "pendidikan",
    "sd swasta",
    "smp swasta",
    "sma swasta",
    "smk swasta",
    "sekolah dasar",
    "sekolah menengah",
    "tk",
    "taman kanak kanak",
    "paud",
    "kelompok bermain",
    "playgroup",
    "bimbel",
    "bimbingan belajar",
    "lembaga kursus",
    "kursus",
    "lkp",
    "tempat les",
    "les privat",
    "lembaga bimbel",
    "lpk",
    "lembaga pelatihan kerja",
    "balai latihan kerja",
    "pelatihan",
    "training center",
    "kampus",
    "universitas",
    "perguruan tinggi",
    "akademi",
    "politeknik",
    "sekolah tinggi",
    "institut",
    "madrasah",
    "sekolah islam",
    "sekolah musik",
    "kursus musik",
    "kursus mengemudi",
    "kursus bahasa",
    "lembaga bahasa",
    "sekolah alam",
    "boarding school",
    "homeschooling"
   ],
   "negative_terms": [
    "sampah",
    "kotoran",
    "limbah"
   ],
   "ambiguity_tags": [],
   "needs_confirmation": true,
   "source": {
    "regulation": "PP 82 Tahun 2019",
    "attachment": "Lampiran I",
    "title": "Pembagian Kelompok Tingkat Risiko Lingkungan Kerja"
   },
   "alias_review_status": "draft_v0_3",
   "added_v0_3": [
    "jasa keamanan",
    "bujp",
    "badan usaha jasa pengamanan",
    "pengamanan",
    "keamanan",
    "penjaga keamanan",
    "outsourcing satpam",
    "cleaning service",
    "jasa kebersihan",
    "jasa kebersihan gedung",
    "kebersihan gedung",
    "janitor",
    "housekeeping",
    "jasa cleaning",
    "cleaning",
    "cleaner",
    "galeri",
    "galeri seni",
    "taman budaya",
    "cagar budaya",
    "kebun raya",
    "akuarium publik",
    "planetarium",
    "jasa pemakaman",
    "pemakaman",
    "rumah duka",
    "krematorium"
   ],
   "removed_v0_3": []
  },
  {
   "id": "G1-018",
   "group": 1,
   "risk_label": "Sangat rendah",
   "jkk_rate": 0.0024,
   "jkk_percent": "0.24%",
   "official_name": "Pemangkas rambut dan salon kecantikan",
   "sectors": [
    "jasa_perorangan"
   ],
   "activity": [
    "jasa"
   ],
   "aliases": [
    "salon",
    "barbershop",
    "barber",
    "pangkas rambut",
    "salon kecantikan",
    "potong rambut",
    "tukang cukur",
    "cukur rambut",
    "pangkas",
    "salon rambut",
    "salon muslimah",
    "hair salon",
    "hairdresser",
    "spa",
    "day spa",
    "pijat",
    "massage",
    "refleksi",
    "refleksologi",
    "lulur",
    "nail art",
    "salon kuku",
    "nail salon",
    "eyelash",
    "eyelash extension",
    "sulam alis",
    "waxing",
    "rias pengantin",
    "perias",
    "make up artist",
    "makeup artist",
    "mua",
    "tata rias",
    "bridal",
    "salon pengantin",
    "barber shop",
    "grooming",
    "perawatan wajah",
    "facial",
    "salon kecantikan muslimah"
   ],
   "aliases_inferred": [
    "panti pijat",
    "spa pria",
    "salon hewan",
    "grooming kucing"
   ],
   "negative_terms": [
    "pabrik",
    "produksi"
   ],
   "ambiguity_tags": [],
   "needs_confirmation": false,
   "source": {
    "regulation": "PP 82 Tahun 2019",
    "attachment": "Lampiran I",
    "title": "Pembagian Kelompok Tingkat Risiko Lingkungan Kerja"
   },
   "alias_review_status": "draft_v0_3",
   "added_v0_3": [
    "potong rambut",
    "tukang cukur",
    "cukur rambut",
    "pangkas",
    "salon rambut",
    "salon muslimah",
    "hair salon",
    "hairdresser",
    "spa",
    "day spa",
    "pijat",
    "massage",
    "refleksi",
    "refleksologi",
    "lulur",
    "nail art",
    "salon kuku",
    "nail salon",
    "eyelash",
    "eyelash extension",
    "sulam alis",
    "waxing",
    "rias pengantin",
    "perias",
    "make up artist",
    "makeup artist",
    "mua",
    "tata rias",
    "bridal",
    "salon pengantin",
    "barber shop",
    "grooming",
    "perawatan wajah",
    "facial",
    "salon kecantikan muslimah"
   ],
   "removed_v0_3": []
  },
  {
   "id": "G1-019",
   "group": 1,
   "risk_label": "Sangat rendah",
   "jkk_rate": 0.0024,
   "jkk_percent": "0.24%",
   "official_name": "Peternakan",
   "sectors": [
    "peternakan_perikanan"
   ],
   "activity": [
    "budidaya"
   ],
   "aliases": [
    "peternakan",
    "ternak ayam",
    "ternak sapi",
    "ternak kambing",
    "farm ternak",
    "ternak",
    "peternak",
    "beternak",
    "peternakan ayam",
    "ayam petelur",
    "ayam pedaging",
    "ayam broiler",
    "broiler",
    "kandang ayam",
    "ayam kampung",
    "peternakan sapi",
    "sapi perah",
    "sapi potong",
    "penggemukan sapi",
    "feedlot",
    "ternak domba",
    "peternakan kambing",
    "ternak bebek",
    "peternakan bebek",
    "itik",
    "burung puyuh",
    "ternak puyuh",
    "ternak kelinci",
    "ternak babi",
    "peternakan babi",
    "ternak kerbau",
    "peternakan kuda",
    "pembibitan ayam",
    "hatchery ayam",
    "penetasan telur",
    "breeding farm",
    "kandang ternak",
    "peternakan unggas",
    "ternak unggas",
    "peternakan telur",
    "ternak burung",
    "peternakan domba",
    "peternakan susu"
   ],
   "aliases_inferred": [
    "ternak lebah",
    "peternakan lebah",
    "madu ternak",
    "budidaya walet",
    "rumah walet",
    "sarang walet",
    "ternak maggot",
    "budidaya maggot",
    "ulat sutra",
    "penangkaran burung"
   ],
   "negative_terms": [
    "pemotongan",
    "potong",
    "rph",
    "pakan pabrik"
   ],
   "ambiguity_tags": [],
   "needs_confirmation": false,
   "source": {
    "regulation": "PP 82 Tahun 2019",
    "attachment": "Lampiran I",
    "title": "Pembagian Kelompok Tingkat Risiko Lingkungan Kerja"
   },
   "alias_review_status": "draft_v0_3",
   "added_v0_3": [
    "ternak",
    "peternak",
    "beternak",
    "peternakan ayam",
    "ayam petelur",
    "ayam pedaging",
    "ayam broiler",
    "broiler",
    "kandang ayam",
    "ayam kampung",
    "peternakan sapi",
    "sapi perah",
    "sapi potong",
    "penggemukan sapi",
    "feedlot",
    "ternak domba",
    "peternakan kambing",
    "ternak bebek",
    "peternakan bebek",
    "itik",
    "burung puyuh",
    "ternak puyuh",
    "ternak kelinci",
    "ternak babi",
    "peternakan babi",
    "ternak kerbau",
    "peternakan kuda",
    "pembibitan ayam",
    "hatchery ayam",
    "penetasan telur",
    "breeding farm",
    "kandang ternak",
    "peternakan unggas",
    "ternak unggas",
    "peternakan telur",
    "ternak burung",
    "peternakan domba",
    "peternakan susu"
   ],
   "removed_v0_3": []
  },
  {
   "id": "G1-020",
   "group": 1,
   "risk_label": "Sangat rendah",
   "jkk_rate": 0.0024,
   "jkk_percent": "0.24%",
   "official_name": "Industri kreatif (animasi, desain grafis, arsitektur, dan lain-lain)",
   "sectors": [
    "kantor_keuangan"
   ],
   "activity": [
    "jasa"
   ],
   "aliases": [
    "animasi",
    "desain grafis",
    "graphic design",
    "studio desain",
    "arsitektur",
    "creative agency",
    "industri kreatif",
    "ekonomi kreatif",
    "agensi kreatif",
    "agency kreatif",
    "agensi digital",
    "digital agency",
    "advertising",
    "periklanan",
    "agensi iklan",
    "biro iklan",
    "advertising agency",
    "desain interior",
    "interior design",
    "desainer interior",
    "konsultan arsitek",
    "biro arsitek",
    "arsitek",
    "studio arsitek",
    "software house",
    "pengembang software",
    "pengembang aplikasi",
    "developer aplikasi",
    "web developer",
    "pembuatan website",
    "jasa website",
    "pembuatan aplikasi",
    "game developer",
    "pengembang game",
    "studio game",
    "digital marketing",
    "social media agency",
    "branding",
    "konsultan branding",
    "desain produk",
    "fashion designer",
    "studio animasi",
    "multimedia"
   ],
   "aliases_inferred": [
    "startup",
    "start up",
    "perusahaan teknologi",
    "teknologi informasi",
    "jasa it",
    "perusahaan it",
    "media online",
    "portal berita",
    "media digital",
    "kantor berita",
    "studio rekaman",
    "manajemen artis",
    "data center"
   ],
   "negative_terms": [],
   "ambiguity_tags": [
    "creative_vs_professional_service"
   ],
   "needs_confirmation": false,
   "source": {
    "regulation": "PP 82 Tahun 2019",
    "attachment": "Lampiran I",
    "title": "Pembagian Kelompok Tingkat Risiko Lingkungan Kerja"
   },
   "alias_review_status": "draft_v0_3",
   "added_v0_3": [
    "industri kreatif",
    "ekonomi kreatif",
    "agensi kreatif",
    "agency kreatif",
    "agensi digital",
    "digital agency",
    "advertising",
    "periklanan",
    "agensi iklan",
    "biro iklan",
    "advertising agency",
    "desain interior",
    "interior design",
    "desainer interior",
    "konsultan arsitek",
    "biro arsitek",
    "arsitek",
    "studio arsitek",
    "software house",
    "pengembang software",
    "pengembang aplikasi",
    "developer aplikasi",
    "web developer",
    "pembuatan website",
    "jasa website",
    "pembuatan aplikasi",
    "game developer",
    "pengembang game",
    "studio game",
    "digital marketing",
    "social media agency",
    "branding",
    "konsultan branding",
    "desain produk",
    "fashion designer",
    "studio animasi",
    "multimedia"
   ],
   "removed_v0_3": []
  },
  {
   "id": "G1-021",
   "group": 1,
   "risk_label": "Sangat rendah",
   "jkk_rate": 0.0024,
   "jkk_percent": "0.24%",
   "official_name": "Jasa profesi (dokter, pengacara, akuntan, konsultan, dan lain-lain)",
   "sectors": [
    "kantor_keuangan"
   ],
   "activity": [
    "jasa"
   ],
   "aliases": [
    "dokter",
    "pengacara",
    "akuntan",
    "konsultan",
    "kantor konsultan",
    "jasa profesional",
    "jasa profesi",
    "profesional",
    "kantor hukum",
    "law firm",
    "advokat",
    "kantor advokat",
    "lawyer",
    "notaris",
    "ppat",
    "kantor notaris",
    "kantor akuntan publik",
    "kap",
    "akuntan publik",
    "konsultan pajak",
    "kantor konsultan pajak",
    "jasa pembukuan",
    "pembukuan",
    "jasa akuntansi",
    "auditor",
    "konsultan manajemen",
    "konsultan bisnis",
    "konsultan hukum",
    "konsultan it",
    "konsultan teknik",
    "konsultan sdm",
    "hr consultant",
    "konsultan keuangan",
    "perencana keuangan",
    "psikolog",
    "biro psikologi",
    "penerjemah",
    "jasa penerjemah",
    "translator",
    "penilai publik",
    "appraisal",
    "kjpp",
    "aktuaria",
    "konsultan lingkungan",
    "konsultan amdal",
    "surveyor",
    "jasa survei tanah"
   ],
   "aliases_inferred": [
    "biro jasa",
    "jasa pengurusan izin",
    "jasa pengurusan dokumen",
    "konsultan konstruksi",
    "konsultan perencana",
    "konsultan pengawas",
    "headhunter",
    "konsultan rekrutmen"
   ],
   "negative_terms": [],
   "ambiguity_tags": [
    "creative_vs_professional_service"
   ],
   "needs_confirmation": false,
   "source": {
    "regulation": "PP 82 Tahun 2019",
    "attachment": "Lampiran I",
    "title": "Pembagian Kelompok Tingkat Risiko Lingkungan Kerja"
   },
   "alias_review_status": "draft_v0_3",
   "added_v0_3": [
    "jasa profesi",
    "profesional",
    "kantor hukum",
    "law firm",
    "advokat",
    "kantor advokat",
    "lawyer",
    "notaris",
    "ppat",
    "kantor notaris",
    "kantor akuntan publik",
    "kap",
    "akuntan publik",
    "konsultan pajak",
    "kantor konsultan pajak",
    "jasa pembukuan",
    "pembukuan",
    "jasa akuntansi",
    "auditor",
    "konsultan manajemen",
    "konsultan bisnis",
    "konsultan hukum",
    "konsultan it",
    "konsultan teknik",
    "konsultan sdm",
    "hr consultant",
    "konsultan keuangan",
    "perencana keuangan",
    "psikolog",
    "biro psikologi",
    "penerjemah",
    "jasa penerjemah",
    "translator",
    "penilai publik",
    "appraisal",
    "kjpp",
    "aktuaria",
    "konsultan lingkungan",
    "konsultan amdal",
    "surveyor",
    "jasa survei tanah"
   ],
   "removed_v0_3": []
  },
  {
   "id": "G1-022",
   "group": 1,
   "risk_label": "Sangat rendah",
   "jkk_rate": 0.0024,
   "jkk_percent": "0.24%",
   "official_name": "Reparasi arloji dan lonceng",
   "sectors": [
    "bengkel_reparasi"
   ],
   "activity": [
    "reparasi"
   ],
   "aliases": [
    "servis jam",
    "reparasi jam",
    "tukang jam",
    "servis jam tangan",
    "perbaikan jam",
    "reparasi arloji",
    "servis arloji",
    "jam tangan servis",
    "ganti baterai jam",
    "reparasi lonceng"
   ],
   "aliases_inferred": [],
   "negative_terms": [
    "pabrik",
    "produksi"
   ],
   "ambiguity_tags": [],
   "needs_confirmation": false,
   "source": {
    "regulation": "PP 82 Tahun 2019",
    "attachment": "Lampiran I",
    "title": "Pembagian Kelompok Tingkat Risiko Lingkungan Kerja"
   },
   "alias_review_status": "draft_v0_3",
   "added_v0_3": [
    "servis jam",
    "reparasi jam",
    "tukang jam",
    "servis jam tangan",
    "perbaikan jam",
    "reparasi arloji",
    "servis arloji",
    "jam tangan servis",
    "ganti baterai jam",
    "reparasi lonceng"
   ],
   "removed_v0_3": []
  },
  {
   "id": "G1-023",
   "group": 1,
   "risk_label": "Sangat rendah",
   "jkk_rate": 0.0024,
   "jkk_percent": "0.24%",
   "official_name": "Bioskop",
   "sectors": [
    "hiburan_media"
   ],
   "activity": [
    "jasa"
   ],
   "aliases": [
    "bioskop",
    "cinema",
    "gedung bioskop",
    "cineplex",
    "bioskop mini",
    "pemutaran film",
    "teater film",
    "layar lebar"
   ],
   "aliases_inferred": [],
   "negative_terms": [
    "produksi",
    "pembuatan"
   ],
   "ambiguity_tags": [],
   "needs_confirmation": false,
   "source": {
    "regulation": "PP 82 Tahun 2019",
    "attachment": "Lampiran I",
    "title": "Pembagian Kelompok Tingkat Risiko Lingkungan Kerja"
   },
   "alias_review_status": "draft_v0_3",
   "added_v0_3": [
    "gedung bioskop",
    "cineplex",
    "bioskop mini",
    "pemutaran film",
    "teater film",
    "layar lebar"
   ],
   "removed_v0_3": []
  },
  {
   "id": "G2-001",
   "group": 2,
   "risk_label": "Rendah",
   "jkk_rate": 0.0054,
   "jkk_percent": "0.54%",
   "official_name": "Pertanian rakyat",
   "sectors": [
    "pertanian"
   ],
   "activity": [
    "budidaya"
   ],
   "aliases": [
    "petani",
    "pertanian",
    "sawah",
    "usaha tani",
    "tani",
    "bertani",
    "bercocok tanam",
    "pertanian padi",
    "petani padi",
    "persawahan",
    "palawija",
    "petani jagung",
    "kebun jagung",
    "kedelai",
    "singkong",
    "ubi",
    "budidaya sayur",
    "sayuran",
    "hortikultura",
    "kebun sayur",
    "petani sayur",
    "cabai",
    "cabe",
    "bawang merah",
    "tomat",
    "melon",
    "semangka",
    "hidroponik",
    "greenhouse",
    "pembibitan tanaman",
    "nursery tanaman",
    "tanaman hias",
    "budidaya bunga",
    "budidaya jamur",
    "jamur tiram",
    "kelompok tani",
    "gapoktan",
    "poktan",
    "agribisnis",
    "kebun anggur",
    "kebun strawberry",
    "tanam padi"
   ],
   "aliases_inferred": [],
   "negative_terms": [
    "pabrik",
    "penggilingan",
    "perkebunan"
   ],
   "ambiguity_tags": [],
   "needs_confirmation": false,
   "source": {
    "regulation": "PP 82 Tahun 2019",
    "attachment": "Lampiran I",
    "title": "Pembagian Kelompok Tingkat Risiko Lingkungan Kerja"
   },
   "alias_review_status": "draft_v0_3",
   "added_v0_3": [
    "tani",
    "bertani",
    "bercocok tanam",
    "pertanian padi",
    "petani padi",
    "persawahan",
    "palawija",
    "petani jagung",
    "kebun jagung",
    "kedelai",
    "singkong",
    "ubi",
    "budidaya sayur",
    "sayuran",
    "hortikultura",
    "kebun sayur",
    "petani sayur",
    "cabai",
    "cabe",
    "bawang merah",
    "tomat",
    "melon",
    "semangka",
    "hidroponik",
    "greenhouse",
    "pembibitan tanaman",
    "nursery tanaman",
    "tanaman hias",
    "budidaya bunga",
    "budidaya jamur",
    "jamur tiram",
    "kelompok tani",
    "gapoktan",
    "poktan",
    "agribisnis",
    "kebun anggur",
    "kebun strawberry",
    "tanam padi"
   ],
   "removed_v0_3": []
  },
  {
   "id": "G2-002",
   "group": 2,
   "risk_label": "Rendah",
   "jkk_rate": 0.0054,
   "jkk_percent": "0.54%",
   "official_name": "Perkebunan gula",
   "sectors": [
    "pertanian"
   ],
   "activity": [
    "budidaya"
   ],
   "aliases": [
    "perkebunan tebu",
    "kebun tebu",
    "tebu",
    "tanaman tebu",
    "petani tebu",
    "tebang tebu"
   ],
   "aliases_inferred": [],
   "negative_terms": [
    "pabrik",
    "gula pasir",
    "penggilingan"
   ],
   "ambiguity_tags": [],
   "needs_confirmation": false,
   "source": {
    "regulation": "PP 82 Tahun 2019",
    "attachment": "Lampiran I",
    "title": "Pembagian Kelompok Tingkat Risiko Lingkungan Kerja"
   },
   "alias_review_status": "draft_v0_3",
   "added_v0_3": [
    "perkebunan tebu",
    "kebun tebu",
    "tebu",
    "tanaman tebu",
    "petani tebu",
    "tebang tebu"
   ],
   "removed_v0_3": []
  },
  {
   "id": "G2-003",
   "group": 2,
   "risk_label": "Rendah",
   "jkk_rate": 0.0054,
   "jkk_percent": "0.54%",
   "official_name": "Perkebunan tembakau",
   "sectors": [
    "pertanian"
   ],
   "activity": [
    "budidaya"
   ],
   "aliases": [
    "kebun tembakau",
    "petani tembakau",
    "tanam tembakau",
    "budidaya tembakau"
   ],
   "aliases_inferred": [],
   "negative_terms": [
    "pabrik",
    "rokok",
    "gudang"
   ],
   "ambiguity_tags": [],
   "needs_confirmation": false,
   "source": {
    "regulation": "PP 82 Tahun 2019",
    "attachment": "Lampiran I",
    "title": "Pembagian Kelompok Tingkat Risiko Lingkungan Kerja"
   },
   "alias_review_status": "draft_v0_3",
   "added_v0_3": [
    "kebun tembakau",
    "petani tembakau",
    "tanam tembakau",
    "budidaya tembakau"
   ],
   "removed_v0_3": []
  },
  {
   "id": "G2-004",
   "group": 2,
   "risk_label": "Rendah",
   "jkk_rate": 0.0054,
   "jkk_percent": "0.54%",
   "official_name": "Perkebunan bukan tahunan, terkecuali gula dan tembakau",
   "sectors": [
    "pertanian"
   ],
   "activity": [
    "budidaya"
   ],
   "aliases": [
    "perkebunan semusim",
    "tanaman semusim",
    "perkebunan nilam",
    "kebun nilam",
    "nilam",
    "serai wangi",
    "kebun serai",
    "kapas",
    "kebun kapas",
    "rami",
    "rosella"
   ],
   "aliases_inferred": [
    "perkebunan nanas",
    "kebun nanas",
    "perkebunan jagung",
    "perkebunan singkong"
   ],
   "negative_terms": [
    "penyulingan",
    "minyak atsiri",
    "pabrik"
   ],
   "ambiguity_tags": [],
   "needs_confirmation": false,
   "source": {
    "regulation": "PP 82 Tahun 2019",
    "attachment": "Lampiran I",
    "title": "Pembagian Kelompok Tingkat Risiko Lingkungan Kerja"
   },
   "alias_review_status": "draft_v0_3",
   "added_v0_3": [
    "perkebunan semusim",
    "tanaman semusim",
    "perkebunan nilam",
    "kebun nilam",
    "nilam",
    "serai wangi",
    "kebun serai",
    "kapas",
    "kebun kapas",
    "rami",
    "rosella"
   ],
   "removed_v0_3": []
  },
  {
   "id": "G2-005",
   "group": 2,
   "risk_label": "Rendah",
   "jkk_rate": 0.0054,
   "jkk_percent": "0.54%",
   "official_name": "Perkebunan tahunan seperti karet, coklat, kelapa, dan lain-lain",
   "sectors": [
    "pertanian"
   ],
   "activity": [
    "budidaya"
   ],
   "aliases": [
    "kebun karet",
    "kebun coklat",
    "kebun kakao",
    "kebun kelapa",
    "perkebunan tahunan",
    "perkebunan",
    "kelapa sawit",
    "kebun sawit",
    "perkebunan sawit",
    "perkebunan kelapa sawit",
    "petani sawit",
    "kebun plasma",
    "plasma sawit",
    "inti plasma",
    "perkebunan karet",
    "kebun karet rakyat",
    "penyadap karet",
    "penderes karet",
    "kakao",
    "perkebunan kakao",
    "kebun kopi",
    "perkebunan kopi",
    "petani kopi",
    "kebun teh",
    "perkebunan teh",
    "cengkeh",
    "kebun cengkeh",
    "pala",
    "kebun pala",
    "lada",
    "merica",
    "vanili",
    "kayu manis",
    "kemiri",
    "kebun kemiri",
    "pinang",
    "jambu mete",
    "kebun mete",
    "perkebunan kelapa",
    "kebun durian",
    "kebun mangga",
    "kebun alpukat",
    "kebun jeruk",
    "kebun buah",
    "kebun kurma",
    "afdeling",
    "estate perkebunan"
   ],
   "aliases_inferred": [],
   "negative_terms": [
    "pabrik",
    "pengolahan",
    "pks",
    "cpo",
    "kedai",
    "roasting",
    "sangrai"
   ],
   "ambiguity_tags": [],
   "needs_confirmation": false,
   "source": {
    "regulation": "PP 82 Tahun 2019",
    "attachment": "Lampiran I",
    "title": "Pembagian Kelompok Tingkat Risiko Lingkungan Kerja"
   },
   "alias_review_status": "draft_v0_3",
   "added_v0_3": [
    "perkebunan",
    "kelapa sawit",
    "kebun sawit",
    "perkebunan sawit",
    "perkebunan kelapa sawit",
    "petani sawit",
    "kebun plasma",
    "plasma sawit",
    "inti plasma",
    "perkebunan karet",
    "kebun karet rakyat",
    "penyadap karet",
    "penderes karet",
    "kakao",
    "perkebunan kakao",
    "kebun kopi",
    "perkebunan kopi",
    "petani kopi",
    "kebun teh",
    "perkebunan teh",
    "cengkeh",
    "kebun cengkeh",
    "pala",
    "kebun pala",
    "lada",
    "merica",
    "vanili",
    "kayu manis",
    "kemiri",
    "kebun kemiri",
    "pinang",
    "jambu mete",
    "kebun mete",
    "perkebunan kelapa",
    "kebun durian",
    "kebun mangga",
    "kebun alpukat",
    "kebun jeruk",
    "kebun buah",
    "kebun kurma",
    "afdeling",
    "estate perkebunan"
   ],
   "removed_v0_3": []
  },
  {
   "id": "G2-006",
   "group": 2,
   "risk_label": "Rendah",
   "jkk_rate": 0.0054,
   "jkk_percent": "0.54%",
   "official_name": "Pabrik teh",
   "sectors": [
    "industri_makanan"
   ],
   "activity": [
    "produksi"
   ],
   "aliases": [
    "pengolahan teh",
    "produksi teh",
    "teh celup",
    "teh hitam",
    "teh hijau",
    "industri teh",
    "pengolahan pucuk teh",
    "teh kering"
   ],
   "aliases_inferred": [],
   "negative_terms": [
    "kebun",
    "perkebunan",
    "kedai",
    "cafe",
    "teh botol",
    "minuman"
   ],
   "ambiguity_tags": [],
   "needs_confirmation": false,
   "source": {
    "regulation": "PP 82 Tahun 2019",
    "attachment": "Lampiran I",
    "title": "Pembagian Kelompok Tingkat Risiko Lingkungan Kerja"
   },
   "alias_review_status": "draft_v0_3",
   "added_v0_3": [
    "pengolahan teh",
    "produksi teh",
    "teh celup",
    "teh hitam",
    "teh hijau",
    "industri teh",
    "pengolahan pucuk teh",
    "teh kering"
   ],
   "removed_v0_3": []
  },
  {
   "id": "G2-007",
   "group": 2,
   "risk_label": "Rendah",
   "jkk_rate": 0.0054,
   "jkk_percent": "0.54%",
   "official_name": "Penggorengan dan pembuatan kopi bubuk",
   "sectors": [
    "industri_makanan"
   ],
   "activity": [
    "produksi"
   ],
   "aliases": [
    "kopi bubuk",
    "bubuk kopi",
    "sangrai kopi",
    "roasting kopi",
    "roastery",
    "roaster kopi",
    "coffee roaster",
    "penggorengan kopi",
    "pabrik kopi",
    "produksi kopi",
    "kopi kemasan",
    "kopi sachet",
    "pengolahan kopi",
    "pengolahan biji kopi",
    "huller kopi",
    "industri kopi"
   ],
   "aliases_inferred": [],
   "negative_terms": [
    "kedai",
    "cafe",
    "warung",
    "warkop",
    "kopi shop",
    "kebun",
    "perkebunan"
   ],
   "ambiguity_tags": [],
   "needs_confirmation": false,
   "source": {
    "regulation": "PP 82 Tahun 2019",
    "attachment": "Lampiran I",
    "title": "Pembagian Kelompok Tingkat Risiko Lingkungan Kerja"
   },
   "alias_review_status": "draft_v0_3",
   "added_v0_3": [
    "kopi bubuk",
    "bubuk kopi",
    "sangrai kopi",
    "roasting kopi",
    "roastery",
    "roaster kopi",
    "coffee roaster",
    "penggorengan kopi",
    "pabrik kopi",
    "produksi kopi",
    "kopi kemasan",
    "kopi sachet",
    "pengolahan kopi",
    "pengolahan biji kopi",
    "huller kopi",
    "industri kopi"
   ],
   "removed_v0_3": []
  },
  {
   "id": "G2-008",
   "group": 2,
   "risk_label": "Rendah",
   "jkk_rate": 0.0054,
   "jkk_percent": "0.54%",
   "official_name": "Pabrik rokok (sigaret, cerutu, kretek, dan lain-lain)",
   "sectors": [
    "industri_makanan"
   ],
   "activity": [
    "produksi"
   ],
   "aliases": [
    "rokok",
    "pabrik rokok",
    "sigaret",
    "cerutu",
    "kretek",
    "rokok kretek",
    "sigaret kretek tangan",
    "skt",
    "skm",
    "linting rokok",
    "pelinting",
    "industri hasil tembakau",
    "iht",
    "rokok filter",
    "rokok putih"
   ],
   "aliases_inferred": [],
   "negative_terms": [
    "warung"
   ],
   "ambiguity_tags": [],
   "needs_confirmation": false,
   "source": {
    "regulation": "PP 82 Tahun 2019",
    "attachment": "Lampiran I",
    "title": "Pembagian Kelompok Tingkat Risiko Lingkungan Kerja"
   },
   "alias_review_status": "draft_v0_3",
   "added_v0_3": [
    "rokok",
    "pabrik rokok",
    "sigaret",
    "cerutu",
    "kretek",
    "rokok kretek",
    "sigaret kretek tangan",
    "skt",
    "skm",
    "linting rokok",
    "pelinting",
    "industri hasil tembakau",
    "iht",
    "rokok filter",
    "rokok putih"
   ],
   "removed_v0_3": []
  },
  {
   "id": "G2-009",
   "group": 2,
   "risk_label": "Rendah",
   "jkk_rate": 0.0054,
   "jkk_percent": "0.54%",
   "official_name": "Perusahaan tembakau lainnya",
   "sectors": [
    "industri_makanan"
   ],
   "activity": [
    "produksi"
   ],
   "aliases": [
    "pengolahan tembakau",
    "gudang tembakau",
    "perajangan tembakau",
    "tembakau iris",
    "tembakau rajang",
    "krosok",
    "pengeringan tembakau",
    "tembakau"
   ],
   "aliases_inferred": [
    "hptl",
    "liquid vape",
    "e liquid",
    "vape liquid",
    "pabrik liquid"
   ],
   "negative_terms": [
    "kebun",
    "perkebunan",
    "tanam"
   ],
   "ambiguity_tags": [],
   "needs_confirmation": false,
   "source": {
    "regulation": "PP 82 Tahun 2019",
    "attachment": "Lampiran I",
    "title": "Pembagian Kelompok Tingkat Risiko Lingkungan Kerja"
   },
   "alias_review_status": "draft_v0_3",
   "added_v0_3": [
    "pengolahan tembakau",
    "gudang tembakau",
    "perajangan tembakau",
    "tembakau iris",
    "tembakau rajang",
    "krosok",
    "pengeringan tembakau",
    "tembakau"
   ],
   "removed_v0_3": []
  },
  {
   "id": "G2-010",
   "group": 2,
   "risk_label": "Rendah",
   "jkk_rate": 0.0054,
   "jkk_percent": "0.54%",
   "official_name": "Pabrik kina",
   "sectors": [
    "industri_kimia"
   ],
   "activity": [
    "produksi"
   ],
   "aliases": [
    "kina",
    "pabrik kina",
    "kinine",
    "quinine",
    "kulit kina"
   ],
   "aliases_inferred": [],
   "negative_terms": [],
   "ambiguity_tags": [],
   "needs_confirmation": false,
   "source": {
    "regulation": "PP 82 Tahun 2019",
    "attachment": "Lampiran I",
    "title": "Pembagian Kelompok Tingkat Risiko Lingkungan Kerja"
   },
   "alias_review_status": "draft_v0_3",
   "added_v0_3": [
    "kina",
    "pabrik kina",
    "kinine",
    "quinine",
    "kulit kina"
   ],
   "removed_v0_3": []
  },
  {
   "id": "G2-011",
   "group": 2,
   "risk_label": "Rendah",
   "jkk_rate": 0.0054,
   "jkk_percent": "0.54%",
   "official_name": "Pabrik alat pengangkutan lainnya",
   "sectors": [
    "industri_logam"
   ],
   "activity": [
    "produksi"
   ],
   "aliases": [
    "pabrik sepeda",
    "perakitan sepeda",
    "pembuatan sepeda",
    "pembuatan becak",
    "gerobak",
    "pembuatan gerobak",
    "gerobak dorong",
    "troli",
    "kereta dorong",
    "kursi roda",
    "alat angkut"
   ],
   "aliases_inferred": [
    "perakitan sepeda listrik",
    "skuter listrik produksi"
   ],
   "negative_terms": [
    "servis",
    "reparasi",
    "bengkel"
   ],
   "ambiguity_tags": [],
   "needs_confirmation": false,
   "source": {
    "regulation": "PP 82 Tahun 2019",
    "attachment": "Lampiran I",
    "title": "Pembagian Kelompok Tingkat Risiko Lingkungan Kerja"
   },
   "alias_review_status": "draft_v0_3",
   "added_v0_3": [
    "pabrik sepeda",
    "perakitan sepeda",
    "pembuatan sepeda",
    "pembuatan becak",
    "gerobak",
    "pembuatan gerobak",
    "gerobak dorong",
    "troli",
    "kereta dorong",
    "kursi roda",
    "alat angkut"
   ],
   "removed_v0_3": []
  },
  {
   "id": "G2-012",
   "group": 2,
   "risk_label": "Rendah",
   "jkk_rate": 0.0054,
   "jkk_percent": "0.54%",
   "official_name": "Industri alat pekerjaan, pengetahuan, pengukuran, dan pemeriksaan laboratorium",
   "sectors": [
    "industri_logam"
   ],
   "activity": [
    "produksi"
   ],
   "aliases": [
    "alat laboratorium",
    "alat ukur",
    "alat pengukur",
    "alat peraga",
    "alat peraga pendidikan",
    "instrumen",
    "instrumen laboratorium",
    "alat survei",
    "alat teknik",
    "perkakas",
    "alat pertukangan",
    "pabrik perkakas"
   ],
   "aliases_inferred": [
    "pabrik alat kesehatan",
    "produksi alat kesehatan",
    "alkes produksi"
   ],
   "negative_terms": [],
   "ambiguity_tags": [],
   "needs_confirmation": false,
   "source": {
    "regulation": "PP 82 Tahun 2019",
    "attachment": "Lampiran I",
    "title": "Pembagian Kelompok Tingkat Risiko Lingkungan Kerja"
   },
   "alias_review_status": "draft_v0_3",
   "added_v0_3": [
    "alat laboratorium",
    "alat ukur",
    "alat pengukur",
    "alat peraga",
    "alat peraga pendidikan",
    "instrumen",
    "instrumen laboratorium",
    "alat survei",
    "alat teknik",
    "perkakas",
    "alat pertukangan",
    "pabrik perkakas"
   ],
   "removed_v0_3": []
  },
  {
   "id": "G2-013",
   "group": 2,
   "risk_label": "Rendah",
   "jkk_rate": 0.0054,
   "jkk_percent": "0.54%",
   "official_name": "Industri alat musik",
   "sectors": [
    "industri_lainnya"
   ],
   "activity": [
    "produksi"
   ],
   "aliases": [
    "alat musik",
    "pembuatan alat musik",
    "pabrik gitar",
    "pembuatan gitar",
    "gamelan",
    "pengrajin gamelan",
    "angklung",
    "pembuatan angklung",
    "piano",
    "drum",
    "biola",
    "luthier",
    "kerajinan alat musik"
   ],
   "aliases_inferred": [],
   "negative_terms": [
    "kursus",
    "les",
    "band",
    "sewa"
   ],
   "ambiguity_tags": [],
   "needs_confirmation": false,
   "source": {
    "regulation": "PP 82 Tahun 2019",
    "attachment": "Lampiran I",
    "title": "Pembagian Kelompok Tingkat Risiko Lingkungan Kerja"
   },
   "alias_review_status": "draft_v0_3",
   "added_v0_3": [
    "alat musik",
    "pembuatan alat musik",
    "pabrik gitar",
    "pembuatan gitar",
    "gamelan",
    "pengrajin gamelan",
    "angklung",
    "pembuatan angklung",
    "piano",
    "drum",
    "biola",
    "luthier",
    "kerajinan alat musik"
   ],
   "removed_v0_3": []
  },
  {
   "id": "G2-014",
   "group": 2,
   "risk_label": "Rendah",
   "jkk_rate": 0.0054,
   "jkk_percent": "0.54%",
   "official_name": "Pabrik alat olahraga",
   "sectors": [
    "industri_lainnya"
   ],
   "activity": [
    "produksi"
   ],
   "aliases": [
    "alat olahraga",
    "peralatan olahraga",
    "pabrik bola",
    "produksi bola",
    "raket",
    "shuttlecock",
    "kok bulu tangkis",
    "matras",
    "alat fitness produksi",
    "sarung tinju"
   ],
   "aliases_inferred": [],
   "negative_terms": [
    "gym",
    "fitness",
    "lapangan"
   ],
   "ambiguity_tags": [],
   "needs_confirmation": false,
   "source": {
    "regulation": "PP 82 Tahun 2019",
    "attachment": "Lampiran I",
    "title": "Pembagian Kelompok Tingkat Risiko Lingkungan Kerja"
   },
   "alias_review_status": "draft_v0_3",
   "added_v0_3": [
    "alat olahraga",
    "peralatan olahraga",
    "pabrik bola",
    "produksi bola",
    "raket",
    "shuttlecock",
    "kok bulu tangkis",
    "matras",
    "alat fitness produksi",
    "sarung tinju"
   ],
   "removed_v0_3": []
  },
  {
   "id": "G2-015",
   "group": 2,
   "risk_label": "Rendah",
   "jkk_rate": 0.0054,
   "jkk_percent": "0.54%",
   "official_name": "Pabrik mainan anak",
   "sectors": [
    "industri_lainnya"
   ],
   "activity": [
    "produksi"
   ],
   "aliases": [
    "mainan",
    "mainan anak",
    "pabrik mainan",
    "produksi mainan",
    "boneka",
    "pembuatan boneka",
    "mainan kayu",
    "mainan edukasi",
    "puzzle"
   ],
   "aliases_inferred": [],
   "negative_terms": [
    "rental"
   ],
   "ambiguity_tags": [],
   "needs_confirmation": false,
   "source": {
    "regulation": "PP 82 Tahun 2019",
    "attachment": "Lampiran I",
    "title": "Pembagian Kelompok Tingkat Risiko Lingkungan Kerja"
   },
   "alias_review_status": "draft_v0_3",
   "added_v0_3": [
    "mainan",
    "mainan anak",
    "pabrik mainan",
    "produksi mainan",
    "boneka",
    "pembuatan boneka",
    "mainan kayu",
    "mainan edukasi",
    "puzzle"
   ],
   "removed_v0_3": []
  },
  {
   "id": "G2-016",
   "group": 2,
   "risk_label": "Rendah",
   "jkk_rate": 0.0054,
   "jkk_percent": "0.54%",
   "official_name": "Perdagangan barang tak bergerak (penyewaan alat, tanah, rumah, garasi, dan lain-lain)",
   "sectors": [
    "kuliner_properti"
   ],
   "activity": [
    "properti"
   ],
   "aliases": [
    "sewa rumah",
    "kontrakan",
    "sewa tanah",
    "sewa garasi",
    "persewaan alat",
    "rental alat",
    "properti sewa",
    "properti",
    "real estate",
    "realestat",
    "agen properti",
    "broker properti",
    "makelar properti",
    "makelar tanah",
    "jual beli tanah",
    "jual beli rumah",
    "developer properti",
    "pengelola apartemen",
    "pengelola gedung",
    "sewa gedung",
    "sewa ruko",
    "sewa kantor",
    "coworking space",
    "sewa alat berat",
    "rental alat berat",
    "sewa scaffolding",
    "rental genset",
    "sewa genset",
    "sewa tenda",
    "rental tenda",
    "persewaan tenda",
    "sewa alat pesta",
    "rental alat pesta",
    "sewa sound system",
    "rental sound",
    "persewaan",
    "rental mobil lepas kunci",
    "sewa mobil lepas kunci",
    "sewa lahan",
    "sewa kios",
    "pengelola pasar",
    "pengelola ruko",
    "penyewaan properti",
    "penyewaan alat",
    "rental kamera",
    "sewa kamera",
    "sewa baju pengantin",
    "rental kostum"
   ],
   "aliases_inferred": [
    "developer perumahan",
    "pengembang perumahan",
    "parkir",
    "jasa parkir",
    "pengelola parkir",
    "lahan parkir",
    "pengelola mall",
    "pusat perbelanjaan"
   ],
   "negative_terms": [
    "hotel",
    "penginapan",
    "guest house",
    "homestay"
   ],
   "ambiguity_tags": [
    "property_rental_vs_accommodation"
   ],
   "needs_confirmation": false,
   "source": {
    "regulation": "PP 82 Tahun 2019",
    "attachment": "Lampiran I",
    "title": "Pembagian Kelompok Tingkat Risiko Lingkungan Kerja"
   },
   "alias_review_status": "draft_v0_3",
   "added_v0_3": [
    "properti",
    "real estate",
    "realestat",
    "agen properti",
    "broker properti",
    "makelar properti",
    "makelar tanah",
    "jual beli tanah",
    "jual beli rumah",
    "developer properti",
    "pengelola apartemen",
    "pengelola gedung",
    "sewa gedung",
    "sewa ruko",
    "sewa kantor",
    "coworking space",
    "sewa alat berat",
    "rental alat berat",
    "sewa scaffolding",
    "rental genset",
    "sewa genset",
    "sewa tenda",
    "rental tenda",
    "persewaan tenda",
    "sewa alat pesta",
    "rental alat pesta",
    "sewa sound system",
    "rental sound",
    "persewaan",
    "rental mobil lepas kunci",
    "sewa mobil lepas kunci",
    "sewa lahan",
    "sewa kios",
    "pengelola pasar",
    "pengelola ruko",
    "penyewaan properti",
    "penyewaan alat",
    "rental kamera",
    "sewa kamera",
    "sewa baju pengantin",
    "rental kostum"
   ],
   "removed_v0_3": []
  },
  {
   "id": "G2-017",
   "group": 2,
   "risk_label": "Rendah",
   "jkk_rate": 0.0054,
   "jkk_percent": "0.54%",
   "official_name": "Jasa perhubungan seperti handy talky dan radio",
   "sectors": [
    "hiburan_media"
   ],
   "activity": [
    "jasa"
   ],
   "aliases": [
    "handy talky",
    "radio komunikasi",
    "radio panggil",
    "jasa komunikasi",
    "komunikasi radio",
    "perhubungan radio"
   ],
   "aliases_inferred": [
    "telekomunikasi",
    "jasa telekomunikasi",
    "isp",
    "internet service provider",
    "provider internet",
    "penyedia internet",
    "jasa internet",
    "wifi",
    "rt rw net",
    "jaringan internet",
    "menara telekomunikasi",
    "tower bts",
    "satelit",
    "vsat",
    "operator seluler"
   ],
   "negative_terms": [],
   "ambiguity_tags": [],
   "needs_confirmation": false,
   "source": {
    "regulation": "PP 82 Tahun 2019",
    "attachment": "Lampiran I",
    "title": "Pembagian Kelompok Tingkat Risiko Lingkungan Kerja"
   },
   "alias_review_status": "draft_v0_3",
   "added_v0_3": [
    "handy talky",
    "radio komunikasi",
    "radio panggil",
    "jasa komunikasi",
    "komunikasi radio",
    "perhubungan radio"
   ],
   "removed_v0_3": []
  },
  {
   "id": "G2-018",
   "group": 2,
   "risk_label": "Rendah",
   "jkk_rate": 0.0054,
   "jkk_percent": "0.54%",
   "official_name": "Perusahaan pembuatan film dan pengedar film",
   "sectors": [
    "hiburan_media"
   ],
   "activity": [
    "jasa"
   ],
   "aliases": [
    "rumah produksi film",
    "production house",
    "PH film",
    "distributor film",
    "produksi film",
    "pembuatan film",
    "film",
    "rumah produksi",
    "ph",
    "sinematografi",
    "pembuatan video",
    "produksi video",
    "video production",
    "jasa video",
    "dokumenter",
    "sinetron",
    "web series",
    "post production",
    "editing video",
    "pengedar film",
    "distribusi film",
    "perfilman",
    "iklan video"
   ],
   "aliases_inferred": [],
   "negative_terms": [
    "bioskop"
   ],
   "ambiguity_tags": [],
   "needs_confirmation": false,
   "source": {
    "regulation": "PP 82 Tahun 2019",
    "attachment": "Lampiran I",
    "title": "Pembagian Kelompok Tingkat Risiko Lingkungan Kerja"
   },
   "alias_review_status": "draft_v0_3",
   "added_v0_3": [
    "produksi film",
    "pembuatan film",
    "film",
    "rumah produksi",
    "ph",
    "sinematografi",
    "pembuatan video",
    "produksi video",
    "video production",
    "jasa video",
    "dokumenter",
    "sinetron",
    "web series",
    "post production",
    "editing video",
    "pengedar film",
    "distribusi film",
    "perfilman",
    "iklan video"
   ],
   "removed_v0_3": []
  },
  {
   "id": "G2-019",
   "group": 2,
   "risk_label": "Rendah",
   "jkk_rate": 0.0054,
   "jkk_percent": "0.54%",
   "official_name": "Sandiwara, komedi, opera, sirkus, band, dan lain-lain",
   "sectors": [
    "hiburan_media"
   ],
   "activity": [
    "jasa"
   ],
   "aliases": [
    "sandiwara",
    "teater",
    "drama",
    "grup teater",
    "komedi",
    "opera",
    "sirkus",
    "band",
    "grup band",
    "orkestra",
    "orkes",
    "grup musik",
    "orkes dangdut",
    "orgen tunggal",
    "organ tunggal",
    "kesenian",
    "sanggar tari",
    "sanggar seni",
    "tari",
    "wayang",
    "dalang",
    "ketoprak",
    "ludruk",
    "reog",
    "kuda lumping",
    "jathilan",
    "barongsai",
    "marching band",
    "paduan suara",
    "pertunjukan seni",
    "seni pertunjukan",
    "akrobat",
    "sulap"
   ],
   "aliases_inferred": [
    "badut",
    "badut ulang tahun",
    "hiburan panggung",
    "home band"
   ],
   "negative_terms": [],
   "ambiguity_tags": [],
   "needs_confirmation": false,
   "source": {
    "regulation": "PP 82 Tahun 2019",
    "attachment": "Lampiran I",
    "title": "Pembagian Kelompok Tingkat Risiko Lingkungan Kerja"
   },
   "alias_review_status": "draft_v0_3",
   "added_v0_3": [
    "sandiwara",
    "teater",
    "drama",
    "grup teater",
    "komedi",
    "opera",
    "sirkus",
    "band",
    "grup band",
    "orkestra",
    "orkes",
    "grup musik",
    "orkes dangdut",
    "orgen tunggal",
    "organ tunggal",
    "kesenian",
    "sanggar tari",
    "sanggar seni",
    "tari",
    "wayang",
    "dalang",
    "ketoprak",
    "ludruk",
    "reog",
    "kuda lumping",
    "jathilan",
    "barongsai",
    "marching band",
    "paduan suara",
    "pertunjukan seni",
    "seni pertunjukan",
    "akrobat",
    "sulap"
   ],
   "removed_v0_3": []
  },
  {
   "id": "G2-020",
   "group": 2,
   "risk_label": "Rendah",
   "jkk_rate": 0.0054,
   "jkk_percent": "0.54%",
   "official_name": "Jasa hiburan selain sandiwara dan bioskop",
   "sectors": [
    "hiburan_media"
   ],
   "activity": [
    "jasa"
   ],
   "aliases": [
    "event hiburan",
    "jasa hiburan",
    "entertainment",
    "hiburan",
    "tempat hiburan",
    "karaoke",
    "rumah bernyanyi",
    "family karaoke",
    "diskotek",
    "klub malam",
    "night club",
    "lounge",
    "biliar",
    "bowling",
    "arena permainan",
    "game center",
    "playground",
    "taman bermain",
    "wahana",
    "taman rekreasi",
    "taman hiburan",
    "theme park",
    "waterpark",
    "water park",
    "outbound",
    "paintball",
    "go kart",
    "gokart",
    "trampoline park",
    "escape room"
   ],
   "aliases_inferred": [
    "kolam renang",
    "event organizer",
    "penyelenggara acara",
    "penyelenggara event",
    "organizer",
    "wedding organizer",
    "promotor musik",
    "promotor konser",
    "penyelenggara pameran",
    "konser",
    "objek wisata",
    "tempat wisata",
    "wisata",
    "agrowisata",
    "desa wisata",
    "wisata edukasi",
    "pengelola wisata",
    "gym",
    "fitness",
    "fitness center",
    "pusat kebugaran",
    "studio yoga",
    "yoga",
    "pilates",
    "studio senam",
    "senam",
    "sanggar senam",
    "lapangan futsal",
    "futsal",
    "lapangan badminton",
    "gor",
    "gelanggang olahraga",
    "mini soccer",
    "sport center",
    "lapangan golf",
    "driving range",
    "kolam pemancingan",
    "pemancingan",
    "rental ps",
    "warnet",
    "game online center",
    "esports arena",
    "wisata alam",
    "camping ground",
    "bumi perkemahan"
   ],
   "negative_terms": [
    "pabrik",
    "produksi"
   ],
   "ambiguity_tags": [],
   "needs_confirmation": false,
   "source": {
    "regulation": "PP 82 Tahun 2019",
    "attachment": "Lampiran I",
    "title": "Pembagian Kelompok Tingkat Risiko Lingkungan Kerja"
   },
   "alias_review_status": "draft_v0_3",
   "added_v0_3": [
    "hiburan",
    "tempat hiburan",
    "karaoke",
    "rumah bernyanyi",
    "family karaoke",
    "diskotek",
    "klub malam",
    "night club",
    "lounge",
    "biliar",
    "bowling",
    "arena permainan",
    "game center",
    "playground",
    "taman bermain",
    "wahana",
    "taman rekreasi",
    "taman hiburan",
    "theme park",
    "waterpark",
    "water park",
    "outbound",
    "paintball",
    "go kart",
    "gokart",
    "trampoline park",
    "escape room"
   ],
   "removed_v0_3": []
  },
  {
   "id": "G2-021",
   "group": 2,
   "risk_label": "Rendah",
   "jkk_rate": 0.0054,
   "jkk_percent": "0.54%",
   "official_name": "Perusahaan binatu, laundry",
   "sectors": [
    "jasa_perorangan"
   ],
   "activity": [
    "jasa"
   ],
   "aliases": [
    "laundry",
    "laundri",
    "binatu",
    "cuci pakaian",
    "laundry kiloan",
    "laundromat",
    "laundry koin",
    "self service laundry",
    "dry cleaning",
    "dry clean",
    "cuci setrika",
    "setrika",
    "jasa setrika",
    "cuci karpet",
    "laundry karpet",
    "cuci sepatu",
    "laundry sepatu",
    "shoes cleaning",
    "laundry hotel",
    "laundry rumah sakit",
    "laundry linen",
    "cuci kering",
    "penatu",
    "dobi",
    "cuci bed cover",
    "laundry satuan"
   ],
   "aliases_inferred": [],
   "negative_terms": [
    "mesin cuci",
    "servis"
   ],
   "ambiguity_tags": [],
   "needs_confirmation": false,
   "source": {
    "regulation": "PP 82 Tahun 2019",
    "attachment": "Lampiran I",
    "title": "Pembagian Kelompok Tingkat Risiko Lingkungan Kerja"
   },
   "alias_review_status": "draft_v0_3",
   "added_v0_3": [
    "laundromat",
    "laundry koin",
    "self service laundry",
    "dry cleaning",
    "dry clean",
    "cuci setrika",
    "setrika",
    "jasa setrika",
    "cuci karpet",
    "laundry karpet",
    "cuci sepatu",
    "laundry sepatu",
    "shoes cleaning",
    "laundry hotel",
    "laundry rumah sakit",
    "laundry linen",
    "cuci kering",
    "penatu",
    "dobi",
    "cuci bed cover",
    "laundry satuan"
   ],
   "removed_v0_3": []
  },
  {
   "id": "G2-022",
   "group": 2,
   "risk_label": "Rendah",
   "jkk_rate": 0.0054,
   "jkk_percent": "0.54%",
   "official_name": "Perusahaan potret/studio photo",
   "sectors": [
    "jasa_perorangan"
   ],
   "activity": [
    "jasa"
   ],
   "aliases": [
    "studio foto",
    "fotografer studio",
    "photo studio",
    "foto",
    "fotografi",
    "fotografer",
    "jasa foto",
    "jasa fotografi",
    "pas foto",
    "cetak foto",
    "photobooth",
    "photo booth",
    "foto wisuda",
    "foto prewedding",
    "prewedding",
    "dokumentasi foto",
    "foto produk",
    "wedding photography",
    "self photo studio",
    "studio foto keluarga"
   ],
   "aliases_inferred": [
    "videografi pernikahan",
    "dokumentasi video",
    "drone foto"
   ],
   "negative_terms": [],
   "ambiguity_tags": [],
   "needs_confirmation": false,
   "source": {
    "regulation": "PP 82 Tahun 2019",
    "attachment": "Lampiran I",
    "title": "Pembagian Kelompok Tingkat Risiko Lingkungan Kerja"
   },
   "alias_review_status": "draft_v0_3",
   "added_v0_3": [
    "foto",
    "fotografi",
    "fotografer",
    "jasa foto",
    "jasa fotografi",
    "pas foto",
    "cetak foto",
    "photobooth",
    "photo booth",
    "foto wisuda",
    "foto prewedding",
    "prewedding",
    "dokumentasi foto",
    "foto produk",
    "wedding photography",
    "self photo studio",
    "studio foto keluarga"
   ],
   "removed_v0_3": []
  },
  {
   "id": "G2-023",
   "group": 2,
   "risk_label": "Rendah",
   "jkk_rate": 0.0054,
   "jkk_percent": "0.54%",
   "official_name": "Penyiaran radio",
   "sectors": [
    "hiburan_media"
   ],
   "activity": [
    "jasa"
   ],
   "aliases": [
    "radio",
    "stasiun radio",
    "penyiaran radio",
    "radio fm",
    "radio am",
    "radio komunitas",
    "radio siaran",
    "penyiaran",
    "lembaga penyiaran",
    "radio swasta",
    "streaming radio"
   ],
   "aliases_inferred": [
    "televisi",
    "stasiun televisi",
    "stasiun tv",
    "tv lokal",
    "tv kabel",
    "tv berlangganan",
    "penyiaran televisi"
   ],
   "negative_terms": [
    "servis",
    "reparasi"
   ],
   "ambiguity_tags": [],
   "needs_confirmation": false,
   "source": {
    "regulation": "PP 82 Tahun 2019",
    "attachment": "Lampiran I",
    "title": "Pembagian Kelompok Tingkat Risiko Lingkungan Kerja"
   },
   "alias_review_status": "draft_v0_3",
   "added_v0_3": [
    "radio fm",
    "radio am",
    "radio komunitas",
    "radio siaran",
    "penyiaran",
    "lembaga penyiaran",
    "radio swasta",
    "streaming radio"
   ],
   "removed_v0_3": []
  },
  {
   "id": "G2-024",
   "group": 2,
   "risk_label": "Rendah",
   "jkk_rate": 0.0054,
   "jkk_percent": "0.54%",
   "official_name": "Rumah makan dan minuman",
   "sectors": [
    "kuliner_properti"
   ],
   "activity": [
    "sajian"
   ],
   "aliases": [
    "rumah makan",
    "restoran",
    "restaurant",
    "cafe",
    "kafe",
    "warung makan",
    "kedai makan",
    "resto",
    "rumah makan padang",
    "nasi padang",
    "masakan padang",
    "warteg",
    "warung tegal",
    "warung nasi",
    "depot makan",
    "kedai",
    "kedai kopi",
    "warung kopi",
    "warkop",
    "coffee shop",
    "kopi shop",
    "cafe kopi",
    "angkringan",
    "burjo",
    "warmindo",
    "lesehan",
    "pecel lele",
    "restoran seafood",
    "warung bakso",
    "bakso",
    "mie ayam",
    "warung mie ayam",
    "soto",
    "warung soto",
    "sate",
    "warung sate",
    "nasi goreng",
    "martabak",
    "bakmi",
    "ramen",
    "sushi",
    "pizza",
    "burger",
    "fast food",
    "cepat saji",
    "restoran cepat saji",
    "food court",
    "kantin",
    "catering",
    "jasa boga",
    "jasaboga",
    "catering rumahan",
    "catering harian",
    "nasi kotak",
    "nasi box",
    "prasmanan",
    "tumpeng",
    "cloud kitchen",
    "dapur online",
    "ghost kitchen",
    "bar",
    "pub",
    "bistro",
    "kedai teh",
    "boba",
    "bubble tea",
    "minuman kekinian",
    "kedai es teh",
    "es teh",
    "kedai jus",
    "juice bar",
    "kedai es",
    "es campur",
    "dessert",
    "bakery cafe",
    "kuliner",
    "usaha kuliner",
    "rumah makan sunda",
    "ayam geprek",
    "ayam goreng",
    "seblak",
    "bebek goreng",
    "gudeg",
    "rawon",
    "warung makan prasmanan",
    "foodtruck",
    "food truck"
   ],
   "aliases_inferred": [
    "dapur mbg",
    "sppg",
    "dapur sppg",
    "makan bergizi gratis",
    "dapur umum mbg",
    "katering industri",
    "catering pabrik",
    "catering sekolah"
   ],
   "negative_terms": [
    "pabrik",
    "produksi massal",
    "kemasan",
    "distributor",
    "frozen"
   ],
   "ambiguity_tags": [
    "food_service_vs_manufacturing",
    "food_shop_vs_restaurant"
   ],
   "needs_confirmation": false,
   "source": {
    "regulation": "PP 82 Tahun 2019",
    "attachment": "Lampiran I",
    "title": "Pembagian Kelompok Tingkat Risiko Lingkungan Kerja"
   },
   "alias_review_status": "draft_v0_3",
   "added_v0_3": [
    "resto",
    "rumah makan padang",
    "nasi padang",
    "masakan padang",
    "warteg",
    "warung tegal",
    "warung nasi",
    "depot makan",
    "kedai",
    "kedai kopi",
    "warung kopi",
    "warkop",
    "coffee shop",
    "kopi shop",
    "cafe kopi",
    "angkringan",
    "burjo",
    "warmindo",
    "lesehan",
    "pecel lele",
    "restoran seafood",
    "warung bakso",
    "bakso",
    "mie ayam",
    "warung mie ayam",
    "soto",
    "warung soto",
    "sate",
    "warung sate",
    "nasi goreng",
    "martabak",
    "bakmi",
    "ramen",
    "sushi",
    "pizza",
    "burger",
    "fast food",
    "cepat saji",
    "restoran cepat saji",
    "food court",
    "kantin",
    "catering",
    "jasa boga",
    "jasaboga",
    "catering rumahan",
    "catering harian",
    "nasi kotak",
    "nasi box",
    "prasmanan",
    "tumpeng",
    "cloud kitchen",
    "dapur online",
    "ghost kitchen",
    "bar",
    "pub",
    "bistro",
    "kedai teh",
    "boba",
    "bubble tea",
    "minuman kekinian",
    "kedai es teh",
    "es teh",
    "kedai jus",
    "juice bar",
    "kedai es",
    "es campur",
    "dessert",
    "bakery cafe",
    "kuliner",
    "usaha kuliner",
    "rumah makan sunda",
    "ayam geprek",
    "ayam goreng",
    "seblak",
    "bebek goreng",
    "gudeg",
    "rawon",
    "warung makan prasmanan",
    "foodtruck",
    "food truck"
   ],
   "removed_v0_3": []
  },
  {
   "id": "G2-025",
   "group": 2,
   "risk_label": "Rendah",
   "jkk_rate": 0.0054,
   "jkk_percent": "0.54%",
   "official_name": "Hotel, penginapan, dan ruang sewa",
   "sectors": [
    "kuliner_properti"
   ],
   "activity": [
    "properti"
   ],
   "aliases": [
    "hotel",
    "penginapan",
    "guest house",
    "homestay",
    "kos",
    "kos-kosan",
    "ruang sewa",
    "kost",
    "kosan",
    "indekos",
    "rumah kos",
    "kos putri",
    "kos putra",
    "kos eksklusif",
    "losmen",
    "wisma",
    "motel",
    "hostel",
    "resort",
    "villa",
    "vila",
    "cottage",
    "pondok wisata",
    "glamping",
    "apartemen harian",
    "serviced apartment",
    "guesthouse",
    "penginapan syariah",
    "hotel melati",
    "hotel bintang",
    "capsule hotel",
    "asrama",
    "mess karyawan",
    "gedung pertemuan",
    "aula",
    "ballroom",
    "sewa gedung pernikahan"
   ],
   "aliases_inferred": [
    "airbnb",
    "sewa kamar harian",
    "kontrakan harian"
   ],
   "negative_terms": [
    "kontrakan",
    "sewa tanah",
    "sewa alat",
    "kontrakan tahunan"
   ],
   "ambiguity_tags": [
    "property_rental_vs_accommodation"
   ],
   "needs_confirmation": false,
   "source": {
    "regulation": "PP 82 Tahun 2019",
    "attachment": "Lampiran I",
    "title": "Pembagian Kelompok Tingkat Risiko Lingkungan Kerja"
   },
   "alias_review_status": "draft_v0_3",
   "added_v0_3": [
    "kost",
    "kosan",
    "indekos",
    "rumah kos",
    "kos putri",
    "kos putra",
    "kos eksklusif",
    "losmen",
    "wisma",
    "motel",
    "hostel",
    "resort",
    "villa",
    "vila",
    "cottage",
    "pondok wisata",
    "glamping",
    "apartemen harian",
    "serviced apartment",
    "guesthouse",
    "penginapan syariah",
    "hotel melati",
    "hotel bintang",
    "capsule hotel",
    "asrama",
    "mess karyawan",
    "gedung pertemuan",
    "aula",
    "ballroom",
    "sewa gedung pernikahan"
   ],
   "removed_v0_3": []
  },
  {
   "id": "G3-001",
   "group": 3,
   "risk_label": "Sedang",
   "jkk_rate": 0.0089,
   "jkk_percent": "0.89%",
   "official_name": "Pelayanan pengairan",
   "sectors": [
    "pertanian",
    "energi_utilitas"
   ],
   "activity": [
    "utilitas",
    "jasa"
   ],
   "aliases": [
    "pengairan",
    "irigasi",
    "jasa irigasi",
    "p3a",
    "perkumpulan petani pemakai air",
    "hippa",
    "pengelola irigasi",
    "jasa pompa air sawah",
    "operasional irigasi",
    "pelayanan irigasi"
   ],
   "aliases_inferred": [],
   "negative_terms": [
    "pembangunan",
    "proyek",
    "konstruksi"
   ],
   "ambiguity_tags": [],
   "needs_confirmation": false,
   "source": {
    "regulation": "PP 82 Tahun 2019",
    "attachment": "Lampiran I",
    "title": "Pembagian Kelompok Tingkat Risiko Lingkungan Kerja"
   },
   "alias_review_status": "draft_v0_3",
   "added_v0_3": [
    "pengairan",
    "irigasi",
    "jasa irigasi",
    "p3a",
    "perkumpulan petani pemakai air",
    "hippa",
    "pengelola irigasi",
    "jasa pompa air sawah",
    "operasional irigasi",
    "pelayanan irigasi"
   ],
   "removed_v0_3": []
  },
  {
   "id": "G3-002",
   "group": 3,
   "risk_label": "Sedang",
   "jkk_rate": 0.0089,
   "jkk_percent": "0.89%",
   "official_name": "Perusahaan kehutanan",
   "sectors": [
    "pertanian"
   ],
   "activity": [
    "budidaya"
   ],
   "aliases": [
    "kehutanan",
    "hutan tanaman industri",
    "hti",
    "hak pengusahaan hutan",
    "iuphhk",
    "pengusahaan hutan",
    "hutan rakyat",
    "reboisasi",
    "penghijauan",
    "pembibitan pohon",
    "persemaian",
    "hutan produksi",
    "pengelola hutan",
    "perhutanan sosial",
    "agroforestri",
    "hutan jati",
    "hutan sengon",
    "budidaya sengon",
    "budidaya jabon",
    "pengelolaan hutan"
   ],
   "aliases_inferred": [],
   "negative_terms": [
    "tebang",
    "penebangan",
    "gergaji",
    "sawmill"
   ],
   "ambiguity_tags": [],
   "needs_confirmation": false,
   "source": {
    "regulation": "PP 82 Tahun 2019",
    "attachment": "Lampiran I",
    "title": "Pembagian Kelompok Tingkat Risiko Lingkungan Kerja"
   },
   "alias_review_status": "draft_v0_3",
   "added_v0_3": [
    "kehutanan",
    "hutan tanaman industri",
    "hti",
    "hak pengusahaan hutan",
    "iuphhk",
    "pengusahaan hutan",
    "hutan rakyat",
    "reboisasi",
    "penghijauan",
    "pembibitan pohon",
    "persemaian",
    "hutan produksi",
    "pengelola hutan",
    "perhutanan sosial",
    "agroforestri",
    "hutan jati",
    "hutan sengon",
    "budidaya sengon",
    "budidaya jabon",
    "pengelolaan hutan"
   ],
   "removed_v0_3": []
  },
  {
   "id": "G3-003",
   "group": 3,
   "risk_label": "Sedang",
   "jkk_rate": 0.0089,
   "jkk_percent": "0.89%",
   "official_name": "Pengumpulan hasil hutan",
   "sectors": [
    "pertanian"
   ],
   "activity": [
    "ekstraksi"
   ],
   "aliases": [
    "hasil hutan",
    "hasil hutan bukan kayu",
    "hhbk",
    "pengumpulan rotan",
    "sadap getah pinus",
    "penyadapan getah pinus",
    "getah pinus",
    "madu hutan",
    "gaharu",
    "kemenyan",
    "jernang",
    "tengkawang",
    "pengumpul rotan",
    "pengumpul hasil hutan",
    "pencari gaharu"
   ],
   "aliases_inferred": [],
   "negative_terms": [
    "pabrik",
    "mebel",
    "gondorukem"
   ],
   "ambiguity_tags": [],
   "needs_confirmation": false,
   "source": {
    "regulation": "PP 82 Tahun 2019",
    "attachment": "Lampiran I",
    "title": "Pembagian Kelompok Tingkat Risiko Lingkungan Kerja"
   },
   "alias_review_status": "draft_v0_3",
   "added_v0_3": [
    "hasil hutan",
    "hasil hutan bukan kayu",
    "hhbk",
    "pengumpulan rotan",
    "sadap getah pinus",
    "penyadapan getah pinus",
    "getah pinus",
    "madu hutan",
    "gaharu",
    "kemenyan",
    "jernang",
    "tengkawang",
    "pengumpul rotan",
    "pengumpul hasil hutan",
    "pencari gaharu"
   ],
   "removed_v0_3": []
  },
  {
   "id": "G3-004",
   "group": 3,
   "risk_label": "Sedang",
   "jkk_rate": 0.0089,
   "jkk_percent": "0.89%",
   "official_name": "Pembakaran arang (di hutan)",
   "sectors": [
    "pertanian"
   ],
   "activity": [
    "produksi"
   ],
   "aliases": [
    "arang",
    "arang kayu",
    "pembakaran arang",
    "pembuatan arang",
    "tungku arang",
    "arang bakau"
   ],
   "aliases_inferred": [
    "arang batok",
    "arang tempurung",
    "briket arang",
    "briket kelapa",
    "arang sekam"
   ],
   "negative_terms": [
    "batu bara",
    "batubara"
   ],
   "ambiguity_tags": [],
   "needs_confirmation": false,
   "source": {
    "regulation": "PP 82 Tahun 2019",
    "attachment": "Lampiran I",
    "title": "Pembagian Kelompok Tingkat Risiko Lingkungan Kerja"
   },
   "alias_review_status": "draft_v0_3",
   "added_v0_3": [
    "arang",
    "arang kayu",
    "pembakaran arang",
    "pembuatan arang",
    "tungku arang",
    "arang bakau"
   ],
   "removed_v0_3": []
  },
  {
   "id": "G3-005",
   "group": 3,
   "risk_label": "Sedang",
   "jkk_rate": 0.0089,
   "jkk_percent": "0.89%",
   "official_name": "Perburuan",
   "sectors": [
    "pertanian"
   ],
   "activity": [
    "ekstraksi"
   ],
   "aliases": [
    "berburu",
    "pemburu",
    "perburuan satwa",
    "taman buru",
    "perburuan babi hutan"
   ],
   "aliases_inferred": [],
   "negative_terms": [],
   "ambiguity_tags": [],
   "needs_confirmation": false,
   "source": {
    "regulation": "PP 82 Tahun 2019",
    "attachment": "Lampiran I",
    "title": "Pembagian Kelompok Tingkat Risiko Lingkungan Kerja"
   },
   "alias_review_status": "draft_v0_3",
   "added_v0_3": [
    "berburu",
    "pemburu",
    "perburuan satwa",
    "taman buru",
    "perburuan babi hutan"
   ],
   "removed_v0_3": []
  },
  {
   "id": "G3-006",
   "group": 3,
   "risk_label": "Sedang",
   "jkk_rate": 0.0089,
   "jkk_percent": "0.89%",
   "official_name": "Pemeliharaan ikan tawar",
   "sectors": [
    "peternakan_perikanan"
   ],
   "activity": [
    "budidaya"
   ],
   "aliases": [
    "budidaya ikan tawar",
    "kolam ikan",
    "ternak ikan tawar",
    "budidaya ikan",
    "perikanan budidaya",
    "ikan air tawar",
    "kolam",
    "budidaya lele",
    "ternak lele",
    "lele",
    "budidaya nila",
    "nila",
    "gurame",
    "gurami",
    "budidaya patin",
    "patin",
    "ikan mas",
    "ikan hias",
    "budidaya ikan hias",
    "koi",
    "cupang",
    "bioflok",
    "kolam terpal",
    "keramba jaring apung",
    "jaring apung",
    "kja",
    "pembenihan ikan",
    "benih ikan",
    "bibit ikan",
    "pendederan",
    "hatchery ikan",
    "minapadi",
    "belut",
    "budidaya belut",
    "udang galah",
    "lobster air tawar",
    "kolam lele"
   ],
   "aliases_inferred": [],
   "negative_terms": [
    "laut",
    "tangkap",
    "penangkapan",
    "nelayan",
    "pengawetan",
    "olahan"
   ],
   "ambiguity_tags": [],
   "needs_confirmation": false,
   "source": {
    "regulation": "PP 82 Tahun 2019",
    "attachment": "Lampiran I",
    "title": "Pembagian Kelompok Tingkat Risiko Lingkungan Kerja"
   },
   "alias_review_status": "draft_v0_3",
   "added_v0_3": [
    "budidaya ikan",
    "perikanan budidaya",
    "ikan air tawar",
    "kolam",
    "budidaya lele",
    "ternak lele",
    "lele",
    "budidaya nila",
    "nila",
    "gurame",
    "gurami",
    "budidaya patin",
    "patin",
    "ikan mas",
    "ikan hias",
    "budidaya ikan hias",
    "koi",
    "cupang",
    "bioflok",
    "kolam terpal",
    "keramba jaring apung",
    "jaring apung",
    "kja",
    "pembenihan ikan",
    "benih ikan",
    "bibit ikan",
    "pendederan",
    "hatchery ikan",
    "minapadi",
    "belut",
    "budidaya belut",
    "udang galah",
    "lobster air tawar",
    "kolam lele"
   ],
   "removed_v0_3": []
  },
  {
   "id": "G3-007",
   "group": 3,
   "risk_label": "Sedang",
   "jkk_rate": 0.0089,
   "jkk_percent": "0.89%",
   "official_name": "Pemeliharaan ikan laut",
   "sectors": [
    "peternakan_perikanan"
   ],
   "activity": [
    "budidaya"
   ],
   "aliases": [
    "budidaya ikan laut",
    "keramba laut",
    "marikultur",
    "budidaya laut",
    "kerapu",
    "budidaya kerapu",
    "budidaya kakap",
    "bawal bintang",
    "budidaya rumput laut",
    "kja laut",
    "keramba jaring apung laut",
    "budidaya kerang",
    "budidaya lobster",
    "budidaya teripang",
    "budidaya mutiara",
    "mutiara"
   ],
   "aliases_inferred": [
    "tambak",
    "tambak udang",
    "udang vaname",
    "vaname",
    "udang windu",
    "tambak bandeng",
    "bandeng",
    "air payau",
    "budidaya udang",
    "tambak ikan",
    "petambak udang",
    "tambak kepiting",
    "kepiting soka",
    "budidaya kepiting",
    "rumput laut"
   ],
   "negative_terms": [
    "tangkap",
    "penangkapan",
    "nelayan",
    "kapal",
    "garam"
   ],
   "ambiguity_tags": [
    "aquaculture_vs_capture_fishing"
   ],
   "needs_confirmation": true,
   "source": {
    "regulation": "PP 82 Tahun 2019",
    "attachment": "Lampiran I",
    "title": "Pembagian Kelompok Tingkat Risiko Lingkungan Kerja"
   },
   "alias_review_status": "draft_v0_3",
   "added_v0_3": [
    "budidaya laut",
    "kerapu",
    "budidaya kerapu",
    "budidaya kakap",
    "bawal bintang",
    "budidaya rumput laut",
    "kja laut",
    "keramba jaring apung laut",
    "budidaya kerang",
    "budidaya lobster",
    "budidaya teripang",
    "budidaya mutiara",
    "mutiara"
   ],
   "removed_v0_3": []
  },
  {
   "id": "G3-008",
   "group": 3,
   "risk_label": "Sedang",
   "jkk_rate": 0.0089,
   "jkk_percent": "0.89%",
   "official_name": "Penangkapan ikan tawar",
   "sectors": [
    "peternakan_perikanan"
   ],
   "activity": [
    "ekstraksi"
   ],
   "aliases": [
    "nelayan sungai",
    "nelayan danau",
    "nelayan waduk",
    "tangkap ikan sungai",
    "penangkapan ikan sungai",
    "penangkapan ikan danau",
    "perikanan tangkap air tawar",
    "menjala ikan"
   ],
   "aliases_inferred": [],
   "negative_terms": [
    "laut",
    "budidaya",
    "kolam",
    "tambak"
   ],
   "ambiguity_tags": [],
   "needs_confirmation": false,
   "source": {
    "regulation": "PP 82 Tahun 2019",
    "attachment": "Lampiran I",
    "title": "Pembagian Kelompok Tingkat Risiko Lingkungan Kerja"
   },
   "alias_review_status": "draft_v0_3",
   "added_v0_3": [
    "nelayan sungai",
    "nelayan danau",
    "nelayan waduk",
    "tangkap ikan sungai",
    "penangkapan ikan sungai",
    "penangkapan ikan danau",
    "perikanan tangkap air tawar",
    "menjala ikan"
   ],
   "removed_v0_3": []
  },
  {
   "id": "G3-009",
   "group": 3,
   "risk_label": "Sedang",
   "jkk_rate": 0.0089,
   "jkk_percent": "0.89%",
   "official_name": "Pemotongan hewan",
   "sectors": [
    "industri_makanan"
   ],
   "activity": [
    "produksi"
   ],
   "aliases": [
    "rumah potong hewan",
    "RPH",
    "pemotongan hewan",
    "rpu",
    "rumah potong unggas",
    "rumah potong ayam",
    "potong ayam",
    "pemotongan ayam",
    "pemotongan unggas",
    "jagal",
    "jagal sapi",
    "penjagalan",
    "abattoir",
    "slaughterhouse",
    "rumah potong babi",
    "rumah potong sapi",
    "pemotongan sapi",
    "pemotongan kambing"
   ],
   "aliases_inferred": [],
   "negative_terms": [
    "warung"
   ],
   "ambiguity_tags": [],
   "needs_confirmation": false,
   "source": {
    "regulation": "PP 82 Tahun 2019",
    "attachment": "Lampiran I",
    "title": "Pembagian Kelompok Tingkat Risiko Lingkungan Kerja"
   },
   "alias_review_status": "draft_v0_3",
   "added_v0_3": [
    "rpu",
    "rumah potong unggas",
    "rumah potong ayam",
    "potong ayam",
    "pemotongan ayam",
    "pemotongan unggas",
    "jagal",
    "jagal sapi",
    "penjagalan",
    "abattoir",
    "slaughterhouse",
    "rumah potong babi",
    "rumah potong sapi",
    "pemotongan sapi",
    "pemotongan kambing"
   ],
   "removed_v0_3": []
  },
  {
   "id": "G3-010",
   "group": 3,
   "risk_label": "Sedang",
   "jkk_rate": 0.0089,
   "jkk_percent": "0.89%",
   "official_name": "Pemotongan dan pengawetan daging",
   "sectors": [
    "industri_makanan"
   ],
   "activity": [
    "produksi"
   ],
   "aliases": [
    "pengawetan daging",
    "pengolahan daging",
    "daging olahan",
    "sosis",
    "nugget",
    "pabrik sosis",
    "pabrik nugget",
    "kornet",
    "dendeng",
    "abon",
    "abon sapi",
    "daging asap",
    "smoked beef",
    "meat processing",
    "pabrik bakso",
    "produksi bakso",
    "bakso frozen",
    "bakso beku"
   ],
   "aliases_inferred": [
    "cold storage daging",
    "daging beku"
   ],
   "negative_terms": [
    "warung",
    "kedai",
    "restoran"
   ],
   "ambiguity_tags": [],
   "needs_confirmation": false,
   "source": {
    "regulation": "PP 82 Tahun 2019",
    "attachment": "Lampiran I",
    "title": "Pembagian Kelompok Tingkat Risiko Lingkungan Kerja"
   },
   "alias_review_status": "draft_v0_3",
   "added_v0_3": [
    "pengawetan daging",
    "pengolahan daging",
    "daging olahan",
    "sosis",
    "nugget",
    "pabrik sosis",
    "pabrik nugget",
    "kornet",
    "dendeng",
    "abon",
    "abon sapi",
    "daging asap",
    "smoked beef",
    "meat processing",
    "pabrik bakso",
    "produksi bakso",
    "bakso frozen",
    "bakso beku"
   ],
   "removed_v0_3": []
  },
  {
   "id": "G3-011",
   "group": 3,
   "risk_label": "Sedang",
   "jkk_rate": 0.0089,
   "jkk_percent": "0.89%",
   "official_name": "Pengolahan susu dan mentega",
   "sectors": [
    "industri_makanan"
   ],
   "activity": [
    "produksi"
   ],
   "aliases": [
    "pengolahan susu",
    "pabrik susu",
    "susu pasteurisasi",
    "yogurt",
    "yoghurt",
    "keju",
    "mentega",
    "butter",
    "dairy",
    "susu kental manis",
    "susu bubuk",
    "produksi susu",
    "olahan susu"
   ],
   "aliases_inferred": [
    "es krim produksi",
    "pabrik es krim",
    "produksi es krim",
    "susu kedelai produksi"
   ],
   "negative_terms": [
    "peternakan",
    "sapi perah",
    "kedai"
   ],
   "ambiguity_tags": [],
   "needs_confirmation": false,
   "source": {
    "regulation": "PP 82 Tahun 2019",
    "attachment": "Lampiran I",
    "title": "Pembagian Kelompok Tingkat Risiko Lingkungan Kerja"
   },
   "alias_review_status": "draft_v0_3",
   "added_v0_3": [
    "pengolahan susu",
    "pabrik susu",
    "susu pasteurisasi",
    "yogurt",
    "yoghurt",
    "keju",
    "mentega",
    "butter",
    "dairy",
    "susu kental manis",
    "susu bubuk",
    "produksi susu",
    "olahan susu"
   ],
   "removed_v0_3": []
  },
  {
   "id": "G3-012",
   "group": 3,
   "risk_label": "Sedang",
   "jkk_rate": 0.0089,
   "jkk_percent": "0.89%",
   "official_name": "Pabrik pengawetan sayuran dan buah",
   "sectors": [
    "industri_makanan"
   ],
   "activity": [
    "produksi"
   ],
   "aliases": [
    "pengawetan buah",
    "pengawetan sayur",
    "manisan",
    "manisan buah",
    "asinan",
    "acar",
    "sayur beku",
    "buah beku",
    "buah kaleng",
    "sayur kaleng",
    "selai",
    "selai buah",
    "buah kering",
    "dried fruit",
    "sale pisang",
    "pengolahan buah",
    "pengolahan sayur",
    "keripik buah",
    "pasta tomat"
   ],
   "aliases_inferred": [],
   "negative_terms": [
    "kebun"
   ],
   "ambiguity_tags": [],
   "needs_confirmation": false,
   "source": {
    "regulation": "PP 82 Tahun 2019",
    "attachment": "Lampiran I",
    "title": "Pembagian Kelompok Tingkat Risiko Lingkungan Kerja"
   },
   "alias_review_status": "draft_v0_3",
   "added_v0_3": [
    "pengawetan buah",
    "pengawetan sayur",
    "manisan",
    "manisan buah",
    "asinan",
    "acar",
    "sayur beku",
    "buah beku",
    "buah kaleng",
    "sayur kaleng",
    "selai",
    "selai buah",
    "buah kering",
    "dried fruit",
    "sale pisang",
    "pengolahan buah",
    "pengolahan sayur",
    "keripik buah",
    "pasta tomat"
   ],
   "removed_v0_3": []
  },
  {
   "id": "G3-013",
   "group": 3,
   "risk_label": "Sedang",
   "jkk_rate": 0.0089,
   "jkk_percent": "0.89%",
   "official_name": "Pabrik pengawetan ikan",
   "sectors": [
    "industri_makanan"
   ],
   "activity": [
    "produksi"
   ],
   "aliases": [
    "pengawetan ikan",
    "pengolahan ikan",
    "olahan ikan",
    "ikan asin",
    "ikan asap",
    "ikan kering",
    "pindang",
    "pemindangan",
    "ikan kaleng",
    "pabrik sarden",
    "sarden",
    "terasi",
    "petis",
    "bakso ikan",
    "otak otak",
    "fillet ikan",
    "ikan beku",
    "frozen fish",
    "unit pengolahan ikan",
    "upi",
    "surimi",
    "abon ikan",
    "tepung ikan",
    "pengupasan rajungan",
    "pengolahan udang",
    "cold storage ikan",
    "pengalengan ikan"
   ],
   "aliases_inferred": [],
   "negative_terms": [
    "kolam",
    "budidaya",
    "tambak",
    "nelayan",
    "warung"
   ],
   "ambiguity_tags": [],
   "needs_confirmation": false,
   "source": {
    "regulation": "PP 82 Tahun 2019",
    "attachment": "Lampiran I",
    "title": "Pembagian Kelompok Tingkat Risiko Lingkungan Kerja"
   },
   "alias_review_status": "draft_v0_3",
   "added_v0_3": [
    "pengawetan ikan",
    "pengolahan ikan",
    "olahan ikan",
    "ikan asin",
    "ikan asap",
    "ikan kering",
    "pindang",
    "pemindangan",
    "ikan kaleng",
    "pabrik sarden",
    "sarden",
    "terasi",
    "petis",
    "bakso ikan",
    "otak otak",
    "fillet ikan",
    "ikan beku",
    "frozen fish",
    "unit pengolahan ikan",
    "upi",
    "surimi",
    "abon ikan",
    "tepung ikan",
    "pengupasan rajungan",
    "pengolahan udang",
    "cold storage ikan",
    "pengalengan ikan"
   ],
   "removed_v0_3": []
  },
  {
   "id": "G3-014",
   "group": 3,
   "risk_label": "Sedang",
   "jkk_rate": 0.0089,
   "jkk_percent": "0.89%",
   "official_name": "Penggilingan padi",
   "sectors": [
    "industri_makanan"
   ],
   "activity": [
    "produksi"
   ],
   "aliases": [
    "penggilingan padi",
    "rice mill",
    "selep padi",
    "penggilingan beras",
    "gilingan padi",
    "huller",
    "heller",
    "selep",
    "rmu",
    "rice milling unit",
    "pengolahan gabah",
    "pengeringan gabah",
    "pabrik beras",
    "penggilingan gabah",
    "pengolahan beras"
   ],
   "aliases_inferred": [],
   "negative_terms": [
    "toko beras",
    "agen beras",
    "sawah",
    "petani"
   ],
   "ambiguity_tags": [],
   "needs_confirmation": false,
   "source": {
    "regulation": "PP 82 Tahun 2019",
    "attachment": "Lampiran I",
    "title": "Pembagian Kelompok Tingkat Risiko Lingkungan Kerja"
   },
   "alias_review_status": "draft_v0_3",
   "added_v0_3": [
    "penggilingan beras",
    "gilingan padi",
    "huller",
    "heller",
    "selep",
    "rmu",
    "rice milling unit",
    "pengolahan gabah",
    "pengeringan gabah",
    "pabrik beras",
    "penggilingan gabah",
    "pengolahan beras"
   ],
   "removed_v0_3": []
  },
  {
   "id": "G3-015",
   "group": 3,
   "risk_label": "Sedang",
   "jkk_rate": 0.0089,
   "jkk_percent": "0.89%",
   "official_name": "Pabrik tepung (beras, tapioka, dan lain-lain)",
   "sectors": [
    "industri_makanan"
   ],
   "activity": [
    "produksi"
   ],
   "aliases": [
    "tepung",
    "pabrik tepung",
    "tepung beras",
    "tepung tapioka",
    "tapioka",
    "aci",
    "pati",
    "tepung singkong",
    "mocaf",
    "tepung terigu",
    "terigu",
    "penggilingan gandum",
    "tepung jagung",
    "maizena",
    "tepung sagu",
    "pengolahan sagu",
    "pabrik tapioka",
    "penggilingan tepung",
    "gaplek"
   ],
   "aliases_inferred": [],
   "negative_terms": [
    "kue",
    "roti"
   ],
   "ambiguity_tags": [],
   "needs_confirmation": false,
   "source": {
    "regulation": "PP 82 Tahun 2019",
    "attachment": "Lampiran I",
    "title": "Pembagian Kelompok Tingkat Risiko Lingkungan Kerja"
   },
   "alias_review_status": "draft_v0_3",
   "added_v0_3": [
    "tepung",
    "pabrik tepung",
    "tepung beras",
    "tepung tapioka",
    "tapioka",
    "aci",
    "pati",
    "tepung singkong",
    "mocaf",
    "tepung terigu",
    "terigu",
    "penggilingan gandum",
    "tepung jagung",
    "maizena",
    "tepung sagu",
    "pengolahan sagu",
    "pabrik tapioka",
    "penggilingan tepung",
    "gaplek"
   ],
   "removed_v0_3": []
  },
  {
   "id": "G3-016",
   "group": 3,
   "risk_label": "Sedang",
   "jkk_rate": 0.0089,
   "jkk_percent": "0.89%",
   "official_name": "Perusahaan pengupasan (kacang tanah dan lain-lain)",
   "sectors": [
    "industri_makanan"
   ],
   "activity": [
    "produksi"
   ],
   "aliases": [
    "pengupasan kacang",
    "kupas kacang",
    "pengupasan kacang tanah",
    "pengupasan mete",
    "kacang mete kupas",
    "kupas kemiri",
    "pengupasan kemiri",
    "pengupasan kelapa",
    "kupas kelapa",
    "pengupasan bawang",
    "kupas bawang",
    "sortasi hasil bumi"
   ],
   "aliases_inferred": [],
   "negative_terms": [
    "kebun"
   ],
   "ambiguity_tags": [],
   "needs_confirmation": false,
   "source": {
    "regulation": "PP 82 Tahun 2019",
    "attachment": "Lampiran I",
    "title": "Pembagian Kelompok Tingkat Risiko Lingkungan Kerja"
   },
   "alias_review_status": "draft_v0_3",
   "added_v0_3": [
    "pengupasan kacang",
    "kupas kacang",
    "pengupasan kacang tanah",
    "pengupasan mete",
    "kacang mete kupas",
    "kupas kemiri",
    "pengupasan kemiri",
    "pengupasan kelapa",
    "kupas kelapa",
    "pengupasan bawang",
    "kupas bawang",
    "sortasi hasil bumi"
   ],
   "removed_v0_3": []
  },
  {
   "id": "G3-017",
   "group": 3,
   "risk_label": "Sedang",
   "jkk_rate": 0.0089,
   "jkk_percent": "0.89%",
   "official_name": "Pabrik roti dan kue",
   "sectors": [
    "industri_makanan"
   ],
   "activity": [
    "produksi"
   ],
   "aliases": [
    "bakery",
    "pabrik roti",
    "produksi roti",
    "produksi kue",
    "roti",
    "kue",
    "pembuatan roti",
    "pembuatan kue",
    "pabrik kue",
    "kue kering",
    "kue basah",
    "jajan pasar",
    "roti tawar",
    "donat",
    "cake",
    "bolu",
    "brownies",
    "pastry",
    "pie",
    "cookies",
    "kue lebaran",
    "bakpia",
    "lapis legit",
    "home bakery",
    "dapur roti",
    "industri roti",
    "produksi donat",
    "roti dan kue",
    "usaha roti",
    "usaha kue"
   ],
   "aliases_inferred": [],
   "negative_terms": [
    "kafe",
    "cafe",
    "restoran"
   ],
   "ambiguity_tags": [],
   "needs_confirmation": false,
   "source": {
    "regulation": "PP 82 Tahun 2019",
    "attachment": "Lampiran I",
    "title": "Pembagian Kelompok Tingkat Risiko Lingkungan Kerja"
   },
   "alias_review_status": "draft_v0_3",
   "added_v0_3": [
    "roti",
    "kue",
    "pembuatan roti",
    "pembuatan kue",
    "pabrik kue",
    "kue kering",
    "kue basah",
    "jajan pasar",
    "roti tawar",
    "donat",
    "cake",
    "bolu",
    "brownies",
    "pastry",
    "pie",
    "cookies",
    "kue lebaran",
    "bakpia",
    "lapis legit",
    "home bakery",
    "dapur roti",
    "industri roti",
    "produksi donat",
    "roti dan kue",
    "usaha roti",
    "usaha kue"
   ],
   "removed_v0_3": []
  },
  {
   "id": "G3-018",
   "group": 3,
   "risk_label": "Sedang",
   "jkk_rate": 0.0089,
   "jkk_percent": "0.89%",
   "official_name": "Pabrik biskuit",
   "sectors": [
    "industri_makanan"
   ],
   "activity": [
    "produksi"
   ],
   "aliases": [
    "biskuit",
    "biscuit",
    "wafer",
    "crackers",
    "cracker",
    "kue kaleng",
    "pabrik wafer",
    "pabrik biskuit"
   ],
   "aliases_inferred": [],
   "negative_terms": [],
   "ambiguity_tags": [],
   "needs_confirmation": false,
   "source": {
    "regulation": "PP 82 Tahun 2019",
    "attachment": "Lampiran I",
    "title": "Pembagian Kelompok Tingkat Risiko Lingkungan Kerja"
   },
   "alias_review_status": "draft_v0_3",
   "added_v0_3": [
    "biskuit",
    "biscuit",
    "wafer",
    "crackers",
    "cracker",
    "kue kaleng",
    "pabrik wafer",
    "pabrik biskuit"
   ],
   "removed_v0_3": []
  },
  {
   "id": "G3-019",
   "group": 3,
   "risk_label": "Sedang",
   "jkk_rate": 0.0089,
   "jkk_percent": "0.89%",
   "official_name": "Pabrik gula",
   "sectors": [
    "industri_makanan"
   ],
   "activity": [
    "produksi"
   ],
   "aliases": [
    "pabrik gula",
    "gula pasir",
    "pengolahan tebu",
    "gula merah",
    "gula aren",
    "gula kelapa",
    "gula semut",
    "pengolahan nira",
    "gula rafinasi",
    "rafinasi",
    "produksi gula",
    "pengrajin gula aren",
    "gula jawa"
   ],
   "aliases_inferred": [],
   "negative_terms": [
    "kebun",
    "perkebunan",
    "tebu"
   ],
   "ambiguity_tags": [],
   "needs_confirmation": false,
   "source": {
    "regulation": "PP 82 Tahun 2019",
    "attachment": "Lampiran I",
    "title": "Pembagian Kelompok Tingkat Risiko Lingkungan Kerja"
   },
   "alias_review_status": "draft_v0_3",
   "added_v0_3": [
    "pabrik gula",
    "gula pasir",
    "pengolahan tebu",
    "gula merah",
    "gula aren",
    "gula kelapa",
    "gula semut",
    "pengolahan nira",
    "gula rafinasi",
    "rafinasi",
    "produksi gula",
    "pengrajin gula aren",
    "gula jawa"
   ],
   "removed_v0_3": []
  },
  {
   "id": "G3-020",
   "group": 3,
   "risk_label": "Sedang",
   "jkk_rate": 0.0089,
   "jkk_percent": "0.89%",
   "official_name": "Pabrik kembang gula, coklat, dan lain-lain",
   "sectors": [
    "industri_makanan"
   ],
   "activity": [
    "produksi"
   ],
   "aliases": [
    "permen",
    "kembang gula",
    "pabrik coklat",
    "pabrik permen",
    "coklat produksi",
    "produksi coklat",
    "candy",
    "jelly",
    "agar agar",
    "dodol",
    "jenang",
    "wajik",
    "geplak",
    "marshmallow",
    "gulali",
    "olahan kakao"
   ],
   "aliases_inferred": [],
   "negative_terms": [
    "kebun",
    "perkebunan"
   ],
   "ambiguity_tags": [],
   "needs_confirmation": false,
   "source": {
    "regulation": "PP 82 Tahun 2019",
    "attachment": "Lampiran I",
    "title": "Pembagian Kelompok Tingkat Risiko Lingkungan Kerja"
   },
   "alias_review_status": "draft_v0_3",
   "added_v0_3": [
    "permen",
    "kembang gula",
    "pabrik coklat",
    "pabrik permen",
    "coklat produksi",
    "produksi coklat",
    "candy",
    "jelly",
    "agar agar",
    "dodol",
    "jenang",
    "wajik",
    "geplak",
    "marshmallow",
    "gulali",
    "olahan kakao"
   ],
   "removed_v0_3": []
  },
  {
   "id": "G3-021",
   "group": 3,
   "risk_label": "Sedang",
   "jkk_rate": 0.0089,
   "jkk_percent": "0.89%",
   "official_name": "Pabrik mie dan bihun",
   "sectors": [
    "industri_makanan"
   ],
   "activity": [
    "produksi"
   ],
   "aliases": [
    "pabrik mie",
    "produksi mie",
    "bihun",
    "mie",
    "pabrik mi",
    "mie basah",
    "mie kering",
    "mie instan",
    "soun",
    "sohun",
    "kwetiau",
    "pasta",
    "mie telur",
    "produksi mi basah"
   ],
   "aliases_inferred": [],
   "negative_terms": [
    "warung",
    "kedai",
    "mie ayam",
    "restoran"
   ],
   "ambiguity_tags": [],
   "needs_confirmation": false,
   "source": {
    "regulation": "PP 82 Tahun 2019",
    "attachment": "Lampiran I",
    "title": "Pembagian Kelompok Tingkat Risiko Lingkungan Kerja"
   },
   "alias_review_status": "draft_v0_3",
   "added_v0_3": [
    "mie",
    "pabrik mi",
    "mie basah",
    "mie kering",
    "mie instan",
    "soun",
    "sohun",
    "kwetiau",
    "pasta",
    "mie telur",
    "produksi mi basah"
   ],
   "removed_v0_3": []
  },
  {
   "id": "G3-022",
   "group": 3,
   "risk_label": "Sedang",
   "jkk_rate": 0.0089,
   "jkk_percent": "0.89%",
   "official_name": "Pabrik kerupuk",
   "sectors": [
    "industri_makanan"
   ],
   "activity": [
    "produksi"
   ],
   "aliases": [
    "pabrik kerupuk",
    "produksi kerupuk",
    "kerupuk",
    "kerupuk udang",
    "kerupuk ikan",
    "kerupuk kulit",
    "rambak",
    "opak",
    "rengginang",
    "emping",
    "kemplang",
    "kerupuk mentah",
    "kerupuk bawang",
    "kerupuk puli"
   ],
   "aliases_inferred": [],
   "negative_terms": [
    "warung"
   ],
   "ambiguity_tags": [],
   "needs_confirmation": false,
   "source": {
    "regulation": "PP 82 Tahun 2019",
    "attachment": "Lampiran I",
    "title": "Pembagian Kelompok Tingkat Risiko Lingkungan Kerja"
   },
   "alias_review_status": "draft_v0_3",
   "added_v0_3": [
    "kerupuk",
    "kerupuk udang",
    "kerupuk ikan",
    "kerupuk kulit",
    "rambak",
    "opak",
    "rengginang",
    "emping",
    "kemplang",
    "kerupuk mentah",
    "kerupuk bawang",
    "kerupuk puli"
   ],
   "removed_v0_3": []
  },
  {
   "id": "G3-023",
   "group": 3,
   "risk_label": "Sedang",
   "jkk_rate": 0.0089,
   "jkk_percent": "0.89%",
   "official_name": "Pabrik tahu",
   "sectors": [
    "industri_makanan"
   ],
   "activity": [
    "produksi"
   ],
   "aliases": [
    "pabrik tahu",
    "produksi tahu",
    "tahu",
    "pembuatan tahu",
    "tahu susu",
    "tahu putih",
    "tahu kuning",
    "pengrajin tahu"
   ],
   "aliases_inferred": [
    "tempe",
    "pabrik tempe",
    "produksi tempe",
    "pengrajin tempe",
    "oncom",
    "tahu tempe"
   ],
   "negative_terms": [
    "warung",
    "tahu goreng"
   ],
   "ambiguity_tags": [],
   "needs_confirmation": false,
   "source": {
    "regulation": "PP 82 Tahun 2019",
    "attachment": "Lampiran I",
    "title": "Pembagian Kelompok Tingkat Risiko Lingkungan Kerja"
   },
   "alias_review_status": "draft_v0_3",
   "added_v0_3": [
    "tahu",
    "pembuatan tahu",
    "tahu susu",
    "tahu putih",
    "tahu kuning",
    "pengrajin tahu"
   ],
   "removed_v0_3": []
  },
  {
   "id": "G3-024",
   "group": 3,
   "risk_label": "Sedang",
   "jkk_rate": 0.0089,
   "jkk_percent": "0.89%",
   "official_name": "Pabrik kecap",
   "sectors": [
    "industri_makanan"
   ],
   "activity": [
    "produksi"
   ],
   "aliases": [
    "pabrik kecap",
    "produksi kecap",
    "kecap",
    "kecap manis",
    "kecap asin",
    "tauco",
    "taoco"
   ],
   "aliases_inferred": [
    "saus",
    "saus sambal",
    "saus tomat",
    "sambal botol",
    "pabrik saus",
    "cuka",
    "produksi saus"
   ],
   "negative_terms": [],
   "ambiguity_tags": [],
   "needs_confirmation": false,
   "source": {
    "regulation": "PP 82 Tahun 2019",
    "attachment": "Lampiran I",
    "title": "Pembagian Kelompok Tingkat Risiko Lingkungan Kerja"
   },
   "alias_review_status": "draft_v0_3",
   "added_v0_3": [
    "kecap",
    "kecap manis",
    "kecap asin",
    "tauco",
    "taoco"
   ],
   "removed_v0_3": []
  },
  {
   "id": "G3-025",
   "group": 3,
   "risk_label": "Sedang",
   "jkk_rate": 0.0089,
   "jkk_percent": "0.89%",
   "official_name": "Pabrik es",
   "sectors": [
    "industri_makanan"
   ],
   "activity": [
    "produksi"
   ],
   "aliases": [
    "es batu",
    "es balok",
    "es kristal",
    "es tube",
    "pabrik es batu",
    "produksi es batu",
    "es curah",
    "ice cube",
    "depot es",
    "pabrik es balok",
    "pabrik es kristal"
   ],
   "aliases_inferred": [],
   "negative_terms": [
    "kedai",
    "minuman",
    "es teh",
    "es campur",
    "es krim",
    "jus"
   ],
   "ambiguity_tags": [],
   "needs_confirmation": false,
   "source": {
    "regulation": "PP 82 Tahun 2019",
    "attachment": "Lampiran I",
    "title": "Pembagian Kelompok Tingkat Risiko Lingkungan Kerja"
   },
   "alias_review_status": "draft_v0_3",
   "added_v0_3": [
    "es batu",
    "es balok",
    "es kristal",
    "es tube",
    "pabrik es batu",
    "produksi es batu",
    "es curah",
    "ice cube",
    "depot es",
    "pabrik es balok",
    "pabrik es kristal"
   ],
   "removed_v0_3": []
  },
  {
   "id": "G3-026",
   "group": 3,
   "risk_label": "Sedang",
   "jkk_rate": 0.0089,
   "jkk_percent": "0.89%",
   "official_name": "Pabrik margarin, minyak goreng, dan lemak",
   "sectors": [
    "industri_makanan"
   ],
   "activity": [
    "produksi"
   ],
   "aliases": [
    "minyak goreng",
    "pabrik minyak goreng",
    "margarin",
    "margarine",
    "lemak nabati",
    "shortening",
    "mentega putih",
    "refinery minyak goreng",
    "minyak curah",
    "migor"
   ],
   "aliases_inferred": [],
   "negative_terms": [],
   "ambiguity_tags": [],
   "needs_confirmation": false,
   "source": {
    "regulation": "PP 82 Tahun 2019",
    "attachment": "Lampiran I",
    "title": "Pembagian Kelompok Tingkat Risiko Lingkungan Kerja"
   },
   "alias_review_status": "draft_v0_3",
   "added_v0_3": [
    "minyak goreng",
    "pabrik minyak goreng",
    "margarin",
    "margarine",
    "lemak nabati",
    "shortening",
    "mentega putih",
    "refinery minyak goreng",
    "minyak curah",
    "migor"
   ],
   "removed_v0_3": []
  },
  {
   "id": "G3-027",
   "group": 3,
   "risk_label": "Sedang",
   "jkk_rate": 0.0089,
   "jkk_percent": "0.89%",
   "official_name": "Industri makanan lainnya",
   "sectors": [
    "industri_makanan"
   ],
   "activity": [
    "produksi"
   ],
   "aliases": [
    "pabrik makanan",
    "industri makanan",
    "produksi makanan",
    "frozen food",
    "makanan kemasan",
    "makanan olahan",
    "home industry makanan",
    "produksi makanan rumahan",
    "olahan makanan",
    "snack",
    "camilan",
    "cemilan",
    "makanan ringan",
    "keripik",
    "keripik singkong",
    "keripik pisang",
    "keripik tempe",
    "peyek",
    "rempeyek",
    "basreng",
    "makaroni kering",
    "makanan beku",
    "frozen",
    "dimsum frozen",
    "siomay frozen",
    "pempek frozen",
    "pempek",
    "sambal kemasan",
    "bumbu",
    "bumbu masak",
    "bumbu instan",
    "olahan rempah",
    "telur asin",
    "rendang kemasan",
    "kacang goreng",
    "kacang atom",
    "makanan bayi",
    "mpasi kemasan",
    "nata de coco",
    "santan kemasan",
    "kelapa parut kering",
    "madu kemasan",
    "pengemasan madu",
    "industri pangan",
    "pangan olahan",
    "produksi makanan kemasan",
    "pabrik snack"
   ],
   "aliases_inferred": [
    "pabrik pakan",
    "pakan ternak",
    "pakan ikan",
    "pelet ikan",
    "pakan unggas",
    "produksi pakan",
    "pabrik pelet"
   ],
   "negative_terms": [
    "restoran",
    "rumah makan",
    "warung makan",
    "dine in",
    "kedai"
   ],
   "ambiguity_tags": [
    "food_service_vs_manufacturing"
   ],
   "needs_confirmation": false,
   "source": {
    "regulation": "PP 82 Tahun 2019",
    "attachment": "Lampiran I",
    "title": "Pembagian Kelompok Tingkat Risiko Lingkungan Kerja"
   },
   "alias_review_status": "draft_v0_3",
   "added_v0_3": [
    "makanan olahan",
    "home industry makanan",
    "produksi makanan rumahan",
    "olahan makanan",
    "snack",
    "camilan",
    "cemilan",
    "makanan ringan",
    "keripik",
    "keripik singkong",
    "keripik pisang",
    "keripik tempe",
    "peyek",
    "rempeyek",
    "basreng",
    "makaroni kering",
    "makanan beku",
    "frozen",
    "dimsum frozen",
    "siomay frozen",
    "pempek frozen",
    "pempek",
    "sambal kemasan",
    "bumbu",
    "bumbu masak",
    "bumbu instan",
    "olahan rempah",
    "telur asin",
    "rendang kemasan",
    "kacang goreng",
    "kacang atom",
    "makanan bayi",
    "mpasi kemasan",
    "nata de coco",
    "santan kemasan",
    "kelapa parut kering",
    "madu kemasan",
    "pengemasan madu",
    "industri pangan",
    "pangan olahan",
    "produksi makanan kemasan",
    "pabrik snack"
   ],
   "removed_v0_3": []
  },
  {
   "id": "G3-028",
   "group": 3,
   "risk_label": "Sedang",
   "jkk_rate": 0.0089,
   "jkk_percent": "0.89%",
   "official_name": "Pabrik minuman dan alkohol",
   "sectors": [
    "industri_makanan"
   ],
   "activity": [
    "produksi"
   ],
   "aliases": [
    "minuman beralkohol",
    "minol",
    "pabrik minuman keras",
    "miras produksi",
    "tuak",
    "arak",
    "brem",
    "ciu",
    "sopi",
    "penyulingan arak",
    "minuman fermentasi"
   ],
   "aliases_inferred": [],
   "negative_terms": [
    "bar",
    "kedai"
   ],
   "ambiguity_tags": [],
   "needs_confirmation": false,
   "source": {
    "regulation": "PP 82 Tahun 2019",
    "attachment": "Lampiran I",
    "title": "Pembagian Kelompok Tingkat Risiko Lingkungan Kerja"
   },
   "alias_review_status": "draft_v0_3",
   "added_v0_3": [
    "minuman beralkohol",
    "minol",
    "pabrik minuman keras",
    "miras produksi",
    "tuak",
    "arak",
    "brem",
    "ciu",
    "sopi",
    "penyulingan arak",
    "minuman fermentasi"
   ],
   "removed_v0_3": []
  },
  {
   "id": "G3-029",
   "group": 3,
   "risk_label": "Sedang",
   "jkk_rate": 0.0089,
   "jkk_percent": "0.89%",
   "official_name": "Pabrik anggur",
   "sectors": [
    "industri_makanan"
   ],
   "activity": [
    "produksi"
   ],
   "aliases": [
    "wine",
    "winery",
    "pabrik wine",
    "pabrik anggur",
    "minuman anggur",
    "anggur minuman"
   ],
   "aliases_inferred": [],
   "negative_terms": [
    "kebun"
   ],
   "ambiguity_tags": [],
   "needs_confirmation": false,
   "source": {
    "regulation": "PP 82 Tahun 2019",
    "attachment": "Lampiran I",
    "title": "Pembagian Kelompok Tingkat Risiko Lingkungan Kerja"
   },
   "alias_review_status": "draft_v0_3",
   "added_v0_3": [
    "wine",
    "winery",
    "pabrik wine",
    "pabrik anggur",
    "minuman anggur",
    "anggur minuman"
   ],
   "removed_v0_3": []
  },
  {
   "id": "G3-030",
   "group": 3,
   "risk_label": "Sedang",
   "jkk_rate": 0.0089,
   "jkk_percent": "0.89%",
   "official_name": "Pabrik bir",
   "sectors": [
    "industri_makanan"
   ],
   "activity": [
    "produksi"
   ],
   "aliases": [
    "bir",
    "beer",
    "brewery",
    "pabrik bir",
    "craft beer",
    "microbrewery"
   ],
   "aliases_inferred": [],
   "negative_terms": [
    "bar",
    "pub"
   ],
   "ambiguity_tags": [],
   "needs_confirmation": false,
   "source": {
    "regulation": "PP 82 Tahun 2019",
    "attachment": "Lampiran I",
    "title": "Pembagian Kelompok Tingkat Risiko Lingkungan Kerja"
   },
   "alias_review_status": "draft_v0_3",
   "added_v0_3": [
    "bir",
    "beer",
    "brewery",
    "pabrik bir",
    "craft beer",
    "microbrewery"
   ],
   "removed_v0_3": []
  },
  {
   "id": "G3-031",
   "group": 3,
   "risk_label": "Sedang",
   "jkk_rate": 0.0089,
   "jkk_percent": "0.89%",
   "official_name": "Pabrik air soda, sari buah, dan minuman",
   "sectors": [
    "industri_makanan"
   ],
   "activity": [
    "produksi"
   ],
   "aliases": [
    "pabrik minuman",
    "minuman kemasan",
    "jus kemasan",
    "sari buah",
    "air soda",
    "air minum dalam kemasan",
    "amdk",
    "air mineral kemasan",
    "pabrik air mineral",
    "air mineral",
    "produksi air galon",
    "soft drink",
    "minuman ringan",
    "minuman berkarbonasi",
    "soda",
    "sirup",
    "pabrik sirup",
    "produksi jus",
    "minuman serbuk",
    "minuman sachet",
    "teh kemasan",
    "teh botol",
    "minuman botol",
    "susu kedelai kemasan",
    "minuman kesehatan",
    "minuman herbal kemasan",
    "kombucha",
    "minuman isotonik",
    "cold brew kemasan",
    "es teh kemasan",
    "produksi minuman"
   ],
   "aliases_inferred": [
    "depot air minum",
    "depot air isi ulang",
    "air isi ulang",
    "isi ulang air",
    "damiu",
    "air minum isi ulang",
    "depot air"
   ],
   "negative_terms": [
    "kedai",
    "cafe",
    "warung"
   ],
   "ambiguity_tags": [],
   "needs_confirmation": false,
   "source": {
    "regulation": "PP 82 Tahun 2019",
    "attachment": "Lampiran I",
    "title": "Pembagian Kelompok Tingkat Risiko Lingkungan Kerja"
   },
   "alias_review_status": "draft_v0_3",
   "added_v0_3": [
    "air minum dalam kemasan",
    "amdk",
    "air mineral kemasan",
    "pabrik air mineral",
    "air mineral",
    "produksi air galon",
    "soft drink",
    "minuman ringan",
    "minuman berkarbonasi",
    "soda",
    "sirup",
    "pabrik sirup",
    "produksi jus",
    "minuman serbuk",
    "minuman sachet",
    "teh kemasan",
    "teh botol",
    "minuman botol",
    "susu kedelai kemasan",
    "minuman kesehatan",
    "minuman herbal kemasan",
    "kombucha",
    "minuman isotonik",
    "cold brew kemasan",
    "es teh kemasan",
    "produksi minuman"
   ],
   "removed_v0_3": []
  },
  {
   "id": "G3-032",
   "group": 3,
   "risk_label": "Sedang",
   "jkk_rate": 0.0089,
   "jkk_percent": "0.89%",
   "official_name": "Pabrik pemintalan",
   "sectors": [
    "industri_tekstil"
   ],
   "activity": [
    "produksi"
   ],
   "aliases": [
    "pemintalan",
    "pemintalan benang",
    "benang",
    "pabrik benang",
    "spinning",
    "spinning mill",
    "pintal benang",
    "industri benang"
   ],
   "aliases_inferred": [],
   "negative_terms": [],
   "ambiguity_tags": [],
   "needs_confirmation": false,
   "source": {
    "regulation": "PP 82 Tahun 2019",
    "attachment": "Lampiran I",
    "title": "Pembagian Kelompok Tingkat Risiko Lingkungan Kerja"
   },
   "alias_review_status": "draft_v0_3",
   "added_v0_3": [
    "pemintalan",
    "pemintalan benang",
    "benang",
    "pabrik benang",
    "spinning",
    "spinning mill",
    "pintal benang",
    "industri benang"
   ],
   "removed_v0_3": []
  },
  {
   "id": "G3-033",
   "group": 3,
   "risk_label": "Sedang",
   "jkk_rate": 0.0089,
   "jkk_percent": "0.89%",
   "official_name": "Pemintalan tali sepatu dan perban",
   "sectors": [
    "industri_tekstil"
   ],
   "activity": [
    "produksi"
   ],
   "aliases": [
    "tali sepatu",
    "perban",
    "kasa perban",
    "kain kasa",
    "kasa medis",
    "produksi perban"
   ],
   "aliases_inferred": [],
   "negative_terms": [],
   "ambiguity_tags": [],
   "needs_confirmation": false,
   "source": {
    "regulation": "PP 82 Tahun 2019",
    "attachment": "Lampiran I",
    "title": "Pembagian Kelompok Tingkat Risiko Lingkungan Kerja"
   },
   "alias_review_status": "draft_v0_3",
   "added_v0_3": [
    "tali sepatu",
    "perban",
    "kasa perban",
    "kain kasa",
    "kasa medis",
    "produksi perban"
   ],
   "removed_v0_3": []
  },
  {
   "id": "G3-034",
   "group": 3,
   "risk_label": "Sedang",
   "jkk_rate": 0.0089,
   "jkk_percent": "0.89%",
   "official_name": "Pertenunan",
   "sectors": [
    "industri_tekstil"
   ],
   "activity": [
    "produksi"
   ],
   "aliases": [
    "tenun",
    "menenun",
    "penenun",
    "tenun ikat",
    "kain tenun",
    "songket",
    "ulos",
    "lurik",
    "tenun gedogan",
    "atbm",
    "alat tenun bukan mesin",
    "weaving",
    "pabrik kain",
    "industri kain",
    "pabrik sarung",
    "sarung tenun",
    "kain sarung",
    "tekstil tenun"
   ],
   "aliases_inferred": [],
   "negative_terms": [],
   "ambiguity_tags": [],
   "needs_confirmation": false,
   "source": {
    "regulation": "PP 82 Tahun 2019",
    "attachment": "Lampiran I",
    "title": "Pembagian Kelompok Tingkat Risiko Lingkungan Kerja"
   },
   "alias_review_status": "draft_v0_3",
   "added_v0_3": [
    "tenun",
    "menenun",
    "penenun",
    "tenun ikat",
    "kain tenun",
    "songket",
    "ulos",
    "lurik",
    "tenun gedogan",
    "atbm",
    "alat tenun bukan mesin",
    "weaving",
    "pabrik kain",
    "industri kain",
    "pabrik sarung",
    "sarung tenun",
    "kain sarung",
    "tekstil tenun"
   ],
   "removed_v0_3": []
  },
  {
   "id": "G3-035",
   "group": 3,
   "risk_label": "Sedang",
   "jkk_rate": 0.0089,
   "jkk_percent": "0.89%",
   "official_name": "Permadani",
   "sectors": [
    "industri_tekstil"
   ],
   "activity": [
    "produksi"
   ],
   "aliases": [
    "permadani",
    "karpet",
    "pembuatan karpet",
    "pabrik karpet",
    "ambal"
   ],
   "aliases_inferred": [
    "sajadah produksi",
    "produksi sajadah"
   ],
   "negative_terms": [
    "cuci",
    "laundry"
   ],
   "ambiguity_tags": [],
   "needs_confirmation": false,
   "source": {
    "regulation": "PP 82 Tahun 2019",
    "attachment": "Lampiran I",
    "title": "Pembagian Kelompok Tingkat Risiko Lingkungan Kerja"
   },
   "alias_review_status": "draft_v0_3",
   "added_v0_3": [
    "permadani",
    "karpet",
    "pembuatan karpet",
    "pabrik karpet",
    "ambal"
   ],
   "removed_v0_3": []
  },
  {
   "id": "G3-036",
   "group": 3,
   "risk_label": "Sedang",
   "jkk_rate": 0.0089,
   "jkk_percent": "0.89%",
   "official_name": "Pabrik kaos, kaos kaki, dan pabrik rajut",
   "sectors": [
    "industri_tekstil"
   ],
   "activity": [
    "produksi"
   ],
   "aliases": [
    "pabrik kaos",
    "kaos kaki",
    "kaus kaki",
    "rajut",
    "rajutan",
    "merajut",
    "knitting",
    "pabrik rajut",
    "sweater rajut",
    "kain rajut",
    "knit",
    "pabrik kaus"
   ],
   "aliases_inferred": [],
   "negative_terms": [
    "sablon",
    "konveksi"
   ],
   "ambiguity_tags": [],
   "needs_confirmation": false,
   "source": {
    "regulation": "PP 82 Tahun 2019",
    "attachment": "Lampiran I",
    "title": "Pembagian Kelompok Tingkat Risiko Lingkungan Kerja"
   },
   "alias_review_status": "draft_v0_3",
   "added_v0_3": [
    "pabrik kaos",
    "kaos kaki",
    "kaus kaki",
    "rajut",
    "rajutan",
    "merajut",
    "knitting",
    "pabrik rajut",
    "sweater rajut",
    "kain rajut",
    "knit",
    "pabrik kaus"
   ],
   "removed_v0_3": []
  },
  {
   "id": "G3-037",
   "group": 3,
   "risk_label": "Sedang",
   "jkk_rate": 0.0089,
   "jkk_percent": "0.89%",
   "official_name": "Pabrik tali temali (kabel, pukat, rami, sabut, dan lain-lain)",
   "sectors": [
    "industri_tekstil"
   ],
   "activity": [
    "produksi"
   ],
   "aliases": [
    "tali",
    "tali tambang",
    "tali temali",
    "tali rafia",
    "rafia",
    "pukat produksi",
    "pembuatan jaring ikan",
    "jaring ikan produksi",
    "sabut kelapa",
    "cocofiber",
    "coco fiber",
    "serabut kelapa",
    "cocopeat",
    "tali sabut",
    "tali rami",
    "tali plastik",
    "tali kapal",
    "kabel baja",
    "wire rope"
   ],
   "aliases_inferred": [],
   "negative_terms": [
    "tambang batu",
    "tambang pasir",
    "tambang emas",
    "tambang batubara"
   ],
   "ambiguity_tags": [],
   "needs_confirmation": false,
   "source": {
    "regulation": "PP 82 Tahun 2019",
    "attachment": "Lampiran I",
    "title": "Pembagian Kelompok Tingkat Risiko Lingkungan Kerja"
   },
   "alias_review_status": "draft_v0_3",
   "added_v0_3": [
    "tali",
    "tali tambang",
    "tali temali",
    "tali rafia",
    "rafia",
    "pukat produksi",
    "pembuatan jaring ikan",
    "jaring ikan produksi",
    "sabut kelapa",
    "cocofiber",
    "coco fiber",
    "serabut kelapa",
    "cocopeat",
    "tali sabut",
    "tali rami",
    "tali plastik",
    "tali kapal",
    "kabel baja",
    "wire rope"
   ],
   "removed_v0_3": []
  },
  {
   "id": "G3-038",
   "group": 3,
   "risk_label": "Sedang",
   "jkk_rate": 0.0089,
   "jkk_percent": "0.89%",
   "official_name": "Industri tekstil lainnya",
   "sectors": [
    "industri_tekstil"
   ],
   "activity": [
    "produksi"
   ],
   "aliases": [
    "tekstil",
    "industri tekstil",
    "pabrik tekstil",
    "batik",
    "batik tulis",
    "batik cap",
    "pengrajin batik",
    "pabrik batik",
    "printing batik",
    "pencelupan kain",
    "celup kain",
    "pewarnaan kain",
    "dyeing",
    "finishing kain",
    "printing kain",
    "printing tekstil",
    "bordir",
    "bordiran",
    "jasa bordir",
    "renda",
    "kain non woven",
    "non woven",
    "spunbond",
    "karung goni",
    "kapuk",
    "pengolahan kapuk"
   ],
   "aliases_inferred": [],
   "negative_terms": [],
   "ambiguity_tags": [],
   "needs_confirmation": false,
   "source": {
    "regulation": "PP 82 Tahun 2019",
    "attachment": "Lampiran I",
    "title": "Pembagian Kelompok Tingkat Risiko Lingkungan Kerja"
   },
   "alias_review_status": "draft_v0_3",
   "added_v0_3": [
    "tekstil",
    "industri tekstil",
    "pabrik tekstil",
    "batik",
    "batik tulis",
    "batik cap",
    "pengrajin batik",
    "pabrik batik",
    "printing batik",
    "pencelupan kain",
    "celup kain",
    "pewarnaan kain",
    "dyeing",
    "finishing kain",
    "printing kain",
    "printing tekstil",
    "bordir",
    "bordiran",
    "jasa bordir",
    "renda",
    "kain non woven",
    "non woven",
    "spunbond",
    "karung goni",
    "kapuk",
    "pengolahan kapuk"
   ],
   "removed_v0_3": []
  },
  {
   "id": "G3-039",
   "group": 3,
   "risk_label": "Sedang",
   "jkk_rate": 0.0089,
   "jkk_percent": "0.89%",
   "official_name": "Pabrik keperluan kaki, terkecuali sepatu karet, sandal plastik, dan lain-lain, termasuk pabrik barang plastik",
   "sectors": [
    "industri_tekstil",
    "industri_kimia"
   ],
   "activity": [
    "produksi"
   ],
   "aliases": [
    "pabrik sepatu",
    "produksi sepatu",
    "pengrajin sepatu",
    "sepatu kulit",
    "industri sepatu",
    "alas kaki",
    "industri alas kaki",
    "pabrik sandal",
    "sandal kulit",
    "sepatu olahraga produksi",
    "sepatu handmade",
    "pabrik plastik",
    "barang plastik"
   ],
   "aliases_inferred": [],
   "negative_terms": [
    "reparasi",
    "sol",
    "servis",
    "cuci"
   ],
   "ambiguity_tags": [],
   "needs_confirmation": false,
   "source": {
    "regulation": "PP 82 Tahun 2019",
    "attachment": "Lampiran I",
    "title": "Pembagian Kelompok Tingkat Risiko Lingkungan Kerja"
   },
   "alias_review_status": "draft_v0_3",
   "added_v0_3": [
    "pabrik sepatu",
    "produksi sepatu",
    "pengrajin sepatu",
    "sepatu kulit",
    "industri sepatu",
    "alas kaki",
    "industri alas kaki",
    "pabrik sandal",
    "sandal kulit",
    "sepatu olahraga produksi",
    "sepatu handmade",
    "pabrik plastik",
    "barang plastik"
   ],
   "removed_v0_3": []
  },
  {
   "id": "G3-040",
   "group": 3,
   "risk_label": "Sedang",
   "jkk_rate": 0.0089,
   "jkk_percent": "0.89%",
   "official_name": "Reparasi barang keperluan kaki",
   "sectors": [
    "bengkel_reparasi"
   ],
   "activity": [
    "reparasi"
   ],
   "aliases": [
    "sol sepatu",
    "tukang sol",
    "reparasi sepatu",
    "servis sepatu",
    "perbaikan sepatu",
    "jahit sepatu",
    "reparasi sandal",
    "shoe repair"
   ],
   "aliases_inferred": [
    "servis tas",
    "reparasi tas",
    "reparasi koper"
   ],
   "negative_terms": [
    "pabrik",
    "produksi",
    "cuci"
   ],
   "ambiguity_tags": [],
   "needs_confirmation": false,
   "source": {
    "regulation": "PP 82 Tahun 2019",
    "attachment": "Lampiran I",
    "title": "Pembagian Kelompok Tingkat Risiko Lingkungan Kerja"
   },
   "alias_review_status": "draft_v0_3",
   "added_v0_3": [
    "sol sepatu",
    "tukang sol",
    "reparasi sepatu",
    "servis sepatu",
    "perbaikan sepatu",
    "jahit sepatu",
    "reparasi sandal",
    "shoe repair"
   ],
   "removed_v0_3": []
  },
  {
   "id": "G3-041",
   "group": 3,
   "risk_label": "Sedang",
   "jkk_rate": 0.0089,
   "jkk_percent": "0.89%",
   "official_name": "Pabrik kayu gabus",
   "sectors": [
    "industri_kayu_kertas"
   ],
   "activity": [
    "produksi"
   ],
   "aliases": [
    "gabus",
    "kayu gabus",
    "cork"
   ],
   "aliases_inferred": [],
   "negative_terms": [
    "styrofoam",
    "ikan gabus"
   ],
   "ambiguity_tags": [],
   "needs_confirmation": false,
   "source": {
    "regulation": "PP 82 Tahun 2019",
    "attachment": "Lampiran I",
    "title": "Pembagian Kelompok Tingkat Risiko Lingkungan Kerja"
   },
   "alias_review_status": "draft_v0_3",
   "added_v0_3": [
    "gabus",
    "kayu gabus",
    "cork"
   ],
   "removed_v0_3": []
  },
  {
   "id": "G3-042",
   "group": 3,
   "risk_label": "Sedang",
   "jkk_rate": 0.0089,
   "jkk_percent": "0.89%",
   "official_name": "Penggergajian kayu",
   "sectors": [
    "industri_kayu_kertas"
   ],
   "activity": [
    "produksi"
   ],
   "aliases": [
    "sawmill",
    "penggergajian kayu",
    "gergaji kayu",
    "penggergajian",
    "gergajian",
    "somel",
    "shomil",
    "bansaw",
    "band saw",
    "kayu olahan",
    "kayu gergajian",
    "pengolahan kayu",
    "kilang kayu",
    "pengeringan kayu",
    "oven kayu",
    "kiln dry",
    "pabrik kayu"
   ],
   "aliases_inferred": [],
   "negative_terms": [
    "mebel",
    "furniture",
    "tebang",
    "penebangan"
   ],
   "ambiguity_tags": [],
   "needs_confirmation": false,
   "source": {
    "regulation": "PP 82 Tahun 2019",
    "attachment": "Lampiran I",
    "title": "Pembagian Kelompok Tingkat Risiko Lingkungan Kerja"
   },
   "alias_review_status": "draft_v0_3",
   "added_v0_3": [
    "penggergajian",
    "gergajian",
    "somel",
    "shomil",
    "bansaw",
    "band saw",
    "kayu olahan",
    "kayu gergajian",
    "pengolahan kayu",
    "kilang kayu",
    "pengeringan kayu",
    "oven kayu",
    "kiln dry",
    "pabrik kayu"
   ],
   "removed_v0_3": []
  },
  {
   "id": "G3-043",
   "group": 3,
   "risk_label": "Sedang",
   "jkk_rate": 0.0089,
   "jkk_percent": "0.89%",
   "official_name": "Pabrik peti dan gentong kayu",
   "sectors": [
    "industri_kayu_kertas"
   ],
   "activity": [
    "produksi"
   ],
   "aliases": [
    "peti kayu",
    "palet kayu",
    "pallet kayu",
    "pallet",
    "palet",
    "gentong kayu",
    "tong kayu",
    "peti mati",
    "peti jenazah",
    "packing kayu",
    "krat kayu"
   ],
   "aliases_inferred": [],
   "negative_terms": [],
   "ambiguity_tags": [],
   "needs_confirmation": false,
   "source": {
    "regulation": "PP 82 Tahun 2019",
    "attachment": "Lampiran I",
    "title": "Pembagian Kelompok Tingkat Risiko Lingkungan Kerja"
   },
   "alias_review_status": "draft_v0_3",
   "added_v0_3": [
    "peti kayu",
    "palet kayu",
    "pallet kayu",
    "pallet",
    "palet",
    "gentong kayu",
    "tong kayu",
    "peti mati",
    "peti jenazah",
    "packing kayu",
    "krat kayu"
   ],
   "removed_v0_3": []
  },
  {
   "id": "G3-044",
   "group": 3,
   "risk_label": "Sedang",
   "jkk_rate": 0.0089,
   "jkk_percent": "0.89%",
   "official_name": "Pembikinan barang kayu lainnya (triplek)",
   "sectors": [
    "industri_kayu_kertas"
   ],
   "activity": [
    "produksi"
   ],
   "aliases": [
    "triplek",
    "tripleks",
    "plywood",
    "kayu lapis",
    "multiplek",
    "veneer",
    "mdf",
    "particle board",
    "blockboard",
    "barang kayu",
    "kerajinan kayu",
    "ukiran kayu",
    "pengrajin kayu",
    "kusen",
    "kusen kayu",
    "pintu kayu",
    "jendela kayu",
    "kusen pintu",
    "moulding kayu",
    "parket",
    "lantai kayu",
    "barang dari kayu",
    "souvenir kayu",
    "patung kayu",
    "industri kayu",
    "sumpit kayu",
    "tusuk gigi"
   ],
   "aliases_inferred": [],
   "negative_terms": [
    "mebel",
    "tebang"
   ],
   "ambiguity_tags": [],
   "needs_confirmation": false,
   "source": {
    "regulation": "PP 82 Tahun 2019",
    "attachment": "Lampiran I",
    "title": "Pembagian Kelompok Tingkat Risiko Lingkungan Kerja"
   },
   "alias_review_status": "draft_v0_3",
   "added_v0_3": [
    "triplek",
    "tripleks",
    "plywood",
    "kayu lapis",
    "multiplek",
    "veneer",
    "mdf",
    "particle board",
    "blockboard",
    "barang kayu",
    "kerajinan kayu",
    "ukiran kayu",
    "pengrajin kayu",
    "kusen",
    "kusen kayu",
    "pintu kayu",
    "jendela kayu",
    "kusen pintu",
    "moulding kayu",
    "parket",
    "lantai kayu",
    "barang dari kayu",
    "souvenir kayu",
    "patung kayu",
    "industri kayu",
    "sumpit kayu",
    "tusuk gigi"
   ],
   "removed_v0_3": []
  },
  {
   "id": "G3-045",
   "group": 3,
   "risk_label": "Sedang",
   "jkk_rate": 0.0089,
   "jkk_percent": "0.89%",
   "official_name": "Pembikinan meubel dari rotan dan bambu",
   "sectors": [
    "industri_kayu_kertas"
   ],
   "activity": [
    "produksi"
   ],
   "aliases": [
    "rotan",
    "mebel rotan",
    "kursi rotan",
    "furniture rotan",
    "kerajinan rotan",
    "bambu",
    "mebel bambu",
    "kerajinan bambu",
    "anyaman",
    "anyaman bambu",
    "anyaman rotan",
    "anyaman pandan",
    "tikar pandan",
    "tikar",
    "keranjang rotan",
    "pengrajin rotan",
    "pengrajin bambu",
    "kerai bambu",
    "besek",
    "tampah",
    "sedotan bambu",
    "tusuk sate",
    "enceng gondok",
    "kerajinan enceng gondok",
    "seagrass"
   ],
   "aliases_inferred": [],
   "negative_terms": [
    "pengumpul",
    "hutan"
   ],
   "ambiguity_tags": [],
   "needs_confirmation": false,
   "source": {
    "regulation": "PP 82 Tahun 2019",
    "attachment": "Lampiran I",
    "title": "Pembagian Kelompok Tingkat Risiko Lingkungan Kerja"
   },
   "alias_review_status": "draft_v0_3",
   "added_v0_3": [
    "rotan",
    "mebel rotan",
    "kursi rotan",
    "furniture rotan",
    "kerajinan rotan",
    "bambu",
    "mebel bambu",
    "kerajinan bambu",
    "anyaman",
    "anyaman bambu",
    "anyaman rotan",
    "anyaman pandan",
    "tikar pandan",
    "tikar",
    "keranjang rotan",
    "pengrajin rotan",
    "pengrajin bambu",
    "kerai bambu",
    "besek",
    "tampah",
    "sedotan bambu",
    "tusuk sate",
    "enceng gondok",
    "kerajinan enceng gondok",
    "seagrass"
   ],
   "removed_v0_3": []
  },
  {
   "id": "G3-046",
   "group": 3,
   "risk_label": "Sedang",
   "jkk_rate": 0.0089,
   "jkk_percent": "0.89%",
   "official_name": "Pabrik meubel dari kayu dan bahan-bahan lainnya",
   "sectors": [
    "industri_kayu_kertas"
   ],
   "activity": [
    "produksi"
   ],
   "aliases": [
    "pabrik mebel",
    "mebel kayu",
    "furnitur kayu",
    "furniture kayu",
    "mebel",
    "pembuatan mebel",
    "produksi mebel",
    "pengrajin mebel",
    "tukang mebel",
    "perabot",
    "perabotan",
    "lemari",
    "kursi",
    "meja",
    "kitchen set",
    "sofa",
    "springbed",
    "spring bed",
    "kasur",
    "kasur busa",
    "mebel besi",
    "furniture besi",
    "meja kantor",
    "kursi kantor",
    "mebel sekolah",
    "mebel jepara",
    "industri mebel",
    "bengkel mebel",
    "interior furniture",
    "pembuatan kitchen set"
   ],
   "aliases_inferred": [],
   "negative_terms": [
    "sewa",
    "rental"
   ],
   "ambiguity_tags": [],
   "needs_confirmation": false,
   "source": {
    "regulation": "PP 82 Tahun 2019",
    "attachment": "Lampiran I",
    "title": "Pembagian Kelompok Tingkat Risiko Lingkungan Kerja"
   },
   "alias_review_status": "draft_v0_3",
   "added_v0_3": [
    "mebel",
    "pembuatan mebel",
    "produksi mebel",
    "pengrajin mebel",
    "tukang mebel",
    "perabot",
    "perabotan",
    "lemari",
    "kursi",
    "meja",
    "kitchen set",
    "sofa",
    "springbed",
    "spring bed",
    "kasur",
    "kasur busa",
    "mebel besi",
    "furniture besi",
    "meja kantor",
    "kursi kantor",
    "mebel sekolah",
    "mebel jepara",
    "industri mebel",
    "bengkel mebel",
    "interior furniture",
    "pembuatan kitchen set"
   ],
   "removed_v0_3": []
  },
  {
   "id": "G3-047",
   "group": 3,
   "risk_label": "Sedang",
   "jkk_rate": 0.0089,
   "jkk_percent": "0.89%",
   "official_name": "Pabrik kertas koran dan karton",
   "sectors": [
    "industri_kayu_kertas"
   ],
   "activity": [
    "produksi"
   ],
   "aliases": [
    "pabrik kertas",
    "pulp",
    "bubur kertas",
    "pulp dan kertas",
    "karton",
    "kertas koran",
    "daur ulang kertas",
    "kertas daur ulang",
    "industri kertas",
    "tisu gulung produksi"
   ],
   "aliases_inferred": [],
   "negative_terms": [
    "percetakan"
   ],
   "ambiguity_tags": [],
   "needs_confirmation": false,
   "source": {
    "regulation": "PP 82 Tahun 2019",
    "attachment": "Lampiran I",
    "title": "Pembagian Kelompok Tingkat Risiko Lingkungan Kerja"
   },
   "alias_review_status": "draft_v0_3",
   "added_v0_3": [
    "pabrik kertas",
    "pulp",
    "bubur kertas",
    "pulp dan kertas",
    "karton",
    "kertas koran",
    "daur ulang kertas",
    "kertas daur ulang",
    "industri kertas",
    "tisu gulung produksi"
   ],
   "removed_v0_3": []
  },
  {
   "id": "G3-048",
   "group": 3,
   "risk_label": "Sedang",
   "jkk_rate": 0.0089,
   "jkk_percent": "0.89%",
   "official_name": "Pabrik barang dari kertas koran dan karton",
   "sectors": [
    "industri_kayu_kertas"
   ],
   "activity": [
    "produksi"
   ],
   "aliases": [
    "kardus",
    "dus",
    "box karton",
    "kotak karton",
    "karton box",
    "corrugated box",
    "packaging kertas",
    "kemasan kertas",
    "kemasan karton",
    "paper bag",
    "tas kertas",
    "amplop",
    "buku tulis produksi",
    "kertas nasi",
    "paper cup",
    "gelas kertas",
    "tisu",
    "tissue",
    "dus makanan",
    "box makanan",
    "egg tray",
    "tube kertas",
    "core kertas",
    "kotak kemasan"
   ],
   "aliases_inferred": [],
   "negative_terms": [
    "percetakan"
   ],
   "ambiguity_tags": [],
   "needs_confirmation": false,
   "source": {
    "regulation": "PP 82 Tahun 2019",
    "attachment": "Lampiran I",
    "title": "Pembagian Kelompok Tingkat Risiko Lingkungan Kerja"
   },
   "alias_review_status": "draft_v0_3",
   "added_v0_3": [
    "kardus",
    "dus",
    "box karton",
    "kotak karton",
    "karton box",
    "corrugated box",
    "packaging kertas",
    "kemasan kertas",
    "kemasan karton",
    "paper bag",
    "tas kertas",
    "amplop",
    "buku tulis produksi",
    "kertas nasi",
    "paper cup",
    "gelas kertas",
    "tisu",
    "tissue",
    "dus makanan",
    "box makanan",
    "egg tray",
    "tube kertas",
    "core kertas",
    "kotak kemasan"
   ],
   "removed_v0_3": []
  },
  {
   "id": "G3-049",
   "group": 3,
   "risk_label": "Sedang",
   "jkk_rate": 0.0089,
   "jkk_percent": "0.89%",
   "official_name": "Perusahaan percetakan dan penerbitan",
   "sectors": [
    "industri_kayu_kertas"
   ],
   "activity": [
    "produksi"
   ],
   "aliases": [
    "percetakan",
    "printing",
    "penerbitan",
    "penerbit",
    "cetak",
    "jasa cetak",
    "digital printing",
    "percetakan digital",
    "offset",
    "cetak offset",
    "cetak spanduk",
    "spanduk",
    "banner",
    "baliho",
    "cetak undangan",
    "undangan",
    "cetak brosur",
    "stiker",
    "cetak stiker",
    "kartu nama",
    "fotokopi",
    "fotocopy",
    "foto copy",
    "jilid",
    "penjilidan",
    "cetak buku",
    "penerbitan buku",
    "penerbit buku",
    "koran",
    "surat kabar",
    "majalah",
    "tabloid",
    "percetakan koran",
    "cetak label",
    "label",
    "cetak kemasan",
    "percetakan buku",
    "advertising cetak"
   ],
   "aliases_inferred": [
    "sablon",
    "sablon gelas",
    "sablon plastik",
    "sablon spanduk",
    "reklame produksi"
   ],
   "negative_terms": [
    "kaos",
    "pakaian"
   ],
   "ambiguity_tags": [],
   "needs_confirmation": false,
   "source": {
    "regulation": "PP 82 Tahun 2019",
    "attachment": "Lampiran I",
    "title": "Pembagian Kelompok Tingkat Risiko Lingkungan Kerja"
   },
   "alias_review_status": "draft_v0_3",
   "added_v0_3": [
    "cetak",
    "jasa cetak",
    "digital printing",
    "percetakan digital",
    "offset",
    "cetak offset",
    "cetak spanduk",
    "spanduk",
    "banner",
    "baliho",
    "cetak undangan",
    "undangan",
    "cetak brosur",
    "stiker",
    "cetak stiker",
    "kartu nama",
    "fotokopi",
    "fotocopy",
    "foto copy",
    "jilid",
    "penjilidan",
    "cetak buku",
    "penerbitan buku",
    "penerbit buku",
    "koran",
    "surat kabar",
    "majalah",
    "tabloid",
    "percetakan koran",
    "cetak label",
    "label",
    "cetak kemasan",
    "percetakan buku",
    "advertising cetak"
   ],
   "removed_v0_3": []
  },
  {
   "id": "G3-050",
   "group": 3,
   "risk_label": "Sedang",
   "jkk_rate": 0.0089,
   "jkk_percent": "0.89%",
   "official_name": "Penyamakan kulit dan pekerjaan lanjutan",
   "sectors": [
    "industri_tekstil"
   ],
   "activity": [
    "produksi"
   ],
   "aliases": [
    "penyamakan kulit",
    "samak kulit",
    "tannery",
    "penyamak",
    "kulit samak",
    "pengolahan kulit",
    "pengawetan kulit",
    "finishing kulit",
    "industri kulit",
    "kulit mentah"
   ],
   "aliases_inferred": [],
   "negative_terms": [
    "kerupuk"
   ],
   "ambiguity_tags": [],
   "needs_confirmation": false,
   "source": {
    "regulation": "PP 82 Tahun 2019",
    "attachment": "Lampiran I",
    "title": "Pembagian Kelompok Tingkat Risiko Lingkungan Kerja"
   },
   "alias_review_status": "draft_v0_3",
   "added_v0_3": [
    "penyamakan kulit",
    "samak kulit",
    "tannery",
    "penyamak",
    "kulit samak",
    "pengolahan kulit",
    "pengawetan kulit",
    "finishing kulit",
    "industri kulit",
    "kulit mentah"
   ],
   "removed_v0_3": []
  },
  {
   "id": "G3-051",
   "group": 3,
   "risk_label": "Sedang",
   "jkk_rate": 0.0089,
   "jkk_percent": "0.89%",
   "official_name": "Pabrik barang dari kulit seperti kopor, tas, dan lainnya",
   "sectors": [
    "industri_tekstil"
   ],
   "activity": [
    "produksi"
   ],
   "aliases": [
    "tas",
    "pabrik tas",
    "produksi tas",
    "pengrajin tas",
    "tas kulit",
    "dompet kulit",
    "dompet",
    "koper",
    "kopor",
    "jaket kulit",
    "sarung tangan kulit",
    "kerajinan kulit",
    "leather goods",
    "ransel produksi",
    "tas sekolah produksi",
    "barang kulit",
    "konveksi tas",
    "tas kanvas"
   ],
   "aliases_inferred": [],
   "negative_terms": [
    "reparasi",
    "servis"
   ],
   "ambiguity_tags": [],
   "needs_confirmation": false,
   "source": {
    "regulation": "PP 82 Tahun 2019",
    "attachment": "Lampiran I",
    "title": "Pembagian Kelompok Tingkat Risiko Lingkungan Kerja"
   },
   "alias_review_status": "draft_v0_3",
   "added_v0_3": [
    "tas",
    "pabrik tas",
    "produksi tas",
    "pengrajin tas",
    "tas kulit",
    "dompet kulit",
    "dompet",
    "koper",
    "kopor",
    "jaket kulit",
    "sarung tangan kulit",
    "kerajinan kulit",
    "leather goods",
    "ransel produksi",
    "tas sekolah produksi",
    "barang kulit",
    "konveksi tas",
    "tas kanvas"
   ],
   "removed_v0_3": []
  },
  {
   "id": "G3-052",
   "group": 3,
   "risk_label": "Sedang",
   "jkk_rate": 0.0089,
   "jkk_percent": "0.89%",
   "official_name": "Remiling karet",
   "sectors": [
    "industri_kimia"
   ],
   "activity": [
    "produksi"
   ],
   "aliases": [
    "remiling",
    "remilling karet",
    "remiling karet",
    "crumb rubber",
    "karet remah",
    "pengolahan karet",
    "pabrik karet remah",
    "pengolahan lateks",
    "lateks pekat",
    "ribbed smoked sheet",
    "rss",
    "slab karet",
    "bokar",
    "karet mentah olahan"
   ],
   "aliases_inferred": [],
   "negative_terms": [
    "kebun",
    "perkebunan",
    "sadap",
    "penyadap"
   ],
   "ambiguity_tags": [],
   "needs_confirmation": false,
   "source": {
    "regulation": "PP 82 Tahun 2019",
    "attachment": "Lampiran I",
    "title": "Pembagian Kelompok Tingkat Risiko Lingkungan Kerja"
   },
   "alias_review_status": "draft_v0_3",
   "added_v0_3": [
    "remiling",
    "remilling karet",
    "remiling karet",
    "crumb rubber",
    "karet remah",
    "pengolahan karet",
    "pabrik karet remah",
    "pengolahan lateks",
    "lateks pekat",
    "ribbed smoked sheet",
    "rss",
    "slab karet",
    "bokar",
    "karet mentah olahan"
   ],
   "removed_v0_3": []
  },
  {
   "id": "G3-053",
   "group": 3,
   "risk_label": "Sedang",
   "jkk_rate": 0.0089,
   "jkk_percent": "0.89%",
   "official_name": "Pabrik barang dari karet (ban kendaraan luar dan dalam, mainan anak-anak, dan lain-lain)",
   "sectors": [
    "industri_kimia"
   ],
   "activity": [
    "produksi"
   ],
   "aliases": [
    "barang karet",
    "barang dari karet",
    "pabrik ban",
    "ban dalam",
    "ban luar",
    "produksi ban",
    "sandal jepit karet",
    "sandal karet",
    "sepatu karet",
    "sarung tangan karet",
    "karet gelang",
    "seal karet",
    "o ring",
    "selang karet",
    "rubber part",
    "sparepart karet",
    "mainan karet",
    "balon",
    "pabrik balon",
    "karet gasket",
    "industri karet"
   ],
   "aliases_inferred": [],
   "negative_terms": [
    "tambal ban",
    "vulkanisir",
    "kebun"
   ],
   "ambiguity_tags": [],
   "needs_confirmation": false,
   "source": {
    "regulation": "PP 82 Tahun 2019",
    "attachment": "Lampiran I",
    "title": "Pembagian Kelompok Tingkat Risiko Lingkungan Kerja"
   },
   "alias_review_status": "draft_v0_3",
   "added_v0_3": [
    "barang karet",
    "barang dari karet",
    "pabrik ban",
    "ban dalam",
    "ban luar",
    "produksi ban",
    "sandal jepit karet",
    "sandal karet",
    "sepatu karet",
    "sarung tangan karet",
    "karet gelang",
    "seal karet",
    "o ring",
    "selang karet",
    "rubber part",
    "sparepart karet",
    "mainan karet",
    "balon",
    "pabrik balon",
    "karet gasket",
    "industri karet"
   ],
   "removed_v0_3": []
  },
  {
   "id": "G3-054",
   "group": 3,
   "risk_label": "Sedang",
   "jkk_rate": 0.0089,
   "jkk_percent": "0.89%",
   "official_name": "Perusahaan vulkanisir",
   "sectors": [
    "industri_kimia",
    "bengkel_reparasi"
   ],
   "activity": [
    "produksi",
    "reparasi"
   ],
   "aliases": [
    "vulkanisir",
    "vulkanisir ban",
    "vulkanisasi",
    "retread",
    "ban vulkanisir",
    "vulkanisir ban truk",
    "cangkok ban"
   ],
   "aliases_inferred": [],
   "negative_terms": [],
   "ambiguity_tags": [],
   "needs_confirmation": false,
   "source": {
    "regulation": "PP 82 Tahun 2019",
    "attachment": "Lampiran I",
    "title": "Pembagian Kelompok Tingkat Risiko Lingkungan Kerja"
   },
   "alias_review_status": "draft_v0_3",
   "added_v0_3": [
    "vulkanisasi",
    "retread",
    "ban vulkanisir",
    "vulkanisir ban truk",
    "cangkok ban"
   ],
   "removed_v0_3": []
  },
  {
   "id": "G3-055",
   "group": 3,
   "risk_label": "Sedang",
   "jkk_rate": 0.0089,
   "jkk_percent": "0.89%",
   "official_name": "Pabrik garam",
   "sectors": [
    "industri_makanan"
   ],
   "activity": [
    "produksi"
   ],
   "aliases": [
    "garam",
    "pabrik garam",
    "garam beryodium",
    "garam konsumsi",
    "garam industri",
    "pengolahan garam",
    "iodisasi garam",
    "garam halus",
    "produksi garam"
   ],
   "aliases_inferred": [
    "tambak garam",
    "petani garam",
    "ladang garam",
    "usaha garam",
    "garam krosok",
    "petambak garam"
   ],
   "negative_terms": [],
   "ambiguity_tags": [],
   "needs_confirmation": false,
   "source": {
    "regulation": "PP 82 Tahun 2019",
    "attachment": "Lampiran I",
    "title": "Pembagian Kelompok Tingkat Risiko Lingkungan Kerja"
   },
   "alias_review_status": "draft_v0_3",
   "added_v0_3": [
    "garam",
    "pabrik garam",
    "garam beryodium",
    "garam konsumsi",
    "garam industri",
    "pengolahan garam",
    "iodisasi garam",
    "garam halus",
    "produksi garam"
   ],
   "removed_v0_3": []
  },
  {
   "id": "G3-056",
   "group": 3,
   "risk_label": "Sedang",
   "jkk_rate": 0.0089,
   "jkk_percent": "0.89%",
   "official_name": "Pabrik zat asam arang dan sejenisnya",
   "sectors": [
    "industri_kimia"
   ],
   "activity": [
    "produksi"
   ],
   "aliases": [
    "zat asam arang",
    "co2",
    "karbondioksida",
    "karbon dioksida",
    "gas co2",
    "dry ice",
    "es kering",
    "pabrik co2"
   ],
   "aliases_inferred": [],
   "negative_terms": [
    "oksigen"
   ],
   "ambiguity_tags": [],
   "needs_confirmation": false,
   "source": {
    "regulation": "PP 82 Tahun 2019",
    "attachment": "Lampiran I",
    "title": "Pembagian Kelompok Tingkat Risiko Lingkungan Kerja"
   },
   "alias_review_status": "draft_v0_3",
   "added_v0_3": [
    "zat asam arang",
    "co2",
    "karbondioksida",
    "karbon dioksida",
    "gas co2",
    "dry ice",
    "es kering",
    "pabrik co2"
   ],
   "removed_v0_3": []
  },
  {
   "id": "G3-057",
   "group": 3,
   "risk_label": "Sedang",
   "jkk_rate": 0.0089,
   "jkk_percent": "0.89%",
   "official_name": "Industri kimia pokok lainnya (celupan warna bahan sintetis, dan lain-lain)",
   "sectors": [
    "industri_kimia"
   ],
   "activity": [
    "produksi"
   ],
   "aliases": [
    "kimia",
    "bahan kimia",
    "industri kimia",
    "pabrik kimia",
    "kimia dasar",
    "zat warna",
    "pewarna",
    "pewarna tekstil",
    "pewarna sintetis",
    "pigmen",
    "resin sintetis",
    "bahan sintetis",
    "serat sintetis",
    "soda kaustik",
    "chemical"
   ],
   "aliases_inferred": [],
   "negative_terms": [],
   "ambiguity_tags": [],
   "needs_confirmation": false,
   "source": {
    "regulation": "PP 82 Tahun 2019",
    "attachment": "Lampiran I",
    "title": "Pembagian Kelompok Tingkat Risiko Lingkungan Kerja"
   },
   "alias_review_status": "draft_v0_3",
   "added_v0_3": [
    "kimia",
    "bahan kimia",
    "industri kimia",
    "pabrik kimia",
    "kimia dasar",
    "zat warna",
    "pewarna",
    "pewarna tekstil",
    "pewarna sintetis",
    "pigmen",
    "resin sintetis",
    "bahan sintetis",
    "serat sintetis",
    "soda kaustik",
    "chemical"
   ],
   "removed_v0_3": []
  },
  {
   "id": "G3-058",
   "group": 3,
   "risk_label": "Sedang",
   "jkk_rate": 0.0089,
   "jkk_percent": "0.89%",
   "official_name": "Terpentin dan damar",
   "sectors": [
    "industri_kimia"
   ],
   "activity": [
    "produksi"
   ],
   "aliases": [
    "terpentin",
    "gondorukem",
    "gondo rukem",
    "pengolahan getah pinus",
    "pengolahan damar",
    "damar",
    "resin alam",
    "kopal",
    "minyak terpentin"
   ],
   "aliases_inferred": [],
   "negative_terms": [
    "sadap",
    "pengumpul"
   ],
   "ambiguity_tags": [],
   "needs_confirmation": false,
   "source": {
    "regulation": "PP 82 Tahun 2019",
    "attachment": "Lampiran I",
    "title": "Pembagian Kelompok Tingkat Risiko Lingkungan Kerja"
   },
   "alias_review_status": "draft_v0_3",
   "added_v0_3": [
    "terpentin",
    "gondorukem",
    "gondo rukem",
    "pengolahan getah pinus",
    "pengolahan damar",
    "damar",
    "resin alam",
    "kopal",
    "minyak terpentin"
   ],
   "removed_v0_3": []
  },
  {
   "id": "G3-059",
   "group": 3,
   "risk_label": "Sedang",
   "jkk_rate": 0.0089,
   "jkk_percent": "0.89%",
   "official_name": "Industri minyak kelapa",
   "sectors": [
    "industri_makanan"
   ],
   "activity": [
    "produksi"
   ],
   "aliases": [
    "minyak kelapa",
    "kopra",
    "pengolahan kopra",
    "vco",
    "virgin coconut oil",
    "minyak klentik",
    "pengolahan kelapa",
    "industri kelapa"
   ],
   "aliases_inferred": [],
   "negative_terms": [
    "kebun",
    "perkebunan",
    "sawit"
   ],
   "ambiguity_tags": [],
   "needs_confirmation": false,
   "source": {
    "regulation": "PP 82 Tahun 2019",
    "attachment": "Lampiran I",
    "title": "Pembagian Kelompok Tingkat Risiko Lingkungan Kerja"
   },
   "alias_review_status": "draft_v0_3",
   "added_v0_3": [
    "minyak kelapa",
    "kopra",
    "pengolahan kopra",
    "vco",
    "virgin coconut oil",
    "minyak klentik",
    "pengolahan kelapa",
    "industri kelapa"
   ],
   "removed_v0_3": []
  },
  {
   "id": "G3-060",
   "group": 3,
   "risk_label": "Sedang",
   "jkk_rate": 0.0089,
   "jkk_percent": "0.89%",
   "official_name": "Industri minyak kelapa sawit",
   "sectors": [
    "industri_makanan"
   ],
   "activity": [
    "produksi"
   ],
   "aliases": [
    "pabrik kelapa sawit",
    "pks",
    "pabrik sawit",
    "cpo",
    "crude palm oil",
    "minyak sawit",
    "minyak kelapa sawit",
    "pengolahan sawit",
    "pengolahan tbs",
    "palm kernel oil",
    "pko",
    "kernel sawit",
    "refinery sawit",
    "pabrik minyak sawit"
   ],
   "aliases_inferred": [],
   "negative_terms": [
    "kebun",
    "perkebunan",
    "plasma",
    "petani",
    "ram",
    "peron"
   ],
   "ambiguity_tags": [],
   "needs_confirmation": false,
   "source": {
    "regulation": "PP 82 Tahun 2019",
    "attachment": "Lampiran I",
    "title": "Pembagian Kelompok Tingkat Risiko Lingkungan Kerja"
   },
   "alias_review_status": "draft_v0_3",
   "added_v0_3": [
    "pabrik kelapa sawit",
    "pks",
    "pabrik sawit",
    "cpo",
    "crude palm oil",
    "minyak sawit",
    "minyak kelapa sawit",
    "pengolahan sawit",
    "pengolahan tbs",
    "palm kernel oil",
    "pko",
    "kernel sawit",
    "refinery sawit",
    "pabrik minyak sawit"
   ],
   "removed_v0_3": []
  },
  {
   "id": "G3-061",
   "group": 3,
   "risk_label": "Sedang",
   "jkk_rate": 0.0089,
   "jkk_percent": "0.89%",
   "official_name": "Industri minyak dan gemuk dari tumbuh-tumbuhan",
   "sectors": [
    "industri_kimia",
    "industri_makanan"
   ],
   "activity": [
    "produksi"
   ],
   "aliases": [
    "minyak nabati",
    "minyak atsiri",
    "penyulingan minyak atsiri",
    "minyak nilam",
    "penyulingan nilam",
    "minyak serai",
    "minyak kayu putih",
    "penyulingan kayu putih",
    "minyak cengkeh",
    "essential oil",
    "minyak jarak",
    "minyak kemiri",
    "minyak wijen",
    "minyak kacang",
    "penyulingan minyak",
    "suling minyak",
    "penyulingan"
   ],
   "aliases_inferred": [
    "biodiesel",
    "pabrik biodiesel"
   ],
   "negative_terms": [
    "kebun",
    "perkebunan",
    "minyak goreng"
   ],
   "ambiguity_tags": [],
   "needs_confirmation": false,
   "source": {
    "regulation": "PP 82 Tahun 2019",
    "attachment": "Lampiran I",
    "title": "Pembagian Kelompok Tingkat Risiko Lingkungan Kerja"
   },
   "alias_review_status": "draft_v0_3",
   "added_v0_3": [
    "minyak nabati",
    "minyak atsiri",
    "penyulingan minyak atsiri",
    "minyak nilam",
    "penyulingan nilam",
    "minyak serai",
    "minyak kayu putih",
    "penyulingan kayu putih",
    "minyak cengkeh",
    "essential oil",
    "minyak jarak",
    "minyak kemiri",
    "minyak wijen",
    "minyak kacang",
    "penyulingan minyak",
    "suling minyak",
    "penyulingan"
   ],
   "removed_v0_3": []
  },
  {
   "id": "G3-062",
   "group": 3,
   "risk_label": "Sedang",
   "jkk_rate": 0.0089,
   "jkk_percent": "0.89%",
   "official_name": "Minyak dan gemuk dari hewan",
   "sectors": [
    "industri_kimia",
    "industri_makanan"
   ],
   "activity": [
    "produksi"
   ],
   "aliases": [
    "minyak hewani",
    "lemak hewan",
    "gemuk hewan",
    "tallow",
    "minyak ikan produksi",
    "lemak sapi",
    "rendering lemak"
   ],
   "aliases_inferred": [],
   "negative_terms": [],
   "ambiguity_tags": [],
   "needs_confirmation": false,
   "source": {
    "regulation": "PP 82 Tahun 2019",
    "attachment": "Lampiran I",
    "title": "Pembagian Kelompok Tingkat Risiko Lingkungan Kerja"
   },
   "alias_review_status": "draft_v0_3",
   "added_v0_3": [
    "minyak hewani",
    "lemak hewan",
    "gemuk hewan",
    "tallow",
    "minyak ikan produksi",
    "lemak sapi",
    "rendering lemak"
   ],
   "removed_v0_3": []
  },
  {
   "id": "G3-063",
   "group": 3,
   "risk_label": "Sedang",
   "jkk_rate": 0.0089,
   "jkk_percent": "0.89%",
   "official_name": "Pabrik sabun",
   "sectors": [
    "industri_kimia"
   ],
   "activity": [
    "produksi"
   ],
   "aliases": [
    "pabrik sabun",
    "produksi sabun",
    "sabun",
    "sabun mandi",
    "sabun cuci",
    "deterjen",
    "detergen",
    "sabun cair",
    "sabun batang",
    "sabun cuci piring",
    "cairan pembersih",
    "pembersih lantai",
    "karbol",
    "pewangi pakaian",
    "softener",
    "sabun herbal",
    "sabun handmade",
    "produksi deterjen"
   ],
   "aliases_inferred": [],
   "negative_terms": [
    "laundry"
   ],
   "ambiguity_tags": [],
   "needs_confirmation": false,
   "source": {
    "regulation": "PP 82 Tahun 2019",
    "attachment": "Lampiran I",
    "title": "Pembagian Kelompok Tingkat Risiko Lingkungan Kerja"
   },
   "alias_review_status": "draft_v0_3",
   "added_v0_3": [
    "sabun",
    "sabun mandi",
    "sabun cuci",
    "deterjen",
    "detergen",
    "sabun cair",
    "sabun batang",
    "sabun cuci piring",
    "cairan pembersih",
    "pembersih lantai",
    "karbol",
    "pewangi pakaian",
    "softener",
    "sabun herbal",
    "sabun handmade",
    "produksi deterjen"
   ],
   "removed_v0_3": []
  },
  {
   "id": "G3-064",
   "group": 3,
   "risk_label": "Sedang",
   "jkk_rate": 0.0089,
   "jkk_percent": "0.89%",
   "official_name": "Pabrik obat/farmasi",
   "sectors": [
    "industri_kimia"
   ],
   "activity": [
    "produksi"
   ],
   "aliases": [
    "farmasi",
    "pabrik obat",
    "industri obat",
    "industri farmasi",
    "jamu",
    "pabrik jamu",
    "industri jamu",
    "obat tradisional",
    "iot",
    "ukot",
    "obat herbal",
    "herbal produksi",
    "suplemen",
    "pabrik suplemen",
    "vitamin produksi",
    "nutrasetikal",
    "vaksin",
    "pabrik vaksin",
    "obat hewan produksi",
    "farmasi veteriner",
    "produksi obat",
    "jamu gendong produksi"
   ],
   "aliases_inferred": [],
   "negative_terms": [
    "apotek",
    "toko obat",
    "pbf",
    "klinik"
   ],
   "ambiguity_tags": [],
   "needs_confirmation": false,
   "source": {
    "regulation": "PP 82 Tahun 2019",
    "attachment": "Lampiran I",
    "title": "Pembagian Kelompok Tingkat Risiko Lingkungan Kerja"
   },
   "alias_review_status": "draft_v0_3",
   "added_v0_3": [
    "industri farmasi",
    "jamu",
    "pabrik jamu",
    "industri jamu",
    "obat tradisional",
    "iot",
    "ukot",
    "obat herbal",
    "herbal produksi",
    "suplemen",
    "pabrik suplemen",
    "vitamin produksi",
    "nutrasetikal",
    "vaksin",
    "pabrik vaksin",
    "obat hewan produksi",
    "farmasi veteriner",
    "produksi obat",
    "jamu gendong produksi"
   ],
   "removed_v0_3": []
  },
  {
   "id": "G3-065",
   "group": 3,
   "risk_label": "Sedang",
   "jkk_rate": 0.0089,
   "jkk_percent": "0.89%",
   "official_name": "Pabrik wangi-wangian dan kecantikan/kosmetik",
   "sectors": [
    "industri_kimia"
   ],
   "activity": [
    "produksi"
   ],
   "aliases": [
    "pabrik kosmetik",
    "wangi-wangian",
    "skincare produksi",
    "maklon kosmetik",
    "maklon skincare",
    "produksi kosmetik",
    "produksi skincare",
    "pabrik skincare",
    "industri kosmetik",
    "pabrik parfum",
    "produksi parfum",
    "minyak wangi produksi",
    "shampo",
    "sampo",
    "lotion",
    "body lotion",
    "lipstik",
    "bedak",
    "pasta gigi",
    "deodoran",
    "produksi sabun wajah",
    "kosmetik halal produksi",
    "maklon"
   ],
   "aliases_inferred": [
    "hand sanitizer"
   ],
   "negative_terms": [
    "klinik",
    "salon"
   ],
   "ambiguity_tags": [],
   "needs_confirmation": false,
   "source": {
    "regulation": "PP 82 Tahun 2019",
    "attachment": "Lampiran I",
    "title": "Pembagian Kelompok Tingkat Risiko Lingkungan Kerja"
   },
   "alias_review_status": "draft_v0_3",
   "added_v0_3": [
    "skincare produksi",
    "maklon kosmetik",
    "maklon skincare",
    "produksi kosmetik",
    "produksi skincare",
    "pabrik skincare",
    "industri kosmetik",
    "pabrik parfum",
    "produksi parfum",
    "minyak wangi produksi",
    "shampo",
    "sampo",
    "lotion",
    "body lotion",
    "lipstik",
    "bedak",
    "pasta gigi",
    "deodoran",
    "produksi sabun wajah",
    "kosmetik halal produksi",
    "maklon"
   ],
   "removed_v0_3": [
    "kosmetik",
    "parfum"
   ]
  },
  {
   "id": "G3-066",
   "group": 3,
   "risk_label": "Sedang",
   "jkk_rate": 0.0089,
   "jkk_percent": "0.89%",
   "official_name": "Pabrik barang untuk mengkilap",
   "sectors": [
    "industri_kimia"
   ],
   "activity": [
    "produksi"
   ],
   "aliases": [
    "semir",
    "semir sepatu",
    "pengkilap",
    "polish",
    "cairan pengkilap",
    "car wax",
    "pengkilap ban",
    "pengkilap body",
    "pengkilap lantai",
    "wax"
   ],
   "aliases_inferred": [],
   "negative_terms": [
    "poles mobil",
    "salon mobil",
    "cuci"
   ],
   "ambiguity_tags": [],
   "needs_confirmation": false,
   "source": {
    "regulation": "PP 82 Tahun 2019",
    "attachment": "Lampiran I",
    "title": "Pembagian Kelompok Tingkat Risiko Lingkungan Kerja"
   },
   "alias_review_status": "draft_v0_3",
   "added_v0_3": [
    "semir",
    "semir sepatu",
    "pengkilap",
    "polish",
    "cairan pengkilap",
    "car wax",
    "pengkilap ban",
    "pengkilap body",
    "pengkilap lantai",
    "wax"
   ],
   "removed_v0_3": []
  },
  {
   "id": "G3-067",
   "group": 3,
   "risk_label": "Sedang",
   "jkk_rate": 0.0089,
   "jkk_percent": "0.89%",
   "official_name": "Pabrik kimia lainnya (lilin gambar, obat nyamuk, pestisida, dan lain-lain)",
   "sectors": [
    "industri_kimia"
   ],
   "activity": [
    "produksi"
   ],
   "aliases": [
    "obat nyamuk",
    "obat nyamuk bakar",
    "pestisida",
    "insektisida",
    "herbisida",
    "fungisida",
    "obat hama",
    "racun tikus",
    "rodentisida",
    "lilin gambar",
    "krayon",
    "crayon",
    "lilin",
    "lilin aromaterapi",
    "disinfektan",
    "kapur barus",
    "kamper",
    "pengharum ruangan",
    "bahan kimia rumah tangga",
    "biopestisida",
    "pestisida nabati"
   ],
   "aliases_inferred": [],
   "negative_terms": [],
   "ambiguity_tags": [],
   "needs_confirmation": false,
   "source": {
    "regulation": "PP 82 Tahun 2019",
    "attachment": "Lampiran I",
    "title": "Pembagian Kelompok Tingkat Risiko Lingkungan Kerja"
   },
   "alias_review_status": "draft_v0_3",
   "added_v0_3": [
    "obat nyamuk",
    "obat nyamuk bakar",
    "pestisida",
    "insektisida",
    "herbisida",
    "fungisida",
    "obat hama",
    "racun tikus",
    "rodentisida",
    "lilin gambar",
    "krayon",
    "crayon",
    "lilin",
    "lilin aromaterapi",
    "disinfektan",
    "kapur barus",
    "kamper",
    "pengharum ruangan",
    "bahan kimia rumah tangga",
    "biopestisida",
    "pestisida nabati"
   ],
   "removed_v0_3": []
  },
  {
   "id": "G3-068",
   "group": 3,
   "risk_label": "Sedang",
   "jkk_rate": 0.0089,
   "jkk_percent": "0.89%",
   "official_name": "Distribusi gas (cokes oven)",
   "sectors": [
    "energi_utilitas"
   ],
   "activity": [
    "utilitas"
   ],
   "aliases": [
    "gas kokas",
    "cokes",
    "kokas",
    "coke oven",
    "gas kota kokas",
    "distribusi gas kokas"
   ],
   "aliases_inferred": [],
   "negative_terms": [],
   "ambiguity_tags": [],
   "needs_confirmation": false,
   "source": {
    "regulation": "PP 82 Tahun 2019",
    "attachment": "Lampiran I",
    "title": "Pembagian Kelompok Tingkat Risiko Lingkungan Kerja"
   },
   "alias_review_status": "draft_v0_3",
   "added_v0_3": [
    "gas kokas",
    "cokes",
    "kokas",
    "coke oven",
    "gas kota kokas",
    "distribusi gas kokas"
   ],
   "removed_v0_3": []
  },
  {
   "id": "G3-069",
   "group": 3,
   "risk_label": "Sedang",
   "jkk_rate": 0.0089,
   "jkk_percent": "0.89%",
   "official_name": "Pabrik bahan bangunan dari tanah liat",
   "sectors": [
    "industri_mineral"
   ],
   "activity": [
    "produksi"
   ],
   "aliases": [
    "bahan bangunan tanah liat",
    "terakota",
    "roster",
    "loster",
    "ubin terakota",
    "ubin tanah liat",
    "roster tanah liat"
   ],
   "aliases_inferred": [],
   "negative_terms": [
    "galian",
    "tambang"
   ],
   "ambiguity_tags": [],
   "needs_confirmation": false,
   "source": {
    "regulation": "PP 82 Tahun 2019",
    "attachment": "Lampiran I",
    "title": "Pembagian Kelompok Tingkat Risiko Lingkungan Kerja"
   },
   "alias_review_status": "draft_v0_3",
   "added_v0_3": [
    "bahan bangunan tanah liat",
    "terakota",
    "roster",
    "loster",
    "ubin terakota",
    "ubin tanah liat",
    "roster tanah liat"
   ],
   "removed_v0_3": []
  },
  {
   "id": "G3-070",
   "group": 3,
   "risk_label": "Sedang",
   "jkk_rate": 0.0089,
   "jkk_percent": "0.89%",
   "official_name": "Pabrik gelas dan barang dari gelas",
   "sectors": [
    "industri_mineral"
   ],
   "activity": [
    "produksi"
   ],
   "aliases": [
    "pabrik kaca",
    "gelas kaca",
    "barang kaca",
    "botol kaca",
    "kaca lembaran",
    "kaca patri",
    "kerajinan kaca",
    "cermin produksi",
    "tempered glass",
    "industri kaca",
    "pabrik gelas"
   ],
   "aliases_inferred": [],
   "negative_terms": [
    "film",
    "pasang"
   ],
   "ambiguity_tags": [],
   "needs_confirmation": false,
   "source": {
    "regulation": "PP 82 Tahun 2019",
    "attachment": "Lampiran I",
    "title": "Pembagian Kelompok Tingkat Risiko Lingkungan Kerja"
   },
   "alias_review_status": "draft_v0_3",
   "added_v0_3": [
    "pabrik kaca",
    "gelas kaca",
    "barang kaca",
    "botol kaca",
    "kaca lembaran",
    "kaca patri",
    "kerajinan kaca",
    "cermin produksi",
    "tempered glass",
    "industri kaca",
    "pabrik gelas"
   ],
   "removed_v0_3": []
  },
  {
   "id": "G3-071",
   "group": 3,
   "risk_label": "Sedang",
   "jkk_rate": 0.0089,
   "jkk_percent": "0.89%",
   "official_name": "Pabrik barang dari tanah liat dan porselin",
   "sectors": [
    "industri_mineral"
   ],
   "activity": [
    "produksi"
   ],
   "aliases": [
    "keramik",
    "gerabah",
    "tembikar",
    "porselen",
    "porselin",
    "kerajinan gerabah",
    "kerajinan keramik",
    "pengrajin gerabah",
    "pottery",
    "kendi",
    "guci",
    "pot tanah liat",
    "keramik lantai",
    "keramik dinding",
    "kloset keramik",
    "sanitary ware",
    "piring keramik",
    "keramik hias",
    "genteng keramik"
   ],
   "aliases_inferred": [],
   "negative_terms": [
    "pasang",
    "pemasangan"
   ],
   "ambiguity_tags": [],
   "needs_confirmation": false,
   "source": {
    "regulation": "PP 82 Tahun 2019",
    "attachment": "Lampiran I",
    "title": "Pembagian Kelompok Tingkat Risiko Lingkungan Kerja"
   },
   "alias_review_status": "draft_v0_3",
   "added_v0_3": [
    "keramik",
    "gerabah",
    "tembikar",
    "porselen",
    "porselin",
    "kerajinan gerabah",
    "kerajinan keramik",
    "pengrajin gerabah",
    "pottery",
    "kendi",
    "guci",
    "pot tanah liat",
    "keramik lantai",
    "keramik dinding",
    "kloset keramik",
    "sanitary ware",
    "piring keramik",
    "keramik hias",
    "genteng keramik"
   ],
   "removed_v0_3": []
  },
  {
   "id": "G3-072",
   "group": 3,
   "risk_label": "Sedang",
   "jkk_rate": 0.0089,
   "jkk_percent": "0.89%",
   "official_name": "Pabrik semen",
   "sectors": [
    "industri_mineral"
   ],
   "activity": [
    "produksi"
   ],
   "aliases": [
    "pabrik semen",
    "semen",
    "pengemasan semen",
    "packing plant semen",
    "klinker",
    "semen instan",
    "mortar instan",
    "semen mortar",
    "grinding plant semen",
    "industri semen",
    "produksi semen"
   ],
   "aliases_inferred": [],
   "negative_terms": [],
   "ambiguity_tags": [],
   "needs_confirmation": false,
   "source": {
    "regulation": "PP 82 Tahun 2019",
    "attachment": "Lampiran I",
    "title": "Pembagian Kelompok Tingkat Risiko Lingkungan Kerja"
   },
   "alias_review_status": "draft_v0_3",
   "added_v0_3": [
    "pengemasan semen",
    "packing plant semen",
    "klinker",
    "semen instan",
    "mortar instan",
    "semen mortar",
    "grinding plant semen",
    "industri semen",
    "produksi semen"
   ],
   "removed_v0_3": []
  },
  {
   "id": "G3-073",
   "group": 3,
   "risk_label": "Sedang",
   "jkk_rate": 0.0089,
   "jkk_percent": "0.89%",
   "official_name": "Pembakaran gamping",
   "sectors": [
    "industri_mineral"
   ],
   "activity": [
    "produksi"
   ],
   "aliases": [
    "gamping",
    "kapur tohor",
    "kapur bakar",
    "tungku kapur",
    "pembakaran kapur",
    "kalsium oksida",
    "quicklime",
    "pengolahan kapur"
   ],
   "aliases_inferred": [],
   "negative_terms": [
    "galian",
    "tambang",
    "penambangan"
   ],
   "ambiguity_tags": [],
   "needs_confirmation": false,
   "source": {
    "regulation": "PP 82 Tahun 2019",
    "attachment": "Lampiran I",
    "title": "Pembagian Kelompok Tingkat Risiko Lingkungan Kerja"
   },
   "alias_review_status": "draft_v0_3",
   "added_v0_3": [
    "gamping",
    "kapur tohor",
    "kapur bakar",
    "tungku kapur",
    "pembakaran kapur",
    "kalsium oksida",
    "quicklime",
    "pengolahan kapur"
   ],
   "removed_v0_3": []
  },
  {
   "id": "G3-074",
   "group": 3,
   "risk_label": "Sedang",
   "jkk_rate": 0.0089,
   "jkk_percent": "0.89%",
   "official_name": "Pabrik tegel, ubin, pipa beton",
   "sectors": [
    "industri_mineral"
   ],
   "activity": [
    "produksi"
   ],
   "aliases": [
    "tegel",
    "ubin",
    "ubin semen",
    "pipa beton",
    "buis beton",
    "gorong gorong beton",
    "u ditch",
    "box culvert",
    "paving block",
    "paving",
    "batako",
    "bata ringan",
    "hebel",
    "beton pracetak",
    "precast",
    "beton precast",
    "tiang pancang",
    "tiang listrik beton",
    "kanstin",
    "grassblock",
    "roster beton",
    "genteng beton",
    "panel beton",
    "batching plant",
    "beton siap pakai",
    "ready mix",
    "readymix",
    "pabrik batako"
   ],
   "aliases_inferred": [],
   "negative_terms": [
    "pasang",
    "pemasangan"
   ],
   "ambiguity_tags": [],
   "needs_confirmation": false,
   "source": {
    "regulation": "PP 82 Tahun 2019",
    "attachment": "Lampiran I",
    "title": "Pembagian Kelompok Tingkat Risiko Lingkungan Kerja"
   },
   "alias_review_status": "draft_v0_3",
   "added_v0_3": [
    "tegel",
    "ubin",
    "ubin semen",
    "pipa beton",
    "buis beton",
    "gorong gorong beton",
    "u ditch",
    "box culvert",
    "paving block",
    "paving",
    "batako",
    "bata ringan",
    "hebel",
    "beton pracetak",
    "precast",
    "beton precast",
    "tiang pancang",
    "tiang listrik beton",
    "kanstin",
    "grassblock",
    "roster beton",
    "genteng beton",
    "panel beton",
    "batching plant",
    "beton siap pakai",
    "ready mix",
    "readymix",
    "pabrik batako"
   ],
   "removed_v0_3": []
  },
  {
   "id": "G3-075",
   "group": 3,
   "risk_label": "Sedang",
   "jkk_rate": 0.0089,
   "jkk_percent": "0.89%",
   "official_name": "Pabrik barang dari logam (batangan besi, kisi-kisi, lembaran besi, pipa, dan corong)",
   "sectors": [
    "industri_logam"
   ],
   "activity": [
    "produksi"
   ],
   "aliases": [
    "barang logam",
    "barang dari logam",
    "batangan besi",
    "kisi kisi",
    "teralis",
    "tralis",
    "pagar besi",
    "kanopi",
    "bengkel las",
    "las",
    "las listrik",
    "las karbit",
    "pengelasan",
    "welding",
    "fabrikasi",
    "fabrikasi besi",
    "fabrikasi baja",
    "pipa besi",
    "pipa baja",
    "lembaran besi",
    "plat besi",
    "atap seng",
    "spandek",
    "galvalum",
    "baja ringan produksi",
    "rolling door",
    "pintu besi",
    "tangga besi",
    "corong",
    "konstruksi baja fabrikasi",
    "bengkel las listrik"
   ],
   "aliases_inferred": [],
   "negative_terms": [
    "pemasangan",
    "pasang"
   ],
   "ambiguity_tags": [],
   "needs_confirmation": false,
   "source": {
    "regulation": "PP 82 Tahun 2019",
    "attachment": "Lampiran I",
    "title": "Pembagian Kelompok Tingkat Risiko Lingkungan Kerja"
   },
   "alias_review_status": "draft_v0_3",
   "added_v0_3": [
    "barang logam",
    "barang dari logam",
    "batangan besi",
    "kisi kisi",
    "teralis",
    "tralis",
    "pagar besi",
    "kanopi",
    "bengkel las",
    "las",
    "las listrik",
    "las karbit",
    "pengelasan",
    "welding",
    "fabrikasi",
    "fabrikasi besi",
    "fabrikasi baja",
    "pipa besi",
    "pipa baja",
    "lembaran besi",
    "plat besi",
    "atap seng",
    "spandek",
    "galvalum",
    "baja ringan produksi",
    "rolling door",
    "pintu besi",
    "tangga besi",
    "corong",
    "konstruksi baja fabrikasi",
    "bengkel las listrik"
   ],
   "removed_v0_3": []
  },
  {
   "id": "G3-076",
   "group": 3,
   "risk_label": "Sedang",
   "jkk_rate": 0.0089,
   "jkk_percent": "0.89%",
   "official_name": "Pabrik timbangan",
   "sectors": [
    "industri_logam"
   ],
   "activity": [
    "produksi"
   ],
   "aliases": [
    "timbangan",
    "pabrik timbangan",
    "alat timbang",
    "timbangan digital produksi",
    "neraca"
   ],
   "aliases_inferred": [
    "servis timbangan",
    "kalibrasi timbangan"
   ],
   "negative_terms": [],
   "ambiguity_tags": [],
   "needs_confirmation": false,
   "source": {
    "regulation": "PP 82 Tahun 2019",
    "attachment": "Lampiran I",
    "title": "Pembagian Kelompok Tingkat Risiko Lingkungan Kerja"
   },
   "alias_review_status": "draft_v0_3",
   "added_v0_3": [
    "timbangan",
    "pabrik timbangan",
    "alat timbang",
    "timbangan digital produksi",
    "neraca"
   ],
   "removed_v0_3": []
  },
  {
   "id": "G3-077",
   "group": 3,
   "risk_label": "Sedang",
   "jkk_rate": 0.0089,
   "jkk_percent": "0.89%",
   "official_name": "Pabrik klise dan huruf cetak",
   "sectors": [
    "industri_kayu_kertas"
   ],
   "activity": [
    "produksi"
   ],
   "aliases": [
    "klise",
    "klise cetak",
    "plat cetak",
    "huruf cetak",
    "film separasi",
    "pembuatan plat offset"
   ],
   "aliases_inferred": [
    "stempel",
    "cap stempel",
    "stempel flash",
    "pembuatan stempel",
    "plat nomor"
   ],
   "negative_terms": [],
   "ambiguity_tags": [],
   "needs_confirmation": false,
   "source": {
    "regulation": "PP 82 Tahun 2019",
    "attachment": "Lampiran I",
    "title": "Pembagian Kelompok Tingkat Risiko Lingkungan Kerja"
   },
   "alias_review_status": "draft_v0_3",
   "added_v0_3": [
    "klise",
    "klise cetak",
    "plat cetak",
    "huruf cetak",
    "film separasi",
    "pembuatan plat offset"
   ],
   "removed_v0_3": []
  },
  {
   "id": "G3-078",
   "group": 3,
   "risk_label": "Sedang",
   "jkk_rate": 0.0089,
   "jkk_percent": "0.89%",
   "official_name": "Pabrik galvanisir (partikel)",
   "sectors": [
    "industri_logam"
   ],
   "activity": [
    "produksi"
   ],
   "aliases": [
    "galvanis",
    "galvanisir",
    "galvanizing",
    "hot dip galvanizing",
    "pelapisan logam",
    "electroplating",
    "lapis krom",
    "krom",
    "verkrom",
    "pelapisan nikel",
    "pelapisan seng",
    "plating"
   ],
   "aliases_inferred": [
    "powder coating",
    "sepuh"
   ],
   "negative_terms": [],
   "ambiguity_tags": [],
   "needs_confirmation": false,
   "source": {
    "regulation": "PP 82 Tahun 2019",
    "attachment": "Lampiran I",
    "title": "Pembagian Kelompok Tingkat Risiko Lingkungan Kerja"
   },
   "alias_review_status": "draft_v0_3",
   "added_v0_3": [
    "galvanis",
    "galvanisir",
    "galvanizing",
    "hot dip galvanizing",
    "pelapisan logam",
    "electroplating",
    "lapis krom",
    "krom",
    "verkrom",
    "pelapisan nikel",
    "pelapisan seng",
    "plating"
   ],
   "removed_v0_3": []
  },
  {
   "id": "G3-079",
   "group": 3,
   "risk_label": "Sedang",
   "jkk_rate": 0.0089,
   "jkk_percent": "0.89%",
   "official_name": "Pabrik barang logam lainnya",
   "sectors": [
    "industri_logam"
   ],
   "activity": [
    "produksi"
   ],
   "aliases": [
    "logam",
    "barang logam lainnya",
    "kerajinan logam",
    "kerajinan kuningan",
    "kuningan",
    "kerajinan tembaga",
    "tembaga kerajinan",
    "barang aluminium",
    "panci",
    "alat dapur logam",
    "peralatan dapur",
    "pandai besi",
    "pande besi",
    "golok",
    "pisau",
    "cangkul",
    "alat pertanian logam",
    "paku",
    "baut",
    "mur",
    "sekrup",
    "kawat",
    "kawat duri",
    "jaring kawat",
    "wiremesh",
    "kusen aluminium",
    "aluminium dan kaca",
    "kaca aluminium",
    "etalase aluminium",
    "rak besi",
    "lemari besi",
    "brankas",
    "cetakan logam",
    "tangki fabrikasi",
    "drum produksi",
    "tabung gas produksi"
   ],
   "aliases_inferred": [],
   "negative_terms": [
    "tambang"
   ],
   "ambiguity_tags": [],
   "needs_confirmation": false,
   "source": {
    "regulation": "PP 82 Tahun 2019",
    "attachment": "Lampiran I",
    "title": "Pembagian Kelompok Tingkat Risiko Lingkungan Kerja"
   },
   "alias_review_status": "draft_v0_3",
   "added_v0_3": [
    "logam",
    "barang logam lainnya",
    "kerajinan logam",
    "kerajinan kuningan",
    "kuningan",
    "kerajinan tembaga",
    "tembaga kerajinan",
    "barang aluminium",
    "panci",
    "alat dapur logam",
    "peralatan dapur",
    "pandai besi",
    "pande besi",
    "golok",
    "pisau",
    "cangkul",
    "alat pertanian logam",
    "paku",
    "baut",
    "mur",
    "sekrup",
    "kawat",
    "kawat duri",
    "jaring kawat",
    "wiremesh",
    "kusen aluminium",
    "aluminium dan kaca",
    "kaca aluminium",
    "etalase aluminium",
    "rak besi",
    "lemari besi",
    "brankas",
    "cetakan logam",
    "tangki fabrikasi",
    "drum produksi",
    "tabung gas produksi"
   ],
   "removed_v0_3": []
  },
  {
   "id": "G3-080",
   "group": 3,
   "risk_label": "Sedang",
   "jkk_rate": 0.0089,
   "jkk_percent": "0.89%",
   "official_name": "Pabrik dan reparasi mesin listrik",
   "sectors": [
    "industri_logam",
    "bengkel_reparasi"
   ],
   "activity": [
    "produksi",
    "reparasi"
   ],
   "aliases": [
    "reparasi mesin listrik",
    "servis mesin listrik",
    "mesin listrik",
    "dinamo",
    "gulung dinamo",
    "rewinding",
    "lilit dinamo",
    "servis dinamo",
    "motor listrik",
    "trafo",
    "transformator",
    "servis trafo",
    "servis genset",
    "panel listrik",
    "perakitan panel"
   ],
   "aliases_inferred": [
    "perakitan elektronik",
    "pabrik elektronik",
    "servis elektronik",
    "reparasi elektronik",
    "servis tv",
    "servis kulkas",
    "servis ac",
    "teknisi ac",
    "jasa ac",
    "cuci ac",
    "servis mesin cuci",
    "servis pompa air",
    "servis hp",
    "servis laptop",
    "servis komputer",
    "servis printer",
    "reparasi hp",
    "perbaikan elektronik",
    "pabrik kabel listrik",
    "kabel listrik",
    "produksi lampu",
    "perakitan panel surya",
    "pabrik aki",
    "produksi aki"
   ],
   "negative_terms": [
    "mobil",
    "sepeda motor",
    "servis motor",
    "bengkel motor",
    "instalasi gedung"
   ],
   "ambiguity_tags": [],
   "needs_confirmation": false,
   "source": {
    "regulation": "PP 82 Tahun 2019",
    "attachment": "Lampiran I",
    "title": "Pembagian Kelompok Tingkat Risiko Lingkungan Kerja"
   },
   "alias_review_status": "draft_v0_3",
   "added_v0_3": [
    "mesin listrik",
    "dinamo",
    "gulung dinamo",
    "rewinding",
    "lilit dinamo",
    "servis dinamo",
    "motor listrik",
    "trafo",
    "transformator",
    "servis trafo",
    "servis genset",
    "panel listrik",
    "perakitan panel"
   ],
   "removed_v0_3": []
  },
  {
   "id": "G3-081",
   "group": 3,
   "risk_label": "Sedang",
   "jkk_rate": 0.0089,
   "jkk_percent": "0.89%",
   "official_name": "Pembikinan dan reparasi kapal dari kayu",
   "sectors": [
    "industri_logam"
   ],
   "activity": [
    "produksi",
    "reparasi"
   ],
   "aliases": [
    "kapal kayu",
    "perahu kayu",
    "pembuatan perahu",
    "pembuatan kapal kayu",
    "galangan kapal kayu",
    "galangan perahu",
    "reparasi perahu",
    "perbaikan kapal kayu",
    "pinisi",
    "perahu nelayan",
    "boat builder",
    "perahu fiber",
    "kapal fiber",
    "pembuatan speedboat"
   ],
   "aliases_inferred": [],
   "negative_terms": [
    "baja",
    "angkutan",
    "penyeberangan"
   ],
   "ambiguity_tags": [],
   "needs_confirmation": false,
   "source": {
    "regulation": "PP 82 Tahun 2019",
    "attachment": "Lampiran I",
    "title": "Pembagian Kelompok Tingkat Risiko Lingkungan Kerja"
   },
   "alias_review_status": "draft_v0_3",
   "added_v0_3": [
    "kapal kayu",
    "perahu kayu",
    "pembuatan perahu",
    "pembuatan kapal kayu",
    "galangan kapal kayu",
    "galangan perahu",
    "reparasi perahu",
    "perbaikan kapal kayu",
    "pinisi",
    "perahu nelayan",
    "boat builder",
    "perahu fiber",
    "kapal fiber",
    "pembuatan speedboat"
   ],
   "removed_v0_3": []
  },
  {
   "id": "G3-082",
   "group": 3,
   "risk_label": "Sedang",
   "jkk_rate": 0.0089,
   "jkk_percent": "0.89%",
   "official_name": "Reparasi sepeda dan becak",
   "sectors": [
    "bengkel_reparasi"
   ],
   "activity": [
    "reparasi"
   ],
   "aliases": [
    "bengkel sepeda",
    "servis sepeda",
    "reparasi becak",
    "tukang sepeda",
    "reparasi sepeda",
    "perbaikan sepeda",
    "bengkel becak",
    "servis becak",
    "bengkel sepeda listrik",
    "servis sepeda listrik"
   ],
   "aliases_inferred": [],
   "negative_terms": [
    "motor",
    "mobil",
    "pabrik"
   ],
   "ambiguity_tags": [],
   "needs_confirmation": false,
   "source": {
    "regulation": "PP 82 Tahun 2019",
    "attachment": "Lampiran I",
    "title": "Pembagian Kelompok Tingkat Risiko Lingkungan Kerja"
   },
   "alias_review_status": "draft_v0_3",
   "added_v0_3": [
    "tukang sepeda",
    "reparasi sepeda",
    "perbaikan sepeda",
    "bengkel becak",
    "servis becak",
    "bengkel sepeda listrik",
    "servis sepeda listrik"
   ],
   "removed_v0_3": []
  },
  {
   "id": "G3-083",
   "group": 3,
   "risk_label": "Sedang",
   "jkk_rate": 0.0089,
   "jkk_percent": "0.89%",
   "official_name": "Perusahaan optik",
   "sectors": [
    "industri_lainnya",
    "perdagangan"
   ],
   "activity": [
    "produksi",
    "perdagangan"
   ],
   "aliases": [
    "optik",
    "optikal",
    "kacamata",
    "toko kacamata",
    "lensa kacamata",
    "pembuatan kacamata",
    "gosok lensa",
    "optik kacamata"
   ],
   "aliases_inferred": [],
   "negative_terms": [
    "klinik mata"
   ],
   "ambiguity_tags": [],
   "needs_confirmation": false,
   "source": {
    "regulation": "PP 82 Tahun 2019",
    "attachment": "Lampiran I",
    "title": "Pembagian Kelompok Tingkat Risiko Lingkungan Kerja"
   },
   "alias_review_status": "draft_v0_3",
   "added_v0_3": [
    "optik",
    "optikal",
    "kacamata",
    "toko kacamata",
    "lensa kacamata",
    "pembuatan kacamata",
    "gosok lensa",
    "optik kacamata"
   ],
   "removed_v0_3": []
  },
  {
   "id": "G3-084",
   "group": 3,
   "risk_label": "Sedang",
   "jkk_rate": 0.0089,
   "jkk_percent": "0.89%",
   "official_name": "Industri arloji dan lonceng",
   "sectors": [
    "industri_lainnya"
   ],
   "activity": [
    "produksi"
   ],
   "aliases": [
    "pabrik jam",
    "jam produksi",
    "perakitan jam",
    "produksi jam tangan",
    "jam dinding produksi",
    "pembuatan lonceng"
   ],
   "aliases_inferred": [],
   "negative_terms": [
    "servis",
    "reparasi"
   ],
   "ambiguity_tags": [],
   "needs_confirmation": false,
   "source": {
    "regulation": "PP 82 Tahun 2019",
    "attachment": "Lampiran I",
    "title": "Pembagian Kelompok Tingkat Risiko Lingkungan Kerja"
   },
   "alias_review_status": "draft_v0_3",
   "added_v0_3": [
    "pabrik jam",
    "jam produksi",
    "perakitan jam",
    "produksi jam tangan",
    "jam dinding produksi",
    "pembuatan lonceng"
   ],
   "removed_v0_3": []
  },
  {
   "id": "G3-085",
   "group": 3,
   "risk_label": "Sedang",
   "jkk_rate": 0.0089,
   "jkk_percent": "0.89%",
   "official_name": "Perusahaan perak",
   "sectors": [
    "industri_lainnya"
   ],
   "activity": [
    "produksi"
   ],
   "aliases": [
    "perak",
    "kerajinan perak",
    "pengrajin perak",
    "perhiasan perak",
    "silver",
    "silversmith"
   ],
   "aliases_inferred": [],
   "negative_terms": [
    "tambang"
   ],
   "ambiguity_tags": [],
   "needs_confirmation": false,
   "source": {
    "regulation": "PP 82 Tahun 2019",
    "attachment": "Lampiran I",
    "title": "Pembagian Kelompok Tingkat Risiko Lingkungan Kerja"
   },
   "alias_review_status": "draft_v0_3",
   "added_v0_3": [
    "perak",
    "kerajinan perak",
    "pengrajin perak",
    "perhiasan perak",
    "silver",
    "silversmith"
   ],
   "removed_v0_3": []
  },
  {
   "id": "G3-086",
   "group": 3,
   "risk_label": "Sedang",
   "jkk_rate": 0.0089,
   "jkk_percent": "0.89%",
   "official_name": "Industri barang dari logam mulia",
   "sectors": [
    "industri_lainnya"
   ],
   "activity": [
    "produksi"
   ],
   "aliases": [
    "logam mulia",
    "perhiasan",
    "pengrajin emas",
    "pengrajin perhiasan",
    "tukang emas",
    "perhiasan emas produksi",
    "kerajinan emas",
    "lebur emas",
    "peleburan emas",
    "sepuh emas",
    "pembuatan perhiasan",
    "jewelry",
    "industri perhiasan"
   ],
   "aliases_inferred": [
    "asah batu akik",
    "pengrajin akik"
   ],
   "negative_terms": [
    "tambang",
    "pegadaian",
    "gadai"
   ],
   "ambiguity_tags": [],
   "needs_confirmation": false,
   "source": {
    "regulation": "PP 82 Tahun 2019",
    "attachment": "Lampiran I",
    "title": "Pembagian Kelompok Tingkat Risiko Lingkungan Kerja"
   },
   "alias_review_status": "draft_v0_3",
   "added_v0_3": [
    "logam mulia",
    "perhiasan",
    "pengrajin emas",
    "pengrajin perhiasan",
    "tukang emas",
    "perhiasan emas produksi",
    "kerajinan emas",
    "lebur emas",
    "peleburan emas",
    "sepuh emas",
    "pembuatan perhiasan",
    "jewelry",
    "industri perhiasan"
   ],
   "removed_v0_3": []
  },
  {
   "id": "G3-087",
   "group": 3,
   "risk_label": "Sedang",
   "jkk_rate": 0.0089,
   "jkk_percent": "0.89%",
   "official_name": "Industri lain seperti perusahaan plastik, perusahaan bulu burung, dan pipa tembakau",
   "sectors": [
    "industri_kimia"
   ],
   "activity": [
    "produksi"
   ],
   "aliases": [
    "plastik",
    "industri plastik",
    "kantong plastik",
    "kresek",
    "plastik kemasan",
    "kemasan plastik",
    "botol plastik",
    "galon produksi",
    "injeksi plastik",
    "injection molding",
    "blow molding",
    "pipa pvc",
    "pvc",
    "styrofoam",
    "sterofoam",
    "busa",
    "spons",
    "fiberglass",
    "fiber produksi",
    "akrilik",
    "daur ulang plastik",
    "cacah plastik",
    "biji plastik",
    "pelet plastik",
    "karung plastik",
    "bulu burung",
    "pengolahan bulu ayam",
    "kemoceng",
    "pipa tembakau",
    "cangklong"
   ],
   "aliases_inferred": [],
   "negative_terms": [],
   "ambiguity_tags": [],
   "needs_confirmation": false,
   "source": {
    "regulation": "PP 82 Tahun 2019",
    "attachment": "Lampiran I",
    "title": "Pembagian Kelompok Tingkat Risiko Lingkungan Kerja"
   },
   "alias_review_status": "draft_v0_3",
   "added_v0_3": [
    "plastik",
    "industri plastik",
    "kantong plastik",
    "kresek",
    "plastik kemasan",
    "kemasan plastik",
    "botol plastik",
    "galon produksi",
    "injeksi plastik",
    "injection molding",
    "blow molding",
    "pipa pvc",
    "pvc",
    "styrofoam",
    "sterofoam",
    "busa",
    "spons",
    "fiberglass",
    "fiber produksi",
    "akrilik",
    "daur ulang plastik",
    "cacah plastik",
    "biji plastik",
    "pelet plastik",
    "karung plastik",
    "bulu burung",
    "pengolahan bulu ayam",
    "kemoceng",
    "pipa tembakau",
    "cangklong"
   ],
   "removed_v0_3": []
  },
  {
   "id": "G3-088",
   "group": 3,
   "risk_label": "Sedang",
   "jkk_rate": 0.0089,
   "jkk_percent": "0.89%",
   "official_name": "Perusahaan air (pengumpulan penyaringan dan distribusi)",
   "sectors": [
    "energi_utilitas"
   ],
   "activity": [
    "utilitas"
   ],
   "aliases": [
    "PDAM",
    "perusahaan air",
    "pengolahan air",
    "distribusi air",
    "perumda air minum",
    "air bersih",
    "penyediaan air bersih",
    "pengolahan air bersih",
    "penjernihan air",
    "water treatment",
    "wtp",
    "sistem penyediaan air minum",
    "spam",
    "pamsimas",
    "hippam",
    "air tangki",
    "suplai air bersih",
    "jual air tangki",
    "perusahaan air minum"
   ],
   "aliases_inferred": [
    "depot air",
    "air isi ulang"
   ],
   "negative_terms": [
    "limbah",
    "ipal"
   ],
   "ambiguity_tags": [],
   "needs_confirmation": false,
   "source": {
    "regulation": "PP 82 Tahun 2019",
    "attachment": "Lampiran I",
    "title": "Pembagian Kelompok Tingkat Risiko Lingkungan Kerja"
   },
   "alias_review_status": "draft_v0_3",
   "added_v0_3": [
    "perumda air minum",
    "air bersih",
    "penyediaan air bersih",
    "pengolahan air bersih",
    "penjernihan air",
    "water treatment",
    "wtp",
    "sistem penyediaan air minum",
    "spam",
    "pamsimas",
    "hippam",
    "air tangki",
    "suplai air bersih",
    "jual air tangki",
    "perusahaan air minum"
   ],
   "removed_v0_3": []
  },
  {
   "id": "G3-089",
   "group": 3,
   "risk_label": "Sedang",
   "jkk_rate": 0.0089,
   "jkk_percent": "0.89%",
   "official_name": "Pembersihan (sampah dan kotoran)",
   "sectors": [
    "energi_utilitas"
   ],
   "activity": [
    "utilitas"
   ],
   "aliases": [
    "pembersihan sampah",
    "angkut sampah",
    "pengelolaan sampah",
    "jasa kebersihan sampah",
    "sampah",
    "pengangkutan sampah",
    "jasa angkut sampah",
    "tps3r",
    "tpst",
    "bank sampah",
    "daur ulang sampah",
    "pengomposan",
    "sedot wc",
    "sedot tinja",
    "penyedotan septic tank",
    "septic tank",
    "kuras wc",
    "iplt",
    "pembersihan got",
    "pembersihan saluran",
    "limbah domestik",
    "pengelolaan tps",
    "pengelola sampah",
    "tempat pembuangan sampah",
    "kebersihan kota"
   ],
   "aliases_inferred": [],
   "negative_terms": [
    "housekeeping",
    "cleaning kantor",
    "cleaning service",
    "b3",
    "medis",
    "industri"
   ],
   "ambiguity_tags": [
    "cleaning_general_vs_waste"
   ],
   "needs_confirmation": true,
   "source": {
    "regulation": "PP 82 Tahun 2019",
    "attachment": "Lampiran I",
    "title": "Pembagian Kelompok Tingkat Risiko Lingkungan Kerja"
   },
   "alias_review_status": "draft_v0_3",
   "added_v0_3": [
    "sampah",
    "pengangkutan sampah",
    "jasa angkut sampah",
    "tps3r",
    "tpst",
    "bank sampah",
    "daur ulang sampah",
    "pengomposan",
    "sedot wc",
    "sedot tinja",
    "penyedotan septic tank",
    "septic tank",
    "kuras wc",
    "iplt",
    "pembersihan got",
    "pembersihan saluran",
    "limbah domestik",
    "pengelolaan tps",
    "pengelola sampah",
    "tempat pembuangan sampah",
    "kebersihan kota"
   ],
   "removed_v0_3": []
  },
  {
   "id": "G3-090",
   "group": 3,
   "risk_label": "Sedang",
   "jkk_rate": 0.0089,
   "jkk_percent": "0.89%",
   "official_name": "Jasa pengangkutan seperti ekspedisi laut dan udara",
   "sectors": [
    "transportasi"
   ],
   "activity": [
    "angkutan"
   ],
   "aliases": [
    "ekspedisi laut",
    "ekspedisi udara",
    "freight forwarding laut",
    "freight forwarding udara",
    "ekspedisi",
    "jasa ekspedisi",
    "freight forwarder",
    "forwarder",
    "freight forwarding",
    "forwarding",
    "jasa pengurusan transportasi",
    "jpt",
    "ppjk",
    "emkl",
    "ekspedisi muatan kapal laut",
    "kargo udara",
    "air cargo agent",
    "kargo laut",
    "jasa kargo",
    "kargo",
    "agen ekspedisi",
    "agen pengiriman",
    "drop point",
    "jasa pos",
    "kantor pos",
    "keagenan kapal",
    "agen pelayaran",
    "ship agency",
    "customs broker"
   ],
   "aliases_inferred": [
    "jasa kurir",
    "kurir",
    "pengiriman paket",
    "logistik",
    "jasa logistik",
    "perusahaan logistik",
    "3pl",
    "pengiriman barang"
   ],
   "negative_terms": [
    "operator bus",
    "operator truk",
    "maskapai",
    "operator kapal"
   ],
   "ambiguity_tags": [
    "freight_forwarder_vs_transport_operator"
   ],
   "needs_confirmation": true,
   "source": {
    "regulation": "PP 82 Tahun 2019",
    "attachment": "Lampiran I",
    "title": "Pembagian Kelompok Tingkat Risiko Lingkungan Kerja"
   },
   "alias_review_status": "draft_v0_3",
   "added_v0_3": [
    "ekspedisi",
    "jasa ekspedisi",
    "freight forwarder",
    "forwarder",
    "freight forwarding",
    "forwarding",
    "jasa pengurusan transportasi",
    "jpt",
    "ppjk",
    "emkl",
    "ekspedisi muatan kapal laut",
    "kargo udara",
    "air cargo agent",
    "kargo laut",
    "jasa kargo",
    "kargo",
    "agen ekspedisi",
    "agen pengiriman",
    "drop point",
    "jasa pos",
    "kantor pos",
    "keagenan kapal",
    "agen pelayaran",
    "ship agency",
    "customs broker"
   ],
   "removed_v0_3": []
  },
  {
   "id": "G3-091",
   "group": 3,
   "risk_label": "Sedang",
   "jkk_rate": 0.0089,
   "jkk_percent": "0.89%",
   "official_name": "Stasiun Pengisian Bahan Bakar Umum",
   "sectors": [
    "energi_utilitas"
   ],
   "activity": [
    "utilitas"
   ],
   "aliases": [
    "SPBU",
    "pom bensin",
    "stasiun pengisian bahan bakar",
    "pom",
    "pom mini",
    "spbun",
    "spbb",
    "apms",
    "agen premium dan minyak solar",
    "stasiun bbm",
    "pengisian bbm"
   ],
   "aliases_inferred": [
    "spklu",
    "charging station",
    "stasiun pengisian kendaraan listrik",
    "pengisian mobil listrik"
   ],
   "negative_terms": [
    "gas",
    "elpiji",
    "lpg"
   ],
   "ambiguity_tags": [],
   "needs_confirmation": false,
   "source": {
    "regulation": "PP 82 Tahun 2019",
    "attachment": "Lampiran I",
    "title": "Pembagian Kelompok Tingkat Risiko Lingkungan Kerja"
   },
   "alias_review_status": "draft_v0_3",
   "added_v0_3": [
    "pom",
    "pom mini",
    "spbun",
    "spbb",
    "apms",
    "agen premium dan minyak solar",
    "stasiun bbm",
    "pengisian bbm"
   ],
   "removed_v0_3": []
  },
  {
   "id": "G3-092",
   "group": 3,
   "risk_label": "Sedang",
   "jkk_rate": 0.0089,
   "jkk_percent": "0.89%",
   "official_name": "Pabrik cat dan lak",
   "sectors": [
    "industri_kimia"
   ],
   "activity": [
    "produksi"
   ],
   "aliases": [
    "cat",
    "pabrik cat",
    "cat tembok",
    "cat kayu",
    "cat besi",
    "pernis",
    "vernis",
    "varnish",
    "lak",
    "pelitur",
    "plitur",
    "thinner",
    "tiner",
    "dempul",
    "coating",
    "cat industri",
    "produksi cat"
   ],
   "aliases_inferred": [],
   "negative_terms": [
    "toko cat",
    "tukang cat",
    "bengkel cat",
    "jasa pengecatan",
    "pengecatan",
    "cat mobil"
   ],
   "ambiguity_tags": [],
   "needs_confirmation": false,
   "source": {
    "regulation": "PP 82 Tahun 2019",
    "attachment": "Lampiran I",
    "title": "Pembagian Kelompok Tingkat Risiko Lingkungan Kerja"
   },
   "alias_review_status": "draft_v0_3",
   "added_v0_3": [
    "cat",
    "pabrik cat",
    "cat tembok",
    "cat kayu",
    "cat besi",
    "pernis",
    "vernis",
    "varnish",
    "lak",
    "pelitur",
    "plitur",
    "thinner",
    "tiner",
    "dempul",
    "coating",
    "cat industri",
    "produksi cat"
   ],
   "removed_v0_3": []
  },
  {
   "id": "G3-093",
   "group": 3,
   "risk_label": "Sedang",
   "jkk_rate": 0.0089,
   "jkk_percent": "0.89%",
   "official_name": "Pabrik tinta dan lem",
   "sectors": [
    "industri_kimia"
   ],
   "activity": [
    "produksi"
   ],
   "aliases": [
    "tinta",
    "pabrik tinta",
    "tinta printer produksi",
    "lem",
    "pabrik lem",
    "lem kayu",
    "lem putih",
    "perekat",
    "adhesive",
    "lem sepatu",
    "lem epoxy",
    "sealant",
    "silikon sealant"
   ],
   "aliases_inferred": [],
   "negative_terms": [],
   "ambiguity_tags": [],
   "needs_confirmation": false,
   "source": {
    "regulation": "PP 82 Tahun 2019",
    "attachment": "Lampiran I",
    "title": "Pembagian Kelompok Tingkat Risiko Lingkungan Kerja"
   },
   "alias_review_status": "draft_v0_3",
   "added_v0_3": [
    "tinta",
    "pabrik tinta",
    "tinta printer produksi",
    "lem",
    "pabrik lem",
    "lem kayu",
    "lem putih",
    "perekat",
    "adhesive",
    "lem sepatu",
    "lem epoxy",
    "sealant",
    "silikon sealant"
   ],
   "removed_v0_3": []
  },
  {
   "id": "G3-094",
   "group": 3,
   "risk_label": "Sedang",
   "jkk_rate": 0.0089,
   "jkk_percent": "0.89%",
   "official_name": "Pabrik bata merah dan genteng",
   "sectors": [
    "industri_mineral"
   ],
   "activity": [
    "produksi"
   ],
   "aliases": [
    "bata merah",
    "batu bata",
    "bata",
    "pembuatan batu bata",
    "cetak bata",
    "bata press",
    "bata ekspos",
    "genteng",
    "genteng tanah liat",
    "genteng press",
    "pabrik genteng",
    "tobong bata",
    "linggan",
    "bata jumbo",
    "pengrajin bata"
   ],
   "aliases_inferred": [],
   "negative_terms": [
    "pasang"
   ],
   "ambiguity_tags": [],
   "needs_confirmation": false,
   "source": {
    "regulation": "PP 82 Tahun 2019",
    "attachment": "Lampiran I",
    "title": "Pembagian Kelompok Tingkat Risiko Lingkungan Kerja"
   },
   "alias_review_status": "draft_v0_3",
   "added_v0_3": [
    "bata merah",
    "batu bata",
    "bata",
    "pembuatan batu bata",
    "cetak bata",
    "bata press",
    "bata ekspos",
    "genteng",
    "genteng tanah liat",
    "genteng press",
    "pabrik genteng",
    "tobong bata",
    "linggan",
    "bata jumbo",
    "pengrajin bata"
   ],
   "removed_v0_3": []
  },
  {
   "id": "G3-095",
   "group": 3,
   "risk_label": "Sedang",
   "jkk_rate": 0.0089,
   "jkk_percent": "0.89%",
   "official_name": "Reparasi kendaraan bermotor (mobil, truk, dan sepeda motor)",
   "sectors": [
    "bengkel_reparasi"
   ],
   "activity": [
    "reparasi"
   ],
   "aliases": [
    "bengkel motor",
    "bengkel mobil",
    "bengkel truk",
    "servis motor",
    "servis mobil",
    "reparasi kendaraan",
    "bengkel",
    "bengkel umum",
    "bengkel kendaraan",
    "bengkel otomotif",
    "servis kendaraan",
    "tune up",
    "ganti oli",
    "ganti oli motor",
    "tambal ban",
    "tukang tambal ban",
    "spooring",
    "balancing",
    "spooring balancing",
    "bengkel ban",
    "bengkel ac mobil",
    "servis ac mobil",
    "ketok magic",
    "bengkel ketok",
    "bengkel cat mobil",
    "cat mobil",
    "body repair",
    "bengkel body",
    "bengkel resmi",
    "bengkel dealer",
    "bengkel aki",
    "bengkel modifikasi",
    "modifikasi motor",
    "bengkel knalpot",
    "jok motor",
    "bengkel jok",
    "bengkel radiator",
    "bengkel injeksi",
    "servis truk",
    "bengkel bus",
    "servis sepeda motor",
    "bengkel sepeda motor",
    "servis rutin",
    "bengkel mobil listrik",
    "servis mobil listrik"
   ],
   "aliases_inferred": [
    "cuci mobil",
    "cuci motor",
    "car wash",
    "doorsmeer",
    "salon mobil",
    "detailing",
    "poles mobil",
    "coating mobil",
    "variasi mobil",
    "aksesoris mobil",
    "audio mobil",
    "pasang kaca film"
   ],
   "negative_terms": [
    "pabrik",
    "produksi kendaraan",
    "overhaul mesin industri",
    "dealer penjualan"
   ],
   "ambiguity_tags": [
    "vehicle_repair_overlap"
   ],
   "needs_confirmation": false,
   "source": {
    "regulation": "PP 82 Tahun 2019",
    "attachment": "Lampiran I",
    "title": "Pembagian Kelompok Tingkat Risiko Lingkungan Kerja"
   },
   "alias_review_status": "draft_v0_3",
   "added_v0_3": [
    "bengkel",
    "bengkel umum",
    "bengkel kendaraan",
    "bengkel otomotif",
    "servis kendaraan",
    "tune up",
    "ganti oli",
    "ganti oli motor",
    "tambal ban",
    "tukang tambal ban",
    "spooring",
    "balancing",
    "spooring balancing",
    "bengkel ban",
    "bengkel ac mobil",
    "servis ac mobil",
    "ketok magic",
    "bengkel ketok",
    "bengkel cat mobil",
    "cat mobil",
    "body repair",
    "bengkel body",
    "bengkel resmi",
    "bengkel dealer",
    "bengkel aki",
    "bengkel modifikasi",
    "modifikasi motor",
    "bengkel knalpot",
    "jok motor",
    "bengkel jok",
    "bengkel radiator",
    "bengkel injeksi",
    "servis truk",
    "bengkel bus",
    "servis sepeda motor",
    "bengkel sepeda motor",
    "servis rutin",
    "bengkel mobil listrik",
    "servis mobil listrik"
   ],
   "removed_v0_3": []
  },
  {
   "id": "G3-096",
   "group": 3,
   "risk_label": "Sedang",
   "jkk_rate": 0.0089,
   "jkk_percent": "0.89%",
   "official_name": "Atlit/olahragawan/pelaku olahraga",
   "sectors": [
    "hiburan_media"
   ],
   "activity": [
    "jasa"
   ],
   "aliases": [
    "atlet",
    "atlit",
    "olahragawan",
    "pemain olahraga",
    "pelaku olahraga",
    "klub sepak bola",
    "klub olahraga",
    "klub bola",
    "sepak bola profesional",
    "pemain bola",
    "pesepak bola",
    "klub basket",
    "pemain basket",
    "atlet profesional",
    "petinju",
    "pembalap",
    "pesilat",
    "klub bulutangkis",
    "klub voli",
    "tim olahraga"
   ],
   "aliases_inferred": [
    "tim esports",
    "atlet esports",
    "pelatih olahraga",
    "wasit",
    "sekolah sepak bola",
    "ssb",
    "akademi sepak bola"
   ],
   "negative_terms": [],
   "ambiguity_tags": [],
   "needs_confirmation": false,
   "source": {
    "regulation": "PP 82 Tahun 2019",
    "attachment": "Lampiran I",
    "title": "Pembagian Kelompok Tingkat Risiko Lingkungan Kerja"
   },
   "alias_review_status": "draft_v0_3",
   "added_v0_3": [
    "klub sepak bola",
    "klub olahraga",
    "klub bola",
    "sepak bola profesional",
    "pemain bola",
    "pesepak bola",
    "klub basket",
    "pemain basket",
    "atlet profesional",
    "petinju",
    "pembalap",
    "pesilat",
    "klub bulutangkis",
    "klub voli",
    "tim olahraga"
   ],
   "removed_v0_3": []
  },
  {
   "id": "G4-001",
   "group": 4,
   "risk_label": "Tinggi",
   "jkk_rate": 0.0127,
   "jkk_percent": "1.27%",
   "official_name": "Pabrik dari hasil minyak tanah",
   "sectors": [
    "industri_kimia"
   ],
   "activity": [
    "produksi"
   ],
   "aliases": [
    "kilang minyak",
    "refinery",
    "pengolahan minyak bumi",
    "pelumas",
    "pabrik pelumas",
    "oli produksi",
    "pabrik oli",
    "blending oli",
    "lube oil blending plant",
    "minyak tanah pengolahan",
    "petrokimia"
   ],
   "aliases_inferred": [
    "asphalt mixing plant",
    "amp",
    "aspal hotmix",
    "produksi aspal"
   ],
   "negative_terms": [
    "ganti oli",
    "bengkel"
   ],
   "ambiguity_tags": [],
   "needs_confirmation": false,
   "source": {
    "regulation": "PP 82 Tahun 2019",
    "attachment": "Lampiran I",
    "title": "Pembagian Kelompok Tingkat Risiko Lingkungan Kerja"
   },
   "alias_review_status": "draft_v0_3",
   "added_v0_3": [
    "kilang minyak",
    "refinery",
    "pengolahan minyak bumi",
    "pelumas",
    "pabrik pelumas",
    "oli produksi",
    "pabrik oli",
    "blending oli",
    "lube oil blending plant",
    "minyak tanah pengolahan",
    "petrokimia"
   ],
   "removed_v0_3": []
  },
  {
   "id": "G4-002",
   "group": 4,
   "risk_label": "Tinggi",
   "jkk_rate": 0.0127,
   "jkk_percent": "1.27%",
   "official_name": "Pabrik barang dari minyak tanah atau batu bara",
   "sectors": [
    "industri_kimia"
   ],
   "activity": [
    "produksi"
   ],
   "aliases": [
    "briket batubara",
    "briket batu bara",
    "kokas produksi",
    "coal tar",
    "ter",
    "pengolahan batu bara",
    "karbon aktif",
    "arang aktif"
   ],
   "aliases_inferred": [
    "aspal",
    "produk aspal",
    "membran aspal"
   ],
   "negative_terms": [],
   "ambiguity_tags": [],
   "needs_confirmation": false,
   "source": {
    "regulation": "PP 82 Tahun 2019",
    "attachment": "Lampiran I",
    "title": "Pembagian Kelompok Tingkat Risiko Lingkungan Kerja"
   },
   "alias_review_status": "draft_v0_3",
   "added_v0_3": [
    "briket batubara",
    "briket batu bara",
    "kokas produksi",
    "coal tar",
    "ter",
    "pengolahan batu bara",
    "karbon aktif",
    "arang aktif"
   ],
   "removed_v0_3": []
  },
  {
   "id": "G4-003",
   "group": 4,
   "risk_label": "Tinggi",
   "jkk_rate": 0.0127,
   "jkk_percent": "1.27%",
   "official_name": "Pabrik dan reparasi mesin (bengkel motor, mobil, dan mesin)",
   "sectors": [
    "bengkel_reparasi",
    "industri_logam"
   ],
   "activity": [
    "produksi",
    "reparasi"
   ],
   "aliases": [
    "bengkel mesin",
    "reparasi mesin",
    "overhaul mesin",
    "bengkel motor",
    "bengkel mobil",
    "pabrik mesin",
    "pembuatan mesin",
    "rekayasa mesin",
    "mesin industri",
    "reparasi mesin industri",
    "servis mesin industri",
    "overhaul",
    "turun mesin",
    "korter",
    "bengkel bubut",
    "bubut",
    "frais",
    "cnc",
    "machining",
    "bengkel alat berat",
    "servis alat berat",
    "reparasi alat berat",
    "bengkel diesel",
    "servis mesin diesel",
    "mesin pertanian",
    "servis traktor",
    "reparasi traktor",
    "pompa industri",
    "servis mesin kapal",
    "rekondisi mesin",
    "perakitan mesin",
    "pabrik mesin pertanian",
    "alsintan",
    "mesin pengolahan",
    "bengkel otomotif berat",
    "bengkel teknik"
   ],
   "aliases_inferred": [],
   "negative_terms": [
    "servis ringan",
    "ganti oli",
    "tambal ban",
    "cuci",
    "salon mobil"
   ],
   "ambiguity_tags": [
    "vehicle_repair_overlap"
   ],
   "needs_confirmation": false,
   "source": {
    "regulation": "PP 82 Tahun 2019",
    "attachment": "Lampiran I",
    "title": "Pembagian Kelompok Tingkat Risiko Lingkungan Kerja"
   },
   "alias_review_status": "draft_v0_3",
   "added_v0_3": [
    "pabrik mesin",
    "pembuatan mesin",
    "rekayasa mesin",
    "mesin industri",
    "reparasi mesin industri",
    "servis mesin industri",
    "overhaul",
    "turun mesin",
    "korter",
    "bengkel bubut",
    "bubut",
    "frais",
    "cnc",
    "machining",
    "bengkel alat berat",
    "servis alat berat",
    "reparasi alat berat",
    "bengkel diesel",
    "servis mesin diesel",
    "mesin pertanian",
    "servis traktor",
    "reparasi traktor",
    "pompa industri",
    "servis mesin kapal",
    "rekondisi mesin",
    "perakitan mesin",
    "pabrik mesin pertanian",
    "alsintan",
    "mesin pengolahan",
    "bengkel otomotif berat",
    "bengkel teknik"
   ],
   "removed_v0_3": []
  },
  {
   "id": "G4-004",
   "group": 4,
   "risk_label": "Tinggi",
   "jkk_rate": 0.0127,
   "jkk_percent": "1.27%",
   "official_name": "Pembikinan dan reparasi kapal dari baja",
   "sectors": [
    "industri_logam"
   ],
   "activity": [
    "produksi",
    "reparasi"
   ],
   "aliases": [
    "galangan kapal",
    "galangan kapal baja",
    "shipyard",
    "dok kapal",
    "docking kapal",
    "reparasi kapal",
    "perbaikan kapal",
    "pembuatan kapal",
    "kapal baja",
    "pembuatan tongkang",
    "ship repair",
    "floating dock",
    "graving dock",
    "slipway",
    "industri perkapalan"
   ],
   "aliases_inferred": [],
   "negative_terms": [
    "kayu",
    "kapal kayu",
    "perahu",
    "angkutan",
    "pelayaran"
   ],
   "ambiguity_tags": [],
   "needs_confirmation": false,
   "source": {
    "regulation": "PP 82 Tahun 2019",
    "attachment": "Lampiran I",
    "title": "Pembagian Kelompok Tingkat Risiko Lingkungan Kerja"
   },
   "alias_review_status": "draft_v0_3",
   "added_v0_3": [
    "galangan kapal",
    "galangan kapal baja",
    "shipyard",
    "dok kapal",
    "docking kapal",
    "reparasi kapal",
    "perbaikan kapal",
    "pembuatan kapal",
    "kapal baja",
    "pembuatan tongkang",
    "ship repair",
    "floating dock",
    "graving dock",
    "slipway",
    "industri perkapalan"
   ],
   "removed_v0_3": []
  },
  {
   "id": "G4-005",
   "group": 4,
   "risk_label": "Tinggi",
   "jkk_rate": 0.0127,
   "jkk_percent": "1.27%",
   "official_name": "Pembikinan dan reparasi alat perhubungan kereta api",
   "sectors": [
    "industri_logam"
   ],
   "activity": [
    "produksi",
    "reparasi"
   ],
   "aliases": [
    "gerbong",
    "pembuatan gerbong",
    "perbaikan gerbong",
    "perawatan lokomotif",
    "balai yasa",
    "depo kereta",
    "perawatan sarana kereta",
    "sarana perkeretaapian",
    "rolling stock",
    "industri kereta"
   ],
   "aliases_inferred": [],
   "negative_terms": [],
   "ambiguity_tags": [],
   "needs_confirmation": false,
   "source": {
    "regulation": "PP 82 Tahun 2019",
    "attachment": "Lampiran I",
    "title": "Pembagian Kelompok Tingkat Risiko Lingkungan Kerja"
   },
   "alias_review_status": "draft_v0_3",
   "added_v0_3": [
    "gerbong",
    "pembuatan gerbong",
    "perbaikan gerbong",
    "perawatan lokomotif",
    "balai yasa",
    "depo kereta",
    "perawatan sarana kereta",
    "sarana perkeretaapian",
    "rolling stock",
    "industri kereta"
   ],
   "removed_v0_3": []
  },
  {
   "id": "G4-006",
   "group": 4,
   "risk_label": "Tinggi",
   "jkk_rate": 0.0127,
   "jkk_percent": "1.27%",
   "official_name": "Pabrik kendaraan bermotor dan bagian-bagiannya",
   "sectors": [
    "industri_logam"
   ],
   "activity": [
    "produksi"
   ],
   "aliases": [
    "pabrik mobil",
    "pabrik motor",
    "perakitan mobil",
    "perakitan motor",
    "perakitan kendaraan",
    "industri otomotif",
    "komponen otomotif",
    "suku cadang produksi",
    "sparepart produksi",
    "spare part otomotif",
    "karoseri",
    "pembuatan bak truk",
    "bak truk",
    "body bus",
    "rangka kendaraan",
    "velg produksi",
    "pabrik komponen",
    "industri komponen kendaraan"
   ],
   "aliases_inferred": [
    "perakitan motor listrik",
    "perakitan mobil listrik",
    "pabrik baterai kendaraan"
   ],
   "negative_terms": [
    "bengkel",
    "servis"
   ],
   "ambiguity_tags": [],
   "needs_confirmation": false,
   "source": {
    "regulation": "PP 82 Tahun 2019",
    "attachment": "Lampiran I",
    "title": "Pembagian Kelompok Tingkat Risiko Lingkungan Kerja"
   },
   "alias_review_status": "draft_v0_3",
   "added_v0_3": [
    "pabrik mobil",
    "pabrik motor",
    "perakitan mobil",
    "perakitan motor",
    "perakitan kendaraan",
    "industri otomotif",
    "komponen otomotif",
    "suku cadang produksi",
    "sparepart produksi",
    "spare part otomotif",
    "karoseri",
    "pembuatan bak truk",
    "bak truk",
    "body bus",
    "rangka kendaraan",
    "velg produksi",
    "pabrik komponen",
    "industri komponen kendaraan"
   ],
   "removed_v0_3": []
  },
  {
   "id": "G4-007",
   "group": 4,
   "risk_label": "Tinggi",
   "jkk_rate": 0.0127,
   "jkk_percent": "1.27%",
   "official_name": "Pabrik dan reparasi kapal udara",
   "sectors": [
    "industri_logam"
   ],
   "activity": [
    "produksi",
    "reparasi"
   ],
   "aliases": [
    "perawatan pesawat",
    "mro pesawat",
    "mro",
    "hanggar",
    "bengkel pesawat",
    "maintenance pesawat",
    "perbaikan pesawat",
    "industri pesawat",
    "komponen pesawat",
    "pembuatan pesawat"
   ],
   "aliases_inferred": [
    "produksi drone",
    "perakitan drone"
   ],
   "negative_terms": [],
   "ambiguity_tags": [],
   "needs_confirmation": false,
   "source": {
    "regulation": "PP 82 Tahun 2019",
    "attachment": "Lampiran I",
    "title": "Pembagian Kelompok Tingkat Risiko Lingkungan Kerja"
   },
   "alias_review_status": "draft_v0_3",
   "added_v0_3": [
    "perawatan pesawat",
    "mro pesawat",
    "mro",
    "hanggar",
    "bengkel pesawat",
    "maintenance pesawat",
    "perbaikan pesawat",
    "industri pesawat",
    "komponen pesawat",
    "pembuatan pesawat"
   ],
   "removed_v0_3": []
  },
  {
   "id": "G4-008",
   "group": 4,
   "risk_label": "Tinggi",
   "jkk_rate": 0.0127,
   "jkk_percent": "1.27%",
   "official_name": "Perusahaan kereta api",
   "sectors": [
    "transportasi"
   ],
   "activity": [
    "angkutan"
   ],
   "aliases": [
    "kereta api",
    "operator kereta",
    "kereta",
    "perkeretaapian",
    "krl",
    "lrt",
    "mrt",
    "kereta komuter",
    "operator perkeretaapian",
    "angkutan kereta",
    "monorel"
   ],
   "aliases_inferred": [
    "kereta gantung"
   ],
   "negative_terms": [],
   "ambiguity_tags": [],
   "needs_confirmation": false,
   "source": {
    "regulation": "PP 82 Tahun 2019",
    "attachment": "Lampiran I",
    "title": "Pembagian Kelompok Tingkat Risiko Lingkungan Kerja"
   },
   "alias_review_status": "draft_v0_3",
   "added_v0_3": [
    "kereta",
    "perkeretaapian",
    "krl",
    "lrt",
    "mrt",
    "kereta komuter",
    "operator perkeretaapian",
    "angkutan kereta",
    "monorel"
   ],
   "removed_v0_3": []
  },
  {
   "id": "G4-009",
   "group": 4,
   "risk_label": "Tinggi",
   "jkk_rate": 0.0127,
   "jkk_percent": "1.27%",
   "official_name": "Perusahaan trem dan bus",
   "sectors": [
    "transportasi"
   ],
   "activity": [
    "angkutan"
   ],
   "aliases": [
    "perusahaan bus",
    "operator bus",
    "trem",
    "po bus",
    "perusahaan otobus",
    "po",
    "bus antar kota",
    "akap",
    "akdp",
    "bus pariwisata",
    "sewa bus",
    "bus kota",
    "brt",
    "bus rapid transit",
    "angkutan bus",
    "bus sekolah",
    "otobus"
   ],
   "aliases_inferred": [],
   "negative_terms": [],
   "ambiguity_tags": [],
   "needs_confirmation": false,
   "source": {
    "regulation": "PP 82 Tahun 2019",
    "attachment": "Lampiran I",
    "title": "Pembagian Kelompok Tingkat Risiko Lingkungan Kerja"
   },
   "alias_review_status": "draft_v0_3",
   "added_v0_3": [
    "po bus",
    "perusahaan otobus",
    "po",
    "bus antar kota",
    "akap",
    "akdp",
    "bus pariwisata",
    "sewa bus",
    "bus kota",
    "brt",
    "bus rapid transit",
    "angkutan bus",
    "bus sekolah",
    "otobus"
   ],
   "removed_v0_3": []
  },
  {
   "id": "G4-010",
   "group": 4,
   "risk_label": "Tinggi",
   "jkk_rate": 0.0127,
   "jkk_percent": "1.27%",
   "official_name": "Pengangkutan barang dan penumpang di jalan (bus, truk, taksi, dan angkutan massal)",
   "sectors": [
    "transportasi"
   ],
   "activity": [
    "angkutan"
   ],
   "aliases": [
    "trucking",
    "angkutan truk",
    "bus",
    "taksi",
    "angkot",
    "angkutan darat",
    "travel darat",
    "transportasi darat",
    "angkutan",
    "transportasi",
    "truk",
    "armada truk",
    "jasa angkutan",
    "angkutan barang",
    "angkutan penumpang",
    "rental mobil dengan sopir",
    "sewa mobil dengan sopir",
    "sewa mobil plus sopir",
    "shuttle",
    "travel antar kota",
    "antar jemput",
    "antar jemput sekolah",
    "antar jemput karyawan",
    "bus karyawan",
    "mobil box",
    "jasa angkut",
    "pindahan",
    "jasa pindahan",
    "moving service",
    "towing",
    "derek",
    "jasa derek",
    "mobil derek",
    "angkutan bbm",
    "mobil tangki",
    "angkutan kontainer",
    "trailer",
    "container trucking",
    "dump truck",
    "angkutan material",
    "angkutan pasir",
    "ekspedisi darat",
    "angkutan sembako",
    "angkutan hewan",
    "angkutan pedesaan",
    "mikrolet",
    "bajaj",
    "bemo",
    "angkutan kota",
    "taksi online",
    "hauling",
    "hauling batubara",
    "angkutan tbs",
    "angkutan sawit",
    "travel"
   ],
   "aliases_inferred": [
    "kurir",
    "jasa kurir",
    "pengiriman barang",
    "jasa pengiriman",
    "logistik",
    "jasa logistik",
    "ojek",
    "ojol",
    "ojek online",
    "perusahaan ojek",
    "rental mobil",
    "sewa mobil",
    "rental motor",
    "sewa motor",
    "rental kendaraan"
   ],
   "negative_terms": [
    "freight forwarding",
    "forwarder",
    "ekspedisi laut",
    "ekspedisi udara",
    "lepas kunci"
   ],
   "ambiguity_tags": [
    "freight_forwarder_vs_transport_operator"
   ],
   "needs_confirmation": true,
   "source": {
    "regulation": "PP 82 Tahun 2019",
    "attachment": "Lampiran I",
    "title": "Pembagian Kelompok Tingkat Risiko Lingkungan Kerja"
   },
   "alias_review_status": "draft_v0_3",
   "added_v0_3": [
    "angkutan",
    "transportasi",
    "truk",
    "armada truk",
    "jasa angkutan",
    "angkutan barang",
    "angkutan penumpang",
    "rental mobil dengan sopir",
    "sewa mobil dengan sopir",
    "sewa mobil plus sopir",
    "shuttle",
    "travel antar kota",
    "antar jemput",
    "antar jemput sekolah",
    "antar jemput karyawan",
    "bus karyawan",
    "mobil box",
    "jasa angkut",
    "pindahan",
    "jasa pindahan",
    "moving service",
    "towing",
    "derek",
    "jasa derek",
    "mobil derek",
    "angkutan bbm",
    "mobil tangki",
    "angkutan kontainer",
    "trailer",
    "container trucking",
    "dump truck",
    "angkutan material",
    "angkutan pasir",
    "ekspedisi darat",
    "angkutan sembako",
    "angkutan hewan",
    "angkutan pedesaan",
    "mikrolet",
    "bajaj",
    "bemo",
    "angkutan kota",
    "taksi online",
    "hauling",
    "hauling batubara",
    "angkutan tbs",
    "angkutan sawit",
    "travel"
   ],
   "removed_v0_3": []
  },
  {
   "id": "G4-011",
   "group": 4,
   "risk_label": "Tinggi",
   "jkk_rate": 0.0127,
   "jkk_percent": "1.27%",
   "official_name": "Penimbunan barang/veem",
   "sectors": [
    "transportasi"
   ],
   "activity": [
    "angkutan"
   ],
   "aliases": [
    "gudang",
    "warehouse",
    "penimbunan barang",
    "veem",
    "pergudangan",
    "penyimpanan",
    "jasa penyimpanan",
    "gudang penyimpanan",
    "penyimpanan barang",
    "jasa gudang",
    "sewa gudang",
    "gudang sewa",
    "cold storage",
    "gudang pendingin",
    "depo kontainer",
    "depo peti kemas",
    "container yard",
    "gudang berikat",
    "fulfillment center",
    "fulfillment",
    "gudang logistik",
    "distribution center",
    "silo",
    "gudang beras",
    "gudang pupuk",
    "penumpukan barang",
    "stockpile"
   ],
   "aliases_inferred": [
    "bongkar muat",
    "jasa bongkar muat",
    "perusahaan bongkar muat",
    "pbm",
    "stevedoring",
    "tkbm"
   ],
   "negative_terms": [
    "tembakau"
   ],
   "ambiguity_tags": [],
   "needs_confirmation": false,
   "source": {
    "regulation": "PP 82 Tahun 2019",
    "attachment": "Lampiran I",
    "title": "Pembagian Kelompok Tingkat Risiko Lingkungan Kerja"
   },
   "alias_review_status": "draft_v0_3",
   "added_v0_3": [
    "pergudangan",
    "penyimpanan",
    "jasa penyimpanan",
    "gudang penyimpanan",
    "penyimpanan barang",
    "jasa gudang",
    "sewa gudang",
    "gudang sewa",
    "cold storage",
    "gudang pendingin",
    "depo kontainer",
    "depo peti kemas",
    "container yard",
    "gudang berikat",
    "fulfillment center",
    "fulfillment",
    "gudang logistik",
    "distribution center",
    "silo",
    "gudang beras",
    "gudang pupuk",
    "penumpukan barang",
    "stockpile"
   ],
   "removed_v0_3": []
  },
  {
   "id": "G4-012",
   "group": 4,
   "risk_label": "Tinggi",
   "jkk_rate": 0.0127,
   "jkk_percent": "1.27%",
   "official_name": "Pengolahan limbah/B3",
   "sectors": [
    "energi_utilitas"
   ],
   "activity": [
    "utilitas"
   ],
   "aliases": [
    "limbah B3",
    "pengolahan limbah",
    "waste treatment",
    "B3",
    "limbah",
    "limbah industri",
    "limbah medis",
    "pengelolaan limbah b3",
    "transporter limbah",
    "pengangkut limbah b3",
    "insinerator",
    "incinerator",
    "ipal",
    "pengolahan air limbah",
    "pengepul oli bekas",
    "oli bekas",
    "pengolahan aki bekas",
    "limbah b3 medis",
    "pemanfaatan limbah b3",
    "daur ulang limbah b3",
    "fly ash",
    "slag",
    "limbah berbahaya"
   ],
   "aliases_inferred": [],
   "negative_terms": [
    "domestik",
    "sampah rumah tangga",
    "sedot wc"
   ],
   "ambiguity_tags": [],
   "needs_confirmation": false,
   "source": {
    "regulation": "PP 82 Tahun 2019",
    "attachment": "Lampiran I",
    "title": "Pembagian Kelompok Tingkat Risiko Lingkungan Kerja"
   },
   "alias_review_status": "draft_v0_3",
   "added_v0_3": [
    "limbah",
    "limbah industri",
    "limbah medis",
    "pengelolaan limbah b3",
    "transporter limbah",
    "pengangkut limbah b3",
    "insinerator",
    "incinerator",
    "ipal",
    "pengolahan air limbah",
    "pengepul oli bekas",
    "oli bekas",
    "pengolahan aki bekas",
    "limbah b3 medis",
    "pemanfaatan limbah b3",
    "daur ulang limbah b3",
    "fly ash",
    "slag",
    "limbah berbahaya"
   ],
   "removed_v0_3": []
  },
  {
   "id": "G4-013",
   "group": 4,
   "risk_label": "Tinggi",
   "jkk_rate": 0.0127,
   "jkk_percent": "1.27%",
   "official_name": "Perusahaan pengisian bahan bakar gas dan elpiji",
   "sectors": [
    "energi_utilitas"
   ],
   "activity": [
    "utilitas"
   ],
   "aliases": [
    "SPBG",
    "pengisian gas",
    "pengisian elpiji",
    "LPG filling",
    "spbe",
    "sppbe",
    "elpiji",
    "lpg",
    "pengisian tabung gas",
    "pengisian tabung elpiji",
    "isi ulang gas",
    "cng",
    "gas alam terkompresi",
    "pengisian lng",
    "stasiun pengisian gas"
   ],
   "aliases_inferred": [],
   "negative_terms": [],
   "ambiguity_tags": [],
   "needs_confirmation": false,
   "source": {
    "regulation": "PP 82 Tahun 2019",
    "attachment": "Lampiran I",
    "title": "Pembagian Kelompok Tingkat Risiko Lingkungan Kerja"
   },
   "alias_review_status": "draft_v0_3",
   "added_v0_3": [
    "spbe",
    "sppbe",
    "elpiji",
    "lpg",
    "pengisian tabung gas",
    "pengisian tabung elpiji",
    "isi ulang gas",
    "cng",
    "gas alam terkompresi",
    "pengisian lng",
    "stasiun pengisian gas"
   ],
   "removed_v0_3": []
  },
  {
   "id": "G4-014",
   "group": 4,
   "risk_label": "Tinggi",
   "jkk_rate": 0.0127,
   "jkk_percent": "1.27%",
   "official_name": "Pabrik alkohol dan spiritus",
   "sectors": [
    "industri_kimia"
   ],
   "activity": [
    "produksi"
   ],
   "aliases": [
    "alkohol industri",
    "etanol",
    "bioetanol",
    "spiritus",
    "metanol",
    "pabrik etanol",
    "alkohol medis produksi",
    "ethanol",
    "destilasi alkohol"
   ],
   "aliases_inferred": [],
   "negative_terms": [
    "minuman"
   ],
   "ambiguity_tags": [],
   "needs_confirmation": false,
   "source": {
    "regulation": "PP 82 Tahun 2019",
    "attachment": "Lampiran I",
    "title": "Pembagian Kelompok Tingkat Risiko Lingkungan Kerja"
   },
   "alias_review_status": "draft_v0_3",
   "added_v0_3": [
    "alkohol industri",
    "etanol",
    "bioetanol",
    "spiritus",
    "metanol",
    "pabrik etanol",
    "alkohol medis produksi",
    "ethanol",
    "destilasi alkohol"
   ],
   "removed_v0_3": []
  },
  {
   "id": "G4-015",
   "group": 4,
   "risk_label": "Tinggi",
   "jkk_rate": 0.0127,
   "jkk_percent": "1.27%",
   "official_name": "Pabrik gas dan yang sejenisnya",
   "sectors": [
    "industri_kimia"
   ],
   "activity": [
    "produksi"
   ],
   "aliases": [
    "gas industri",
    "oksigen",
    "pabrik oksigen",
    "isi ulang oksigen",
    "pengisian tabung oksigen",
    "tabung oksigen",
    "nitrogen",
    "argon",
    "asetilen",
    "gas karbit",
    "karbit",
    "gas medis",
    "air separation plant",
    "hidrogen",
    "gas las"
   ],
   "aliases_inferred": [],
   "negative_terms": [
    "elpiji",
    "lpg"
   ],
   "ambiguity_tags": [],
   "needs_confirmation": false,
   "source": {
    "regulation": "PP 82 Tahun 2019",
    "attachment": "Lampiran I",
    "title": "Pembagian Kelompok Tingkat Risiko Lingkungan Kerja"
   },
   "alias_review_status": "draft_v0_3",
   "added_v0_3": [
    "gas industri",
    "oksigen",
    "pabrik oksigen",
    "isi ulang oksigen",
    "pengisian tabung oksigen",
    "tabung oksigen",
    "nitrogen",
    "argon",
    "asetilen",
    "gas karbit",
    "karbit",
    "gas medis",
    "air separation plant",
    "hidrogen",
    "gas las"
   ],
   "removed_v0_3": []
  },
  {
   "id": "G4-016",
   "group": 4,
   "risk_label": "Tinggi",
   "jkk_rate": 0.0127,
   "jkk_percent": "1.27%",
   "official_name": "Pabrik pengecoran besi dan pembuatan baja",
   "sectors": [
    "industri_logam"
   ],
   "activity": [
    "produksi"
   ],
   "aliases": [
    "pengecoran",
    "pengecoran logam",
    "pengecoran besi",
    "cor besi",
    "cor logam",
    "foundry",
    "peleburan besi",
    "peleburan logam",
    "smelter",
    "smelter besi",
    "pabrik baja",
    "baja",
    "besi baja",
    "rolling mill",
    "besi beton produksi",
    "baja tulangan",
    "stainless steel",
    "pig iron",
    "industri baja"
   ],
   "aliases_inferred": [
    "smelter nikel",
    "feronikel",
    "nickel pig iron",
    "npi",
    "smelter aluminium",
    "peleburan aluminium",
    "cor aluminium",
    "peleburan tembaga"
   ],
   "negative_terms": [
    "tambang"
   ],
   "ambiguity_tags": [],
   "needs_confirmation": false,
   "source": {
    "regulation": "PP 82 Tahun 2019",
    "attachment": "Lampiran I",
    "title": "Pembagian Kelompok Tingkat Risiko Lingkungan Kerja"
   },
   "alias_review_status": "draft_v0_3",
   "added_v0_3": [
    "pengecoran",
    "pengecoran logam",
    "pengecoran besi",
    "cor besi",
    "cor logam",
    "foundry",
    "peleburan besi",
    "peleburan logam",
    "smelter",
    "smelter besi",
    "pabrik baja",
    "baja",
    "besi baja",
    "rolling mill",
    "besi beton produksi",
    "baja tulangan",
    "stainless steel",
    "pig iron",
    "industri baja"
   ],
   "removed_v0_3": []
  },
  {
   "id": "G4-017",
   "group": 4,
   "risk_label": "Tinggi",
   "jkk_rate": 0.0127,
   "jkk_percent": "1.27%",
   "official_name": "Perusahaan listrik/pembangkit, pemindahan dan distribusi tenaga listrik",
   "sectors": [
    "energi_utilitas"
   ],
   "activity": [
    "utilitas"
   ],
   "aliases": [
    "PLN",
    "pembangkit listrik",
    "distribusi listrik",
    "transmisi listrik",
    "pembangkit",
    "pltu",
    "pltd",
    "plta",
    "pltmh",
    "plts",
    "pltb",
    "pltp",
    "pltg",
    "pltgu",
    "ipp",
    "independent power producer",
    "gardu induk",
    "penyedia listrik",
    "perusahaan listrik",
    "energi terbarukan",
    "solar farm",
    "kelistrikan",
    "yantek",
    "pelayanan teknik listrik",
    "pemeliharaan jaringan listrik",
    "pencatat meter listrik"
   ],
   "aliases_inferred": [],
   "negative_terms": [
    "servis",
    "instalasi rumah"
   ],
   "ambiguity_tags": [],
   "needs_confirmation": false,
   "source": {
    "regulation": "PP 82 Tahun 2019",
    "attachment": "Lampiran I",
    "title": "Pembagian Kelompok Tingkat Risiko Lingkungan Kerja"
   },
   "alias_review_status": "draft_v0_3",
   "added_v0_3": [
    "pembangkit",
    "pltu",
    "pltd",
    "plta",
    "pltmh",
    "plts",
    "pltb",
    "pltp",
    "pltg",
    "pltgu",
    "ipp",
    "independent power producer",
    "gardu induk",
    "penyedia listrik",
    "perusahaan listrik",
    "energi terbarukan",
    "solar farm",
    "kelistrikan",
    "yantek",
    "pelayanan teknik listrik",
    "pemeliharaan jaringan listrik",
    "pencatat meter listrik"
   ],
   "removed_v0_3": []
  },
  {
   "id": "G4-018",
   "group": 4,
   "risk_label": "Tinggi",
   "jkk_rate": 0.0127,
   "jkk_percent": "1.27%",
   "official_name": "Pabrik gas distribusi untuk rumah tangga dan pabrik-pabrik",
   "sectors": [
    "energi_utilitas"
   ],
   "activity": [
    "utilitas"
   ],
   "aliases": [
    "distribusi gas",
    "jaringan gas",
    "jargas",
    "gas bumi distribusi",
    "pipa gas",
    "gas alam distribusi",
    "penyaluran gas",
    "niaga gas",
    "gas pipa"
   ],
   "aliases_inferred": [],
   "negative_terms": [
    "elpiji",
    "lpg",
    "tabung"
   ],
   "ambiguity_tags": [],
   "needs_confirmation": false,
   "source": {
    "regulation": "PP 82 Tahun 2019",
    "attachment": "Lampiran I",
    "title": "Pembagian Kelompok Tingkat Risiko Lingkungan Kerja"
   },
   "alias_review_status": "draft_v0_3",
   "added_v0_3": [
    "distribusi gas",
    "jaringan gas",
    "jargas",
    "gas bumi distribusi",
    "pipa gas",
    "gas alam distribusi",
    "penyaluran gas",
    "niaga gas",
    "gas pipa"
   ],
   "removed_v0_3": []
  },
  {
   "id": "G4-019",
   "group": 4,
   "risk_label": "Tinggi",
   "jkk_rate": 0.0127,
   "jkk_percent": "1.27%",
   "official_name": "Industri uap untuk tenaga",
   "sectors": [
    "energi_utilitas"
   ],
   "activity": [
    "utilitas"
   ],
   "aliases": [
    "uap",
    "steam",
    "boiler",
    "ketel uap",
    "pembangkit uap",
    "steam plant",
    "penyedia uap",
    "industri uap"
   ],
   "aliases_inferred": [],
   "negative_terms": [],
   "ambiguity_tags": [],
   "needs_confirmation": false,
   "source": {
    "regulation": "PP 82 Tahun 2019",
    "attachment": "Lampiran I",
    "title": "Pembagian Kelompok Tingkat Risiko Lingkungan Kerja"
   },
   "alias_review_status": "draft_v0_3",
   "added_v0_3": [
    "uap",
    "steam",
    "boiler",
    "ketel uap",
    "pembangkit uap",
    "steam plant",
    "penyedia uap",
    "industri uap"
   ],
   "removed_v0_3": []
  },
  {
   "id": "G4-020",
   "group": 4,
   "risk_label": "Tinggi",
   "jkk_rate": 0.0127,
   "jkk_percent": "1.27%",
   "official_name": "Penangkapan ikan laut",
   "sectors": [
    "peternakan_perikanan"
   ],
   "activity": [
    "ekstraksi"
   ],
   "aliases": [
    "nelayan laut",
    "penangkapan ikan laut",
    "kapal ikan",
    "nelayan",
    "perikanan tangkap",
    "kapal penangkap ikan",
    "kapal nelayan",
    "melaut",
    "tangkap ikan",
    "penangkapan ikan",
    "kapal pukat",
    "purse seine",
    "bagan apung",
    "bagan",
    "rumpon",
    "longline",
    "rawai",
    "cantrang",
    "kapal tuna",
    "tuna longline",
    "armada penangkapan ikan",
    "juragan kapal",
    "tangkahan",
    "nelayan tangkap"
   ],
   "aliases_inferred": [],
   "negative_terms": [
    "budidaya",
    "kolam",
    "tambak",
    "keramba",
    "sungai",
    "danau",
    "waduk"
   ],
   "ambiguity_tags": [
    "aquaculture_vs_capture_fishing"
   ],
   "needs_confirmation": false,
   "source": {
    "regulation": "PP 82 Tahun 2019",
    "attachment": "Lampiran I",
    "title": "Pembagian Kelompok Tingkat Risiko Lingkungan Kerja"
   },
   "alias_review_status": "draft_v0_3",
   "added_v0_3": [
    "nelayan",
    "perikanan tangkap",
    "kapal penangkap ikan",
    "kapal nelayan",
    "melaut",
    "tangkap ikan",
    "penangkapan ikan",
    "kapal pukat",
    "purse seine",
    "bagan apung",
    "bagan",
    "rumpon",
    "longline",
    "rawai",
    "cantrang",
    "kapal tuna",
    "tuna longline",
    "armada penangkapan ikan",
    "juragan kapal",
    "tangkahan",
    "nelayan tangkap"
   ],
   "removed_v0_3": []
  },
  {
   "id": "G4-021",
   "group": 4,
   "risk_label": "Tinggi",
   "jkk_rate": 0.0127,
   "jkk_percent": "1.27%",
   "official_name": "Penangkapan ikan laut lainnya",
   "sectors": [
    "peternakan_perikanan"
   ],
   "activity": [
    "ekstraksi"
   ],
   "aliases": [
    "penangkapan udang laut",
    "tangkap cumi",
    "cumi cumi",
    "cumi",
    "sotong",
    "gurita",
    "penangkapan kepiting",
    "tangkap kepiting",
    "rajungan",
    "tangkap rajungan",
    "penangkapan lobster",
    "bubu",
    "tangkap teripang"
   ],
   "aliases_inferred": [],
   "negative_terms": [
    "budidaya",
    "kolam",
    "tambak",
    "pengupasan"
   ],
   "ambiguity_tags": [
    "aquaculture_vs_capture_fishing"
   ],
   "needs_confirmation": false,
   "source": {
    "regulation": "PP 82 Tahun 2019",
    "attachment": "Lampiran I",
    "title": "Pembagian Kelompok Tingkat Risiko Lingkungan Kerja"
   },
   "alias_review_status": "draft_v0_3",
   "added_v0_3": [
    "penangkapan udang laut",
    "tangkap cumi",
    "cumi cumi",
    "cumi",
    "sotong",
    "gurita",
    "penangkapan kepiting",
    "tangkap kepiting",
    "rajungan",
    "tangkap rajungan",
    "penangkapan lobster",
    "bubu",
    "tangkap teripang"
   ],
   "removed_v0_3": []
  },
  {
   "id": "G4-022",
   "group": 4,
   "risk_label": "Tinggi",
   "jkk_rate": 0.0127,
   "jkk_percent": "1.27%",
   "official_name": "Pengumpulan hasil laut, terkecuali ikan",
   "sectors": [
    "peternakan_perikanan"
   ],
   "activity": [
    "ekstraksi"
   ],
   "aliases": [
    "hasil laut",
    "pengumpulan rumput laut",
    "rumput laut alam",
    "pengumpul kerang",
    "pencari kerang",
    "kerang",
    "teripang",
    "pengumpulan teripang",
    "pengumpul hasil laut",
    "penyelam teripang"
   ],
   "aliases_inferred": [],
   "negative_terms": [
    "budidaya",
    "tambak",
    "garam"
   ],
   "ambiguity_tags": [],
   "needs_confirmation": false,
   "source": {
    "regulation": "PP 82 Tahun 2019",
    "attachment": "Lampiran I",
    "title": "Pembagian Kelompok Tingkat Risiko Lingkungan Kerja"
   },
   "alias_review_status": "draft_v0_3",
   "added_v0_3": [
    "hasil laut",
    "pengumpulan rumput laut",
    "rumput laut alam",
    "pengumpul kerang",
    "pencari kerang",
    "kerang",
    "teripang",
    "pengumpulan teripang",
    "pengumpul hasil laut",
    "penyelam teripang"
   ],
   "removed_v0_3": []
  },
  {
   "id": "G4-023",
   "group": 4,
   "risk_label": "Tinggi",
   "jkk_rate": 0.0127,
   "jkk_percent": "1.27%",
   "official_name": "Lori perkebunan",
   "sectors": [
    "transportasi",
    "pertanian"
   ],
   "activity": [
    "angkutan"
   ],
   "aliases": [
    "lori",
    "lori tebu",
    "kereta lori",
    "rel lori",
    "lori perkebunan",
    "lori sawit"
   ],
   "aliases_inferred": [],
   "negative_terms": [],
   "ambiguity_tags": [],
   "needs_confirmation": false,
   "source": {
    "regulation": "PP 82 Tahun 2019",
    "attachment": "Lampiran I",
    "title": "Pembagian Kelompok Tingkat Risiko Lingkungan Kerja"
   },
   "alias_review_status": "draft_v0_3",
   "added_v0_3": [
    "lori",
    "lori tebu",
    "kereta lori",
    "rel lori",
    "lori perkebunan",
    "lori sawit"
   ],
   "removed_v0_3": []
  },
  {
   "id": "G5-001",
   "group": 5,
   "risk_label": "Sangat tinggi",
   "jkk_rate": 0.0174,
   "jkk_percent": "1.74%",
   "official_name": "Penebangan dan pemotongan kayu/panglong",
   "sectors": [
    "pertanian"
   ],
   "activity": [
    "ekstraksi"
   ],
   "aliases": [
    "penebangan kayu",
    "logging",
    "panglong",
    "pemotongan kayu",
    "tebang kayu",
    "tebang pohon",
    "penebangan pohon",
    "penebang",
    "pembalakan",
    "hasil hutan kayu",
    "kayu log",
    "log kayu",
    "kayu gelondongan",
    "pemanenan kayu",
    "logging kayu"
   ],
   "aliases_inferred": [
    "jasa tebang pohon",
    "land clearing",
    "operator chainsaw"
   ],
   "negative_terms": [
    "gergaji",
    "sawmill",
    "mebel"
   ],
   "ambiguity_tags": [],
   "needs_confirmation": false,
   "source": {
    "regulation": "PP 82 Tahun 2019",
    "attachment": "Lampiran I",
    "title": "Pembagian Kelompok Tingkat Risiko Lingkungan Kerja"
   },
   "alias_review_status": "draft_v0_3",
   "added_v0_3": [
    "tebang kayu",
    "tebang pohon",
    "penebangan pohon",
    "penebang",
    "pembalakan",
    "hasil hutan kayu",
    "kayu log",
    "log kayu",
    "kayu gelondongan",
    "pemanenan kayu",
    "logging kayu"
   ],
   "removed_v0_3": []
  },
  {
   "id": "G5-002",
   "group": 5,
   "risk_label": "Sangat tinggi",
   "jkk_rate": 0.0174,
   "jkk_percent": "1.74%",
   "official_name": "Asam belerang",
   "sectors": [
    "industri_kimia"
   ],
   "activity": [
    "produksi"
   ],
   "aliases": [
    "asam sulfat",
    "h2so4",
    "sulfuric acid",
    "pabrik asam sulfat"
   ],
   "aliases_inferred": [],
   "negative_terms": [],
   "ambiguity_tags": [],
   "needs_confirmation": false,
   "source": {
    "regulation": "PP 82 Tahun 2019",
    "attachment": "Lampiran I",
    "title": "Pembagian Kelompok Tingkat Risiko Lingkungan Kerja"
   },
   "alias_review_status": "draft_v0_3",
   "added_v0_3": [
    "asam sulfat",
    "h2so4",
    "sulfuric acid",
    "pabrik asam sulfat"
   ],
   "removed_v0_3": []
  },
  {
   "id": "G5-003",
   "group": 5,
   "risk_label": "Sangat tinggi",
   "jkk_rate": 0.0174,
   "jkk_percent": "1.74%",
   "official_name": "Pabrik pupuk",
   "sectors": [
    "industri_kimia"
   ],
   "activity": [
    "produksi"
   ],
   "aliases": [
    "pupuk",
    "pabrik pupuk",
    "pupuk organik",
    "pupuk kompos",
    "pupuk kandang produksi",
    "pupuk cair",
    "poc",
    "pupuk npk",
    "urea produksi",
    "pupuk hayati",
    "granul pupuk",
    "pengemasan pupuk",
    "kascing",
    "biofertilizer",
    "produksi pupuk",
    "industri pupuk"
   ],
   "aliases_inferred": [],
   "negative_terms": [],
   "ambiguity_tags": [],
   "needs_confirmation": false,
   "source": {
    "regulation": "PP 82 Tahun 2019",
    "attachment": "Lampiran I",
    "title": "Pembagian Kelompok Tingkat Risiko Lingkungan Kerja"
   },
   "alias_review_status": "draft_v0_3",
   "added_v0_3": [
    "pupuk",
    "pabrik pupuk",
    "pupuk organik",
    "pupuk kompos",
    "pupuk kandang produksi",
    "pupuk cair",
    "poc",
    "pupuk npk",
    "urea produksi",
    "pupuk hayati",
    "granul pupuk",
    "pengemasan pupuk",
    "kascing",
    "biofertilizer",
    "produksi pupuk",
    "industri pupuk"
   ],
   "removed_v0_3": []
  },
  {
   "id": "G5-004",
   "group": 5,
   "risk_label": "Sangat tinggi",
   "jkk_rate": 0.0174,
   "jkk_percent": "1.74%",
   "official_name": "Pabrik kaleng",
   "sectors": [
    "industri_logam"
   ],
   "activity": [
    "produksi"
   ],
   "aliases": [
    "kaleng",
    "pabrik kaleng",
    "kemasan kaleng",
    "kaleng makanan produksi",
    "kaleng cat produksi",
    "can making",
    "tin can",
    "kaleng biskuit",
    "tutup botol logam"
   ],
   "aliases_inferred": [],
   "negative_terms": [
    "rongsok"
   ],
   "ambiguity_tags": [],
   "needs_confirmation": false,
   "source": {
    "regulation": "PP 82 Tahun 2019",
    "attachment": "Lampiran I",
    "title": "Pembagian Kelompok Tingkat Risiko Lingkungan Kerja"
   },
   "alias_review_status": "draft_v0_3",
   "added_v0_3": [
    "kaleng",
    "pabrik kaleng",
    "kemasan kaleng",
    "kaleng makanan produksi",
    "kaleng cat produksi",
    "can making",
    "tin can",
    "kaleng biskuit",
    "tutup botol logam"
   ],
   "removed_v0_3": []
  },
  {
   "id": "G5-005",
   "group": 5,
   "risk_label": "Sangat tinggi",
   "jkk_rate": 0.0174,
   "jkk_percent": "1.74%",
   "official_name": "Perbaikan rumah, jalan, terusan konstruksi berat, pipa air, jembatan kereta api, dan instalasi listrik",
   "sectors": [
    "konstruksi"
   ],
   "activity": [
    "konstruksi"
   ],
   "aliases": [
    "konstruksi",
    "proyek jalan",
    "jembatan",
    "konstruksi berat",
    "instalasi listrik",
    "perbaikan rumah",
    "proyek pipa air",
    "kontraktor",
    "jasa konstruksi",
    "pemborong",
    "borongan bangunan",
    "pembangunan rumah",
    "bangun rumah",
    "renovasi",
    "renovasi rumah",
    "renovasi bangunan",
    "perbaikan bangunan",
    "proyek",
    "proyek bangunan",
    "proyek konstruksi",
    "proyek gedung",
    "pembangunan gedung",
    "pembangunan jalan",
    "pengaspalan",
    "pengaspalan jalan",
    "betonisasi",
    "pembangunan irigasi",
    "drainase",
    "pemasangan pipa",
    "instalasi pipa",
    "plumbing",
    "instalasi air",
    "pemasangan listrik",
    "kelistrikan gedung",
    "mekanikal elektrikal",
    "mep",
    "pekerjaan sipil",
    "sipil",
    "pengerukan",
    "dredging",
    "pemancangan",
    "piling",
    "bored pile",
    "pemasangan baja ringan",
    "pemasangan kanopi",
    "pemasangan keramik",
    "pengecatan gedung",
    "jasa pengecatan",
    "waterproofing",
    "pembangunan perumahan",
    "konstruksi baja",
    "erection",
    "pembangunan tower",
    "tukang bangunan",
    "mandor bangunan",
    "sub kontraktor",
    "subkon",
    "pekerjaan konstruksi",
    "bangunan gedung",
    "konstruksi bangunan",
    "kontraktor listrik",
    "kontraktor sipil",
    "kontraktor interior",
    "fit out",
    "interior kontraktor"
   ],
   "aliases_inferred": [
    "sumur bor",
    "pengeboran sumur",
    "bor sumur",
    "pemasangan ac",
    "instalasi ac gedung",
    "pemasangan cctv",
    "penggelaran kabel fiber optik",
    "pembangunan bts",
    "developer perumahan",
    "pengembang perumahan",
    "pemasangan panel surya",
    "pemasangan pagar"
   ],
   "negative_terms": [],
   "ambiguity_tags": [
    "construction_special_route"
   ],
   "needs_confirmation": true,
   "source": {
    "regulation": "PP 82 Tahun 2019",
    "attachment": "Lampiran I",
    "title": "Pembagian Kelompok Tingkat Risiko Lingkungan Kerja"
   },
   "alias_review_status": "draft_v0_3",
   "added_v0_3": [
    "kontraktor",
    "jasa konstruksi",
    "pemborong",
    "borongan bangunan",
    "pembangunan rumah",
    "bangun rumah",
    "renovasi",
    "renovasi rumah",
    "renovasi bangunan",
    "perbaikan bangunan",
    "proyek",
    "proyek bangunan",
    "proyek konstruksi",
    "proyek gedung",
    "pembangunan gedung",
    "pembangunan jalan",
    "pengaspalan",
    "pengaspalan jalan",
    "betonisasi",
    "pembangunan irigasi",
    "drainase",
    "pemasangan pipa",
    "instalasi pipa",
    "plumbing",
    "instalasi air",
    "pemasangan listrik",
    "kelistrikan gedung",
    "mekanikal elektrikal",
    "mep",
    "pekerjaan sipil",
    "sipil",
    "pengerukan",
    "dredging",
    "pemancangan",
    "piling",
    "bored pile",
    "pemasangan baja ringan",
    "pemasangan kanopi",
    "pemasangan keramik",
    "pengecatan gedung",
    "jasa pengecatan",
    "waterproofing",
    "pembangunan perumahan",
    "konstruksi baja",
    "erection",
    "pembangunan tower",
    "tukang bangunan",
    "mandor bangunan",
    "sub kontraktor",
    "subkon",
    "pekerjaan konstruksi",
    "bangunan gedung",
    "konstruksi bangunan",
    "kontraktor listrik",
    "kontraktor sipil",
    "kontraktor interior",
    "fit out",
    "interior kontraktor"
   ],
   "removed_v0_3": []
  },
  {
   "id": "G5-006",
   "group": 5,
   "risk_label": "Sangat tinggi",
   "jkk_rate": 0.0174,
   "jkk_percent": "1.74%",
   "official_name": "Pengangkutan barang dan penumpang di laut",
   "sectors": [
    "transportasi"
   ],
   "activity": [
    "angkutan"
   ],
   "aliases": [
    "angkutan laut",
    "kapal penumpang",
    "kapal barang",
    "shipping operator",
    "pelayaran",
    "perusahaan pelayaran",
    "shipping",
    "shipping line",
    "kapal laut",
    "kapal ferry",
    "feri",
    "ferry",
    "penyeberangan",
    "kapal penyeberangan",
    "tongkang",
    "kapal tongkang",
    "tugboat",
    "kapal tunda",
    "kapal tanker",
    "tanker",
    "kapal kargo",
    "kapal kontainer",
    "kapal roro",
    "kapal cepat",
    "perahu penyeberangan",
    "operator kapal",
    "angkutan laut penumpang",
    "pelayaran rakyat"
   ],
   "aliases_inferred": [
    "angkutan sungai",
    "angkutan danau",
    "kapal wisata",
    "speedboat wisata",
    "perahu wisata"
   ],
   "negative_terms": [
    "freight forwarding",
    "forwarder",
    "galangan",
    "reparasi",
    "agen pelayaran",
    "keagenan"
   ],
   "ambiguity_tags": [
    "freight_forwarder_vs_transport_operator"
   ],
   "needs_confirmation": true,
   "source": {
    "regulation": "PP 82 Tahun 2019",
    "attachment": "Lampiran I",
    "title": "Pembagian Kelompok Tingkat Risiko Lingkungan Kerja"
   },
   "alias_review_status": "draft_v0_3",
   "added_v0_3": [
    "pelayaran",
    "perusahaan pelayaran",
    "shipping",
    "shipping line",
    "kapal laut",
    "kapal ferry",
    "feri",
    "ferry",
    "penyeberangan",
    "kapal penyeberangan",
    "tongkang",
    "kapal tongkang",
    "tugboat",
    "kapal tunda",
    "kapal tanker",
    "tanker",
    "kapal kargo",
    "kapal kontainer",
    "kapal roro",
    "kapal cepat",
    "perahu penyeberangan",
    "operator kapal",
    "angkutan laut penumpang",
    "pelayaran rakyat"
   ],
   "removed_v0_3": []
  },
  {
   "id": "G5-007",
   "group": 5,
   "risk_label": "Sangat tinggi",
   "jkk_rate": 0.0174,
   "jkk_percent": "1.74%",
   "official_name": "Pengangkutan barang dan penumpang di udara",
   "sectors": [
    "transportasi"
   ],
   "activity": [
    "angkutan"
   ],
   "aliases": [
    "angkutan udara",
    "maskapai",
    "air cargo operator",
    "airline",
    "maskapai penerbangan",
    "penerbangan",
    "carter pesawat",
    "charter pesawat",
    "operator helikopter",
    "helikopter",
    "angkutan udara niaga",
    "penerbangan perintis",
    "air charter",
    "kargo udara operator"
   ],
   "aliases_inferred": [
    "ground handling",
    "operator drone",
    "pengelola bandara"
   ],
   "negative_terms": [
    "freight forwarding",
    "forwarder",
    "agen tiket",
    "travel",
    "mro",
    "perawatan pesawat"
   ],
   "ambiguity_tags": [
    "freight_forwarder_vs_transport_operator"
   ],
   "needs_confirmation": true,
   "source": {
    "regulation": "PP 82 Tahun 2019",
    "attachment": "Lampiran I",
    "title": "Pembagian Kelompok Tingkat Risiko Lingkungan Kerja"
   },
   "alias_review_status": "draft_v0_3",
   "added_v0_3": [
    "maskapai penerbangan",
    "penerbangan",
    "carter pesawat",
    "charter pesawat",
    "operator helikopter",
    "helikopter",
    "angkutan udara niaga",
    "penerbangan perintis",
    "air charter",
    "kargo udara operator"
   ],
   "removed_v0_3": []
  },
  {
   "id": "G5-008",
   "group": 5,
   "risk_label": "Sangat tinggi",
   "jkk_rate": 0.0174,
   "jkk_percent": "1.74%",
   "official_name": "Pabrik korek api",
   "sectors": [
    "industri_kimia"
   ],
   "activity": [
    "produksi"
   ],
   "aliases": [
    "korek api",
    "korek",
    "pabrik korek",
    "korek gas",
    "mancis",
    "geretan",
    "lighter"
   ],
   "aliases_inferred": [],
   "negative_terms": [],
   "ambiguity_tags": [],
   "needs_confirmation": false,
   "source": {
    "regulation": "PP 82 Tahun 2019",
    "attachment": "Lampiran I",
    "title": "Pembagian Kelompok Tingkat Risiko Lingkungan Kerja"
   },
   "alias_review_status": "draft_v0_3",
   "added_v0_3": [
    "korek api",
    "korek",
    "pabrik korek",
    "korek gas",
    "mancis",
    "geretan",
    "lighter"
   ],
   "removed_v0_3": []
  },
  {
   "id": "G5-009",
   "group": 5,
   "risk_label": "Sangat tinggi",
   "jkk_rate": 0.0174,
   "jkk_percent": "1.74%",
   "official_name": "Pertambangan minyak mentah dan gas bumi",
   "sectors": [
    "tambang"
   ],
   "activity": [
    "ekstraksi"
   ],
   "aliases": [
    "migas",
    "minyak mentah",
    "gas bumi",
    "oil and gas",
    "minyak dan gas",
    "minyak bumi",
    "pengeboran minyak",
    "drilling",
    "oil drilling",
    "eksplorasi migas",
    "produksi migas",
    "sumur minyak",
    "sumur migas",
    "lapangan migas",
    "kkks",
    "kontraktor migas",
    "offshore",
    "rig",
    "rig pengeboran",
    "lepas pantai",
    "hulu migas",
    "oil company"
   ],
   "aliases_inferred": [
    "jasa penunjang migas",
    "oilfield services",
    "sumur minyak rakyat",
    "sumur tua"
   ],
   "negative_terms": [
    "spbu",
    "kilang"
   ],
   "ambiguity_tags": [],
   "needs_confirmation": false,
   "source": {
    "regulation": "PP 82 Tahun 2019",
    "attachment": "Lampiran I",
    "title": "Pembagian Kelompok Tingkat Risiko Lingkungan Kerja"
   },
   "alias_review_status": "draft_v0_3",
   "added_v0_3": [
    "minyak dan gas",
    "minyak bumi",
    "pengeboran minyak",
    "drilling",
    "oil drilling",
    "eksplorasi migas",
    "produksi migas",
    "sumur minyak",
    "sumur migas",
    "lapangan migas",
    "kkks",
    "kontraktor migas",
    "offshore",
    "rig",
    "rig pengeboran",
    "lepas pantai",
    "hulu migas",
    "oil company"
   ],
   "removed_v0_3": []
  },
  {
   "id": "G5-010",
   "group": 5,
   "risk_label": "Sangat tinggi",
   "jkk_rate": 0.0174,
   "jkk_percent": "1.74%",
   "official_name": "Penggalian batu",
   "sectors": [
    "tambang"
   ],
   "activity": [
    "ekstraksi"
   ],
   "aliases": [
    "tambang batu",
    "galian batu",
    "quarry batu",
    "quarry",
    "galian c",
    "galian golongan c",
    "batu kali",
    "batu split",
    "pemecah batu",
    "stone crusher",
    "crusher batu",
    "tambang andesit",
    "andesit",
    "batu andesit",
    "batu gunung",
    "pertambangan batuan",
    "penambangan batu",
    "batu koral",
    "koral",
    "batu alam penambangan"
   ],
   "aliases_inferred": [],
   "negative_terms": [
    "bata",
    "batu bata",
    "batu akik"
   ],
   "ambiguity_tags": [],
   "needs_confirmation": false,
   "source": {
    "regulation": "PP 82 Tahun 2019",
    "attachment": "Lampiran I",
    "title": "Pembagian Kelompok Tingkat Risiko Lingkungan Kerja"
   },
   "alias_review_status": "draft_v0_3",
   "added_v0_3": [
    "quarry",
    "galian c",
    "galian golongan c",
    "batu kali",
    "batu split",
    "pemecah batu",
    "stone crusher",
    "crusher batu",
    "tambang andesit",
    "andesit",
    "batu andesit",
    "batu gunung",
    "pertambangan batuan",
    "penambangan batu",
    "batu koral",
    "koral",
    "batu alam penambangan"
   ],
   "removed_v0_3": []
  },
  {
   "id": "G5-011",
   "group": 5,
   "risk_label": "Sangat tinggi",
   "jkk_rate": 0.0174,
   "jkk_percent": "1.74%",
   "official_name": "Penggalian tanah liat",
   "sectors": [
    "tambang"
   ],
   "activity": [
    "ekstraksi"
   ],
   "aliases": [
    "tanah liat",
    "galian tanah liat",
    "tambang tanah liat",
    "lempung",
    "kaolin",
    "tambang kaolin",
    "bentonit",
    "clay"
   ],
   "aliases_inferred": [
    "tanah urug",
    "galian tanah",
    "tanah timbun",
    "urugan"
   ],
   "negative_terms": [
    "gerabah",
    "genteng",
    "bata",
    "keramik"
   ],
   "ambiguity_tags": [],
   "needs_confirmation": false,
   "source": {
    "regulation": "PP 82 Tahun 2019",
    "attachment": "Lampiran I",
    "title": "Pembagian Kelompok Tingkat Risiko Lingkungan Kerja"
   },
   "alias_review_status": "draft_v0_3",
   "added_v0_3": [
    "tanah liat",
    "galian tanah liat",
    "tambang tanah liat",
    "lempung",
    "kaolin",
    "tambang kaolin",
    "bentonit",
    "clay"
   ],
   "removed_v0_3": []
  },
  {
   "id": "G5-012",
   "group": 5,
   "risk_label": "Sangat tinggi",
   "jkk_rate": 0.0174,
   "jkk_percent": "1.74%",
   "official_name": "Penggalian pasir",
   "sectors": [
    "tambang"
   ],
   "activity": [
    "ekstraksi"
   ],
   "aliases": [
    "tambang pasir",
    "galian pasir",
    "quarry pasir",
    "pasir",
    "penambangan pasir",
    "pasir sungai",
    "pasir laut",
    "sirtu",
    "pasir batu",
    "penyedotan pasir",
    "sedot pasir",
    "kuari pasir",
    "pasir silika",
    "pasir kuarsa",
    "pasir urug",
    "galian c pasir",
    "tambang galian c"
   ],
   "aliases_inferred": [],
   "negative_terms": [
    "pasir besi",
    "pasir timah"
   ],
   "ambiguity_tags": [],
   "needs_confirmation": false,
   "source": {
    "regulation": "PP 82 Tahun 2019",
    "attachment": "Lampiran I",
    "title": "Pembagian Kelompok Tingkat Risiko Lingkungan Kerja"
   },
   "alias_review_status": "draft_v0_3",
   "added_v0_3": [
    "pasir",
    "penambangan pasir",
    "pasir sungai",
    "pasir laut",
    "sirtu",
    "pasir batu",
    "penyedotan pasir",
    "sedot pasir",
    "kuari pasir",
    "pasir silika",
    "pasir kuarsa",
    "pasir urug",
    "galian c pasir",
    "tambang galian c"
   ],
   "removed_v0_3": []
  },
  {
   "id": "G5-013",
   "group": 5,
   "risk_label": "Sangat tinggi",
   "jkk_rate": 0.0174,
   "jkk_percent": "1.74%",
   "official_name": "Penggalian gamping",
   "sectors": [
    "tambang"
   ],
   "activity": [
    "ekstraksi"
   ],
   "aliases": [
    "tambang kapur",
    "batu kapur",
    "galian kapur",
    "kapur tambang",
    "dolomit",
    "tambang dolomit",
    "batu gamping",
    "kalsit",
    "penggalian kapur",
    "penambangan gamping"
   ],
   "aliases_inferred": [],
   "negative_terms": [
    "pembakaran",
    "tungku",
    "kapur barus"
   ],
   "ambiguity_tags": [],
   "needs_confirmation": false,
   "source": {
    "regulation": "PP 82 Tahun 2019",
    "attachment": "Lampiran I",
    "title": "Pembagian Kelompok Tingkat Risiko Lingkungan Kerja"
   },
   "alias_review_status": "draft_v0_3",
   "added_v0_3": [
    "tambang kapur",
    "batu kapur",
    "galian kapur",
    "kapur tambang",
    "dolomit",
    "tambang dolomit",
    "batu gamping",
    "kalsit",
    "penggalian kapur",
    "penambangan gamping"
   ],
   "removed_v0_3": []
  },
  {
   "id": "G5-014",
   "group": 5,
   "risk_label": "Sangat tinggi",
   "jkk_rate": 0.0174,
   "jkk_percent": "1.74%",
   "official_name": "Penggalian belerang",
   "sectors": [
    "tambang"
   ],
   "activity": [
    "ekstraksi"
   ],
   "aliases": [
    "belerang",
    "tambang belerang",
    "penambang belerang",
    "sulfur",
    "penambangan sulfur",
    "penambangan belerang"
   ],
   "aliases_inferred": [],
   "negative_terms": [
    "asam",
    "pabrik"
   ],
   "ambiguity_tags": [],
   "needs_confirmation": false,
   "source": {
    "regulation": "PP 82 Tahun 2019",
    "attachment": "Lampiran I",
    "title": "Pembagian Kelompok Tingkat Risiko Lingkungan Kerja"
   },
   "alias_review_status": "draft_v0_3",
   "added_v0_3": [
    "belerang",
    "tambang belerang",
    "penambang belerang",
    "sulfur",
    "penambangan sulfur",
    "penambangan belerang"
   ],
   "removed_v0_3": []
  },
  {
   "id": "G5-015",
   "group": 5,
   "risk_label": "Sangat tinggi",
   "jkk_rate": 0.0174,
   "jkk_percent": "1.74%",
   "official_name": "Tambang intan dan batu perhiasan",
   "sectors": [
    "tambang"
   ],
   "activity": [
    "ekstraksi"
   ],
   "aliases": [
    "intan",
    "tambang intan",
    "pendulangan intan",
    "batu permata",
    "permata",
    "batu mulia",
    "batu akik tambang",
    "akik",
    "giok",
    "bacan",
    "kecubung",
    "batu perhiasan",
    "gemstone",
    "penambangan batu mulia"
   ],
   "aliases_inferred": [],
   "negative_terms": [
    "asah",
    "pengrajin",
    "emas"
   ],
   "ambiguity_tags": [],
   "needs_confirmation": false,
   "source": {
    "regulation": "PP 82 Tahun 2019",
    "attachment": "Lampiran I",
    "title": "Pembagian Kelompok Tingkat Risiko Lingkungan Kerja"
   },
   "alias_review_status": "draft_v0_3",
   "added_v0_3": [
    "intan",
    "tambang intan",
    "pendulangan intan",
    "batu permata",
    "permata",
    "batu mulia",
    "batu akik tambang",
    "akik",
    "giok",
    "bacan",
    "kecubung",
    "batu perhiasan",
    "gemstone",
    "penambangan batu mulia"
   ],
   "removed_v0_3": []
  },
  {
   "id": "G5-016",
   "group": 5,
   "risk_label": "Sangat tinggi",
   "jkk_rate": 0.0174,
   "jkk_percent": "1.74%",
   "official_name": "Pertambangan lainnya",
   "sectors": [
    "tambang"
   ],
   "activity": [
    "ekstraksi"
   ],
   "aliases": [
    "pertambangan",
    "tambang",
    "penambangan",
    "pertambangan mineral",
    "kontraktor tambang",
    "jasa pertambangan",
    "mining",
    "mining contractor",
    "iup",
    "wiup",
    "tambang rakyat",
    "pertambangan rakyat",
    "wpr",
    "marmer",
    "granit",
    "fosfat",
    "gipsum",
    "zeolit",
    "tambang mineral"
   ],
   "aliases_inferred": [
    "jasa peledakan tambang",
    "blasting tambang"
   ],
   "negative_terms": [
    "tali tambang",
    "tali"
   ],
   "ambiguity_tags": [],
   "needs_confirmation": false,
   "source": {
    "regulation": "PP 82 Tahun 2019",
    "attachment": "Lampiran I",
    "title": "Pembagian Kelompok Tingkat Risiko Lingkungan Kerja"
   },
   "alias_review_status": "draft_v0_3",
   "added_v0_3": [
    "pertambangan",
    "tambang",
    "penambangan",
    "pertambangan mineral",
    "kontraktor tambang",
    "jasa pertambangan",
    "mining",
    "mining contractor",
    "iup",
    "wiup",
    "tambang rakyat",
    "pertambangan rakyat",
    "wpr",
    "marmer",
    "granit",
    "fosfat",
    "gipsum",
    "zeolit",
    "tambang mineral"
   ],
   "removed_v0_3": []
  },
  {
   "id": "G5-017",
   "group": 5,
   "risk_label": "Sangat tinggi",
   "jkk_rate": 0.0174,
   "jkk_percent": "1.74%",
   "official_name": "Tambang emas dan perak",
   "sectors": [
    "tambang"
   ],
   "activity": [
    "ekstraksi"
   ],
   "aliases": [
    "tambang emas",
    "tambang perak",
    "penambangan emas",
    "pendulangan emas",
    "dulang emas",
    "tambang emas rakyat",
    "pertambangan emas",
    "bijih emas",
    "emas tambang"
   ],
   "aliases_inferred": [
    "pengolahan bijih emas",
    "tromol emas"
   ],
   "negative_terms": [
    "perhiasan",
    "pengrajin",
    "gadai"
   ],
   "ambiguity_tags": [],
   "needs_confirmation": false,
   "source": {
    "regulation": "PP 82 Tahun 2019",
    "attachment": "Lampiran I",
    "title": "Pembagian Kelompok Tingkat Risiko Lingkungan Kerja"
   },
   "alias_review_status": "draft_v0_3",
   "added_v0_3": [
    "penambangan emas",
    "pendulangan emas",
    "dulang emas",
    "tambang emas rakyat",
    "pertambangan emas",
    "bijih emas",
    "emas tambang"
   ],
   "removed_v0_3": []
  },
  {
   "id": "G5-018",
   "group": 5,
   "risk_label": "Sangat tinggi",
   "jkk_rate": 0.0174,
   "jkk_percent": "1.74%",
   "official_name": "Penghasilan batu bara",
   "sectors": [
    "tambang"
   ],
   "activity": [
    "ekstraksi"
   ],
   "aliases": [
    "batubara",
    "batu bara",
    "tambang batubara",
    "tambang batu bara",
    "penambangan batubara",
    "pertambangan batubara",
    "coal",
    "coal mining",
    "kontraktor batubara",
    "tambang batubara terbuka"
   ],
   "aliases_inferred": [],
   "negative_terms": [
    "briket",
    "hauling",
    "angkutan",
    "pelabuhan"
   ],
   "ambiguity_tags": [],
   "needs_confirmation": false,
   "source": {
    "regulation": "PP 82 Tahun 2019",
    "attachment": "Lampiran I",
    "title": "Pembagian Kelompok Tingkat Risiko Lingkungan Kerja"
   },
   "alias_review_status": "draft_v0_3",
   "added_v0_3": [
    "tambang batu bara",
    "penambangan batubara",
    "pertambangan batubara",
    "coal",
    "coal mining",
    "kontraktor batubara",
    "tambang batubara terbuka"
   ],
   "removed_v0_3": []
  },
  {
   "id": "G5-019",
   "group": 5,
   "risk_label": "Sangat tinggi",
   "jkk_rate": 0.0174,
   "jkk_percent": "1.74%",
   "official_name": "Tambang besi mentah",
   "sectors": [
    "tambang"
   ],
   "activity": [
    "ekstraksi"
   ],
   "aliases": [
    "bijih besi",
    "tambang bijih besi",
    "tambang besi",
    "pasir besi",
    "penambangan pasir besi",
    "iron ore",
    "hematit",
    "laterit besi"
   ],
   "aliases_inferred": [],
   "negative_terms": [],
   "ambiguity_tags": [],
   "needs_confirmation": false,
   "source": {
    "regulation": "PP 82 Tahun 2019",
    "attachment": "Lampiran I",
    "title": "Pembagian Kelompok Tingkat Risiko Lingkungan Kerja"
   },
   "alias_review_status": "draft_v0_3",
   "added_v0_3": [
    "bijih besi",
    "tambang bijih besi",
    "tambang besi",
    "pasir besi",
    "penambangan pasir besi",
    "iron ore",
    "hematit",
    "laterit besi"
   ],
   "removed_v0_3": []
  },
  {
   "id": "G5-020",
   "group": 5,
   "risk_label": "Sangat tinggi",
   "jkk_rate": 0.0174,
   "jkk_percent": "1.74%",
   "official_name": "Tambang timah",
   "sectors": [
    "tambang"
   ],
   "activity": [
    "ekstraksi"
   ],
   "aliases": [
    "tambang timah",
    "timah",
    "penambangan timah",
    "bijih timah",
    "tambang inkonvensional",
    "ti apung",
    "pasir timah"
   ],
   "aliases_inferred": [
    "smelter timah"
   ],
   "negative_terms": [],
   "ambiguity_tags": [],
   "needs_confirmation": false,
   "source": {
    "regulation": "PP 82 Tahun 2019",
    "attachment": "Lampiran I",
    "title": "Pembagian Kelompok Tingkat Risiko Lingkungan Kerja"
   },
   "alias_review_status": "draft_v0_3",
   "added_v0_3": [
    "timah",
    "penambangan timah",
    "bijih timah",
    "tambang inkonvensional",
    "ti apung",
    "pasir timah"
   ],
   "removed_v0_3": []
  },
  {
   "id": "G5-021",
   "group": 5,
   "risk_label": "Sangat tinggi",
   "jkk_rate": 0.0174,
   "jkk_percent": "1.74%",
   "official_name": "Tambang bauksit",
   "sectors": [
    "tambang"
   ],
   "activity": [
    "ekstraksi"
   ],
   "aliases": [
    "tambang bauksit",
    "bauksit",
    "bijih bauksit",
    "penambangan bauksit",
    "bauxite"
   ],
   "aliases_inferred": [],
   "negative_terms": [],
   "ambiguity_tags": [],
   "needs_confirmation": false,
   "source": {
    "regulation": "PP 82 Tahun 2019",
    "attachment": "Lampiran I",
    "title": "Pembagian Kelompok Tingkat Risiko Lingkungan Kerja"
   },
   "alias_review_status": "draft_v0_3",
   "added_v0_3": [
    "bauksit",
    "bijih bauksit",
    "penambangan bauksit",
    "bauxite"
   ],
   "removed_v0_3": []
  },
  {
   "id": "G5-022",
   "group": 5,
   "risk_label": "Sangat tinggi",
   "jkk_rate": 0.0174,
   "jkk_percent": "1.74%",
   "official_name": "Tambang mangan",
   "sectors": [
    "tambang"
   ],
   "activity": [
    "ekstraksi"
   ],
   "aliases": [
    "tambang mangan",
    "mangan",
    "bijih mangan",
    "penambangan mangan",
    "manganese"
   ],
   "aliases_inferred": [],
   "negative_terms": [],
   "ambiguity_tags": [],
   "needs_confirmation": false,
   "source": {
    "regulation": "PP 82 Tahun 2019",
    "attachment": "Lampiran I",
    "title": "Pembagian Kelompok Tingkat Risiko Lingkungan Kerja"
   },
   "alias_review_status": "draft_v0_3",
   "added_v0_3": [
    "mangan",
    "bijih mangan",
    "penambangan mangan",
    "manganese"
   ],
   "removed_v0_3": []
  },
  {
   "id": "G5-023",
   "group": 5,
   "risk_label": "Sangat tinggi",
   "jkk_rate": 0.0174,
   "jkk_percent": "1.74%",
   "official_name": "Tambang logam lainnya",
   "sectors": [
    "tambang"
   ],
   "activity": [
    "ekstraksi"
   ],
   "aliases": [
    "tambang nikel",
    "nikel",
    "bijih nikel",
    "ore nikel",
    "tambang tembaga",
    "tambang logam",
    "tambang seng",
    "tambang timbal",
    "pertambangan logam",
    "tambang zirkon",
    "zirkon",
    "tambang kobalt",
    "nickel mining",
    "bijih logam"
   ],
   "aliases_inferred": [],
   "negative_terms": [
    "smelter",
    "kerajinan",
    "pelapisan"
   ],
   "ambiguity_tags": [],
   "needs_confirmation": false,
   "source": {
    "regulation": "PP 82 Tahun 2019",
    "attachment": "Lampiran I",
    "title": "Pembagian Kelompok Tingkat Risiko Lingkungan Kerja"
   },
   "alias_review_status": "draft_v0_3",
   "added_v0_3": [
    "tambang nikel",
    "nikel",
    "bijih nikel",
    "ore nikel",
    "tambang tembaga",
    "tambang logam",
    "tambang seng",
    "tambang timbal",
    "pertambangan logam",
    "tambang zirkon",
    "zirkon",
    "tambang kobalt",
    "nickel mining",
    "bijih logam"
   ],
   "removed_v0_3": []
  },
  {
   "id": "G5-024",
   "group": 5,
   "risk_label": "Sangat tinggi",
   "jkk_rate": 0.0174,
   "jkk_percent": "1.74%",
   "official_name": "Pabrik bahan peledak, bahan petasan, dan pabrik kembang api",
   "sectors": [
    "industri_kimia"
   ],
   "activity": [
    "produksi"
   ],
   "aliases": [
    "bahan peledak",
    "handak",
    "peledak",
    "dinamit",
    "petasan",
    "mercon",
    "kembang api",
    "pabrik kembang api",
    "pabrik petasan",
    "piroteknik",
    "pabrik bahan peledak"
   ],
   "aliases_inferred": [],
   "negative_terms": [],
   "ambiguity_tags": [],
   "needs_confirmation": false,
   "source": {
    "regulation": "PP 82 Tahun 2019",
    "attachment": "Lampiran I",
    "title": "Pembagian Kelompok Tingkat Risiko Lingkungan Kerja"
   },
   "alias_review_status": "draft_v0_3",
   "added_v0_3": [
    "bahan peledak",
    "handak",
    "peledak",
    "dinamit",
    "petasan",
    "mercon",
    "kembang api",
    "pabrik kembang api",
    "pabrik petasan",
    "piroteknik",
    "pabrik bahan peledak"
   ],
   "removed_v0_3": []
  }
 ],
 "decision_rules": [
  {
   "id": "retail_vs_wholesale_vs_manufacturing",
   "triggers": [
    "pakaian",
    "fashion",
    "butik",
    "usaha pakaian",
    "bisnis fashion",
    "usaha fashion",
    "pakaian muslim",
    "hijab",
    "jilbab",
    "usaha butik",
    "bisnis pakaian"
   ],
   "question": "Kegiatan utama usaha pakaian Anda yang paling sesuai?",
   "options": [
    {
     "label": "Menjual langsung ke konsumen (toko, butik, online shop)",
     "prefer": [
      "G1-008"
     ],
     "activity": "perdagangan"
    },
    {
     "label": "Grosir, distributor, atau agen ke toko/reseller",
     "prefer": [
      "G1-007"
     ],
     "activity": "perdagangan"
    },
    {
     "label": "Menjahit/memproduksi pakaian (konveksi, garmen)",
     "prefer": [
      "G1-001"
     ],
     "activity": "produksi"
    },
    {
     "label": "Membuat kain, benang, rajutan, atau batik (tekstil)",
     "prefer": [
      "G3-038",
      "G3-036",
      "G3-034",
      "G3-032"
     ],
     "activity": "produksi"
    }
   ]
  },
  {
   "id": "vehicle_repair_overlap",
   "triggers": [
    "bengkel",
    "bengkel motor",
    "bengkel mobil",
    "bengkel mesin",
    "bengkel kendaraan",
    "bengkel otomotif",
    "reparasi mesin",
    "bengkel umum",
    "reparasi kendaraan",
    "bengkel motor dan mobil"
   ],
   "question": "Pekerjaan utama bengkel Anda paling mendekati yang mana?",
   "options": [
    {
     "label": "Servis/perbaikan kendaraan pelanggan: servis berkala, ganti oli, tune up, ban, body & cat",
     "prefer": [
      "G3-095"
     ]
    },
    {
     "label": "Pekerjaan mesin: overhaul/turun mesin, bubut, rekondisi, pembuatan atau reparasi mesin",
     "prefer": [
      "G4-003"
     ]
    }
   ],
   "note": "Lampiran I menyebut \"bengkel motor, mobil\" pada dua kelompok berbeda. Pilih sesuai pekerjaan yang paling dominan."
  },
  {
   "id": "food_service_vs_manufacturing",
   "triggers": [
    "makanan",
    "usaha makanan",
    "bisnis makanan",
    "olahan",
    "frozen",
    "dapur",
    "home industry",
    "jualan makanan",
    "usaha kuliner",
    "bisnis kuliner",
    "makanan minuman",
    "usaha makanan minuman"
   ],
   "question": "Kegiatan utama usaha makanan Anda?",
   "options": [
    {
     "label": "Menyajikan makanan/minuman ke pelanggan (warung, restoran, katering)",
     "prefer": [
      "G2-024"
     ],
     "activity": "sajian"
    },
    {
     "label": "Memproduksi makanan untuk dikemas/didistribusikan",
     "prefer": [
      "G3-027",
      "G3-017",
      "G3-021",
      "G3-022",
      "G3-023",
      "G3-024",
      "G3-010",
      "G3-013"
     ],
     "activity": "produksi"
    },
    {
     "label": "Hanya menjual produk makanan dari pemasok",
     "prefer": [
      "G1-008"
     ],
     "activity": "perdagangan"
    }
   ]
  },
  {
   "id": "food_shop_vs_restaurant",
   "triggers": [
    "warung",
    "usaha warung",
    "warung kecil",
    "buka warung"
   ],
   "question": "Warung Anda terutama menjual apa?",
   "options": [
    {
     "label": "Barang kebutuhan sehari-hari (kelontong, sembako)",
     "prefer": [
      "G1-008"
     ],
     "activity": "perdagangan"
    },
    {
     "label": "Makanan/minuman siap saji (warung makan, warung kopi)",
     "prefer": [
      "G2-024"
     ],
     "activity": "sajian"
    }
   ]
  },
  {
   "id": "property_rental_vs_accommodation",
   "triggers": [
    "kos dan kontrakan",
    "sewa kamar"
   ],
   "question": "Model usahanya lebih mendekati yang mana?",
   "options": [
    {
     "label": "Penyewaan properti/aset (rumah, tanah, ruko, alat)",
     "prefer": [
      "G2-016"
     ]
    },
    {
     "label": "Penginapan/ruang sewa dengan layanan akomodasi (kos, hotel, homestay)",
     "prefer": [
      "G2-025"
     ]
    }
   ]
  },
  {
   "id": "cleaning_general_vs_waste",
   "triggers": [
    "jasa kebersihan",
    "kebersihan",
    "cleaning",
    "jasa cleaning",
    "pembersihan",
    "usaha kebersihan"
   ],
   "question": "Layanan kebersihan utama Anda?",
   "options": [
    {
     "label": "Kebersihan gedung/kantor/rumah (cleaning service, housekeeping)",
     "prefer": [
      "G1-017"
     ]
    },
    {
     "label": "Pengangkutan/penanganan sampah dan kotoran (angkut sampah, sedot WC)",
     "prefer": [
      "G3-089"
     ]
    }
   ]
  },
  {
   "id": "freight_forwarder_vs_transport_operator",
   "triggers": [
    "ekspedisi",
    "jasa ekspedisi",
    "logistik",
    "jasa logistik",
    "perusahaan logistik",
    "kargo",
    "jasa kargo",
    "kurir",
    "jasa kurir",
    "pengiriman",
    "pengiriman barang",
    "jasa pengiriman",
    "pengiriman paket",
    "shipping",
    "ekspedisi barang",
    "3pl",
    "usaha ekspedisi",
    "logistik dan ekspedisi"
   ],
   "question": "Perusahaan Anda terutama melakukan apa?",
   "options": [
    {
     "label": "Mengurus pengiriman: ekspedisi, freight forwarding, agen kargo/kurir",
     "prefer": [
      "G3-090"
     ]
    },
    {
     "label": "Mengoperasikan armada angkutan darat (truk, mobil box, kurir motor)",
     "prefer": [
      "G4-010"
     ]
    },
    {
     "label": "Mengoperasikan kapal (angkutan laut)",
     "prefer": [
      "G5-006"
     ]
    },
    {
     "label": "Mengoperasikan pesawat (angkutan udara)",
     "prefer": [
      "G5-007"
     ]
    },
    {
     "label": "Pergudangan, fulfillment, atau bongkar muat",
     "prefer": [
      "G4-011"
     ]
    }
   ]
  },
  {
   "id": "fisheries_activity",
   "triggers": [
    "ikan",
    "perikanan",
    "usaha ikan",
    "usaha perikanan",
    "bisnis ikan",
    "ikan laut",
    "usaha ikan laut",
    "perikanan laut",
    "keramba",
    "nelayan",
    "tangkap ikan",
    "penangkapan ikan",
    "perikanan tangkap"
   ],
   "question": "Kegiatan utama usaha perikanan Anda?",
   "options": [
    {
     "label": "Budidaya ikan air tawar (kolam, keramba di danau/waduk)",
     "prefer": [
      "G3-006"
     ],
     "activity": "budidaya"
    },
    {
     "label": "Budidaya di laut atau tambak payau (kerapu, udang, bandeng, rumput laut)",
     "prefer": [
      "G3-007"
     ],
     "activity": "budidaya"
    },
    {
     "label": "Menangkap ikan di laut",
     "prefer": [
      "G4-020",
      "G4-021"
     ],
     "activity": "ekstraksi"
    },
    {
     "label": "Menangkap ikan di sungai, danau, atau waduk",
     "prefer": [
      "G3-008"
     ],
     "activity": "ekstraksi"
    },
    {
     "label": "Mengolah/mengawetkan ikan (ikan asin, pindang, fillet, cold storage)",
     "prefer": [
      "G3-013"
     ],
     "activity": "produksi"
    },
    {
     "label": "Menjual ikan (toko, pedagang, pengepul)",
     "prefer": [
      "G1-008",
      "G1-007"
     ],
     "activity": "perdagangan"
    }
   ]
  },
  {
   "id": "aquaculture_vs_capture_fishing",
   "triggers": [],
   "question": "Kegiatannya budidaya atau menangkap ikan?",
   "options": [
    {
     "label": "Budidaya/pemeliharaan ikan laut atau tambak",
     "prefer": [
      "G3-007"
     ],
     "activity": "budidaya"
    },
    {
     "label": "Penangkapan ikan laut",
     "prefer": [
      "G4-020",
      "G4-021"
     ],
     "activity": "ekstraksi"
    }
   ]
  },
  {
   "id": "construction_special_route",
   "triggers": [
    "renovasi",
    "renovasi rumah",
    "bangun rumah",
    "perbaikan rumah",
    "pembangunan",
    "tukang bangunan",
    "instalasi listrik",
    "jembatan",
    "proyek",
    "bangunan",
    "renovasi bangunan",
    "perbaikan bangunan",
    "pembangunan rumah",
    "sumur bor",
    "instalasi"
   ],
   "question": "Apakah ini kegiatan atau proyek jasa konstruksi?",
   "options": [
    {
     "label": "Ya, pekerjaan konstruksi atau proyek bangunan",
     "action": "route_to_jasa_konstruksi_review"
    },
    {
     "label": "Tidak, usaha lain",
     "action": "continue_business_classification"
    }
   ],
   "note": "Tenaga kerja proyek konstruksi memakai skema Jasa Konstruksi; karyawan tetap perusahaan konstruksi dihitung sebagai PU."
  },
  {
   "id": "developer_property_vs_construction",
   "triggers": [
    "developer",
    "developer perumahan",
    "pengembang perumahan",
    "developer properti",
    "pengembang",
    "perumahan",
    "pengembang properti"
   ],
   "question": "Kegiatan utama perusahaan properti Anda?",
   "options": [
    {
     "label": "Menjual, memasarkan, atau menyewakan properti",
     "prefer": [
      "G2-016"
     ],
     "activity": "properti"
    },
    {
     "label": "Membangun sendiri rumah/gedung (pekerjaan konstruksi)",
     "action": "route_to_jasa_konstruksi_review"
    }
   ]
  },
  {
   "id": "waste_domestic_vs_b3",
   "triggers": [
    "limbah",
    "pengolahan limbah",
    "pengelolaan limbah",
    "ipal",
    "sampah dan limbah",
    "limbah cair",
    "jasa limbah"
   ],
   "question": "Jenis sampah/limbah yang ditangani?",
   "options": [
    {
     "label": "Sampah/limbah domestik: sampah rumah tangga, sedot WC/tinja",
     "prefer": [
      "G3-089"
     ]
    },
    {
     "label": "Limbah B3, limbah industri, atau limbah medis",
     "prefer": [
      "G4-012"
     ]
    }
   ]
  },
  {
   "id": "bakery_production_vs_retail",
   "triggers": [
    "roti",
    "kue",
    "toko roti",
    "toko kue",
    "bakery",
    "toko bakery",
    "usaha roti",
    "usaha kue",
    "roti dan kue",
    "kue kering",
    "jual kue",
    "jual roti",
    "toko roti dan kue",
    "cake",
    "bolu",
    "donat",
    "toko cake"
   ],
   "ignore_signals": true,
   "question": "Roti/kue di usaha Anda dibuat sendiri?",
   "options": [
    {
     "label": "Ya, kami memproduksi sendiri (dapur produksi/bakery)",
     "prefer": [
      "G3-017"
     ],
     "activity": "produksi"
    },
    {
     "label": "Tidak, kami hanya menjual produk dari pemasok",
     "prefer": [
      "G1-008"
     ],
     "activity": "perdagangan"
    },
    {
     "label": "Kami menyajikan untuk dinikmati di tempat (kafe/bakery cafe)",
     "prefer": [
      "G2-024"
     ],
     "activity": "sajian"
    }
   ]
  },
  {
   "id": "travel_agency_vs_shuttle",
   "triggers": [
    "travel",
    "usaha travel",
    "bisnis travel",
    "tour",
    "tour dan travel",
    "travel dan tour",
    "perusahaan travel"
   ],
   "question": "Usaha travel Anda yang mana?",
   "options": [
    {
     "label": "Biro perjalanan: tiket, paket wisata, umrah/haji",
     "prefer": [
      "G1-009"
     ]
    },
    {
     "label": "Angkutan penumpang: travel antarkota/shuttle dengan armada sendiri",
     "prefer": [
      "G4-010"
     ]
    }
   ]
  },
  {
   "id": "vehicle_rental",
   "triggers": [
    "rental mobil",
    "sewa mobil",
    "rental motor",
    "sewa motor",
    "rental kendaraan",
    "sewa kendaraan",
    "rent car",
    "rental mobil dan motor",
    "sewa mobil harian"
   ],
   "question": "Kendaraan disewakan dengan cara apa?",
   "options": [
    {
     "label": "Lepas kunci (tanpa sopir)",
     "prefer": [
      "G2-016"
     ]
    },
    {
     "label": "Dengan sopir, antar-jemput, atau sebagai angkutan",
     "prefer": [
      "G4-010"
     ]
    }
   ]
  },
  {
   "id": "screen_printing_textile_vs_media",
   "triggers": [
    "sablon",
    "usaha sablon",
    "jasa sablon",
    "sablon manual",
    "sablon digital",
    "bisnis sablon",
    "sablon printing"
   ],
   "question": "Apa yang Anda sablon?",
   "options": [
    {
     "label": "Kaos/pakaian (biasanya bagian dari konveksi)",
     "prefer": [
      "G1-001"
     ],
     "activity": "produksi"
    },
    {
     "label": "Media lain: gelas, plastik, spanduk, stiker, kemasan",
     "prefer": [
      "G3-049"
     ],
     "activity": "produksi"
    }
   ]
  },
  {
   "id": "tshirt_sewing_vs_knitting",
   "triggers": [
    "kaos",
    "kaus",
    "usaha kaos",
    "bisnis kaos",
    "kaos polos",
    "produksi kaos",
    "t shirt"
   ],
   "question": "Usaha kaos Anda yang mana?",
   "options": [
    {
     "label": "Menjahit kaos dari kain jadi (konveksi, sablon)",
     "prefer": [
      "G1-001"
     ],
     "activity": "produksi"
    },
    {
     "label": "Merajut kain/kaos dari benang (pabrik rajut)",
     "prefer": [
      "G3-036"
     ],
     "activity": "produksi"
    },
    {
     "label": "Menjual kaos (toko, online shop, grosir)",
     "prefer": [
      "G1-008",
      "G1-007"
     ],
     "activity": "perdagangan"
    }
   ]
  }
 ],
 "search_config": {
  "engine": "v2",
  "weights_v2": {
   "exact_alias": 120,
   "exact_official": 110,
   "phrase_base": 45,
   "phrase_len_bonus": 10,
   "alias_prefix": 50,
   "alias_infix": 40,
   "token_max": 100,
   "activity_match": 18,
   "activity_conflict": -22,
   "negative_term": -55,
   "inferred_penalty": -10,
   "needs_confirmation": -4,
   "stem_factor": 0.85,
   "fuzzy_factor": 0.6,
   "prefix_factor": 0.5,
   "official_factor": 0.7,
   "inferred_factor": 0.95,
   "generic_wildcard": 0.75
  },
  "result_policy": {
   "max_candidates": 6,
   "min_candidate_score": 35,
   "near_gap": 45,
   "strong_min_score": 150,
   "relative_cutoff": 0.35,
   "never_claim_official_code": true
  },
  "confidence": {
   "strong": {
    "min_score": 110,
    "label": "Kecocokan kuat"
   },
   "needs_detail": {
    "min_score": 55,
    "label": "Perlu informasi tambahan"
   },
   "weak": {
    "min_score": 1,
    "label": "Perlu konfirmasi"
   }
  },
  "legacy_v0_2": {
   "weights": {
    "exact_alias_phrase": 120,
    "exact_official_phrase": 110,
    "alias_contains_query": 75,
    "official_contains_query": 65,
    "alias_token_match": 28,
    "official_token_match": 16,
    "fuzzy_token_match": 12,
    "negative_term_penalty": -55,
    "ambiguity_penalty": -8
   },
   "confidence": {
    "strong": {
     "min_score": 110,
     "label": "Kecocokan kuat"
    },
    "needs_detail": {
     "min_score": 55,
     "label": "Perlu informasi tambahan"
    },
    "weak": {
     "min_score": 1,
     "label": "Perlu konfirmasi"
    }
   },
   "result_policy": {
    "max_candidates": 5,
    "auto_show_single_result_only_if": "top score >= 110 AND gap_to_second >= 35 AND needs_confirmation == false",
    "ask_question_if": "top candidates share an ambiguity_tag OR top gap < 35 OR top entry needs_confirmation == true",
    "never_claim_official_code": true,
    "min_candidate_score": 35
   }
  }
 },
 "test_cases": [
  {
   "q": "toko baju",
   "top": "G1-008"
  },
  {
   "q": "jual baju",
   "top": "G1-008"
  },
  {
   "q": "penjual pakaian",
   "top": "G1-008"
  },
  {
   "q": "berjualan sembako",
   "top": "G1-008"
  },
  {
   "q": "toko kelontong",
   "top": "G1-008"
  },
  {
   "q": "minimarket",
   "top": "G1-008"
  },
  {
   "q": "warung sembako",
   "top": "G1-008"
  },
  {
   "q": "konter hp",
   "top": "G1-008"
  },
  {
   "q": "toko bangunan",
   "top": "G1-008"
  },
  {
   "q": "dealer motor",
   "top": "G1-008"
  },
  {
   "q": "toko online",
   "top": "G1-008"
  },
  {
   "q": "olshop",
   "top": "G1-008"
  },
  {
   "q": "koperasi karyawan",
   "top": "G1-008"
  },
  {
   "q": "koperasi simpan pinjam",
   "top": "G1-008"
  },
  {
   "q": "toko pasir",
   "top": "G1-008"
  },
  {
   "q": "jual ikan",
   "top": "G1-008"
  },
  {
   "q": "toko emas",
   "top": "G1-008"
  },
  {
   "q": "pangkalan gas",
   "top": "G1-008"
  },
  {
   "q": "toko bahan bangunan",
   "top": "G1-008"
  },
  {
   "q": "usaha saya jualan pakaian online",
   "top": "G1-008"
  },
  {
   "q": "toko sepatu",
   "top": "G1-008"
  },
  {
   "q": "toko obat pertanian",
   "top": "G1-008"
  },
  {
   "q": "supermarket",
   "top": "G1-008"
  },
  {
   "q": "grosir sembako",
   "top": "G1-007"
  },
  {
   "q": "distributor minuman",
   "top": "G1-007"
  },
  {
   "q": "agen beras",
   "top": "G1-007"
  },
  {
   "q": "pengepul rongsok",
   "top": "G1-007"
  },
  {
   "q": "ram sawit",
   "top": "G1-007"
  },
  {
   "q": "trading",
   "top": "G1-007"
  },
  {
   "q": "ekspor impor",
   "top": "G1-006"
  },
  {
   "q": "importir",
   "top": "G1-006"
  },
  {
   "q": "warung kopi",
   "top": "G2-024"
  },
  {
   "q": "warkop",
   "top": "G2-024"
  },
  {
   "q": "coffee shop",
   "top": "G2-024"
  },
  {
   "q": "kedai kopi",
   "top": "G2-024"
  },
  {
   "q": "rumah makan padang",
   "top": "G2-024"
  },
  {
   "q": "warteg",
   "top": "G2-024"
  },
  {
   "q": "restoran",
   "top": "G2-024"
  },
  {
   "q": "resto",
   "top": "G2-024"
  },
  {
   "q": "catering",
   "top": "G2-024"
  },
  {
   "q": "katering",
   "top": "G2-024"
  },
  {
   "q": "angkringan",
   "top": "G2-024"
  },
  {
   "q": "kantin",
   "top": "G2-024"
  },
  {
   "q": "bakso",
   "top": "G2-024"
  },
  {
   "q": "saya punya usaha warung kopi kecil-kecilan",
   "top": "G2-024"
  },
  {
   "q": "cloud kitchen",
   "top": "G2-024"
  },
  {
   "q": "dapur mbg",
   "top": "G2-024"
  },
  {
   "q": "minuman kekinian",
   "top": "G2-024"
  },
  {
   "q": "boba",
   "top": "G2-024"
  },
  {
   "q": "restauran",
   "top": "G2-024"
  },
  {
   "q": "food court",
   "top": "G2-024"
  },
  {
   "q": "nasi kotak",
   "top": "G2-024"
  },
  {
   "q": "warung",
   "ask": "food_shop_vs_restaurant"
  },
  {
   "q": "makanan",
   "ask": "food_service_vs_manufacturing"
  },
  {
   "q": "frozen food",
   "top": "G3-027"
  },
  {
   "q": "pabrik roti",
   "top": "G3-017"
  },
  {
   "q": "toko roti",
   "ask": "bakery_production_vs_retail"
  },
  {
   "q": "roti",
   "ask": "bakery_production_vs_retail"
  },
  {
   "q": "bakery",
   "ask": "bakery_production_vs_retail"
  },
  {
   "q": "pabrik roti dan kue",
   "top": "G3-017"
  },
  {
   "q": "keripik singkong",
   "top": "G3-027"
  },
  {
   "q": "kami produksi keripik pisang rumahan",
   "top": "G3-027"
  },
  {
   "q": "pabrik pakan",
   "top": "G3-027"
  },
  {
   "q": "pabrik tahu",
   "top": "G3-023"
  },
  {
   "q": "tempe",
   "top": "G3-023"
  },
  {
   "q": "kerupuk",
   "top": "G3-022"
  },
  {
   "q": "es batu",
   "top": "G3-025"
  },
  {
   "q": "pabrik es",
   "top": "G3-025"
  },
  {
   "q": "depot air minum",
   "group": 3
  },
  {
   "q": "air minum isi ulang",
   "group": 3
  },
  {
   "q": "amdk",
   "top": "G3-031"
  },
  {
   "q": "penggilingan padi",
   "top": "G3-014"
  },
  {
   "q": "rice mill",
   "top": "G3-014"
  },
  {
   "q": "usaha penggilingan padi di desa",
   "top": "G3-014"
  },
  {
   "q": "pabrik tapioka",
   "top": "G3-015"
  },
  {
   "q": "kopi bubuk",
   "top": "G2-007"
  },
  {
   "q": "roasting kopi",
   "top": "G2-007"
  },
  {
   "q": "kopi",
   "ask": "*"
  },
  {
   "q": "pabrik rokok",
   "top": "G2-008"
  },
  {
   "q": "pabrik gula",
   "top": "G3-019"
  },
  {
   "q": "gula aren",
   "top": "G3-019"
  },
  {
   "q": "pabrik minyak goreng",
   "top": "G3-026"
  },
  {
   "q": "pabrik kelapa sawit",
   "top": "G3-060"
  },
  {
   "q": "pks",
   "top": "G3-060"
  },
  {
   "q": "sawit",
   "ask": "*"
  },
  {
   "q": "kebun sawit",
   "top": "G2-005"
  },
  {
   "q": "rph",
   "top": "G3-009"
  },
  {
   "q": "rumah potong ayam",
   "top": "G3-009"
  },
  {
   "q": "sosis",
   "top": "G3-010"
  },
  {
   "q": "ikan asin",
   "top": "G3-013"
  },
  {
   "q": "yogurt",
   "top": "G3-011"
  },
  {
   "q": "permen",
   "top": "G3-020"
  },
  {
   "q": "pabrik mie",
   "top": "G3-021"
  },
  {
   "q": "kecap",
   "top": "G3-024"
  },
  {
   "q": "garam",
   "top": "G3-055"
  },
  {
   "q": "pabrik teh",
   "top": "G2-006"
  },
  {
   "q": "bir",
   "top": "G3-030"
  },
  {
   "q": "petani",
   "top": "G2-001",
   "hint": "bpu"
  },
  {
   "q": "sawah",
   "top": "G2-001"
  },
  {
   "q": "hidroponik",
   "top": "G2-001"
  },
  {
   "q": "perkebunan karet",
   "top": "G2-005"
  },
  {
   "q": "kebun kopi",
   "top": "G2-005"
  },
  {
   "q": "kebun tebu",
   "top": "G2-002"
  },
  {
   "q": "kebun tembakau",
   "top": "G2-003"
  },
  {
   "q": "peternakan ayam",
   "top": "G1-019"
  },
  {
   "q": "ayam petelur",
   "top": "G1-019"
  },
  {
   "q": "sapi perah",
   "top": "G1-019"
  },
  {
   "q": "peternakn ayam",
   "top": "G1-019"
  },
  {
   "q": "budidaya lele",
   "top": "G3-006"
  },
  {
   "q": "kolam ikan",
   "top": "G3-006"
  },
  {
   "q": "tambak udang",
   "group": 3
  },
  {
   "q": "keramba laut",
   "top": "G3-007"
  },
  {
   "q": "nelayan",
   "ask": "fisheries_activity",
   "hint": "bpu"
  },
  {
   "q": "kapal ikan",
   "top": "G4-020"
  },
  {
   "q": "ikan",
   "ask": "fisheries_activity"
  },
  {
   "q": "rumput laut",
   "top": "G3-007"
  },
  {
   "q": "hutan tanaman industri",
   "top": "G3-002"
  },
  {
   "q": "penebangan kayu",
   "top": "G5-001"
  },
  {
   "q": "logging",
   "top": "G5-001"
  },
  {
   "q": "sawmill",
   "top": "G3-042"
  },
  {
   "q": "arang kayu",
   "top": "G3-004"
  },
  {
   "q": "madu hutan",
   "top": "G3-003"
  },
  {
   "q": "irigasi",
   "top": "G3-001"
  },
  {
   "q": "konveksi",
   "top": "G1-001"
  },
  {
   "q": "penjahit",
   "top": "G1-001",
   "hint": "bpu"
  },
  {
   "q": "garmen",
   "top": "G1-001"
  },
  {
   "q": "sablon kaos",
   "top": "G1-001"
  },
  {
   "q": "konveksih",
   "top": "G1-001"
  },
  {
   "q": "kaos",
   "ask": "tshirt_sewing_vs_knitting"
  },
  {
   "q": "batik tulis",
   "top": "G3-038"
  },
  {
   "q": "tenun ikat",
   "top": "G3-034"
  },
  {
   "q": "pabrik sepatu",
   "top": "G3-039"
  },
  {
   "q": "sol sepatu",
   "top": "G3-040"
  },
  {
   "q": "pabrik tas",
   "top": "G3-051"
  },
  {
   "q": "tas kulit",
   "top": "G3-051"
  },
  {
   "q": "penyamakan kulit",
   "top": "G3-050"
  },
  {
   "q": "mebel",
   "top": "G3-046"
  },
  {
   "q": "furniture",
   "top": "G3-046"
  },
  {
   "q": "pabrik furniture",
   "top": "G3-046"
  },
  {
   "q": "mebel rotan",
   "top": "G3-045"
  },
  {
   "q": "kerajinan bambu",
   "top": "G3-045"
  },
  {
   "q": "triplek",
   "top": "G3-044"
  },
  {
   "q": "kusen",
   "top": "G3-044"
  },
  {
   "q": "palet kayu",
   "top": "G3-043"
  },
  {
   "q": "percetakan",
   "top": "G3-049"
  },
  {
   "q": "percetkan",
   "top": "G3-049"
  },
  {
   "q": "digital printing",
   "top": "G3-049"
  },
  {
   "q": "printing",
   "top": "G3-049"
  },
  {
   "q": "fotokopi",
   "top": "G3-049"
  },
  {
   "q": "kardus",
   "top": "G3-048"
  },
  {
   "q": "pabrik kertas",
   "top": "G3-047"
  },
  {
   "q": "sabun",
   "top": "G3-063"
  },
  {
   "q": "deterjen",
   "top": "G3-063"
  },
  {
   "q": "jamu",
   "top": "G3-064"
  },
  {
   "q": "pabrik obat",
   "top": "G3-064"
  },
  {
   "q": "maklon kosmetik",
   "top": "G3-065"
  },
  {
   "q": "kosmetik",
   "ask": "*"
  },
  {
   "q": "pestisida",
   "top": "G3-067"
  },
  {
   "q": "obat nyamuk",
   "top": "G3-067"
  },
  {
   "q": "cat tembok",
   "top": "G3-092"
  },
  {
   "q": "lem",
   "top": "G3-093"
  },
  {
   "q": "plastik",
   "top": "G3-087"
  },
  {
   "q": "kantong plastik",
   "top": "G3-087"
  },
  {
   "q": "styrofoam",
   "top": "G3-087"
  },
  {
   "q": "vulkanisir",
   "top": "G3-054"
  },
  {
   "q": "pabrik ban",
   "top": "G3-053"
  },
  {
   "q": "remiling karet",
   "top": "G3-052"
  },
  {
   "q": "karet",
   "ask": "*"
  },
  {
   "q": "batu bata",
   "top": "G3-094"
  },
  {
   "q": "genteng",
   "top": "G3-094"
  },
  {
   "q": "batako",
   "top": "G3-074"
  },
  {
   "q": "paving block",
   "top": "G3-074"
  },
  {
   "q": "readymix",
   "top": "G3-074"
  },
  {
   "q": "gerabah",
   "top": "G3-071"
  },
  {
   "q": "keramik",
   "top": "G3-071"
  },
  {
   "q": "pabrik semen",
   "top": "G3-072"
  },
  {
   "q": "kapur tohor",
   "top": "G3-073"
  },
  {
   "q": "pabrik kaca",
   "top": "G3-070"
  },
  {
   "q": "bengkel las",
   "top": "G3-075"
  },
  {
   "q": "pagar besi",
   "top": "G3-075"
  },
  {
   "q": "saya punya bengkel las kecil",
   "top": "G3-075"
  },
  {
   "q": "pandai besi",
   "top": "G3-079"
  },
  {
   "q": "kusen aluminium",
   "top": "G3-079"
  },
  {
   "q": "galvanis",
   "top": "G3-078"
  },
  {
   "q": "timbangan",
   "top": "G3-076"
  },
  {
   "q": "stempel",
   "top": "G3-077"
  },
  {
   "q": "gulung dinamo",
   "top": "G3-080"
  },
  {
   "q": "servis ac",
   "top": "G3-080"
  },
  {
   "q": "servis hp",
   "top": "G3-080"
  },
  {
   "q": "servis elektronik",
   "top": "G3-080"
  },
  {
   "q": "pengecoran logam",
   "top": "G4-016"
  },
  {
   "q": "smelter nikel",
   "top": "G4-016"
  },
  {
   "q": "pabrik baja",
   "top": "G4-016"
  },
  {
   "q": "galangan kapal",
   "top": "G4-004"
  },
  {
   "q": "perahu kayu",
   "top": "G3-081"
  },
  {
   "q": "karoseri",
   "top": "G4-006"
  },
  {
   "q": "perakitan motor",
   "top": "G4-006"
  },
  {
   "q": "bengkel bubut",
   "top": "G4-003"
  },
  {
   "q": "servis alat berat",
   "top": "G4-003"
  },
  {
   "q": "mro pesawat",
   "top": "G4-007"
  },
  {
   "q": "gerbong",
   "top": "G4-005"
  },
  {
   "q": "pabrik kaleng",
   "top": "G5-004"
  },
  {
   "q": "pupuk organik",
   "top": "G5-003"
  },
  {
   "q": "pabrik pupuk",
   "top": "G5-003"
  },
  {
   "q": "kembang api",
   "top": "G5-024"
  },
  {
   "q": "korek api",
   "top": "G5-008"
  },
  {
   "q": "oksigen",
   "top": "G4-015"
  },
  {
   "q": "etanol",
   "top": "G4-014"
  },
  {
   "q": "pelumas",
   "top": "G4-001"
  },
  {
   "q": "asphalt mixing plant",
   "top": "G4-001"
  },
  {
   "q": "briket batubara",
   "top": "G4-002"
  },
  {
   "q": "alat musik",
   "top": "G2-013"
  },
  {
   "q": "gamelan",
   "top": "G2-013"
  },
  {
   "q": "mainan anak",
   "top": "G2-015"
  },
  {
   "q": "alat olahraga",
   "top": "G2-014"
  },
  {
   "q": "optik",
   "top": "G3-083"
  },
  {
   "q": "perhiasan",
   "top": "G3-086"
  },
  {
   "q": "kerajinan perak",
   "top": "G3-085"
  },
  {
   "q": "pabrik jam",
   "top": "G3-084"
  },
  {
   "q": "servis jam",
   "top": "G1-022"
  },
  {
   "q": "minyak atsiri",
   "top": "G3-061"
  },
  {
   "q": "penyulingan nilam",
   "top": "G3-061"
  },
  {
   "q": "vco",
   "top": "G3-059"
  },
  {
   "q": "pabrik payung",
   "top": "G1-003"
  },
  {
   "q": "sprei",
   "top": "G1-005"
  },
  {
   "q": "gorden",
   "top": "G1-005"
  },
  {
   "q": "tenda",
   "ask": "*"
  },
  {
   "q": "topi",
   "top": "G1-002"
  },
  {
   "q": "pemintalan benang",
   "top": "G3-032"
  },
  {
   "q": "karpet",
   "top": "G3-035"
  },
  {
   "q": "tali tambang",
   "top": "G3-037"
  },
  {
   "q": "sabut kelapa",
   "top": "G3-037"
  },
  {
   "q": "kaos kaki",
   "top": "G3-036"
  },
  {
   "q": "kina",
   "top": "G2-010"
  },
  {
   "q": "krey",
   "top": "G1-004"
  },
  {
   "q": "laundry",
   "top": "G2-021"
  },
  {
   "q": "usaha laundry",
   "top": "G2-021"
  },
  {
   "q": "londri kiloan",
   "top": "G2-021"
  },
  {
   "q": "dry cleaning",
   "top": "G2-021"
  },
  {
   "q": "londry",
   "top": "G2-021"
  },
  {
   "q": "laudry",
   "top": "G2-021"
  },
  {
   "q": "salon",
   "top": "G1-018"
  },
  {
   "q": "barbershop",
   "top": "G1-018"
  },
  {
   "q": "pangkas rambut",
   "top": "G1-018"
  },
  {
   "q": "spa",
   "top": "G1-018"
  },
  {
   "q": "studio foto",
   "top": "G2-022"
  },
  {
   "q": "fotografer",
   "top": "G2-022"
  },
  {
   "q": "bioskop",
   "top": "G1-023"
  },
  {
   "q": "karaoke",
   "top": "G2-020"
  },
  {
   "q": "event organizer",
   "top": "G2-020"
  },
  {
   "q": "eo",
   "top": "G2-020"
  },
  {
   "q": "wedding organizer",
   "top": "G2-020"
  },
  {
   "q": "gym",
   "top": "G2-020"
  },
  {
   "q": "fitness center",
   "top": "G2-020"
  },
  {
   "q": "kolam renang",
   "top": "G2-020"
  },
  {
   "q": "futsal",
   "top": "G2-020"
  },
  {
   "q": "objek wisata",
   "top": "G2-020"
  },
  {
   "q": "band",
   "top": "G2-019"
  },
  {
   "q": "sanggar tari",
   "top": "G2-019"
  },
  {
   "q": "production house",
   "top": "G2-018"
  },
  {
   "q": "radio",
   "top": "G2-023"
  },
  {
   "q": "televisi",
   "top": "G2-023"
  },
  {
   "q": "isp",
   "top": "G2-017"
  },
  {
   "q": "provider internet",
   "top": "G2-017"
  },
  {
   "q": "klub sepak bola",
   "top": "G3-096"
  },
  {
   "q": "atlet",
   "top": "G3-096",
   "hint": "bpu"
  },
  {
   "q": "bank",
   "top": "G1-009"
  },
  {
   "q": "bpr",
   "top": "G1-009"
  },
  {
   "q": "leasing",
   "top": "G1-009"
  },
  {
   "q": "pegadaian",
   "top": "G1-009"
  },
  {
   "q": "money changer",
   "top": "G1-009"
  },
  {
   "q": "travel umroh",
   "top": "G1-009"
  },
  {
   "q": "biro perjalanan",
   "top": "G1-009"
  },
  {
   "q": "travel",
   "ask": "travel_agency_vs_shuttle"
  },
  {
   "q": "asuransi",
   "top": "G1-010"
  },
  {
   "q": "broker asuransi",
   "top": "G1-010"
  },
  {
   "q": "kantor pemerintah",
   "top": "G1-011"
  },
  {
   "q": "pemerintah desa",
   "top": "G1-011"
  },
  {
   "q": "rumah sakit",
   "top": "G1-012"
  },
  {
   "q": "rs",
   "top": "G1-012"
  },
  {
   "q": "klinik",
   "top": "G1-012"
  },
  {
   "q": "klinik gigi",
   "top": "G1-012"
  },
  {
   "q": "apotek",
   "top": "G1-012"
  },
  {
   "q": "apotik",
   "top": "G1-012"
  },
  {
   "q": "bidan",
   "top": "G1-012"
  },
  {
   "q": "dokter hewan",
   "group": 1
  },
  {
   "q": "lab klinik",
   "top": "G1-012"
  },
  {
   "q": "masjid",
   "top": "G1-013"
  },
  {
   "q": "gereja",
   "top": "G1-013"
  },
  {
   "q": "pesantren",
   "group": 1
  },
  {
   "q": "panti asuhan",
   "top": "G1-014"
  },
  {
   "q": "lsm",
   "top": "G1-014"
  },
  {
   "q": "yayasan",
   "group": 1
  },
  {
   "q": "serikat pekerja",
   "top": "G1-015"
  },
  {
   "q": "asosiasi",
   "top": "G1-015"
  },
  {
   "q": "lembaga penelitian",
   "top": "G1-016"
  },
  {
   "q": "satpam",
   "top": "G1-017"
  },
  {
   "q": "security",
   "top": "G1-017"
  },
  {
   "q": "cleaning service",
   "top": "G1-017"
  },
  {
   "q": "sekolah",
   "group": 1
  },
  {
   "q": "sekolah swasta",
   "group": 1
  },
  {
   "q": "bimbel",
   "group": 1
  },
  {
   "q": "universitas",
   "group": 1
  },
  {
   "q": "paud",
   "group": 1
  },
  {
   "q": "kursus bahasa",
   "group": 1
  },
  {
   "q": "museum",
   "top": "G1-017"
  },
  {
   "q": "outsourcing",
   "group": 1
  },
  {
   "q": "jasa kebersihan",
   "ask": "cleaning_general_vs_waste"
  },
  {
   "q": "desain grafis",
   "top": "G1-020"
  },
  {
   "q": "software house",
   "top": "G1-020"
  },
  {
   "q": "startup",
   "top": "G1-020"
  },
  {
   "q": "digital agency",
   "top": "G1-020"
  },
  {
   "q": "arsitek",
   "top": "G1-020"
  },
  {
   "q": "konsultan pajak",
   "top": "G1-021"
  },
  {
   "q": "notaris",
   "top": "G1-021"
  },
  {
   "q": "kantor akuntan publik",
   "top": "G1-021"
  },
  {
   "q": "law firm",
   "top": "G1-021"
  },
  {
   "q": "psikolog",
   "top": "G1-021"
  },
  {
   "q": "ekspedisi",
   "ask": "freight_forwarder_vs_transport_operator"
  },
  {
   "q": "logistik",
   "ask": "freight_forwarder_vs_transport_operator"
  },
  {
   "q": "kurir",
   "ask": "freight_forwarder_vs_transport_operator"
  },
  {
   "q": "shipping",
   "ask": "freight_forwarder_vs_transport_operator"
  },
  {
   "q": "freight forwarder",
   "top": "G3-090"
  },
  {
   "q": "emkl",
   "top": "G3-090"
  },
  {
   "q": "trucking",
   "top": "G4-010"
  },
  {
   "q": "angkutan truk",
   "top": "G4-010"
  },
  {
   "q": "perusahaan kami bergerak di bidang ekspedisi darat",
   "top": "G4-010"
  },
  {
   "q": "po bus",
   "top": "G4-009"
  },
  {
   "q": "perusahaan bus",
   "top": "G4-009"
  },
  {
   "q": "taksi",
   "top": "G4-010"
  },
  {
   "q": "angkot",
   "top": "G4-010"
  },
  {
   "q": "gudang",
   "top": "G4-011"
  },
  {
   "q": "cold storage",
   "top": "G4-011"
  },
  {
   "q": "bongkar muat",
   "top": "G4-011"
  },
  {
   "q": "pelayaran",
   "top": "G5-006"
  },
  {
   "q": "kapal ferry",
   "top": "G5-006"
  },
  {
   "q": "maskapai",
   "top": "G5-007"
  },
  {
   "q": "kereta api",
   "top": "G4-008"
  },
  {
   "q": "rental mobil",
   "ask": "vehicle_rental"
  },
  {
   "q": "ojol",
   "hint": "bpu"
  },
  {
   "q": "ojek online",
   "hint": "bpu"
  },
  {
   "q": "jasa pindahan",
   "top": "G4-010"
  },
  {
   "q": "towing",
   "top": "G4-010"
  },
  {
   "q": "lori tebu",
   "top": "G4-023"
  },
  {
   "q": "spbu",
   "top": "G3-091"
  },
  {
   "q": "pom bensin",
   "top": "G3-091"
  },
  {
   "q": "spbe",
   "top": "G4-013"
  },
  {
   "q": "pengisian elpiji",
   "top": "G4-013"
  },
  {
   "q": "pdam",
   "top": "G3-088"
  },
  {
   "q": "air bersih",
   "top": "G3-088"
  },
  {
   "q": "sampah",
   "top": "G3-089"
  },
  {
   "q": "sedot wc",
   "top": "G3-089"
  },
  {
   "q": "bank sampah",
   "top": "G3-089"
  },
  {
   "q": "limbah b3",
   "top": "G4-012"
  },
  {
   "q": "limbah",
   "ask": "waste_domestic_vs_b3"
  },
  {
   "q": "pltu",
   "top": "G4-017"
  },
  {
   "q": "pembangkit listrik",
   "top": "G4-017"
  },
  {
   "q": "distribusi gas",
   "top": "G4-018"
  },
  {
   "q": "boiler",
   "top": "G4-019"
  },
  {
   "q": "tambang batubara",
   "top": "G5-018"
  },
  {
   "q": "batu bara",
   "top": "G5-018"
  },
  {
   "q": "tambang emas",
   "top": "G5-017"
  },
  {
   "q": "tambang nikel",
   "top": "G5-023"
  },
  {
   "q": "tambang timah",
   "top": "G5-020"
  },
  {
   "q": "galian c",
   "group": 5
  },
  {
   "q": "tambang pasir",
   "top": "G5-012"
  },
  {
   "q": "quarry",
   "top": "G5-010"
  },
  {
   "q": "migas",
   "top": "G5-009"
  },
  {
   "q": "pengeboran minyak",
   "top": "G5-009"
  },
  {
   "q": "tambang kapur",
   "top": "G5-013"
  },
  {
   "q": "kaolin",
   "top": "G5-011"
  },
  {
   "q": "belerang",
   "top": "G5-014"
  },
  {
   "q": "batu akik",
   "in3": "G5-015"
  },
  {
   "q": "tambang",
   "group": 5
  },
  {
   "q": "emas",
   "ask": "*"
  },
  {
   "q": "kontraktor",
   "route": "constructionGate"
  },
  {
   "q": "jasa konstruksi",
   "route": "constructionGate"
  },
  {
   "q": "pemborong",
   "route": "constructionGate"
  },
  {
   "q": "renovasi rumah",
   "ask": "construction_special_route",
   "hint": "jakon"
  },
  {
   "q": "tukang bangunan",
   "ask": "construction_special_route"
  },
  {
   "q": "instalasi listrik",
   "ask": "construction_special_route"
  },
  {
   "q": "developer perumahan",
   "ask": "developer_property_vs_construction"
  },
  {
   "q": "sumur bor",
   "ask": "construction_special_route"
  },
  {
   "q": "bengkel motor",
   "ask": "vehicle_repair_overlap"
  },
  {
   "q": "bengkel",
   "ask": "vehicle_repair_overlap"
  },
  {
   "q": "servis motor",
   "top": "G3-095"
  },
  {
   "q": "cuci mobil",
   "top": "G3-095"
  },
  {
   "q": "car wash",
   "top": "G3-095"
  },
  {
   "q": "tambal ban",
   "top": "G3-095"
  },
  {
   "q": "ganti oli",
   "top": "G3-095"
  },
  {
   "q": "ketok magic",
   "top": "G3-095"
  },
  {
   "q": "bengkel sepeda",
   "top": "G3-082"
  },
  {
   "q": "bengkell",
   "in3": "G3-095"
  },
  {
   "q": "kos kosan",
   "top": "G2-025"
  },
  {
   "q": "kost",
   "top": "G2-025"
  },
  {
   "q": "hotel",
   "top": "G2-025"
  },
  {
   "q": "homestay",
   "group": 2
  },
  {
   "q": "villa",
   "top": "G2-025"
  },
  {
   "q": "punya kos-kosan 20 kamar",
   "top": "G2-025"
  },
  {
   "q": "kontrakan",
   "top": "G2-016"
  },
  {
   "q": "sewa alat berat",
   "top": "G2-016"
  },
  {
   "q": "properti",
   "top": "G2-016"
  },
  {
   "q": "parkir",
   "top": "G2-016"
  },
  {
   "q": "sewa tenda",
   "top": "G2-016"
  },
  {
   "q": "tki",
   "hint": "pmi"
  },
  {
   "q": "warung pecel",
   "top": "G2-024"
  },
  {
   "q": "sablon",
   "ask": "screen_printing_textile_vs_media"
  },
  {
   "q": "toko servis hp",
   "ask": "*"
  },
  {
   "q": "pabrik",
   "generic": true
  },
  {
   "q": "jasa",
   "generic": true
  },
  {
   "q": "gudang penyimpanan",
   "top": "G4-011"
  },
  {
   "q": "kebun kopi arabika",
   "top": "G2-005"
  },
  {
   "q": "asdfgh",
   "none": true
  },
  {
   "q": "qwerty zzz",
   "none": true
  }
 ]
};

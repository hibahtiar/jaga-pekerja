# JagaPekerja — V6 (prototipe 1.1)

**JagaPekerja** (sebelumnya "Digital Service Hub Ketenagakerjaan") adalah pusat informasi perlindungan pekerja melalui
program BPJS Ketenagakerjaan: program & manfaat, segmen peserta, simulasi iuran, panduan daftar & klaim, tutorial SIPP/JMO,
formulir, peraturan, Konsultasi Langsung, dan kantor cabang (KC Pamekasan).

Website statis (HTML, CSS, JavaScript murni) tanpa backend dan tanpa build tools. Siap dipasang di GitHub Pages.

**Prinsip arsitektur:** website = lapisan informasi; kanal resmi BPJS Ketenagakerjaan = lapisan transaksi & data.
Website tidak pernah meminta atau menyimpan NIK, KTP, KK, nomor KPJ, rekening, OTP, kata sandi, atau dokumen pribadi.
Satu-satunya data yang bisa dikirim pengunjung adalah **nomor HP** lewat Konsultasi Langsung, atas kemauan sendiri,
untuk dihubungi kembali (bagian 11).

**Prinsip desain "Teal Minimalis":** bersih, ringan, dan mudah dipakai semua kalangan pekerja (kantoran sampai petani di desa).
Pilihan dulu, rincian belakangan; ilustrasi atau banner foto di kepala halaman; angka penting ditampilkan besar; animasi halus tanpa library.

---

## 1. Peta halaman

```
index.html                  Beranda: pencarian (ketik/suara) + "Lanjutkan" + akses cepat + segmen + program
program.html                Program BPJS Ketenagakerjaan: JKK, JKM, JHT, JP, JKP + matriks program × segmen
segmen.html                 Segmen peserta: pilih PU / BPU / Jasa Konstruksi / PMI + matriks + pencarian
segmen-pu.html · segmen-bpu.html · segmen-jakon.html · segmen-pmi.html
                            Halaman segmen: tombol Hitung iuran · Cara daftar · Hubungi petugas · Lokasi kantor
simulasi.html               Hub simulasi: kartu berilustrasi "Siapa yang akan didaftarkan?" + pencarian
simulasi-pu.html            Business Finder PU + simulator PU (perkiraan langsung) + Jasa Konstruksi
simulasi-bpu.html           Simulator BPU (pekerja mandiri, perkiraan langsung)
simulasi-pmi.html           Simulator PMI (pekerja migran)
daftar.html                 Pendaftaran per segmen (tab #pu #bpu #jakon #pmi)
klaim.html                  Panduan klaim (tab #jht #jkk #jkm #jp #jkp)
administrasi-pekerja.html   Tambah / nonaktif pekerja (HRD atau peserta)
sipp.html                   Tutorial SIPP: menu pilihan → topik dengan versi Langkah & Flowchart
jmo.html                    Tutorial JMO: menu pilihan → topik
flowchart/mutasi-data.html  Flowchart SIPP layar penuh (tujuan QR), tanpa header situs
formulir.html               Formulir resmi (PDF) + pencarian formulir
peraturan.html              Dasar hukum + filter ?program=
kontak.html                 Kantor cabang (alamat, jam, peta, salin alamat), Konsultasi Langsung, kanal resmi
status-konten.html          Untuk pengelola: status draf, slot media, konfigurasi, uji pencarian
404.html                    Halaman tidak ditemukan (dengan pencarian)
```

Navigasi:
- **Ponsel:** bilah bawah tetap (Beranda · Cari · Bantuan · Menu), mudah dijangkau jempol.
- **Layar lebar:** menu atas (Program · Segmen Peserta · Simulasi · Klaim · Bantuan) + tombol Cari & Menu.
- **Cari** tersedia di semua halaman; **Menu** berisi daftar lengkap semua halaman (meluncur dari kanan).
- Setiap halaman diakhiri kotak **"Masih butuh bantuan?"** (Konsultasi Langsung, kantor terdekat, telepon 175).
- Tombol mengambang **Konsultasi** (kanan bawah) ada di semua halaman kecuali Kontak, Status, dan simulator; mengecil saat
  menggulir ke bawah, tersembunyi saat mengetik, dan menyingkir bila kotak bantuan sedang terlihat. Di simulator (banyak
  kontrol di tepi kanan) diganti tautan "Butuh bantuan? **Konsultasi Langsung**" di kepala halaman.

## 2. Struktur berkas

```
assets/css/site.css         Sistem desain (token warna, font, animasi, komponen .sh-*, banner foto, Konsultasi)
assets/css/simulator.css    Gaya bersama simulator (isian Rp/bulan, pil, sakelar, perkiraan langsung) + hasil + cetak A4
assets/js/site-config.js    ★ KONFIGURASI: nama & logo, kantor, Konsultasi Langsung, batas simulasi, banner foto,
                            WhatsApp, tautan resmi, menu, "Sering dicari"
assets/js/site.js           Header, navigasi, menu, panel Cari, suara, Konsultasi Langsung (tombol, formulir, validasi,
                            pengiriman), bantuan, footer, ikon, ilustrasi/banner, mode pengelola, "Lanjutkan" (SH.*)
assets/js/site-search.js    Mesin pencarian gabungan
assets/js/pages.js          Perender semua halaman konten (membaca data/)
assets/js/flowchart.js      Tutorial SIPP: versi Langkah & Flowchart dari data/tutorial-sipp.js
assets/js/sim-report.js     Hasil simulasi seragam + Unduh PDF / Bagikan / Cetak
assets/js/finder-engine.js  Mesin Business Finder PU
assets/fonts/               Poppins 600 & 700 (judul), disimpan sendiri; lisensi OFL
assets/vendor/jspdf…        jsPDF 4.2.1 (MIT) — dimuat hanya saat tombol PDF/Bagikan diketuk
assets/img/ilustrasi/       Ilustrasi SVG per halaman (2–8 KB per gambar)
assets/img/brand/           Logo JagaPekerja: lambang header, favicon, ikon layar utama (192/512), logo lengkap
assets/img/hero/            Banner foto kepala halaman: <nama>.webp (desktop) + <nama>-m.webp (ponsel)
site.webmanifest            Nama & ikon saat situs ditambahkan ke layar utama ponsel
tools/buat-ilustrasi.py     Generator ilustrasi (python3 tools/buat-ilustrasi.py)
tools/buat-hero.py          Pembuat banner foto dari satu gambar 16:9 (python3 tools/buat-hero.py sumber.png pu)
tools/konsultasi-apps-script.gs  Penerima Konsultasi Langsung di Google Apps Script (email + rekap Google Sheets)
tools/panduan-banner-1920x1080.jpg  Panduan area aman banner foto (kiri lapang, pita wajah, potongan ponsel)

data/program.js             ★ Program (manfaat, iuran), segmen (tombol, contoh, program, iuran, tautan) &
                            tabel program wajib Penerima Upah menurut skala usaha (skalaUsaha)
data/konten.js              ★ Pendaftaran, klaim, administrasi, topik SIPP & JMO, formulir
data/tutorial-sipp.js       ★ Alur SIPP (langkah & flowchart dibuat dari sini)
data/layanan.js             ★ Kata kunci pencarian untuk layanan & panduan
data/bpu-pekerjaan.js       Pekerjaan BPU + kata kunci (simulator & pencarian)
data/kamus-usaha-pu.js      Kamus jenis usaha PU v0.3.0 (191 jenis usaha, 3.478 alias)
data/peraturan.js           Registri peraturan + tautan PDF resmi
data/uji-pencarian.js       Kasus uji pencarian (dijalankan di status-konten.html)
```

★ = berkas yang paling sering diubah.

## 3. Mengubah teks: di berkas mana?

Aturan umumnya: **isi halaman ada di folder `data/`**, bukan di HTML. Pengecualiannya judul besar halaman dan simulator.

| Teks yang ingin diubah | Berkas |
|---|---|
| Judul besar & kalimat pembuka tiap halaman | HTML halaman itu (`sipp.html`, `klaim.html`, …): bagian `<h1>` dan `sh-lead` |
| Beranda: judul "Ada yang bisa kami bantu?" | `index.html` |
| Beranda: kartu Akses cepat, judul bagian | `assets/js/pages.js` → fungsi `R.home` |
| Program, manfaat, iuran; halaman segmen | `data/program.js` |
| Pendaftaran, klaim, administrasi pekerja, formulir | `data/konten.js` |
| Menu & kartu topik SIPP / JMO (judul, ringkasan, ikon, kelompok) | `data/konten.js` → `sipp`, `jmo` |
| Langkah & flowchart SIPP (Tambah TK, Kurangi TK, …) | `data/tutorial-sipp.js` |
| Peraturan · nama pekerjaan BPU | `data/peraturan.js` · `data/bpu-pekerjaan.js` |
| Menu, "Sering dicari", nama situs, WhatsApp, kantor | `assets/js/site-config.js` |
| Kotak "Masih butuh bantuan?", footer, teks formulir Konsultasi Langsung | `assets/js/site.js` |
| Pengantar "Tentang JagaPekerja" di beranda | `assets/js/pages.js` → fungsi `aboutHtml` |
| Tabel program wajib PU menurut skala usaha | `data/program.js` → `skalaUsaha` |
| Teks simulator (label, FAQ, dasar hukum, catatan hasil) | `simulasi-pu.html`, `simulasi-bpu.html`, `simulasi-pmi.html` (fungsi `buildModel` untuk hasil) |
| Kata kunci pencarian | `data/layanan.js` → lalu cek `status-konten.html` (semua uji harus "Lulus") |

Cara cepat menemukan kalimat: di GitHub, ketik potongan kalimatnya di kotak pencarian repository.

| Pengaturan | Berkas | Keterangan |
|---|---|---|
| Nama & logo situs | `site-config.js` → `brand` | Nama "JagaPekerja" otomatis diwarnai dua (Jaga/Pekerja) seperti logo. |
| Kantor cabang | `site-config.js` → `office` | Tampil di Kontak, footer, dan tombol "Lokasi kantor". `phone` boleh kosong (diganti Konsultasi Langsung). |
| Konsultasi Langsung | `site-config.js` → `konsultasi` | `appsScriptUrl` (disarankan) atau `emailTujuan` (FormSubmit). Lihat bagian 11. |
| Batas upah minimal simulasi | `site-config.js` → `simulasi.minUpahPU`, `minPenghasilanBPU` | Bawaan Rp1.500.000 per bulan. Isi `0` untuk mematikan batas. |
| Banner foto kepala halaman | `site-config.js` → `heroImages` | Daftarkan nama setelah berkas dibuat. Lihat bagian 12. |
| Nomor WhatsApp petugas | `site-config.js` → `contact.whatsappNumber` | Format `62812…`. Selama kosong, tombol "Chat petugas" membuka Konsultasi Langsung. |
| Warna | `assets/css/site.css` → `:root` | `--brand` (ikon, aksen, latar besar), `--primary` (teks & tombol, lulus WCAG AA). |
| Ilustrasi kepala halaman | atribut `data-art="nama"` di HTML | Nama = berkas di `assets/img/ilustrasi/`. Bila nama itu terdaftar di `heroImages`, banner foto yang dipakai. |

## 4. Status konten: DRAF → terverifikasi, dan mode pengelola

Blok baru berstatus `status:'draf'`. Setelah dicek terhadap sumber resmi:

```js
status:'terverifikasi', diperiksa:'2026-10-01'
```

- **Pengunjung umum** tidak melihat label DRAF per blok; cukup satu pita kecil "Isi sedang ditinjau" di kepala halaman.
- **Pengelola** membuka halaman mana pun dengan `?pengelola=1` → semua label DRAF/Terverifikasi tampil
  (tersimpan di browser itu). Matikan dengan `?pengelola=0`. `status-konten.html` selalu menampilkannya.

## 5. Tutorial SIPP & JMO

Halaman dibuka dengan **menu kartu pilihan** (Tambah TK, Kurangi / nonaktifkan TK, Ubah upah, Finalisasi & bayar, …).
Setelah dipilih, hanya topik itu yang tampil dengan saklar **Langkah | Flowchart**. Pilihan terakhir pengguna diingat.

- **Satu sumber:** topik dengan `alur:'tambah-tk'` (di `data/konten.js`) mengambil langkah **dan** flowchart dari
  `data/tutorial-sipp.js`. Ubah teks sekali, kedua versi ikut berubah. `alur:'semua'` = semua alur dengan tab.
  `cabang:'Peserta Aktif'` = cabang yang dibuka lebih dulu. Topik tanpa `alur` memakai daftar `langkah` biasa.
- **Versi Langkah:** pertanyaan cabang dijawab dulu, lalu langkah bernomor muncul; nomor bisa diketuk untuk menandai selesai.
- **Versi Flowchart:** diagram kotak & panah, semua cabang berdampingan (di ponsel digeser ke samping).
- **Video / foto:** isi `media.video.youtube` atau `media.foto` → tab otomatis muncul; slot kosong disebut "Segera hadir".

```js
media:{ video:{ youtube:'https://youtu.be/XXXXXXXXXXX' }, foto:[ {src:'assets/media/sipp/tambah-1.jpg', caption:'Menu Tambah TK'} ] }
```

Samarkan data pribadi di tangkapan layar (NIK, nama, NPP, nomor KPJ).

## 6. Hasil simulasi, PDF, dan cetak

Keempat simulator (PU, Jasa Konstruksi, BPU, PMI) memakai tampilan hasil yang sama (`assets/js/sim-report.js`):
angka utama besar → pembagian (perusahaan/pekerja atau per program) → banner ketentuan → data yang dihitung →
rincian per program → catatan → **Unduh PDF · Bagikan · Cetak**.

- **Unduh PDF:** berkas A4 satu halaman dibuat di browser (jsPDF, ±130 KB terkompresi, dimuat hanya saat diketuk).
- **Bagikan:** di ponsel yang mendukung, berkas PDF langsung dibagikan (mis. ke WhatsApp); selain itu teks ringkas.
- **Cetak:** tata letak cetak A4 khusus → pilih "Simpan sebagai PDF" di dialog cetak. Tanpa library.
- PDF memuat tanggal pembuatan, data masukan, rincian, dasar perhitungan, catatan "bukan tagihan resmi",
  dan tautan untuk membuka ulang simulasi. **Tidak ada data pribadi.**
- BPU & PMI: pemeriksaan kebijakan/ketentuan tetap otomatis, kini ditampilkan sebagai banner di hasil (satu klik lebih sedikit).

## 7. Deep link (Smart QR, WhatsApp, poster)

| Tujuan | URL |
|---|---|
| Hasil pencarian | `index.html?q=klaim%20jht` |
| Program tertentu | `program.html#jht` |
| Halaman segmen | `segmen-pu.html` · `segmen-bpu.html` · `segmen-jakon.html` · `segmen-pmi.html` |
| Segmen BPU dengan pekerjaan terpilih | `segmen-bpu.html?pekerjaan=petani` |
| Simulasi PU dengan kata kunci / jenis usaha | `simulasi-pu.html?q=bengkel%20las` · `simulasi-pu.html?id=G2-024` |
| Jasa Konstruksi | `simulasi-pu.html?view=konstruksi` (gerbang) · `?view=jakon` (langsung ke simulator) |
| Mode kurator kamus PU | `simulasi-pu.html?kurator=1` |
| Simulasi BPU dengan pekerjaan terpilih | `simulasi-bpu.html?pekerjaan=ojek-ojol` |
| Simulasi PMI | `simulasi-pmi.html?jalur=penempatan\|perseorangan&paket=6\|12\|24` |
| Pendaftaran / klaim | `daftar.html#pu` … · `klaim.html#jht` … |
| Tambah/nonaktif pekerja | `administrasi-pekerja.html?peran=hrd` · `?peran=peserta&segmen=pu\|bpu` |
| Topik SIPP / JMO | `sipp.html#tambah-tk` · `sipp.html#nonaktif-tk` · `jmo.html#saldo` |
| Tampilan & alur SIPP | `sipp.html?tab=flowchart#tambah-tk` · `sipp.html?ke=kurang-tk#mutasi-data` |
| Flowchart layar penuh | `flowchart/mutasi-data.html?ke=kurang-tk` (`&tab=langkah` untuk versi langkah) |
| Formulir / peraturan / kontak | `formulir.html#f5` · `peraturan.html?program=jkk` · `kontak.html#kantor` · `kontak.html#konsultasi` |
| Program wajib PU menurut skala usaha | `program.html#skala-usaha` |
| Buka formulir Konsultasi Langsung (QR, poster) | tambahkan `?konsultasi=1` pada halaman mana pun, mis. `index.html?konsultasi=1` |
| Mode pengelola | tambahkan `?pengelola=1` pada halaman mana pun |

## 8. Cara kerja pencarian

Satu kotak pencarian (beranda, panel Cari, halaman Segmen, hub Simulasi, 404) menggabungkan layanan & panduan
(`data/layanan.js`), program & segmen, pekerjaan BPU, dan jenis usaha PU (kamus + Business Finder).
Niat + entitas digabung: "daftar ojol" → Daftar BPU · "iuran bengkel" → Simulasi PU · "klaim ojol" → Panduan klaim.
**Pencarian suara** muncul otomatis di browser yang mendukung dan memerlukan HTTPS (terpenuhi di GitHub Pages).

## 9. Tampilan, animasi, dan performa

- **Warna** dari panduan Teal Minimalis. Teks & tombol memakai `--primary` #07786F (kontras ≥ 4,5:1);
  #0D9488 dipakai untuk ikon, aksen, latar besar, dan angka besar. Kuning #F2C94C hanya untuk aksen.
- **Font:** Poppins 600/700 untuk judul (2 berkas, 16 KB, disimpan sendiri, tanpa Google Fonts); isi memakai font perangkat.
- **Animasi** hanya CSS + sedikit JS, tanpa library: transisi antarhalaman (View Transitions; Chrome/Edge & Safari 18.2+,
  browser lain pindah biasa), menu & lembar pilihan meluncur, buka-tutup lipatan halus (Chrome 131+), pergantian tahap
  simulator. Efek "muncul saat digulir" **hanya di desktop**: di ponsel konten selalu langsung terlihat. Semua otomatis mati
  bila pengguna mengaktifkan "kurangi gerakan".
- **Tautan `#…` mendarat konsisten** di semua perangkat: satu variabel `--anchor-offset` (ponsel 12 px, desktop tinggi header
  + 14 px); posisi disetel ulang sekali setelah font & gambar termuat; tombol Kembali memulihkan posisi terakhir.
  Halaman Program punya pemilih program yang menempel di atas dan menandai program yang sedang dibaca.
- **"Lanjutkan" di beranda:** 4 halaman terakhir dan segmen terakhir disimpan hanya di browser pengguna (`localStorage`), tanpa data pribadi.

## 10. Memasang di GitHub Pages

1. Buat repository publik, unggah **isi** folder ini (termasuk `assets/` dan `data/`) ke branch `main`.
2. Settings → Pages → Source: *Deploy from a branch* → `main` / `(root)` → Save.
3. Tunggu 1–3 menit, buka `https://<akun>.github.io/<repo>/`.
4. Data kantor (KC Pamekasan) sudah terisi di `site-config.js`. Aktifkan Konsultasi Langsung (bagian 11): kirim satu
   permintaan uji lalu klik **Activate Form** di email, atau pasang Apps Script. Cek `status-konten.html`.

Uji lokal: buka `index.html` langsung di browser (semua data dimuat sebagai `<script>`, jadi berjalan dari `file://`).

## 11. Konsultasi Langsung (nomor HP → email pengelola)

Alur: pengunjung mengetuk **Konsultasi** / **Konsultasi Langsung** → formulir kecil muncul → mengisi nomor HP →
format diperiksa → **Kirim Permintaan** → pengelola menerima email → pengelola menghubungi nomor itu secara manual.

**Validasi nomor** (di website dan di Apps Script): diterima `08…`, `628…`, `+628…` dengan panjang 10–13 angka dalam
format 08 (spasi, tanda hubung, titik, kurung diabaikan). Ditolak: huruf, `+620…`/`620…`, nomor luar negeri, telepon
rumah/kantor (021…), angka berulang (08111111111), terlalu pendek/panjang. Pesan kesalahan menjelaskan cara memperbaikinya.

**Isi notifikasi:** nomor HP (format 0812-3456-7890 + tautan telepon & WhatsApp), waktu permintaan (WIB), keterangan
"pengunjung meminta konsultasi langsung", halaman asal, konteks (mis. ringkasan simulasi, tanpa data pribadi), perangkat,
dan ID permintaan. Judul email selalu diawali **`[JagaPekerja] Konsultasi Langsung · <nomor> · <tanggal jam>`** sehingga
mudah dikenali dan disaring (buat filter/label Gmail dengan kata kunci itu).

**Pilih satu cara kirim** di `site-config.js → konsultasi`:

| Cara | Kelebihan | Yang perlu dilakukan |
|---|---|---|
| **A. Google Apps Script** (`appsScriptUrl`) — disarankan | Email rapi + **rekap otomatis di Google Sheets** (kolom Status: Belum/Sudah dihubungi), rekap harian opsional, alamat email tidak terlihat di website, gratis | Ikuti petunjuk di kepala `tools/konsultasi-apps-script.gs` (±5 menit), tempel URL `/exec` ke `appsScriptUrl` |
| **B. FormSubmit.co** (`emailTujuan`, aktif sekarang) | Tanpa pemasangan apa pun | Setelah website online, kirim satu permintaan uji, lalu klik **Activate Form** di email yang masuk ke `hi.bahtiar@gmail.com`. Sebelum diaktifkan, pengunjung melihat pesan "sedang diaktifkan". Setelah aktif, FormSubmit mengirim kode acak yang boleh dipakai menggantikan alamat email di `emailTujuan` |

Bila `appsScriptUrl` diisi, cara A yang dipakai; bila kosong, cara B. Uji dari `status-konten.html` → tombol
**Uji formulir Konsultasi Langsung** (pengiriman hanya berjalan dari website yang sudah online, bukan dari `file://`).

**Pengaman:** kolom jebakan bot tersembunyi, jeda 60 detik antar-kiriman dari browser yang sama, nomor yang sama tidak
dikirim ulang dalam 30 menit (pengunjung melihat "Permintaan sudah kami terima"), dan di Apps Script batas 40 kiriman per jam.
Pengunjung diberi tahu sebelum mengirim bahwa nomor dipakai untuk menghubunginya dan diminta tidak mengirim NIK/KPJ/OTP.

Tombol yang membuka Konsultasi Langsung: tombol mengambang, kotak "Masih butuh bantuan?", menu, halaman Kontak,
tombol "Konsultasi langsung" di halaman segmen, panel hasil simulasi (ringkasan simulasi ikut terkirim sebagai konteks),
catatan upah minimal di simulator, pencarian tanpa hasil, formulir tidak ditemukan, dan tautan `?konsultasi=1`.

## 12. Banner foto kepala halaman (ukuran & cara membuat)

Kepala halaman (judul) bisa memakai **banner foto** menggantikan ilustrasi SVG. Contoh terpasang: Penerima Upah (`pu`),
tampil di `segmen-pu.html` dan `simulasi-pu.html`.

**Ukuran gambar sumber: 1920 × 1080 px (rasio 16:9), JPG/PNG, TANPA teks.**
Panduan visual area aman: `tools/panduan-banner-1920x1080.jpg`.

```
 ┌───────────────────────── 1920 px ─────────────────────────┐
 │  40% KIRI (0–770 px)        │  60% KANAN (770–1920 px)     │
 │  area lapang: langit,       │  orang / objek utama         │  1080 px
 │  dinding, gradasi lembut.   │  kepala & wajah di pita      │
 │  Judul halaman tampil di    │  tinggi 10%–65%              │
 │  sini (desktop).            │  (±110–700 px dari atas)     │
 └────────────────────────────────────────────────────────────┘
```

- **Jangan menaruh judul/teks di gambar.** Judul ditulis halaman sebagai teks: tetap tajam, terbaca pembaca layar,
  bisa dicari, dan tidak terpotong di ponsel. (Contoh PU yang diunggah sudah dibersihkan dari tulisan "Penerima Upah".)
- **Desktop:** foto menempel di sisi kanan banner (±64% lebar) dan memudar ke kiri; tinggi banner ±320–340 px.
- **Ponsel:** dipakai potongan sisi kanan 16:9 (±360 × 200 px di layar), judul di bawah foto.
- Warna dan gaya mengikuti tema: teal/hijau muda, aksen kuning, cahaya terang.

**Cara membuat & memasang:**

```bash
pip install pillow                                   # sekali saja
python3 tools/buat-hero.py sumber/klaim.png klaim    # → assets/img/hero/klaim.webp (1600×900) + klaim-m.webp (960×540)
```

Lalu daftarkan di `site-config.js`: `heroImages: { pu:{ posisi:'center 28%' }, klaim:{} }`.
Opsi: `--fokus-x 0.30` (tepi kiri potongan ponsel), `--fokus-y 0.05` (tepi atas potongan ponsel), `--kualitas 66` (berkas lebih kecil).
Target ukuran berkas: desktop ≤ 150 KB, ponsel ≤ 80 KB (contoh PU: 76 KB + 48 KB). Bila berkas gagal dimuat, halaman
otomatis kembali ke ilustrasi SVG.

Nama banner = nilai `data-art`: `beranda`, `program`, `segmen`, `pu`, `bpu`, `jakon`, `pmi`, `simulasi`, `daftar`,
`klaim`, `administrasi`, `sipp`, `jmo`, `formulir`, `peraturan`, `kontak`, `hilang` (404).

## 13. Keamanan

- Repository diperlakukan sebagai area publik: jangan unggah data peserta, kredensial, token, atau dokumen pribadi.
- Tangkapan layar tutorial wajib disamarkan.
- Tautan transaksi hanya ke domain resmi (`bpjsketenagakerjaan.go.id`, `kemnaker.go.id`, toko aplikasi resmi).
- Semua tautan eksternal dibuka di tab baru dengan `rel="noopener"`.
- Pesan WhatsApp, konteks Konsultasi Langsung, dan PDF hasil simulasi tidak pernah menyertakan data pribadi.
- Nomor HP dari Konsultasi Langsung hanya masuk ke email/Google Sheets pengelola. Batasi akses Sheet rekap, hapus
  baris yang sudah selesai secara berkala, dan bila situs dipakai resmi pertimbangkan email/akun kantor.

## 14. Catatan versi

**V6 (27 Sep 2026)**
- Nama & logo baru **JagaPekerja** (header, favicon, ikon layar utama, PDF), tema dan warna tetap; pengantar singkat di beranda.
- **Konsultasi Langsung** menggantikan "Tanya petugas": tombol mengambang + formulir nomor HP dengan validasi Indonesia,
  kirim ke email pengelola (Apps Script + rekap Sheets, atau FormSubmit). Kantor & Kontak didesain ulang.
- Data kantor: BPJS Ketenagakerjaan Kantor Cabang Pamekasan (alamat, jam layanan, Google Maps, salin alamat).
- **Koreksi Penerima Upah:** JHT dan JP tidak lagi ditulis "Wajib" untuk semua; label "Sesuai skala usaha" + tabel
  mikro/kecil/menengah-besar (Perpres 109/2013 Pasal 6, acuan skala PP 7/2021) di Program dan halaman PU.
- **Perbaikan tampilan ponsel:** tautan ke detail program (dan semua tautan `#…`) kini mendarat tepat di atas layar
  (sebelumnya 152 px ke bawah sehingga sisa bagian lain terlihat); efek muncul-saat-digulir tidak lagi menyembunyikan konten
  di ponsel; pemilih program menempel; tab Pendaftaran 2 kolom; lembar pilihan BPU tidak memunculkan keyboard otomatis.
- **Simulator PU & BPU didesain ulang:** isian "Rp … / bulan" besar, label **upah sebulan** dipertegas (bukan upah harian),
  pilihan berbentuk pil, sakelar program, − / + jumlah pekerja, **perkiraan langsung** saat mengisi. Batas minimal
  Rp1.500.000/bulan: di bawahnya muncul arahan Konsultasi Langsung atau kantor cabang (angka harian dikenali).
  Angka hasil tidak berubah dari V5 (90 kasus uji dibandingkan).
- Slot **banner foto** kepala halaman + `tools/buat-hero.py` + spesifikasi ukuran; contoh PU terpasang.

**V5 (26 Sep 2026)**
- Desain "Teal Minimalis": palet teal + aksen kuning, judul Poppins, kepala halaman berpita dengan ilustrasi
  (17 ilustrasi: beranda, program, segmen, PU, BPU, Jasa Konstruksi, PMI, simulasi, SIPP, JMO, klaim, dan lainnya).
- SIPP & JMO: menu kartu pilihan → satu topik per tampilan; versi Langkah & Flowchart dari satu sumber data;
  alur baru "Kurangi TK" (disusun ulang dari teks panduan yang sudah ada).
- Hasil simulasi seragam dan mudah dibaca + Unduh PDF, Bagikan PDF, dan Cetak A4. Tahap pemeriksaan kebijakan BPU
  dan ketentuan PMI digabung menjadi banner di hasil. Angka hasil tidak berubah dari V4.
- Kesan "penuh teks" dikurangi: label DRAF hanya untuk pengelola, catatan keamanan ringkas, dokumen klaim sebagai
  daftar centang, rincian program dilipat, "Lanjutkan" di beranda, kartu simulasi berilustrasi.
- Animasi halus: transisi antarhalaman, menu/lembar meluncur, lipatan, efek muncul saat digulir.
- Gaya ketiga simulator disatukan di `assets/css/simulator.css`.

**V4 (26 Sep 2026)** — halaman Program & Segmen Peserta, desain ulang total, navigasi bawah, pencarian suara, 50 kasus uji pencarian.

**V3 (25 Sep 2026)** — empat prototipe disatukan menjadi satu situs multi-halaman.

#!/usr/bin/env python3
"""
JagaPekerja — pembuat berkas BANNER FOTO kepala halaman.

Satu gambar sumber (disarankan 1920 × 1080 px, rasio 16:9, TANPA teks) diubah menjadi:
  assets/img/hero/<nama>.webp     1600 × 900  (desktop & tablet)
  assets/img/hero/<nama>-m.webp    960 × 540  (ponsel: potongan sisi kanan, fokus ke orang/objek)

Cara pakai (butuh Python 3 + Pillow:  pip install pillow):
  python3 tools/buat-hero.py sumber/pu.png pu
  python3 tools/buat-hero.py sumber/klaim.jpg klaim --fokus-x 0.30 --fokus-y 0.05

Lalu daftarkan namanya di assets/js/site-config.js:
  heroImages: { pu: { posisi: 'center 28%' }, klaim: {} }

Nama = nilai data-art pada kepala halaman: beranda, program, segmen, pu, bpu, jakon, pmi, simulasi,
daftar, klaim, administrasi, sipp, jmo, formulir, peraturan, kontak, hilang (404).

Aturan gambar sumber (lihat juga README bagian 12):
  · rasio 16:9, minimal 1600 × 900 (ideal 1920 × 1080), JPG/PNG
  · 40% sisi KIRI dibiarkan lapang (langit, dinding, gradasi) — di desktop judul halaman tampil di sana
  · orang/objek utama di 60% sisi KANAN, kepala/wajah di pita tinggi 10%–65%
  · JANGAN menaruh teks/judul di gambar — judul ditulis oleh halaman (tajam, bisa dicari, mudah diubah)
"""
import argparse, os, sys

try:
    from PIL import Image, ImageOps
except ImportError:
    sys.exit('Pillow belum terpasang. Jalankan: pip install pillow')

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, 'assets', 'img', 'hero')
DESKTOP = (1600, 900)
MOBILE = (960, 540)


def cover(im, size):
    """Ubah ukuran agar menutupi size (potong tengah bila rasio berbeda)."""
    return ImageOps.fit(im, size, method=Image.LANCZOS, centering=(0.5, 0.5))


def mobile_crop(im, fx, fy):
    W, H = im.size
    left = int(round(W * fx))
    w = W - left
    h = int(round(w * 9 / 16))
    if h > H:                      # gambar terlalu pendek: ambil setinggi mungkin, rata kanan
        h = H
        w = int(round(H * 16 / 9))
        left = W - w
    top = int(round(H * fy))
    top = max(0, min(top, H - h))
    return im.crop((left, top, left + w, top + h)).resize(MOBILE, Image.LANCZOS)


def save(im, path, q):
    im.save(path, 'WEBP', quality=q, method=6)
    return os.path.getsize(path)


def main():
    ap = argparse.ArgumentParser(description='Buat banner foto kepala halaman (desktop + ponsel).')
    ap.add_argument('sumber', help='gambar sumber 16:9 tanpa teks (JPG/PNG)')
    ap.add_argument('nama', help='nama banner = nilai data-art halaman, mis. pu, bpu, klaim')
    ap.add_argument('--fokus-x', type=float, default=0.35, help='tepi kiri potongan ponsel, 0–0.6 (bawaan 0.35)')
    ap.add_argument('--fokus-y', type=float, default=0.10, help='tepi atas potongan ponsel, 0–0.4 (bawaan 0.10)')
    ap.add_argument('--kualitas', type=int, default=74, help='kualitas WebP 50–90 (bawaan 74)')
    a = ap.parse_args()

    im = Image.open(a.sumber)
    im = ImageOps.exif_transpose(im).convert('RGB')
    W, H = im.size
    if W < 1200:
        print('Peringatan: gambar sumber kecil (%dx%d). Disarankan minimal 1600x900.' % (W, H))
    if abs(W / H - 16 / 9) > 0.08:
        print('Catatan: rasio sumber %.2f:1 (bukan 16:9); versi desktop dipotong di tengah.' % (W / H))

    os.makedirs(OUT, exist_ok=True)
    d = os.path.join(OUT, a.nama + '.webp')
    m = os.path.join(OUT, a.nama + '-m.webp')
    sd = save(cover(im, DESKTOP), d, a.kualitas)
    sm = save(mobile_crop(im, a.fokus_x, a.fokus_y), m, a.kualitas)
    print('Selesai:')
    print('  %s  %dx%d  %d KB' % (os.path.relpath(d, ROOT), DESKTOP[0], DESKTOP[1], sd // 1024))
    print('  %s  %dx%d  %d KB' % (os.path.relpath(m, ROOT), MOBILE[0], MOBILE[1], sm // 1024))
    if sd > 220 * 1024 or sm > 110 * 1024:
        print('  Berkas cukup besar untuk jaringan lambat; coba --kualitas 66.')
    print("Daftarkan di assets/js/site-config.js → heroImages: { %s: { posisi: 'center 28%%' } }" % a.nama)


if __name__ == '__main__':
    main()

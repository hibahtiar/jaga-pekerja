# Generator ilustrasi SVG JagaPekerja (gaya datar, palet Teal Minimalis).
# Keluaran: assets/img/ilustrasi/<nama>.svg  (viewBox 320x240)
# Jalankan dari folder mana pun: python3 tools/buat-ilustrasi.py
# Ubah warna di bagian atas (T, Y, …) atau adegan di bagian ADEGAN, lalu jalankan ulang.
import os, math
OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'assets', 'img', 'ilustrasi')
os.makedirs(OUT, exist_ok=True)

T = '#0D9488'; TD = '#087F75'; TL = '#14B8A6'; MINT = '#99E2D5'; PALE = '#CCF1EA'; ICE = '#E6F7F3'
Y = '#F2C94C'; YD = '#D9A92E'; YL = '#FFE7A3'
INK = '#1E3533'; NAVY = '#24505A'; GREY = '#BFDAD6'; WHITE = '#FFFFFF'; CORAL = '#F2A07B'; CORALD = '#DB845F'
SK1 = '#F2C29B'; SK2 = '#D99A6C'; SK3 = '#B7784F'
HAIR = '#23302F'; HAIR2 = '#4A3326'

def svg(body, title):
    return ('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240" role="img" aria-label="%s">' % title) + body + '</svg>\n'

def blob(cx=165, cy=128, r=100, fill=WHITE, op=.85):
    # bentuk organik lembut di belakang adegan
    pts = []
    k = [1.0, .92, 1.04, .95, 1.06, .9, 1.02, .96]
    for i in range(8):
        a = i * math.pi / 4
        pts.append((cx + r * k[i] * math.cos(a) * 1.18, cy + r * k[i] * math.sin(a) * .86))
    d = 'M%.1f,%.1f ' % pts[0]
    for i in range(8):
        p0 = pts[i]; p1 = pts[(i + 1) % 8]
        mx, my = (p0[0] + p1[0]) / 2, (p0[1] + p1[1]) / 2
        d += 'Q%.1f,%.1f %.1f,%.1f ' % (p0[0], p0[1], mx, my) if i else 'M%.1f,%.1f ' % (mx, my)
    d += 'Q%.1f,%.1f %.1f,%.1f Z' % (pts[0][0], pts[0][1], (pts[0][0] + pts[1][0]) / 2, (pts[0][1] + pts[1][1]) / 2)
    return '<path d="%s" fill="%s" opacity="%s"/>' % (d, fill, op)

def ground(y=214, x1=40, x2=290):
    return '<ellipse cx="%d" cy="%d" rx="%d" ry="7" fill="%s" opacity=".55"/>' % ((x1 + x2) // 2, y, (x2 - x1) // 2, MINT)

def shadow(x, y, rx=26):
    return '<ellipse cx="%.1f" cy="%.1f" rx="%.1f" ry="5" fill="#0B4D47" opacity=".13"/>' % (x, y, rx)

def sparkle(x, y, s=1, c=Y):
    return ('<path transform="translate(%.1f %.1f) scale(%.2f)" d="M0,-9 C1.2,-2.4 2.4,-1.2 9,0 C2.4,1.2 1.2,2.4 0,9 C-1.2,2.4 -2.4,1.2 -9,0 C-2.4,-1.2 -1.2,-2.4 0,-9Z" fill="%s"/>' % (x, y, s, c))

def dot(x, y, r=3, c=TL, op=1):
    return '<circle cx="%.1f" cy="%.1f" r="%.1f" fill="%s" opacity="%s"/>' % (x, y, r, c, op)

def coin(x, y, r=11):
    return ('<g transform="translate(%.1f %.1f)"><circle r="%.1f" fill="%s"/><circle r="%.1f" fill="%s"/><circle r="%.1f" fill="none" stroke="%s" stroke-width="1.4" opacity=".7"/>'
            '<path d="M%.1f,%.1f A%.1f,%.1f 0 0 1 %.1f,%.1f" stroke="%s" stroke-width="2" fill="none" stroke-linecap="round"/></g>'
            % (x, y, r, YD, r - 1.6, Y, r - 4.4, YD, -(r - 6.5) * .7, -(r - 6.5) * .7, r - 6.5, r - 6.5, (r - 6.5) * .7, -(r - 6.5) * .7, '#FFF4C7'))

def coinstack(x, y, n=3, r=13):
    out = ''
    for i in range(n):
        yy = y - i * 6
        out += '<ellipse cx="%.1f" cy="%.1f" rx="%.1f" ry="%.1f" fill="%s"/><ellipse cx="%.1f" cy="%.1f" rx="%.1f" ry="%.1f" fill="%s"/>' % (x, yy + 2.5, r, r * .42, YD, x, yy, r, r * .42, Y)
    return out

def plant(x, y, s=1):
    return ('<g transform="translate(%.1f %.1f) scale(%.2f)"><path d="M-9,0 L9,0 L7,-16 L-7,-16Z" fill="%s"/>'
            '<path d="M0,-16 C-2,-30 -14,-36 -20,-34 C-18,-26 -10,-18 0,-16Z" fill="%s"/>'
            '<path d="M0,-16 C2,-34 12,-42 19,-41 C18,-30 10,-20 0,-16Z" fill="%s"/>'
            '<path d="M0,-16 C0,-26 -3,-40 -6,-46" stroke="%s" stroke-width="2" fill="none" stroke-linecap="round"/></g>' % (x, y, s, CORAL, TL, T, TD))

def person(x, y, s=1, skin=SK1, hair='short', hairc=HAIR, shirt=WHITE, pants=NAVY, shoes=INK,
           arms=('down', 'down'), acc_back='', acc_front='', hat=None, tie=None, lanyard=False, vest=False,
           sleeve=None, shade=True):
    """Tokoh berdiri; kaki di (x,y). arms: preset 'down'|'hip'|'wave'|'hold'|'point' atau daftar titik."""
    sl = sleeve or shirt
    P = {
        'down': [(-17, -104), (-22, -82), (-23, -61)],
        'hip': [(-17, -104), (-31, -86), (-19, -70)],
        'wave': [(-17, -104), (-31, -124), (-35, -146)],
        'hold': [(-17, -104), (-22, -82), (-5, -78)],
        'point': [(-17, -104), (-34, -108), (-50, -118)],
        'up': [(-17, -104), (-27, -128), (-24, -150)],
    }
    def arm(side, spec):
        pts = P[spec] if isinstance(spec, str) else spec
        if side == 'R':
            pts = [(-a, b) for (a, b) in pts]
        d = 'M%.1f,%.1f ' % pts[0] + ' '.join('L%.1f,%.1f' % p for p in pts[1:])
        hx, hy = pts[-1]
        return ('<path d="%s" stroke="%s" stroke-width="11" fill="none" stroke-linecap="round" stroke-linejoin="round"/>' % (d, sl) +
                '<circle cx="%.1f" cy="%.1f" r="5.6" fill="%s"/>' % (hx, hy, skin))
    g = '<g transform="translate(%.1f %.1f) scale(%.3f)">' % (x, y, s)
    if shade:
        g += '<ellipse cx="0" cy="0" rx="26" ry="5" fill="#0B4D47" opacity=".13"/>'
    g += acc_back
    if hair == 'long':
        g += '<path d="M-17,-136 C-19,-156 19,-158 17,-136 L19,-108 Q0,-102 -19,-108Z" fill="%s"/>' % hairc
    # kaki & sepatu
    g += '<rect x="-15.5" y="-62" width="13.5" height="60" rx="6" fill="%s"/><rect x="2" y="-62" width="13.5" height="60" rx="6" fill="%s"/>' % (pants, pants)
    g += '<path d="M-19,0 Q-19,-7 -12,-7 L-3,-7 Q-1,-7 -1,-4 L-1,0Z" fill="%s"/><path d="M19,0 Q19,-7 12,-7 L3,-7 Q1,-7 1,-4 L1,0Z" fill="%s"/>' % (shoes, shoes)
    # badan
    g += '<path d="M-21,-99 Q-21,-114 -7,-115 L7,-115 Q21,-114 21,-99 L19,-58 Q19,-54 15,-54 L-15,-54 Q-19,-54 -19,-58Z" fill="%s"/>' % shirt
    if vest:
        g += '<path d="M-19,-100 L-7,-114 L-3,-114 L-3,-55 L-15,-55 Q-19,-55 -19,-59Z" fill="%s"/><path d="M19,-100 L7,-114 L3,-114 L3,-55 L15,-55 Q19,-55 19,-59Z" fill="%s"/>' % (Y, Y)
        g += '<rect x="-19" y="-78" width="16" height="4" fill="%s"/><rect x="3" y="-78" width="16" height="4" fill="%s"/>' % (WHITE, WHITE)
    if tie:
        g += '<path d="M-3.5,-114 L3.5,-114 L2.5,-108 L4.5,-80 L0,-74 L-4.5,-80 L-2.5,-108Z" fill="%s"/>' % tie
    if lanyard:
        g += '<path d="M-8,-114 L0,-92 L8,-114" stroke="%s" stroke-width="2.4" fill="none"/><rect x="-6" y="-93" width="12" height="15" rx="2.5" fill="%s"/><rect x="-3.5" y="-89" width="7" height="2.5" rx="1" fill="%s"/>' % (TD, WHITE, T)
    # leher & kepala
    g += '<rect x="-5" y="-124" width="10" height="11" rx="3" fill="%s"/>' % skin
    if hair == 'hijab':
        g += '<path d="M-19,-133 C-19,-157 19,-157 19,-133 L23,-104 Q0,-96 -23,-104Z" fill="%s"/>' % hairc
        g += '<ellipse cx="1" cy="-132" rx="11.5" ry="13" fill="%s"/>' % skin
    else:
        g += '<circle cx="0" cy="-135" r="15" fill="%s"/>' % skin
    if hair == 'short':
        g += '<path d="M-15.5,-137 C-17,-156 16,-158 15.5,-139 C12,-146 3,-148 -4,-145 C-9,-143 -13,-141 -15.5,-137Z" fill="%s"/>' % hairc
    elif hair == 'long':
        g += '<path d="M-15.5,-136 C-17,-157 17,-157 15.5,-134 C10,-146 -2,-150 -15.5,-136Z" fill="%s"/>' % hairc
    elif hair == 'bun':
        g += '<circle cx="0" cy="-153" r="7" fill="%s"/><path d="M-15.5,-136 C-17,-156 17,-156 15.5,-136 C9,-146 -9,-146 -15.5,-136Z" fill="%s"/>' % (hairc, hairc)
    if hat == 'caping':
        g += '<path d="M-34,-139 L34,-139 Q30,-136 0,-136 Q-30,-136 -34,-139Z" fill="%s"/><path d="M-32,-139 L0,-165 L32,-139Z" fill="%s"/><path d="M-12,-149 L12,-149" stroke="%s" stroke-width="2" stroke-linecap="round"/>' % (YD, Y, YD)
    elif hat == 'helm':
        g += '<path d="M-18,-138 C-18,-160 18,-160 18,-138Z" fill="%s"/><rect x="-21" y="-140" width="42" height="5" rx="2.5" fill="%s"/><path d="M0,-158 L0,-141" stroke="%s" stroke-width="3"/>' % (Y, YD, YD)
    elif hat == 'cap':
        g += '<path d="M-15,-140 C-15,-156 15,-156 15,-140Z" fill="%s"/><path d="M8,-141 L26,-139 Q26,-136 14,-137Z" fill="%s"/>' % (T, TD)
    # lengan
    g += arm('L', arms[0]) + arm('R', arms[1])
    g += acc_front
    g += '</g>'
    return g

def write(name, body, title):
    with open(os.path.join(OUT, name + '.svg'), 'w', encoding='utf-8') as f:
        f.write(svg(body, title))

# ---------------- objek ----------------
def shield(x, y, s=1, fill=T, inner=TL, icon='check'):
    g = '<g transform="translate(%.1f %.1f) scale(%.2f)">' % (x, y, s)
    g += '<path d="M0,-52 L40,-38 L40,-6 C40,22 20,40 0,50 C-20,40 -40,22 -40,-6 L-40,-38Z" fill="%s"/>' % fill
    g += '<path d="M0,-52 L40,-38 L40,-6 C40,22 20,40 0,50Z" fill="%s" opacity=".55"/>' % TD
    g += '<path d="M0,-40 L29,-30 L29,-6 C29,14 15,28 0,36 C-15,28 -29,14 -29,-6 L-29,-30Z" fill="%s" opacity=".35"/>' % inner
    if icon == 'check':
        g += '<path d="M-14,-2 L-4,9 L16,-13" stroke="%s" stroke-width="7" fill="none" stroke-linecap="round" stroke-linejoin="round"/>' % WHITE
    elif icon == 'heart':
        g += '<path d="M0,16 C-18,4 -20,-10 -12,-15 C-6,-19 -1,-15 0,-11 C1,-15 6,-19 12,-15 C20,-10 18,4 0,16Z" fill="%s"/>' % WHITE
    g += '</g>'
    return g

def building(x, y, w=70, h=120, c=PALE, win=WHITE, roof=MINT):
    g = '<rect x="%.1f" y="%.1f" width="%.1f" height="%.1f" rx="6" fill="%s"/>' % (x, y - h, w, h, c)
    g += '<rect x="%.1f" y="%.1f" width="%.1f" height="8" rx="4" fill="%s"/>' % (x - 4, y - h - 4, w + 8, roof)
    cols = max(2, int(w // 20)); rows = max(2, int((h - 26) // 20))
    for r in range(rows):
        for c2 in range(cols):
            g += '<rect x="%.1f" y="%.1f" width="10" height="11" rx="2" fill="%s"/>' % (x + 9 + c2 * ((w - 18) / cols) + ((w - 18) / cols - 10) / 2, y - h + 14 + r * 20, win)
    return g

def laptop(x, y, s=1, screen=T):
    g = '<g transform="translate(%.1f %.1f) scale(%.2f)">' % (x, y, s)
    g += '<rect x="-46" y="-62" width="92" height="60" rx="6" fill="%s"/><rect x="-40" y="-56" width="80" height="48" rx="3" fill="%s"/>' % (INK, screen)
    g += '<path d="M-58,0 L58,0 L52,-4 L-52,-4Z" fill="%s"/><rect x="-58" y="-2" width="116" height="5" rx="2.5" fill="%s"/>' % (GREY, '#9CC4BE')
    g += '</g>'
    return g

def phone(x, y, s=1, screen=T):
    g = '<g transform="translate(%.1f %.1f) scale(%.2f)">' % (x, y, s)
    g += '<rect x="-30" y="-60" width="60" height="120" rx="11" fill="%s"/><rect x="-25" y="-52" width="50" height="104" rx="6" fill="%s"/><rect x="-8" y="-57" width="16" height="3" rx="1.5" fill="#3B5553"/>' % (INK, screen)
    g += '</g>'
    return g

def doc(x, y, w=64, h=82, rot=0, lines=5, fill=WHITE, accent=T, fold=True):
    g = '<g transform="translate(%.1f %.1f) rotate(%.1f)">' % (x, y, rot)
    g += '<rect x="%.1f" y="%.1f" width="%.1f" height="%.1f" rx="7" fill="%s" stroke="%s" stroke-width="1.5"/>' % (-w / 2, -h / 2, w, h, fill, GREY)
    g += '<rect x="%.1f" y="%.1f" width="%.1f" height="7" rx="3.5" fill="%s"/>' % (-w / 2 + 10, -h / 2 + 12, w * .45, accent)
    for i in range(lines):
        ww = (w - 20) * (0.95 if i % 3 != 2 else 0.6)
        g += '<rect x="%.1f" y="%.1f" width="%.1f" height="4.5" rx="2.2" fill="%s"/>' % (-w / 2 + 10, -h / 2 + 28 + i * 10, ww, '#D7E8E5')
    g += '</g>'
    return g

def bubble(x, y, w=54, h=34, c=WHITE, tail='left', inner=''):
    tx = x + 10 if tail == 'left' else x + w - 14
    g = '<rect x="%.1f" y="%.1f" width="%.1f" height="%.1f" rx="12" fill="%s"/>' % (x, y, w, h, c)
    g += '<path d="M%.1f,%.1f l4,10 l6,-10Z" fill="%s"/>' % (tx, y + h - 1, c)
    return g + inner

def pin(x, y, s=1, c=CORAL):
    return ('<g transform="translate(%.1f %.1f) scale(%.2f)"><path d="M0,0 C-12,-14 -18,-22 -18,-32 A18,18 0 0 1 18,-32 C18,-22 12,-14 0,0Z" fill="%s"/><circle cx="0" cy="-32" r="7" fill="%s"/></g>' % (x, y, s, c, WHITE))

def cloud(x, y, s=1):
    return '<g transform="translate(%.1f %.1f) scale(%.2f)" opacity=".9"><path d="M-22,6 A10,10 0 0 1 -14,-8 A14,14 0 0 1 12,-10 A11,11 0 0 1 24,6Z" fill="%s"/></g>' % (x, y, s, WHITE)

def sun(x, y, r=16):
    return '<circle cx="%.1f" cy="%.1f" r="%.1f" fill="%s"/><circle cx="%.1f" cy="%.1f" r="%.1f" fill="%s" opacity=".35"/>' % (x, y, r, Y, x, y, r + 7, Y)

# =================== ADEGAN ===================

# 1. BERANDA — empat segmen pekerja di sekitar perisai perlindungan
b = blob(165, 130, 104)
b += ground(214, 26, 300)
b += sparkle(52, 52, 1.1) + sparkle(274, 40, .8, TL) + dot(290, 96, 4, Y) + dot(36, 110, 3.5, TL)
b += shield(162, 108, 1.05)
b += person(62, 212, .66, skin=SK2, hair='short', shirt=WHITE, pants=NAVY, tie=T, lanyard=False, arms=('down', 'hip'))
b += person(112, 216, .72, skin=SK3, hair='short', hairc=HAIR, shirt=CORAL, pants='#6A4E3A', hat='caping', arms=('down', 'down'))
b += person(214, 216, .72, skin=SK1, hair='hijab', hairc=T, shirt=TD, pants=INK, arms=('down', 'wave'),
            acc_back='<rect x="16" y="-60" width="26" height="36" rx="5" fill="%s"/><rect x="24" y="-66" width="10" height="7" rx="3" fill="none" stroke="%s" stroke-width="2.5"/>' % (Y, YD))
b += person(264, 212, .66, skin=SK2, shirt=WHITE, pants=NAVY, hat='helm', vest=True, arms=('hip', 'down'))
b += coin(196, 46, 10) + coin(128, 38, 8)
write('beranda', b, 'Pekerja kantoran, petani, pekerja migran, dan pekerja konstruksi dilindungi perisai BPJS Ketenagakerjaan')

# 2. PU — karyawan kantor dengan laptop, gedung di belakang
b = blob(168, 128, 100)
b += building(196, 196, 64, 132) + building(248, 196, 44, 92, c=ICE)
b += ground(212, 40, 296)
b += '<rect x="70" y="150" width="130" height="8" rx="4" fill="%s"/><rect x="82" y="158" width="7" height="50" rx="3" fill="%s"/><rect x="181" y="158" width="7" height="50" rx="3" fill="%s"/>' % (TD, TD, TD)
b += laptop(146, 150, .72)
b += '<rect x="126" y="112" width="22" height="3.5" rx="1.7" fill="%s"/><rect x="126" y="120" width="34" height="3.5" rx="1.7" fill="%s" opacity=".7"/><rect x="126" y="128" width="16" height="3.5" rx="1.7" fill="%s" opacity=".7"/>' % (WHITE, WHITE, WHITE)
b += person(96, 212, .78, skin=SK2, hair='short', shirt=WHITE, pants=NAVY, tie=T, lanyard=True, arms=('hold', 'hip'))
b += plant(236, 212, .9) + sparkle(62, 60, 1) + sparkle(270, 50, .7, TL) + coin(58, 118, 9)
write('pu', b, 'Karyawan kantor dengan kartu identitas bekerja di depan laptop')

# 3. BPU — petani dengan caping, tanaman, matahari; pedagang dengan keranjang
b = blob(165, 130, 102)
b += sun(262, 58, 17) + cloud(84, 58, 1.1) + cloud(226, 92, .8)
b += '<path d="M28,212 Q160,176 300,206 L300,214 L28,214Z" fill="%s"/>' % MINT
for i, px in enumerate([176, 202, 228, 254, 280]):
    b += plant(px, 205 - (i % 2) * 3, .62)
b += person(96, 214, .8, skin=SK3, hair='short', shirt=CORAL, pants='#6A4E3A', hat='caping', arms=('hold', 'down'),
            acc_front='<path d="M-2,-80 L32,-176" stroke="%s" stroke-width="4" stroke-linecap="round"/><path d="M26,-178 L44,-170 L38,-160Z" fill="%s"/>' % ('#8A5B3C', GREY))
b += person(160, 214, .74, skin=SK1, hair='hijab', hairc=Y, shirt=T, pants=INK, arms=('hold', 'down'),
            acc_front='<path d="M-24,-86 L10,-86 L6,-64 L-20,-64Z" fill="%s"/><path d="M-20,-86 Q-7,-104 6,-86" stroke="%s" stroke-width="3" fill="none"/><circle cx="-14" cy="-90" r="5" fill="%s"/><circle cx="-4" cy="-91" r="5" fill="%s"/><circle cx="4" cy="-89" r="4.5" fill="%s"/>' % ('#C98B52', '#8A5B3C', CORAL, Y, TL))
b += sparkle(48, 100, .9) + dot(292, 126, 3.5, TL)
write('bpu', b, 'Petani bercaping dan pedagang dengan keranjang hasil bumi')

# 4. JAKON — pekerja konstruksi dengan helm, rompi, derek, bata
b = blob(165, 128, 102)
b += '<path d="M226,210 L226,40 M226,48 L296,48 M226,48 L196,48" stroke="%s" stroke-width="7" stroke-linecap="round"/>' % YD
b += '<path d="M226,62 L240,48 M226,78 L240,64" stroke="%s" stroke-width="3"/>' % Y
b += '<path d="M282,48 L282,92" stroke="%s" stroke-width="2.5"/><rect x="270" y="92" width="24" height="16" rx="3" fill="%s"/>' % (INK, T)
b += ground(212, 40, 296)
for r in range(3):
    for c in range(4 - r):
        b += '<rect x="%d" y="%d" width="24" height="12" rx="2.5" fill="%s"/>' % (156 + c * 26 + r * 13, 196 - r * 14, CORAL if (r + c) % 2 == 0 else CORALD)
b += person(96, 214, .82, skin=SK2, shirt=WHITE, pants=NAVY, hat='helm', vest=True, arms=('hold', 'wave'),
            acc_front='<rect x="-18" y="-96" width="30" height="22" rx="3" fill="%s"/><path d="M-13,-89 h20 M-13,-83 h14" stroke="%s" stroke-width="2.2" stroke-linecap="round"/>' % (WHITE, T))
b += sparkle(56, 56, 1) + dot(300, 140, 3.5, TL) + sparkle(172, 60, .6, TL)
write('jakon', b, 'Pekerja konstruksi berhelm dan berompi di dekat derek dan tumpukan bata')

# 5. PMI — pekerja migran dengan koper, pesawat, peta
b = blob(165, 130, 102)
b += '<circle cx="232" cy="104" r="46" fill="%s"/><path d="M200,86 Q214,78 222,90 Q232,98 226,112 Q214,118 206,108Z M240,72 Q258,74 264,90 Q254,96 244,88Z M240,120 Q256,116 262,128 Q252,140 242,134Z" fill="%s"/>' % (PALE, MINT)
b += '<path d="M74,70 Q160,20 250,58" stroke="%s" stroke-width="2.5" fill="none" stroke-dasharray="6 7" stroke-linecap="round"/>' % TL
b += '<g transform="translate(252 56) rotate(18)"><path d="M-22,0 L20,-3 Q28,0 20,3 L-22,0Z" fill="%s"/><path d="M-2,-2 L-12,-18 L-5,-18 L10,-2Z M-2,2 L-12,18 L-5,18 L10,2Z M-20,-1 L-25,-9 L-20,-9 L-14,-1Z" fill="%s"/></g>' % (WHITE, T)
b += ground(212, 40, 296)
b += pin(232, 96, .9)
b += '<rect x="134" y="156" width="40" height="54" rx="8" fill="%s"/><rect x="146" y="148" width="16" height="10" rx="4" fill="none" stroke="%s" stroke-width="3.5"/><path d="M144,166 v36 M164,166 v36" stroke="%s" stroke-width="3"/><circle cx="142" cy="211" r="3.5" fill="%s"/><circle cx="166" cy="211" r="3.5" fill="%s"/>' % (Y, YD, YD, INK, INK)
b += person(100, 214, .82, skin=SK1, hair='hijab', hairc=TD, shirt=T, pants=INK, arms=('down', [(-17, -104), (-26, -80), (-40, -66)]),
            acc_back='<rect x="-26" y="-112" width="16" height="38" rx="6" fill="%s"/>' % CORAL)
b += sparkle(56, 110, .9) + dot(292, 170, 3.5, TL)
write('pmi', b, 'Pekerja migran membawa koper dengan latar peta dan pesawat')

# 6. SIMULASI — kalkulator, koin, grafik
b = blob(165, 128, 100)
b += ground(210, 50, 290)
b += '<g transform="translate(140 118)"><rect x="-44" y="-78" width="88" height="130" rx="14" fill="%s"/><rect x="-34" y="-66" width="68" height="30" rx="6" fill="%s"/>' % (T, '#E6FFFA')
b += '<rect x="-8" y="-57" width="34" height="11" rx="3" fill="%s"/>' % TD
for r in range(3):
    for c in range(3):
        b += '<rect x="%d" y="%d" width="18" height="16" rx="5" fill="%s"/>' % (-34 + c * 25, -26 + r * 22, Y if (r == 2 and c == 2) else '#E6FFFA')
b += '</g>'
b += '<rect x="206" y="120" width="16" height="80" rx="4" fill="%s"/><rect x="228" y="96" width="16" height="104" rx="4" fill="%s"/><rect x="250" y="140" width="16" height="60" rx="4" fill="%s"/>' % (MINT, TL, PALE)
b += '<path d="M200,110 L230,82 L252,96 L282,60" stroke="%s" stroke-width="3.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/><path d="M272,58 L284,58 L284,70" stroke="%s" stroke-width="3.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>' % (CORAL, CORAL)
b += coinstack(74, 196, 4, 16) + coin(66, 140, 11) + coin(92, 118, 8)
b += sparkle(60, 64, 1) + sparkle(292, 120, .7, TL)
write('simulasi', b, 'Kalkulator, tumpukan koin, dan grafik naik')

# 7. SIPP — laptop dasbor perusahaan + kartu pekerja
b = blob(165, 128, 100)
b += building(40, 200, 52, 110, c=ICE)
b += ground(212, 40, 296)
b += laptop(160, 204, 1.25)
b += '<g transform="translate(160 204) scale(1.25)"><rect x="-34" y="-50" width="24" height="18" rx="3" fill="%s"/><rect x="-6" y="-50" width="24" height="18" rx="3" fill="%s" opacity=".85"/>' % (TL, Y)
b += '<rect x="-34" y="-27" width="52" height="3.5" rx="1.7" fill="%s"/><rect x="-34" y="-20" width="44" height="3.5" rx="1.7" fill="%s" opacity=".7"/><rect x="-34" y="-13" width="36" height="3.5" rx="1.7" fill="%s" opacity=".7"/>' % (WHITE, WHITE, WHITE)
b += '<rect x="22" y="-50" width="12" height="40" rx="3" fill="%s" opacity=".35"/></g>' % WHITE
b += '<g transform="translate(252 86)"><rect x="-30" y="-24" width="60" height="48" rx="10" fill="%s" stroke="%s" stroke-width="1.5"/><circle cx="-12" cy="-4" r="8" fill="%s"/><path d="M-22,14 a10,8 0 0 1 20,0" fill="%s"/><path d="M4,-8 h16 M4,0 h12" stroke="%s" stroke-width="3" stroke-linecap="round"/><circle cx="24" cy="-20" r="10" fill="%s"/><path d="M24,-25 v10 M19,-20 h10" stroke="%s" stroke-width="2.6" stroke-linecap="round"/></g>' % (WHITE, GREY, SK2, T, GREY, Y, INK)
b += '<g transform="translate(78 98)"><rect x="-26" y="-20" width="52" height="40" rx="10" fill="%s" stroke="%s" stroke-width="1.5"/><path d="M-12,0 l7,8 l16,-16" stroke="%s" stroke-width="4" fill="none" stroke-linecap="round" stroke-linejoin="round"/></g>' % (WHITE, GREY, T)
b += sparkle(282, 150, .8) + sparkle(120, 50, .7, TL)
write('sipp', b, 'Laptop berisi dasbor perusahaan dengan kartu tambah pekerja')

# 8. JMO — ponsel dengan kartu digital, koin
b = blob(165, 128, 100)
b += ground(212, 60, 280)
b += phone(160, 124, 1.25, screen='#E6FFFA')
b += '<g transform="translate(160 124) scale(1.25)"><rect x="-21" y="-44" width="42" height="26" rx="5" fill="%s"/><circle cx="-11" cy="-31" r="5" fill="%s"/><path d="M-2,-35 h16 M-2,-28 h11" stroke="%s" stroke-width="2.4" stroke-linecap="round"/>' % (T, SK1, WHITE)
b += '<rect x="-21" y="-10" width="42" height="14" rx="4" fill="%s"/><rect x="-16" y="-6" width="18" height="3" rx="1.5" fill="%s"/><rect x="-21" y="10" width="42" height="14" rx="4" fill="%s"/><rect x="-16" y="14" width="24" height="3" rx="1.5" fill="%s"/>' % (WHITE, GREY, WHITE, GREY)
b += '<rect x="-21" y="30" width="42" height="12" rx="6" fill="%s"/></g>' % Y
b += coin(238, 156, 13) + coin(256, 124, 9) + coinstack(84, 200, 3, 15)
b += bubble(208, 60, 60, 34) + '<path d="M224,77 l6,6 l12,-12" stroke="%s" stroke-width="4" fill="none" stroke-linecap="round" stroke-linejoin="round"/>' % T
b += sparkle(70, 66, 1) + dot(290, 170, 3.5, TL)
write('jmo', b, 'Ponsel dengan kartu digital peserta dan koin saldo JHT')

# 9. KLAIM — dokumen klaim, dompet berisi koin, perisai
b = blob(165, 128, 100)
b += ground(212, 50, 290)
b += doc(86, 120, 60, 78, -9, 4)
b += '<g transform="translate(86 120) rotate(-9)"><circle cx="16" cy="25" r="11" fill="%s"/><path d="M11,25 l4,4 l8,-8" stroke="%s" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round"/></g>' % (T, WHITE)
b += shield(262, 98, .66, icon='heart')
b += coin(150, 104, 12) + coin(178, 86, 14) + coin(204, 108, 11) + coin(168, 124, 10)
b += '<rect x="122" y="130" width="104" height="72" rx="14" fill="%s"/><path d="M122,146 Q122,130 138,130 L210,130 Q226,130 226,146Z" fill="%s"/>' % (T, TD)
b += '<rect x="186" y="152" width="48" height="28" rx="10" fill="%s"/><circle cx="202" cy="166" r="6" fill="%s"/><circle cx="202" cy="166" r="2.4" fill="%s"/>' % (TD, Y, YD)
b += '<path d="M136,186 h34" stroke="%s" stroke-width="4" stroke-linecap="round" opacity=".5"/>' % TL
b += sparkle(58, 52, 1) + sparkle(292, 164, .7, TL) + dot(118, 70, 3.5, Y)
write('klaim', b, 'Dompet berisi koin manfaat, dokumen klaim, dan perisai')

# 10. DAFTAR — papan formulir dengan centang, pena, tokoh
b = blob(165, 128, 100)
b += ground(212, 50, 290)
b += '<g transform="translate(178 116)"><rect x="-44" y="-66" width="88" height="124" rx="10" fill="%s"/><rect x="-36" y="-56" width="72" height="106" rx="6" fill="%s"/><rect x="-16" y="-72" width="32" height="14" rx="5" fill="%s"/>' % (TD, WHITE, Y)
for i in range(4):
    yy = -36 + i * 22
    ok = i < 3
    b += '<rect x="-28" y="%d" width="12" height="12" rx="3" fill="%s" stroke="%s" stroke-width="1.5"/>' % (yy, T if ok else WHITE, T if ok else GREY)
    if ok:
        b += '<path d="M-25.5,%.1f l3,3 l5,-6" stroke="%s" stroke-width="2.2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>' % (yy + 6, WHITE)
    b += '<rect x="-10" y="%d" width="%d" height="4" rx="2" fill="%s"/>' % (yy + 4, 36 if i % 2 else 28, '#D7E8E5')
b += '</g>'
b += '<g transform="translate(250 150) rotate(35)"><rect x="-5" y="-40" width="10" height="64" rx="3" fill="%s"/><path d="M-5,24 L0,36 L5,24Z" fill="%s"/><rect x="-5" y="-40" width="10" height="10" rx="3" fill="%s"/></g>' % (CORAL, INK, CORALD)
b += person(90, 214, .78, skin=SK1, hair='bun', hairc=HAIR2, shirt=Y, pants=NAVY, arms=('down', 'point'))
b += sparkle(60, 60, 1) + dot(290, 90, 3.5, TL)
write('daftar', b, 'Formulir pendaftaran di papan dengan kotak yang sudah dicentang')

# 11. ADMINISTRASI — kartu pekerja tambah & kurang
b = blob(165, 128, 100)
b += ground(212, 50, 290)
def card(x, y, badge, bc, skin, shirt):
    g = '<g transform="translate(%d %d)"><rect x="-38" y="-30" width="76" height="60" rx="12" fill="%s" stroke="%s" stroke-width="1.5"/>' % (x, y, WHITE, GREY)
    g += '<circle cx="-14" cy="-6" r="10" fill="%s"/><path d="M-28,20 a14,11 0 0 1 28,0" fill="%s"/><path d="M6,-10 h20 M6,-1 h14 M6,8 h18" stroke="%s" stroke-width="3.5" stroke-linecap="round"/>' % (skin, shirt, '#D7E8E5')
    g += '<circle cx="34" cy="-26" r="12" fill="%s"/><path d="%s" stroke="%s" stroke-width="3" stroke-linecap="round"/></g>' % (bc, 'M28,-26 h12' + (' M34,-32 v12' if badge == '+' else ''), WHITE)
    return g
b += card(116, 96, '+', T, SK2, T) + card(214, 128, '-', CORAL, SK1, Y) + card(126, 170, '+', T, SK3, NAVY)
b += '<path d="M168,92 Q196,86 206,100" stroke="%s" stroke-width="2.5" fill="none" stroke-dasharray="5 6" stroke-linecap="round"/>' % TL
b += sparkle(62, 58, 1) + sparkle(280, 64, .7, TL) + dot(286, 186, 3.5, Y)
write('administrasi', b, 'Kartu pekerja dengan tanda tambah dan kurang')

# 12. PROGRAM — perisai di tengah dengan lima ikon program
b = blob(165, 128, 100)
b += ground(214, 80, 250)
b += shield(160, 120, 1.15)
ic = [(74, 70, 'JKK'), (246, 70, 'JKM'), (56, 150, 'JHT'), (264, 150, 'JP'), (160, 36, 'JKP')]
for (x, y2, lab) in ic:
    b += '<g transform="translate(%d %d)"><circle r="22" fill="%s" stroke="%s" stroke-width="1.5"/>' % (x, y2, WHITE, GREY)
    if lab == 'JKK':
        b += '<path d="M-12,4 C-12,-12 12,-12 12,4Z" fill="%s"/><rect x="-14" y="3" width="28" height="4" rx="2" fill="%s"/>' % (Y, YD)
    elif lab == 'JKM':
        b += '<path d="M0,11 C-14,2 -15,-8 -9,-11 C-5,-14 -1,-11 0,-8 C1,-11 5,-14 9,-11 C15,-8 14,2 0,11Z" fill="%s"/>' % CORAL
    elif lab == 'JHT':
        b += '<ellipse cx="0" cy="5" rx="11" ry="4.5" fill="%s"/><ellipse cx="0" cy="1" rx="11" ry="4.5" fill="%s"/><ellipse cx="0" cy="-4" rx="11" ry="4.5" fill="%s"/>' % (YD, Y, Y)
    elif lab == 'JP':
        b += '<rect x="-11" y="-9" width="22" height="20" rx="4" fill="%s"/><rect x="-11" y="-9" width="22" height="6" rx="3" fill="%s"/><path d="M-5,2 h10 M-5,6 h6" stroke="%s" stroke-width="2" stroke-linecap="round"/>' % (PALE, T, T)
    else:
        b += '<rect x="-12" y="-6" width="24" height="16" rx="3" fill="%s"/><path d="M-5,-6 v-4 h10 v4" stroke="%s" stroke-width="2.5" fill="none"/>' % (TD, TD)
    b += '</g>'
b += '<path d="M96,78 Q124,92 128,100 M224,78 Q196,92 192,100 M78,150 L112,142 M242,150 L208,142 M160,58 L160,68" stroke="%s" stroke-width="2" fill="none" stroke-dasharray="4 5"/>' % TL
write('program', b, 'Perisai dikelilingi lima ikon program JKK, JKM, JHT, JP, dan JKP')

# 13. SEGMEN — empat tokoh berjajar
b = blob(165, 130, 104)
b += ground(214, 22, 300)
b += person(52, 212, .7, skin=SK2, shirt=WHITE, pants=NAVY, tie=T, lanyard=True, arms=('down', 'hip'))
b += person(122, 214, .74, skin=SK3, shirt=CORAL, pants='#6A4E3A', hat='caping', arms=('down', 'down'))
b += person(196, 214, .74, skin=SK2, shirt=WHITE, pants=NAVY, hat='helm', vest=True, arms=('hip', 'down'))
b += person(266, 212, .7, skin=SK1, hair='hijab', hairc=TD, shirt=T, pants=INK, arms=('down', 'down'),
            acc_back='<rect x="18" y="-58" width="24" height="34" rx="5" fill="%s"/><rect x="25" y="-64" width="10" height="7" rx="3" fill="none" stroke="%s" stroke-width="2.5"/>' % (Y, YD))
for i, (x, lab) in enumerate([(52, 'PU'), (122, 'BPU'), (196, 'Jakon'), (266, 'PMI')]):
    w = 16 + len(lab) * 8
    b += '<rect x="%.1f" y="30" width="%d" height="22" rx="11" fill="%s"/><text x="%d" y="45.5" font-family="Poppins,Arial,sans-serif" font-size="12" font-weight="700" fill="%s" text-anchor="middle">%s</text>' % (x - w / 2, w, WHITE if i % 2 else T, x, T if i % 2 else WHITE, lab)
write('segmen', b, 'Empat segmen peserta: penerima upah, bukan penerima upah, jasa konstruksi, dan pekerja migran')

# 14. FORMULIR — tumpukan dokumen PDF dan panah unduh
b = blob(165, 128, 100)
b += ground(212, 60, 280)
b += doc(138, 124, 74, 96, -10, 5) + doc(170, 118, 74, 96, 6, 6)
b += '<g transform="translate(170 118) rotate(6)"><rect x="-37" y="24" width="30" height="14" rx="4" fill="%s"/><text x="-22" y="34.5" font-family="Arial,sans-serif" font-size="9" font-weight="700" fill="%s" text-anchor="middle">PDF</text></g>' % (CORAL, WHITE)
b += '<g transform="translate(248 150)"><circle r="24" fill="%s"/><path d="M0,-11 v18 M-8,0 l8,8 l8,-8" stroke="%s" stroke-width="4" fill="none" stroke-linecap="round" stroke-linejoin="round"/></g>' % (T, WHITE)
b += sparkle(66, 64, 1) + dot(284, 80, 3.5, Y) + sparkle(90, 180, .6, TL)
write('formulir', b, 'Tumpukan dokumen PDF dan tombol unduh')

# 15. PERATURAN — timbangan dan buku
b = blob(165, 128, 100)
b += ground(212, 60, 280)
b += '<rect x="96" y="184" width="130" height="18" rx="4" fill="%s"/><rect x="104" y="170" width="116" height="16" rx="4" fill="%s"/><path d="M110,178 h96" stroke="%s" stroke-width="2"/>' % (TD, T, TL)
b += '<path d="M161,168 L161,62" stroke="%s" stroke-width="6" stroke-linecap="round"/><path d="M146,168 h30" stroke="%s" stroke-width="7" stroke-linecap="round"/>' % (INK, INK)
b += '<path d="M104,76 L218,76" stroke="%s" stroke-width="5" stroke-linecap="round"/><circle cx="161" cy="60" r="7" fill="%s"/>' % (INK, Y)
b += '<path d="M104,76 L88,122 M104,76 L120,122 M218,76 L202,122 M218,76 L234,122" stroke="%s" stroke-width="1.8"/>' % GREY
b += '<path d="M84,122 Q104,140 124,122Z M198,122 Q218,140 238,122Z" fill="%s"/>' % Y
b += sparkle(60, 60, 1) + sparkle(272, 56, .7, TL) + dot(56, 150, 3.5, TL)
write('peraturan', b, 'Timbangan keadilan di atas tumpukan buku peraturan')

# 16. KONTAK — petugas dengan headset, gelembung chat, pin lokasi
b = blob(165, 128, 100)
b += ground(212, 50, 290)
b += bubble(176, 50, 76, 40) + '<circle cx="198" cy="70" r="4" fill="%s"/><circle cx="214" cy="70" r="4" fill="%s"/><circle cx="230" cy="70" r="4" fill="%s"/>' % (T, T, T)
b += bubble(206, 104, 62, 34, c=T, tail='right') + '<path d="M220,121 h32 M220,113 h22" stroke="%s" stroke-width="3" stroke-linecap="round"/>' % WHITE
b += pin(268, 206, 1.05)
b += person(120, 214, .84, skin=SK2, hair='hijab', hairc=T, shirt=WHITE, pants=NAVY, arms=('hip', 'wave'),
            acc_front='<path d="M-16,-140 C-16,-160 17,-160 17,-140" stroke="%s" stroke-width="4" fill="none"/><rect x="-21" y="-142" width="8" height="14" rx="4" fill="%s"/><rect x="14" y="-142" width="8" height="14" rx="4" fill="%s"/><path d="M17,-130 Q16,-118 6,-117" stroke="%s" stroke-width="2.5" fill="none"/>' % (INK, INK, INK, INK))
b += sparkle(62, 70, 1) + dot(80, 150, 3.5, Y)
write('kontak', b, 'Petugas layanan dengan headset, gelembung chat, dan pin lokasi kantor')

# 17. HILANG (404) — papan penunjuk jalan dan tanda tanya
b = blob(165, 128, 100)
b += ground(212, 60, 280)
b += '<rect x="156" y="70" width="8" height="140" rx="4" fill="%s"/>' % '#8A5B3C'
b += '<path d="M110,78 L200,78 L214,92 L200,106 L110,106Z" fill="%s"/><path d="M212,118 L126,118 L112,132 L126,146 L212,146Z" fill="%s"/>' % (T, Y)
b += '<path d="M126,92 h58 M140,132 h56" stroke="%s" stroke-width="4" stroke-linecap="round" opacity=".85"/>' % WHITE
b += '<g transform="translate(254 72)"><circle r="24" fill="%s"/><text x="0" y="10" font-family="Poppins,Arial,sans-serif" font-size="30" font-weight="700" fill="%s" text-anchor="middle">?</text></g>' % (CORAL, WHITE)
b += plant(92, 212, .9) + sparkle(62, 56, 1) + dot(284, 150, 3.5, TL)
write('hilang', b, 'Papan penunjuk jalan dengan tanda tanya')
print('ok', sorted(os.listdir(OUT)))

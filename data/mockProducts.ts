/**
 * OFFICIAL MARKETPLACE FRAME TEMPLATES & CATALOG SEED DATA
 *
 * Berisi koleksi Frame Template eksklusif seharga Rp 20.000 dan Rp 15.000
 * yang terintegrasi langsung dengan K-Click Photobooth Live.
 */
import { Product, PhotoboothTemplate } from '../types';

function createFrameSvgPreview(
  bgHex: string,
  accentHex: string,
  textHex: string,
  title: string,
  subtitle: string,
  priceBadge: string,
  icons: [string, string, string, string]
): string {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 800" width="600" height="800">
    <defs>
      <linearGradient id="bgGrad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="${bgHex}" />
        <stop offset="100%" stop-color="${bgHex}" />
      </linearGradient>
      <pattern id="dots" x="0" y="0" width="32" height="32" patternUnits="userSpaceOnUse">
        <circle cx="16" cy="16" r="2" fill="${accentHex}" fill-opacity="0.18" />
      </pattern>
    </defs>
    <rect width="600" height="800" rx="28" fill="url(#bgGrad)" />
    <rect width="600" height="800" rx="28" fill="url(#dots)" />
    <rect x="20" y="20" width="560" height="760" rx="22" fill="none" stroke="${accentHex}" stroke-width="4" stroke-opacity="0.45" />

    <!-- Header -->
    <text x="300" y="64" text-anchor="middle" font-family="Outfit, sans-serif" font-weight="800" font-size="22" fill="${textHex}" letter-spacing="1.5">${title}</text>
    <text x="300" y="92" text-anchor="middle" font-family="Plus Jakarta Sans, sans-serif" font-weight="600" font-size="14" fill="${textHex}" fill-opacity="0.8">${subtitle}</text>

    <!-- 4-Cut Photo Windows Preview -->
    <g>
      <rect x="65" y="118" width="220" height="260" rx="18" fill="#ffffff" fill-opacity="0.82" stroke="${accentHex}" stroke-width="3" />
      <text x="175" y="252" text-anchor="middle" font-family="Outfit, sans-serif" font-weight="700" font-size="16" fill="${accentHex}" fill-opacity="0.65">CUT 01</text>

      <rect x="315" y="118" width="220" height="260" rx="18" fill="#ffffff" fill-opacity="0.82" stroke="${accentHex}" stroke-width="3" />
      <text x="425" y="252" text-anchor="middle" font-family="Outfit, sans-serif" font-weight="700" font-size="16" fill="${accentHex}" fill-opacity="0.65">CUT 02</text>

      <rect x="65" y="402" width="220" height="260" rx="18" fill="#ffffff" fill-opacity="0.82" stroke="${accentHex}" stroke-width="3" />
      <text x="175" y="536" text-anchor="middle" font-family="Outfit, sans-serif" font-weight="700" font-size="16" fill="${accentHex}" fill-opacity="0.65">CUT 03</text>

      <rect x="315" y="402" width="220" height="260" rx="18" fill="#ffffff" fill-opacity="0.82" stroke="${accentHex}" stroke-width="3" />
      <text x="425" y="536" text-anchor="middle" font-family="Outfit, sans-serif" font-weight="700" font-size="16" fill="${accentHex}" fill-opacity="0.65">CUT 04</text>
    </g>

    <!-- Decorative Corner Icons -->
    <text x="55" y="65" font-size="28">${icons[0]}</text>
    <text x="515" y="65" font-size="28">${icons[1]}</text>
    <text x="55" y="740" font-size="28">${icons[2]}</text>
    <text x="515" y="740" font-size="28">${icons[3]}</text>

    <!-- Footer Stamp -->
    <rect x="175" y="690" width="250" height="36" rx="18" fill="${accentHex}" />
    <text x="300" y="713" text-anchor="middle" font-family="Outfit, sans-serif" font-weight="800" font-size="13" fill="#ffffff" letter-spacing="1">${priceBadge}</text>
    <text x="300" y="754" text-anchor="middle" font-family="monospace" font-weight="700" font-size="12" fill="${textHex}" fill-opacity="0.75">K-CLICK PHOTOBOOTH LIVE FRAME</text>
  </svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

export const MARKETPLACE_FRAME_PRODUCTS: Product[] = [
  {
    id: 'frame-seoul-encore-20k',
    creatorId: 'kclick-official-studio',
    creatorName: 'Hana Studio KR',
    creatorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    name: 'Seoul Idol Encore VIP Frame Pack',
    category: 'Frame',
    description:
      'Frame eksklusif bertema konser encore Seoul dengan aksen rose-crimson VIP, watermark Hangul autentik, dan border presisi. Setelah dibeli, frame ini dapat langsung diaplikasikan di Photobooth Live (semua rasio: Strip, 2:3, 3:4, 4:5, 9:16) maupun diunduh dalam format PNG transparan.',
    price: 20000,
    previewImage: createFrameSvgPreview(
      '#ffe4e6',
      '#e11d48',
      '#9f1239',
      'SEOUL ENCORE STAGE',
      '서울 앙코르 스테이지 • 영원한 순간',
      'VIP FRAME • RP 20.000',
      ['🎤', '💖', '👑', '🎀']
    ),
    productFile: 'templates/kclick-official-studio/frame-seoul-encore-20k/master.png',
    tags: ['frame', 'photobooth', 'seoul', 'encore', 'kpop', 'vip', '20k'],
    status: 'approved',
    rating: 5.0,
    reviewCount: 34,
    salesCount: 168,
    licenseType: 'Personal Use',
    copyrightAgreed: true,
    photoboothConfig: {
      id: 'frame-seoul-encore-20k',
      name: 'Seoul Idol Encore VIP',
      category: 'K-Pop VIP',
      themeColor: '#ffe4e6',
      accentColor: '#e11d48',
      textColor: '#9f1239',
      bannerText: 'SEOUL ENCORE STAGE • VIP CUT',
      koreanText: '서울 앙코르 스테이지 • 영원한 순간',
      stickers: [
        { icon: '🎤', label: 'Mic', x: 8, y: 3 },
        { icon: '💖', label: 'Heart', x: 85, y: 3 },
        { icon: '👑', label: 'Crown', x: 12, y: 92 },
        { icon: '🎀', label: 'Ribbon', x: 82, y: 92 },
      ],
      previewUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80',
      isPremium: true,
    },
    createdAt: '2026-09-15T08:00:00.000Z',
  },
  {
    id: 'frame-cyber-y2k-20k',
    creatorId: 'kclick-official-studio',
    creatorName: 'NeoKpop Design',
    creatorAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
    name: 'Cyber Y2K Metallic Chrome Frame',
    category: 'Frame',
    description:
      'Frame photobooth futuristik bergaya Girl Crush & Cyber Y2K Metallic dengan aksen ungu elektrik dan tipografi Korea modern. Siap langsung dipakai di Photobooth Live begitu pembayaran terkonfirmasi!',
    price: 20000,
    previewImage: createFrameSvgPreview(
      '#ede9fe',
      '#7c3aed',
      '#4c1d95',
      'CYBER Y2K METALLIC',
      '사이버 Y2K 메탈릭 • 넥스트 레벨',
      'EXCLUSIVE • RP 20.000',
      ['💿', '⚡', '🎧', '💜']
    ),
    productFile: 'templates/kclick-official-studio/frame-cyber-y2k-20k/master.png',
    tags: ['frame', 'photobooth', 'y2k', 'cyber', 'metallic', 'kpop', '20k'],
    status: 'approved',
    rating: 4.9,
    reviewCount: 29,
    salesCount: 142,
    licenseType: 'Commercial Use',
    copyrightAgreed: true,
    photoboothConfig: {
      id: 'frame-cyber-y2k-20k',
      name: 'Cyber Y2K Metallic Chrome',
      category: 'Y2K Cyber',
      themeColor: '#ede9fe',
      accentColor: '#7c3aed',
      textColor: '#4c1d95',
      bannerText: 'CYBER Y2K METALLIC // NEXT LEVEL',
      koreanText: '사이버 Y2K 메탈릭 • 넥스트 레벨',
      stickers: [
        { icon: '💿', label: 'CD', x: 8, y: 3 },
        { icon: '⚡', label: 'Bolt', x: 85, y: 3 },
        { icon: '🎧', label: 'Headphone', x: 12, y: 92 },
        { icon: '💜', label: 'Purple Heart', x: 82, y: 92 },
      ],
      previewUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=300&auto=format&fit=crop&q=80',
      isPremium: true,
    },
    createdAt: '2026-09-16T09:30:00.000Z',
  },
  {
    id: 'frame-royal-velvet-20k',
    creatorId: 'kclick-official-studio',
    creatorName: 'Minji Artworks',
    creatorAvatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150&auto=format&fit=crop&q=80',
    name: 'Royal Velvet Midnight Noir Frame',
    category: 'Frame',
    description:
      'Desain frame obsidian hitam elegan dengan aksen velvet rose untuk konsep foto dark-concept idol dan fansign eksklusif. Langsung aktif dan bisa dipasang pada Photobooth Live setelah pembelian.',
    price: 20000,
    previewImage: createFrameSvgPreview(
      '#18181b',
      '#f43f5e',
      '#fafafa',
      'ROYAL VELVET NOIR',
      '로얄 벨벳 누아르 • 프리미엄 에디션',
      'NOIR VIP • RP 20.000',
      ['🖤', '🌙', '🌹', '🍷']
    ),
    productFile: 'templates/kclick-official-studio/frame-royal-velvet-20k/master.png',
    tags: ['frame', 'photobooth', 'noir', 'velvet', 'dark', 'idol', '20k'],
    status: 'approved',
    rating: 5.0,
    reviewCount: 41,
    salesCount: 195,
    licenseType: 'Commercial Use',
    copyrightAgreed: true,
    photoboothConfig: {
      id: 'frame-royal-velvet-20k',
      name: 'Royal Velvet Midnight Noir',
      category: 'Noir Luxury',
      themeColor: '#18181b',
      accentColor: '#f43f5e',
      textColor: '#fafafa',
      bannerText: 'ROYAL VELVET NOIR • EXCLUSIVE CUT',
      koreanText: '로얄 벨벳 누아르 • 프리미엄 에디션',
      stickers: [
        { icon: '🖤', label: 'Black Heart', x: 8, y: 3 },
        { icon: '🌙', label: 'Moon', x: 85, y: 3 },
        { icon: '🌹', label: 'Rose', x: 12, y: 92 },
        { icon: '🍷', label: 'Glass', x: 82, y: 92 },
      ],
      previewUrl: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=300&auto=format&fit=crop&q=80',
      isPremium: true,
    },
    createdAt: '2026-09-17T11:00:00.000Z',
  },
  {
    id: 'frame-sakura-debut-15k',
    creatorId: 'kclick-official-studio',
    creatorName: 'Hana Studio KR',
    creatorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    name: 'Sakura Cherry Blossom Debut Frame',
    category: 'Frame',
    description:
      'Frame bernuansa musim semi Korea dengan warna sakura pink lembut, dekorasi kelopak bunga, dan teks Hangul estetik. Harga terjangkau Rp 15.000 dan langsung bisa digunakan di Photobooth Live!',
    price: 15000,
    previewImage: createFrameSvgPreview(
      '#fce7f3',
      '#db2777',
      '#be185d',
      'SAKURA SPRING DEBUT',
      '벚꽃 데뷔 기념 • 설레는 봄날',
      'SPRING CUT • RP 15.000',
      ['🌸', '🌷', '💌', '🎀']
    ),
    productFile: 'templates/kclick-official-studio/frame-sakura-debut-15k/master.png',
    tags: ['frame', 'photobooth', 'sakura', 'pink', 'pastel', 'kpop', '15k'],
    status: 'approved',
    rating: 4.9,
    reviewCount: 38,
    salesCount: 215,
    licenseType: 'Personal Use',
    copyrightAgreed: true,
    photoboothConfig: {
      id: 'frame-sakura-debut-15k',
      name: 'Sakura Cherry Blossom Debut',
      category: 'Spring Pastel',
      themeColor: '#fce7f3',
      accentColor: '#db2777',
      textColor: '#be185d',
      bannerText: 'SAKURA BLOSSOM • SPRING DEBUT',
      koreanText: '벚꽃 데뷔 기념 • 설레는 봄날',
      stickers: [
        { icon: '🌸', label: 'Sakura', x: 8, y: 3 },
        { icon: '🌷', label: 'Tulip', x: 85, y: 3 },
        { icon: '💌', label: 'Love Letter', x: 12, y: 92 },
        { icon: '🎀', label: 'Bow', x: 82, y: 92 },
      ],
      previewUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80',
      isPremium: true,
    },
    createdAt: '2026-09-18T10:15:00.000Z',
  },
  {
    id: 'frame-haru-cloud-15k',
    creatorId: 'kclick-official-studio',
    creatorName: 'SeoulVibe Visuals',
    creatorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    name: 'Dreamy Haru Sky Cloud Frame',
    category: 'Frame',
    description:
      'Frame warna biru langit pastel ala studio foto Hongdae (Haru Film style). Cocok untuk foto bersama sahabat atau bias. Seharga Rp 15.000 dan terintegrasi penuh dengan Photobooth Live.',
    price: 15000,
    previewImage: createFrameSvgPreview(
      '#e0f2fe',
      '#0284c7',
      '#0369a1',
      'DREAMY HARU CLOUD',
      '구름 위의 하루 • 청량한 우리',
      'HARU EDITION • RP 15.000',
      ['☁️', '🫧', '💙', '🐬']
    ),
    productFile: 'templates/kclick-official-studio/frame-haru-cloud-15k/master.png',
    tags: ['frame', 'photobooth', 'haru', 'sky', 'cloud', 'aesthetic', '15k'],
    status: 'approved',
    rating: 4.8,
    reviewCount: 27,
    salesCount: 184,
    licenseType: 'Personal Use',
    copyrightAgreed: true,
    photoboothConfig: {
      id: 'frame-haru-cloud-15k',
      name: 'Dreamy Haru Sky Cloud',
      category: 'Haru Aesthetic',
      themeColor: '#e0f2fe',
      accentColor: '#0284c7',
      textColor: '#0369a1',
      bannerText: 'DREAMY HARU CLOUD • SKY STUDIO',
      koreanText: '구름 위의 하루 • 청량한 우리',
      stickers: [
        { icon: '☁️', label: 'Cloud', x: 8, y: 3 },
        { icon: '🫧', label: 'Bubble', x: 85, y: 3 },
        { icon: '💙', label: 'Blue Heart', x: 12, y: 92 },
        { icon: '🐬', label: 'Dolphin', x: 82, y: 92 },
      ],
      previewUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80',
      isPremium: true,
    },
    createdAt: '2026-09-19T14:20:00.000Z',
  },
  {
    id: 'frame-butter-cafe-15k',
    creatorId: 'kclick-official-studio',
    creatorName: 'Borahae Graphics',
    creatorAvatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80',
    name: 'Soft Butter Bear Cafe Frame',
    category: 'Frame',
    description:
      'Frame cute bertema cup-sleeve birthday event di cafe Korea dengan nuansa cream-butter hangat dan stiker teddy bear. Harga Rp 15.000 dan langsung siap dipakai di Photobooth Live setelah pembelian!',
    price: 15000,
    previewImage: createFrameSvgPreview(
      '#fef3c7',
      '#d97706',
      '#92400e',
      'BUTTER BEAR CAFE',
      '버터 베어 카페 • 달콤한 생일 투어',
      'CAFE CUT • RP 15.000',
      ['🧸', '🥐', '☕', '💛']
    ),
    productFile: 'templates/kclick-official-studio/frame-butter-cafe-15k/master.png',
    tags: ['frame', 'photobooth', 'cafe', 'teddy', 'cute', 'birthday', '15k'],
    status: 'approved',
    rating: 4.9,
    reviewCount: 31,
    salesCount: 176,
    licenseType: 'Personal Use',
    copyrightAgreed: true,
    photoboothConfig: {
      id: 'frame-butter-cafe-15k',
      name: 'Soft Butter Bear Cafe',
      category: 'Cute Cafe',
      themeColor: '#fef3c7',
      accentColor: '#d97706',
      textColor: '#92400e',
      bannerText: 'BUTTER BEAR CAFE • BIRTHDAY EVENT',
      koreanText: '버터 베어 카페 • 달콤한 생일 투어',
      stickers: [
        { icon: '🧸', label: 'Teddy', x: 8, y: 3 },
        { icon: '🥐', label: 'Croissant', x: 85, y: 3 },
        { icon: '☕', label: 'Coffee', x: 12, y: 92 },
        { icon: '💛', label: 'Yellow Heart', x: 82, y: 92 },
      ],
      previewUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=300&auto=format&fit=crop&q=80',
      isPremium: true,
    },
    createdAt: '2026-09-20T16:00:00.000Z',
  },
  {
    id: 'frame-carat-serenity-20k',
    creatorId: 'kclick-official-studio',
    creatorName: 'CaratBong Visuals',
    creatorAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
    name: 'Carat Rose Quartz & Serenity Photobooth Frame',
    category: 'Photobooth',
    description:
      'Frame Photobooth 4-Cut terinspirasi dari warna resmi Rose Quartz & Serenity dengan kristal berlian dan slogan konser Korea. Harga Rp 20.000 dan langsung terintegrasi di Photobooth Live.',
    price: 20000,
    previewImage: createFrameSvgPreview(
      '#f5d0fe',
      '#9333ea',
      '#581c87',
      'ROSE QUARTZ SERENITY',
      '로즈쿼츠 세레니티 • 영원히 빛나는 캐럿',
      'DIAMOND VIP • RP 20.000',
      ['💎', '🌸', '✨', '💜']
    ),
    productFile: 'templates/kclick-official-studio/frame-carat-serenity-20k/master.png',
    tags: ['frame', 'photobooth', 'seventeen', 'carat', 'rose quartz', 'serenity', 'kpop', '20k'],
    status: 'approved',
    rating: 5.0,
    reviewCount: 52,
    salesCount: 310,
    licenseType: 'Personal Use',
    copyrightAgreed: true,
    photoboothConfig: {
      id: 'frame-carat-serenity-20k',
      name: 'Carat Rose Quartz & Serenity',
      category: 'Fandom VIP',
      themeColor: '#f5d0fe',
      accentColor: '#9333ea',
      textColor: '#581c87',
      bannerText: 'ROSE QUARTZ & SERENITY • SHINING DIAMOND',
      koreanText: '로즈쿼츠 세레니티 • 영원히 빛나는 캐럿',
      stickers: [
        { icon: '💎', label: 'Diamond', x: 8, y: 3 },
        { icon: '🌸', label: 'Blossom', x: 85, y: 3 },
        { icon: '💖', label: 'Heart', x: 12, y: 92 },
        { icon: '💜', label: 'Purple Heart', x: 82, y: 92 },
      ],
      previewUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=300&auto=format&fit=crop&q=80',
      isPremium: true,
    },
    createdAt: '2026-09-22T12:00:00.000Z',
  },
  {
    id: 'frame-neo-mint-15k',
    creatorId: 'kclick-official-studio',
    creatorName: 'NeoCity Lab',
    creatorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    name: 'Neo Mint Matcha Photobooth Strip Frame',
    category: 'Photobooth',
    description:
      'Frame Photobooth segar berwarna Neo Pearl Champagne & Matcha Mint dengan aksen street-style Seoul. Harga Rp 15.000 dan siap digunakan langsung pada Live Camera Previewer.',
    price: 15000,
    previewImage: createFrameSvgPreview(
      '#dcfce7',
      '#16a34a',
      '#14532d',
      'NEO MINT MATCHA',
      '네오 민트 말차 • 시즈니 스페셜 컷',
      'NEO EDITION • RP 15.000',
      ['🍀', '💚', '🎧', '🔋']
    ),
    productFile: 'templates/kclick-official-studio/frame-neo-mint-15k/master.png',
    tags: ['frame', 'photobooth', 'nct', 'neo', 'mint', 'matcha', 'green', '15k'],
    status: 'approved',
    rating: 4.8,
    reviewCount: 24,
    salesCount: 159,
    licenseType: 'Personal Use',
    copyrightAgreed: true,
    photoboothConfig: {
      id: 'frame-neo-mint-15k',
      name: 'Neo Mint Matcha',
      category: 'Neo Street',
      themeColor: '#dcfce7',
      accentColor: '#16a34a',
      textColor: '#14532d',
      bannerText: 'NEO MINT MATCHA • TO THE WORLD',
      koreanText: '네오 민트 말차 • 시즈니 스페셜 컷',
      stickers: [
        { icon: '🍀', label: 'Clover', x: 8, y: 3 },
        { icon: '💚', label: 'Green Heart', x: 85, y: 3 },
        { icon: '🎧', label: 'Headset', x: 12, y: 92 },
        { icon: '🔋', label: 'Battery', x: 82, y: 92 },
      ],
      previewUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80',
      isPremium: true,
    },
    createdAt: '2026-09-24T09:45:00.000Z',
  },
  {
    id: 'frame-starter-pastel-free',
    creatorId: 'kclick-official-studio',
    creatorName: 'K-Click Official',
    creatorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    name: 'K-Click Soft Lavender Starter Frame (Free)',
    category: 'Frame',
    description:
      'Frame Photobooth edisi komunitas gratis dengan nuansa lavender lembut. Klaim gratis dan langsung gunakan di Photobooth Live & Template Previewer!',
    price: 0,
    previewImage: createFrameSvgPreview(
      '#f3e8ff',
      '#9333ea',
      '#6b21a8',
      'LAVENDER DREAM FREE',
      '라벤더 드림 • 케이클릭 무료 프레임',
      'COMMUNITY • GRATIS',
      ['💜', '🎀', '📸', '🌸']
    ),
    productFile: 'templates/kclick-official-studio/frame-starter-pastel-free/master.png',
    tags: ['frame', 'photobooth', 'free', 'gratis', 'lavender', 'pastel', 'kpop'],
    status: 'approved',
    rating: 4.9,
    reviewCount: 64,
    salesCount: 420,
    licenseType: 'Personal Use',
    copyrightAgreed: true,
    photoboothConfig: {
      id: 'frame-starter-pastel-free',
      name: 'Soft Lavender Starter',
      category: 'Aesthetic',
      themeColor: '#f3e8ff',
      accentColor: '#9333ea',
      textColor: '#6b21a8',
      bannerText: 'LAVENDER DREAM • FOREVER MEMORIES',
      koreanText: '라벤더 드림 • 케이클릭 무료 프레임',
      stickers: [
        { icon: '💜', label: 'Heart', x: 8, y: 3 },
        { icon: '🎀', label: 'Ribbon', x: 85, y: 3 },
        { icon: '📸', label: 'Camera', x: 12, y: 92 },
        { icon: '🌸', label: 'Flower', x: 82, y: 92 },
      ],
      previewUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80',
      isPremium: false,
    },
    createdAt: '2026-09-25T15:30:00.000Z',
  },
];

export const INITIAL_PRODUCTS: Product[] = [...MARKETPLACE_FRAME_PRODUCTS];

/**
 * Checks whether a marketplace Product is a Frame or Photobooth template that can be applied in Photobooth Live
 */
export function isPhotoboothFrameProduct(product: Product): boolean {
  return (
    product.category === 'Frame' ||
    product.category === 'Photobooth' ||
    Boolean(product.photoboothConfig)
  );
}

/**
 * Converts any Marketplace Frame/Photobooth Product into a live PhotoboothTemplate configuration
 */
export function productToPhotoboothTemplate(product: Product): PhotoboothTemplate {
  if (product.photoboothConfig) {
    return product.photoboothConfig;
  }

  // Check if it matches one of the official frame templates by ID
  const officialMatch = MARKETPLACE_FRAME_PRODUCTS.find((p) => p.id === product.id);
  if (officialMatch?.photoboothConfig) {
    return officialMatch.photoboothConfig;
  }

  // Deterministic aesthetic palette for custom creator Frame/Photobooth products
  const palettes = [
    { themeColor: '#fce7f3', accentColor: '#db2777', textColor: '#be185d' },
    { themeColor: '#ede9fe', accentColor: '#7c3aed', textColor: '#4c1d95' },
    { themeColor: '#e0f2fe', accentColor: '#0284c7', textColor: '#0369a1' },
    { themeColor: '#fef3c7', accentColor: '#d97706', textColor: '#92400e' },
    { themeColor: '#dcfce7', accentColor: '#16a34a', textColor: '#15803d' },
  ];
  const hash = product.id.split('').reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
  const pal = palettes[hash % palettes.length];

  return {
    id: product.id,
    name: product.name,
    category: product.category,
    themeColor: pal.themeColor,
    accentColor: pal.accentColor,
    textColor: pal.textColor,
    bannerText: `${product.name.toUpperCase().slice(0, 26)} • K-CLICK`,
    koreanText: '케이클릭 크리에이터 에디션 • 특별한 순간',
    stickers: [
      { icon: '💖', label: 'Heart', x: 8, y: 3 },
      { icon: '🎀', label: 'Ribbon', x: 85, y: 3 },
      { icon: '📸', label: 'Camera', x: 12, y: 92 },
      { icon: '🎵', label: 'Music', x: 82, y: 92 },
    ],
    previewUrl: product.previewImage,
    isPremium: product.price > 0,
  };
}

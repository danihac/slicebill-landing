import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

async function createOgImage({
  lang = 'pl',
  storeMockupPath,
  cropOptions,
  outputPath
}) {
  const isPl = lang === 'pl';

  // 1. Convert logo to base64 for embedding in SVG
  const logoBuffer = await sharp('public/slicebill.png')
    .resize(80, 80)
    .toBuffer();
  const logoBase64 = `data:image/png;base64,${logoBuffer.toString('base64')}`;

  const badgeText = isPl
    ? 'Alternatywa dla Splitwise • Bez rejestracji'
    : 'Splitwise Alternative • No Sign-up Needed';

  const headingLine1 = isPl ? 'Podziel wydatki' : 'Split expenses';
  const headingLine2 = isPl ? 'bez konta.' : 'without an account.';

  const descLine1 = isPl
    ? 'Darmowa aplikacja do rozliczania kosztów grupowych.'
    : 'Free, privacy-first app to settle group expenses.';
  const descLine2 = isPl
    ? 'Działa w 100% offline • Skaner AI • Wiele walut'
    : '100% offline support • Smart AI Scanner • Multi-currency';

  const pillOffline = isPl ? 'Działa offline' : 'Works offline';
  const pillAi = isPl ? 'Skaner AI' : 'Smart AI Scan';
  const pillCurrencies = isPl ? 'Wiele walut' : 'Multi-currency';
  const badgeAvailable = isPl ? 'DOSTĘPNE NA:' : 'AVAILABLE ON:';

  // 2. Base background + Left Column SVG
  const baseSvg = `
<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#090a0d" />
      <stop offset="50%" stop-color="#0f1118" />
      <stop offset="100%" stop-color="#141724" />
    </linearGradient>

    <!-- Glowing orbs -->
    <radialGradient id="emeraldGlow" cx="20%" cy="25%" r="40%">
      <stop offset="0%" stop-color="#10b981" stop-opacity="0.2" />
      <stop offset="100%" stop-color="#10b981" stop-opacity="0" />
    </radialGradient>

    <!-- Glow behind phone mockup on right -->
    <radialGradient id="phoneGlow" cx="80%" cy="50%" r="45%">
      <stop offset="0%" stop-color="#3b82f6" stop-opacity="0.22" />
      <stop offset="50%" stop-color="#10b981" stop-opacity="0.08" />
      <stop offset="100%" stop-color="#3b82f6" stop-opacity="0" />
    </radialGradient>

    <!-- Grid pattern -->
    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#27272a" stroke-width="0.75" stroke-opacity="0.3" />
    </pattern>

    <filter id="iconShadow" x="-30%" y="-30%" width="160%" height="160%">
      <feDropShadow dx="0" dy="8" stdDeviation="12" flood-color="#000000" flood-opacity="0.5" />
    </filter>
  </defs>

  <style>
    .font-sans {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    }
    .bold { font-weight: 700; }
    .bolder { font-weight: 800; }
    .medium { font-weight: 500; }
    .semibold { font-weight: 600; }
  </style>

  <!-- Background -->
  <rect width="1200" height="630" fill="url(#bgGrad)" />
  <rect width="1200" height="630" fill="url(#emeraldGlow)" />
  <rect width="1200" height="630" fill="url(#phoneGlow)" />
  <rect width="1200" height="630" fill="url(#grid)" />

  <rect x="1" y="1" width="1198" height="628" rx="0" fill="none" stroke="#27272a" stroke-width="1.5" stroke-opacity="0.5" />

  <!-- ================= LEFT COLUMN ================= -->
  <g transform="translate(72, 60)" class="font-sans">
    
    <!-- Brand / Logo row -->
    <g transform="translate(0, 0)">
      <g filter="url(#iconShadow)">
        <rect x="0" y="0" width="76" height="76" rx="18" fill="#18181b" stroke="#3f3f46" stroke-width="1.5" />
        <clipPath id="logoClip_${lang}">
          <rect x="2" y="2" width="72" height="72" rx="16" />
        </clipPath>
        <image href="${logoBase64}" x="2" y="2" width="72" height="72" clip-path="url(#logoClip_${lang})" />
      </g>

      <text x="96" y="38" font-size="34" class="bolder" fill="#ffffff" letter-spacing="-0.03em">SliceBill</text>
      <text x="96" y="62" font-size="14" class="semibold" fill="#10b981" letter-spacing="0.05em">slicebill.app</text>
    </g>

    <!-- Pill: Value Proposition -->
    <g transform="translate(0, 106)">
      <rect x="0" y="0" width="${isPl ? 360 : 340}" height="32" rx="16" fill="#10b981" fill-opacity="0.12" stroke="#10b981" stroke-opacity="0.35" stroke-width="1" />
      <circle cx="16" cy="16" r="4.5" fill="#10b981" />
      <text x="28" y="21" font-size="13" class="semibold" fill="#34d399">${badgeText}</text>
    </g>

    <!-- Main Headline -->
    <g transform="translate(0, 165)">
      <text x="0" y="44" font-size="52" class="bolder" fill="#ffffff" letter-spacing="-0.03em">${headingLine1}</text>
      <text x="0" y="104" font-size="52" class="bolder" fill="#94a3b8" letter-spacing="-0.03em">${headingLine2}</text>
    </g>

    <!-- Subtitle description -->
    <g transform="translate(0, 300)">
      <text x="0" y="0" font-size="18" class="medium" fill="#cbd5e1">${descLine1}</text>
      <text x="0" y="28" font-size="15" class="medium" fill="#64748b">${descLine2}</text>
    </g>

    <!-- Feature tags with vector icons -->
    <g transform="translate(0, 360)">
      <!-- Tag 1: Offline -->
      <g transform="translate(0, 0)">
        <rect width="${isPl ? 132 : 132}" height="32" rx="8" fill="#1e293b" fill-opacity="0.6" stroke="#334155" stroke-width="1" />
        <polygon points="12,18 19,10 18,17 24,17 15,25 17,18" fill="#facc15" />
        <text x="28" y="21" font-size="13" class="medium" fill="#e2e8f0">${pillOffline}</text>
      </g>
      <!-- Tag 2: AI Scanner -->
      <g transform="translate(${isPl ? 142 : 142}, 0)">
        <rect width="${isPl ? 122 : 138}" height="32" rx="8" fill="#1e293b" fill-opacity="0.6" stroke="#334155" stroke-width="1" />
        <!-- Camera / AI scan icon -->
        <rect x="11" y="14" width="13" height="10" rx="2" fill="none" stroke="#38bdf8" stroke-width="1.3" />
        <circle cx="17.5" cy="19" r="2.8" fill="none" stroke="#38bdf8" stroke-width="1.3" />
        <circle cx="21" cy="16" r="0.8" fill="#38bdf8" />
        <path d="M 14 14 L 15 12 L 18 12 L 19 14" fill="#38bdf8" />
        <text x="29" y="21" font-size="13" class="medium" fill="#e2e8f0">${pillAi}</text>
      </g>
      <!-- Tag 3: Multi-currency -->
      <g transform="translate(${isPl ? 274 : 290}, 0)">
        <rect width="${isPl ? 126 : 140}" height="32" rx="8" fill="#1e293b" fill-opacity="0.6" stroke="#334155" stroke-width="1" />
        <circle cx="17" cy="16" r="6" fill="none" stroke="#a78bfa" stroke-width="1.5" />
        <text x="17" y="19.5" font-size="10" class="bold" fill="#a78bfa" text-anchor="middle">$</text>
        <text x="28" y="21" font-size="13" class="medium" fill="#e2e8f0">${pillCurrencies}</text>
      </g>
    </g>

    <!-- Availability bar -->
    <g transform="translate(0, 442)">
      <text x="0" y="14" font-size="12" class="medium" fill="#64748b" letter-spacing="0.06em">${badgeAvailable}</text>
      
      <!-- Store Badges -->
      <g transform="translate(0, 26)">
        <!-- Apple -->
        <g transform="translate(0, 0)">
          <rect width="115" height="34" rx="8" fill="#0f172a" stroke="#334155" stroke-width="1" />
          <path d="M 18 17 C 18 14 20 12 22 12 C 23.5 12 24.5 13 25.5 13 C 26.5 13 27.5 12 29 12 C 31 12 33 14 32 18 C 31.5 20.5 30 23 28.5 23 C 27.5 23 27 22 25.5 22 C 24 22 23.5 23 22.5 23 C 20.5 23 18 19.5 18 17 Z" fill="#e2e8f0" transform="scale(0.65) translate(-1, 3)"/>
          <text x="32" y="22" font-size="12" class="semibold" fill="#f8fafc">App Store</text>
        </g>
        
        <!-- Google Play -->
        <g transform="translate(125, 0)">
          <rect width="128" height="34" rx="8" fill="#0f172a" stroke="#334155" stroke-width="1" />
          <polygon points="16,11 25,17 16,23" fill="#38bdf8" />
          <text x="32" y="22" font-size="12" class="semibold" fill="#f8fafc">Google Play</text>
        </g>

        <!-- Web -->
        <g transform="translate(263, 0)">
          <rect width="105" height="34" rx="8" fill="#0f172a" stroke="#334155" stroke-width="1" />
          <circle cx="20" cy="17" r="6" fill="none" stroke="#94a3b8" stroke-width="1.2" />
          <line x1="14" y1="17" x2="26" y2="17" stroke="#94a3b8" stroke-width="1.2" />
          <text x="34" y="22" font-size="12" class="semibold" fill="#f8fafc">Web App</text>
        </g>
      </g>
    </g>

  </g>
</svg>
`;

  // 3. Process the Real Store Phone Mockup
  const { left, top, width, height, radius } = cropOptions;

  // Extract raw phone rectangle and normalize to PNG buffer
  const extractedBuf = await sharp(storeMockupPath)
    .extract({ left, top, width, height })
    .ensureAlpha()
    .png()
    .toBuffer();

  // Create SVG mask for the phone's rounded corners
  const maskSvg = Buffer.from(`
    <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
      <rect width="${width}" height="${height}" rx="${radius}" ry="${radius}" fill="#ffffff" />
    </svg>
  `);

  const maskPng = await sharp(maskSvg).ensureAlpha().png().toBuffer();

  const phoneTargetH = 560;
  const phoneTargetW = Math.round(width * (phoneTargetH / height));

  // Apply corner mask first, then resize in a separate step
  const maskedBuf = await sharp(extractedBuf)
    .composite([{ input: maskPng, blend: 'dest-in' }])
    .png()
    .toBuffer();

  const phoneResized = await sharp(maskedBuf)
    .resize(phoneTargetW, phoneTargetH)
    .png()
    .toBuffer();

  // Shadow under phone (keep size safely within 1200x630 canvas)
  const shadowSvg = Buffer.from(`
    <svg width="${phoneTargetW + 40}" height="${phoneTargetH + 30}">
      <defs>
        <filter id="pShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="10" stdDeviation="14" flood-color="#000000" flood-opacity="0.8" />
        </filter>
      </defs>
      <rect x="20" y="10" width="${phoneTargetW}" height="${phoneTargetH}" rx="38" ry="38" fill="#000000" filter="url(#pShadow)" />
    </svg>
  `);

  const shadowPng = await sharp(shadowSvg).png().toBuffer();

  const phoneLeft = 785;
  const phoneTop = 35;

  // 4. Combine base SVG + shadow + phone mockup into final Truecolor PNG
  await sharp(Buffer.from(baseSvg))
    .composite([
      { input: shadowPng, left: phoneLeft - 20, top: phoneTop - 10 },
      { input: phoneResized, left: phoneLeft, top: phoneTop }
    ])
    .png({ quality: 95, palette: false, compressionLevel: 9 })
    .toFile(outputPath);

  console.log(`Successfully generated ${outputPath}`);
}

async function run() {
  const publicDir = path.resolve('public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  // Ensure assets directory exists with mockups
  const plMockup = path.resolve('assets/store-mockups/pl-iphone-ready-1.png');
  const enMockup = path.resolve('assets/store-mockups/en-iphone-ready-1.png');

  // Polish mockup phone coordinates: left=122, top=490, width=1040, height=2152, radius=151
  const plCrop = {
    left: 122,
    top: 490,
    width: 1040,
    height: 2152,
    radius: 151
  };

  // English mockup phone coordinates: left=106, top=364, width=966, height=2050, radius=140
  const enCrop = {
    left: 106,
    top: 364,
    width: 966,
    height: 2050,
    radius: 140
  };

  // 1. Generate default og-image.png (Polish / primary)
  await createOgImage({
    lang: 'pl',
    storeMockupPath: plMockup,
    cropOptions: plCrop,
    outputPath: path.join(publicDir, 'og-image.png')
  });

  // 2. Generate og-image-pl.png
  await createOgImage({
    lang: 'pl',
    storeMockupPath: plMockup,
    cropOptions: plCrop,
    outputPath: path.join(publicDir, 'og-image-pl.png')
  });

  // 3. Generate og-image-en.png
  await createOgImage({
    lang: 'en',
    storeMockupPath: enMockup,
    cropOptions: enCrop,
    outputPath: path.join(publicDir, 'og-image-en.png')
  });
}

run().catch(err => {
  console.error('Error generating OG images:', err);
  process.exit(1);
});

import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE_DIR = __dirname;
const CONFIG_PATH = path.join(BASE_DIR, 'store-views-config.json');
const IPHONE_DIR = path.join(BASE_DIR, 'raw-iphone-screens');
const IPAD_DIR = path.join(BASE_DIR, 'raw-ipad-screens');
const EXPORT_DIR = path.join(BASE_DIR, 'export');

// Wczytanie konfiguracji
let config = {
  resolutions: {
    appleIphoneMedium: [{ width: 1179, height: 2556, enabled: true, tag: '1179x2556' }],
    appleIphoneLarge: [{ width: 1290, height: 2796, enabled: true, tag: '1290x2796' }],
    appleIpad: [{ width: 2064, height: 2752, enabled: true, tag: '2064x2752' }],
    googleMobile: [{ width: 1080, height: 2400, enabled: true, tag: '1080x2400' }]
  },
  styling: {
    backgroundColor: '#0a0a0c',
    textColor: '#ffffff'
  },
  iphoneScreens: [],
  ipadScreens: []
};

if (fs.existsSync(CONFIG_PATH)) {
  try {
    const raw = fs.readFileSync(CONFIG_PATH, 'utf8');
    config = { ...config, ...JSON.parse(raw) };
  } catch (err) {
    console.warn('Nie udało się wczytać store-views-config.json, używam domyślnych.');
  }
}

// Upewnij się, że katalogi docelowe istnieją
const targetFolders = [
  'apple-iphone-medium',
  'apple-iphone-large',
  'apple-iphone',
  'apple-ipad',
  'google-mobile'
];

targetFolders.forEach(folder => {
  fs.mkdirSync(path.join(EXPORT_DIR, folder), { recursive: true });
});

// Pomocnik do podziału tekstu na linie
function splitTextIntoLines(text, maxChars = 24) {
  if (text.includes('\n')) return text.split('\n');
  const words = text.split(' ');
  const lines = [];
  let cur = '';
  for (const w of words) {
    if ((cur + ' ' + w).trim().length > maxChars && cur) {
      lines.push(cur.trim());
      cur = w;
    } else {
      cur = (cur + ' ' + w).trim();
    }
  }
  if (cur) lines.push(cur.trim());
  return lines;
}

// GENERATOR SVG DLA IPHONE
function generateIphoneSvg(options) {
  const { width, height, title, subtitle, deviceX, deviceY, deviceW, deviceH, screenX, screenY, screenW, screenH, outerR, bezelRim, blackBezel } = options;
  const lines = splitTextIntoLines(title, Math.round(width / 52));
  const fontSize = Math.round(width * 0.056);
  const lineHeight = fontSize * 1.25;
  const titleStartY = Math.round(height * 0.055);

  const textSvg = lines.map((line, idx) => {
    return `<text x="${width / 2}" y="${titleStartY + (idx * lineHeight)}" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="${fontSize}px" font-weight="bold" fill="#ffffff" text-anchor="middle" dominant-baseline="hanging">${line}</text>`;
  }).join('\n');

  // Dynamic Island
  const diW = Math.round(screenW * 0.28);
  const diH = Math.round(diW * 0.29);
  const diX = Math.round(screenX + (screenW - diW) / 2);
  const diY = Math.round(screenY + screenW * 0.032);
  const diR = diH / 2;
  const camR = Math.round(diH * 0.24);
  const camX = diX + diW - Math.round(diH * 0.65);
  const camY = diY + diH / 2;

  // Przyciski boczne
  const btnW = Math.max(3, Math.round(deviceW * 0.008));
  const powerY = deviceY + Math.round(deviceH * 0.22);
  const powerH = Math.round(deviceH * 0.12);

  const actionY = deviceY + Math.round(deviceH * 0.18);
  const actionH = Math.round(deviceH * 0.045);

  const vol1Y = deviceY + Math.round(deviceH * 0.25);
  const vol2Y = deviceY + Math.round(deviceH * 0.34);
  const volH = Math.round(deviceH * 0.075);

  return `
  <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
        <feDropShadow dx="0" dy="${Math.round(deviceW * 0.04)}" stdDeviation="${Math.round(deviceW * 0.045)}" flood-color="#000000" flood-opacity="0.75" />
      </filter>
      <linearGradient id="titanium" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#d1d5db" />
        <stop offset="30%" stop-color="#9ca3af" />
        <stop offset="70%" stop-color="#6b7280" />
        <stop offset="100%" stop-color="#e5e7eb" />
      </linearGradient>
    </defs>

    <!-- Nagłówek -->
    ${textSvg}

    <!-- Cień i ramka urządzenia -->
    <rect x="${deviceX}" y="${deviceY}" width="${deviceW}" height="${deviceH}" rx="${outerR}" ry="${outerR}" fill="#000000" filter="url(#shadow)" />

    <!-- Przyciski -->
    <rect x="${deviceX + deviceW - 1}" y="${powerY}" width="${btnW}" height="${powerH}" rx="2" fill="#8e8e93" />
    <rect x="${deviceX - btnW + 1}" y="${actionY}" width="${btnW}" height="${actionH}" rx="2" fill="#8e8e93" />
    <rect x="${deviceX - btnW + 1}" y="${vol1Y}" width="${btnW}" height="${volH}" rx="2" fill="#8e8e93" />
    <rect x="${deviceX - btnW + 1}" y="${vol2Y}" width="${btnW}" height="${volH}" rx="2" fill="#8e8e93" />

    <!-- Tytanowy brzeg -->
    <rect x="${deviceX}" y="${deviceY}" width="${deviceW}" height="${deviceH}" rx="${outerR}" ry="${outerR}" fill="url(#titanium)" />
    <!-- Wewnętrzny czarny bezel -->
    <rect x="${deviceX + bezelRim}" y="${deviceY + bezelRim}" width="${deviceW - bezelRim * 2}" height="${deviceH - bezelRim * 2}" rx="${outerR - bezelRim}" ry="${outerR - bezelRim}" fill="#050505" />

    <!-- Dynamic Island (rysowana na wierzchu screena) -->
    <rect x="${diX}" y="${diY}" width="${diW}" height="${diH}" rx="${diR}" ry="${diR}" fill="#000000" />
    <circle cx="${camX}" cy="${camY}" r="${camR}" fill="#090d16" />
    <circle cx="${camX - 1}" cy="${camY - 1}" r="${camR * 0.4}" fill="rgba(56, 189, 248, 0.45)" />
  </svg>
  `;
}

// GENERATOR SVG DLA IPAD
function generateIpadSvg(options) {
  const { width, height, title, subtitle, deviceX, deviceY, deviceW, deviceH, screenX, screenY, screenW, screenH, outerR, bezelRim, blackBezel } = options;
  const lines = splitTextIntoLines(title, Math.round(width / 48));
  const fontSize = Math.round(width * 0.052);
  const lineHeight = fontSize * 1.25;
  const titleStartY = Math.round(height * 0.055);

  const textSvg = lines.map((line, idx) => {
    return `<text x="${width / 2}" y="${titleStartY + (idx * lineHeight)}" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="${fontSize}px" font-weight="bold" fill="#ffffff" text-anchor="middle" dominant-baseline="hanging">${line}</text>`;
  }).join('\n');

  const camY = deviceY + Math.round((bezelRim + blackBezel) / 2);
  const camX = deviceX + deviceW / 2;

  return `
  <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
        <feDropShadow dx="0" dy="${Math.round(deviceW * 0.03)}" stdDeviation="${Math.round(deviceW * 0.035)}" flood-color="#000000" flood-opacity="0.75" />
      </filter>
    </defs>

    <!-- Nagłówek -->
    ${textSvg}

    <!-- Cień i ramka aluminiowa iPada -->
    <rect x="${deviceX}" y="${deviceY}" width="${deviceW}" height="${deviceH}" rx="${outerR}" ry="${outerR}" fill="#000000" filter="url(#shadow)" />
    <rect x="${deviceX}" y="${deviceY}" width="${deviceW}" height="${deviceH}" rx="${outerR}" ry="${outerR}" fill="#27272a" />
    <rect x="${deviceX + bezelRim}" y="${deviceY + bezelRim}" width="${deviceW - bezelRim * 2}" height="${deviceH - bezelRim * 2}" rx="${outerR - bezelRim}" ry="${outerR - bezelRim}" fill="#08080a" />

    <!-- Przednia kamerka -->
    <circle cx="${camX}" cy="${camY}" r="${Math.round(deviceW * 0.005)}" fill="#000000" />
    <circle cx="${camX}" cy="${camY}" r="${Math.round(deviceW * 0.002)}" fill="rgba(56, 189, 248, 0.4)" />
  </svg>
  `;
}

// RENDEROWANIE POJEDYNCZEGO MOCKUPU
async function renderMockup(inputImagePath, title, width, height, isIpad = false) {
  // 1. Obliczenia wymiarów urządzenia
  let deviceW, deviceH, deviceX, deviceY, outerR, bezelRim, blackBezel;

  const titleBlockH = Math.round(height * 0.16);

  if (isIpad) {
    deviceW = Math.round(width * 0.82);
    deviceH = Math.round(deviceW * (4 / 3));
    if (deviceH > height - titleBlockH - 40) {
      deviceH = height - titleBlockH - 60;
      deviceW = Math.round(deviceH * (3 / 4));
    }
    deviceX = Math.round((width - deviceW) / 2);
    deviceY = Math.round(titleBlockH + (height - titleBlockH - deviceH) * 0.45);
    outerR = Math.round(deviceW * 0.045);
    bezelRim = Math.max(3, Math.round(deviceW * 0.008));
    blackBezel = Math.max(10, Math.round(deviceW * 0.022));
  } else {
    const isWide = (width / height) > 0.65;
    deviceW = isWide ? Math.round(width * 0.48) : Math.round(width * 0.81);
    deviceH = Math.round(deviceW * 2.15);
    deviceX = Math.round((width - deviceW) / 2);
    deviceY = Math.round(titleBlockH + (height - titleBlockH - deviceH) * 0.5);
    outerR = Math.round(deviceW * 0.145);
    bezelRim = Math.max(3, Math.round(deviceW * 0.014));
    blackBezel = Math.max(8, Math.round(deviceW * 0.024));
  }

  const screenX = deviceX + bezelRim + blackBezel;
  const screenY = deviceY + bezelRim + blackBezel;
  const screenW = deviceW - ((bezelRim + blackBezel) * 2);
  const screenH = deviceH - ((bezelRim + blackBezel) * 2);
  const screenR = isIpad ? Math.max(8, outerR - bezelRim - blackBezel) : Math.max(16, outerR - bezelRim - blackBezel);

  // 2. Maska zaokrąglenia dla screenu
  const maskSvg = Buffer.from(`
    <svg width="${screenW}" height="${screenH}">
      <rect x="0" y="0" width="${screenW}" height="${screenH}" rx="${screenR}" ry="${screenR}" fill="#ffffff" />
    </svg>
  `);

  const processedScreen = await sharp(inputImagePath)
    .resize(screenW, screenH, { fit: 'cover' })
    .composite([{ input: maskSvg, blend: 'dest-in' }])
    .png()
    .toBuffer();

  // 3. Generowanie SVG nakładki
  const svgContent = isIpad
    ? generateIpadSvg({ width, height, title, deviceX, deviceY, deviceW, deviceH, screenX, screenY, screenW, screenH, outerR, bezelRim, blackBezel })
    : generateIphoneSvg({ width, height, title, deviceX, deviceY, deviceW, deviceH, screenX, screenY, screenW, screenH, outerR, bezelRim, blackBezel });

  const svgBuffer = Buffer.from(svgContent);

  // 4. Połączenie całości w sharp
  const result = await sharp({
    create: {
      width,
      height,
      channels: 4,
      background: { r: 10, g: 10, b: 12, alpha: 1 }
    }
  })
  .composite([
    // Wpierw ramka bazowa i tekst z SVG
    { input: svgBuffer, top: 0, left: 0 },
    // Na to wklejamy zaokrąglony screen w odpowiedniej pozycji
    { input: processedScreen, top: screenY, left: screenX },
    // Ponownie SVG z Dynamic Island (aby Dynamic Island leżała na screenie)
    { input: svgBuffer, top: 0, left: 0 }
  ])
  .png()
  .toBuffer();

  return result;
}

// GŁÓWNY PROCES GENEROWANIA
async function run() {
  console.log('🚀 Start generowania mockupów SliceBill...');

  // 1. Pobierz pliki iPhone
  const iphoneFiles = fs.existsSync(IPHONE_DIR)
    ? fs.readdirSync(IPHONE_DIR).filter(f => /\.(png|jpe?g)$/i.test(f))
    : [];

  // 2. Pobierz pliki iPad
  const ipadFiles = fs.existsSync(IPAD_DIR)
    ? fs.readdirSync(IPAD_DIR).filter(f => /\.(png|jpe?g)$/i.test(f))
    : [];

  console.log(`📱 Znaleziono ${iphoneFiles.length} screenów iPhone w raw-iphone-screens/`);
  console.log(`💻 Znaleziono ${ipadFiles.length} screenów iPad w raw-ipad-screens/`);

  // Mapowanie tytułów z configu
  const getTitle = (filename, isIpad) => {
    const list = isIpad ? (config.ipadScreens || []) : (config.iphoneScreens || []);
    const match = list.find(s => s.filename.toLowerCase() === filename.toLowerCase());
    return match ? match.title : '📸 Skanuj paragony za pomocą AI';
  };

  // PRZETWARZANIE IPHONE -> APPLE IPHONE MEDIUM (1179x2556), LARGE (1290x2796) & GOOGLE MOBILE
  for (const file of iphoneFiles) {
    const fullPath = path.join(IPHONE_DIR, file);
    const title = getTitle(file, false);
    const baseName = path.parse(file).name;

    // A1) Apple iPhone Dynamic Island (medium display - 1179x2556) - Wymagane w App Store Connect!
    console.log(`⏳ Renderowanie Apple iPhone Medium (Dynamic Island 6.1"): ${file} (1179x2556)...`);
    const appleMediumBuf = await renderMockup(fullPath, title, 1179, 2556, false);
    const appleMedOut = path.join(EXPORT_DIR, 'apple-iphone-medium', `${baseName}-iphone-medium-1179x2556.png`);
    const appleMedRoot = path.join(EXPORT_DIR, 'apple-iphone', `${baseName}-iphone-medium-1179x2556.png`);
    fs.writeFileSync(appleMedOut, appleMediumBuf);
    fs.writeFileSync(appleMedRoot, appleMediumBuf);

    // A2) Apple iPhone Dynamic Island (large display - 1290x2796)
    console.log(`⏳ Renderowanie Apple iPhone Large (6.7"/6.9"): ${file} (1290x2796)...`);
    const appleLargeBuf = await renderMockup(fullPath, title, 1290, 2796, false);
    const appleLrgOut = path.join(EXPORT_DIR, 'apple-iphone-large', `${baseName}-iphone-large-1290x2796.png`);
    const appleLrgRoot = path.join(EXPORT_DIR, 'apple-iphone', `${baseName}-iphone-large-1290x2796.png`);
    fs.writeFileSync(appleLrgOut, appleLargeBuf);
    fs.writeFileSync(appleLrgRoot, appleLargeBuf);

    // B) Google Mobile (1080x2400)
    console.log(`⏳ Renderowanie Google Mobile: ${file} (1080x2400)...`);
    const googleBuf = await renderMockup(fullPath, title, 1080, 2400, false);
    const googleOut = path.join(EXPORT_DIR, 'google-mobile', `${baseName}-google-1080x2400.png`);
    fs.writeFileSync(googleOut, googleBuf);
  }

  // PRZETWARZANIE IPAD -> APPLE IPAD (2064x2752)
  for (const file of ipadFiles) {
    const fullPath = path.join(IPAD_DIR, file);
    const title = getTitle(file, true);
    const baseName = path.parse(file).name;

    // Apple iPad (2064x2752)
    console.log(`⏳ Renderowanie Apple iPad Pro 13": ${file} (2064x2752)...`);
    const ipadBuf = await renderMockup(fullPath, title, 2064, 2752, true);
    const ipadOut = path.join(EXPORT_DIR, 'apple-ipad', `${baseName}-ipad-2064x2752.png`);
    fs.writeFileSync(ipadOut, ipadBuf);
  }

  console.log('✅ Wszystkie mockupy zostały pomyślnie wygenerowane w prepare-store-views/export/ !');
}

run().catch(err => {
  console.error('❌ Błąd podczas generowania mockupów:', err);
  process.exit(1);
});

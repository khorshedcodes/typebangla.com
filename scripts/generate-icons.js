const sharp = require('sharp');
const fs = require('fs');
const path = require('path');
const pngToIco = require('png-to-ico');

async function main() {
  const rootDir = path.resolve(__dirname, '..');
  const iconSvgPath = path.join(rootDir, 'public', 'icon.svg');
  const logoHorizontalDarkSvgPath = path.join(rootDir, 'public', 'images', 'logo', 'logo-horizontal-dark.svg');
  const logoHorizontalLightSvgPath = path.join(rootDir, 'public', 'images', 'logo', 'logo-horizontal-light.svg');
  const ogBannerSvgPath = path.join(rootDir, 'public', 'images', 'logo', 'og-banner.svg');

  console.log('Generating PNG and ICO assets from updated SVG sources...');

  // 1. App Icon 512x512 PNG
  await sharp(iconSvgPath)
    .resize(512, 512)
    .png()
    .toFile(path.join(rootDir, 'public', 'icon.png'));
  console.log('✔ Generated public/icon.png (512x512)');

  await sharp(iconSvgPath)
    .resize(512, 512)
    .png()
    .toFile(path.join(rootDir, 'public', 'images', 'logo', 'icon.png'));
  console.log('✔ Generated public/images/logo/icon.png (512x512)');

  // 2. Apple Touch Icon 180x180 PNG
  await sharp(iconSvgPath)
    .resize(180, 180)
    .png()
    .toFile(path.join(rootDir, 'public', 'apple-icon.png'));
  console.log('✔ Generated public/apple-icon.png (180x180)');

  // 3. Light Theme Badge PNG 512x512
  await sharp(iconSvgPath)
    .resize(512, 512)
    .png()
    .toFile(path.join(rootDir, 'public', 'images', 'logo', 'whitebg_1.png'));
  console.log('✔ Generated public/images/logo/whitebg_1.png (512x512)');

  // 4. OpenGraph Social Share PNG 1200x630
  await sharp(ogBannerSvgPath)
    .resize(1200, 630)
    .png()
    .toFile(path.join(rootDir, 'public', 'images', 'logo', 'blackbg.png'));
  console.log('✔ Generated public/images/logo/blackbg.png (1200x630)');

  // 5. Certificate Horizontal Logo PNG
  await sharp(logoHorizontalDarkSvgPath)
    .resize(940, 240)
    .png()
    .toFile(path.join(rootDir, 'public', 'images', 'logo', 'logohorizontal.png'));
  console.log('✔ Generated public/images/logo/logohorizontal.png (940x240 High-DPI)');

  // 6. Favicon 16x16, 32x32, 48x48 ICO
  const png32Buffer = await sharp(iconSvgPath).resize(32, 32).png().toBuffer();
  const png16Buffer = await sharp(iconSvgPath).resize(16, 16).png().toBuffer();
  
  const convertIco = typeof pngToIco === 'function' ? pngToIco : (pngToIco.default || pngToIco);
  const icoBuffer = await convertIco([png16Buffer, png32Buffer]);
  fs.writeFileSync(path.join(rootDir, 'public', 'favicon.ico'), icoBuffer);
  console.log('✔ Generated public/favicon.ico (Multi-size ICO)');

  console.log('All image assets successfully updated!');
}

main().catch((err) => {
  console.error('Error generating icons:', err);
  process.exit(1);
});

// Erzeugt App-Icon und Splash-Screen aus assets/icon.svg und legt sie ins iOS-Projekt.
// Läuft nach `npx cap add ios` (im GitHub-Actions-Build).
import sharp from 'sharp';
import { existsSync } from 'node:fs';
import { join } from 'node:path';

const BG = '#0f1015';
const svg = 'assets/icon.svg';
const xcassets = 'ios/App/App/Assets.xcassets';

if (!existsSync(xcassets)) {
  console.error('iOS-Projekt fehlt – zuerst `npx cap add ios` ausführen.');
  process.exit(1);
}

// App-Icon: 1024×1024, ohne Transparenz (Apple-Vorgabe)
await sharp(svg, { density: 300 })
  .resize(1024, 1024)
  .flatten({ background: BG })
  .png()
  .toFile(join(xcassets, 'AppIcon.appiconset', 'AppIcon-512@2x.png'));

// Splash: dunkler Hintergrund mit kleinem Logo in der Mitte
const logo = await sharp(svg, { density: 300 }).resize(600, 600).png().toBuffer();
const splash = await sharp({ create: { width: 2732, height: 2732, channels: 3, background: BG } })
  .composite([{ input: logo, gravity: 'center' }])
  .png()
  .toBuffer();

for (const name of ['splash-2732x2732.png', 'splash-2732x2732-1.png', 'splash-2732x2732-2.png']) {
  const target = join(xcassets, 'Splash.imageset', name);
  if (existsSync(target)) await sharp(splash).toFile(target);
}

console.log('Icon & Splash erzeugt.');

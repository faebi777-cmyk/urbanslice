import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const files = [
  'apa-minerala.png',
  'apa-plata.png',
  'cappuccino.png',
  'espresso.png',
  'ceai.png',
  'latte.png',
  'limonada-arome.png',
  'limonada.png',
  'lipton.png',
  'mirinda.png',
  'pepsi.png',
];

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dir = path.join(__dirname, 'client/public');

async function addBlackBg(filename) {
  const input = path.join(dir, filename);
  await sharp(input)
    .flatten({ background: { r: 0, g: 0, b: 0 } })
    .png()
    .toFile(path.join(dir, filename + '.tmp.png'));

  fs.renameSync(path.join(dir, filename + '.tmp.png'), input);
  console.log('Done:', filename);
}

(async () => {
  for (const f of files) await addBlackBg(f);
  console.log('All done.');
})();

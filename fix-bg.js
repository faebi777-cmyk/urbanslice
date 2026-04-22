import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const files = [
  'cappuccino.png',
  'espresso.png',
  'ceai.png',
  'limonada.png',
  'lipton.png',
];

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dir = path.join(__dirname, 'client/public');

async function addBlackBg(filename) {
  const input = path.join(dir, filename);
  const meta = await sharp(input).metadata();
  const { width, height } = meta;

  const blackBg = await sharp({
    create: { width, height, channels: 3, background: { r: 0, g: 0, b: 0 } },
  })
    .png()
    .toBuffer();

  await sharp(blackBg)
    .composite([{ input, blend: 'over' }])
    .png()
    .toFile(path.join(dir, filename + '.tmp.png'));

  fs.renameSync(path.join(dir, filename + '.tmp.png'), input);
  console.log('Done:', filename);
}

(async () => {
  for (const f of files) await addBlackBg(f);
  console.log('All done.');
})();

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
const edgeMattedFiles = new Set([
  'cappuccino.png',
  'espresso.png',
  'ceai.png',
  'limonada.png',
  'lipton.png',
]);

function isLightNeutral(r, g, b) {
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  return max >= 215 && max - min <= 40;
}

async function replaceEdgeMatteWithBlack(filename) {
  const input = path.join(dir, filename);
  const { data, info } = await sharp(input)
    .removeAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const visited = new Uint8Array(info.width * info.height);
  const queue = [];

  const enqueue = (x, y) => {
    if (x < 0 || y < 0 || x >= info.width || y >= info.height) return;
    const idx = y * info.width + x;
    if (visited[idx]) return;
    const offset = idx * info.channels;
    const [r, g, b] = [data[offset], data[offset + 1], data[offset + 2]];
    if (!isLightNeutral(r, g, b)) return;
    visited[idx] = 1;
    queue.push(idx);
  };

  for (let x = 0; x < info.width; x++) {
    enqueue(x, 0);
    enqueue(x, info.height - 1);
  }

  for (let y = 0; y < info.height; y++) {
    enqueue(0, y);
    enqueue(info.width - 1, y);
  }

  for (let pointer = 0; pointer < queue.length; pointer++) {
    const idx = queue[pointer];
    const x = idx % info.width;
    const y = Math.floor(idx / info.width);
    enqueue(x - 1, y);
    enqueue(x + 1, y);
    enqueue(x, y - 1);
    enqueue(x, y + 1);
  }

  for (let idx = 0; idx < visited.length; idx++) {
    if (!visited[idx]) continue;
    const offset = idx * info.channels;
    data[offset] = 0;
    data[offset + 1] = 0;
    data[offset + 2] = 0;
  }

  await sharp(data, {
    raw: {
      width: info.width,
      height: info.height,
      channels: info.channels,
    },
  })
    .png()
    .toFile(path.join(dir, filename + '.tmp.png'));

  fs.renameSync(path.join(dir, filename + '.tmp.png'), input);
}

async function addBlackBg(filename) {
  const input = path.join(dir, filename);
  const pipeline = sharp(input)
    .flatten({ background: { r: 0, g: 0, b: 0 } })
    .png();

  await pipeline.toFile(path.join(dir, filename + '.tmp.png'));

  fs.renameSync(path.join(dir, filename + '.tmp.png'), input);

  if (edgeMattedFiles.has(filename)) {
    await replaceEdgeMatteWithBlack(filename);
  }

  console.log('Done:', filename);
}

(async () => {
  for (const f of files) await addBlackBg(f);
  console.log('All done.');
})();

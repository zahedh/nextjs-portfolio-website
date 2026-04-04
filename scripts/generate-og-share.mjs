/**
 * One-off / maintenance: build a smaller JPEG for og:image (WhatsApp-friendly file size).
 * Run: node scripts/generate-og-share.mjs
 */
import sharp from 'sharp';
import { stat } from 'fs/promises';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const input = join(root, 'public/images/twitter-card.png');
const output = join(root, 'public/images/twitter-card-og.jpg');

const pipeline = sharp(input)
  .resize(1200, 630, {
    fit: 'inside',
    withoutEnlargement: true,
  })
  .jpeg({ quality: 85, mozjpeg: true });

await pipeline.toFile(output);

const meta = await sharp(output).metadata();
const { size } = await stat(output);
console.log(
  `Wrote ${output} (${meta.width}x${meta.height}, ${Math.round(size / 1024)} KB)`
);

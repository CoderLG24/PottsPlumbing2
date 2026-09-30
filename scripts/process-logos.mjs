import { mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import sharp from 'sharp';

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const logos = [
  {
    input: 'images/image0.png',
    output: 'public/images/potts-mark.png',
    palette: [[18, 51, 93], [82, 160, 221]],
  },
  {
    input: 'images/image1.jpeg',
    output: 'public/images/potts-wordmark.png',
    palette: [[4, 44, 96], [104, 188, 248]],
  },
];

function visibleInk(red, green, blue) {
  const highest = Math.max(red, green, blue);
  const lowest = Math.min(red, green, blue);
  return highest - lowest > 20 && highest < 250;
}

function estimateMatte(red, green, blue, palette) {
  const pixel = [red, green, blue];
  let best = { alpha: 0, color: palette[0], error: Number.POSITIVE_INFINITY };

  for (const color of palette) {
    const inverse = color.map((channel) => 255 - channel);
    const observed = pixel.map((channel) => 255 - channel);
    const denominator = inverse.reduce((sum, channel) => sum + channel ** 2, 0);
    const alpha = Math.max(0, Math.min(1, observed.reduce((sum, channel, index) => sum + channel * inverse[index], 0) / denominator));
    const error = pixel.reduce((sum, channel, index) => {
      const predicted = 255 - alpha * inverse[index];
      return sum + (channel - predicted) ** 2;
    }, 0);

    if (error < best.error) best = { alpha, color, error };
  }

  return best;
}

async function createTransparentLogo({ input, output, palette }) {
  const inputPath = path.join(projectRoot, input);
  const outputPath = path.join(projectRoot, output);
  const { data, info } = await sharp(inputPath).removeAlpha().raw().toBuffer({ resolveWithObject: true });
  const bounds = { left: info.width, top: info.height, right: 0, bottom: 0 };

  for (let y = 0; y < info.height; y += 1) {
    for (let x = 0; x < info.width; x += 1) {
      const offset = (y * info.width + x) * info.channels;
      if (!visibleInk(data[offset], data[offset + 1], data[offset + 2])) continue;
      bounds.left = Math.min(bounds.left, x);
      bounds.top = Math.min(bounds.top, y);
      bounds.right = Math.max(bounds.right, x);
      bounds.bottom = Math.max(bounds.bottom, y);
    }
  }

  if (bounds.right <= bounds.left || bounds.bottom <= bounds.top) {
    throw new Error(`Could not find logo artwork in ${input}`);
  }

  const contentWidth = bounds.right - bounds.left + 1;
  const contentHeight = bounds.bottom - bounds.top + 1;
  const padding = Math.round(Math.max(contentWidth, contentHeight) * 0.025);
  const left = Math.max(0, bounds.left - padding);
  const top = Math.max(0, bounds.top - padding);
  const width = Math.min(info.width - left, contentWidth + padding * 2);
  const height = Math.min(info.height - top, contentHeight + padding * 2);
  const outputData = Buffer.alloc(width * height * 4);

  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      const sourceOffset = ((top + y) * info.width + left + x) * info.channels;
      const outputOffset = (y * width + x) * 4;
      const red = data[sourceOffset];
      const green = data[sourceOffset + 1];
      const blue = data[sourceOffset + 2];
      const spread = Math.max(red, green, blue) - Math.min(red, green, blue);
      const matte = estimateMatte(red, green, blue, palette);
      const alpha = Math.min(1, matte.alpha);

      if ((Math.min(red, green, blue) > 242 && spread < 16) || alpha < 0.06) {
        outputData[outputOffset + 3] = 0;
        continue;
      }

      outputData[outputOffset] = matte.color[0];
      outputData[outputOffset + 1] = matte.color[1];
      outputData[outputOffset + 2] = matte.color[2];
      outputData[outputOffset + 3] = Math.round(alpha * 255);
    }
  }

  await mkdir(path.dirname(outputPath), { recursive: true });
  await sharp(outputData, { raw: { width, height, channels: 4 } }).png().toFile(outputPath);
  process.stdout.write(`${output}: ${width}x${height}\n`);
}

for (const logo of logos) {
  await createTransparentLogo(logo);
}

// Arrange the two supplied wordmark lines side by side for compact navigation.
// The full, unaltered stacked mark remains available for the About page.
const stackedPath = path.join(projectRoot, 'public/images/potts-wordmark.png');
const [potts, plumbing] = await Promise.all([
  sharp(await sharp(stackedPath).extract({ left: 0, top: 0, width: 666, height: 246 }).png().toBuffer()).trim().png().toBuffer({ resolveWithObject: true }),
  sharp(await sharp(stackedPath).extract({ left: 0, top: 248, width: 666, height: 188 }).png().toBuffer()).trim().png().toBuffer({ resolveWithObject: true }),
]);
const gap = 75;
const horizontalHeight = Math.max(potts.info.height, plumbing.info.height);
const horizontalWidth = potts.info.width + gap + plumbing.info.width;
const horizontalPath = path.join(projectRoot, 'public/images/potts-horizontal.png');
await sharp({ create: { width: horizontalWidth, height: horizontalHeight, channels: 4, background: '#00000000' } })
  .composite([
    { input: potts.data, left: 0, top: Math.round((horizontalHeight - potts.info.height) / 2) },
    { input: plumbing.data, left: potts.info.width + gap, top: Math.round((horizontalHeight - plumbing.info.height) / 2) },
  ])
  .png()
  .toFile(horizontalPath);
process.stdout.write(`public/images/potts-horizontal.png: ${horizontalWidth}x${horizontalHeight}\n`);

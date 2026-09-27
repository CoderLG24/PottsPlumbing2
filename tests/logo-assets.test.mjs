import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import test from 'node:test';
import sharp from 'sharp';

const logoAssets = [
  {
    source: 'images/image0.png',
    output: 'public/images/potts-mark.png',
    hash: '775f4e3ece80ff933c13522f83a43f5b0e89f2ac73ed5b7b27b8cf030afb3c5c',
    maxWidth: 1170,
    maxHeight: 2532,
    palette: [[18, 51, 93], [82, 160, 221]],
  },
  {
    source: 'images/image1.jpeg',
    output: 'public/images/potts-wordmark.png',
    hash: 'd052e694f61ef835ea7096121d9cc8b1c4a765a93f8941d995a2a35262ede0d9',
    maxWidth: 688,
    maxHeight: 1504,
    palette: [[4, 44, 96], [104, 188, 248]],
  },
];

for (const asset of logoAssets) {
  test(`${asset.output} is a cropped transparent derivative of its source`, async () => {
    assert.equal(existsSync(asset.output), true, `Expected ${asset.output} to exist`);

    const sourceHash = createHash('sha256').update(readFileSync(asset.source)).digest('hex');
    assert.equal(sourceHash, asset.hash, `Expected ${asset.source} to remain unchanged`);

    const { data, info } = await sharp(asset.output)
      .ensureAlpha()
      .raw()
      .toBuffer({ resolveWithObject: true });
    const metadata = await sharp(asset.output).metadata();
    let transparentPixels = 0;
    let visiblePixels = 0;
    let darkBluePixels = 0;
    let offPalettePixels = 0;

    for (let pixel = 0; pixel < data.length; pixel += info.channels) {
      const [red, green, blue, alpha] = data.subarray(pixel, pixel + info.channels);
      if (alpha === 0) transparentPixels += 1;
      if (alpha > 250) visiblePixels += 1;
      if (alpha > 250 && red < 45 && green < 75 && blue > 55) darkBluePixels += 1;
      if (alpha > 0 && !asset.palette.some(([paletteRed, paletteGreen, paletteBlue]) => (
        red === paletteRed && green === paletteGreen && blue === paletteBlue
      ))) offPalettePixels += 1;
    }

    assert.equal(metadata.hasAlpha, true, 'Expected an alpha channel');
    assert.ok(info.width < asset.maxWidth, 'Expected the large horizontal margins to be cropped');
    assert.ok(info.height < asset.maxHeight, 'Expected the large vertical margins to be cropped');
    assert.ok(transparentPixels > visiblePixels * 0.05, 'Expected transparent background pixels');
    assert.ok(darkBluePixels > 100, 'Expected the original dark-blue logo artwork to remain');
    assert.equal(offPalettePixels, 0, 'Expected visible artwork to use only the supplied logo colors');
  });
}

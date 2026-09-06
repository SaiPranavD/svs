import fs from 'fs';
import path from 'path';

function getPngDimensions(filePath) {
  const buffer = fs.readFileSync(filePath);
  if (buffer.toString('ascii', 1, 4) === 'PNG') {
    const width = buffer.readUInt32BE(16);
    const height = buffer.readUInt32BE(20);
    return { width, height };
  }
  return null;
}

console.log('hero-banner.png:', getPngDimensions('public/hero-banner.png'));
console.log('logo-cropped.png:', getPngDimensions('public/logo-cropped.png'));
console.log('logo-full.png:', getPngDimensions('public/logo-full.png'));
console.log('logo-mark.png:', getPngDimensions('public/logo-mark.png'));

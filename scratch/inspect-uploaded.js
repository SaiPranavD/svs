import fs from 'fs';

function getPngDimensions(filePath) {
  const buffer = fs.readFileSync(filePath);
  if (buffer.toString('ascii', 1, 4) === 'PNG') {
    const width = buffer.readUInt32BE(16);
    const height = buffer.readUInt32BE(20);
    return { width, height };
  }
  return null;
}

const uploaded = "C:/Users/dsaip/.gemini/antigravity-ide/brain/9a841afd-04ae-44c1-8f7f-9d2d85cd371e/.user_uploaded/media_1788713415652.png";
console.log('uploaded:', getPngDimensions(uploaded));

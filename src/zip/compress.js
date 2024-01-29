import fs from 'fs';
import zlib from 'zlib';
import pipeline from 'stream';

const compress = async () => {
  const inputFilePath = './files/fileToCompress.txt';
  const outputFilePath = './files/archive.gz';

  const readStream = fs.createReadStream(inputFilePath);

  const writeStream = fs.createWriteStream(outputFilePath);

  const gzip = zlib.createGzip();

  await new Promise((resolve, reject) => {
    pipeline(readStream, gzip, writeStream, (err) => {
      if (err) {
        console.error('Compression failed:', err);
        reject(err);
      } else {
        console.log('File compressed successfully.');
        resolve();
      }
    });
  });
};

await compress();

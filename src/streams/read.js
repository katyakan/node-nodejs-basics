import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const read = async () => {
  const filePath = path.join(__dirname, 'files', 'fileToRead.txt');

  const readStream = fs.createReadStream(filePath, { encoding: 'utf-8' });

  readStream.pipe(process.stdout);

  return new Promise((resolve, reject) => {
    readStream.on('end', () => {
      console.log('\nFile reading completed.');
      resolve();
    });

    readStream.on('error', (error) => {
      console.error(`Error reading file: ${error.message}`);
      reject(error);
    });
  });
};

await read();

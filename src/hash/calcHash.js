import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const calcHash = async () => {
  const filePath = path.join(__dirname, 'files', 'fileToCalculateHashFor.txt');
  const readStream = fs.createReadStream(filePath);
  const hash = crypto.createHash('sha256');

  return new Promise((resolve, reject) => {
    readStream.on('data', (chunk) => {
      hash.update(chunk);
    });

    readStream.on('end', () => {
      const hashResult = hash.digest('hex');
      console.log(`SHA256 Hash for ${filePath}: ${hashResult}`);
      resolve(hashResult);
    });

    readStream.on('error', (error) => {
      console.error(`Error reading file: ${error.message}`);
      reject(error);
    });
  });
};

calcHash();

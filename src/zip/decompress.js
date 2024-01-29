import fs from 'fs';
import zlib from 'zlib';
import { pipeline } from 'stream';
import { promisify } from 'util';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const pipelineAsync = promisify(pipeline);

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const decompress = async (
  sourcePath = join(__dirname, 'files', 'compressed.gz'),
  destinationPath = join(__dirname, 'files', 'decompressed.txt')
) => {
  try {
    await fs.promises.access(sourcePath);
  } catch (err) {
    if (err.code === 'ENOENT') {
      throw new Error(
        `FS operation failed: source file ${sourcePath} does not exist`
      );
    }
    throw err;
  }

  try {
    await fs.promises.access(destinationPath);
    throw new Error(
      `FS operation failed: target file ${destinationPath} already exists`
    );
  } catch (err) {
    if (err.code !== 'ENOENT') {
      throw err;
    }
  }

  const gunzip = zlib.createGunzip();
  const source = fs.createReadStream(sourcePath);
  const destination = fs.createWriteStream(destinationPath);

  await pipelineAsync(source, gunzip, destination);
  console.log(
    `FS operation success: file ${sourcePath} decompressed to ${destinationPath}`
  );
};

await decompress();

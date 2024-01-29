import { promises as fsPromises, existsSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const rename = async () => {
  const oldFileName = 'files/wrongFilename.txt';
  const newFileName = 'files/properFilename.md';

  try {
    const oldFilePath = join(__dirname, oldFileName);
    const newFilePath = join(__dirname, newFileName);

    if (!existsSync(oldFilePath) || existsSync(newFilePath)) {
      throw new Error(
        'FS operation failed'
      );
    }

    await fsPromises.rename(oldFilePath, newFilePath);
    console.log('File renamed successfully');
  } catch (error) {
    console.error(error.message);
  }
};

await rename();

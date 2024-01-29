import { promises as fsPromises, existsSync, mkdirSync, readdirSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const copy = async () => {
  const sourcePath = `${__dirname}/files`;
  const destinationPath = `${__dirname}/files_copy`;

  try {
    if (!existsSync(sourcePath) || existsSync(destinationPath)) {
      throw new Error('FS operation failed');
    }

    mkdirSync(destinationPath);

    const files = readdirSync(sourcePath);

    for (const file of files) {
      const sourceFile = join(sourcePath, file);
      const destinationFile = join(destinationPath, file);
      await fsPromises.copyFile(sourceFile, destinationFile);
    }

    console.log('Folder copied successfully');
  } catch (error) {
    console.error(error.message);
  }
};

await copy();

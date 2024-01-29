import { promises as fsPromises } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const remove = async () => {
  const fileName = 'files/fileToRemove.txt';

  try {
    const filePath = join(__dirname, fileName);

    await fsPromises.access(filePath);

    await fsPromises.unlink(filePath);
    console.log('File deleted successfully');
  } catch (error) {
    if (error.code === 'ENOENT') {
      throw new Error('FS operation failed: File does not exist');
    } else {
      console.error(`FS operation failed: ${error.message}`);
    }
  }
};

await remove();

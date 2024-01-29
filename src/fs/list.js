import { promises as fsPromises } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const list = async () => {
  const folderPath = join(__dirname, 'files');

  try {
    // Check if the folder exists
    await fsPromises.access(folderPath);

    // Read the contents of the folder
    const files = await fsPromises.readdir(folderPath);

    // Print the array of filenames to the console
    console.log('Files in the folder:', files);
  } catch (error) {
    if (error.code === 'ENOENT') {
      // Folder does not exist
      throw new Error('FS operation failed: Folder does not exist');
    } else {
      // Other errors
      console.error(`FS operation failed: ${error.message}`);
    }
  }
};

await list();

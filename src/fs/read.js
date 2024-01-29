import { promises as fsPromises } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const read = async () => {
  const fileName = 'files/fileToRead.txt'; // Update the path to the file

  try {
    const filePath = join(__dirname, fileName);

    // Check if the file exists
    await fsPromises.access(filePath);

    // Read the content of the file
    const content = await fsPromises.readFile(filePath, 'utf8');

    // Print the content to the console
    console.log('File content:');
    console.log(content);
  } catch (error) {
    if (error.code === 'ENOENT') {
      // File does not exist
      throw new Error('FS operation failed: File does not exist');
    } else {
      // Other errors
      console.error(`FS operation failed: ${error.message}`);
    }
  }
};

await read();

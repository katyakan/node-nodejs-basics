import { promises as fsPromises, existsSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const create = async () => {
  const filePath = `${__dirname}/files/fresh.txt`;
  const content = 'I am fresh and young';

  try {
    if (existsSync(filePath)) {
      throw new Error('FS operation failed');
    }

    try {
      await fsPromises.writeFile(filePath, content);
      console.log('File created successfully');
    } catch (writeError) {
      console.error(writeError.message);
    }
  } catch (error) {
    console.error(error.message);
  }
};

await create();

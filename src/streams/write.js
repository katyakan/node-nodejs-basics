import fs from 'fs';
import { Writable } from 'stream';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const write = async () => {

  const writableStream = fs.createWriteStream('fileToWrite.txt');

  const writable = new Writable({

    write(chunk, encoding, callback) {
  
      writableStream.write(chunk, encoding, (err) => {
        if (err) {
          console.error('Error writing to file:', err);
        } else {
          console.log('Data written to fileToWrite.txt');
        }

        callback();
      });
    },
  });

  // Pipe the standard input (process.stdin) to the writable stream
  process.stdin.pipe(writable);

  // Wait for the writable stream to finish (e.g., when the user presses Ctrl+D to end input)
  await new Promise((resolve) => {
    writableStream.on('finish', resolve);
  });

  console.log('Writing process complete.');
};

await write();

import path from 'path';
import { release, version } from 'os';
import { createServer as createServerHttp } from 'http';
// import aJson from './files/a.json';
// import bJson from './files/b.json';
import './files/c.js';

const random = Math.random();
// Update import statements for JSON files with assertion type
let unknownObject;

if (random > 0.5) {
  unknownObject = await import('./files/a.json', { assert: { type: 'json' } });
} else {
  unknownObject = await import('./files/b.json', { assert: { type: 'json' } });
}

console.log(unknownObject);

console.log(`Release ${release()}`);
console.log(`Version ${version()}`);
console.log(`Path segment separator is "${path.sep}"`);

console.log(`Path to current file is ${import.meta.url}`);
console.log(
  `Path to current directory is ${new URL('.', import.meta.url).pathname}`
);

const myServer = createServerHttp((_, res) => {
  res.end('Request accepted');
});

const PORT = 3001;

console.log(unknownObject);

myServer.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
  console.log('To terminate it, use Ctrl+C combination');
});

export { unknownObject, myServer };

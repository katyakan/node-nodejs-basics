import { Transform } from 'stream';

const transform = async () => {
  const reverseTransform = new Transform({
    transform(chunk, encoding, callback) {
      const reversedText = chunk.toString().split('').reverse().join('');

      this.push(reversedText);

      callback();
    },
  });

  process.stdin.pipe(reverseTransform);

  reverseTransform.pipe(process.stdout);

  await new Promise((resolve) => {
    reverseTransform.on('end', resolve);
  });

  console.log('Transformation complete.');
};

await transform();

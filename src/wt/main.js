import { Worker } from 'worker_threads';
import { cpus } from 'os';

const START_NUMBER = 10;

const workerService = (number) =>
  new Promise((resolve) => {
    const worker = new Worker('./src/wt/worker.js', { workerData: number });

    worker.on('message', (data) =>
      resolve({
        status: 'resolved',
        data,
      })
    );

    worker.on('error', () =>
      resolve({
        status: 'error',
        data: null,
      })
    );
  });
const performCalculations = async () => {
  const workers = Array.from({ length: cpus().length }, (_, i) =>
    workerService(START_NUMBER + i)
  );
  const result = await Promise.all(workers);
  console.log(result);
};

await performCalculations();

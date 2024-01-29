import { spawn } from 'child_process';

const spawnChildProcess = async (args) => {
  const childProcess = spawn('node', ['script.js', ...args], {
    stdio: ['pipe', 'pipe', 'pipe', 'ipc'],
  });

  process.stdin.pipe(childProcess.stdin);
  childProcess.stdout.pipe(process.stdout);

  childProcess.on('exit', (code) => {
    console.log(`Child process exited with code ${code}`);
    process.exit(code);
  });

  childProcess.on('error', (err) => {
    console.error('Error in child process:', err);
    process.exit(1);
  });
};

const argumentsToPass = ['arg1', 'arg2', 'arg3'];
spawnChildProcess(argumentsToPass);

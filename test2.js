//opens vs code it's the equivalent of typing code . in the terminal

// const { exec } = require('child_process');
// exec('code .', (error, stdout, stderr) => {
//   if (error) {
//     console.error(`exec error: ${error}`);
//     return;
//   }
//   console.log(`stdout: ${stdout}`);
//   console.error(`stderr: ${stderr}`);
// });

const { execFile } = require('child_process');
const child = execFile('/Projects/node/nixandra/print.txt', (error, stdout, stderr) => {
  if (error) {
    throw error;
  }
  console.log(stdout);
});
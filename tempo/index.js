require('babel-register');
var readline = require('readline');
var bomToJSON = require('./bomToJSON');

let input = []

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
rl.prompt();

rl.on('line', function (line) {
  input.push(line);
});

rl.on('close', function () {
  let output = bomToJSON.default(input.join('\n'))
  console.log(output);
  process.exit(0);
});

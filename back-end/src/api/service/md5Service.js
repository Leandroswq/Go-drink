const md5 = require('md5');
const fs = require('fs');

fs.readFile('example.txt', (err, buf) => {
  console.log(md5(buf));
});
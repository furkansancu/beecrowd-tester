var input = require('fs').readFileSync('/dev/stdin', 'utf8');
var lines = input.split('\n');

console.log("X = " + (parseInt(lines[0]) + parseInt(lines[1])));
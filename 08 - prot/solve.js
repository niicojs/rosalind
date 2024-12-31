import { consola } from 'consola';
import clipboard from 'clipboardy';
import { getRawData, timer } from '../utils.js';
import { codons } from '../adn.js';
consola.wrapAll();

consola.start('Starting...');
const t = timer();

const input = getRawData().trim();
let output = '';
let i = 0;
while (i < input.length) {
  const str = input.slice(i, i + 3);
  if (codons[str]) {
    if (codons[str] !== 'Stop') {
      output += codons[str];
    }
    i += 3;
  } else {
    output += i;
    i++;
  }
}

let answer = output;

consola.success('result', answer);
consola.success('Done in', t.format());
clipboard.writeSync(answer?.toString());

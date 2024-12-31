import { consola } from 'consola';
import clipboard from 'clipboardy';
import { getDataLines, timer } from '../utils.js';
consola.wrapAll();

consola.start('Starting...');
const t = timer();

const [one, two] = getDataLines();
const symbols = one.split(' ');
const ln = +two;

function kmers(k, possible) {
  if (k === 1) return possible;
  const res = [];
  for (let i = 0; i < possible.length; i++) {
    res.push(...kmers(k - 1, possible).map((s) => possible[i] + s));
  }
  return res;
}

let answer = kmers(ln, symbols).sort().join('\n')

consola.success('result', answer);
consola.success('Done in', t.format());
clipboard.writeSync(answer?.toString());

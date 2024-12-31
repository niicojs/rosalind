import { consola } from 'consola';
import clipboard from 'clipboardy';
import { getDataLines, getRawData, timer } from '../utils.js';
consola.wrapAll();

consola.start('Starting...');
const t = timer();

const n = +getRawData().trim();
const numbers = Array.from({ length: n }, (_, i) => i + 1);

function kmers(k, possible) {
  if (k === 1) return possible;
  const res = [];
  for (let i = 0; i < possible.length; i++) {
    res.push(
      ...kmers(
        k - 1,
        possible.filter((_, j) => j !== i)
      ).map((s) => [possible[i]].concat(s))
    );
  }
  return res;
}

let res = kmers(n, numbers);
let answer = res.length + '\n' + res.map((l) => l.join(' ')).join('\n');

consola.success('result', answer);
consola.success('Done in', t.format());
clipboard.writeSync(answer?.toString());

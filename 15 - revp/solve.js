import { consola } from 'consola';
import clipboard from 'clipboardy';
import TinyQueue from 'tinyqueue';
import {
  getDataLines,
  getDirectNeighbors,
  getFASTASequences,
  getGrid,
  getRawData,
  inGridRange,
  memoize,
  nums,
  timer,
} from '../utils.js';
consola.wrapAll();

consola.start('Starting...');
const t = timer();

const sequences = getFASTASequences();
const values = [...sequences.values()];
const seq = values.at(0);

const revc = { A: 'T', T: 'A', C: 'G', G: 'C' };

let palindromes = [];
for (let i = 0.5; i < seq.length - 0.5; i++) {
  for (let n = 0; n <= Math.min(i, seq.length - i - 1); n++) {
    if (seq[i - n - 0.5] === revc[seq[i + n + 0.5]]) {
      let ln = 2 * n + 2;
      if (ln >= 4 && ln <= 12) {
        const pos = i - n - 0.5;
        const pal = seq.slice(pos, i + n + 1.5);
        palindromes.push([pos + 1, pal.length]);
        // consola.log(pos + 1, pal.length, pal);
      }
    } else break;
  }
}

let answer = palindromes
  .sort((a, b) => a[0] - b[0])
  .map((p) => p.join(' '))
  .join('\n');

consola.success('result', answer);
consola.success('Done in', t.format());
clipboard.writeSync(answer?.toString());

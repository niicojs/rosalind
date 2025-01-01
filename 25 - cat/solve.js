import { consola } from 'consola';
import clipboard from 'clipboardy';
import TinyQueue from 'tinyqueue';
import {
  count,
  fact,
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
const sequence = values.at(0);

const revc = { A: 'U', U: 'A', C: 'G', G: 'C' };

const mod = 1_000_000;

const findMatching = memoize((array) => {
  if (array.length === 0) return 1;
  if (array.length === 2) return array[0] === revc[array[1]] ? 1 : -1;
  if (array.length % 2 === 1) return -1;
  let res = 0;
  for (let i = 1; i < array.length; i += 2) {
    if (array[0] === revc[array[i]]) {
      const left = array.slice(1, i);
      const right = array.slice(i + 1);
      const leftRes = findMatching(left);
      const rightRes = findMatching(right);
      if (leftRes === -1 || rightRes === -1) continue;
      res = (res + (leftRes % mod) * (rightRes % mod)) % mod;
    }
  }
  return res;
});

const [A, C, G, U] = [
  count(sequence, 'A'),
  count(sequence, 'C'),
  count(sequence, 'G'),
  count(sequence, 'U'),
];

consola.log({ A, C, G, U });

let answer = findMatching(sequence.split(''));

consola.success('result', answer);
consola.success('Done in', t.format());
clipboard.writeSync(answer?.toString());

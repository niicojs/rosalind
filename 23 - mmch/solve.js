import { consola } from 'consola';
import clipboard from 'clipboardy';
import { count, getFASTASequences, timer } from '../utils.js';
consola.wrapAll();

consola.start('Starting...');
const t = timer();

const sequences = getFASTASequences();
const values = [...sequences.values()];
const sequence = values[0];

const fact = (n) => {
  let result = 1n;
  for (let i = 1; i <= n; i++) {
    result *= BigInt(i);
  }
  return result;
};

const [A, C, G, U] = [
  count(sequence, 'A'),
  count(sequence, 'C'),
  count(sequence, 'G'),
  count(sequence, 'U'),
];

consola.info({ A, C, G, U });

const [min1, max1] = [Math.min(A, U), Math.max(A, U)];
const [min2, max2] = [Math.min(C, G), Math.max(C, G)];

let answer = fact(max1) / fact(max1 - min1);
answer *= fact(max2) / fact(max2 - min2);

consola.success('result', answer);
consola.success('Done in', t.format());
clipboard.writeSync(answer?.toString());

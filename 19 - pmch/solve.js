import { consola } from 'consola';
import clipboard from 'clipboardy';
import TinyQueue from 'tinyqueue';
import {
  count,
  getDataLines,
  getDirectNeighbors,
  getFASTASequences,
  getGrid,
  getRawData,
  inGridRange,
  nums,
  timer,
} from '../utils.js';
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

let answer = fact(count(sequence, 'A')) * fact(count(sequence, 'C'));

consola.success('result', answer);
consola.success('Done in', t.format());
clipboard.writeSync(answer?.toString());

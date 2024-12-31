import { consola } from 'consola';
import clipboard from 'clipboardy';
import { count, getRawData, timer } from '../utils.js';
consola.wrapAll();

const t = timer();

const rev = {
  A: 'T',
  T: 'A',
  C: 'G',
  G: 'C',
};

const answer = getRawData()
  .trim()
  .split('')
  .reverse()
  .map((c) => rev[c])
  .join('');

consola.success('result', answer);
consola.success('Done in', t.format());
clipboard.writeSync(answer?.toString());

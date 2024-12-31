import { consola } from 'consola';
import clipboard from 'clipboardy';
import { count, getRawData, timer } from '../utils.js';
consola.wrapAll();

const t = timer();
const raw = getRawData().trim();

let answer = [
  count(raw, 'A'),
  count(raw, 'C'),
  count(raw, 'G'),
  count(raw, 'T'),
].join(' ');

consola.success('result', answer);
consola.success('Done in', t.format());
clipboard.writeSync(answer?.toString());

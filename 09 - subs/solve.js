import { consola } from 'consola';
import clipboard from 'clipboardy';
import { getDataLines, timer } from '../utils.js';
consola.wrapAll();

consola.start('Starting...');
const t = timer();

const [one, two] = getDataLines();

const pos = [];
let idx = -1;
do {
  idx = one.indexOf(two, idx + 1);
  if (idx >= 0) pos.push(idx + 1);
} while (idx >= 0);

let answer = pos.join(' ');

consola.success('result', answer);
consola.success('Done in', t.format());
clipboard.writeSync(answer?.toString());

import { consola } from 'consola';
import clipboard from 'clipboardy';
import TinyQueue from 'tinyqueue';
import {
  count,
  getCurrentDay,
  getDataLines,
  getDirectNeighbors,
  getGrid,
  getRawData,
  inGridRange,
  nums,
  timer,
} from '../utils.js';
consola.wrapAll();

consola.start('Starting...');
const t = timer();

const sequences = new Map();
const lines = getDataLines();
for (let i = 0; i < lines.length; i++) {
  const name = lines[i].slice(1);
  let content = '';
  while (i + 1 < lines.length && lines[i + 1][0] !== '>') {
    content += lines[i + 1];
    i++;
  }
  sequences.set(name, content);
}

let best = [0, ''];
for (const [name, content] of sequences.entries()) {
  const p = (count(content, 'C') + count(content, 'G')) / content.length;
  if (p > best[0]) best = [p, name];
}

let answer = best[1] + '\n' + (100 * best[0]).toFixed(6);

consola.success('result', answer);
consola.success('Done in', t.format());
clipboard.writeSync(answer?.toString());

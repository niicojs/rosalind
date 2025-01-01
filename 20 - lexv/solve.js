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
  const res = [...possible];
  for (let i = 0; i < possible.length; i++) {
    res.push(...kmers(k - 1, possible).map((s) => possible[i] + s));
  }
  return res;
}

const sorter = (a, b) => {
  if (a === b) return 0;
  if (a.length < b.length) {
    if (b.startsWith(a)) return -1;
  } else if (a.length > b.length) {
    if (a.startsWith(b)) return 1;
  }
  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) return symbols.indexOf(a[i]) - symbols.indexOf(b[i]);
  }
  return 0;
};

let answer = kmers(ln, symbols).sort(sorter).join('\n');

consola.success('result', answer);
consola.success('Done in', t.format());
clipboard.writeSync(answer?.toString());

import { consola } from 'consola';
import clipboard from 'clipboardy';
import { getDataLines, timer } from '../utils.js';
consola.wrapAll();

consola.start('Starting...');
const t = timer();

let answer = 0;

const [one, two] = getDataLines();
for (let i = 0; i < one.length; i++) {
  if (one[i] !== two[i]) answer++;
}

consola.success('result', answer);
consola.success('Done in', t.format());
clipboard.writeSync(answer?.toString());

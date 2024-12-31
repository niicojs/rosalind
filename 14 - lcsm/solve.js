import { consola } from 'consola';
import clipboard from 'clipboardy';
import { getFASTASequences, timer } from '../utils.js';
consola.wrapAll();

consola.start('Starting...');
const t = timer();

const sequences = getFASTASequences();
const values = [...sequences.values()];

let answer = '';
const first = values[0];
for (let i = 0; i < first.length - 1; i++) {
  for (let j = 1; j < first.length - j - 1; j++) {
    const sub = first.slice(i, i + j);
    let ok = true;
    for (let k = 1; k < values.length; k++) {
      if (!values[k].includes(sub)) {
        ok = false;
        break;
      }
    }
    if (ok && sub.length > answer.length) {
      answer = sub;
    }
  }
}

consola.success('result', answer);
consola.success('Done in', t.format());
clipboard.writeSync(answer?.toString());

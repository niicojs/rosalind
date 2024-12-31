import { consola } from 'consola';
import clipboard from 'clipboardy';
import { getFASTASequences, timer } from '../utils.js';
consola.wrapAll();

consola.start('Starting...');
const t = timer();

const k = 3;

let answer = '';

const sequences = getFASTASequences();
for (const [n1, str1] of sequences.entries()) {
  for (const [n2, str2] of sequences.entries()) {
    if (n1 === n2) continue;
    if (str1.slice(-k) === str2.slice(0, k)) {
      answer += n1 + ' ' + n2 + '\n';
    }
  }
}
answer.trim();

consola.success('result', answer);
consola.success('Done in', t.format());
clipboard.writeSync(answer?.toString());

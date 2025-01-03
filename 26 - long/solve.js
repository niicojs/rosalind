import { consola } from 'consola';
import clipboard from 'clipboardy';
import { getFASTASequences, timer } from '../utils.js';
consola.wrapAll();

consola.start('Starting...');
const t = timer();

const seqmap = getFASTASequences();
const sequences = [...seqmap.values()];

const overlap = Math.floor(Math.min(...sequences.map((s) => s.length)) / 2) - 1;

function isOverlap(s1, s2) {
  for (let i = overlap; i <= s1.length; i++) {
    if (s1.slice(-i) === s2.slice(0, i)) {
      return i;
    }
  }
  return -1;
}

let idx = -1;
let res = sequences.shift();
while (sequences.length) {
  const seq = sequences.shift();
  if ((idx = isOverlap(res, seq)) > 0) {
    res = res.slice(0, -idx) + seq;
  } else if ((idx = isOverlap(seq, res)) > 0) {
    res = seq.slice(0, -idx) + res;
  } else if (res.includes(seq)) {
    continue;
  } else {
    sequences.push(seq);
  }
}

let answer = res;

consola.success('result', answer);
consola.success('Done in', t.format());
clipboard.writeSync(answer?.toString());

import { consola } from 'consola';
import clipboard from 'clipboardy';
import { getRawData, timer } from '../utils.js';
import { codons } from '../adn.js';
consola.wrapAll();

consola.start('Starting...');
const t = timer();

const sequence = getRawData().trim();

const mod = 1_000_000;

const reverseCodons = {};
for (const codon in codons) {
  if (!reverseCodons[codons[codon]]) reverseCodons[codons[codon]] = [];
  reverseCodons[codons[codon]].push(codon);
}

let answer = 1;
for (const s of [...sequence.split(''), 'Stop']) {
  answer = (answer * reverseCodons[s].length) % mod;
}

consola.success('result', answer);
consola.success('Done in', t.format());
clipboard.writeSync(answer?.toString());

import { consola } from 'consola';
import clipboard from 'clipboardy';
import { getFASTASequences, timer } from '../utils.js';
import { applyCodon, dna2rna } from '../adn.js';
consola.wrapAll();

consola.start('Starting...');
const t = timer();

const sequences = getFASTASequences();
const values = [...sequences.values()];
const [sequence, ...introns] = values;

let exons = sequence;
for (const intron of introns) {
  exons = exons.replaceAll(intron, '');
}

let answer = applyCodon(dna2rna(exons));

consola.success('result', answer);
consola.success('Done in', t.format());
clipboard.writeSync(answer?.toString());

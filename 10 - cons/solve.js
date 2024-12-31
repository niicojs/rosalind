import { consola } from 'consola';
import clipboard from 'clipboardy';
import { getFASTASequences, timer } from '../utils.js';
consola.wrapAll();

consola.start('Starting...');
const t = timer();

const sequences = getFASTASequences();
const values = [...sequences.values()];
const ln = values[0].length;

function profile(symbol) {
  const p = Array(ln).fill(0);
  for (let i = 0; i < ln; i++) {
    for (let j = 0; j < values.length; j++) {
      if (values[j][i] === symbol) p[i] += 1;
    }
  }
  return p;
}

function profileMatrix() {
  return [profile('A'), profile('C'), profile('G'), profile('T')];
}

function consensus(matrix) {
  const c = Array(ln).fill(0);
  for (let i = 0; i < ln; i++) {
    let max = [0, 0];
    for (let j = 0; j < matrix.length; j++) {
      if (matrix[j][i] > max[0]) max = [matrix[j][i], j];
    }
    c[i] = ['A', 'C', 'G', 'T'][max[1]];
  }
  return c;
}

const matrix = profileMatrix();

let answer = consensus(matrix).join('') + '\n';
answer += 'A: ' + matrix[0].join(' ') + '\n';
answer += 'C: ' + matrix[1].join(' ') + '\n';
answer += 'G: ' + matrix[2].join(' ') + '\n';
answer += 'T: ' + matrix[3].join(' ') + '\n';

consola.success('result', answer);
consola.success('Done in', t.format());
clipboard.writeSync(answer?.toString());

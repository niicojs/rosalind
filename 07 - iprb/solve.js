import { consola } from 'consola';
import clipboard from 'clipboardy';
import { getRawData, nums, timer } from '../utils.js';
consola.wrapAll();

consola.start('Starting...');
const t = timer();

const [k, m, n] = nums(getRawData().trim());
const total = k + m + n;

const dom1 = k / total; // dom first

const hom1dom2 = (m / total) * (k / (total - 1)); // hom then dom
const hom1rec2 = (m / total) * (n / (total - 1)) * 0.5; // hom then rec
const hom1hom2 = (m / total) * ((m - 1) / (total - 1)) * (1 - 0.5 * 0.5); // hom then het
const hom = hom1dom2 + hom1rec2 + hom1hom2;

const rec1dom2 = (n / total) * (k / (total - 1)); // rec then dom
const rec1hom2 = (n / total) * (m / (total - 1)) * 0.5; // rec then hom
const rec = rec1dom2 + rec1hom2;

const answer = (dom1 + hom + rec).toFixed(6);

consola.success('result', answer);
consola.success('Done in', t.format());
clipboard.writeSync(answer?.toString());

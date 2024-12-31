import { consola } from 'consola';
import clipboard from 'clipboardy';
import { count, getRawData, timer } from '../utils.js';
consola.wrapAll();

const t = timer();
const answer = getRawData().trim().replaceAll('T', 'U')

consola.success('result', answer);
consola.success('Done in', t.format());
clipboard.writeSync(answer?.toString());

import { consola } from 'consola';
import clipboard from 'clipboardy';
import { getRawData, nums, timer } from '../utils.js';
consola.wrapAll();

const fact = (n) => {
  let result = 1n;
  for (let i = 1; i <= n; i++) {
    result *= BigInt(i);
  }
  return result;
};

const pper = (n, k) => fact(n) / fact(n - k);

consola.start('Starting...');
const t = timer();

const [one, two] = nums(getRawData().trim());

let answer = pper(one, two) % 1_000_000n;

consola.success('result', answer);
consola.success('Done in', t.format());
clipboard.writeSync(answer?.toString());

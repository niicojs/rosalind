import { consola } from 'consola';
import clipboard from 'clipboardy';
import { getRawData, memoize, nums, timer } from '../utils.js';
consola.wrapAll();

const fib = memoize((n, k) => (n <= 1 ? n : fib(n - 1, k) + k * fib(n - 2, k)));

const t = timer();

const [n, k] = nums(getRawData().trim());

let answer = fib(n, k);

consola.success('result', answer);
consola.success('Done in', t.format());
clipboard.writeSync(answer?.toString());

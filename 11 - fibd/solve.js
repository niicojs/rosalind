import { consola } from 'consola';
import clipboard from 'clipboardy';
import { getRawData, memoize, nums, timer } from '../utils.js';
consola.wrapAll();

const bkey = (a, b) => a.toString() + b.toString();

const fib = memoize((n, k) => {
  if (n <= 0n) return 0n
  if (n <= 1n) return n;
  if (n <= k) return fib(n - 1n, k) + fib(n - 2n, k);
  if (n === k + 1n) return fib(n - 1n, k) + fib(n - 2n, k) - 1n;
  return fib(n - 1n, k) + fib(n - 2n, k) - fib(n - k - 1n, k);
}, bkey);

const t = timer();

const [n, k] = nums(getRawData().trim());

let answer = fib(BigInt(n), BigInt(k));

consola.success('result', answer);
consola.success('Done in', t.format());
clipboard.writeSync(answer?.toString());

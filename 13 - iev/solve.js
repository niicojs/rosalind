import { consola } from 'consola';
import clipboard from 'clipboardy';
import { getRawData, memoize, nums, sum, timer } from '../utils.js';
consola.wrapAll();

consola.start('Starting...');
const t = timer();

const values = nums(getRawData().trim());
const pairs = ['AA-AA', 'AA-Aa', 'AA-aa', 'Aa-Aa', 'Aa-aa', 'aa-aa'];

const mate = (one, two) => {
  const children = [];
  for (const c1 of one) {
    for (const c2 of two) {
      children.push(c1 + c2);
    }
  }
  return children;
};

const probability = memoize((one, two) => {
  const children = mate(one, two);
  const dom = sum(children.map((c) => (c.includes('A') ? 1 : 0)));
  return dom / children.length;
});

let answer = 0;
for (let i = 0; i < values.length; i++) {
  const [one, two] = pairs[i].split('-');
  answer += 2 * values[i] * probability(one, two);
}

consola.success('result', answer);
consola.success('Done in', t.format());
clipboard.writeSync(answer?.toString());

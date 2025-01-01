import { consola } from 'consola';
import clipboard from 'clipboardy';
import { getDataLines, nums, timer } from '../utils.js';
consola.wrapAll();

consola.start('Starting...');
const t = timer();

const [one, ...rest] = getDataLines();
const nb = +one;

const edges = new Map();
for (const edge of rest) {
  const [a, b] = nums(edge);

  if (!edges.has(a)) edges.set(a, []);
  edges.get(a).push(b);

  if (!edges.has(b)) edges.set(b, []);
  edges.get(b).push(a);
}

const visited = new Set();

function search(start) {
  const graph = [];
  const todo = [start];
  while (todo.length > 0) {
    const node = todo.shift();

    if (visited.has(node)) continue;
    visited.add(node);
    graph.push(node);

    for (const next of edges.get(node) || []) {
      todo.push(next);
    }
  }

  return graph;
}

const graphes = [];
for (let i = 1; i <= nb; i++) {
  if (!visited.has(i)) {
    const g = search(i);
    graphes.push(g);
  }
}

let answer = graphes.length - 1;

consola.success('result', answer);
consola.success('Done in', t.format());
clipboard.writeSync(answer?.toString());

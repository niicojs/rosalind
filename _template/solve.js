import { consola } from 'consola';
import clipboard from 'clipboardy';
import TinyQueue from 'tinyqueue';
import {
  getDataLines,
  getDirectNeighbors,
  getFASTASequences,
  getGrid,
  getRawData,
  inGridRange,
  nums,
  timer,
} from '../utils.js';
consola.wrapAll();

consola.start('Starting...');
const t = timer();

const raw = getRawData().trim();
const [one, two] = getRawData()
  .trim()
  .split(/\r?\n\r?\n/);
const lines = getDataLines();
const grid = getGrid(getDataLines());
const values = getDataLines().map(nums);
const sequences = getFASTASequences();

const key = (x, y, x2, y2) => {
  if (x2 && y2) return `${x},${y},${x2},${y2}`;
  else return `${x},${y}`;
};

function search() {
  const todo = new TinyQueue(
    [{ pos: [0, 0], score: 0 }],
    (a, b) => a.score - b.score
  );
  const visited = new Set();
  while (todo.length > 0) {
    const {
      pos: [x, y],
      score,
    } = todo.pop();

    if (x === 0 && y === 0) return score;

    if (visited.has(key(x, y))) continue;
    visited.add(key(x, y));

    const possible = getDirectNeighbors(x, y).filter(
      ([nx, ny]) => inGridRange(grid, nx, ny) && grid[ny][nx] !== '#'
    );

    for (const [nx, ny] of possible) {
      todo.push({ pos: [nx, ny], score: score + 1 });
    }
  }
}

let answer = 0;

consola.success('result', answer);
consola.success('Done in', t.format());
clipboard.writeSync(answer?.toString());

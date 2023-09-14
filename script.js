class Queue {
  constructor() {
    this.items = [];
  }
  enqueue(item) {
    this.items.push(item);
  }
  dequeue() {
    return this.items.shift();
  }
}

function possibleMoves(x, y) {
  return [
    [x - 2, y - 1],
    [x - 2, y + 1],
    [x - 1, y - 2],
    [x - 1, y + 2],
    [x + 1, y - 2],
    [x + 1, y + 2],
    [x + 2, y - 1],
    [x + 2, y + 1],
  ];
}

function knightMoves(start, end) {
  const visited = new Set();
  const queue = new Queue();
  queue.enqueue([start, [start]]);

  while (queue.items.length) {
    const [currentPos, path] = queue.dequeue();
    const [x, y] = currentPos;

    if (x === end[0] && y === end[1]) {
      return path;
    }

    for (const [newX, newY] of possibleMoves(x, y)) {
      const key = `${newX},${newY}`;
      if (!visited.has(key)) {
        visited.add(key);
        const newPath = path.slice();
        newPath.push([newX, newY]);
        queue.enqueue([[newX, newY], newPath]);
      }
    }
  }
  return null; // This shouldn't happen for a valid chessboard, but added for completeness.
}

// Testing
console.log(knightMoves([0, 0], [1, 2])); // [[0,0],[1,2]]
console.log(knightMoves([0, 0], [3, 3])); // [[0,0],[1,2],[3,3]]
console.log(knightMoves([3, 3], [0, 0])); // [[3,3],[1,2],[0,0]]

// ADAPT THIS - Function that will console.log the tree in a structured format
const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

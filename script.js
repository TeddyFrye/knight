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
  hasItems() {
    return this.items.length > 0;
  }
}

function possibleMoves(x, y) {
  const allMoves = [
    [x - 2, y - 1],
    [x - 2, y + 1],
    [x - 1, y - 2],
    [x - 1, y + 2],
    [x + 1, y - 2],
    [x + 1, y + 2],
    [x + 2, y - 1],
    [x + 2, y + 1],
  ];
  const validMoves = allMoves.filter(
    ([x, y]) => x >= 0 && x < 8 && y >= 0 && y < 8
  );
  return validMoves;
}

function knightMoves(startPos, endPos) {
  const visited = new Set();
  const paths = new Queue();
  paths.enqueue([startPos, [startPos]]);

  while (paths.hasItems()) {
    const [currentPos, path] = paths.dequeue();
    const [x, y] = currentPos;

    if (x === endPos[0] && y === endPos[1]) {
      return path;
    }

    for (const [newX, newY] of possibleMoves(x, y)) {
      const key = `${newX},${newY}`;
      if (!visited.has(key)) {
        visited.add(key);
        const newPath = Array.from(path); // Copy the path array
        newPath.push([newX, newY]);
        paths.enqueue([[newX, newY], newPath]);
      }
    }
  }
  return null; // This shouldn't happen for a valid chessboard, but added for completeness.
}

function comparePaths(arr1, arr2) {
  if (arr1.length !== arr2.length) return false;

  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i].length !== arr2[i].length) return false;

    for (let j = 0; j < arr1[i].length; j++) {
      if (arr1[i][j] !== arr2[i][j]) return false;
    }
  }

  return true;
}
// Testing
function testKnightMoves(start, end, expected) {
  const output = knightMoves(start, end);

  if (!comparePaths(output, expected)) {
    throw new Error(
      `For start=${JSON.stringify(start)} and end=${JSON.stringify(
        end
      )}, output ${JSON.stringify(
        output
      )} does not match expected ${JSON.stringify(expected)}`
    );
  }
}

// One step
testKnightMoves(
  [0, 0],
  [1, 2],
  [
    [0, 0],
    [1, 2],
  ]
);
// Going backwards
testKnightMoves(
  [3, 3],
  [0, 0],
  [
    [3, 3],
    [1, 2],
    [0, 0],
  ]
);
// Staying inbounds
testKnightMoves(
  [0, 0],
  [0, 2],
  [
    [0, 0],
    [2, 1],
    [0, 2],
  ]
);
// Crossing the whole board
testKnightMoves(
  [0, 0],
  [7, 7],
  [
    [0, 0],
    [1, 2],
    [0, 4],
    [1, 6],
    [3, 5],
    [5, 6],
    [7, 7],
  ]
);

console.log("hooray!");

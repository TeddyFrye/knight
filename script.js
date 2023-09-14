class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

class Tree {
  constructor(arr) {
    arr = [...new Set(arr)]; // Remove duplicates
    arr.sort((a, b) => a - b); // Sort the array
    this.root = this.buildTree(arr);
  }

  buildTree(arr) {
    if (!arr.length) return null;

    let mid = Math.floor(arr.length / 2);
    let root = new Node(arr[mid]);

    root.left = this.buildTree(arr.slice(0, mid));
    root.right = this.buildTree(arr.slice(mid + 1));

    return root;
  }

  insert(value) {
    const newNode = new Node(value);

    if (this.root === null) {
      this.root = newNode;
      return;
    }
    let current = this.root;
    while (true) {
      if (value < current.data) {
        if (current.left === null) {
          current.left = newNode;
          return;
        }
        current = current.left;
      } else if (value > current.data) {
        if (current.right === null) {
          current.right = newNode;
          return;
        }
        current = current.right;
      } else {
        return;
      }
    }
  }
  delete(value) {
    this.root = this.deleteNode(this.root, value);
  }
  _deleteNode(node, key) {
    if (node === null) return node; //if the tree is empty
    if (key < node.data) {
      //if the key to be deleted is smaller than the root's key
      node.left = this.deleteNode(node.left, key);
      return node;
    }
    if (key > node.data) {
      //if the key to be deleted is greater than the root's key
      node.right = this.deleteNode(node.right, key);
      return node;
    }
    //if key is same as root's key, then this is the node to be deleted

    //node with only one child or no child
    if (node.left === null) return node.right;
    if (node.right === null) return node.left;

    //node with two children
    //Get the smallest value in the right subtree, set it as current node, and delete the value in the right subtree
    node.data = this._findMinNode(node.right).data;
    node.right = this._deleteNode(node.right, node.data);
    return node;
  }
  _findMinNode(node) {
    if (node.left === null) return node;
    else return this._findMinNode(node.left);
  }
  find(value) {
    let currentNode = this.root;

    while (currentNode) {
      if (value === currentNode.data) {
        return currentNode; //Found the node
      } else if (value < currentNode.data) {
        currentNode = currentNode.left; //Go left
      } else {
        currentNode = currentNode.right; //Go right
      }
    }
    return null; //If we get here, we didn't find it
  }
  levelOrder(fn) {
    if (!this.root) return []; //If the tree is empty, return an empty array

    let result = [];
    let queue = [this.root]; //Start with the root node

    function processQueue(queue) {
      if (!queue.length) return; //If the queue is empty, we're done

      let currentNode = queue.shift();

      if (fn) {
        //If a function was passed in, call it on the node
        fn(currentNode);
      } else {
        result.push(currentNode.data); //Otherwise, just push the value into the array
      }

      if (currentNode.left) queue.push(currentNode.left); //Add the left and right children to the queue
      if (currentNode.right) queue.push(currentNode.right); //They will be processed in the next iteration of the loop

      processQueue(queue);
    }

    processQueue(queue); //Start the loop

    return fn ? undefined : result; //If a function was passed in, return undefined
  }
}

let values = [
  [0, 0],
  [0, 1],
  [0, 2],
  [0, 3],
  [0, 4],
  [0, 5],
  [0, 6],
  [1, 0],
  [1, 1],
  [1, 2],
  [1, 3],
  [1, 4],
  [1, 5],
  [1, 6],
  [2, 0],
  [2, 1],
  [2, 2],
  [2, 3],
  [2, 4],
  [2, 5],
  [2, 6],
  [3, 0],
  [3, 1],
  [3, 2],
  [3, 3],
  [3, 4],
  [3, 5],
  [3, 6],
  [4, 0],
  [4, 1],
  [4, 2],
  [4, 3],
  [4, 4],
  [4, 5],
  [4, 6],
  [5, 0],
  [5, 1],
  [5, 2],
  [5, 3],
  [5, 4],
  [5, 5],
  [5, 6],
  [6, 0],
  [6, 1],
  [6, 2],
  [6, 3],
  [6, 4],
  [6, 5],
  [6, 6],
];
let bst = new Tree(values);
bst.insert(5);

console.log(bst.root);

// Function that will console.log the tree in a structured format
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

prettyPrint(bst.root);

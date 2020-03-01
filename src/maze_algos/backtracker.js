export function BackTrack(grid, start, end) {
  //   console.log(start);
  //   console.log(end);
  //console.log(grid);
  for (const row in grid) {
    for (const ind in grid[row]) {
      grid[row][ind].visited = false;
    }
  }
  const stack = [];
  const path = [];
  let current = start;
  stack.push(start);
  while (stack.length != 0) {
    //console.log("loop");
    current.visited = true;
    const neighbs = GetUnvisitedNeighbours(current, grid);
    const nextNode = GetPossibleNode(grid, neighbs);
    if (nextNode != null) {
      path.push(nextNode);
      stack.push(nextNode);
      current = nextNode;
      console.log("pushing");
    } else {
      current = stack.pop();
      console.log("poping");
    }
  }
  //console.log(path);

  const walls = [];
  for (const row in grid) {
    for (const ind in grid[row]) {
      if (!path.includes(grid[row][ind])) {
        walls.push(grid[row][ind]);
      }
    }
  }
  console.log(walls);
  return walls;
}
function GetPossibleNode(grid, neighbs) {
  const nodeList = [];
  for (const n in neighbs) {
    if (GetUnvisitedNeighbours(neighbs[n], grid).length > 2) {
      nodeList.push(neighbs[n]);
    }
  }
  return nodeList[Math.floor(Math.random() * nodeList.length)];
}

function GetUnvisitedNeighbours(node, grid) {
  //console.log(node);
  const neighbs = [];
  const row = node.row;
  const col = node.col;
  if (row !== 0) {
    if (
      grid[row - 1][col].visited === false &&
      grid[row - 1][col].isWall === false
    ) {
      neighbs.push(grid[row - 1][col]);
    }
    //console.log(grid[row - 1][col].visited === false);
  }
  if (col !== 0) {
    if (
      grid[row][col - 1].visited === false &&
      grid[row][col - 1].isWall === false
    ) {
      neighbs.push(grid[row][col - 1]);
    }
  }
  if (row !== 20) {
    if (
      grid[row + 1][col].visited === false &&
      grid[row + 1][col].isWall === false
    ) {
      //console.log("adding neighbours");
      neighbs.push(grid[row + 1][col]);
    }
  }
  if (col !== 40) {
    if (
      grid[row][col + 1].visited === false &&
      grid[row][col + 1].isWall === false
    ) {
      neighbs.push(grid[row][col + 1]);
    }
  }

  return neighbs;
}
function compareNodes(node1, node2) {
  if (node1.seen && !node2.seen) return -1;
  if (!node1.seen && node2.seen) return 1;

  return 0;
}

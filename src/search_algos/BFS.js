export function BFS(grid, start, end) {
  // console.log(start);
  //console.log(end);

  const toVisit = [];
  const vstd = [];
  let i = 0;
  let currentNode = start;
  while (currentNode !== end) {
    let neighbs = GetUnvisitedNeighbours(currentNode, grid);
    console.log(neighbs);

    for (let child in neighbs) {
      // console.log(neighbs[child]);
      if (!toVisit.includes(neighbs[child])) {
        toVisit.push(neighbs[child]);
      }
    }
    console.log(toVisit);
    currentNode.visited = true;
    grid[currentNode.row][currentNode.col].visited = true;
    vstd.push(currentNode);
    currentNode = toVisit.shift();
    i++;
    if (i > 1000) {
      break;
    }
  }
  // console.log(vstd);
  return vstd;
}

function GetUnvisitedNeighbours(node, grid) {
  const neighbours = [];
  // console.log(node);
  const row = node.row;
  const col = node.col;
  if (row !== 0) {
    if (
      grid[row - 1][col].visited === false &&
      grid[row - 1][col].isWall === false
    ) {
      neighbours.push(grid[row - 1][col]);
    }
    console.log(grid[row - 1][col].visited === false);
  }

  if (row !== 19) {
    if (
      grid[row + 1][col].visited === false &&
      grid[row + 1][col].isWall === false
    ) {
      //console.log("adding neighbours");
      neighbours.push(grid[row + 1][col]);
    }
  }
  if (col !== 0) {
    if (
      grid[row][col - 1].visited === false &&
      grid[row][col - 1].isWall === false
    ) {
      neighbours.push(grid[row][col - 1]);
    }
  }
  if (col !== 39) {
    if (
      grid[row][col + 1].visited === false &&
      grid[row][col + 1].isWall === false
    ) {
      neighbours.push(grid[row][col + 1]);
    }
  }
  return neighbours;
}

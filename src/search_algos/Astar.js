export function Astar(_grid, start, end) {
  // console.log(start);
  const grid = _grid.slice();
  generateHeuristic(grid, end);
  console.log(grid);
  for (const row in grid) {
    for (const ind in grid[row]) {
      grid[row][ind].visited = false;
    }
  }
  const toVisit = [];
  const vstd = [];
  const shortestPath = [];
  let i = 0;
  let currentNode = start;
  while (currentNode !== end) {
    let neighbs = GetUnvisitedNeighbours(currentNode, grid);
    // console.log(neighbs);

    for (let child in neighbs) {
      // console.log(neighbs[child]);

      if (!toVisit.includes(neighbs[child])) {
        neighbs[child].parent = currentNode;
        toVisit.push(neighbs[child]);
      }
    }
    //console.log(toVisit);
    currentNode.visited = true;
    grid[currentNode.row][currentNode.col].visited = true;
    vstd.push(currentNode);
    toVisit.sort(compareEuclidean);
    currentNode = toVisit.shift();
    i++;
    if (i > 1000) {
      break;
    }
  }

  BacktrackShortest(shortestPath, end, start);

  //console.log(shortestPath);
  return { vstd, shortestPath };
}
function BacktrackShortest(path, end, start) {
  let current = end;
  let i = 0;
  while (current !== start && i < 500) {
    //console.log(current);

    path.push(current);
    current = current.parent;
    i++;
  }
  path.push(start);
  path = path.reverse();
  return path;
}
function generateHeuristic(grid, end) {
  for (const row in grid) {
    for (const col in grid[row]) {
      grid[row][col].heuristic = EuclideanDistance(grid[row][col], end);
    }
  }
}
function EuclideanDistance(source, dest) {
  return Math.sqrt(
    Math.pow(dest.row - source.row, 2) + Math.pow(dest.col - source.col, 2)
  );
}
function compareEuclidean(square1, square2) {
  if (square1.heuristic > square2.heuristic) return 1;
  if (square1.heuristic < square2.heuristic) return -1;

  return 0;
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
    //console.log(grid[row - 1][col].visited === false);
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

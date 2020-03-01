export function DFS(grid, start, end) {
  //   console.log(start);
  //   console.log(end);
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
  let found = false;
  while (currentNode !== end) {
    let neighbs = GetUnvisitedNeighbours(currentNode, grid);
    console.log(neighbs);

    for (let child in neighbs) {
      // console.log(neighbs[child]);
      if (neighbs[child] === end) {
        found = true;
      } else if (!neighbs[child].visited) {
        if (!toVisit.includes(neighbs[child])) {
          neighbs[child].parent = currentNode;
        }

        toVisit.push(neighbs[child]);
      }
    }

    //console.log(toVisit);
    if (found) {
      end.parent = currentNode;
      vstd.push(currentNode);
      break;
    } else {
      currentNode.visited = true;
      grid[currentNode.row][currentNode.col].visited = true;
      vstd.push(currentNode);
      currentNode = toVisit.pop();
      i++;
    }

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
function GetUnvisitedNeighbours(node, grid) {
  // console.log(node);
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
  if (col !== 40) {
    if (
      grid[row][col + 1].visited === false &&
      grid[row][col + 1].isWall === false
    ) {
      neighbs.push(grid[row][col + 1]);
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

  return neighbs;
}

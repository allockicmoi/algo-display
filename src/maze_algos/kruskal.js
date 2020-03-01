export function Kruskal(_grid, start, end) {
  const grid = _grid.slice();
  let walls = [];
  // console.log(walls.length);
  let sets = [];

  let max_iter = 0;
  InitializeGrid(grid, start, end, sets, walls);

  while (sets.length > 1 && max_iter < 1000) {
    let index = Math.floor(Math.random() * walls.length);

    const wall = walls[index];

    if (ValidHorizontalWall(walls, index)) {
      const set1 = findContainingSet(sets, grid[wall.row][wall.col - 1]);
      const set2 = findContainingSet(sets, grid[wall.row][wall.col + 1]);

      if (set1 !== set2 && set1 !== -1 && set2 !== -1) {
        walls.splice(index, 1);
        for (let elem of sets[set1]) {
          sets[set2].add(elem);
        }
        sets.splice(set1, 1);
      }
    } else if (ValidVerticalWall(walls, index)) {
      const set1 = findContainingSet(sets, grid[wall.row - 1][wall.col]);
      const set2 = findContainingSet(sets, grid[wall.row + 1][wall.col]);

      if (set1 !== set2 && set1 !== -1 && set2 !== -1) {
        walls.splice(index, 1);

        for (let elem of sets[set1]) {
          sets[set2].add(elem);
        }
        sets.splice(set1, 1);
      }
    }
    max_iter++;
    //console.log(sets.length);
  }

  return walls;
}
function ValidHorizontalWall(walls, index) {
  return (
    walls[index].col % 2 === 0 &&
    walls[index].col !== 0 &&
    walls[index].col !== 40
  );
}
function ValidVerticalWall(walls, index) {
  return (
    walls[index].row % 2 === 0 &&
    walls[index].row !== 0 &&
    walls[index].row !== 20
  );
}

function InitializeGrid(grid, start, end, sets, walls) {
  for (const row in grid) {
    for (const col in grid[row]) {
      if (
        (row % 2 === 1 && col % 2 === 1) ||
        grid[row][col] === start ||
        grid[row][col] === end
      ) {
        const set = new Set();
        set.add(grid[row][col]);
        sets.push(set);
      } else {
        walls.push(grid[row][col]);
      }
    }
  }
}

function findContainingSet(sets, elem) {
  //   console.log(elem);
  //   console.log(sets);

  for (const set in sets) {
    //console.log(sets[set]);
    if (sets[set].has(elem)) {
      return set;
    }
  }
  return -1;
}

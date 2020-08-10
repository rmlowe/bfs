import React from 'react';
import './App.css';
import Row from './Row';

const GRID_SIZE = 10;

const initState = () => {
  const blocks = new Array(GRID_SIZE).fill(false).map(() => new Array(GRID_SIZE).fill(false).map(() => Math.random() < 0.5));

  const cheese: [number, number][] = [];
  while (cheese.length < 3) {
    const row = Math.floor(10 * Math.random());
    const col = Math.floor(10 * Math.random());

    if (!cheese.some(([row1, col1]) => row1 === row && col1 === col)) {
      cheese.push([row, col]);
      blocks[row][col] = false;
    }
  }

  const distances = new Array(GRID_SIZE).fill(null).map(() => new Array(GRID_SIZE).fill(null));

  const toVisit: [number, number, number][] = cheese.map(([row, col]) => [row, col, 0]);
  while (toVisit.length) {
    const [row, col, dist] = toVisit.shift()!;

    if (row < 0 || col < 0 || row >= GRID_SIZE || col >= GRID_SIZE || blocks[row][col] || distances[row][col]) {
      continue;
    }

    distances[row][col] = dist;
    toVisit.push([row - 1, col, dist + 1], [row, col - 1, dist + 1], [row, col + 1, dist + 1], [row + 1, col, dist + 1]);
  }

  return { blocks, cheese };
};

class App extends React.Component {
  state = initState();

  render() {
    const cheeseSlicer = (index: number) => this.state.cheese.filter(([row, _]) => row === index).map(([row, col]) => col);
    return (
      <div className="App">
        {this.state.blocks.map((blockRow, index) =>
          <Row key={index} blocks={blockRow} index={index} cheese={cheeseSlicer(index)} />)}
      </div>
    );
  }
}

export default App;

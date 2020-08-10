import React from 'react';
import './App.css';
import Row from './Row';

const GRID_SIZE = 10;

const calculateDistances = (blocks: boolean[][], cheese: [number, number][]): number[][] => {
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

  return distances;
};

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

  const distances = calculateDistances(blocks, cheese);
  return { blocks, cheese, distances, addRemoveCheese: false };
};

class App extends React.Component {
  state = initState();

  toggle = (row: number, col: number) => {
    const blocks = this.state.blocks.map((value, rowIndex) =>
      rowIndex === row ? value.map((value, colIndex) =>
        colIndex === col ? !(this.state.addRemoveCheese || value) : value) : value);
    const cheese = this.state.cheese.filter(([row1, col1]) => row1 !== row || col1 !== col);

    if (cheese.length === this.state.cheese.length && this.state.addRemoveCheese) {
      cheese.push([row, col]);
    }

    const distances = calculateDistances(blocks, cheese);
    this.setState({ blocks, cheese, distances });
  };

  render() {
    const cheeseSlicer = (index: number) => this.state.cheese.filter(([row, _]) => row === index).map(([row, col]) => col);
    return (
      <div className="App">
        {this.state.blocks.map((blockRow, index) =>
          <Row
            key={index}
            blocks={blockRow}
            cheese={cheeseSlicer(index)}
            distances={this.state.distances[index]}
            onClick={colIndex => this.toggle(index, colIndex)}
          />)}
          <div className="btn-group" role="group" aria-label="Basic example">
            <button
              type="button"
              className={'btn btn-secondary' + (this.state.addRemoveCheese ? '' : ' active')}
              onClick={() => this.setState({ addRemoveCheese: false })}
            >
              <i className="fas fa-square"></i> Add/remove blocks
            </button>
            <button
              type="button"
              className={'btn btn-secondary' + (this.state.addRemoveCheese ? ' active' : '')}
              onClick={() => this.setState({ addRemoveCheese: true })}
            >
              <i className="fas fa-cheese"></i> Add/remove cheese
            </button>
          </div>
          <div>
            <p>Tap on grid squares to add or remove blocks.</p>
            <p>When you make a change, we use breadth-first search to recalculate, for each grid square, the shortest distance to
              cheese.</p>
          </div>
      </div>
    );
  }
}

export default App;

import React from 'react';
import './App.css';
import Row from './Row';

const GRID_SIZE = 10;

const randomCoord = () => Math.floor(GRID_SIZE * Math.random());

const randomCoords = (): [number, number] => [randomCoord(), randomCoord()];

const calculateDistances = (blocks: boolean[][], cheese: [number, number][]): number[][] => {
  const distances = new Array(GRID_SIZE).fill(null).map(() => new Array(GRID_SIZE).fill(null));

  const toVisit: [number, number, number][] = cheese.map(([row, col]) => [row, col, 0]);
  while (toVisit.length) {
    const [row, col, dist] = toVisit.shift()!;

    if (row < 0 || col < 0 || row >= GRID_SIZE || col >= GRID_SIZE || blocks[row][col] || distances[row][col] !== null) {
      continue;
    }

    distances[row][col] = dist;
    toVisit.push([row - 1, col, dist + 1], [row, col - 1, dist + 1], [row, col + 1, dist + 1], [row + 1, col, dist + 1]);
  }

  return distances;
};

const containsCoords = (coords: [number, number][], [row, col]: [number, number]) =>
  coords.some(([row1, col1]) => row1 === row && col1 === col)

const initState = () => {
  const blocks = new Array(GRID_SIZE).fill(false).map(() => new Array(GRID_SIZE).fill(false).map(() => Math.random() < 0.5));

  const cheese: [number, number][] = [];
  while (cheese.length < 3) {
    const [row, col] = randomCoords();

    if (!containsCoords(cheese, [row, col])) {
      cheese.push([row, col]);
      blocks[row][col] = false;
    }
  }

  let kiwi = randomCoords();

  while (containsCoords(cheese, kiwi)) {
    kiwi = randomCoords();
  }

  blocks[kiwi[0]][kiwi[1]] = false;
  const distances = calculateDistances(blocks, cheese);
  return { blocks, cheese, distances, addRemoveCheese: false, kiwi, showDistances: false };
};

const moves: [number, number][] = [[-1, 0], [0, -1], [0, 1], [1, 0]];

class App extends React.Component {
  state = initState();

  removeBug = ([row, col]: [number, number]) => this.state.cheese.filter(([row1, col1]) => row1 !== row || col1 !== col);

  toggle = (row: number, col: number) => {
    if (row !== this.state.kiwi[0] || col !== this.state.kiwi[1]) {
      const blocks = this.state.blocks.map((value, rowIndex) =>
        rowIndex === row ? value.map((value, colIndex) =>
          colIndex === col ? !(this.state.addRemoveCheese || value) : value) : value);
      const cheese = this.removeBug([row, col]);

      if (cheese.length === this.state.cheese.length && this.state.addRemoveCheese) {
        cheese.push([row, col]);
      }

      const distances = calculateDistances(blocks, cheese);
      this.setState({ blocks, cheese, distances });
    }
  };

  componentDidMount() {
    const getValidMoves = (): [[number, number], number][] => {
      const { kiwi } = this.state;
      const callback = ([dRow, dCol]: [number, number]): [[number, number], number][] => {
        const row = kiwi[0] + dRow;
        const col = kiwi[1] + dCol;

        if (row < 0 || row >= GRID_SIZE || col < 0 || col >= GRID_SIZE) {
          return [];
        } else {
          const dist = this.state.distances[row][col];
          return dist !== null ? [[[row, col], dist]] : [];
        }
      };
      return moves.flatMap(callback);
    };

    const getBestMoves = () => {
      const validMoves = getValidMoves();

      if (validMoves.length) {
        const minDist = Math.min(...validMoves.map(([coord, dist]) => dist));
        return validMoves.flatMap(([coord, dist]) => dist === minDist ? [coord] : []);
      } else {
        return [];
      }
    };

    const moveKiwi = () => {
      const bestMoves = getBestMoves();

      if (bestMoves.length) {
        const move = bestMoves[Math.floor(bestMoves.length * Math.random())];
        const bugs = this.removeBug(move);
        this.setState({
          kiwi: move,
          cheese: bugs,
          distances: calculateDistances(this.state.blocks, bugs)
        });
      }

      setTimeout(moveKiwi, 500);
    };

    setTimeout(moveKiwi, 500);
  }

  render() {
    const cheeseSlicer = (index: number) => this.state.cheese.filter(([row, _]) => row === index).map(([row, col]) => col);
    return (
      <div className="App">
        {this.state.blocks.map((blockRow, index) =>
          <Row
            key={index}
            blocks={blockRow}
            cheese={cheeseSlicer(index)}
            distances={this.state.showDistances ? this.state.distances[index] : new Array(GRID_SIZE)}
            onClick={colIndex => this.toggle(index, colIndex)}
            kiwi={this.state.kiwi[0] === index ? [this.state.kiwi[1]] : []}
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
            <i className="fas fa-bug"></i> Add/remove bugs
            </button>
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            value=""
            id="showDistances"
            checked={this.state.showDistances}
            onChange={() => this.setState({ showDistances: !this.state.showDistances })}
          />
          <label className="form-check-label" htmlFor="showDistances">
            Show distances
          </label>
        </div>
        <div>
          <p>Tap on grid squares to add or remove {this.state.addRemoveCheese ? 'bugs' : 'blocks'}.</p>
          <p>When you make a change, we use breadth-first search to recalculate, for each grid square, the fewest moves needed to
            reach a bug.</p>
            <p>On each turn, the kiwi moves to the adjacent square with the shortest distance to a bug.</p>
        </div>
      </div>
    );
  }
}

export default App;

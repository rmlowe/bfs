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

    if (!cheese.filter(([row1, col1]) => row1 === row && col1 === col).length) {
      cheese.push([row, col]);
      blocks[row][col] = false;
    }
  }

  console.log(cheese);
  return { blocks, cheese };
};

class App extends React.Component {
  state = initState();

  render() {
    return (
      <div className="App">
        {this.state.blocks.map((row, index) => <Row key={index} blocks={row} index={index} cheese={this.state.cheese} />)}
      </div>
    );
  }
}

export default App;

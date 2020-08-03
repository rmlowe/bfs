import React from 'react';
import './App.css';
import Row from './Row';

const GRID_SIZE = 10;

const createGrid = () => {
  return new Array(GRID_SIZE).fill(false).map(() => new Array(GRID_SIZE).fill(false).map(() => Math.random() < 0.5));
};

class App extends React.Component {
  state = {
    blocks: createGrid()
  }

  render() {
    return (
      <div className="App">
        {this.state.blocks.map((row, index) => <Row key={index} blocks={row} />)}
      </div>
    );
  }
}

export default App;

import React from 'react';
import Cell from './Cell';

export interface Props {
    blocks: boolean[];
    index: number;
    cheese: [number, number][];
}

const row = ({ blocks, index, cheese }: Props) =>
    <>{blocks.map((block, colIndex) => <Cell key={colIndex} block={block} cheese={cheese.filter(([row, col]) => row === index && col === colIndex).length > 0} />)}</>;

export default row;
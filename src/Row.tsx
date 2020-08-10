import React from 'react';
import Cell from './Cell';

export interface Props {
    blocks: boolean[];
    cheese: number[];
    distances: number[];
}

const row = ({ blocks, cheese, distances }: Props) =>
    <>{blocks.map((block, colIndex) =>
        <Cell key={colIndex} block={block} cheese={cheese.includes(colIndex)} distance={distances[colIndex]} />)}</>;

export default row;
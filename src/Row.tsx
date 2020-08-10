import React from 'react';
import Cell from './Cell';

export interface Props {
    blocks: boolean[];
    index: number;
    cheese: number[];
}

const row = ({ blocks, index, cheese }: Props) =>
    <>{blocks.map((block, colIndex) => <Cell key={colIndex} block={block} cheese={cheese.includes(colIndex)} />)}</>;

export default row;
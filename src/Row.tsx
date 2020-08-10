import React from 'react';
import Cell from './Cell';

export interface Props {
    blocks: boolean[];
    cheese: number[];
    distances: number[];
    onClick: (index: number) => void;
}

const row = ({ blocks, cheese, distances, onClick }: Props) =>
    <>{blocks.map((block, colIndex) =>
        <Cell
            key={colIndex}
            block={block}
            cheese={cheese.includes(colIndex)}
            distance={distances[colIndex]}
            onClick={() => onClick(colIndex)}
        />)}</>;

export default row;
import React from 'react';
import Cell from './Cell';

export interface Props {
    blocks: boolean[];
    cheese: number[];
    distances: number[];
    onClick: (index: number) => void;
    kiwi: number[]
}

const row = ({ blocks, cheese, distances, onClick, kiwi }: Props) =>
    <>{blocks.map((block, colIndex) =>
        <Cell
            key={colIndex}
            block={block}
            cheese={cheese.includes(colIndex)}
            distance={distances[colIndex]}
            onClick={() => onClick(colIndex)}
            kiwi={kiwi.includes(colIndex)}
        />)}</>;

export default row;
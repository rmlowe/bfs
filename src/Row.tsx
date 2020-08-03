import React from 'react';
import Cell from './Cell';

export interface Props {
    blocks: boolean[];
}

const row = ({ blocks }: Props) => <>{blocks.map((block, index) => <Cell key={index} block={block} />)}</>;

export default row;
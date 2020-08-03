import React from 'react';

export interface Props {
    block: boolean;
}

const cell = ({ block }: Props) =>
    <div className="square">
        <div className={block ? 'content block' : 'content'}>
            <div className="table">
                <div className="table-cell" />
            </div>
        </div>
    </div>;

export default cell;
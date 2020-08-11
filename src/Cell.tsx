import React from 'react';

export interface Props {
    block: boolean;
    cheese: boolean;
    distance: number;
    onClick: () => void;
}

const cell = ({ block, cheese, distance, onClick }: Props) =>
    <div className="square">
        <div className={block ? 'content block' : 'content'} onClick={onClick} >
            <div className="my-table">
                <div className="my-table-cell" style={{ color: 'Gray' }}>
                    {cheese ? <i className="fas fa-bug"></i> : distance}
                </div>
            </div>
        </div>
    </div>;

export default cell;
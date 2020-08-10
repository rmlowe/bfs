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
            <div className="table">
                <div className="table-cell" style={{ color: 'Gray' }}>
                    {cheese ? <i style={{ color: 'DarkOrange' }} className="fas fa-cheese"></i> : distance}
                </div>
            </div>
        </div>
    </div>;

export default cell;
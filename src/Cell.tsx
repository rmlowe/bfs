import React from 'react';

export interface Props {
    block: boolean;
    cheese: boolean;
    distance: number;
    onClick: () => void;
    kiwi: boolean;
}

const cell = ({ block, cheese, distance, onClick, kiwi }: Props) =>
    <div className="square">
        <div className={block ? 'content block' : 'content'} onClick={onClick} >
            <div className="my-table">
                <div className="my-table-cell" style={{ color: 'Gray' }}>
                    {kiwi ? <i className="fas fa-kiwi-bird" style={{ color: 'Brown' }}></i>
                        : cheese ? <i className="fas fa-bug" style={{ color: 'DarkRed' }}></i> : distance}
                </div>
            </div>
        </div>
    </div>;

export default cell;
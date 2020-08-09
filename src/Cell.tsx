import React from 'react';

export interface Props {
    block: boolean;
    cheese: boolean;
}

const cell = ({ block, cheese }: Props) =>
    <div className="square">
        <div className={block ? 'content block' : 'content'}>
            <div className="table">
                <div className="table-cell">
                    {cheese ? <i style={{ color: 'DarkOrange' }} className="fas fa-cheese"></i> : null}
                </div>
            </div>
        </div>
    </div>;

export default cell;
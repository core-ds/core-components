import React from 'react';
import { Status, colors } from '@alfalab/core-components-status';
import { Wrapper } from './Wrapper';

const StatusExample = () => {
    return (
        <Wrapper>
            <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                {colors.map(color => (
                    <Status view='soft' color={color} key={color}>
                        Label
                    </Status>
                ))}
            </div>
        </Wrapper>
    );
};

export default StatusExample;

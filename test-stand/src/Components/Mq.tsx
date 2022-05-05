import React from 'react';
import { Mq, useMatchMedia } from '@alfalab/core-components-mq';
import { Button } from '@alfalab/core-components-button';
import { Wrapper } from './Wrapper';

const MqExample = () => {
    const query = '(min-width: 600px)';
    const [matches] = useMatchMedia(query);

    return (
        <React.Fragment>
            <Wrapper>
                <Mq query='--mobile'>
                    <Button>Mobile кнопка</Button>
                </Mq>
                <Mq query='--tablet-s'>
                    <Button>Desktop кнопка</Button>
                </Mq>
            </Wrapper>
            <Wrapper>{`Matches ${query}: ${matches}`}</Wrapper>
        </React.Fragment>
    );
};

export default MqExample;

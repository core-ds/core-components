import React from 'react';
import { Typography, TitleProps } from '@alfalab/core-components-typography';
import { Wrapper } from './Wrapper';

const VIEW_TYPES: Array<TitleProps['view']> = ['xlarge', 'large', 'medium', 'small', 'xsmall'];

const TypographyExample = () => {
    return (
        <Wrapper>
            {VIEW_TYPES.map(view => (
                <Typography.Title view={view} key={view} tag='div'>
                    {view}
                </Typography.Title>
            ))}
        </Wrapper>
    );
};

export default TypographyExample;

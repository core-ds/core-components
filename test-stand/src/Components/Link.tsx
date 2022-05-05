import React from 'react';
import { Space } from '@alfalab/core-components-space';
import { Link } from '@alfalab/core-components-link';
import { Wrapper } from './Wrapper';

const LinkExample = () => {
    return (
        <Wrapper>
            <Space>
                <Link view='primary'>Primary</Link>
                <Link view='secondary'>Secondary</Link>
                <Link view='default'>Default</Link>
            </Space>
        </Wrapper>
    );
};

export default LinkExample;

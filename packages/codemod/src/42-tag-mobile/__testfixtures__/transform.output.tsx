/* eslint-disable */
import React from 'react';

import { Tag } from '@balafla/core-components/tag';

const noop = () => {};

export const Component = () => {
    return (
        <React.Fragment>
            <Tag view='filled' shape='rectangular' />
            <Tag view='filled' shape='rectangular' />
            <Tag shape='rectangular' view='filled' />
            <Tag view='filled' shape='rectangular' />
        </React.Fragment>
    );
};

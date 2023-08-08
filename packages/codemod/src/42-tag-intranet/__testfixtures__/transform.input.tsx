/* eslint-disable */
import React from 'react';

import { Tag } from '@alfalab/core-components/tag';

const noop = () => {};

export const Component = () => {
    return (
        <React.Fragment>
            <Tag />
            <Tag view='outlined' />
            <Tag shape='rounded' />
            <Tag view='outlined' shape='rounded' />
        </React.Fragment>
    );
};

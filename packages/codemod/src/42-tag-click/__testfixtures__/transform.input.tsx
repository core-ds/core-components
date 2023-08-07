/* eslint-disable */
import React from 'react';

import { Tag } from '@alfalab/core-components/tag';

const noop = () => {};

export const Component = () => {
    return (
        <React.Fragment>
            <Tag view='outlined' />
            <Tag />
        </React.Fragment>
    );
};

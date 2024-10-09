import React from 'react';

import { Spinner } from '@alfalab/core-components/spinner';

export const Component = () => {
    const someProps = { size: 48 };

    return (
        <React.Fragment>
            <Spinner size='xs' />
            <Spinner size='s' />
            <Spinner size='m' />
            <Spinner size={16} />
            <Spinner size={24} />
            <Spinner size={48} />
            <Spinner visible={true} />
            <Spinner {...someProps} />
        </React.Fragment>
    );
};

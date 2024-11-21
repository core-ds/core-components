import React from 'react';

import { Spinner } from '@alfalab/core-components/spinner';

export const Component = () => {
    const someProps = { size: 48 };

    return (
        <React.Fragment>
            <Spinner preset={16} />
            <Spinner preset={24} />
            <Spinner preset={48} />
            <Spinner preset={16} />
            <Spinner preset={24} />
            <Spinner preset={48} />
            <Spinner visible={true} />
            <Spinner {...someProps} />
        </React.Fragment>
    );
};

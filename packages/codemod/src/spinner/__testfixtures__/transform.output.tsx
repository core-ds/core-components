import React from 'react';

import { Spinner } from '@alfalab/core-components-spinner';

export const Component = () => {
    const someProps = { size: 48 };

    return (
        <React.Fragment>
            <Spinner.Preset preset={16} />
            <Spinner.Preset preset={24} />
            <Spinner.Preset preset={48} />
            <Spinner.Preset preset={16} />
            <Spinner.Preset preset={24} />
            <Spinner.Preset preset={48} />
            <Spinner.Preset visible={true} />
            <Spinner.Preset {...someProps} />
        </React.Fragment>
    );
};

import React from 'react';

import { SpinnerPreset } from '@alfalab/core-components/spinner/preset';

export const Component = () => {
    const someProps = { size: 48 };

    return (
        <React.Fragment>
            <SpinnerPreset preset={16} />
            <SpinnerPreset preset={24} />
            <SpinnerPreset preset={48} />
            <SpinnerPreset preset={16} />
            <SpinnerPreset preset={24} />
            <SpinnerPreset preset={48} />
            <SpinnerPreset visible={true} />
            <SpinnerPreset {...someProps} />
        </React.Fragment>
    );
};

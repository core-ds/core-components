import React, { FC, useContext } from 'react';

import { ResponsiveContext } from '../ResponsiveContext';

export function createResponsive(desktop: FC, mobile: FC) {
    // eslint-disable-next-line
    function ResponsiveComponent(props: any) {
        const { view = 'desktop' } = useContext(ResponsiveContext) || {};

        const Component = view === 'desktop' ? desktop : mobile;

        return <Component {...props} />;
    }

    return ResponsiveComponent;
}

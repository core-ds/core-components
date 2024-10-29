import React, { ComponentProps, FC, useContext } from 'react';

import { ResponsiveContext } from '../ResponsiveContext';

export function createResponsive(desktop: FC, mobile: FC) {
    function ResponsiveComponent(props: ComponentProps<typeof desktop | typeof mobile>) {
        const { view = 'desktop' } = useContext(ResponsiveContext) || {};

        const Component = view === 'desktop' ? desktop : mobile;

        return <Component {...props} />;
    }

    return ResponsiveComponent;
}

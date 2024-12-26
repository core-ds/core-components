import React from 'react';

import { useIsDesktop } from '@alfalab/core-components-mq';

import { Caption } from './components/caption';
import { Controls } from './components/controls';
import { Graphic } from './components/graphic';
import { Subtitle } from './components/subtitle';
import { Title } from './components/title';
import { SystemMessage } from './Component';
import type { SystemMessageResponsiveProps } from './types';
import { createCompound } from './utils';

const SystemMessageResponsiveComponent: React.FC<SystemMessageResponsiveProps> = ({
    breakpoint,
    client,
    defaultMatchMediaValue = client === undefined ? undefined : client === 'desktop',
    children,
    ...restProps
}) => {
    const isDesktop = useIsDesktop(breakpoint, defaultMatchMediaValue);

    return (
        <SystemMessage {...restProps} view={isDesktop ? 'desktop' : 'mobile'}>
            {children}
        </SystemMessage>
    );
};

export const SystemMessageResponsive = createCompound(SystemMessageResponsiveComponent);

export {
    SystemMessageResponsiveComponent as SystemMessageComponent,
    Caption as SystemMessageCaption,
    Controls as SystemMessageControls,
    Graphic as SystemMessageGraphic,
    Subtitle as SystemMessageSubtitle,
    Title as SystemMessageTitle,
};

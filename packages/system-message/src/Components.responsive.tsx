import React from 'react';

import { useMatchMedia } from '@alfalab/core-components-mq';
import { isClient } from '@alfalab/core-components-shared';

import { SystemMessage } from './Component';
import type { SystemMessageResponsiveProps } from './types';
import { createCompound } from './utils';

const SystemMessageResponsiveComponent: React.FC<SystemMessageResponsiveProps> = ({
    breakpoint = 1024,
    defaultMatchMediaValue,
    children,
    ...restProps
}) => {
    const query = `(min-width: ${breakpoint}px)`;
    const getDefaultValue = () => (isClient() ? window.matchMedia(query).matches : false);

    const [isDesktop] = useMatchMedia(query, defaultMatchMediaValue ?? getDefaultValue);

    return (
        <SystemMessage {...restProps} view={isDesktop ? 'desktop' : 'mobile'}>
            {children}
        </SystemMessage>
    );
};

export const SystemMessageResponsive = createCompound(SystemMessageResponsiveComponent);

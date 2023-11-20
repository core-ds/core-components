import React from 'react';

import { SystemMessage } from '../Component';
import type { SystemMessageDesktopProps } from '../types';
import { createCompound } from '../utils';

const SystemMessageDesktopComponent: React.FC<SystemMessageDesktopProps> = ({
    children,
    ...restProps
}) => (
    <SystemMessage {...restProps} view='desktop'>
        {children}
    </SystemMessage>
);

export const SystemMessageDesktop = createCompound(SystemMessageDesktopComponent);

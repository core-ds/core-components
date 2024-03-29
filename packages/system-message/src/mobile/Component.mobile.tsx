import React from 'react';

import { SystemMessage } from '../Component';
import type { SystemMessageMobileProps } from '../types';
import { createCompound } from '../utils';

const SystemMessageMobileComponent: React.FC<SystemMessageMobileProps> = ({
    children,
    ...restProps
}) => (
    <SystemMessage {...restProps} view='mobile'>
        {children}
    </SystemMessage>
);

export const SystemMessageMobile = createCompound(SystemMessageMobileComponent);

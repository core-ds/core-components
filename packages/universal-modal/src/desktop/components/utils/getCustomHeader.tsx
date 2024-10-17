import React, { ReactNode } from 'react';

import { ModalByCenterProps } from '../../types/props';

import { getHeaderPresetComponent } from './getHeaderPresetComponent';

export const getComponentHeader = (preset: ModalByCenterProps['preset'], header: ReactNode) => {
    if (preset) {
        return getHeaderPresetComponent(preset);
    }

    if (header) {
        return <div>{header}</div>;
    }

    return null;
};

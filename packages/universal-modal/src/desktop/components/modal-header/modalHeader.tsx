import React, { FC, ReactNode } from 'react';

import { ModalByCenterProps } from '../../types/props';
import { HeaderPreset } from '../modal-header-preset/headerPreset';

type ModalHeaderProps = {
    preset: ModalByCenterProps['preset'];
    header: ReactNode;
    scrollPosition: number;
    width: number;
};

export const ModalHeader: FC<ModalHeaderProps> = (props) => {
    const { preset, header, scrollPosition, width } = props;

    if (preset) {
        return <HeaderPreset preset={preset} scrollPosition={scrollPosition} width={width} />;
    }

    if (header) {
        return <div>{header}</div>;
    }

    return null;
};

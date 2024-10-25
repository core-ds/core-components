import React, { FC, ReactNode } from 'react';

import { TModalFooterPreset } from '../../types/typings';
import { ModalFooterPreset } from '../modal-footer-preset/modalFooterPreset';

type ModalCustomFooterProps = {
    preset: TModalFooterPreset['footerPreset'];
    footer: ReactNode;
    scrollPosition: number;
    width: number;
};

export const ModalCustomFooter: FC<ModalCustomFooterProps> = (props) => {
    const { preset, footer, scrollPosition, width } = props;

    if (preset) {
        return <ModalFooterPreset preset={preset} scrollPosition={scrollPosition} width={width} />;
    }

    if (footer) {
        return <div>{footer}</div>;
    }

    return null;
};

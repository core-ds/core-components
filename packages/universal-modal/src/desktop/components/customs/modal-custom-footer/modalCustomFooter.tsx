import React, { FC } from 'react';

import { TModalFooterPreset } from '../../../types/typings';
import { ModalFooterPreset } from '../../presets/modal-footer-preset/modalFooterPreset';

type ModalCustomFooterProps = {
    preset: TModalFooterPreset['footerPreset'];
    scrollPosition: number;
    width: number;
};

export const ModalCustomFooter: FC<ModalCustomFooterProps> = (props) => {
    const { preset, scrollPosition, width } = props;

    if (preset) {
        return <ModalFooterPreset preset={preset} scrollPosition={scrollPosition} width={width} />;
    }

    return null;
};

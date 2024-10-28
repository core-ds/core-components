import React, { FC } from 'react';

import { TModalFooterPresetMobile } from '../../../types/typings';
import { ModalFooterPresetMobile } from '../../presets/modal-footer-preset/modalFooterPreset';

type ModalFooterProps = {
    preset: TModalFooterPresetMobile['footerPreset'];
    hasScroll: boolean;
};

export const ModalCustomFooterMobile: FC<ModalFooterProps> = (props) => {
    const { preset, hasScroll } = props;

    if (preset) {
        return <ModalFooterPresetMobile preset={preset} hasScroll={hasScroll} />;
    }

    return null;
};

import React, { FC } from 'react';

import { TModalFooterPresetMobile } from '../../../types/typings';
import { ModalFooterPresetMobile } from '../../presets/modal-footer-preset/modalFooterPreset';

type ModalFooterProps = {
    preset: TModalFooterPresetMobile['footerPreset'];
};

export const ModalCustomFooterMobile: FC<ModalFooterProps> = (props) => {
    const { preset } = props;

    if (preset) {
        return <ModalFooterPresetMobile preset={preset} />;
    }

    return null;
};

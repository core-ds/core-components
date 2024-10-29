import React, { FC } from 'react';

import { TModalHeaderPresetMobile } from '../../../types/typings';
import { ModalHeaderPresetMobile } from '../../presets/modal-header-preset/modalHeaderPreset';

type ModalHeaderProps = {
    preset: TModalHeaderPresetMobile['preset'];
    onClose?: () => void;
};

export const ModalCustomHeaderMobile: FC<ModalHeaderProps> = (props) => {
    const { preset, onClose } = props;

    if (preset) {
        return <ModalHeaderPresetMobile preset={preset} onClose={onClose} />;
    }

    return null;
};

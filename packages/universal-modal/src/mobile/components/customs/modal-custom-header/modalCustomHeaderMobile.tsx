import React, { FC } from 'react';

import { TModalHeaderPresetMobile } from '../../../types/typings';
import { ModalHeaderPresetMobile } from '../../presets/modal-header-preset/modalHeaderPreset';

type ModalHeaderProps = {
    preset: TModalHeaderPresetMobile['preset'];
    hasScroll: boolean;
    onClose?: () => void;
};

export const ModalCustomHeaderMobile: FC<ModalHeaderProps> = (props) => {
    const { preset, hasScroll, onClose } = props;

    if (preset) {
        return <ModalHeaderPresetMobile preset={preset} hasScroll={hasScroll} onClose={onClose} />;
    }

    return null;
};

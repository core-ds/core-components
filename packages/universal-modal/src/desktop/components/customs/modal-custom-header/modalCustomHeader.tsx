import React, { FC } from 'react';

import { TModalHeaderPreset } from '../../../types/typings';
import { ModalHeaderPreset } from '../../presets/modal-header-preset/modalHeaderPreset';

type ModalCustomHeaderProps = {
    preset: TModalHeaderPreset['preset'];
    onClose?: () => void;
};

export const ModalCustomHeader: FC<ModalCustomHeaderProps> = (props) => {
    const { preset, onClose } = props;

    if (preset) {
        return <ModalHeaderPreset preset={preset} onClose={onClose} />;
    }

    return null;
};

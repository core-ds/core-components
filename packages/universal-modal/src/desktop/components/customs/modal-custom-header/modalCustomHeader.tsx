import React, { FC } from 'react';

import { TModalHeaderPreset } from '../../../types/typings';
import { ModalHeaderPreset } from '../../presets/modal-header-preset/modalHeaderPreset';

type ModalCustomHeaderProps = {
    preset: TModalHeaderPreset['preset'];
    scrollPosition: number;
    width: number;
    onClose?: () => void;
};

export const ModalCustomHeader: FC<ModalCustomHeaderProps> = (props) => {
    const { preset, scrollPosition, width, onClose } = props;

    if (preset) {
        return (
            <ModalHeaderPreset
                preset={preset}
                scrollPosition={scrollPosition}
                width={width}
                onClose={onClose}
            />
        );
    }

    return null;
};

import React, { FC, ReactNode } from 'react';

import { TModalHeaderPresetMobile } from '../../types/typings';
import { ModalHeaderPresetMobile } from '../modal-header-preset/modalHeaderPreset';

type ModalHeaderProps = {
    preset: TModalHeaderPresetMobile['preset'];
    header: ReactNode;
    hasScroll: boolean;
    onClose?: () => void;
};

export const ModalCustomHeaderMobile: FC<ModalHeaderProps> = (props) => {
    const { preset, header, hasScroll, onClose } = props;

    if (preset) {
        return <ModalHeaderPresetMobile preset={preset} hasScroll={hasScroll} onClose={onClose} />;
    }

    if (header) {
        return <div>{header}</div>;
    }

    return null;
};

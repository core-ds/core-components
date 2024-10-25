import React, { FC, ReactNode } from 'react';

import { TModalHeaderPreset } from '../../types/typings';
import { ModalHeaderPreset } from '../modal-header-preset/modalHeaderPreset';

type ModalCustomHeaderProps = {
    preset: TModalHeaderPreset['preset'];
    header: ReactNode;
    scrollPosition: number;
    width: number;
    onClose?: () => void;
};

export const ModalCustomHeader: FC<ModalCustomHeaderProps> = (props) => {
    const { preset, header, scrollPosition, width, onClose } = props;

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

    if (header) {
        return <div>{header}</div>;
    }

    return null;
};

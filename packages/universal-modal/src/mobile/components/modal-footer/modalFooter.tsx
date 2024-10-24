import React, { FC, ReactNode } from 'react';

import { TModalFooterPresetMobile } from '../../types/typings';
import { ModalFooterPresetMobile } from '../modal-footer-preset/modalFooterPreset';

type ModalFooterProps = {
    preset: TModalFooterPresetMobile['footerPreset'];
    footer: ReactNode;
    hasScroll: boolean;
};

export const ModalFooterMobile: FC<ModalFooterProps> = (props) => {
    const { preset, footer, hasScroll } = props;

    if (preset) {
        return <ModalFooterPresetMobile preset={preset} hasScroll={hasScroll} />;
    }

    if (footer) {
        return <div>{footer}</div>;
    }

    return null;
};

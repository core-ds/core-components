import React, { FC } from 'react';

import { TModalFooterPreset } from '../../../types/typings';
import { ModalFooterPreset } from '../../presets/modal-footer-preset/modalFooterPreset';

type ModalCustomFooterProps = {
    preset: TModalFooterPreset['footerPreset'];
};

export const ModalCustomFooter: FC<ModalCustomFooterProps> = (props) => {
    const { preset } = props;

    if (preset) {
        return <ModalFooterPreset preset={preset} />;
    }

    return null;
};

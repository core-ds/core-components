import React, { FC, ReactNode } from 'react';

import { TModalHeaderPresetMobile } from '../../types/typings';
import { ModalHeaderPresetMobile } from '../modal-header-preset/modalHeaderPreset';

type ModalHeaderProps = {
    preset: TModalHeaderPresetMobile['preset'];
    header: ReactNode;
    hiddenTitle: boolean;
};

export const ModalHeaderMobile: FC<ModalHeaderProps> = (props) => {
    const { preset, header, hiddenTitle } = props;

    if (preset) {
        return <ModalHeaderPresetMobile preset={preset} hiddenTitle={hiddenTitle} />;
    }

    if (header) {
        return <div>{header}</div>;
    }

    return null;
};

import { UniversalModalDesktop } from '@alfalab/core-components-universal-modal';

import { PresetTypes } from '../../constants/presetTypes';

type GetHeaderWithTitleProps = {
    title: string;
};

export const getHeaderWithTitle = ({ title }: GetHeaderWithTitleProps) => ({
    preset: {
        type: PresetTypes.HeaderWithTitle,
        component: UniversalModalDesktop.Header,
        title,
    },
});

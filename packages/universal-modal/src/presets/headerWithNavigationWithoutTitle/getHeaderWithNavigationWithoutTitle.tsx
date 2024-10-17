import { UniversalModalDesktop } from '@alfalab/core-components-universal-modal';

import { PresetTypes } from '../../constants/presetTypes';

export const getHeaderWithNavigationWithoutTitle = () => ({
    header: undefined,
    preset: {
        type: PresetTypes.HeaderWithNavigationWithoutTitle,
        component: UniversalModalDesktop.Header,
    },
});

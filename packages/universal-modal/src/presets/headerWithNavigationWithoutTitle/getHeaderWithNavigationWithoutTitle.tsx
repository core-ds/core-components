import { UniversalModalDesktop } from '@alfalab/core-components-universal-modal';

import { PresetTypes } from '../../constants/presetTypes';

export const getHeaderWithNavigationWithoutTitle = () => ({
    preset: {
        type: PresetTypes.HeaderWithNavigationWithoutTitle,
        component: UniversalModalDesktop.Header,
    },
});

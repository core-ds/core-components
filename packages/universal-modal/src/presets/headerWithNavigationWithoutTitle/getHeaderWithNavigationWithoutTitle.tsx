import { PresetTypes } from '../../constants/presetTypes';

export const getHeaderWithNavigationWithoutTitle = () => ({
    header: undefined,
    preset: {
        type: PresetTypes.HeaderWithNavigationWithoutTitle,
    },
});

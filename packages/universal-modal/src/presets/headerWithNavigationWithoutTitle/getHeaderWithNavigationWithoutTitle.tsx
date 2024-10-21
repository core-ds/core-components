import { HeaderPresetTypes } from '../../constants/headerPresetTypes';

export const getHeaderWithNavigationWithoutTitle = () => ({
    header: undefined,
    preset: {
        type: HeaderPresetTypes.HeaderWithNavigationWithoutTitle,
    },
});

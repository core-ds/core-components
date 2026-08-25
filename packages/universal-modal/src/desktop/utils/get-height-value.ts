import { type UniversalModalDesktopProps } from '../types/props';

export const getHeightValue = (
    height: Exclude<UniversalModalDesktopProps['height'], undefined>,
): number | string | undefined => {
    if (height === 'hugContent') {
        return undefined;
    }

    if (height === 'fullHeight') {
        return '100%';
    }

    return height;
};

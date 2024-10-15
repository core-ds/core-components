import { IconButtonProps } from '@alfalab/core-components-icon-button';

export const transformSize = (size: IconButtonProps['size'] = 48) => {
    switch (size) {
        case 'xxs':
            return 24;
        case 'xs':
            return 32;
        case 's':
            return 40;
        default:
            return size;
    }
};

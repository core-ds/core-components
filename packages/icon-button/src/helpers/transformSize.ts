import { type IconButtonProps } from '../Component';

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

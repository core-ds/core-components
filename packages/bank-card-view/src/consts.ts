import { TextProps } from '@alfalab/core-components-typography';

import { ImageProps } from './typings';

export const SIZE_TO_CLASS: Record<string, string> = {
    '16-24': 'size-16-24',
    '32-51': 'size-32-51',
    '40-65': 'size-40-65',
    '48-76': 'size-48-76',
    '96-152': 'size-96-152',
    '128-205': 'size-128-205',
    '164-264': 'size-164-264',
};

export const TYPOGRAPHY_VIEW_FOR_SIZE: Record<string, TextProps['view']> = {
    '16-24': 'secondary-small',
    '32-51': 'secondary-small',
    '40-65': 'secondary-medium',
    '48-76': 'secondary-medium',
    '96-152': 'secondary-medium',
    '128-205': 'primary-small',
    '164-264': 'primary-medium',
};

export const TYPOGRAPHY_COLORS: Record<
    Exclude<ImageProps['colors'], undefined>,
    TextProps['color']
> = {
    default: 'static-primary-dark',
    inverted: 'static-primary-light',
};

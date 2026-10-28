import { type NavigationBarPrivateNextProps } from '@alfalab/core-components-navigation-bar-private/next';

export interface BaseHeaderNextProps {
    closerProps?: Omit<
        NonNullable<NavigationBarPrivateNextProps['closerProps']>,
        'size' | 'buttonClassName'
    >;
    backButtonProps?: Omit<
        NonNullable<NavigationBarPrivateNextProps['backButtonProps']>,
        'icon' | 'size' | 'iconWrapperClassName'
    >;
}

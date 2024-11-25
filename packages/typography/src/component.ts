import { FC, ForwardRefExoticComponent, RefAttributes } from 'react';

import { type TextProps, Text } from './text';
import { type TitleProps, Title } from './title';
import { type TitleDesktopProps, TitleDesktop } from './title-desktop';
import { type TitleMobileProps, TitleMobile } from './title-mobile';
import { type TitleResponsiveProps, TitleResponsive } from './title-responsive';
import type { TextElementType } from './types';

export const Typography: {
    Title: FC<TitleProps>;
    Text: ForwardRefExoticComponent<TextProps & RefAttributes<TextElementType>>;
    TitleResponsive: FC<TitleResponsiveProps>;
    TitleMobile: FC<TitleMobileProps>;
    TitleDesktop: FC<TitleDesktopProps>;
} = {
    Title,
    Text,
    TitleResponsive,
    TitleMobile,
    TitleDesktop,
};

import { type FC, type ForwardRefExoticComponent, type RefAttributes } from 'react';

import { Text, type TextProps } from './text';
import { Title, type TitleProps } from './title';
import { TitleMobile, type TitleMobileProps } from './title-mobile';
import { TitleResponsive, type TitleResponsiveProps } from './title-responsive';
import { type TextElementType } from './types';

export const Typography: {
    Title: FC<TitleProps>;
    Text: ForwardRefExoticComponent<TextProps & RefAttributes<TextElementType>>;
    TitleResponsive: FC<TitleResponsiveProps>;
    TitleMobile: FC<TitleMobileProps>;
} = {
    Title,
    Text,
    TitleResponsive,
    TitleMobile,
};

export { Text, Title as TitleDesktop, TitleResponsive, TitleMobile };

import { FC, ForwardRefExoticComponent, RefAttributes } from 'react';

import { Text, TextProps } from './text';
import { Title, TitleProps } from './title';
import { TitleMobile, TitleMobileProps } from './title-mobile';
import { TitleResponsive, TitleResponsiveProps } from './title-responsive';
import { TextElementType } from './types';

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

export {
    Text as TypographyText,
    Title as TypographyTitle,
    TitleResponsive as TypographyTitleResponsive,
    TitleMobile,
};

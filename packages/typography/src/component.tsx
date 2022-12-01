import { FC, ForwardRefExoticComponent, RefAttributes } from 'react';

import { Text, TextProps } from './text';
import { Title, TitleProps } from './title';
import { TitleMobile, TitleMobileProps } from './title-mobile';
import { TitleResponsive } from './title-responsive';
import { TextElementType } from './types';

export const Typography: {
    Title: FC<TitleProps>;
    Text: ForwardRefExoticComponent<TextProps & RefAttributes<TextElementType>>;
    TitleResponsive: FC<TitleProps>;
    TitleMobile: FC<TitleMobileProps>;
} = {
    Title,
    Text,
    TitleResponsive,
    TitleMobile,
};

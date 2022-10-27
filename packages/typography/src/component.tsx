import { FC } from 'react';

import { Text, TextProps } from './text';
import { Title, TitleProps } from './title';
import { TitleMobile, TitleMobileProps } from './title-mobile';
import { TitleResponsive } from './title-responsive';

export const Typography: {
    Title: FC<TitleProps>;
    Text: FC<TextProps>;
    TitleResponsive: FC<TitleProps>;
    TitleMobile: FC<TitleMobileProps>;
} = {
    Title,
    Text,
    TitleResponsive,
    TitleMobile,
};

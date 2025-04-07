import type { FC, ForwardRefExoticComponent, RefAttributes } from 'react';

import type { TitleProps } from './title/component';
import { type TitleResponsiveProps, TitleResponsive } from './title/component.responsive';
import { Title } from './title/desktop';
import { type TitleMobileProps, TitleMobile } from './title/mobile';
import { type TextProps, Text } from './text';
import type { TextElementType } from './types';

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

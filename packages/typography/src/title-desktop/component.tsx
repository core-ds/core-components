import React, { forwardRef } from 'react';

import { DEFAULT_TITLE_FONT, TitleBase, TitleProps } from '../title-base/component';
import { getDefaultWeight } from '../title-base/utils';

import stylesDesktop from './desktop.module.css';

export const TitleDesktop = forwardRef<HTMLHeadingElement | HTMLDivElement, TitleProps>(
    ({ font = DEFAULT_TITLE_FONT, weight = getDefaultWeight(font, 'desktop'), ...props }, ref) => (
        <TitleBase {...props} font={font} weight={weight} styles={stylesDesktop} ref={ref} />
    ),
);

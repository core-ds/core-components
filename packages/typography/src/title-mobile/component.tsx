import React, { forwardRef } from 'react';

import { DEFAULT_TITLE_FONT, TitleBase, TitleProps } from '../title-base/component';
import { getDefaultWeight } from '../title-base/utils';

import stylesMobile from './mobile.module.css';

export const TitleMobile = forwardRef<HTMLHeadingElement | HTMLDivElement, TitleProps>(
    ({ font = DEFAULT_TITLE_FONT, weight = getDefaultWeight(font, 'mobile'), ...props }, ref) => (
        <TitleBase {...props} font={font} weight={weight} styles={stylesMobile} ref={ref} />
    ),
);

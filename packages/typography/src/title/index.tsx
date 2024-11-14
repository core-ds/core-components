import React, { forwardRef } from 'react';

import { DEFAULT_TITLE_FONT, TitleBase, TitleProps } from '../title-base/component';
import { getDefaultWeight } from '../title-base/utils';

import stylesDesktop from '../title-desktop/desktop.module.css';
import stylesMobile from '../title-mobile/mobile.module.css';

type PrivateProps = {
    platform?: 'mobile' | 'desktop';
};

/** @deprecated используйте TitleDesktop или TitleMobile */
const Title = forwardRef<HTMLHeadingElement | HTMLDivElement, TitleProps & PrivateProps>(
    (
        {
            font = DEFAULT_TITLE_FONT,
            platform = 'desktop',
            weight = getDefaultWeight(font, platform),
            ...props
        },
        ref,
    ) => (
        <TitleBase
            {...props}
            font={font}
            weight={weight}
            styles={platform === 'desktop' ? stylesDesktop : stylesMobile}
            ref={ref}
        />
    ),
);

export { Title };
export type { TitleProps };

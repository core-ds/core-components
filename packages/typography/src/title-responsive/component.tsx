import React, { forwardRef } from 'react';

import { useMatchMedia } from '@alfalab/core-components-mq';

import { TitleBase, TitleProps } from '../title/component';

import commonStyles from '../title/common.module.css';
import styles from './index.module.css';

export const TitleResponsive = forwardRef<HTMLHeadingElement | HTMLDivElement, TitleProps>(
    (props, ref) => {
        const [isDesktop] = useMatchMedia('(min-width: 1024px)');

        return (
            <TitleBase
                {...props}
                styles={Object.assign(commonStyles, styles)}
                ref={ref}
                platform={isDesktop ? 'desktop' : 'mobile'}
            />
        );
    },
);

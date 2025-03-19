import React, { forwardRef } from 'react';

import { type TitleProps, TitleBase } from '../component';

import commonStyles from '../common.module.css';
import styles from './index.module.css';

export const TitleMobile = forwardRef<HTMLHeadingElement | HTMLDivElement, TitleProps>(
    (props, ref) => (
        <TitleBase
            {...props}
            styles={Object.assign(commonStyles, styles)}
            ref={ref}
            platform='mobile'
        />
    ),
);

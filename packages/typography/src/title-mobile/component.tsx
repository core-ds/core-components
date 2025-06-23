import React, { forwardRef } from 'react';

import { TitleBase, TitleProps } from '../title/component';

import commonStyles from '../title/common.module.css';
import alfasansStyles from './alfasans-index.module.css';
import styles from './index.module.css';

const allStyles =
    process.env.CORE_COMPONENTS_ENV === 'test'
        ? commonStyles
        : { ...commonStyles, ...styles, ...alfasansStyles };

export const TitleMobile = forwardRef<HTMLHeadingElement | HTMLDivElement, TitleProps>(
    (props, ref) => <TitleBase {...props} styles={allStyles} ref={ref} platform='mobile' />,
);

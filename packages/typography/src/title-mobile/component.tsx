import React, { forwardRef } from 'react';

import { TitleBase, type TitleProps } from '../title/component';

import styles from './index.module.css';

export const TitleMobile = forwardRef<HTMLHeadingElement | HTMLDivElement, TitleProps>(
    (props, ref) => <TitleBase {...props} styles={styles} ref={ref} platform='mobile' />,
);

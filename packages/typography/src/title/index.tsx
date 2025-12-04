import React, { forwardRef } from 'react';

import { TitleBase, type TitleProps } from './component';

import styles from './index.module.css';

export const Title = forwardRef<HTMLHeadingElement | HTMLDivElement, TitleProps>((props, ref) => (
    <TitleBase {...props} styles={styles} ref={ref} platform='desktop' />
));

export type { TitleProps };

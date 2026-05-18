import React, { type FC } from 'react';
import cn from 'classnames';

import { Content, type ContentProps } from './Component';

import styles from './mobile.module.css';

export type ContentMobileProps = ContentProps;

export const ContentMobile: FC<ContentMobileProps> = ({ className, ...restProps }) => (
    <Content className={cn(className, styles.content)} {...restProps} />
);

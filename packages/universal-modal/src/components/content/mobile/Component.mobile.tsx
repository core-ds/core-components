import React, { FC } from 'react';
import cn from 'classnames';

import { BaseContent, ContentProps } from '../base-content/base-content';

import styles from './mobile.module.css';

export type ContentMobileProps = ContentProps;

export const ContentMobile: FC<ContentMobileProps> = ({ className, ...restProps }) => (
    <BaseContent className={cn(styles.content, styles.withFooter, className)} {...restProps} />
);

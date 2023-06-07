import React, { forwardRef } from 'react';

import { BaseTag, BaseTagProps } from './components/base-tag';

import styles from './desktop.module.css';

export type TagDesktopProps = Omit<BaseTagProps, 'styles'>;

export const TagDesktop = forwardRef<HTMLButtonElement, TagDesktopProps>((restProps, ref) => (
    <BaseTag {...restProps} ref={ref} styles={styles} />
));

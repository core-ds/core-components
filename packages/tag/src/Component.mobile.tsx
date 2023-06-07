import React, { forwardRef } from 'react';

import { BaseTag, BaseTagProps } from './components/base-tag';

import styles from './mobile.module.css';

export type TagMobileProps = Omit<BaseTagProps, 'styles'>;

export const TagMobile = forwardRef<HTMLButtonElement, TagMobileProps>((restProps, ref) => (
    <BaseTag {...restProps} ref={ref} styles={styles} />
));

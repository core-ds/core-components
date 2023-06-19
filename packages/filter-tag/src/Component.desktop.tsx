import React, { forwardRef } from 'react';

import { BaseFilterTag, BaseFilterTagProps } from './components/base-filter-tag';

import styles from './desktop.module.css';

export type FilterTagDesktopProps = Omit<BaseFilterTagProps, 'styles'>;

export const FilterTagDesktop = forwardRef<HTMLDivElement, FilterTagDesktopProps>((restProps, ref) => (
    <BaseFilterTag {...restProps} ref={ref} styles={styles} />
));

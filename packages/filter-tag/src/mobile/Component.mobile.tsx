import React, { forwardRef } from 'react';

import { BaseFilterTag, BaseFilterTagProps } from '../components/base-filter-tag';

import styles from './mobile.module.css';

export type FilterTagMobileProps = Omit<BaseFilterTagProps, 'styles'>;

export const FilterTagMobile = forwardRef<HTMLDivElement, FilterTagMobileProps>(
    (restProps, ref) => <BaseFilterTag {...restProps} ref={ref} styles={styles} />,
);

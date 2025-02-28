import React, { forwardRef } from 'react';

import { BaseFilterTag, BaseFilterTagProps, PrivateProps } from '../components/base-filter-tag';

import defaultColors from './default.mobile.module.css';
import invertedColors from './inverted.mobile.module.css';
import styles from './mobile.module.css';

const colorStyles = {
    default: defaultColors,
    inverted: invertedColors,
};

export type FilterTagMobileProps = Omit<BaseFilterTagProps, keyof PrivateProps>;

export const FilterTagMobile = forwardRef<HTMLDivElement, FilterTagMobileProps>(
    (restProps, ref) => (
        <BaseFilterTag {...restProps} ref={ref} styles={styles} colorStylesMap={colorStyles} />
    ),
);

import React, { forwardRef } from 'react';

import { BaseFilterTag } from '../components/base-filter-tag';
import { type PrivateProps } from '../types/base-filter-tag-private-props';
import { type BaseFilterTagProps } from '../types/base-filter-tag-props';

import defaultColors from './default.desktop.module.css';
import styles from './desktop.module.css';
import invertedColors from './inverted.desktop.module.css';

const colorStyles = {
    default: defaultColors,
    inverted: invertedColors,
};

export type FilterTagDesktopProps = Omit<BaseFilterTagProps, keyof PrivateProps>;

export const FilterTagDesktop = forwardRef<HTMLDivElement, FilterTagDesktopProps>(
    (restProps, ref) => (
        <BaseFilterTag {...restProps} ref={ref} styles={styles} colorStylesMap={colorStyles} />
    ),
);

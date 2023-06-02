import React, { forwardRef } from 'react';

import { BaseTag, BaseTagProps } from './components/base-tag';

import defaultColors from './default.module.css';
import styles from './index.module.css';
import invertedColors from './inverted.module.css';

const colorStyles = {
    default: defaultColors,
    inverted: invertedColors,
};

export type TagMobileProps = Omit<BaseTagProps, 'desktop' | 'colorStyles' | 'styles'>;

export const TagMobile = forwardRef<HTMLButtonElement, BaseTagProps>((restProps, ref) => (
    <BaseTag {...restProps} ref={ref} colorStylesMap={colorStyles} styles={styles} />
));

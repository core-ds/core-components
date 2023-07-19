import React, { forwardRef } from 'react';

import { BaseTag, BaseTagProps } from './components/base-tag';

import defaultColors from './default.mobile.module.css';
import invertedColors from './inverted.mobile.module.css';
import styles from './mobile.module.css';

const colorStyles = {
    default: defaultColors,
    inverted: invertedColors,
};

export type TagMobileProps = Omit<BaseTagProps, 'styles'>;

export const TagMobile = forwardRef<HTMLButtonElement, TagMobileProps>((restProps, ref) => (
    <BaseTag {...restProps} colorStylesMap={colorStyles} ref={ref} styles={styles} />
));

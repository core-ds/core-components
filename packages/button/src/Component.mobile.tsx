import React, { forwardRef } from 'react';

import { BaseButton } from './components/base-button';
import { CommonButtonProps } from './typings';

import defaultColors from './default.mobile.module.css';
import invertedColors from './inverted.mobile.module.css';
import styles from './mobile.module.css';

const colorStyles = {
    default: defaultColors,
    inverted: invertedColors,
};

export const ButtonMobile = forwardRef<HTMLAnchorElement | HTMLButtonElement, CommonButtonProps>(
    (restProps, ref) => (
        <BaseButton {...restProps} ref={ref} colorStylesMap={colorStyles} styles={styles} />
    ),
);

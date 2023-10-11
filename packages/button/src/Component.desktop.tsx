import React, { forwardRef } from 'react';

import { BaseButton } from './components/base-button';
import { CommonButtonProps } from './typings';

import defaultColors from './default.desktop.module.css';
import styles from './desktop.module.css';
import invertedColors from './inverted.desktop.module.css';

const colorStyles = {
    default: defaultColors,
    inverted: invertedColors,
};

export const ButtonDesktop = forwardRef<HTMLAnchorElement | HTMLButtonElement, CommonButtonProps>(
    (restProps, ref) => (
        <BaseButton {...restProps} ref={ref} styles={styles} colorStylesMap={colorStyles} />
    ),
);

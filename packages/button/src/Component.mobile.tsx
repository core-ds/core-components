import React, { forwardRef } from 'react';

import { BaseButton } from './components/base-button';
import { ButtonMobileProps } from './typings';

import defaultColors from './default.module.css';
import styles from './index.module.css';
import invertedColors from './inverted.module.css';

const colorStyles = {
    default: defaultColors,
    inverted: invertedColors,
};

export const ButtonMobile = forwardRef<HTMLAnchorElement | HTMLButtonElement, ButtonMobileProps>(
    (restProps, ref) => (
        <BaseButton {...restProps} ref={ref} colorStyles={colorStyles} styles={styles} />
    ),
);

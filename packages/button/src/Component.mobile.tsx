import React, { forwardRef } from 'react';

import { BaseButton } from './components/base-button';
import { AnchorButtonProps, NativeButtonProps } from './typings';

import defaultColors from './default.mobile.module.css';
import invertedColors from './inverted.mobile.module.css';
import styles from './mobile.module.css';

const colorStyles = {
    default: defaultColors,
    inverted: invertedColors,
};

export type ButtonMobileProps = Partial<AnchorButtonProps | NativeButtonProps>;

export const ButtonMobile = forwardRef<HTMLAnchorElement | HTMLButtonElement, ButtonMobileProps>(
    (restProps, ref) => (
        <BaseButton {...restProps} ref={ref} colorStylesMap={colorStyles} styles={styles} />
    ),
);

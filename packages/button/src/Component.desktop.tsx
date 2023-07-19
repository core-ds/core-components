import React, { forwardRef } from 'react';

import { BaseButton } from './components/base-button';
import { AnchorButtonProps, NativeButtonProps } from './typings';

import defaultColors from './default.desktop.module.css';
import styles from './desktop.module.css';
import invertedColors from './inverted.desktop.module.css';

const colorStyles = {
    default: defaultColors,
    inverted: invertedColors,
};

export type ButtonDesktopProps = Partial<AnchorButtonProps | NativeButtonProps>;

export const ButtonDesktop = forwardRef<HTMLAnchorElement | HTMLButtonElement, ButtonDesktopProps>(
    (restProps, ref) => (
        <BaseButton {...restProps} ref={ref} styles={styles} colorStylesMap={colorStyles} />
    ),
);

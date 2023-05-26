// TODO Вид кнопок зависит от порядка импорта стилей. Исправить!!!.
/* eslint-disable simple-import-sort/imports */
import React, { forwardRef } from 'react';

import { BaseButton } from './components/base-button';
import { ButtonDesktopProps } from './typings';

import styles from './desktop.module.css';

import defaultColors from './default.desktop.module.css';
import invertedColors from './inverted.desktop.module.css';

const colorStyles = {
    default: defaultColors,
    inverted: invertedColors,
};

export const ButtonDesktop = forwardRef<HTMLAnchorElement | HTMLButtonElement, ButtonDesktopProps>(
    (restProps, ref) => (
        <BaseButton {...restProps} ref={ref} colorStyles={colorStyles} styles={styles} />
    ),
);

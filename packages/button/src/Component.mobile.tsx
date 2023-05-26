// TODO Вид кнопок зависит от порядка импорта стилей. Исправить!!!.
/* eslint-disable simple-import-sort/imports */
import React, { forwardRef } from 'react';

import { BaseButton } from './components/base-button';
import { ButtonMobileProps } from './typings';

import styles from './mobile.module.css';

import defaultColors from './default.mobile.module.css';
import invertedColors from './inverted.mobile.module.css';

const colorStyles = {
    default: defaultColors,
    inverted: invertedColors,
};

export const ButtonMobile = forwardRef<HTMLAnchorElement | HTMLButtonElement, ButtonMobileProps>(
    (restProps, ref) => (
        <BaseButton {...restProps} ref={ref} colorStyles={colorStyles} styles={styles} />
    ),
);

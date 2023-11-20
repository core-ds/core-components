import React, { forwardRef } from 'react';

import { BaseTag, BaseTagProps } from '../components/base-tag';

import defaultColors from './default.desktop.module.css';
import styles from './desktop.module.css';
import invertedColors from './inverted.desktop.module.css';

const colorStyles = {
    default: defaultColors,
    inverted: invertedColors,
};

export type TagDesktopProps = Omit<BaseTagProps, 'styles' | 'colorStylesMap'>;

export const TagDesktop = forwardRef<HTMLButtonElement, TagDesktopProps>((restProps, ref) => (
    <BaseTag {...restProps} colorStylesMap={colorStyles} ref={ref} styles={styles} />
));

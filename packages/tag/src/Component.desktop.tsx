import React, { forwardRef } from 'react';

import { BaseTag, BaseTagProps } from './components/base-tag';

import defaultColors from './default.module.css';
import styles from './index.module.css';
import invertedColors from './inverted.module.css';

const colorStyles = {
    default: defaultColors,
    inverted: invertedColors,
};

export type TagDesktopProps = Omit<BaseTagProps, 'desktop' | 'colorStylesMap' | 'styles'>;

export const TagDesktop = forwardRef<HTMLButtonElement, TagDesktopProps>((restProps, ref) => (
    <BaseTag {...restProps} desktop={true} ref={ref} colorStylesMap={colorStyles} styles={styles} />
));

import React, { forwardRef } from 'react';

import { BaseButton } from './components/base-button';
import { ButtonDesktopProps } from './typings';

import defaultColors from './default.module.css';
import styles from './index.module.css';
import invertedColors from './inverted.module.css';

const colorStyles = {
    default: defaultColors,
    inverted: invertedColors,
};

export const ButtonDesktop = forwardRef<HTMLAnchorElement | HTMLButtonElement, ButtonDesktopProps>(
    (restProps, ref) => (
        <BaseButton
            {...restProps}
            desktop={true}
            ref={ref}
            colorStyles={colorStyles}
            styles={styles}
        />
    ),
);

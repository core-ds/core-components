import React, { FC, MouseEvent } from 'react';

import { ButtonMobile } from '@alfalab/core-components-button/mobile';
import { ChevronLeftMIcon } from '@alfalab/icons-glyph/ChevronLeftMIcon';

import styles from './arrow-button.module.css';

interface ArrowButtonDesktopProps {
    onClick?: (e: MouseEvent) => void;
}

export const ArrowButtonMobile: FC<ArrowButtonDesktopProps> = (props) => {
    const { onClick } = props;

    return (
        <ButtonMobile
            shape='rounded'
            size={32}
            leftAddons={<ChevronLeftMIcon className={styles.icon} />}
            className={styles.button}
            onClick={onClick}
        />
    );
};

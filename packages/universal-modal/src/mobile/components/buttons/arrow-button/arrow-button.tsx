import React, { FC, MouseEvent } from 'react';

import { Button } from '@alfalab/core-components-button';
import { ChevronLeftMIcon } from '@alfalab/icons-glyph/ChevronLeftMIcon';

import styles from './arrow-button.module.css';

type ArrowButtonDesktopProps = {
    onClick?: (e: MouseEvent) => void;
};

export const ArrowButtonDesktopMobile: FC<ArrowButtonDesktopProps> = (props) => {
    const { onClick } = props;

    return (
        <Button
            shape='rounded'
            size={32}
            leftAddons={<ChevronLeftMIcon />}
            className={styles.button}
            onClick={onClick}
        />
    );
};

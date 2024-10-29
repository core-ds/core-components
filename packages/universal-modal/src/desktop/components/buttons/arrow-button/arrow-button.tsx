import React, { FC, MouseEvent } from 'react';

import { Button } from '@alfalab/core-components-button';
import { Typography } from '@alfalab/core-components-typography';
import { ArrowLeftMediumMIcon } from '@alfalab/icons-glyph/ArrowLeftMediumMIcon';

import styles from './arrow-button.module.css';

type ArrowButtonDesktopProps = {
    onClick?: (e: MouseEvent) => void;
};

export const ArrowButtonDesktop: FC<ArrowButtonDesktopProps> = (props) => {
    const { onClick } = props;

    return (
        <Button
            shape='rounded'
            size={48}
            leftAddons={<ArrowLeftMediumMIcon />}
            className={styles.button}
            onClick={onClick}
        >
            <Typography.Text view='primary-large' weight='medium'>
                Назад
            </Typography.Text>
        </Button>
    );
};

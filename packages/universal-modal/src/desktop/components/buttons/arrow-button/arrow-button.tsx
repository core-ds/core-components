import React, { FC, MouseEvent } from 'react';
import { ButtonDesktop } from '@balafla/core-components-button/desktop';
import { Typography } from '@balafla/core-components-typography';

import { ArrowLeftMediumMIcon } from '@alfalab/icons-glyph/ArrowLeftMediumMIcon';

import styles from './arrow-button.module.css';

type ArrowButtonDesktopProps = {
    onClick?: (e: MouseEvent) => void;
};

export const ArrowButtonDesktop: FC<ArrowButtonDesktopProps> = (props) => {
    const { onClick } = props;

    return (
        <ButtonDesktop
            shape='rounded'
            size={48}
            leftAddons={<ArrowLeftMediumMIcon />}
            className={styles.button}
            onClick={onClick}
        >
            <Typography.Text view='primary-large' weight='medium'>
                Назад
            </Typography.Text>
        </ButtonDesktop>
    );
};

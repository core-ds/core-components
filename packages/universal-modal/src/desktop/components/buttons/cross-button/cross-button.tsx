import React, { FC } from 'react';
import { ButtonDesktop } from '@balafla/core-components-button/desktop';

import { CrossMediumMIcon } from '@alfalab/icons-glyph/CrossMediumMIcon';

import styles from './cross-button.module.css';

type CrossButtonProps = {
    onClick?: () => void;
};

export const CrossButtonDesktop: FC<CrossButtonProps> = (props) => {
    const { onClick } = props;

    return (
        <ButtonDesktop
            leftAddons={<CrossMediumMIcon />}
            size={48}
            shape='rounded'
            className={styles.button}
            onClick={onClick}
        />
    );
};

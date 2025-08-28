import React, { FC } from 'react';

import { ButtonMobile } from '@alfalab/core-components-button/mobile';
import { CrossMIcon } from '@alfalab/icons-glyph/CrossMIcon';

import styles from './cross-button.module.css';

interface CrossButtonProps {
    onClick?: () => void;
}

export const CrossButtonMobile: FC<CrossButtonProps> = (props) => {
    const { onClick } = props;

    return (
        <ButtonMobile
            leftAddons={<CrossMIcon className={styles.icon} />}
            size={32}
            shape='rounded'
            className={styles.button}
            onClick={onClick}
        />
    );
};

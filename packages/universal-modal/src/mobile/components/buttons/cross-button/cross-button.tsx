import React, { FC } from 'react';

import { Button } from '@alfalab/core-components-button';
import { CrossMIcon } from '@alfalab/icons-glyph/CrossMIcon';

import styles from './cross-button.module.css';

type CrossButtonProps = {
    onClick?: () => void;
};

export const CrossButtonMobile: FC<CrossButtonProps> = (props) => {
    const { onClick } = props;

    return (
        <Button
            leftAddons={<CrossMIcon />}
            size={32}
            shape='rounded'
            className={styles.button}
            onClick={onClick}
        />
    );
};

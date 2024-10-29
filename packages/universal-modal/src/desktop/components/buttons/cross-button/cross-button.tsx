import React, { FC } from 'react';

import { Button } from '@alfalab/core-components-button';
import { CrossMediumMIcon } from '@alfalab/icons-glyph/CrossMediumMIcon';

import styles from '../arrow-button/arrow-button.module.css';

type CrossButtonProps = {
    onClick?: () => void;
};

export const CrossButtonDesktop: FC<CrossButtonProps> = (props) => {
    const { onClick } = props;

    return (
        <Button
            leftAddons={<CrossMediumMIcon />}
            size={48}
            shape='rounded'
            className={styles.button}
            onClick={onClick}
        />
    );
};

import React, { FC } from 'react';

import { Backdrop, BackdropProps } from '@alfalab/core-components-backdrop';

import styles from './index.module.css';

export type PopupBackdropProps = BackdropProps & {
    /**
     * Прозрачность бэкдропа
     */
    opacity?: number;

    /**
     * Время анимации opacity
     */
    opacityTimeout?: number;
};

export const PopupBackdrop: FC<BackdropProps> = ({
    opacity,
    opacityTimeout,
    style,
    ...backdropProps
}) => (
    <div
        style={{
            opacity,
            transition: opacity === 1 ? `opacity ${opacityTimeout}ms ease-in-out` : '',
            position: 'relative',
            ...style,
        }}
    >
        <Backdrop transitionClassNames={styles} {...backdropProps} />
    </div>
);

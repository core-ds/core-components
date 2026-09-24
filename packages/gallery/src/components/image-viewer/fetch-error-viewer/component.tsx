import React, { type FC, type MouseEventHandler } from 'react';

import { Button } from '@alfalab/core-components-button';
import { TypographyText } from '@alfalab/core-components-typography';

import { NoImagePaths } from '../paths';

import styles from './index.module.css';

type Props = {
    onRetry?: () => void;
};

export const FetchErrorViewer: FC<Props> = ({ onRetry }) => {
    const handleRetry: MouseEventHandler = (event) => {
        event.stopPropagation();
        onRetry?.();
    };

    return (
        <div className={styles.component} role='alert'>
            <svg
                className={styles.icon}
                width='80'
                height='80'
                viewBox='0 0 80 80'
                fill='none'
                aria-hidden={true}
            >
                <path
                    fillRule='evenodd'
                    clipRule='evenodd'
                    d={NoImagePaths.baseImage}
                    fill='currentColor'
                />
                <path d={NoImagePaths.triangleImage} fill='currentColor' />
            </svg>

            <TypographyText view='primary-small' color='static-secondary-light'>
                Не удалось загрузить
            </TypographyText>

            {onRetry && (
                <Button
                    className={styles.retryButton}
                    view='secondary'
                    colors='inverted'
                    size={48}
                    onClick={handleRetry}
                >
                    Попробовать ещё раз
                </Button>
            )}
        </div>
    );
};

import React, { type FC, type MouseEventHandler, useContext } from 'react';

import { Button } from '@alfalab/core-components-button';
import { TypographyText, TypographyTitle } from '@alfalab/core-components-typography';
import { NoImageMIcon } from '@alfalab/icons-glyph/NoImageMIcon';

import { GalleryContext } from '../../context';

import styles from './index.module.css';

export const PaginationError: FC = () => {
    const { retryPagination } = useContext(GalleryContext);

    const handleRetry: MouseEventHandler = (event) => {
        event.stopPropagation();
        retryPagination();
    };

    return (
        <div className={styles.component} role='alert'>
            <NoImageMIcon className={styles.icon} aria-hidden={true} />
            <TypographyTitle tag='h2' view='small' color='static-primary-light'>
                Не получилось загрузить
            </TypographyTitle>
            <TypographyText
                className={styles.description}
                view='primary-medium'
                color='static-primary-light'
            >
                Уже знаем, в чём дело, и чиним.
                <br />
                Попробуйте зайти позже
            </TypographyText>
            <Button
                className={styles.retryButton}
                view='secondary'
                colors='inverted'
                size={48}
                onClick={handleRetry}
            >
                Попробовать ещё раз
            </Button>
        </div>
    );
};

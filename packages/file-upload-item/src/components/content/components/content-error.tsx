import React from 'react';

import { Typography } from '@alfalab/core-components-typography';

import styles from './content-error.module.css';

export const contentError = (error?: string | string[]) => {
    if (typeof error === 'string' && error.length > 0) {
        return (
            <Typography.Text className={styles.errorItem} view='primary-small' color='negative'>
                {error}
            </Typography.Text>
        );
    }

    if (Array.isArray(error) && error.length > 0) {
        return error.map((item) => (
            <Typography.Text
                key={item}
                className={styles.errorItem}
                view='primary-small'
                color='negative'
            >
                {item}
            </Typography.Text>
        ));
    }

    return (
        <Typography.Text className={styles.errorItem} view='primary-small' color='negative'>
            Не удалось загрузить файл
        </Typography.Text>
    );
};

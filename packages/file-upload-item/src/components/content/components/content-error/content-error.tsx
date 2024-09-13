import React, { useContext } from 'react';

import { Typography } from '@alfalab/core-components-typography';

import { FileUploadItemContext } from '../../../../context/file-upload-item-context';

import styles from './content-error.module.css';

export const ContentError = () => {
    const { error } = useContext(FileUploadItemContext);

    if (typeof error === 'string' && error.length > 0) {
        return (
            <Typography.Text className={styles.errorItem} view='primary-small' color='negative'>
                {error}
            </Typography.Text>
        );
    }

    if (Array.isArray(error) && error.length > 0) {
        return (
            <div>
                {error.map((item) => (
                    <Typography.Text
                        key={item}
                        className={styles.errorItem}
                        view='primary-small'
                        color='negative'
                    >
                        {item}
                    </Typography.Text>
                ))}
            </div>
        );
    }

    return (
        <Typography.Text className={styles.errorItem} view='primary-small' color='negative'>
            Не удалось загрузить файл
        </Typography.Text>
    );
};

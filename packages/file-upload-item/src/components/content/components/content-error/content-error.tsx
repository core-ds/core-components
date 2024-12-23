import React, { useContext } from 'react';

import { Text } from '@alfalab/core-components-typography';

import { FileUploadItemContext } from '../../../../context/file-upload-item-context';

import styles from './content-error.module.css';

export const ContentError = () => {
    const { error } = useContext(FileUploadItemContext);

    if (typeof error === 'string' && error.length > 0) {
        return (
            <Text className={styles.errorItem} view='primary-small' color='negative'>
                {error}
            </Text>
        );
    }

    if (Array.isArray(error) && error.length > 0) {
        return (
            <div>
                {error.map((item) => (
                    <Text
                        key={item}
                        className={styles.errorItem}
                        view='primary-small'
                        color='negative'
                    >
                        {item}
                    </Text>
                ))}
            </div>
        );
    }

    return (
        <Text className={styles.errorItem} view='primary-small' color='negative'>
            Не удалось загрузить файл
        </Text>
    );
};

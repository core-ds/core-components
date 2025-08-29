import React, { useContext } from 'react';

import { TypographyText } from '@alfalab/core-components-typography';

import { FileUploadItemContext } from '../../../../context/file-upload-item-context';

import styles from './content-error.module.css';

export const ContentError = () => {
    const { error } = useContext(FileUploadItemContext);

    if (typeof error === 'string' && error.length > 0) {
        return (
            <TypographyText className={styles.errorItem} view='primary-small' color='negative'>
                {error}
            </TypographyText>
        );
    }

    if (Array.isArray(error) && error.length > 0) {
        return (
            <div>
                {error.map((item) => (
                    <TypographyText
                        key={item}
                        className={styles.errorItem}
                        view='primary-small'
                        color='negative'
                    >
                        {item}
                    </TypographyText>
                ))}
            </div>
        );
    }

    return (
        <TypographyText className={styles.errorItem} view='primary-small' color='negative'>
            Не удалось загрузить файл
        </TypographyText>
    );
};

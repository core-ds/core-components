import React, { useContext } from 'react';

import { Typography } from '@alfalab/core-components-typography';

import { FileUploadItemContext } from '../../context/file-upload-item-context';
import { humanFileSize } from '../../utils';

import styles from './index.module.css';

export const Content = () => {
    const {
        showRestore,
        uploadStatus,
        error,
        title,
        subtitle,
        uploadPercent = 0,
        uploadDate,
        size,
    } = useContext(FileUploadItemContext);

    const shouldShownError = uploadStatus === 'ERROR' || !!error;
    const errorContent = uploadStatus === 'ERROR' && !error ? 'Не удалось загрузить файл' : error;
    const showMeta = !showRestore && (!uploadStatus || uploadStatus === 'SUCCESS');

    return (
        <div className={styles.container}>
            {title && (
                <Typography.Text className={styles.title} view='component' color='primary'>
                    {title}
                </Typography.Text>
            )}

            {subtitle && (
                <Typography.Text className={styles.subtitle} view='primary-small' color='secondary'>
                    {subtitle}
                </Typography.Text>
            )}

            {shouldShownError && <div role='alert'>{errorContent}</div>}

            {uploadStatus === 'UPLOADING' && <span>{`${Math.round(uploadPercent)}%`}</span>}

            {showMeta && (
                <div>
                    {uploadDate && <span key={uploadDate}>{uploadDate}</span>}

                    {size && (
                        <span key={size} className={styles.size}>
                            {humanFileSize(size)}
                        </span>
                    )}
                </div>
            )}
        </div>
    );
};

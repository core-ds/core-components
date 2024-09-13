import React, { useContext } from 'react';
import cn from 'classnames';

import { Typography } from '@alfalab/core-components-typography';

import { FileUploadItemContext } from '../../context/file-upload-item-context';
import { humanFileSize, isUploadingStatus } from '../../utils';

import { contentError } from './components/content-error';
import { isError } from './utils/isError';

import styles from './index.module.css';

export const Content = () => {
    const {
        showRestore,
        uploadStatus,
        error,
        title,
        subtitle,
        uploadDate,
        size,
        customContent: CustomContent,
        truncate,
        progressBar,
    } = useContext(FileUploadItemContext);

    const shouldShownError = uploadStatus === 'ERROR' || isError(error);
    const showMeta = !showRestore && uploadStatus === 'SUCCESS';

    if (CustomContent) {
        return <CustomContent />;
    }

    return (
        <div className={styles.container}>
            {title && (
                <Typography.Text
                    className={cn(styles.title, {
                        [styles.truncate]: truncate,
                    })}
                    view='component'
                    color='primary'
                >
                    {title}
                </Typography.Text>
            )}

            {subtitle && !shouldShownError && !showMeta && !isUploadingStatus(uploadStatus) && (
                <Typography.Text
                    className={cn(styles.subtitle, {
                        [styles.truncate]: truncate,
                    })}
                    view='primary-small'
                    color='secondary'
                >
                    {subtitle}
                </Typography.Text>
            )}

            {isUploadingStatus(uploadStatus) && progressBar && (
                <Typography.Text view='primary-small' color='secondary'>
                    Загрузка {Math.floor(progressBar / (360 / 100))}%
                </Typography.Text>
            )}

            {shouldShownError && contentError(error)}

            {showMeta && (
                <div>
                    {size && (
                        <Typography.Text
                            className={styles.size}
                            view='primary-small'
                            color='secondary'
                        >
                            {humanFileSize(size)}
                        </Typography.Text>
                    )}
                    {uploadDate && (
                        <Typography.Text view='primary-small' color='secondary'>
                            {uploadDate}
                        </Typography.Text>
                    )}
                </div>
            )}
        </div>
    );
};

import React, { useContext } from 'react';
import cn from 'classnames';

import { Typography } from '@alfalab/core-components-typography';

import { FileUploadItemContext } from '../../../../context/file-upload-item-context';
import { humanFileSize, isUploadingStatus } from '../../../../utils';
import { isError } from '../../utils/isError';
import { ContentError } from '../content-error/content-error';

import styles from '../../index.module.css';

export const ContentSubtitle = () => {
    const { showRestore, uploadStatus, error, subtitle, uploadDate, size, truncate, progressBar } =
        useContext(FileUploadItemContext);

    const shouldShownError = uploadStatus === 'ERROR' || isError(error);
    const showMeta = !showRestore && uploadStatus === 'SUCCESS';

    // uploading status
    if (isUploadingStatus(uploadStatus) && progressBar) {
        return (
            <Typography.Text view='primary-small' color='secondary'>
                Загрузка {Math.floor(progressBar / (360 / 100))}%
            </Typography.Text>
        );
    }

    // error status
    if (shouldShownError) {
        return <ContentError />;
    }

    // success status
    if (showMeta) {
        return (
            <div>
                {size && (
                    <Typography.Text className={styles.size} view='primary-small' color='secondary'>
                        {humanFileSize(size)}
                    </Typography.Text>
                )}
                {uploadDate && (
                    <Typography.Text view='primary-small' color='secondary'>
                        {uploadDate}
                    </Typography.Text>
                )}
            </div>
        );
    }

    return (
        <Typography.Text
            className={cn(styles.subtitle, {
                [styles.truncate]: truncate,
            })}
            view='primary-small'
            color='secondary'
        >
            {subtitle}
        </Typography.Text>
    );
};

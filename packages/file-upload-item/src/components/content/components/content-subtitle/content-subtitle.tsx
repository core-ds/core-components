import React, { useContext } from 'react';
import cn from 'classnames';

import { Typography } from '@alfalab/core-components-typography';

import { FileUploadItemContext } from '../../../../context/file-upload-item-context';
import { humanFileSize, isUploadingStatus } from '../../../../utils';
import { ContentError } from '../content-error/content-error';

import { useContentSubtitle } from './hooks/useContentSubtitle';

import styles from './content-subtitle.module.css';

export const ContentSubtitle = () => {
    const { uploadStatus, subtitle, uploadDate, size, truncate } =
        useContext(FileUploadItemContext);

    const {
        shouldShownError,
        showMeta,
        progressBarAvailableSteps,
        progressBarAvailablePercents,
        validProgressBar,
    } = useContentSubtitle();

    // uploading status
    if (isUploadingStatus(uploadStatus)) {
        return (
            <Typography.Text view='primary-small' color='secondary'>
                Загрузка{'\u00A0'}
                {Math.floor(
                    validProgressBar / (progressBarAvailableSteps / progressBarAvailablePercents),
                )}
                %
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

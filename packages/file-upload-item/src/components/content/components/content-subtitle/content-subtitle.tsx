import React, { useContext } from 'react';
import { Text } from '@balafla/core-components-typography';
import cn from 'classnames';

import { MAX_PROGRESS_BAR_VALUE } from '../../../../const/progress-bar';
import { FileUploadItemContext } from '../../../../context/file-upload-item-context';
import {
    humanFileSize,
    isErrorStatus,
    isSuccessStatus,
    isUploadedStatus,
    isUploadingStatus,
} from '../../../../utils';
import { isError } from '../../utils/isError';
import { ContentError } from '../content-error';

import styles from './content-subtitle.module.css';

export const ContentSubtitle = () => {
    const { uploadStatus, subtitle, uploadDate, size, truncate, showRestore, error, progressBar } =
        useContext(FileUploadItemContext);

    const shouldShownError = isErrorStatus(uploadStatus) || isError(error);
    const showMeta =
        !showRestore && (isSuccessStatus(uploadStatus) || isUploadedStatus(uploadStatus));

    // валидация progressBar (не должен превышать 100 и быть меньше 0)
    const validateProgressBarValue = (progressValue: number | undefined) => {
        if (progressValue === undefined) {
            return 0;
        }

        return Math.min(Math.max(progressValue, 0), MAX_PROGRESS_BAR_VALUE);
    };

    const validProgressBar = validateProgressBarValue(progressBar);

    // uploading status
    if (isUploadingStatus(uploadStatus)) {
        return (
            <Text view='primary-small' color='secondary'>
                Загружено{'\u00A0'}
                {Math.floor(validProgressBar)}%
            </Text>
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
                    <Text className={styles.size} view='primary-small' color='secondary'>
                        {humanFileSize(size)}
                    </Text>
                )}
                {uploadDate && (
                    <Text view='primary-small' color='secondary'>
                        {uploadDate}
                    </Text>
                )}
            </div>
        );
    }

    // restore status
    if (showRestore) {
        return (
            <Text view='primary-small' color='tertiary'>
                Файл удален
            </Text>
        );
    }

    return (
        <Text
            className={cn(styles.subtitle, {
                [styles.truncate]: truncate,
            })}
            view='primary-small'
            color='secondary'
        >
            {subtitle}
        </Text>
    );
};

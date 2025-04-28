import React, { useContext } from 'react';
import cn from 'classnames';

import { TypographyText } from '@alfalab/core-components-typography';

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
            <TypographyText view='primary-small' color='secondary'>
                Загружено{'\u00A0'}
                {Math.floor(validProgressBar)}%
            </TypographyText>
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
                    <TypographyText className={styles.size} view='primary-small' color='secondary'>
                        {humanFileSize(size)}
                    </TypographyText>
                )}
                {uploadDate && (
                    <TypographyText view='primary-small' color='secondary'>
                        {uploadDate}
                    </TypographyText>
                )}
            </div>
        );
    }

    // restore status
    if (showRestore) {
        return (
            <TypographyText view='primary-small' color='tertiary'>
                Файл удален
            </TypographyText>
        );
    }

    return (
        <TypographyText
            className={cn(styles.subtitle, {
                [styles.truncate]: truncate,
            })}
            view='primary-small'
            color='secondary'
        >
            {subtitle}
        </TypographyText>
    );
};

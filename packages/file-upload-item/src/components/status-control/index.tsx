import React, { useContext } from 'react';
import cn from 'classnames';

import { SuperEllipse } from '@alfalab/core-components-icon-view/super-ellipse';

import { FileUploadItemContext } from '../../context/file-upload-item-context';
import { isErrorStatus, isLoadingStatus, isSuccessStatus } from '../../utils';

import { ExtensionIcon } from './extension-icon';
import { LoadingSpinner } from './loading-spinner';
import { ProgressBar } from './progress-bar';

import styles from './index.module.css';

export const StatusControl = () => {
    const {
        uploadStatus = 'INITIAL',
        progressBar = 0,
        progressBarAvailable = true,
        imageUrl,
        actionsPresent,
        isClickable,
    } = useContext(FileUploadItemContext);

    const strokeDasharray = 182.5742645263672; // total length
    const measureDashoffset = strokeDasharray * (1 - progressBar / 100);
    const strokeDashoffset = Math.max(measureDashoffset, 0);

    const hasFullStatus = isSuccessStatus(uploadStatus) || isErrorStatus(uploadStatus);

    const customProps = {
        className: cn(styles.progress, {
            [styles.success]: isSuccessStatus(uploadStatus),
            [styles.error]: isErrorStatus(uploadStatus),
        }),
        size: 56,
        strokeWidth: 2,
        strokeDasharray,
    };

    return (
        <div
            className={cn(styles.container, {
                [styles.clickable]: !actionsPresent && isClickable,
            })}
        >
            <SuperEllipse size={48} {...(imageUrl && { imageUrl })}>
                <ExtensionIcon />
            </SuperEllipse>

            {!progressBarAvailable && isLoadingStatus(uploadStatus) ? (
                <LoadingSpinner {...customProps} strokeDashoffset={0} />
            ) : (
                <ProgressBar
                    {...customProps}
                    strokeDashoffset={hasFullStatus ? 0 : strokeDashoffset}
                />
            )}
        </div>
    );
};

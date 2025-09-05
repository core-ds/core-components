import React, { useContext } from 'react';
import cn from 'classnames';

import { SuperEllipse } from '@alfalab/core-components-icon-view/super-ellipse';

import { FileUploadItemContext } from '../../context/file-upload-item-context';
import { isErrorStatus, isLoadingStatus, isSuccessStatus } from '../../utils';

import { ExtensionIcon } from './extension-icon';
import { ProgressBar } from './progress-bar';

import styles from './index.module.css';

export const StatusControl = () => {
    const {
        uploadStatus = 'INITIAL',
        progressBar = 0,
        imageUrl,
        actionsPresent,
        isClickable,
    } = useContext(FileUploadItemContext);

    const strokeDasharray = 182.5742645263672; // total length
    const measureDashoffset = strokeDasharray * (1 - progressBar / 100);
    const strokeDashoffset = Math.max(measureDashoffset, 0);

    return (
        <div
            className={cn(styles.container, {
                [styles.clickable]: !actionsPresent && isClickable,
            })}
        >
            <SuperEllipse size={48} {...(imageUrl && { imageUrl })}>
                <ExtensionIcon />
            </SuperEllipse>
            <ProgressBar
                className={cn(styles.progress, {
                    [styles.loading]: isLoadingStatus(uploadStatus),
                    [styles.success]: isSuccessStatus(uploadStatus),
                    [styles.error]: isErrorStatus(uploadStatus),
                })}
                strokeDasharray={strokeDasharray}
                strokeDashoffset={
                    isLoadingStatus(uploadStatus) ||
                    isSuccessStatus(uploadStatus) ||
                    isErrorStatus(uploadStatus)
                        ? 0
                        : strokeDashoffset
                }
            />
        </div>
    );
};

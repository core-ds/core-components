import React, { useContext } from 'react';
import cn from 'classnames';

import { SuperEllipse } from '@alfalab/core-components-icon-view/super-ellipse';

import { FileUploadItemContext } from '../../context/file-upload-item-context';
import { isErrorStatus, isSuccessStatus } from '../../utils';

import { StatusControlIcon } from './components/status-control-icon';
import { ProgressBar } from './components/status-control-progress-bar/status-control-progress-bar';

import styles from './index.module.css';

export const StatusControl = () => {
    const {
        uploadStatus = 'INITIAL',
        progressBar = 0,
        imageUrl,
        actionsPresent,
        isClickable,
    } = useContext(FileUploadItemContext);

    const measureDashoffset = 182.574 * (1 - progressBar / 100);
    const dashoffset = Math.max(measureDashoffset, 0);

    return (
        <div
            className={cn(styles.container, {
                [styles.clickable]: !actionsPresent && isClickable,
            })}
        >
            <SuperEllipse size={48} {...(imageUrl && { imageUrl })}>
                <StatusControlIcon />
            </SuperEllipse>
            <ProgressBar
                className={cn(styles.progress, {
                    [styles.success]: isSuccessStatus(uploadStatus),
                    [styles.error]: isErrorStatus(uploadStatus),
                })}
                dashoffset={dashoffset}
            />
        </div>
    );
};

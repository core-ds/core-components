import React, { useContext, useRef } from 'react';
import cn from 'classnames';

import { pathsMap48, SuperEllipseBlank } from '@alfalab/core-components-icon-view/super-ellipse';

import { MAX_PROGRESS_BAR_VALUE, RADIUS } from '../../const/progress-bar';
import { FileUploadItemContext } from '../../context/file-upload-item-context';
import { isErrorStatus, isSuccessStatus, isUploadingStatus } from '../../utils';

import { StatusControlIcon } from './components/status-control-icon';
import { StatusControlProgressBar } from './components/status-control-progress-bar';

import styles from './status-control.module.css';

export const StatusControl = () => {
    const { uploadStatus = 'INITIAL', progressBar, imageUrl } = useContext(FileUploadItemContext);
    const progressRef = useRef<HTMLDivElement>(null);

    if (progressRef.current && progressBar) {
        progressRef.current.style.maskImage = `conic-gradient(red ${
            (RADIUS / MAX_PROGRESS_BAR_VALUE) * progressBar
        }deg, transparent 0)`;
    }

    const isTransparentProgressBar = () =>
        uploadStatus === 'INITIAL' || uploadStatus === 'UPLOADED' || uploadStatus === 'DELETED';

    return (
        <div className={styles.container}>
            <SuperEllipseBlank size={48} pathsMap={pathsMap48} {...(imageUrl && { imageUrl })}>
                <StatusControlIcon />
            </SuperEllipseBlank>
            <div
                ref={progressRef}
                className={cn(styles.progress, {
                    [styles.uploading]: isUploadingStatus(uploadStatus),
                    [styles.success]: isSuccessStatus(uploadStatus),
                    [styles.error]: isErrorStatus(uploadStatus),
                })}
            >
                <StatusControlProgressBar
                    className={cn({
                        [styles.progressBarTransparent]: isTransparentProgressBar(),
                        [styles.progressBarUploading]: uploadStatus === 'UPLOADING',
                        [styles.progressBarSuccess]: uploadStatus === 'SUCCESS',
                        [styles.progressBarError]: uploadStatus === 'ERROR',
                    })}
                />
            </div>
        </div>
    );
};

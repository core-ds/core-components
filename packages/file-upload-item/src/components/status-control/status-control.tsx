import React, { useContext, useRef } from 'react';
import cn from 'classnames';

import { SuperEllipse } from '@alfalab/core-components/icon-view/super-ellipse';

import { FileUploadItemContext } from '../../context/file-upload-item-context';
import { isErrorStatus, isSuccessStatus, isUploadingStatus } from '../../utils';

import { StatusControlIcon } from './components/status-control-icon';
import { StatusControlProgressBar } from './components/status-control-progress-bar';
import { colors } from './constants/colors';

import styles from './status-control.module.css';

export const StatusControl = () => {
    const { uploadStatus = 'INITIAL', progressBar, imageUrl } = useContext(FileUploadItemContext);
    const progressRef = useRef<HTMLDivElement>(null);

    if (progressRef.current) {
        progressRef.current.style.maskImage = `conic-gradient(red ${progressBar}deg, transparent 0)`;
    }

    return (
        <div className={styles.container}>
            <SuperEllipse
                size={48}
                backgroundColor='var(--color-light-neutral-translucent-100)'
                {...(imageUrl && { imageUrl })}
            >
                <StatusControlIcon />
            </SuperEllipse>
            <div
                ref={progressRef}
                className={cn(styles.progress, {
                    [styles.uploading]: isUploadingStatus(uploadStatus),
                    [styles.success]: isSuccessStatus(uploadStatus),
                    [styles.error]: isErrorStatus(uploadStatus),
                })}
            >
                <StatusControlProgressBar color={colors[uploadStatus]} />
            </div>
        </div>
    );
};

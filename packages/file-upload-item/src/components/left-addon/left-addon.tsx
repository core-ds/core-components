import React, { useContext, useRef } from 'react';
import cn from 'classnames';

import { SuperEllipse } from '@alfalab/core-components/icon-view/super-ellipse';

import { FileUploadItemContext } from '../../context/file-upload-item-context';
import { isErrorStatus, isSuccessStatus, isUploadingStatus } from '../../utils';

import { LeftAddonIcon } from './components/left-addon-icon';
import { ProgressBar } from './components/progress-bar';

import styles from './left-addon.module.css';

export const LeftAddon = () => {
    const { uploadStatus = 'INITIAL', progressBar, imageUrl } = useContext(FileUploadItemContext);
    const progressRef = useRef<HTMLDivElement>(null);

    if (progressRef.current) {
        progressRef.current.style.maskImage = `conic-gradient(red ${progressBar}deg, transparent 0)`;
    }

    const colors = {
        INITIAL: 'transparent',
        UPLOADED: 'transparent',
        DELETED: 'transparent',
        UPLOADING: '#BABBC2',
        SUCCESS: '#0CC44D',
        ERROR: '#FF4837',
    };

    return (
        <div className={styles.container}>
            <SuperEllipse
                size={48}
                backgroundColor='var(--color-light-neutral-translucent-100)'
                {...(imageUrl && { imageUrl })}
            >
                <LeftAddonIcon />
            </SuperEllipse>
            <div
                ref={progressRef}
                className={cn(styles.progress, {
                    [styles.uploading]: isUploadingStatus(uploadStatus),
                    [styles.success]: isSuccessStatus(uploadStatus),
                    [styles.error]: isErrorStatus(uploadStatus),
                })}
            >
                <ProgressBar color={colors[uploadStatus]} />
            </div>
        </div>
    );
};

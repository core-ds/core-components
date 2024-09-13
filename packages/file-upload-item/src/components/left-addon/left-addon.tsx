import React, { useContext, useEffect, useRef } from 'react';
import cn from 'classnames';

import { SuperEllipse } from '@alfalab/core-components/icon-view/super-ellipse';

import { FileUploadItemContext } from '../../context/file-upload-item-context';
import { isErrorStatus, isSuccessStatus, isUploadingStatus } from '../../utils';

import { LeftAddonIcon } from './components/left-addon-icon';

import styles from './left-addon.module.css';

export const LeftAddon = () => {
    const { uploadStatus, progressBar } = useContext(FileUploadItemContext);
    const progressRef = useRef<HTMLDivElement>(null);
    const shouldShowProgress =
        isUploadingStatus(uploadStatus) ||
        isSuccessStatus(uploadStatus) ||
        isErrorStatus(uploadStatus);

    useEffect(() => {
        if (progressRef.current) {
            progressRef.current.style.maskImage = `conic-gradient(red ${progressBar}deg, transparent 0)`;
        }
    }, [progressBar]);

    return (
        <div className={styles.container}>
            <SuperEllipse size={48} backgroundColor='var(--color-light-neutral-translucent-100)'>
                <LeftAddonIcon />
            </SuperEllipse>
            {shouldShowProgress && (
                <div
                    ref={progressRef}
                    className={cn(styles.progress, {
                        [styles.success]: isSuccessStatus(uploadStatus),
                        [styles.error]: isErrorStatus(uploadStatus),
                    })}
                />
            )}
        </div>
    );
};

import React, { useContext } from 'react';
import styles from '../../index.module.css';
import { fileIcon, humanFileSize } from '../../utils';
import cn from 'classnames';
import { ClockMIcon } from '@alfalab/icons-glyph/ClockMIcon';
import { AlertCircleMIcon } from '@alfalab/icons-glyph/AlertCircleMIcon';
import { CheckmarkCircleMIcon } from '@alfalab/icons-glyph/CheckmarkCircleMIcon';
import { Spinner } from '@alfalab/core-components-spinner';
import { FileUploadItemContext } from '../../context/file-upload-item-context';

export const Content = () => {
    const {
        showRestore,
        uploadStatus,
        icon: Icon = fileIcon(''),
        error,
        multiline = false,
        name = '',
        uploadPercent = 0,
        uploadDate,
        size,
    } = useContext(FileUploadItemContext);

    const renderIcon = () => {
        if (showRestore) {
            return <ClockMIcon className={styles.restoreIcon} />;
        }

        switch (uploadStatus) {
            case 'ERROR':
                return <AlertCircleMIcon className={styles.errorIcon} />;
            case 'SUCCESS':
                return <CheckmarkCircleMIcon className={styles.successIcon} />;
            case 'LOADING':
            case 'UPLOADING':
                return (
                    <div className={styles.spinnerWrapper}>
                        <Spinner visible={true} className={styles.spinner} />
                    </div>
                );
            case 'INITIAL':
            default: {
                return <Icon className={styles.icon} />;
            }
        }
    };

    const renderInfoSection = () => {
        const shouldShownError = uploadStatus === 'ERROR' || !!error;
        const errorContent =
            uploadStatus === 'ERROR' && !error ? 'Не удалось загрузить файл' : error;

        return (
            <div className={styles.infoSection}>
                <div className={cn(styles.name, { [styles.rowLimit]: !multiline })}>{name}</div>

                {shouldShownError && (
                    <div className={styles.errorWrapper} role='alert'>
                        {errorContent}
                    </div>
                )}
            </div>
        );
    };

    const showMeta = !showRestore && (!uploadStatus || uploadStatus === 'SUCCESS');

    return (
        <div className={styles.info}>
            {renderIcon()}

            {renderInfoSection()}

            {uploadStatus === 'UPLOADING' && (
                <span className={styles.uploadPercent}>{`${Math.round(uploadPercent)}%`}</span>
            )}

            {showMeta && (
                <div className={styles.meta}>
                    {uploadDate && <span key={uploadDate}>{uploadDate}</span>}

                    {size && (
                        <span key={size} className={styles.size}>
                            {humanFileSize(size)}
                        </span>
                    )}
                </div>
            )}
        </div>
    );
};

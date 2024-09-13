import React, { useContext } from 'react';

import { Typography } from '@alfalab/core-components-typography';
import cn from 'classnames';

import { FileUploadItemContext } from '../../context/file-upload-item-context';
import { humanFileSize } from '../../utils';

import styles from './index.module.css';
import { isError } from './utils/isError';
import { contentError } from './components/content-error';

export const Content = () => {
    const {
        showRestore,
        uploadStatus,
        error,
        title,
        subtitle,
        uploadDate,
        size,
        customContent: CustomContent,
        truncate,
    } = useContext(FileUploadItemContext);

    const shouldShownError = uploadStatus === 'ERROR' || isError(error);
    const showMeta = !showRestore && (!uploadStatus || uploadStatus === 'SUCCESS');

    if (CustomContent) {
        return <CustomContent />;
    }

    return (
        <div className={styles.container}>
            {title && (
                <Typography.Text
                    className={cn(styles.title, {
                        [styles.truncate]: truncate,
                    })}
                    view='component'
                    color='primary'
                >
                    {title}
                </Typography.Text>
            )}

            {subtitle && !shouldShownError && (
                <Typography.Text
                    className={cn(styles.subtitle, {
                        [styles.truncate]: truncate,
                    })}
                    view='primary-small'
                    color='secondary'
                >
                    {subtitle}
                </Typography.Text>
            )}

            {shouldShownError && contentError(error)}

            {showMeta && (
                <div>
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

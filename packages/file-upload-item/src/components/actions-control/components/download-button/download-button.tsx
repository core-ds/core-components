import React, { type MouseEvent } from 'react';

import { IconButton } from '@alfalab/core-components-icon-button';
import ArrowDownLineDownCompactMIcon from '@alfalab/icons-glyph/ArrowDownLineDownCompactMIcon';

import { useFileUploadItemContext } from '../../../../context/file-upload-item-context';

import styles from '../../actions-control.module.css';

export const DownloadButton = () => {
    const {
        id = '0',
        downloadLink,
        download,
        disableButtons,
        target,
        onDownload,
    } = useFileUploadItemContext();

    const handleDownload = (e: MouseEvent<HTMLElement>) => {
        if (onDownload) {
            e.preventDefault();
            onDownload(id);
        }
    };

    return (
        <IconButton
            className={styles.icon}
            size={24}
            aria-label='скачать'
            icon={<ArrowDownLineDownCompactMIcon className={styles.downloadIconColor} />}
            disabled={disableButtons}
            href={downloadLink}
            download={download}
            target={target}
            onClick={handleDownload}
        />
    );
};

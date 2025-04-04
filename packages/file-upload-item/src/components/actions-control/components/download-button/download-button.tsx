import React, { MouseEvent, useContext } from 'react';
import { IconButton } from '@balafla/core-components-icon-button';

import ArrowDownLineDownCompactMIcon from '@alfalab/icons-glyph/ArrowDownLineDownCompactMIcon';

import { FileUploadItemContext } from '../../../../context/file-upload-item-context';

import styles from '../../actions-control.module.css';

export const DownloadButton = () => {
    const {
        id = '0',
        downloadLink,
        download,
        disableButtons,
        target,
        onDownload,
    } = useContext(FileUploadItemContext);

    const handleDownload = (e: MouseEvent<HTMLElement>) => {
        if (onDownload) {
            e.preventDefault();
            onDownload(id);
        }
    };

    return (
        <IconButton
            className={styles.icon}
            size='xxs'
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

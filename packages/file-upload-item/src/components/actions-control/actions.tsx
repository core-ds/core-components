import React, { useContext } from 'react';

import { FileUploadItemContext } from '../../context/file-upload-item-context';

import { DeleteButton } from './components/delete-button';
import { DownloadButton } from './components/download-button';
import { RestoreButton } from './components/restore-button';
import { ReuploadButton } from './components/reupload-button';

import styles from './actions-control.module.css';

export const Actions = () => {
    const { showRestore, downloadLink, showDelete, onDownload, reupload } =
        useContext(FileUploadItemContext);

    return (
        <div className={styles.container}>
            {showRestore && <RestoreButton />}

            {(downloadLink || onDownload) && !showRestore && <DownloadButton />}

            {reupload && <ReuploadButton />}

            {showDelete && !showRestore && <DeleteButton />}
        </div>
    );
};

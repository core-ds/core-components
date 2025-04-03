import React, { useContext, useEffect } from 'react';

import { FileUploadItemContext } from '../../context/file-upload-item-context';

import { DeleteButton } from './components/delete-button';
import { DownloadButton } from './components/download-button';
import { RestoreButton } from './components/restore-button';

import styles from './actions-control.module.css';

export const Actions = () => {
    const { showRestore, downloadLink, showDelete, setActionsPresent } =
        useContext(FileUploadItemContext);

    useEffect(() => {
        if (setActionsPresent) {
            setActionsPresent(true);
        }
    }, [setActionsPresent]);

    return (
        <div className={styles.container}>
            {showRestore && <RestoreButton />}

            {Boolean(downloadLink) && !showRestore && <DownloadButton />}

            {showDelete && !showRestore && <DeleteButton />}
        </div>
    );
};

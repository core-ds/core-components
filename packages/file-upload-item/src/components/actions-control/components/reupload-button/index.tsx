import React, { useContext } from 'react';

import { IconButton } from '@alfalab/core-components-icon-button';
import ArrowsCwCompactMIcon from '@alfalab/icons-glyph/ArrowsCwCompactMIcon';

import { FileUploadItemContext } from '../../../../context/file-upload-item-context';

import styles from '../../actions-control.module.css';

export const ReuploadButton = () => {
    const { id = '0', disableButtons, onReupload } = useContext(FileUploadItemContext);

    const handleRestore = () => {
        if (onReupload) {
            onReupload(id);
        }
    };

    return (
        <IconButton
            className={styles.icon}
            size={24}
            aria-label='повторная загрузка'
            icon={<ArrowsCwCompactMIcon className={styles.restoreIconColor} />}
            disabled={disableButtons}
            onClick={handleRestore}
        />
    );
};

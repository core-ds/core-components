import React, { useContext } from 'react';

import { IconButton } from '@alfalab/core-components-icon-button';
import ArrowsCwCompactMIcon from '@alfalab/icons-glyph/ArrowsCwCompactMIcon';

import { FileUploadItemContext } from '../../../../context/file-upload-item-context';

import styles from '../../actions-control.module.css';

export const RestoreButton = () => {
    const { id = '0', disableButtons, onRestore } = useContext(FileUploadItemContext);

    const handleRestore = () => {
        if (onRestore) {
            onRestore(id);
        }
    };

    return (
        <IconButton
            className={styles.icon}
            size='xxs'
            aria-label='восстановить'
            icon={<ArrowsCwCompactMIcon className={styles.restoreIconColor} />}
            disabled={disableButtons}
            onClick={handleRestore}
        />
    );
};

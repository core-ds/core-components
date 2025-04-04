import React, { MouseEvent, useContext } from 'react';
import { IconButton } from '@balafla/core-components-icon-button';

import CrossMIcon from '@alfalab/icons-glyph/CrossMIcon';

import { FileUploadItemContext } from '../../../../context/file-upload-item-context';

import styles from '../../actions-control.module.css';

export const DeleteButton = () => {
    const { id = '0', disableButtons, onDelete } = useContext(FileUploadItemContext);

    const handleDelete = (e: MouseEvent<HTMLElement>) => {
        if (onDelete) {
            onDelete(id, e);
        }
    };

    return (
        <IconButton
            className={styles.icon}
            size='xxs'
            aria-label='удалить'
            icon={<CrossMIcon className={styles.deleteIconColor} />}
            disabled={disableButtons}
            onClick={handleDelete}
        />
    );
};

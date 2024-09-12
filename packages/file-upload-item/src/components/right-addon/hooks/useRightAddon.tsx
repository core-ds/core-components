import { MouseEvent, useContext } from 'react';

import { FileUploadItemContext } from '../../../context/file-upload-item-context';

export const useRightAddon = () => {
    const {
        showRestore,
        id = '0',
        downloadLink,
        download,
        disableButtons,
        target,
        showDelete,
        onDownload,
        onDelete,
        onRestore,
    } = useContext(FileUploadItemContext);

    const handleDownload = (e: MouseEvent<HTMLElement>) => {
        if (onDownload) {
            e.preventDefault();
            onDownload(id);
        }
    };

    const handleDelete = (event: MouseEvent<HTMLElement>) => {
        if (onDelete) {
            onDelete(id, event);
        }
    };

    const handleRestore = () => {
        if (onRestore) {
            onRestore(id);
        }
    };

    return {
        downloadLink,
        showRestore,
        disableButtons,
        download,
        target,
        showDelete,
        handleDownload,
        handleDelete,
        handleRestore,
    };
};

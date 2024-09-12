import React, { Fragment, MouseEvent, useContext } from 'react';
import { Link } from '@alfalab/core-components-link';
import styles from '../../index.module.css';
import { IconButton } from '@alfalab/core-components-icon-button';
import { PointerDownSIcon } from '@alfalab/icons-glyph/PointerDownSIcon';
import { CrossSIcon } from '@alfalab/icons-glyph/CrossSIcon';
import { FileUploadItemContext } from '../../context/file-upload-item-context';

export const RightAddon = () => {
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

    const handleDownload = (event: MouseEvent<HTMLElement>) => {
        if (onDownload) {
            event.preventDefault();
            onDownload(id);
        }
    };

    const handleDelete = (event: MouseEvent<HTMLElement>) => {
        if (onDelete) onDelete(id, event);
    };

    const handleRestore = () => {
        if (onRestore) onRestore(id);
    };

    const showDownload = Boolean(downloadLink) && !showRestore;

    return (
        <Fragment>
            {showRestore && (
                <Link pseudo={true} className={styles.restore} onClick={handleRestore}>
                    Восстановить
                </Link>
            )}

            {showDownload && (
                <IconButton
                    size='xxs'
                    icon={PointerDownSIcon}
                    className={styles.download}
                    aria-label='скачать'
                    href={downloadLink}
                    onClick={handleDownload}
                    disabled={disableButtons}
                    download={download}
                    target={target}
                />
            )}

            {showDelete && !showRestore && (
                <IconButton
                    size='xxs'
                    icon={CrossSIcon}
                    onClick={handleDelete}
                    disabled={disableButtons}
                    className={styles.delete}
                    aria-label='удалить'
                />
            )}
        </Fragment>
    );
};

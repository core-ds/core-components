import React from 'react';
import cn from 'classnames';

import { ActionsControl } from './components/actions-control';
import { Content } from './components/content';
import { StatusControl } from './components/status-control';
import { FileUploadItemContext } from './context/file-upload-item-context';
import { FileUploadItemProps } from './types/file-upload-item-props';

import styles from './index.module.css';

export const FileUploadItemComponent: React.FC<FileUploadItemProps> = ({
    className,
    children,
    id = '0',
    title = '',
    subtitle,
    size,
    uploadDate,
    downloadLink,
    download,
    uploadStatus,
    error,
    showDelete,
    showRestore,
    onDelete,
    onDownload,
    onRestore,
    disableButtons,
    target,
    dataTestId,
    customIcon,
    iconStyle = 'gray',
    progressBar = 0,
    customContent,
    truncate,
    imageUrl,
}) => (
    <div
        className={cn(
            className,
            styles.component,
            uploadStatus && styles[uploadStatus.toLocaleLowerCase()],
        )}
        data-test-id={dataTestId}
    >
        <FileUploadItemContext.Provider
            // eslint-disable-next-line react/jsx-no-constructed-context-values
            value={{
                showRestore,
                uploadStatus,
                error,
                title,
                subtitle,
                uploadDate,
                size,
                id,
                onDownload,
                onDelete,
                onRestore,
                downloadLink,
                download,
                disableButtons,
                target,
                showDelete,
                customIcon,
                iconStyle,
                progressBar,
                customContent,
                truncate,
                imageUrl,
            }}
        >
            {children}
        </FileUploadItemContext.Provider>
    </div>
);

export const FileUploadItem = Object.assign(FileUploadItemComponent, {
    StatusControl,
    Content,
    ActionsControl,
});

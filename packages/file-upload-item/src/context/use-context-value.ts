import { type ContextType, useMemo } from 'react';

import { type FileUploadItemProps } from '../types/file-upload-item-props';

import { type FileUploadItemContext } from './file-upload-item-context';

type UseContextValueProps = Omit<FileUploadItemProps, 'className' | 'dataTestId' | 'children'>;

export const useContextValue = (
    props: UseContextValueProps,
): ContextType<typeof FileUploadItemContext> => {
    const {
        id = '0',
        title = '',
        isClickable = true,
        iconStyle = 'gray',
        progressBar = 0,
        progressBarAvailable = true,
        showRestore,
        uploadStatus,
        error,
        subtitle,
        uploadDate,
        size,
        onDownload,
        onDelete,
        onRestore,
        downloadLink,
        download,
        disableButtons,
        target,
        showDelete,
        customIcon,
        customContent,
        truncate,
        imageUrl,
        backgroundColor,
        reupload,
    } = props;

    const actionsPresent = Boolean(
        showRestore || downloadLink || showDelete || onDownload || reupload,
    );

    return useMemo(
        () => ({
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
            isClickable,
            target,
            showDelete,
            customIcon,
            iconStyle,
            progressBar,
            progressBarAvailable,
            customContent,
            truncate,
            imageUrl,
            backgroundColor,
            actionsPresent,
            reupload,
        }),
        [
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
            isClickable,
            target,
            showDelete,
            customIcon,
            iconStyle,
            progressBar,
            progressBarAvailable,
            customContent,
            truncate,
            imageUrl,
            backgroundColor,
            actionsPresent,
            reupload,
        ],
    );
};

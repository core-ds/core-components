import React, { type FC } from 'react';
import cn from 'classnames';

import { Actions } from './components/actions-control';
import { Content } from './components/content';
import { StatusControl } from './components/status-control';
import { FileUploadItemContext } from './context/file-upload-item-context';
import { useContextValue } from './context/use-context-value';
import { type FileUploadItemProps } from './types/file-upload-item-props';

import styles from './index.module.css';

export const FileUploadItemComponent: FC<FileUploadItemProps> = ({
    className,
    children,
    dataTestId,
    uploadStatus,
    ...rest
}) => {
    const contextValue = useContextValue({ uploadStatus, ...rest });

    return (
        <div
            className={cn(
                className,
                styles.component,
                uploadStatus && styles[uploadStatus.toLocaleLowerCase()],
            )}
            data-test-id={dataTestId}
        >
            <FileUploadItemContext.Provider value={contextValue}>
                {children}
            </FileUploadItemContext.Provider>
        </div>
    );
};

export const FileUploadItem = Object.assign(FileUploadItemComponent, {
    StatusControl,
    Content,
    Actions,
});

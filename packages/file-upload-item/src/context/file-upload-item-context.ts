import { createContext, useContext } from 'react';

import { type FileUploadItemProps } from '../types/file-upload-item-props';

interface ContextType
    extends Pick<
        FileUploadItemProps,
        | 'showRestore'
        | 'uploadStatus'
        | 'error'
        | 'title'
        | 'subtitle'
        | 'uploadDate'
        | 'size'
        | 'id'
        | 'onDownload'
        | 'onDelete'
        | 'onRestore'
        | 'downloadLink'
        | 'download'
        | 'disableButtons'
        | 'isClickable'
        | 'target'
        | 'showDelete'
        | 'customIcon'
        | 'iconStyle'
        | 'progressBar'
        | 'progressBarAvailable'
        | 'customContent'
        | 'truncate'
        | 'imageUrl'
        | 'backgroundColor'
        | 'reupload'
    > {
    actionsPresent?: boolean;
}

export const FileUploadItemContext = createContext<ContextType>({});

export const useFileUploadItemContext = (): ContextType => useContext(FileUploadItemContext);

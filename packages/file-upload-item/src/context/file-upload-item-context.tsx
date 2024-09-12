import {
    createContext,
    ElementType,
    HTMLAttributeAnchorTarget,
    MouseEvent,
    ReactNode,
} from 'react';

import { FileStatuses, FileTypes } from '../types';

type TFileUploadItemContext = {
    showRestore?: boolean;
    uploadStatus?: FileStatuses;
    error?: ReactNode;
    multiline?: boolean;
    title?: string;
    subtitle?: string;
    uploadPercent?: number;
    uploadDate?: string;
    size?: string | number;
    id?: string;
    onDownload?: (id: string) => void;
    onDelete?: (id: string, event?: MouseEvent<HTMLElement>) => void;
    onRestore?: (id: string) => void;
    downloadLink?: string;
    download?: string | true;
    disableButtons?: boolean;
    target?: HTMLAttributeAnchorTarget;
    showDelete?: boolean;
    fileType: FileTypes;
    customIcon?: ElementType<{ className?: string }>;
    iconStyle?: 'gray' | 'colored';
};

export const FileUploadItemContext = createContext<TFileUploadItemContext>({
    showRestore: false,
    uploadStatus: 'ERROR',
    error: null,
    multiline: false,
    title: '',
    subtitle: '',
    uploadPercent: 0,
    uploadDate: '',
    size: 0,
    id: '0',
    onDownload: undefined,
    onDelete: undefined,
    onRestore: undefined,
    downloadLink: '',
    download: '',
    disableButtons: false,
    target: undefined,
    showDelete: false,
    fileType: 'attach',
    iconStyle: 'gray',
    customIcon: undefined,
});

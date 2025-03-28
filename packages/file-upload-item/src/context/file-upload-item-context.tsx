import { createContext, ElementType, HTMLAttributeAnchorTarget, MouseEvent } from 'react';

import { type FileUploadItemStatus } from '../types/status';

type TFileUploadItemContext = {
    showRestore?: boolean;
    uploadStatus?: FileUploadItemStatus;
    error?: string | string[];
    title?: string;
    subtitle?: string;
    uploadDate?: string;
    size?: string | number;
    id?: string;
    onDownload?: (id: string) => void;
    onDelete?: (id: string, event?: MouseEvent<HTMLElement>) => void;
    onRestore?: (id: string) => void;
    downloadLink?: string;
    download?: string | true;
    disableButtons?: boolean;
    isClickable?: boolean;
    target?: HTMLAttributeAnchorTarget;
    showDelete?: boolean;
    customIcon?: ElementType<{ className?: string }>;
    iconStyle?: 'gray' | 'colored';
    progressBar?: number;
    customContent?: ElementType;
    truncate?: boolean;
    imageUrl?: string;
    actionsPresent?: boolean;
    setActionsPresent?: (present: boolean) => void;
};

export const FileUploadItemContext = createContext<TFileUploadItemContext>({
    showRestore: false,
    uploadStatus: 'INITIAL',
    error: undefined,
    title: '',
    subtitle: '',
    uploadDate: '',
    size: 0,
    id: '0',
    onDownload: undefined,
    onDelete: undefined,
    onRestore: undefined,
    downloadLink: '',
    download: '',
    disableButtons: false,
    isClickable: true,
    target: undefined,
    showDelete: false,
    iconStyle: 'gray',
    customIcon: undefined,
    progressBar: 0,
    customContent: undefined,
    truncate: false,
    imageUrl: undefined,
    actionsPresent: false,
    setActionsPresent: undefined,
});

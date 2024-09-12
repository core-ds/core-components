import {
    createContext,
    ElementType,
    HTMLAttributeAnchorTarget,
    MouseEvent,
    ReactNode,
} from 'react';
import { FileStatuses } from '../types';
import { fileIcon } from '../utils';

type TFileUploadItemContext = {
    showRestore?: boolean;
    uploadStatus?: FileStatuses;
    icon?: ElementType<{ className?: string }>;
    error?: ReactNode;
    multiline?: boolean;
    name?: string;
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
};

export const FileUploadItemContext = createContext<TFileUploadItemContext>({
    showRestore: false,
    uploadStatus: 'ERROR',
    icon: fileIcon(''),
    error: null,
    multiline: false,
    name: '',
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
});

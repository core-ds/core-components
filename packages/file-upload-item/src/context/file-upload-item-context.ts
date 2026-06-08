import {
    createContext,
    type ElementType,
    type HTMLAttributeAnchorTarget,
    type MouseEvent,
} from 'react';

import { type SuperEllipseProps } from '@alfalab/core-components-icon-view/super-ellipse';

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
    progressBarAvailable?: boolean;
    customContent?: ElementType;
    truncate?: boolean;
    imageUrl?: string;
    backgroundColor?: SuperEllipseProps['backgroundColor'];
    actionsPresent?: boolean;
    setActionsPresent?: (present: boolean) => void;
    dataTestId?: string;
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
    progressBarAvailable: true,
    customContent: undefined,
    truncate: false,
    imageUrl: undefined,
    backgroundColor: undefined,
    actionsPresent: false,
    setActionsPresent: undefined,
    dataTestId: '',
});

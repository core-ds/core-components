import React, { useContext } from 'react';
import cn from 'classnames';

import { Document1CMIcon } from '@alfalab/icons-glyph/Document1CMIcon';
import { DocumentDocMIcon } from '@alfalab/icons-glyph/DocumentDocMIcon';
import { DocumentExcelMIcon } from '@alfalab/icons-glyph/DocumentExcelMIcon';
import { DocumentImageMIcon } from '@alfalab/icons-glyph/DocumentImageMIcon';
import { DocumentMIcon } from '@alfalab/icons-glyph/DocumentMIcon';
import DocumentOffMIcon from '@alfalab/icons-glyph/DocumentOffMIcon';
import { DocumentPdfMIcon } from '@alfalab/icons-glyph/DocumentPdfMIcon';
import { PaperclipMIcon } from '@alfalab/icons-glyph/PaperclipMIcon';

import { FileUploadItemContext } from '../../../../context/file-upload-item-context';
import { getExtension, isInitialStatus } from '../../../../utils';

import styles from './status-control-icon.module.css';

/* eslint-disable complexity */
export const StatusControlIcon = () => {
    const {
        title = '',
        uploadStatus,
        iconStyle,
        customIcon: CustomIcon,
        imageUrl,
        showRestore,
    } = useContext(FileUploadItemContext);

    if (imageUrl) {
        return null;
    }

    if (CustomIcon) {
        return <CustomIcon />;
    }

    if (isInitialStatus(uploadStatus)) {
        return <PaperclipMIcon />;
    }

    if (showRestore) {
        return <DocumentOffMIcon />;
    }

    const isColoredIcon = iconStyle === 'colored';
    const fileType = getExtension(title);

    switch (fileType) {
        case 'pdf':
        case 'ppt':
        case 'pptx':
            return <DocumentPdfMIcon className={cn({ [styles.iconPDFColored]: isColoredIcon })} />;
        case 'doc':
        case 'docx':
            return <DocumentDocMIcon className={cn({ [styles.iconDOCColored]: isColoredIcon })} />;
        case 'xls':
        case 'xlsx':
            return (
                <DocumentExcelMIcon className={cn({ [styles.iconExcelColored]: isColoredIcon })} />
            );
        case '1c':
            return <Document1CMIcon className={cn({ [styles.icon1CColored]: isColoredIcon })} />;
        case 'png':
        case 'jpg':
        case 'jpeg':
        case 'svg':
        case 'tif':
        case 'tiff':
            return <DocumentImageMIcon />;
        default:
            return (
                <DocumentMIcon className={cn({ [styles.iconDocumentColored]: isColoredIcon })} />
            );
    }
};

import React, { useContext } from 'react';

import { Document1CMIcon } from '@alfalab/icons-glyph/Document1CMIcon';
import { DocumentDocMIcon } from '@alfalab/icons-glyph/DocumentDocMIcon';
import { DocumentExcelMIcon } from '@alfalab/icons-glyph/DocumentExcelMIcon';
import { DocumentImageOffMIcon } from '@alfalab/icons-glyph/DocumentImageOffMIcon';
import { DocumentMIcon } from '@alfalab/icons-glyph/DocumentMIcon';
import { DocumentOffMIcon } from '@alfalab/icons-glyph/DocumentOffMIcon';
import { DocumentPdfMIcon } from '@alfalab/icons-glyph/DocumentPdfMIcon';
import { PaperclipMIcon } from '@alfalab/icons-glyph/PaperclipMIcon';

import { FileUploadItemContext } from '../../../context/file-upload-item-context';
import { FileTypeMap } from '../../const/file-type-map';

export const LeftAddonIcon = () => {
    const { fileType, iconStyle, customIcon: CustomIcon } = useContext(FileUploadItemContext);
    const isColoredIcon = iconStyle === 'colored';

    if (CustomIcon) {
        return <CustomIcon />;
    }

    switch (fileType) {
        case FileTypeMap.pdf:
            return (
                <DocumentPdfMIcon
                    {...(isColoredIcon && { color: 'var(--color-light-decorative-red)' })}
                />
            );
        case FileTypeMap.doc:
        case FileTypeMap.docx:
            return (
                <DocumentDocMIcon
                    {...(isColoredIcon && { color: 'var(--color-light-decorative-blue)' })}
                />
            );
        case FileTypeMap.xls:
        case FileTypeMap.xlsx:
            return (
                <DocumentExcelMIcon
                    {...(isColoredIcon && { color: 'var(--color-light-decorative-green)' })}
                />
            );
        case FileTypeMap['1c']:
            return (
                <Document1CMIcon
                    {...(isColoredIcon && { color: 'var(--color-light-decorative-orange)' })}
                />
            );
        case FileTypeMap.document:
            return (
                <DocumentMIcon
                    {...(isColoredIcon && {
                        color: 'var(--color-light-neutral-translucent-1300)',
                    })}
                />
            );
        case FileTypeMap['deleted-document']:
            return <DocumentOffMIcon />;
        case FileTypeMap['deleted-image']:
            return <DocumentImageOffMIcon />;
        case FileTypeMap.attach:
        default:
            return <PaperclipMIcon />;
    }
};

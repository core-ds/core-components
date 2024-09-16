import React, { useContext } from 'react';

import { Document1CMIcon } from '@alfalab/icons-glyph/Document1CMIcon';
import { DocumentDocMIcon } from '@alfalab/icons-glyph/DocumentDocMIcon';
import { DocumentExcelMIcon } from '@alfalab/icons-glyph/DocumentExcelMIcon';
import { DocumentMIcon } from '@alfalab/icons-glyph/DocumentMIcon';
import { DocumentPdfMIcon } from '@alfalab/icons-glyph/DocumentPdfMIcon';
import { PaperclipMIcon } from '@alfalab/icons-glyph/PaperclipMIcon';

import { FileTypeMap } from '../../../../const/file-type-map';
import { FileUploadItemContext } from '../../../../context/file-upload-item-context';
import { getExtension, isInitialStatus } from '../../../../utils';

export const LeftAddonIcon = () => {
    const {
        title = '',
        uploadStatus,
        iconStyle,
        customIcon: CustomIcon,
        imageUrl,
    } = useContext(FileUploadItemContext);

    if (imageUrl) {
        return null;
    }

    const isColoredIcon = iconStyle === 'colored';
    const fileType = getExtension(title);

    if (CustomIcon) {
        return <CustomIcon />;
    }

    if (isInitialStatus(uploadStatus)) {
        return <PaperclipMIcon />;
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
        default:
            return (
                <DocumentMIcon
                    {...(isColoredIcon && {
                        color: 'var(--color-light-neutral-translucent-1300)',
                    })}
                />
            );
    }
};

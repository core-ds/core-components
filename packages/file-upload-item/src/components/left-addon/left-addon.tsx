import React, { useContext } from 'react';

import { SuperEllipse } from '@alfalab/core-components/icon-view/super-ellipse';
import { Document1CMIcon } from '@alfalab/icons-glyph/Document1CMIcon';
import { DocumentDocMIcon } from '@alfalab/icons-glyph/DocumentDocMIcon';
import { DocumentExcelMIcon } from '@alfalab/icons-glyph/DocumentExcelMIcon';
import { DocumentImageOffMIcon } from '@alfalab/icons-glyph/DocumentImageOffMIcon';
import { DocumentMIcon } from '@alfalab/icons-glyph/DocumentMIcon';
import { DocumentOffMIcon } from '@alfalab/icons-glyph/DocumentOffMIcon';
import { DocumentPdfMIcon } from '@alfalab/icons-glyph/DocumentPdfMIcon';
import { PaperclipMIcon } from '@alfalab/icons-glyph/PaperclipMIcon';

import { FileUploadItemContext } from '../../context/file-upload-item-context';
import { FileTypes } from '../../types';
import { FileTypeMap } from '../const/file-type-map';

export const LeftAddon = () => {
    const { fileType, iconStyle, customIcon: CustomIcon } = useContext(FileUploadItemContext);

    const isColoredIcon = iconStyle === 'colored';

    const getIcon = (fileType: FileTypes) => {
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

    return (
        <SuperEllipse size={48} backgroundColor='var(--color-light-neutral-translucent-100)'>
            {getIcon(fileType)}
        </SuperEllipse>
    );
};

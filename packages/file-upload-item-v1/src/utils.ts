import { DocumentDocMIcon } from '@alfalab/icons-glyph/DocumentDocMIcon';
import { DocumentImageMIcon } from '@alfalab/icons-glyph/DocumentImageMIcon';
import { DocumentPdfMIcon } from '@alfalab/icons-glyph/DocumentPdfMIcon';
import { DocumentTxtMIcon } from '@alfalab/icons-glyph/DocumentTxtMIcon';
import { DocumentUnknownMIcon } from '@alfalab/icons-glyph/DocumentUnknownMIcon';

export const getExtension = (filename: string) => filename.toLowerCase().split('.').pop();

export function fileIcon(filename: string) {
    const extension = getExtension(filename);

    switch (extension) {
        case 'png':
        case 'jpg':
        case 'jpeg':
        case 'svg':
        case 'tif':
        case 'tiff':
            return DocumentImageMIcon;
        case 'doc':
        case 'docx':
            return DocumentDocMIcon;
        case 'pdf':
            return DocumentPdfMIcon;
        case 'txt':
            return DocumentTxtMIcon;
        default:
            return DocumentUnknownMIcon;
    }
}

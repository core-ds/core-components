import { humanFileSize } from '@alfalab/core-components-shared';

import {
    getExtension,
    isErrorStatus,
    isInitialStatus,
    isSuccessStatus,
    isUploadedStatus,
    isUploadingStatus,
} from './utils';

describe('humanFileSize', () => {
    const cases = [
        [1, '1 Б'],
        [10, '10 Б'],
        [100, '100 Б'],
        [1000, '1000 Б'],
        [10000, '9.77 КБ'],
        [100000, '97.66 КБ'],
        [1000000, '976.56 КБ'],
        [10000000, '9.54 МБ'],
        [100000000, '95.37 МБ'],
        [1000000000, '953.67 МБ'],
        [10000000000, '9.31 ГБ'],
        [100000000000, '93.13 ГБ'],
        [1000000000000, '931.32 ГБ'],
        [10000000000000, '9313.23 ГБ'],
    ];

    it.each(cases)('humanFileSize(%i)', (a, expected) => {
        expect(humanFileSize(a)).toBe(expected);
    });
});

describe('getExtension', () => {
    it('should docx', () => {
        expect(getExtension('Имя файла.docx')).toBe('docx');
    });
});

describe('check statuses', () => {
    it('should initial status', () => {
        expect(isInitialStatus('INITIAL')).toBe(true);
    });
    it('should success status', () => {
        expect(isSuccessStatus('SUCCESS')).toBe(true);
    });
    it('should error status', () => {
        expect(isErrorStatus('ERROR')).toBe(true);
    });
    it('should uploading status', () => {
        expect(isUploadingStatus('UPLOADING')).toBe(true);
    });
    it('should uploaded status', () => {
        expect(isUploadedStatus('UPLOADED')).toBe(true);
    });
});

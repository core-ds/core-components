import { UploadStatusMap } from './components/const/upload-status-map';
import { FileStatuses } from './types';

export function humanFileSize(size: string | number) {
    const units = ['Б', 'КБ', 'МБ', 'ГБ'];

    let humanSize: string | number = Number(size);
    let factor = 0;

    while (humanSize >= 1024 && factor < units.length - 1) {
        humanSize /= 1024;
        factor += 1;
    }

    humanSize = humanSize.toFixed(2);

    return `${Number(humanSize)} ${units[factor]}`;
}

export const isSuccessStatus = (status?: FileStatuses) => status === UploadStatusMap.SUCCESS;
export const isErrorStatus = (status?: FileStatuses) => status === UploadStatusMap.ERROR;
export const isUploadingStatus = (status?: FileStatuses) => status === UploadStatusMap.UPLOADING;

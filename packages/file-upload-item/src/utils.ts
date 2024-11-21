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

export const getExtension = (filename: string) => filename.toLowerCase().split('.').pop();

export const isInitialStatus = (status?: string) => status === 'INITIAL';
export const isSuccessStatus = (status?: string) => status === 'SUCCESS';
export const isErrorStatus = (status?: string) => status === 'ERROR';
export const isUploadingStatus = (status?: string) => status === 'UPLOADING';
export const isUploadedStatus = (status?: string) => status === 'UPLOADED';

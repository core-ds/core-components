const downloadWithBlob = (blob: Blob, fileName: string): void => {
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');

    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setTimeout(() => URL.revokeObjectURL(url), 100);
};

const downloadWithLink = (url: string, fileName: string): void => {
    const link = document.createElement('a');

    link.href = url;
    link.download = fileName;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};

const canUseBlobDownload = (): boolean =>
    typeof fetch === 'function' &&
    typeof URL.createObjectURL === 'function' &&
    typeof URL.revokeObjectURL === 'function';

const canUseFileShare = (): boolean =>
    typeof File === 'function' &&
    typeof navigator !== 'undefined' &&
    typeof navigator.share === 'function' &&
    typeof navigator.canShare === 'function';

const canShareFiles = (files: File[]): boolean =>
    canUseFileShare() && navigator.canShare({ files });

const getBlob = async (url: string): Promise<Blob> => {
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error('Network error');
    }

    return response.blob();
};

const isAbortError = (error: unknown): boolean =>
    typeof DOMException !== 'undefined' &&
    error instanceof DOMException &&
    error.name === 'AbortError';

export interface DownloadOptions {
    url: string;
    fileName?: string;
    fileType?: string;
}

export const downloadFile = async ({
    url,
    fileName = 'download',
    fileType,
}: DownloadOptions): Promise<void> => {
    if (!canUseBlobDownload()) {
        downloadWithLink(url, fileName);

        return;
    }

    if (canUseFileShare() && canShareFiles([new File([], fileName, { type: fileType })])) {
        try {
            const blob = await getBlob(url);

            const file = new File([blob], fileName, { type: blob.type || fileType });

            if (!canShareFiles([file])) {
                downloadWithBlob(blob, fileName);

                return;
            }

            await navigator.share({
                files: [file],
                title: `Скачать ${fileName}`,
            });

            return;
        } catch (error) {
            if (isAbortError(error)) {
                return;
            }

            downloadWithLink(url, fileName);

            return;
        }
    }

    try {
        const blob = await getBlob(url);

        downloadWithBlob(blob, fileName);
    } catch {
        downloadWithLink(url, fileName);
    }
};

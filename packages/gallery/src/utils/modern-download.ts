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
    if ('share' in navigator && navigator?.canShare) {
        const response = await fetch(url);
        const blob = await response.blob();

        const file = new File([blob], fileName, { type: blob.type || fileType });

        if (navigator?.canShare?.({ files: [file] })) {
            await navigator.share({
                files: [file],
                title: `Скачать ${fileName}`,
            });

            return;
        }
    }

    if ('WritableStream' in window && 'ReadableStream' in window) {
        const response = await fetch(url);

        if (!response.ok) throw new Error('Network error');

        const contentLength = response.headers.get('content-length');
        const isLargeFile = contentLength && parseInt(contentLength, 10) > 10 * 1024 * 1024; // 10MB

        if (isLargeFile && response.body) {
            const reader = response.body.getReader();
            const chunks: Uint8Array[] = [];

            const readAllChunks = async (): Promise<void> => {
                const { done, value } = await reader.read();

                if (!done) {
                    chunks.push(value);

                    return readAllChunks();
                }

                return Promise.resolve();
            };

            await readAllChunks();
            const blob = new Blob(chunks);

            downloadWithBlob(blob, fileName);

            return;
        }

        const blob = await response.blob();

        downloadWithBlob(blob, fileName);

        return;
    }

    downloadWithLink(url, fileName);
};

import { downloadFile } from './modern-download';

const url = 'https://example.com/file.mp4';
const fileName = 'video.mp4';

const mockFetch = (blob: Blob, ok = true) => {
    global.fetch = jest.fn().mockResolvedValue({
        ok,
        blob: jest.fn().mockResolvedValue(blob),
    } as unknown as Response);
};

const mockShare = (canShare = false) => {
    Object.defineProperty(navigator, 'canShare', {
        configurable: true,
        value: jest.fn().mockReturnValue(canShare),
    });
    Object.defineProperty(navigator, 'share', {
        configurable: true,
        value: jest.fn().mockResolvedValue(undefined),
    });
};

const restoreShare = () => {
    Object.defineProperty(navigator, 'canShare', {
        configurable: true,
        value: undefined,
    });
    Object.defineProperty(navigator, 'share', {
        configurable: true,
        value: undefined,
    });
};

describe('downloadFile', () => {
    let clickMock: jest.SpyInstance;
    let createObjectURLMock: jest.SpyInstance;
    let revokeObjectURLMock: jest.SpyInstance;

    beforeEach(() => {
        jest.useFakeTimers();

        Object.defineProperty(URL, 'createObjectURL', {
            configurable: true,
            value: jest.fn(),
        });
        Object.defineProperty(URL, 'revokeObjectURL', {
            configurable: true,
            value: jest.fn(),
        });

        clickMock = jest.spyOn(HTMLAnchorElement.prototype, 'click').mockImplementation(jest.fn());
        createObjectURLMock = jest.spyOn(URL, 'createObjectURL').mockReturnValue('blob:url');
        revokeObjectURLMock = jest.spyOn(URL, 'revokeObjectURL').mockImplementation(jest.fn());

        restoreShare();
    });

    afterEach(() => {
        jest.runOnlyPendingTimers();
        jest.useRealTimers();
        jest.restoreAllMocks();
        restoreShare();
    });

    it('should download fetched blob', async () => {
        const blob = new Blob(['content'], { type: 'video/mp4' });

        mockFetch(blob);

        await downloadFile({ url, fileName });

        expect(fetch).toHaveBeenCalledWith(url);
        expect(createObjectURLMock).toHaveBeenCalledWith(blob);
        expect(clickMock).toHaveBeenCalled();

        jest.runOnlyPendingTimers();

        expect(revokeObjectURLMock).toHaveBeenCalledWith('blob:url');
    });

    it('should fallback to direct link if fetch fails', async () => {
        global.fetch = jest.fn().mockRejectedValue(new Error('Failed to fetch'));

        await downloadFile({ url, fileName });

        expect(createObjectURLMock).not.toHaveBeenCalled();
        expect(clickMock).toHaveBeenCalled();
    });

    it('should share file when Web Share API supports files', async () => {
        const blob = new Blob(['content'], { type: 'video/mp4' });

        mockFetch(blob);
        mockShare(true);

        await downloadFile({ url, fileName, fileType: 'video/*' });

        expect(navigator.share).toHaveBeenCalledWith({
            files: [expect.any(File)],
            title: `Скачать ${fileName}`,
        });
        expect(clickMock).not.toHaveBeenCalled();
    });

    it('should not fallback to download after cancelled native share', async () => {
        const blob = new Blob(['content'], { type: 'video/mp4' });
        const abortError = new DOMException('Share cancelled', 'AbortError');

        mockFetch(blob);
        mockShare(true);
        (navigator.share as jest.Mock).mockRejectedValueOnce(abortError);

        await downloadFile({ url, fileName, fileType: 'video/*' });

        expect(clickMock).not.toHaveBeenCalled();
    });
});

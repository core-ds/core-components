import { checkImageIsBroken } from './check-image-is-broken';

type EventType = 'load' | 'error';

type MockImageConstructorParams = {
    eventType: EventType;
    decode: () => Promise<void>;
};

const getMockImageConstructor = ({ eventType, decode }: MockImageConstructorParams) => {
    function MockImage(this: {
        onload: null | (() => void);
        onerror: null | (() => void);
        decode: () => Promise<void>;
    }) {
        this.onload = null;
        this.onerror = null;
        this.decode = decode;
    }

    Object.defineProperty(MockImage.prototype, 'src', {
        set(this: { onload: null | (() => void); onerror: null | (() => void) }) {
            if (eventType === 'load') {
                this.onload?.();
            } else {
                this.onerror?.();
            }
        },
    });

    return MockImage as unknown as typeof Image;
};

describe('checkImageIsBroken', () => {
    const originalCreateImageBitmap = global.createImageBitmap;
    const originalImage = global.Image;

    afterEach(() => {
        global.createImageBitmap = originalCreateImageBitmap;
        global.Image = originalImage;
    });

    it('should return false for valid image via createImageBitmap', async () => {
        const close = jest.fn();

        global.createImageBitmap = jest.fn().mockResolvedValue({
            close,
        } as unknown as ImageBitmap);
        global.Image = getMockImageConstructor({
            eventType: 'load',
            decode: jest.fn().mockResolvedValue(undefined),
        });

        await new Promise<void>((resolve) => {
            checkImageIsBroken({
                imageUrl: 'https://test-url',
                onResolve: (isBroken) => {
                    expect(isBroken).toBe(false);
                    expect(close).toHaveBeenCalled();
                    resolve();
                },
            });
        });
    });

    it('should use decode fallback when createImageBitmap fails', async () => {
        global.createImageBitmap = jest.fn().mockRejectedValue(new Error('bitmap failed'));
        global.Image = getMockImageConstructor({
            eventType: 'load',
            decode: jest.fn().mockResolvedValue(undefined),
        });

        await new Promise<void>((resolve) => {
            checkImageIsBroken({
                imageUrl: 'https://test-url',
                onResolve: (isBroken) => {
                    expect(isBroken).toBe(false);
                    resolve();
                },
            });
        });
    });

    it('should return true when decode fallback also fails', async () => {
        global.createImageBitmap = jest.fn().mockRejectedValue(new Error('bitmap failed'));
        global.Image = getMockImageConstructor({
            eventType: 'load',
            decode: jest.fn().mockRejectedValue(new Error('decode failed')),
        });

        await new Promise<void>((resolve) => {
            checkImageIsBroken({
                imageUrl: 'https://test-url',
                onResolve: (isBroken) => {
                    expect(isBroken).toBe(true);
                    resolve();
                },
            });
        });
    });

    it('should return true on image onerror', async () => {
        global.createImageBitmap = jest.fn();
        global.Image = getMockImageConstructor({
            eventType: 'error',
            decode: jest.fn().mockResolvedValue(undefined),
        });

        await new Promise<void>((resolve) => {
            checkImageIsBroken({
                imageUrl: 'https://test-url',
                onResolve: (isBroken) => {
                    expect(isBroken).toBe(true);
                    resolve();
                },
            });
        });
    });
});

import { renderHook, act } from '@testing-library/react-hooks';

import { checkImageIsBroken } from './check-image-is-broken';
import { useCheckImageIsBroken } from './use-check-image-is-broken';

jest.mock('./check-image-is-broken', () => ({
    checkImageIsBroken: jest.fn(),
}));

const mockedCheckImageIsBroken = jest.mocked(checkImageIsBroken);

describe('useCheckImageIsBroken', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should keep default state for empty imageUrl', () => {
        const onImageBrokenChange = jest.fn();
        const { result } = renderHook(() =>
            useCheckImageIsBroken({ imageUrl: undefined, onImageBrokenChange }),
        );

        expect(result.current).toBe(false);
        expect(onImageBrokenChange).toHaveBeenCalledWith(false);
        expect(mockedCheckImageIsBroken).not.toHaveBeenCalled();
    });

    it('should set false for valid image', () => {
        mockedCheckImageIsBroken.mockImplementation(({ onResolve }) => {
            onResolve(false);
        });

        const onImageBrokenChange = jest.fn();
        const { result } = renderHook(() =>
            useCheckImageIsBroken({ imageUrl: 'https://valid-image', onImageBrokenChange }),
        );

        expect(result.current).toBe(false);
        expect(onImageBrokenChange).toHaveBeenNthCalledWith(1, false);
        expect(onImageBrokenChange).toHaveBeenNthCalledWith(2, false);
    });

    it('should set true for broken image', () => {
        mockedCheckImageIsBroken.mockImplementation(({ onResolve }) => {
            onResolve(true);
        });

        const onImageBrokenChange = jest.fn();
        const { result } = renderHook(() =>
            useCheckImageIsBroken({ imageUrl: 'https://broken-image', onImageBrokenChange }),
        );

        expect(result.current).toBe(true);
        expect(onImageBrokenChange).toHaveBeenNthCalledWith(1, false);
        expect(onImageBrokenChange).toHaveBeenNthCalledWith(2, true);
    });

    it('should ignore stale check result after image change', () => {
        const resolvers: Record<string, (isBroken: boolean) => void> = {};

        mockedCheckImageIsBroken.mockImplementation(({ imageUrl, onResolve }) => {
            resolvers[imageUrl] = onResolve;
        });

        const onImageBrokenChange = jest.fn();
        const { result, rerender } = renderHook(
            ({ imageUrl }: { imageUrl?: string }) =>
                useCheckImageIsBroken({ imageUrl, onImageBrokenChange }),
            { initialProps: { imageUrl: 'https://first-image' } },
        );

        rerender({ imageUrl: 'https://second-image' });

        act(() => {
            resolvers['https://first-image'](true);
        });

        expect(result.current).toBe(false);

        act(() => {
            resolvers['https://second-image'](true);
        });

        expect(result.current).toBe(true);
        expect(onImageBrokenChange).toHaveBeenLastCalledWith(true);
    });
});

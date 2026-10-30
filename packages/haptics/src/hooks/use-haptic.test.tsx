import React, { type FC, type PropsWithChildren } from 'react';
import { renderHook } from '@testing-library/react';

import { CoreConfigContext, type CoreConfigContextValue } from '@alfalab/core-components-config';
import { isIOS } from '@alfalab/core-components-shared';

import { cancelHaptic, triggerHaptic } from '../utils/haptic';

import { useHaptic } from './use-haptic';

jest.mock('../utils/haptic', () => ({
    triggerHaptic: jest.fn(),
    cancelHaptic: jest.fn(),
}));

jest.mock('@alfalab/core-components-shared', () => ({
    ...jest.requireActual('@alfalab/core-components-shared'),
    isIOS: jest.fn(() => false),
}));

const mockIsIOS = isIOS as jest.Mock;
const mockTriggerHaptic = triggerHaptic as jest.Mock;
const mockCancelHaptic = cancelHaptic as jest.Mock;

const setVibrate = (enabled: boolean) => {
    if (enabled) {
        Object.defineProperty(navigator, 'vibrate', {
            value: jest.fn(() => true),
            configurable: true,
            writable: true,
        });
    } else {
        delete (navigator as { vibrate?: unknown }).vibrate;
    }
};

const createWrapper = (haptics?: CoreConfigContextValue['haptics']): FC<PropsWithChildren> => {
    const Wrapper: FC<PropsWithChildren> = ({ children }) => (
        <CoreConfigContext.Provider value={{ breakpoint: 1024, client: 'mobile', haptics }}>
            {children}
        </CoreConfigContext.Provider>
    );

    return Wrapper;
};

describe('useHaptic', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        setVibrate(false);
        mockIsIOS.mockReturnValue(false);
    });

    it('should be enabled by default', () => {
        const { result } = renderHook(() => useHaptic());

        expect(result.current.enabled).toBe(true);
    });

    describe('isSupported', () => {
        it('should be `false` without Vibration API and iOS', () => {
            const { result } = renderHook(() => useHaptic());

            expect(result.current.isSupported).toBe(false);
        });

        it('should be `true` with Vibration API', () => {
            setVibrate(true);

            const { result } = renderHook(() => useHaptic());

            expect(result.current.isSupported).toBe(true);
        });

        it('should be `true` on iOS without Vibration API', () => {
            mockIsIOS.mockReturnValue(true);

            const { result } = renderHook(() => useHaptic());

            expect(result.current.isSupported).toBe(true);
        });
    });

    describe('enabled', () => {
        it('should be disabled by `CoreConfig.haptics.enabled=false`', () => {
            const { result } = renderHook(() => useHaptic({ preset: 'success' }), {
                wrapper: createWrapper({ enabled: false }),
            });

            result.current.trigger('success');

            expect(result.current.enabled).toBe(false);
            expect(mockTriggerHaptic).not.toHaveBeenCalled();
        });

        it('should be disabled by `preset=false`', () => {
            const { result } = renderHook(() => useHaptic({ preset: false }));

            result.current.trigger('success');

            expect(result.current.enabled).toBe(false);
            expect(mockTriggerHaptic).not.toHaveBeenCalled();
        });
    });

    describe('trigger', () => {
        it('should use `preset` without explicit input', () => {
            const { result } = renderHook(() => useHaptic({ preset: 'success' }));

            result.current.trigger();

            expect(mockTriggerHaptic).toHaveBeenCalledWith({
                input: 'success',
                options: undefined,
                debug: false,
            });
        });

        it('should convert custom `preset` to phases', () => {
            const { result } = renderHook(() => useHaptic({ preset: { duration: 20 } }));

            result.current.trigger();

            expect(mockTriggerHaptic).toHaveBeenCalledWith(
                expect.objectContaining({ input: [{ duration: 20 }] }),
            );
        });

        it('should prefer explicit input over `preset`', () => {
            const { result } = renderHook(() => useHaptic({ preset: 'success' }));

            result.current.trigger(40, { intensity: 0.2 });

            expect(mockTriggerHaptic).toHaveBeenCalledWith({
                input: 40,
                options: { intensity: 0.2 },
                debug: false,
            });
        });

        it('should be no-op without input and `preset`', () => {
            const { result } = renderHook(() => useHaptic());

            result.current.trigger();

            expect(mockTriggerHaptic).not.toHaveBeenCalled();
        });
    });

    describe('debug', () => {
        it('should take `debug` from config', () => {
            const { result } = renderHook(() => useHaptic({ preset: 'success' }), {
                wrapper: createWrapper({ debug: true }),
            });

            result.current.trigger();
            result.current.cancel();

            expect(mockTriggerHaptic).toHaveBeenCalledWith(
                expect.objectContaining({ debug: true }),
            );
            expect(mockCancelHaptic).toHaveBeenCalledWith(true);
        });

        it('should override config `debug` by param', () => {
            const { result } = renderHook(() => useHaptic({ preset: 'success', debug: false }), {
                wrapper: createWrapper({ debug: true }),
            });

            result.current.trigger();
            result.current.cancel();

            expect(mockTriggerHaptic).toHaveBeenCalledWith(
                expect.objectContaining({ debug: false }),
            );
            expect(mockCancelHaptic).toHaveBeenCalledWith(false);
        });
    });

    it('should cancel haptic', () => {
        const { result } = renderHook(() => useHaptic());

        result.current.cancel();

        expect(mockCancelHaptic).toHaveBeenCalledWith(false);
    });

    it('should keep stable callbacks between renders', () => {
        const { result, rerender } = renderHook(() => useHaptic({ preset: 'success' }));
        const { trigger, cancel } = result.current;

        rerender();

        expect(result.current.trigger).toBe(trigger);
        expect(result.current.cancel).toBe(cancel);
    });
});

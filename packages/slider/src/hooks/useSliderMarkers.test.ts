import { renderHook, act } from '@testing-library/react-hooks';
import { API } from 'nouislider';

import { SliderRef, useSliderMarkers } from './useSliderMarkers';
import * as markerUtils from '../utils/markerUtils';

jest.mock('../utils/markerUtils');

const mockMarkerUtils = markerUtils as jest.Mocked<typeof markerUtils>;

describe('Unit/hooks/function/useSliderMarkers', () => {
    let mockSliderRef: SliderRef;
    let mockSliderElement: HTMLDivElement & { noUiSlider: API };
    let mockMarkerElement: HTMLElement;
    let mockOnChange: jest.Mock;
    let mockSliderAPI: jest.Mocked<API>;

    beforeEach(() => {
        jest.clearAllMocks();

        mockMarkerElement = {
            style: { left: '50%' },
            nextElementSibling: {
                classList: { contains: jest.fn().mockReturnValue(true) },
                getAttribute: jest.fn().mockReturnValue('5'),
            },
        } as any;

        mockSliderAPI = {
            get: jest.fn(),
            on: jest.fn(),
        } as any;

        mockSliderElement = {
            noUiSlider: mockSliderAPI,
            querySelectorAll: jest.fn().mockReturnValue([mockMarkerElement]),
        } as any;

        mockSliderRef = {
            current: mockSliderElement,
        };

        mockOnChange = jest.fn();

        mockMarkerUtils.getMarkerValue.mockReturnValue(5);
        mockMarkerUtils.isMarkerPassed.mockReturnValue(false);
        mockMarkerUtils.isMarkerCurrent.mockReturnValue(false);
        mockMarkerUtils.updateMarkerAttributes.mockImplementation(() => {});
    });

    describe('Success cases', () => {
        it('Should return updateMarkersState and createSlideHandler', () => {
            const { result } = renderHook(() =>
                useSliderMarkers({
                    sliderRef: mockSliderRef,
                    hasValueTo: false,
                    value: 5,
                    min: 0,
                    max: 10,
                    onChange: mockOnChange,
                }),
            );

            expect(result.current.updateMarkersState).toBeDefined();
        });

        it('Should return createSlideHandler function', () => {
            const { result } = renderHook(() =>
                useSliderMarkers({
                    sliderRef: mockSliderRef,
                    hasValueTo: false,
                    value: 5,
                    min: 0,
                    max: 10,
                    onChange: mockOnChange,
                }),
            );

            expect(result.current.createSlideHandler).toBeDefined();
        });

        it('Should update marker state when updateMarkersState is called', () => {
            const { result } = renderHook(() =>
                useSliderMarkers({
                    sliderRef: mockSliderRef,
                    hasValueTo: false,
                    value: 5,
                    min: 0,
                    max: 10,
                    onChange: mockOnChange,
                }),
            );

            act(() => {
                result.current.updateMarkersState(7);
            });

            expect(mockMarkerUtils.getMarkerValue).toHaveBeenCalledWith({
                markerElement: mockMarkerElement,
                min: 0,
                max: 10,
            });
        });

        it('Should call updateMarkerAttributes when markers are updated', () => {
            const { result } = renderHook(() =>
                useSliderMarkers({
                    sliderRef: mockSliderRef,
                    hasValueTo: false,
                    value: 5,
                    min: 0,
                    max: 10,
                    onChange: mockOnChange,
                }),
            );

            act(() => {
                result.current.updateMarkersState(7);
            });

            expect(mockMarkerUtils.updateMarkerAttributes).toHaveBeenCalledWith({
                markerElement: mockMarkerElement,
                isPassed: false,
                isCurrent: false,
            });
        });

        it('Should create handler for single value', () => {
            mockSliderAPI.get.mockReturnValue('7');

            const { result } = renderHook(() =>
                useSliderMarkers({
                    sliderRef: mockSliderRef,
                    hasValueTo: false,
                    value: 5,
                    min: 0,
                    max: 10,
                    onChange: mockOnChange,
                }),
            );

            const slideHandler = result.current.createSlideHandler(mockSliderAPI);

            act(() => {
                slideHandler();
            });

            expect(mockOnChange).toHaveBeenCalledWith({ value: 7 });
        });

        it('Should create handler for range values', () => {
            mockSliderAPI.get.mockReturnValue(['3', '7']);

            const { result } = renderHook(() =>
                useSliderMarkers({
                    sliderRef: mockSliderRef,
                    hasValueTo: true,
                    value: 3,
                    valueTo: 7,
                    min: 0,
                    max: 10,
                    onChange: mockOnChange,
                }),
            );

            const slideHandler = result.current.createSlideHandler(mockSliderAPI);

            act(() => {
                slideHandler();
            });

            expect(mockOnChange).toHaveBeenCalledWith({ value: 3, valueTo: 7 });
        });

        it('Should update markers when value changes', () => {
            const { rerender } = renderHook(
                ({ value }) =>
                    useSliderMarkers({
                        sliderRef: mockSliderRef,
                        hasValueTo: false,
                        value,
                        min: 0,
                        max: 10,
                        onChange: mockOnChange,
                    }),
                { initialProps: { value: 5 } },
            );

            mockMarkerUtils.getMarkerValue.mockClear();

            rerender({ value: 7 });

            expect(mockMarkerUtils.getMarkerValue).toHaveBeenCalled();
        });
    });

    describe('Edge cases', () => {
        it('Should handle reversed range values correctly', () => {
            mockSliderAPI.get.mockReturnValue(['7', '3']);

            const { result } = renderHook(() =>
                useSliderMarkers({
                    sliderRef: mockSliderRef,
                    hasValueTo: true,
                    value: 3,
                    valueTo: 7,
                    min: 0,
                    max: 10,
                    onChange: mockOnChange,
                }),
            );

            const slideHandler = result.current.createSlideHandler(mockSliderAPI);

            act(() => {
                slideHandler();
            });

            expect(mockOnChange).toHaveBeenCalledWith({ value: 3, valueTo: 7 });
        });

        it('Should skip markers with null value', () => {
            mockMarkerUtils.getMarkerValue.mockReturnValue(null);

            const { result } = renderHook(() =>
                useSliderMarkers({
                    sliderRef: mockSliderRef,
                    hasValueTo: false,
                    value: 5,
                    min: 0,
                    max: 10,
                    onChange: mockOnChange,
                }),
            );

            act(() => {
                result.current.updateMarkersState(7);
            });

            expect(mockMarkerUtils.updateMarkerAttributes).not.toHaveBeenCalled();
        });

        it('Should work without onChange callback', () => {
            mockSliderAPI.get.mockReturnValue('7');

            const { result } = renderHook(() =>
                useSliderMarkers({
                    sliderRef: mockSliderRef,
                    hasValueTo: false,
                    value: 5,
                    min: 0,
                    max: 10,
                }),
            );

            const slideHandler = result.current.createSlideHandler(mockSliderAPI);

            expect(() => {
                act(() => {
                    slideHandler();
                });
            }).not.toThrow();
        });
    });

    describe('Error cases', () => {
        it('Should handle missing sliderRef.current correctly', () => {
            mockSliderRef.current = null;

            const { result } = renderHook(() =>
                useSliderMarkers({
                    sliderRef: mockSliderRef,
                    hasValueTo: false,
                    value: 5,
                    min: 0,
                    max: 10,
                    onChange: mockOnChange,
                }),
            );

            expect(() => {
                act(() => {
                    result.current.updateMarkersState(7);
                });
            }).not.toThrow();
        });

        it('Should handle missing markers correctly', () => {
            mockSliderElement.querySelectorAll = jest.fn().mockReturnValue([]);

            const { result } = renderHook(() =>
                useSliderMarkers({
                    sliderRef: mockSliderRef,
                    hasValueTo: false,
                    value: 5,
                    min: 0,
                    max: 10,
                    onChange: mockOnChange,
                }),
            );

            expect(() => {
                act(() => {
                    result.current.updateMarkersState(7);
                });
            }).not.toThrow();
        });

        it('Should handle errors in utils functions correctly', () => {
            mockMarkerUtils.getMarkerValue.mockImplementation(() => {
                throw new Error('Test error');
            });

            const { result } = renderHook(() =>
                useSliderMarkers({
                    sliderRef: mockSliderRef,
                    hasValueTo: false,
                    value: 5,
                    min: 0,
                    max: 10,
                    onChange: mockOnChange,
                }),
            );

            expect(() => {
                act(() => {
                    result.current.updateMarkersState(7);
                });
            }).toThrow('Test error');
        });
    });
});

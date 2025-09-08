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
        console.log = jest.fn();

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

    describe('SUCCESS', () => {
        it('Должен возвращать updateMarkersState и createSlideHandler', () => {
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

        it('Должен возвращать createSlideHandler функцию', () => {
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

        it('Должен обновлять состояние маркеров при вызове updateMarkersState', () => {
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

        it('Должен вызывать updateMarkerAttributes при обновлении маркеров', () => {
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

        it('Должен создавать обработчик для одиночного значения', () => {
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

        it('Должен создавать обработчик для диапазона значений', () => {
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

        it('Должен обновлять маркеры при изменении value', () => {
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

    describe('EDGE', () => {
        it('Должен корректно обрабатывать перевернутые значения диапазона', () => {
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

        it('Должен пропускать маркеры с null значением', () => {
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

        it('Должен работать без onChange колбэка', () => {
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

    describe('ERROR', () => {
        it('Должен корректно обрабатывать отсутствие sliderRef.current', () => {
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

        it('Должен корректно обрабатывать отсутствие маркеров', () => {
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

        it('Должен корректно обрабатывать ошибки в utils функциях', () => {
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

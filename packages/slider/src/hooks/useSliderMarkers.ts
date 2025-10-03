import { type MutableRefObject, useCallback, useEffect } from 'react';
import { type API } from 'nouislider';

import { type SliderProps } from '../types';
import { getMarkerValue, isMarkerCurrent, isMarkerPassed, updateMarkerAttributes } from '../utils';

export type SliderRef = MutableRefObject<(HTMLDivElement & { noUiSlider: API }) | null>;

type UseSliderMarkersProps = {
    sliderRef: SliderRef;
    hasValueTo: boolean;
} & Pick<SliderProps, 'valueTo' | 'onChange'> & {
        value: number;
        min: number;
        max: number;
    };

/**
 * Хук для управления состоянием маркеров слайдера
 *
 * Управляет видимостью и стилизацией маркеров на слайдере:
 * - Скрывает маркеры когда слайдер находится точно на них
 * - Делает маркеры белыми когда слайдер прошел их (покрыты noUi-connect)
 * - Поддерживает как одиночные значения, так и диапазоны
 *
 */
export const useSliderMarkers = ({
    sliderRef,
    hasValueTo,
    value,
    valueTo,
    min,
    max,
    onChange,
}: UseSliderMarkersProps) => {
    /**
     * Обновляет состояние всех маркеров слайдера
     */
    const updateMarkersState = useCallback(
        (currentValue: number, currentValueTo?: number) => {
            if (!sliderRef.current) return;

            const markers = sliderRef.current.querySelectorAll('.noUi-marker');

            markers.forEach((marker) => {
                const markerElement = marker as HTMLElement;
                const markerValue = getMarkerValue({ markerElement, min, max });

                if (markerValue === null) return;

                const isPassed = isMarkerPassed({
                    markerValue,
                    currentValue,
                    currentValueTo,
                    hasValueTo,
                });
                const isCurrent = isMarkerCurrent({
                    markerValue,
                    currentValue,
                    currentValueTo,
                    hasValueTo,
                });

                updateMarkerAttributes({ markerElement, isPassed, isCurrent });
            });
        },
        [sliderRef, hasValueTo, min, max],
    );

    /**
     * Создает обработчик для события slide слайдера
     */
    const createSlideHandler = useCallback(
        (slider: API) => () => {
            if (hasValueTo) {
                const sliderValues = slider.get() as string[];
                const from = Number(sliderValues[0]);
                const to = Number(sliderValues[1]);

                if (from <= to) {
                    updateMarkersState(from, to);
                    onChange?.({ value: from, valueTo: to });
                } else {
                    updateMarkersState(to, from);
                    onChange?.({ value: to, valueTo: from });
                }
            } else {
                const currentValue = Number(slider.get());

                updateMarkersState(currentValue);
                onChange?.({ value: currentValue });
            }
        },
        [hasValueTo, updateMarkersState, onChange],
    );

    useEffect(() => {
        if (hasValueTo) {
            updateMarkersState(value, valueTo);
        } else {
            updateMarkersState(value);
        }
    }, [value, valueTo, hasValueTo, updateMarkersState]);

    return {
        /** Функция для обновления состояния маркеров */
        updateMarkersState,

        /** Функция для создания обработчика события slide */
        createSlideHandler,
    };
};

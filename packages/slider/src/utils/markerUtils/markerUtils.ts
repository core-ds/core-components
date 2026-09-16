type GetMarkerValueParams = {
    markerElement: HTMLElement;
    min: number;
    max: number;
};

/**
 * Получает значение маркера из DOM элемента
 */
export const getMarkerValue = ({
    markerElement,
    min,
    max,
}: GetMarkerValueParams): number | null => {
    const nextElement = markerElement.nextElementSibling as HTMLElement;

    if (nextElement?.classList.contains('noUi-value')) {
        return parseFloat(nextElement.getAttribute('data-value') || '0');
    }

    if (!nextElement) {
        return null;
    }

    const style = markerElement.style.left;
    const percentage = parseFloat(style.replace('%', ''));

    if (!Number.isNaN(percentage)) {
        return Math.round((percentage / 100) * (max - min) + min);
    }

    return null;
};

type UpdateMarkerAttributesParams = {
    markerElement: HTMLElement;
    isPassed: boolean;
    isCurrent: boolean;
};

/**
 * Обновляет DOM атрибуты маркера
 */
export const updateMarkerAttributes = ({
    markerElement,
    isPassed,
    isCurrent,
}: UpdateMarkerAttributesParams) => {
    if (isPassed) {
        markerElement.setAttribute('data-passed', 'true');
    } else {
        markerElement.removeAttribute('data-passed');
    }

    if (isCurrent) {
        markerElement.setAttribute('data-current', 'true');
    } else {
        markerElement.removeAttribute('data-current');
    }
};

interface MarkerParams {
    markerValue: number;
    currentValue: number;
    currentValueTo?: number;
    hasValueTo?: boolean;
}

/**
 * Определяет, пройден ли маркер (покрыт connect)
 */
export const isMarkerPassed = ({
    markerValue,
    currentValue,
    currentValueTo,
    hasValueTo,
}: MarkerParams): boolean => {
    if (hasValueTo && currentValueTo !== undefined) {
        return (
            markerValue >= Math.min(currentValue, currentValueTo) &&
            markerValue <= Math.max(currentValue, currentValueTo)
        );
    }

    return markerValue < currentValue;
};

/**
 * Определяет, находится ли слайдер точно на маркере
 */
export const isMarkerCurrent = ({
    markerValue,
    currentValue,
    currentValueTo,
    hasValueTo,
}: MarkerParams): boolean => {
    if (hasValueTo && currentValueTo !== undefined) {
        return markerValue === currentValue || markerValue === currentValueTo;
    }

    return markerValue === currentValue;
};

type UpdateMarkerClassesParams = {
    sliderElement: HTMLElement;
    pipsValues: number[];
    customDots?: number[];
};

/**
 * Обновляет CSS классы маркеров для скрытия точек в режиме dotsSlider: 'custom'
 */
export const updateMarkerClasses = ({
    sliderElement,
    pipsValues,
    customDots = [],
}: UpdateMarkerClassesParams): void => {
    const markers = sliderElement.querySelectorAll('.noUi-marker-large');

    markers.forEach((marker) => {
        const nextElement = marker.nextElementSibling as HTMLElement;

        if (nextElement?.classList.contains('noUi-value')) {
            const dataValue = nextElement.getAttribute('data-value');
            const value = dataValue ? parseFloat(dataValue) : null;

            if (value !== null && pipsValues.includes(value)) {
                const isAlsoInCustomDots = customDots.includes(value);

                if (isAlsoInCustomDots) {
                    marker.classList.remove('hide-for-pips-value');
                } else {
                    marker.classList.add('hide-for-pips-value');
                }
            } else {
                marker.classList.remove('hide-for-pips-value');
            }
        }
    });
};

/**
 * Типы отображения точек в noUiSlider pips
 *
 * @description
 * - -1: скрыть элемент
 * - 0: большая метка без точки (только число)
 * - 1: большая точка с числом
 * - 2: маленькая точка без числа
 */
type PipsType = -1 | 0 | 1 | 2;

/** Создает функцию фильтрации для pips noUiSlider */
export const createPipsFilter =
    (customDots?: number[]) =>
    (value: number, type: PipsType): PipsType => {
        if (customDots?.includes(value)) {
            return 1;
        }

        if (customDots?.length) {
            return Number.isInteger(value) ? 0 : -1;
        }

        return type;
    };

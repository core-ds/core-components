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
    ({
        hideCustomDotsNumbers,
        hideLargePips,
        pipsValues,
        customDots,
        mergeValues,
    }: {
        hideCustomDotsNumbers: boolean;
        hideLargePips: boolean;
        pipsValues?: number[];
        customDots?: number[];
        mergeValues?: number[];
    }) =>
    (value: number, type: PipsType): PipsType => {
        /*
         *  customDots - массив кастомных точек
         *  pipsValues - массив значений pips
         *  mergeValues - массив значений pips и кастомных точек
         *
         * Если hideCustomDotsNumbers=true, то:
         *  мы отображаем цифры под точками в pipsValues
         *  если значение customDots есть в pipsValues то мы отображаем как и точку так и цифру -- 1
         *  мы скрываем цифры под точками в customDots -- 2
         */

        /*
         * console.log('createPipsFilter:', {
         *     value,
         *     type,
         *     hideCustomDotsNumbers,
         *     pipsValues,
         *     customDots,
         *     mergeValues,
         * });
         */

        if (hideCustomDotsNumbers) {
            // Если значение есть и в pipsValues и в customDots - отображаем точку с цифрой
            if (pipsValues?.includes(value) && customDots?.includes(value)) {
                console.log('value includes pipsValues and customDots', { value, type });

                return 1;
            }

            // Если значение есть только в pipsValues - отображаем только цифру (тип 0)
            if (pipsValues?.includes(value) && hideLargePips) {
                console.log('value includes pipsValues', { value, type: 1 });

                return 1;
            }

            // Если значение есть только в customDots - отображаем только точку без цифры
            if (customDots?.includes(value)) {
                console.log('value includes customDots', { value, type: 1 });

                return 1;
            }

            // Для остальных целых чисел отображаем только цифру (тип 0)
            return Number.isInteger(value) && Number.isFinite(value) ? 0 : -1;
        }

        // Старая логика для hideCustomDotsNumbers=false
        if (customDots?.includes(value)) {
            return 1;
        }

        if (mergeValues?.includes(value)) {
            return 1;
        }

        if (mergeValues?.length) {
            return Number.isInteger(value) && Number.isFinite(value) ? 0 : -1;
        }

        // Если есть customDots, но значение не в них - скрываем дробные, показываем целые
        if (customDots?.length) {
            return Number.isInteger(value) && Number.isFinite(value) ? 0 : -1;
        }

        return type;
    };

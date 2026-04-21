import { type PipsFilter, type PipsType } from '../../types';

/** Создает функцию фильтрации для pips noUiSlider */
export const createPipsFilter =
    ({ customDots, mergeValues }: PipsFilter) =>
    (value: number, type: PipsType): PipsType => {
        const isInCustom = !!customDots?.includes(value);
        const hasMerge = !!mergeValues?.length;
        const isWhole = Number.isInteger(value) && Number.isFinite(value);

        if (isInCustom || (hasMerge && mergeValues.includes(value))) {
            return 1;
        }

        if (hasMerge || !!customDots?.length) {
            return isWhole ? 0 : -1;
        }

        return type;
    };

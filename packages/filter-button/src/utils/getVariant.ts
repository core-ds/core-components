import { type IndicatorProps } from '@alfalab/core-components-indicator';

type GetVariantParams = {
    hasIndicator: boolean;
    indicatorProps?: Partial<Omit<IndicatorProps, 'size'>>;
};

/*
 * Определяем вариант маски:
 * - count: для индикаторов с числом (количество примененных фильтров)
 * - dot: для маленьких индикаторов-точек (без value)
 * - none: без индикатора
 */
export const getVariant = ({
    hasIndicator,
    indicatorProps,
}: GetVariantParams): 'none' | 'dot' | 'count' => {
    if (!hasIndicator) {
        return 'none';
    }

    return indicatorProps?.value ? 'count' : 'dot';
};

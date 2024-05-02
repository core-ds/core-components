import { useEffect } from 'react';

import type { CalendarDesktopProps } from './desktop';
import { usePeriod, usePeriodWithReset } from './usePeriod';

type UseRangeBehaviorProps = Pick<
    CalendarDesktopProps,
    'mode' | 'value' | 'rangeBehavior' | 'onChange' | 'selectedFrom' | 'selectedTo'
>;

export function useRangeBehavior({
    mode = 'single',
    value,
    selectedFrom,
    selectedTo,
    rangeBehavior,
    onChange,
}: UseRangeBehaviorProps) {
    const valueFrom = typeof value === 'object' ? value.dateFrom : value;
    const valueTo = typeof value === 'object' ? value.dateTo : value;

    const periodHook = rangeBehavior === 'clarification' ? usePeriod : usePeriodWithReset;

    const period = periodHook({
        initialSelectedFrom: valueFrom,
        initialSelectedTo: valueTo,
    });

    useEffect(() => {
        if (mode === 'single') {
            return;
        }

        // Внешние изменения
        if (valueFrom !== period.selectedFrom) {
            period.setStart(valueFrom);
        }

        if (valueTo !== period.selectedTo) {
            period.setEnd(valueTo);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [mode, valueFrom, valueTo]);

    useEffect(() => {
        if (mode === 'single') {
            return;
        }

        // Внутренние изменения (действия пользователя)
        if (valueFrom !== period.selectedFrom || valueTo !== period.selectedTo) {
            onChange?.(period.selectedFrom, period.selectedTo);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [mode, period.selectedFrom, period.selectedTo]);

    const minValue = (() => {
        if (mode === 'single') {
            return valueFrom;
        }

        const values = [period.selectedFrom, period.selectedTo, valueFrom, valueTo].filter(
            Boolean,
        ) as number[];

        if (!values.length) return undefined;

        return Math.min(...values);
    })();

    if (mode === 'single') {
        return {
            selectedFrom,
            selectedTo,
            onChange,
            onReset: onChange ? () => onChange(undefined) : undefined,
            value: valueFrom,
        };
    }

    return {
        selectedFrom: period.selectedFrom,
        selectedTo: period.selectedTo,
        onChange: period.updatePeriod,
        onReset: period.resetPeriod,
        value: minValue,
    };
}

/* eslint-disable no-negated-condition, complexity */
import { SyntheticEvent } from 'react';
import differenceInDays from 'date-fns/differenceInDays';
import dateFnsFormat from 'date-fns/format';
import isSameDay from 'date-fns/isSameDay';
import parse from 'date-fns/parse';

import { getDataTestId } from '@alfalab/core-components-shared';

import { DATE_FORMAT, DATE_RANGE_SEPARATOR } from '../consts';

export function parseDateString(value: string, format: string = DATE_FORMAT) {
    return parse(value, format, new Date());
}

export const formatDate = (date: Date | number, dateFormat = DATE_FORMAT) =>
    dateFnsFormat(date, dateFormat);

export function formatDateRange(range: { dateFrom: Date | number; dateTo: Date | number }) {
    return formatDate(range.dateFrom) + DATE_RANGE_SEPARATOR + formatDate(range.dateTo);
}

export function isCompleteDate(value = '') {
    return value.length === DATE_FORMAT.length;
}

export function isCompleteTime(value = '', withTime = false) {
    if (!withTime) return true;

    return value.length === 5;
}

export function isCompleteDateRange(value = '') {
    return value.length === DATE_RANGE_SEPARATOR.length + DATE_FORMAT.length * 2;
}

export function isValidDate({
    value = '',
    minDate,
    maxDate,
    offDays,
}: {
    value?: string;
    minDate: number;
    maxDate: number;
    offDays?: Array<Date | number>;
}) {
    const parsed = isCompleteDate(value) ? parseDateString(value).getTime() : undefined;

    if (parsed) {
        return (
            parsed >= minDate &&
            parsed <= maxDate &&
            !offDays?.some((offDay) => isSameDay(offDay, parsed))
        );
    }

    return false;
}

export function preventDefault(e: SyntheticEvent) {
    e.preventDefault();
}

export function getValidRange({
    from,
    to,
    offDays,
    minDate,
    maxDate,
}: {
    from: string;
    to: string;
    offDays?: Array<Date | number>;
    minDate: number;
    maxDate: number;
}) {
    const isValidFrom = isValidDate({ value: from, maxDate, minDate, offDays });
    const isValidTo = isValidDate({ value: to, maxDate, minDate, offDays });

    return {
        validFrom: isValidFrom ? parseDateString(from) : undefined,
        validTo: isValidTo ? parseDateString(to) : undefined,
    };
}

/**
 * Частично копипаста updatePeriod хука в календаре
 */
export function updateRange({
    date,
    validFrom,
    validTo,
    rangeBehavior,
}: {
    date?: number;
    validFrom?: Date;
    validTo?: Date;
    rangeBehavior: 'clarification' | 'reset';
}): string {
    let selectedFrom = validFrom ? validFrom.getTime() : null;
    let selectedTo = validTo ? validTo.getTime() : null;

    if (rangeBehavior === 'clarification') {
        if (date === undefined || (date === selectedFrom && date === selectedTo)) {
            selectedFrom = null;
            selectedTo = null;
        } else if (date === selectedTo) {
            selectedTo = null;
        } else if (date === selectedFrom) {
            if (selectedTo) {
                selectedFrom = selectedTo;
                selectedTo = null;
            } else {
                selectedTo = date;
            }
        } else if (!selectedFrom) {
            if (selectedTo) {
                selectedFrom = Math.min(date, selectedTo);
                selectedTo = Math.max(date, selectedTo);
            } else {
                selectedFrom = date;
            }
        } else if (!selectedTo) {
            selectedTo = Math.max(date, selectedFrom);
            selectedFrom = Math.min(date, selectedFrom);
        } else if (selectedTo === selectedFrom) {
            if (date > selectedTo) {
                selectedTo = date;
            } else {
                selectedFrom = date;
            }
        } else if (
            Math.abs(differenceInDays(date, selectedTo)) >
            Math.abs(differenceInDays(date, selectedFrom))
        ) {
            selectedFrom = date;
        } else {
            selectedTo = date;
        }
    }

    if (rangeBehavior === 'reset') {
        if (date === undefined || (date === selectedFrom && date === selectedTo)) {
            selectedFrom = null;
            selectedTo = null;
        } else if (!selectedFrom && selectedTo) {
            selectedFrom = Math.min(date, selectedTo);
            selectedTo = Math.max(date, selectedTo);
        } else if (!selectedFrom) {
            selectedFrom = date;
        } else if (!selectedTo) {
            selectedTo = Math.max(date, selectedFrom);
            selectedFrom = Math.min(date, selectedFrom);
        } else {
            selectedTo = null;
            selectedFrom = date;
        }
    }

    const dateFrom = selectedFrom ? formatDate(selectedFrom) : null;
    const dateTo = selectedTo ? formatDate(selectedTo) : null;

    if (dateFrom && dateTo) {
        return `${dateFrom}${DATE_RANGE_SEPARATOR}${dateTo}`;
    }

    if (dateFrom) return dateFrom;

    return '';
}

export function getUniversalDateInputTestIds(dataTestId: string) {
    return {
        input: dataTestId,
        componentWrapper: getDataTestId(dataTestId, 'wrapper'),
        popover: getDataTestId(dataTestId, 'popover'),
        calendar: getDataTestId(dataTestId, 'calendar'),
        inputWrapper: getDataTestId(dataTestId, 'form-control'),
        inputWrapperInner: getDataTestId(dataTestId, 'form-control-inner'),
        leftAddons: getDataTestId(dataTestId, 'form-control-left-addons'),
        rightAddons: getDataTestId(dataTestId, 'form-control-right-addons'),
        error: getDataTestId(dataTestId, 'form-control-error-message'),
        hint: getDataTestId(dataTestId, 'form-control-hint'),
    };
}

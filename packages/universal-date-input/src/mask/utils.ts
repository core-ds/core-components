/* eslint-disable no-param-reassign */
import clamp from 'date-fns/clamp';
import getDaysInMonth from 'date-fns/getDaysInMonth';

import { DATE_MAX_VALUES, DATE_RANGE_SEPARATOR, DATE_TIME_SEPARATOR } from '../consts';
import { DateSegments, DateTemplate } from '../types';

function fillMask(len: number) {
    return Array(len).fill(/\d/);
}

export function isDigit(v: string) {
    return /\d/.test(v);
}

/**
 *  Делит строку на сегменты по разделителям.
 *  01.01.2020, 00:00 -> ['01', '01', '2020', '00', '00']
 */
export function getValueSegments(rawValue: string, separators: string[]) {
    let separatorCursor = 0;
    let prevSepIdx = 0;
    const segments: string[] = [];

    const value = prepareValueForSegmentation(rawValue);

    while (separatorCursor <= separators.length) {
        const sepIdx = value.indexOf(separators[separatorCursor], prevSepIdx);

        if (sepIdx > -1) {
            segments.push(value.slice(prevSepIdx, sepIdx));
            prevSepIdx = sepIdx + separators[separatorCursor].length;
            separatorCursor += 1;
        } else {
            const restValue = value.slice(prevSepIdx);

            if (restValue) {
                segments.push(restValue);
            }
            break;
        }
    }

    return segments;
}

/**
 *  Корректирует значение, если попытались ввести символ внутрь сепаратора.
 *  Например, 01.01.2020 1- 01.01.2022
 */
function prepareValueForSegmentation(value: string) {
    if (value.indexOf(' ') !== -1) {
        if (
            value.indexOf(DATE_RANGE_SEPARATOR) === -1 &&
            value.indexOf(DATE_RANGE_SEPARATOR.trim()) !== -1
        ) {
            return value
                .replace(/\s/g, '')
                .split(DATE_RANGE_SEPARATOR.trim())
                .join(DATE_RANGE_SEPARATOR);
        }

        if (
            value.indexOf(DATE_TIME_SEPARATOR) === -1 &&
            value.indexOf(DATE_TIME_SEPARATOR.trim()) !== -1
        ) {
            return value
                .replace(/\s/g, '')
                .split(DATE_TIME_SEPARATOR.trim())
                .join(DATE_TIME_SEPARATOR);
        }
    }

    return value;
}

/**
 *  Переносит лишнее значение сегмента в начало следующего.
 *  Например, ['00', '000', '1'] -> ['00', '00', '01']
 */
export function shiftSegmentsData(rawSegments: string[], templateSegments: string[]) {
    const segments = [...rawSegments];

    templateSegments.forEach((item, idx, arr) => {
        const isLast = idx === arr.length - 1;
        const currSegment = segments[idx];

        if (currSegment && item.length < currSegment.length) {
            const segmentValue = currSegment.slice(0, item.length);
            const restValue = currSegment.slice(item.length);

            segments[idx] = segmentValue;
            if (!isLast) {
                segments[idx + 1] = restValue + (segments[idx + 1] ?? '');
            }
        }
    });

    return segments;
}

/**
 *  Заменяет значение сегмента, в котором стоит каретка.
 *  Например, data:1, selection: [0.0], segments: ['00', '000', '1'] -> ['10', '00', '1']
 */
export function replaceSegmentsData(
    rawSegments: string[],
    template: DateTemplate,
    selection: readonly [number, number],
    data: string,
) {
    const segments = [...rawSegments];

    const cursorPos = findCursorPlace(
        rawSegments,
        template.segments,
        template.separators,
        selection,
    );

    template.segments.forEach((templateSegment, idx, arr) => {
        const isLast = idx === arr.length - 1;
        const segment = segments[idx];

        if (segment && templateSegment.length < segment.length) {
            const segmentIdx = cursorPos?.beforeNext
                ? cursorPos.segmentIdx + 1
                : cursorPos?.segmentIdx;
            const offset = cursorPos?.beforeNext ? 0 : cursorPos?.offset;

            if (segmentIdx === idx && offset !== undefined) {
                const overflowLen = segment.length - templateSegment.length;

                segments[idx] = (
                    segment.slice(0, offset) +
                    data +
                    segment.slice(offset + overflowLen + data.length)
                ).slice(0, templateSegment.length);
            } else {
                segments[idx] = segment.slice(0, templateSegment.length);

                if (!isLast && data) {
                    const restValue = segment.slice(templateSegment.length);

                    segments[idx + 1] = restValue + (segments[idx + 1] ?? '');
                }
            }
        }
    });

    return segments;
}

/**
 * Возвращает информацию о каретке(сегмент, сдвиг внутри сегмента)
 */
export function findCursorPlace(
    segments: string[],
    templateSegments: string[],
    separators: string[],
    selection: readonly [number, number],
) {
    let cursorPlace;
    let segmentIdx = 0;
    let posStart = 0;

    while (segments[segmentIdx] !== undefined) {
        const segment = segments[segmentIdx];
        const separatorLen = separators[segmentIdx]?.length || 1;
        const bound = [posStart, segment.length + posStart + separatorLen];

        if (selection[0] >= bound[0] && selection[1] < bound[1]) {
            const offset = selection[0] - bound[0];

            cursorPlace = {
                segmentIdx,
                offset,
                beforeNext: offset >= templateSegments[segmentIdx].length,
            };
            break;
        } else {
            posStart += segment.length + separatorLen;
            segmentIdx += 1;
        }
    }

    return cursorPlace;
}

/**
 * Возвращает маску по сегментам
 * segments: ['00', '12'], separators: ['.', '.'] -> [/\d/, /\d/, '.', /\d/, /\d/]
 */
export function segmentsToPattern(segments: string[], separators: string[]) {
    return segments.reduce((mask, segment, idx) => {
        const hasNextSegment = segments[idx + 1] !== undefined;
        const segmentsLen = segment.length;

        if (idx > 0 && (segment.length || hasNextSegment)) {
            mask.push(...separators[idx - 1].split(''));
        }

        mask.push(...fillMask(segmentsLen));

        return mask;
    }, [] as Array<RegExp | string>);
}

/**
 * Склеивает сегменты в строку
 * segments:['00', '00'], separators: ['.', '.'] -> 00.00
 */
export function segmentsToString(segments: string[], separators: string[]) {
    const str = segments
        .map((p, idx) => {
            const isLast = idx === segments.length - 1;

            return `${p}${separators[idx] && !isLast ? separators[idx] : ''}`;
        })
        .join('');

    return removeSeparatorsFromTail(str);
}

/**
 *  Удаляет разделители с конца строки.
 *  01.12. -> 01.12
 */
export function removeSeparatorsFromTail(str: string) {
    let strLen = str.length;

    while (strLen > 0 && /\W/.test(str[strLen - 1])) {
        strLen -= 1;
    }

    return str.slice(0, strLen);
}

/**
 *  Возвращает кол-во разделителей в начале строки.
 *  countSeparatorsFromHead('..2024') -> 2
 */
export function countSeparatorsFromHead(str: string, startFrom = 0) {
    let cursor = startFrom;

    while (str[cursor] && /\W/.test(str[cursor])) {
        cursor += 1;
    }

    return cursor - startFrom;
}

/**
 *  Валидация сегментов.
 *  9.9 -> 09.09
 */
export function validateSegments({
    dateTemplate,
    templateSegments,
    segments,
    selection: [from, to],
    min,
    max,
}: {
    segments: string[];
    templateSegments: string[];
    dateTemplate: string;
    selection: [number, number];
    min: Date;
    max: Date;
}): { validatedDateString: string; updatedSelection: [number, number] } {
    const parsedDate = segmentsToObj(segments, templateSegments);
    const dateSegments = Object.entries(parsedDate) as Array<[keyof DateSegments, string]>;
    const validatedDateSegments: Partial<DateSegments> = {};

    let paddedZeroes = 0;

    dateSegments.forEach(([segmentName, segmentValue = '']) => {
        const maxSegmentValue = DATE_MAX_VALUES[segmentName];

        const { validatedSegmentValue, prefixedZeroesCount } = padWithZeroesUntilValid(
            segmentValue,
            `${maxSegmentValue}`,
        );

        paddedZeroes += prefixedZeroesCount;

        validatedDateSegments[segmentName] = validatedSegmentValue;
    });

    minMaxValidation(validatedDateSegments, min, max);

    const validatedDateString = toDateString(validatedDateSegments, dateTemplate);

    return {
        validatedDateString,
        updatedSelection: [from + paddedZeroes, to + paddedZeroes],
    };
}

/**
 *  Валидация сегментов с учетом границ min, max.
 *  35.02 -> 29.02, 01.01.0001 -> 01.01.1900
 */
export function minMaxValidation(segments: Partial<DateSegments>, min: Date, max: Date) {
    const dayFilled = segments.day?.length === 2;
    const monthFilled = segments.month?.length === 2;
    const yearFilled = segments.year?.length === 4;

    if (dayFilled && segments.day === '00') segments.day = '01';
    if (monthFilled && segments.month === '00') segments.month = '01';

    if (yearFilled && Number(segments.year) < min.getFullYear()) {
        segments.year = min.getFullYear().toString();
    }

    if (dayFilled && monthFilled) {
        // Если не введен год, берем 2000-й високосный год, иначе 29.02 невозможно будет указать
        const filledYear = yearFilled ? segments.year : '2000';
        const maxDays = getDaysInMonth(new Date(`${filledYear}-${segments.month}-01`));

        if (Number(segments.day) > maxDays) {
            segments.day = maxDays.toString();
        }
    }

    if (dayFilled && monthFilled && yearFilled) {
        const date = clamp(new Date(`${segments.year}-${segments.month}-${segments.day}`), {
            start: min,
            end: max,
        });

        segments.day = date.getDate().toString().padStart(2, '0');
        segments.month = (date.getMonth() + 1).toString().padStart(2, '0');
        segments.year = date.getFullYear().toString();
    }
}

export function padWithZeroesUntilValid(
    segmentValue: string,
    paddedMaxValue: string,
    prefixedZeroesCount = 0,
): { prefixedZeroesCount: number; validatedSegmentValue: string } {
    if (Number(segmentValue.padEnd(paddedMaxValue.length, '0')) <= Number(paddedMaxValue)) {
        return { validatedSegmentValue: segmentValue, prefixedZeroesCount };
    }

    if (segmentValue.endsWith('0')) {
        // 01.90 => 01.09|
        return padWithZeroesUntilValid(
            `0${segmentValue.slice(0, paddedMaxValue.length - 1)}`,
            paddedMaxValue,
            prefixedZeroesCount + 1,
        );
    }

    if (segmentValue.length < paddedMaxValue.length) {
        // 01| => Type 9 => 01.90|
        return padWithZeroesUntilValid(
            `${segmentValue.slice(0, paddedMaxValue.length - 1)}0`,
            paddedMaxValue,
            prefixedZeroesCount,
        );
    }

    // 01.1|=> Type 9 => 01.12|
    return { validatedSegmentValue: paddedMaxValue, prefixedZeroesCount };
}

/**
 *  Превращает объект с сегментами в строку
 */
export function toDateString(
    { day, month, year, hours, minutes }: Partial<DateSegments>,
    dateTemplate: string,
): string {
    return dateTemplate
        .replace(/d+/g, day ?? '')
        .replace(/MM+/g, month ?? '')
        .replace(/y+/g, year ?? '')
        .replace(/H+/g, hours ?? '')
        .replace(/m+/g, minutes ?? '');
}

export function parseDateRangeString(dateRange: string, maxLen: number): string[] {
    return dateRange.split(DATE_RANGE_SEPARATOR).map((date) => date.slice(0, maxLen));
}

export function segmentsToObj(
    segments: string[],
    templateSegments: string[],
): Partial<DateSegments> {
    return {
        day: segments[templateSegments.indexOf('dd')],
        month: segments[templateSegments.indexOf('MM')],
        year: segments[templateSegments.indexOf('yyyy')],
        hours: segments[templateSegments.indexOf('HH')],
        minutes: segments[templateSegments.indexOf('mm')],
    };
}

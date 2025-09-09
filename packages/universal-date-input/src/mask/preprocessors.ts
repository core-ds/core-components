import { type MaskitoPreprocessor } from '@maskito/core';
import { type ElementState } from '@maskito/core/lib/types';
import isValid from 'date-fns/isValid';

import { DATE_RANGE_SEPARATOR } from '../consts';
import { type DateTemplate } from '../types';
import { parseDateString } from '../utils';

import {
    countSeparatorsFromHead,
    getValueSegments,
    parseDateRangeString,
    removeSeparatorsFromTail,
    replaceSegmentsData,
    segmentsToString,
    shiftSegmentsData,
    validateSegments,
} from './utils';

export function createDisallowInputPreprocessor(): MaskitoPreprocessor {
    return (state, actionType) => {
        const { elementState, data } = state;
        const {
            value,
            selection: [from, to],
        } = elementState;

        // Запрещаем удалять сепаратор
        if (['deleteForward', 'deleteBackward'].includes(actionType)) {
            const separators = value.slice(from, to).replace(/\d/g, '');
            const newValue = value.slice(0, from) + separators + value.slice(to);

            const caretPos = actionType === 'deleteForward' ? to : from;

            return { elementState: { value: newValue, selection: [caretPos, caretPos] }, data };
        }

        // разрешаем вводить только цифры
        if (!data.replace(/\D/g, '')) {
            return { elementState, data: '' };
        }

        return state;
    };
}

export function createValidationPreprocessor(
    template: DateTemplate,
    fullStringTemplate: string,
    min: Date,
    max: Date,
    onCorrection: () => void,
): MaskitoPreprocessor {
    const rangeSeparator = template.separators.find((s) => s === DATE_RANGE_SEPARATOR) || '';
    const dateTemplate = rangeSeparator
        ? fullStringTemplate.split(rangeSeparator)[0]
        : fullStringTemplate;

    return (state, actionType) => {
        const { elementState, data } = state;
        const { value, selection } = elementState;
        const isValidation = actionType === 'validation';

        const [from, to] = selection;
        const rawValue = value.slice(0, from) + data + value.slice(to);

        if (!rawValue || (isValidation && from !== to)) return state;

        const rawSegments = getValueSegments(rawValue, template.separators);
        const segments =
            // При вставке сдвигаем данные в сегментах
            data.length > 2
                ? shiftSegmentsData(rawSegments, template.segments)
                : replaceSegmentsData(rawSegments, template, selection, data);

        const possibleValue = segmentsToString(segments, template.separators);

        const dateStrings = parseDateRangeString(possibleValue, dateTemplate.length);
        let validatedValue = '';
        const hasRangeSeparator = Boolean(rangeSeparator) && possibleValue.includes(rangeSeparator);
        let toSelection = to + data.length;

        for (let i = 0; i < dateStrings.length; i++) {
            const dateString = dateStrings[i];
            const { minDate = min, maxDate = max } = getMinMax({
                hasRangeSeparator,
                dateStrings,
                dateTemplate,
                dateIdx: i,
            });

            const validateResult = validateSegments({
                templateSegments: template.segments,
                segments: validatedValue ? segments.slice(3) : segments,
                dateTemplate,
                selection: [from, toSelection],
                min: minDate,
                max: maxDate,
            });

            let { validatedDateString } = validateResult;

            if (dateStrings.length === 1 || (dateStrings.length > 1 && i > 0)) {
                validatedDateString = removeSeparatorsFromTail(validatedDateString);
            }

            if (dateString && !validatedDateString) return { elementState, data: '' };

            [, toSelection] = validateResult.updatedSelection;

            validatedValue +=
                hasRangeSeparator && validatedValue
                    ? rangeSeparator + validatedDateString
                    : validatedDateString;
        }

        if (!isValidation) {
            const clearPossibleValue = possibleValue.replace(/0/g, '');
            const clearValidatedValue = validatedValue.replace(/0/g, '');

            if (clearPossibleValue !== clearValidatedValue) onCorrection();
        }

        if (isValidation || !data) {
            return { elementState: { value: validatedValue, selection: [from, from] }, data };
        }

        return insertNewData({
            elementState,
            validatedValue,
            actionType,
            rawValue,
            possibleValue,
            toSelection,
        });
    };
}

function insertNewData({
    elementState,
    validatedValue,
    rawValue,
    possibleValue,
    toSelection,
}: {
    elementState: ElementState;
    validatedValue: string;
    actionType: string;
    rawValue: string;
    possibleValue: string;
    toSelection: number;
}): ReturnType<MaskitoPreprocessor> {
    const {
        selection: [from, to],
    } = elementState;

    const addedDateSegmentSeparators = Math.max(0, possibleValue.length - rawValue.length);
    const existSegmentSeparator = countSeparatorsFromHead(validatedValue, from);
    const selectedChars = to - from;
    const newData = validatedValue.slice(
        from + existSegmentSeparator,
        toSelection - selectedChars + addedDateSegmentSeparators + existSegmentSeparator,
    );

    const newValue =
        validatedValue.slice(0, from + existSegmentSeparator) +
        validatedValue.slice(to + existSegmentSeparator + newData.length - selectedChars);

    return {
        elementState: {
            selection: [from, from],
            value: newValue,
        },
        data: newData,
    };
}

function getMinMax({
    hasRangeSeparator,
    dateIdx,
    dateStrings,
    dateTemplate,
}: {
    hasRangeSeparator: boolean;
    dateIdx: number;
    dateStrings: string[];
    dateTemplate: string;
}) {
    const isFirstDateOfRange = hasRangeSeparator && dateIdx === 0 && dateStrings.length === 2;
    const isSecondDateOfRange = hasRangeSeparator && dateIdx === 1 && dateStrings.length === 2;
    const isFirstDateFilled = dateStrings[0].length === dateTemplate.length;
    const isSecondDateFilled = dateStrings[1]?.length === dateTemplate.length;
    const firstDateOfRange = isFirstDateFilled ? parseDateString(dateStrings[0]) : undefined;
    const secondDateOfRage = isSecondDateFilled ? parseDateString(dateStrings[1]) : undefined;
    const firstDateValid = isFirstDateFilled && isValid(firstDateOfRange);
    const secondDateValid = isSecondDateFilled && isValid(secondDateOfRage);
    const minDate = isSecondDateOfRange && firstDateValid ? firstDateOfRange : undefined;
    const maxDate = isFirstDateOfRange && secondDateValid ? secondDateOfRage : undefined;

    return { minDate, maxDate };
}

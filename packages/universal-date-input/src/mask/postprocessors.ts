import { type MaskitoPostprocessor } from '@maskito/core';

import { isDigit } from './utils';

export function createPreventCaretJumpPostprocessor(): MaskitoPostprocessor {
    return (state, prevState) => {
        const [prevFrom, prevTo] = prevState.selection;
        const { selection, value } = state;
        const [from, to] = selection;

        const prevPosIsEqual = prevFrom === prevTo;
        const posIsEqual = from === to;

        if (prevPosIsEqual && posIsEqual && from - prevFrom > 1 && !isDigit(value[from - 1])) {
            let caretPos = from - 1;

            while (caretPos > 0 && !isDigit(value[caretPos - 1])) {
                caretPos -= 1;
            }

            return {
                ...state,
                selection: [caretPos, caretPos],
            };
        }

        return state;
    };
}

/**
 * Восстанавливает хвостовой разделитель диапазона для частично заполненного значения.
 *
 * Например, для `12.12.2022 – ` маска удаляет хвостовой разделитель.
 * Этот постпроцессор возвращает его обратно, чтобы подсказать пользователю,
 * что вторая граница диапазона ещё не введена.
 */
export function createPreserveRangeSeparatorPostprocessor(
    rangeSeparator: string,
): MaskitoPostprocessor {
    return (state, prevState) => {
        const { value } = state;

        if (!rangeSeparator || value.endsWith(rangeSeparator)) {
            return state;
        }

        if (!prevState.value.endsWith(rangeSeparator)) {
            return state;
        }

        return {
            ...state,
            value: value + rangeSeparator,
        };
    };
}

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

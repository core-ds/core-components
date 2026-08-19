import { type MaskitoPreprocessor } from '@maskito/core';

export const expirySlashBackspacePreprocessor: MaskitoPreprocessor = (
    { elementState, data },
    actionType,
) => {
    if (
        actionType === 'deleteBackward' &&
        elementState.selection[0] === 2 &&
        elementState.selection[1] === 3
    ) {
        return {
            data,
            elementState: {
                ...elementState,
                selection: [1, 2],
            },
        };
    }

    return { elementState, data };
};

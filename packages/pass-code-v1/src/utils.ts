import { getDataTestId } from '@balafla/core-components-shared';

export function getPassCodeTestIds(dataTestId: string) {
    return {
        passCode: getDataTestId(dataTestId, 'wrapper'),
        inputProgress: getDataTestId(dataTestId, 'input-progress'),
        keypad: getDataTestId(dataTestId, 'keypad'),
        keypadButton: getDataTestId(dataTestId, 'keypad-button'),
        backspaceButton: getDataTestId(dataTestId, 'backspace-button'),
        error: getDataTestId(dataTestId, 'error'),
        message: getDataTestId(dataTestId, 'message'),
    };
}

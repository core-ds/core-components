import { getDataTestId } from '@alfalab/core-components-shared';

export function getFormControlTestIds(dataTestId: string) {
    return {
        inputWrapper: dataTestId,
        inputWrapperInner: getDataTestId(dataTestId, 'inner'),
        leftAddons: getDataTestId(dataTestId, 'left-addons'),
        rightAddons: getDataTestId(dataTestId, 'right-addons'),
        error: getDataTestId(dataTestId, 'error-message'),
        hint: getDataTestId(dataTestId, 'hint'),
    };
}

import { getDataTestId } from '@balafla/core-components-shared';

export function getTextareaTestIds(dataTestId: string) {
    return {
        textarea: dataTestId,
        inputWrapper: getDataTestId(dataTestId, 'form-control'),
        inputWrapperInner: getDataTestId(dataTestId, 'form-control-inner'),
        leftAddons: getDataTestId(dataTestId, 'form-control-left-addons'),
        rightAddons: getDataTestId(dataTestId, 'form-control-right-addons'),
        error: getDataTestId(dataTestId, 'form-control-error-message'),
        hint: getDataTestId(dataTestId, 'form-control-hint'),
    };
}

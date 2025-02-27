import { getDataTestId } from '@alfalab/core-components-shared';

export function searchFilterStub() {
    return true;
}

export function getInputAutocompleteDesktopTestIds(dataTestId: string) {
    return {
        inputAutocomplete: dataTestId,
        option: getDataTestId(dataTestId, 'option'),
        optionsList: getDataTestId(dataTestId, 'options-list'),
        field: getDataTestId(dataTestId, 'field'),
        fieldInner: getDataTestId(dataTestId, 'field-form-control-inner'),
        fieldFormControl: getDataTestId(dataTestId, 'field-form-control'),
        fieldLeftAddons: getDataTestId(dataTestId, 'field-form-control-left-addons'),
        fieldRightAddons: getDataTestId(dataTestId, 'field-form-control-right-addons'),
        fieldError: getDataTestId(dataTestId, 'field-form-control-error-message'),
        fieldErrorIcon: getDataTestId(dataTestId, 'field-form-control-error-icon'),
        fieldSuccessIcon: getDataTestId(dataTestId, 'field-form-control-success-icon'),
        fieldHint: getDataTestId(dataTestId, 'field-form-control-hint'),
    };
}

export function getInputAutocompleteMobileTestIds(dataTestId: string) {
    return {
        inputAutocomplete: dataTestId,
        option: getDataTestId(dataTestId, 'option'),
        optionsList: getDataTestId(dataTestId, 'options-list'),
        bottomSheet: getDataTestId(dataTestId, 'bottom-sheet'),
        bottomSheetHeader: getDataTestId(dataTestId, 'bottom-sheet-header'),
        bottomSheetContent: getDataTestId(dataTestId, 'bottom-sheet-content'),
        modal: getDataTestId(dataTestId, 'modal'),
        modalHeader: getDataTestId(dataTestId, 'modal-header'),
        modalContent: getDataTestId(dataTestId, 'modal-content'),
        clearButton: getDataTestId(dataTestId, 'clear'),
        applyButton: getDataTestId(dataTestId, 'apply'),
        fieldInner: getDataTestId(dataTestId, 'field-form-control-inner'),
        fieldFormControl: getDataTestId(dataTestId, 'field-form-control'),
        fieldLeftAddons: getDataTestId(dataTestId, 'field-form-control-left-addons'),
        fieldRightAddons: getDataTestId(dataTestId, 'field-form-control-right-addons'),
        fieldError: getDataTestId(dataTestId, 'field-form-control-error-message'),
        fieldErrorIcon: getDataTestId(dataTestId, 'field-error-icon'),
        fieldSuccessIcon: getDataTestId(dataTestId, 'field-success-icon'),
        fieldHint: getDataTestId(dataTestId, 'field-form-control-hint'),
        searchInput: getDataTestId(dataTestId, 'search'),
        searchFormControl: getDataTestId(dataTestId, 'search-form-control'),
        searchInner: getDataTestId(dataTestId, 'search-form-control-inner'),
        searchLeftAddons: getDataTestId(dataTestId, 'search-form-control-left-addons'),
        searchRightAddons: getDataTestId(dataTestId, 'search-form-control-right-addons'),
        searchError: getDataTestId(dataTestId, 'search-form-control-error-message'),
        searchHint: getDataTestId(dataTestId, 'search-form-control-hint'),
    };
}

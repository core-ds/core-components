import { getDataTestId } from '@balafla/core-components-shared';

export function getPureCellTestIds(dataTestId: string) {
    return {
        pureCell: dataTestId,
        addon: getDataTestId(dataTestId, 'addon'),
        amount: getDataTestId(dataTestId, 'amount'),
        amountText: getDataTestId(dataTestId, 'amount-text'),
        amountTitle: getDataTestId(dataTestId, 'amount-title'),
        coreAmountTitle: getDataTestId(dataTestId, 'core-amount-title'),
        categoryName: getDataTestId(dataTestId, 'category-name'),
        categoryPercent: getDataTestId(dataTestId, 'category-percent'),
        categoryRightAddon: getDataTestId(dataTestId, 'category-right-addon'),
        content: getDataTestId(dataTestId, 'content'),
        footer: getDataTestId(dataTestId, 'footer'),
        footerButton: getDataTestId(dataTestId, 'button'),
        extraSubtitle: getDataTestId(dataTestId, 'footer-title'),
        graphics: getDataTestId(dataTestId, 'graphics'),
        main: getDataTestId(dataTestId, 'main'),
        textContent: getDataTestId(dataTestId, 'text_content'),
        textValue: getDataTestId(dataTestId, 'text_value'),
    };
}

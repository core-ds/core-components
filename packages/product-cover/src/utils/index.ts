import { getDataTestId } from '@alfalab/core-components-shared';

import { SECOND_CARD_SIZE } from '../consts';

export function getProductCoverSingleTestIds(dataTestId: string) {
    return {
        productCoverSingle: dataTestId,
        userInfo: getDataTestId(dataTestId, 'user-info'),
        userInfoEye: getDataTestId(dataTestId, 'user-info-eye-btn'),
    };
}

export function getProductCoverStackTestIds(dataTestId: string) {
    return {
        productCoverStack: dataTestId,
        firstCard: getDataTestId(dataTestId, 'first-card'),
        secondCard: getDataTestId(dataTestId, 'second-card'),
        userInfoFirstCard: getDataTestId(dataTestId, 'first-card-user-info'),
        userInfoSecondCard: getDataTestId(dataTestId, 'second-card-user-info'),
    };
}

export const showNumberOfСards = (sizeCard: number, numberOfСards?: number, align?: string) => {
    if (numberOfСards) {
        return numberOfСards >= 2 && numberOfСards < 10 && sizeCard === 40 && align === 'default';
    }

    return false;
};

export const getSizeSecondCard = (size: number, align: string) => {
    if (align === 'bottom' && size === 40) return 32;

    return SECOND_CARD_SIZE[size];
};

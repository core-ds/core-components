import { getDataTestId } from '@alfalab/core-components-shared';

export function getBankСardViewImageTestIds(dataTestId: string) {
    return {
        bankСardViewImage: dataTestId,
        userInfo: getDataTestId(dataTestId, 'user-info'),
        userInfoEye: getDataTestId(dataTestId, 'user-info-eye-btn'),
    };
}

export function getBankСardViewStackTestIds(dataTestId: string) {
    return {
        bankСardViewStack: dataTestId,
        firstCard: getDataTestId(dataTestId, 'first-card'),
        secondCard: getDataTestId(dataTestId, 'second-card'),
        userInfoFirstCard: getDataTestId(dataTestId, 'first-card-user-info'),
        userInfoSecondCard: getDataTestId(dataTestId, 'second-card-user-info'),
        userInfoEye: getDataTestId(dataTestId, 'first-card-user-info-eye-btn'),
    };
}

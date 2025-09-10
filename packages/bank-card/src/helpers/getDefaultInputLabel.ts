import { MaskTypeEnum } from '../enums';
import { type MaskType } from '../types';

export const getDefaultInputLabel = (maskType: MaskType) => {
    switch (maskType) {
        case MaskTypeEnum.Card:
            return 'Номер карты';
        case MaskTypeEnum.AccountNumber:
            return 'Номер счёта';
        case MaskTypeEnum.Default:
        default:
            return 'Номер карты или счёта';
    }
};

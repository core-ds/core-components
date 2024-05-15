import { MaskTypeEnum } from '../enums';
import { MaskType } from '../types';

export const getDefaultInputLabel = (maskType: MaskType) => {
    switch (maskType) {
        case MaskTypeEnum.Card:
            return 'Номер карты';
        case MaskTypeEnum.AccountNumber:
            return 'Номер счета';
        case MaskTypeEnum.Default:
        default:
            return 'Номер карты или счёта';
    }
};

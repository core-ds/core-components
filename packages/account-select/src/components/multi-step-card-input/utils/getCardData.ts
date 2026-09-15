import { type CardData } from '../../../types';
import { parseDate } from '../../../utils/parse-date';
import { validateExpiry } from '../../../utils/validate';

type CardParams = {
    cardNumber: string;
    cardExpiry: CardData['expiryDate'];
    cardCvc: string;
    needExpiryDate: boolean;
    needCVC: boolean;
    expiryAsDate: boolean;
};

export const getCardData = ({
    cardNumber,
    cardExpiry,
    cardCvc,
    needExpiryDate,
    needCVC,
    expiryAsDate,
}: CardParams): CardData => ({
    number: cardNumber,
    ...(needExpiryDate && {
        expiryDate:
            expiryAsDate && typeof cardExpiry === 'string' && validateExpiry(cardExpiry)
                ? parseDate(cardExpiry)
                : cardExpiry,
    }),
    ...(needCVC && { CVC: cardCvc }),
});

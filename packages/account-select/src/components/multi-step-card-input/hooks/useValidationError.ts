import { useEffect } from 'react';

import { ERRORS, EXPIRY_COMPLETE_REGEXP } from '../../../constants';
import { useError } from '../../../context';
import { validateCardNumber, validateCVC, validateExpiry } from '../../../utils/validate';

type TouchedFields = { cardNumber: boolean; expiry: boolean; cvc: boolean };

function getValidationErrors(
    cardNumber: string,
    cardExpiry: string | Date | undefined,
    cardCvc: string | undefined,
    touchedFields: TouchedFields,
    needExpiryDate: boolean,
    needCVC: boolean,
): string | null {
    const errors: string[] = [];
    const isCardNumberValid = validateCardNumber(cardNumber);

    if (touchedFields.cardNumber && !isCardNumberValid) {
        errors.push(ERRORS.CARD_NUMBER_ERROR);
    }

    if (isCardNumberValid && needExpiryDate) {
        if (!cardExpiry && touchedFields.expiry) {
            errors.push(ERRORS.EXPIRY_EMPTY);
        } else if (cardExpiry) {
            const expiryStr = cardExpiry as string;
            const isComplete = EXPIRY_COMPLETE_REGEXP.test(expiryStr);

            if ((isComplete || touchedFields.expiry) && !validateExpiry(expiryStr)) {
                errors.push(ERRORS.EXPIRY_ERROR);
            }
        }
    }

    if (isCardNumberValid && needCVC && touchedFields.cvc) {
        if (!cardCvc || !validateCVC(cardCvc)) {
            errors.push(ERRORS.CVV_EMPTY);
        }
    }

    return errors.length > 0 ? errors.join('. ') : null;
}

type UseValidationErrorParams = {
    cardNumber: string;
    cardExpiry: string | Date | undefined;
    cardCvc: string | undefined;
    activeField: string;
    touchedFields: TouchedFields;
    needExpiryDate: boolean;
    needCVC: boolean;
    valuesEmpty: boolean;
};

export function useValidationError({
    cardNumber,
    cardExpiry,
    cardCvc,
    activeField,
    touchedFields,
    needExpiryDate,
    needCVC,
    valuesEmpty,
}: UseValidationErrorParams) {
    const { setError } = useError();

    useEffect(() => {
        if (valuesEmpty || activeField) {
            setError(null);

            return;
        }

        setError(
            getValidationErrors(
                cardNumber,
                cardExpiry,
                cardCvc,
                touchedFields,
                needExpiryDate,
                needCVC,
            ),
        );
    }, [
        activeField,
        cardNumber,
        cardExpiry,
        cardCvc,
        touchedFields,
        needExpiryDate,
        needCVC,
        setError,
        valuesEmpty,
    ]);
}

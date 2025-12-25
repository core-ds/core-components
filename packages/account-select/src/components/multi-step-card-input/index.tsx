import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import { useMaskito } from '@maskito/react';
import cn from 'classnames';

import { CARD_MASK, CVV_MASK, EXPIRY_MASK } from '../../constants';
import { useAccountSelectContext } from '../../context';
import { type CardAddingProps, type CardData } from '../../types';
import { formatCardNumber, getMaskedCardNumber } from '../../utils/formaters';
import { parseDate } from '../../utils/parse-date';
import { validateCardNumber, validateCVC, validateExpiry } from '../../utils/validate';

import styles from './index.module.css';

type MultiStepCardInputProps = Pick<
    CardAddingProps,
    'onSubmit' | 'onInput' | 'needCVC' | 'needExpiryDate' | 'expiryAsDate' | 'placeholder'
> & {
    setCardNumberForAddon: React.Dispatch<React.SetStateAction<string>>;
};

export const MultiStepCardInput: React.FC<MultiStepCardInputProps> = memo(
    ({
        onSubmit,
        onInput,
        needCVC = true,
        needExpiryDate = true,
        expiryAsDate = true,
        placeholder,
        setCardNumberForAddon,
    }) => {
        const [step, setStep] = useState<number>(1);
        const [cardNumber, setCardNumber] = useState<CardData['number']>('');
        const [cardExpiry, setCardExpiry] = useState<CardData['expiryDate']>('');
        const [cardCvc, setCardCvc] = useState<string>('');
        const [isCardNumberFocused, setIsCardNumberFocused] = useState<boolean>(false);

        const isShowExpiry = needExpiryDate && step >= 2 && validateCardNumber(cardNumber);
        const isShowCvv = needCVC && step >= 2 && validateCardNumber(cardNumber);

        const { setError } = useAccountSelectContext();

        const numberRef = useRef<HTMLInputElement | null>(null);
        const expiryRef = useRef<HTMLInputElement | null>(null);
        const cvvRef = useRef<HTMLInputElement | null>(null);

        const numberMaskRef = useMaskito({ options: CARD_MASK });
        const expiryMaskRef = useMaskito({
            options: {
                ...EXPIRY_MASK,
                postprocessors: [
                    (state) => {
                        const {
                            value,
                            selection: [, to],
                        } = state;

                        if (to >= 5 && !validateExpiry(value)) {
                            setError('Срок действия введен неверно');
                        } else {
                            setError(null);
                        }

                        return state;
                    },
                ],
            },
        });
        const cvvMaskRef = useMaskito({ options: CVV_MASK });

        const numberRefCallback = useCallback(
            (element: HTMLInputElement | null) => {
                numberRef.current = element;
                numberMaskRef(element);
            },
            [numberMaskRef],
        );

        const expiryRefCallback = useCallback(
            (element: HTMLInputElement | null) => {
                expiryRef.current = element;
                expiryMaskRef(element);
            },
            [expiryMaskRef],
        );

        const cvvRefCallback = useCallback(
            (element: HTMLInputElement | null) => {
                cvvRef.current = element;
                cvvMaskRef(element);
            },
            [cvvMaskRef],
        );

        useEffect(() => {
            onInput?.({
                number: cardNumber,
                ...(needExpiryDate && { expiryDate: cardExpiry }),
                ...(needCVC && cardCvc && { cvc: cardCvc }),
            });

            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [cardNumber, cardExpiry, cardCvc, needExpiryDate, needCVC]);

        useEffect(() => {
            if (step === 1) {
                numberRef.current?.focus();
            }
        }, [step]);

        useEffect(() => {
            setCardNumberForAddon(cardNumber);
        // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [cardNumber]);

        const handleCardNumberFocus = () => {
            setIsCardNumberFocused(true);
            setTimeout(() => {
                const { current } = numberRef;

                if (current) {
                    const { length } = current.value;

                    current.setSelectionRange(length, length);
                }
            }, 0);
        };

        const handleCardNumberBlur = (e: React.FocusEvent<HTMLInputElement>) => {
            setError(validateCardNumber(e.target.value) ? null : 'Номер карты введён неверно');
            setIsCardNumberFocused(false);
        };

        const handleExpiryBlur = (e: React.FocusEvent<HTMLInputElement>) => {
            setError(validateExpiry(e.target.value) ? null : 'Нужно заполнить срок действия');
        };

        const handleCvcBlur = (e: React.FocusEvent<HTMLInputElement>) => {
            setError(validateCVC(e.target.value) ? null : 'Нужно заполнить CVC');
        };

        const handleCardNumberChange = ({
            target: { value },
        }: React.ChangeEvent<HTMLInputElement>) => {
            const cleanValue = value.replace(/\s/g, '');

            setCardNumber(cleanValue);

            if (validateCardNumber(cleanValue)) {
                if (needExpiryDate) {
                    setStep(2);
                    setTimeout(() => expiryRef.current?.focus(), 100);
                } else {
                    numberRef.current?.blur();
                    onSubmit?.({
                        number: cleanValue,
                    });
                }
            }
        };

        const handleExpiryChange = ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
            setCardExpiry(value);

            if (validateExpiry(value)) {
                if (needCVC) {
                    setStep(3);
                    setTimeout(() => cvvRef.current?.focus(), 100);
                } else {
                    expiryRef.current?.blur();
                    onSubmit?.({
                        number: cardNumber,
                        expiryDate: expiryAsDate ? parseDate(value) : value,
                    });
                }
            }
        };

        const handleCvcChange = ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
            setCardCvc(value);

            if (validateCVC(value)) {
                cvvRef.current?.blur();
                onSubmit?.({
                    number: cardNumber,
                    expiryDate: expiryAsDate ? parseDate(cardExpiry as string) : cardExpiry,
                    CVC: value,
                });
            }
        };

        const getDisplayCardNumber = () => {
            if (isCardNumberFocused || !validateCardNumber(cardNumber)) {
                return formatCardNumber(cardNumber);
            }

            return getMaskedCardNumber(cardNumber);
        };

        return (
            <div
                className={styles.multistepCardInputWrapper}
                onClick={(e) => e.stopPropagation()}
                aria-hidden='true'
            >
                <div className={styles.inputs}>
                    <input
                        ref={numberRefCallback}
                        type='text'
                        placeholder={placeholder ?? 'Карта'}
                        value={getDisplayCardNumber()}
                        onInput={handleCardNumberChange}
                        onFocus={handleCardNumberFocus}
                        onBlur={handleCardNumberBlur}
                        className={cn(styles.multistepInput, styles.cardNumberInput, {
                            [styles.cardNumberInputValid]: validateCardNumber(cardNumber),
                        })}
                        inputMode='numeric'
                        pattern='[0-9]*'
                    />
                    {isShowExpiry && (
                        <input
                            ref={expiryRefCallback}
                            type='text'
                            value={String(cardExpiry)}
                            onInput={handleExpiryChange}
                            onBlur={handleExpiryBlur}
                            className={cn(styles.multistepInput, styles.expiryInput)}
                            inputMode='numeric'
                            pattern='[0-9]*'
                            placeholder='ММ/ГГ'
                        />
                    )}
                    {isShowCvv && (
                        <input
                            ref={cvvRefCallback}
                            type='text'
                            value={cardCvc || ''}
                            onInput={handleCvcChange}
                            onBlur={handleCvcBlur}
                            className={cn(styles.multistepInput, styles.cvvInput)}
                            inputMode='numeric'
                            pattern='[0-9]*'
                            placeholder='CVC'
                            maxLength={3}
                        />
                    )}
                </div>
            </div>
        );
    },
);

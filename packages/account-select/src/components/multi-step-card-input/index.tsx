import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import { useMaskito } from '@maskito/react';
import cn from 'classnames';

import { ProductCover } from '@alfalab/core-components-product-cover';

import { CARD_MASK, CVV_MASK, EXPIRY_MASK } from '../../constants';
import { useAccountSelectContext } from '../../context';
import { CardAddingProps, CardData } from '../../types';
import { formatCardNumber, getMaskedCardNumber } from '../../utils/formaters';
import { parseDate } from '../../utils/parse-date';
import { validateCardNumber, validateCvv, validateExpiry } from '../../utils/validate';

import styles from './index.module.css';

type MultiStepCardInputProps = Pick<
    CardAddingProps,
    'onSubmit' | 'onInput' | 'cardImage' | 'needCvv' | 'needExpiryDate' | 'expiryAsDate'
>;

export const MultiStepCardInput: React.FC<MultiStepCardInputProps> = memo(
    ({
        onSubmit,
        onInput,
        cardImage,
        needCvv = true,
        needExpiryDate = true,
        expiryAsDate = true,
    }) => {
        const [step, setStep] = useState<number>(1);
        const [cardNumber, setCardNumber] = useState<CardData['number']>('');
        const [cardExpiry, setCardExpiry] = useState<CardData['expiryDate']>('');
        const [cardCvv, setCardCvv] = useState<string>('');
        const [isCardNumberFocused, setIsCardNumberFocused] = useState<boolean>(false);

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
                            setError('Введена неверная дата');
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
                (numberRef as React.MutableRefObject<HTMLInputElement | null>).current = element;
                numberMaskRef(element);
            },
            [numberMaskRef],
        );

        const expiryRefCallback = useCallback(
            (element: HTMLInputElement | null) => {
                (expiryRef as React.MutableRefObject<HTMLInputElement | null>).current = element;
                expiryMaskRef(element);
            },
            [expiryMaskRef],
        );

        const cvvRefCallback = useCallback(
            (element: HTMLInputElement | null) => {
                (cvvRef as React.MutableRefObject<HTMLInputElement | null>).current = element;
                cvvMaskRef(element);
            },
            [cvvMaskRef],
        );

        useEffect(() => {
            onInput?.({
                number: cardNumber,
                ...(needExpiryDate && { expiryDate: cardExpiry }),
                ...(needCvv && cardCvv && { cvv: cardCvv }),
            });

            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [cardNumber, cardExpiry, cardCvv, needExpiryDate, needCvv]);

        useEffect(() => {
            if (step === 1) {
                numberRef.current?.focus();
            }
        }, [step]);

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
            setError(validateExpiry(e.target.value) ? null : 'Срок действия карты введён неверно');
        };

        const handleCvvBlur = (e: React.FocusEvent<HTMLInputElement>) => {
            setError(validateCvv(e.target.value) ? null : 'Нужно заполнить CVV');
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
                if (needCvv) {
                    setStep(3);
                    setTimeout(() => cvvRef.current?.focus(), 100);
                } else {
                    expiryRef.current?.blur();
                    onSubmit?.({
                        number: cardNumber,
                        expiryDate: expiryAsDate ? parseDate(value as string) : value,
                    });
                }
            }
        };

        const handleCvvChange = ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
            setCardCvv(value);

            if (validateCvv(value)) {
                cvvRef.current?.blur();
                onSubmit?.({
                    number: cardNumber,
                    expiryDate: expiryAsDate ? parseDate(cardExpiry as string) : cardExpiry,
                    cvv: value,
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
                <ProductCover.Single
                    cardNumber={cardNumber.length >= 16 ? Number(cardNumber) : undefined}
                    size={32}
                    {...cardImage}
                />
                <input
                    ref={numberRefCallback}
                    type='text'
                    value={getDisplayCardNumber()}
                    onInput={handleCardNumberChange}
                    onFocus={handleCardNumberFocus}
                    onBlur={handleCardNumberBlur}
                    className={cn(styles.multistepInput, styles.cardNumberInput)}
                    inputMode='numeric'
                    pattern='[0-9]*'
                />
                {needExpiryDate && step >= 2 && (
                    <input
                        ref={expiryRefCallback}
                        type='text'
                        value={cardExpiry as string}
                        onInput={handleExpiryChange}
                        onBlur={handleExpiryBlur}
                        className={cn(styles.multistepInput, styles.expiryInput)}
                        inputMode='numeric'
                        pattern='[0-9]*'
                        placeholder='ММ/ГГ'
                    />
                )}
                {needCvv && step >= 3 && (
                    <input
                        ref={cvvRefCallback}
                        type='password'
                        value={cardCvv || ''}
                        onInput={handleCvvChange}
                        onBlur={handleCvvBlur}
                        className={cn(styles.multistepInput, styles.cvvInput)}
                        inputMode='numeric'
                        pattern='[0-9]*'
                        placeholder='CVC'
                        maxLength={3}
                    />
                )}
            </div>
        );
    },
);

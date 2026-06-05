import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import { useMaskito } from '@maskito/react';
import cn from 'classnames';

import { CARD_MASK, CVV_MASK, EXPIRY_MASK } from '../../constants';
import { useAccountSelect } from '../../context';
import { type CardAddingProps } from '../../types';
import { formatCardNumber, getMaskedCardNumber } from '../../utils/formaters';
import { validateCardNumber, validateCVC, validateExpiry } from '../../utils/validate';

import { useValidationError } from './hooks/useValidationError';
import { getCardData } from './utils/getCardData';

import styles from './index.module.css';

type MultiStepCardInputProps = Pick<
    CardAddingProps,
    'onSubmit' | 'onInput' | 'needCVC' | 'needExpiryDate' | 'expiryAsDate' | 'placeholder'
> & { open?: boolean | undefined; toggleMenu: () => void };

export const MultiStepCardInput: React.FC<MultiStepCardInputProps> = memo(
    ({
        onSubmit,
        onInput,
        needCVC = true,
        needExpiryDate = true,
        expiryAsDate = true,
        placeholder,
        open,
        toggleMenu,
    }) => {
        const {
            step,
            cardNumber,
            setCardNumber,
            setStep,
            cardExpiry,
            cardCvc,
            setCardCvc,
            setCardExpiry,
        } = useAccountSelect();

        const [touchedFields, setTouchedFields] = useState({
            cardNumber: false,
            expiry: false,
            cvc: false,
        });
        const [activeField, setActiveField] = useState<'cardNumber' | 'expiry' | 'cvv' | ''>('');
        const lastActiveFieldRef = useRef<typeof activeField>('');
        const onlyCard = !needCVC && !needExpiryDate;
        const valuesEmpty = !cardNumber && !cardExpiry && !cardCvc;

        const numberRef = useRef<HTMLInputElement | null>(null);
        const expiryRef = useRef<HTMLInputElement | null>(null);
        const cvvRef = useRef<HTMLInputElement | null>(null);

        const numberMaskRef = useMaskito({ options: { mask: CARD_MASK } });
        const expiryMaskRef = useMaskito({ options: { mask: EXPIRY_MASK } });
        const cvvMaskRef = useMaskito({ options: { mask: CVV_MASK } });

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
            onInput?.(
                getCardData({
                    cardNumber,
                    cardExpiry,
                    cardCvc,
                    needExpiryDate,
                    needCVC,
                    expiryAsDate,
                }),
            );

            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [cardNumber, cardExpiry, cardCvc, needExpiryDate, needCVC, expiryAsDate]);

        useEffect(() => {
            if (step === 1) numberRef.current?.focus();
            if (step === 2) expiryRef.current?.focus();
            if (step === 3) cvvRef.current?.focus();
        }, [step]);

        useEffect(() => {
            if (!open || !lastActiveFieldRef.current) return;

            setTimeout(() => {
                const fieldToFocus = lastActiveFieldRef.current;

                if (fieldToFocus === 'cardNumber') numberRef.current?.focus();
                if (fieldToFocus === 'expiry') expiryRef.current?.focus();
                if (fieldToFocus === 'cvv') cvvRef.current?.focus();
            }, 0);
        }, [open]);

        useValidationError({
            cardNumber,
            cardExpiry,
            cardCvc,
            activeField,
            touchedFields,
            needExpiryDate,
            needCVC,
            valuesEmpty,
        });

        const proceedToNextStepOrSubmit = useCallback(
            (
                cardNumberValue = cardNumber,
                cardExpiryValue = cardExpiry,
                cardCvcValue = cardCvc,
            ) => {
                const isCardValid = validateCardNumber(cardNumberValue);
                const isExpiryValid = !needExpiryDate || validateExpiry(cardExpiryValue as string);
                const isCvcValid = !needCVC || validateCVC(cardCvcValue);

                if (!isCardValid) {
                    setStep(1);

                    return;
                }

                if (needExpiryDate && !isExpiryValid) {
                    setStep(2);

                    return;
                }

                if (needCVC && !isCvcValid) {
                    setStep(3);

                    return;
                }

                numberRef.current?.blur();
                expiryRef.current?.blur();
                cvvRef.current?.blur();

                onSubmit?.(
                    getCardData({
                        cardNumber: cardNumberValue,
                        cardExpiry: cardExpiryValue,
                        cardCvc: cardCvcValue,
                        needExpiryDate,
                        needCVC,
                        expiryAsDate,
                    }),
                );
            },
            [
                cardNumber,
                cardExpiry,
                cardCvc,
                needExpiryDate,
                needCVC,
                expiryAsDate,
                onSubmit,
                setStep,
            ],
        );

        const handleCardNumberFocus = () => {
            lastActiveFieldRef.current = 'cardNumber';
            setActiveField('cardNumber');
            setTimeout(() => {
                const { current } = numberRef;

                if (current) {
                    current.setSelectionRange(current.value.length, current.value.length);
                }
            }, 0);
        };

        const handleExpiryFocus = () => {
            lastActiveFieldRef.current = 'expiry';
            setActiveField('expiry');
            setTouchedFields((prev) => ({ ...prev, expiry: false }));
        };

        const handleCVVFocus = () => {
            lastActiveFieldRef.current = 'cvv';
            setActiveField('cvv');
            setTouchedFields((prev) => ({ ...prev, cvc: false }));
        };

        const handleWrapperBlur = (e: React.FocusEvent<HTMLDivElement>) => {
            if (!e.currentTarget.contains(e.relatedTarget as Node)) {
                setActiveField('');
                setTouchedFields({ cardNumber: true, expiry: true, cvc: true });
            }
        };

        const handleCardNumberChange = ({
            target: { value },
        }: React.ChangeEvent<HTMLInputElement>) => {
            if (value.includes('·')) return;

            const cleanValue = value.replace(/\D/g, '');

            if (
                validateCardNumber(cardNumber) &&
                cleanValue === cardNumber.slice(-4) &&
                getMaskedCardNumber(cardNumber).replace(/\D/g, '') === cleanValue
            ) {
                return;
            }

            setCardNumber(cleanValue);

            if (open && cleanValue) {
                toggleMenu();
            }

            proceedToNextStepOrSubmit(cleanValue, cardExpiry, cardCvc);
        };

        const handleExpiryChange = ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
            setCardExpiry(value);
            proceedToNextStepOrSubmit(cardNumber, value, cardCvc);
        };

        const handleCvcChange = ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
            setCardCvc(value);

            proceedToNextStepOrSubmit(cardNumber, cardExpiry, value);
        };

        const handleCardNumberBlur = () => {
            setActiveField('');
            setTouchedFields((prev) => ({ ...prev, cardNumber: true }));
        };

        const handleExpiryBlur = () => {
            setActiveField('');
        };

        const handleCvcBlur = () => {
            setActiveField('');
        };

        const handleClick: React.MouseEventHandler<HTMLDivElement> = (e) => {
            setTimeout(() => {
                if (e.target === numberRef.current) {
                    numberRef.current.focus();
                }
                if (e.target === expiryRef.current) {
                    expiryRef.current.focus();
                }
                if (e.target === cvvRef.current) {
                    cvvRef.current.focus();
                }
            }, 0);
        };

        const getDisplayCardNumber = () => {
            if (activeField === 'cardNumber' || !validateCardNumber(cardNumber) || onlyCard) {
                return formatCardNumber(cardNumber);
            }

            return getMaskedCardNumber(cardNumber);
        };

        return (
            <div
                className={styles.multistepCardInputWrapper}
                aria-hidden='true'
                onBlur={handleWrapperBlur}
                onClick={handleClick}
            >
                <div className={styles.inputs}>
                    <input
                        ref={numberRefCallback}
                        onBlur={handleCardNumberBlur}
                        type='text'
                        placeholder={placeholder ?? 'Карта'}
                        value={getDisplayCardNumber()}
                        onInput={handleCardNumberChange}
                        onFocus={handleCardNumberFocus}
                        className={cn(styles.multistepInput, styles.cardNumberInput, {
                            [styles.cardNumberInputValid]:
                                validateCardNumber(cardNumber) && !onlyCard,
                        })}
                        inputMode='numeric'
                        pattern='[0-9]*'
                    />
                    {needExpiryDate && (
                        <input
                            ref={expiryRefCallback}
                            type='text'
                            value={String(cardExpiry)}
                            onInput={handleExpiryChange}
                            onFocus={handleExpiryFocus}
                            className={cn(styles.multistepInput, styles.expiryInput, {
                                [styles.hidden]:
                                    activeField === 'cardNumber' ||
                                    valuesEmpty ||
                                    !validateCardNumber(cardNumber),
                            })}
                            tabIndex={validateCardNumber(cardNumber) ? 0 : -1}
                            inputMode='numeric'
                            onBlur={handleExpiryBlur}
                            pattern='[0-9]*'
                            placeholder='ММ/ГГ'
                        />
                    )}
                    {needCVC && (
                        <input
                            ref={cvvRefCallback}
                            type='text'
                            value={cardCvc || ''}
                            onInput={handleCvcChange}
                            onFocus={handleCVVFocus}
                            className={cn(styles.multistepInput, styles.cvvInput, {
                                [styles.hidden]:
                                    activeField === 'cardNumber' ||
                                    valuesEmpty ||
                                    !validateCardNumber(cardNumber),
                            })}
                            tabIndex={validateCardNumber(cardNumber) ? 0 : -1}
                            inputMode='numeric'
                            onBlur={handleCvcBlur}
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

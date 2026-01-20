import React, { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useMaskito } from '@maskito/react';
import cn from 'classnames';

import { CARD_MASK, CVV_MASK, ERRORS, EXPIRY_MASK } from '../../constants';
import { useAccountSelect, useError } from '../../context';
import { type CardAddingProps } from '../../types';
import { formatCardNumber, getMaskedCardNumber } from '../../utils/formaters';
import { parseDate } from '../../utils/parse-date';
import { validateCardNumber, validateCVC, validateExpiry } from '../../utils/validate';

import styles from './index.module.css';

type MultiStepCardInputProps = Pick<
    CardAddingProps,
    'onSubmit' | 'onInput' | 'needCVC' | 'needExpiryDate' | 'expiryAsDate' | 'placeholder'
>;

export const MultiStepCardInput: React.FC<MultiStepCardInputProps> = memo(
    ({
        onSubmit,
        onInput,
        needCVC = true,
        needExpiryDate = true,
        expiryAsDate = true,
        placeholder,
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

        const { setError } = useError();

        const [isCardNumberFocused, setIsCardNumberFocused] = useState<boolean>(false);
        const [fieldErrors, setFieldErrors] = useState<Record<string, string | null>>({});
        const [touchedFields, setTouchedFields] = useState<Set<string>>(new Set());

        const isShowExpiry = needExpiryDate && step >= 2 && validateCardNumber(cardNumber);
        const isShowCvv = needCVC && step >= 2 && validateCardNumber(cardNumber);
        const onlyCard = !needCVC && !needExpiryDate;

        const numberRef = useRef<HTMLInputElement | null>(null);
        const expiryRef = useRef<HTMLInputElement | null>(null);
        const cvvRef = useRef<HTMLInputElement | null>(null);

        const numberMaskRef = useMaskito({ options: CARD_MASK });
        const expiryMaskRef = useMaskito({ options: EXPIRY_MASK });
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

        const validateField = useCallback(
            (field: string, value: string, force = false) => {
                if (!force && !touchedFields.has(field)) {
                    return;
                }

                let error: string | null = null;

                if (field === 'cardNumber' && value && !validateCardNumber(value)) {
                    error = ERRORS.CARD_NUMBER_ERROR;
                } else if (field === 'expiry') {
                    if (value) {
                        error = validateExpiry(value) ? null : ERRORS.EXPIRY_ERROR;
                    } else {
                        error = ERRORS.EXPIRY_EMPTY;
                    }
                } else if (field === 'cvc') {
                    if (value && validateCVC(value)) {
                        error = null;
                    } else {
                        error = ERRORS.CVV_EMPTY;
                    }
                }

                setFieldErrors((prev) => ({
                    ...prev,
                    [field]: error,
                }));
            },
            [touchedFields],
        );

        // Валидация всех полей (принудительно)
        const validateAllFields = useCallback(() => {
            if (cardNumber) validateField('cardNumber', cardNumber, true);
            if (needExpiryDate) validateField('expiry', String(cardExpiry || ''), true);
            if (needCVC) validateField('cvc', cardCvc || '', true);
        }, [cardNumber, cardExpiry, cardCvc, needExpiryDate, needCVC, validateField]);

        const errorMessage = useMemo(() => {
            const errors = Object.values(fieldErrors).filter(Boolean) as string[];

            return errors.length > 0 ? errors.join('. ') : null;
        }, [fieldErrors]);

        useEffect(() => {
            setError(errorMessage);
        }, [errorMessage, setError]);

        const areAllFieldsFilled =
            cardNumber && (!needExpiryDate || cardExpiry) && (!needCVC || cardCvc);

        const handleBlur = useCallback(
            (field: string, value: string) => {
                setTouchedFields((prev) => new Set(prev).add(field));

                validateField(field, value, true);

                setTimeout(() => {
                    const { activeElement } = document;
                    const isAnyFieldFocused =
                        activeElement === numberRef.current ||
                        activeElement === expiryRef.current ||
                        activeElement === cvvRef.current;

                    if (areAllFieldsFilled && !isAnyFieldFocused) {
                        validateAllFields();
                    }
                }, 0);
            },
            [areAllFieldsFilled, validateField, validateAllFields],
        );

        const handleCardNumberFocus = () => {
            setIsCardNumberFocused(true);
            setTimeout(() => {
                const { current } = numberRef;

                if (current) {
                    current.setSelectionRange(current.value.length, current.value.length);
                }
            }, 0);
        };

        const handleCardNumberBlur = () => {
            setIsCardNumberFocused(false);
            handleBlur('cardNumber', cardNumber);
        };

        const handleExpiryBlur = () => {
            handleBlur('expiry', String(cardExpiry || ''));
        };

        const handleCvcBlur = () => {
            const currentValue = cvvRef.current?.value || cardCvc || '';

            handleBlur('cvc', currentValue);
        };

        const handleCardNumberChange = ({
            target: { value },
        }: React.ChangeEvent<HTMLInputElement>) => {
            const cleanValue = value.replace(/\s/g, '');

            setCardNumber(cleanValue);
            if (isCardNumberFocused && touchedFields.has('cardNumber')) {
                validateField('cardNumber', cleanValue);
            }

            if (validateCardNumber(cleanValue)) {
                if (needExpiryDate) {
                    setStep(2);
                    setTimeout(() => expiryRef.current?.focus(), 100);
                } else {
                    numberRef.current?.blur();
                    onSubmit?.({ number: cleanValue });
                }
            }
        };

        const handleExpiryChange = ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
            setCardExpiry(value);

            if (document.activeElement === expiryRef.current && touchedFields.has('expiry')) {
                validateField('expiry', value);
            }

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

            if (document.activeElement === cvvRef.current && touchedFields.has('cvc')) {
                validateField('cvc', value);
            }

            if (validateCVC(value)) {
                validateField('cvc', value, true);

                setTimeout(() => {
                    cvvRef.current?.blur();
                    onSubmit?.({
                        number: cardNumber,
                        expiryDate: expiryAsDate ? parseDate(cardExpiry as string) : cardExpiry,
                        CVC: value,
                    });
                }, 10);
            }
        };

        const getDisplayCardNumber = () => {
            if (isCardNumberFocused || !validateCardNumber(cardNumber) || onlyCard) {
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
                            [styles.cardNumberInputValid]:
                                validateCardNumber(cardNumber) && !onlyCard,
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

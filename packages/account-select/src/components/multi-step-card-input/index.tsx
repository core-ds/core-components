import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import { useMaskito } from '@maskito/react';
import cn from 'classnames';

import { CARD_MASK, CVV_MASK, ERRORS, EXPIRY_COMPLETE_REGEXP, EXPIRY_MASK } from '../../constants';
import { useAccountSelect, useError } from '../../context';
import { type CardAddingProps } from '../../types';
import { formatCardNumber, getMaskedCardNumber } from '../../utils/formaters';
import { parseDate } from '../../utils/parse-date';
import { validateCardNumber, validateCVC, validateExpiry } from '../../utils/validate';

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

        const [touchedFields, setTouchedFields] = useState({
            cardNumber: false,
            expiry: false,
            cvc: false,
        });
        const [activeField, setActiveField] = useState<'cardNumber' | 'expiry' | 'cvv' | ''>('');
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
            onInput?.({
                number: cardNumber,
                ...(needExpiryDate && { expiryDate: cardExpiry }),
                ...(needCVC && cardCvc && { cvc: cardCvc }),
            });

            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [cardNumber, cardExpiry, cardCvc, needExpiryDate, needCVC]);

        useEffect(() => {
            if (step === 1) numberRef.current?.focus();
            if (step === 2) expiryRef.current?.focus();
            if (step === 3) cvvRef.current?.focus();
        }, [step]);

        useEffect(() => {
            if (valuesEmpty) {
                setError(null);

                return;
            }

            const errors = [];

            if (
                activeField !== 'cardNumber' &&
                touchedFields.cardNumber &&
                !validateCardNumber(cardNumber)
            ) {
                errors.push(ERRORS.CARD_NUMBER_ERROR);
            }

            if (needExpiryDate && activeField !== 'expiry' && touchedFields.expiry) {
                if (!cardExpiry) {
                    errors.push(ERRORS.EXPIRY_EMPTY);
                } else if (!validateExpiry(cardExpiry as string)) {
                    errors.push(ERRORS.EXPIRY_ERROR);
                }
            }

            if (needCVC && activeField !== 'cvv' && touchedFields.cvc) {
                if (!cardCvc || !validateCVC(cardCvc)) {
                    errors.push(ERRORS.CVV_EMPTY);
                }
            }

            if (errors.length > 0) {
                setError(errors.join('. '));
            } else if (Object.values(touchedFields).some((touched) => touched)) {
                // Очищаем ошибку только если какие-то поля уже были тронуты
                setError(null);
            }
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

                onSubmit?.({
                    number: cardNumberValue,
                    ...(needExpiryDate && {
                        expiryDate: expiryAsDate
                            ? parseDate(cardExpiryValue as string)
                            : cardExpiryValue,
                    }),
                    ...(needCVC && { CVC: cardCvcValue }),
                });
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
            setActiveField('cardNumber');
            setTimeout(() => {
                const { current } = numberRef;

                if (current) {
                    current.setSelectionRange(current.value.length, current.value.length);
                }
            }, 0);
        };

        const handleExpiryFocus = () => {
            setActiveField('expiry');
        };

        const handleCVVFocus = () => {
            setActiveField('cvv');
        };

        const handleBlur = () => {
            setActiveField('');
        };

        const handleCardNumberChange = ({
            target: { value },
        }: React.ChangeEvent<HTMLInputElement>) => {
            const cleanValue = value.replace(/\s/g, '');

            setCardNumber(cleanValue);

            proceedToNextStepOrSubmit(cleanValue, cardExpiry, cardCvc);
        };

        const handleExpiryChange = ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
            setCardExpiry(value);

            if (EXPIRY_COMPLETE_REGEXP.test(value) && !validateExpiry(value)) {
                setError((prev) => {
                    if (prev?.includes(ERRORS.EXPIRY_ERROR)) {
                        return prev;
                    }
                    const result = prev?.split('. ') ?? [];

                    result.push(ERRORS.EXPIRY_ERROR);

                    return result.join('. ');
                });
            }

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
            setTouchedFields((prev) => ({ ...prev, expiry: true }));
        };

        const handleCvcBlur = () => {
            setTouchedFields((prev) => ({ ...prev, cvc: true }));
        };

        const handleFocus: React.FocusEventHandler<HTMLDivElement> = () => {
            setError(null);
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
                onFocus={handleFocus}
                onBlur={handleBlur}
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
                                [styles.hidden]: activeField === 'cardNumber' || valuesEmpty,
                            })}
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
                                [styles.hidden]: activeField === 'cardNumber' || valuesEmpty,
                            })}
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

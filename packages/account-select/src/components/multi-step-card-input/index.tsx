import React, { useEffect, useRef, useState } from 'react';
import cn from 'classnames';
import { createTextMaskInputElement, TextMaskConfig, TextMaskInputElement } from 'text-mask-core';

import { ProductCover } from '@alfalab/core-components-product-cover';

import { CARD_MASK, CVV_MASK, EXPIRY_MASK } from '../../constants';
import { AccountSelectProps, CardData } from '../../types';
import { validateCardNumber, validateCvv, validateExpiry } from '../../utils/validate';

import styles from './index.module.css';

type MultiStepCardInputProps = Pick<AccountSelectProps, 'onSubmit' | 'onInput'>;

const createMaskConfig = (mask: TextMaskConfig['mask']): TextMaskConfig => ({
    mask,
    guide: false,
    keepCharPositions: false,
    showMask: false,
    currentCaretPosition: 0,
    rawValue: '',
    previousConformedValue: '',
});

const getMaskedCardNumber = (value: string) => {
    if (!value || value.length < 16) return value;
    const cleanValue = value.replace(/\s/g, '');
    const lastFour = cleanValue.slice(-4);

    return `··${lastFour}`;
};

export const MultiStepCardInput: React.FC<MultiStepCardInputProps> = ({ onSubmit, onInput }) => {
    const [step, setStep] = useState<number>(1);
    const [cardNumber, setCardNumber] = useState<CardData['number']>('');
    const [cardExpiry, setCardExpiry] = useState<CardData['expiryDate']>('');
    const [cardCvv, setCardCvv] = useState<CardData['cvv']>('');
    const [isCardNumberFocused, setIsCardNumberFocused] = useState<boolean>(false);

    const numberRef = useRef<HTMLInputElement>(null);
    const expiryRef = useRef<HTMLInputElement>(null);
    const cvvRef = useRef<HTMLInputElement>(null);

    const numberMask = useRef<TextMaskInputElement | null>(null);
    const expiryMask = useRef<TextMaskInputElement | null>(null);
    const cvvMask = useRef<TextMaskInputElement | null>(null);

    useEffect(() => {
        onInput?.({
            number: cardNumber,
            expiryDate: cardExpiry,
            cvv: cardCvv,
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cardNumber, cardExpiry, cardCvv]);

    useEffect(() => {
        if (step === 1) {
            numberRef.current?.focus();
        }
    }, [step]);

    useEffect(() => {
        if (numberRef.current) {
            numberMask.current = createTextMaskInputElement({
                ...createMaskConfig(CARD_MASK),
                inputElement: numberRef.current,
            });
        }
    }, []);

    useEffect(() => {
        if (expiryRef.current && step >= 2) {
            expiryMask.current = createTextMaskInputElement({
                ...createMaskConfig(EXPIRY_MASK),
                inputElement: expiryRef.current,
            });
        }
    }, [step]);

    useEffect(() => {
        if (cvvRef.current && step >= 3) {
            cvvMask.current = createTextMaskInputElement({
                ...createMaskConfig(CVV_MASK),
                inputElement: cvvRef.current,
            });
        }
    }, [step]);

    const handleCardNumberFocus = () => {
        setIsCardNumberFocused(true);
    };

    const handleCardNumberBlur = () => {
        setIsCardNumberFocused(false);
    };

    const handleCardNumberChange = ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
        if (numberMask.current) {
            numberMask.current.update(value);
            const maskedValue = numberRef.current?.value || '';

            setCardNumber(maskedValue);

            if (validateCardNumber(maskedValue)) {
                setStep(2);
                setTimeout(() => expiryRef.current?.focus(), 100);
            }
        }
    };

    const handleExpiryChange = ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
        if (expiryMask.current) {
            expiryMask.current.update(value);
            const maskedValue = expiryRef.current?.value || '';

            setCardExpiry(maskedValue);

            if (validateExpiry(maskedValue)) {
                setStep(3);
                setTimeout(() => cvvRef.current?.focus(), 100);
            }
        }
    };

    const handleCvvChange = ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
        if (cvvMask.current) {
            cvvMask.current.update(value);
            const maskedValue = cvvRef.current?.value || '';

            setCardCvv(maskedValue);

            if (validateCvv(maskedValue)) {
                onSubmit?.({
                    number: cardNumber,
                    expiryDate: cardExpiry,
                    cvv: maskedValue,
                });
            }
        }
    };

    const getDisplayCardNumber = () => {
        if (isCardNumberFocused || step === 1 || !validateCardNumber(cardNumber)) {
            return cardNumber;
        }

        return getMaskedCardNumber(cardNumber);
    };

    return (
        <div
            className={styles.multistepCardInputWrapper}
            onClick={(e) => e.stopPropagation()}
            aria-hidden='true'
        >
            <ProductCover.Single size={32} />
            <input
                ref={numberRef}
                type='text'
                value={getDisplayCardNumber()}
                onChange={handleCardNumberChange}
                onFocus={handleCardNumberFocus}
                onBlur={handleCardNumberBlur}
                className={cn(styles.multistepInput, styles.cardNumberInput)}
                inputMode='numeric'
                pattern='[0-9]*'
            />
            {step >= 2 && (
                <input
                    ref={expiryRef}
                    type='text'
                    value={cardExpiry}
                    onChange={handleExpiryChange}
                    className={cn(styles.multistepInput, styles.expiryInput)}
                    inputMode='numeric'
                    pattern='[0-9]*'
                    placeholder='ММ/ГГ'
                />
            )}
            {step >= 3 && (
                <input
                    ref={cvvRef}
                    type='password'
                    value={cardCvv}
                    onChange={handleCvvChange}
                    className={cn(styles.multistepInput, styles.cvvInput)}
                    inputMode='numeric'
                    pattern='[0-9]*'
                    placeholder='CVC'
                    maxLength={3}
                />
            )}
        </div>
    );
};

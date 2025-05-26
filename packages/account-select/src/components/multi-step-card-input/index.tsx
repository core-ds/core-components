import React, { useEffect, useState } from 'react';

import { FormControlDesktop } from '@alfalab/core-components-form-control/desktop';
import { MaskedInput } from '@alfalab/core-components-masked-input';
import { Arrow, Field, FieldProps } from '@alfalab/core-components-select/shared';
import { Typography } from '@alfalab/core-components-typography';

import { ADD_CARD_KEY } from '../../constants';
import { AccountSelectProps } from '../../types';

import styles from './index.module.css';

export type MultiStepCardInputProps = FieldProps & Pick<AccountSelectProps, 'onSubmit' | 'onInput'>;

type TField = 'card' | 'expiry' | 'cvv';

const fieldToStep = (field: TField) => ({ card: 0, expiry: 1, cvv: 2 }[field]);

const nextField = (field: TField): TField | null =>
    ({ card: 'expiry', expiry: 'cvv', cvv: null }[field] as TField | null);

// Маски для каждого поля
const cardMask = [
    /\d/,
    /\d/,
    /\d/,
    /\d/,
    ' ',
    /\d/,
    /\d/,
    /\d/,
    /\d/,
    ' ',
    /\d/,
    /\d/,
    /\d/,
    /\d/,
    ' ',
    /\d/,
    /\d/,
    /\d/,
    /\d/,
];
const expiryMask = [/\d/, /\d/, '/', /\d/, /\d/];
const cvvMask = [/\d/, /\d/, /\d/];

const getMask = (field: TField) => {
    switch (field) {
        case 'card':
            return cardMask;
        case 'expiry':
            return expiryMask;
        case 'cvv':
            return cvvMask;
        default:
            return cardMask;
    }
};

const parseExpiryDate = (value: string): Date | null => {
    const [month, year] = value.split('/');

    return new Date(2000 + parseInt(year, 10), parseInt(month, 10) - 1);
};

const validate = (field: TField, value: string) => {
    switch (field) {
        case 'card':
            return /^\d{16}$/.test(value.replace(/\s/g, ''));
        case 'expiry':
            // Проверяем только что введены 2 цифры месяца (01-12) и 2 цифры года
            return /^(0[1-9]|1[0-2])\/\d{2}$/.test(value);
        case 'cvv':
            return /^\d{3}$/.test(value);
        default:
            return false;
    }
};

export const MultiStepCardInput: React.FC<MultiStepCardInputProps> = ({
    onSubmit,
    selected,
    label,
    innerProps,
    onInput,
    ...restProps
}) => {
    const [step, setStep] = useState(0);
    const [values, setValues] = useState<{ card: string; expiry: Date | null; cvv: string }>({
        card: '',
        expiry: null,
        cvv: '',
    });
    const [isValid, setIsValid] = useState({ card: false, expiry: false, cvv: false });
    const [focusedField, setFocusedField] = useState<'card' | 'expiry' | 'cvv' | null>('card');

    useEffect(() => {
        if (Object.values(isValid).every(Boolean) && values.expiry !== null) {
            onSubmit?.({
                number: values.card,
                expiryDate: values.expiry,
                cvv: values.cvv,
            });
            setFocusedField(null);
        }
    }, [isValid, onSubmit, values]);

    const handleChange = (field: TField, value: string) => {
        const valid = validate(field, value);

        if (field === 'expiry' && valid) {
            const expiryDate = parseExpiryDate(value);

            setValues((prev) => ({ ...prev, [field]: expiryDate }));
        } else {
            setValues((prev) => ({ ...prev, [field]: value }));
        }

        setIsValid((prev) => ({ ...prev, [field]: valid }));

        if (valid && step === fieldToStep(field)) {
            setStep(step + 1);
            setFocusedField(nextField(field));
        }
    };

    const getDisplayValue = (field: TField, value: string | Date | null) => {
        switch (field) {
            case 'card':
                return value ? `··${(value as string).slice(-4)}` : '····';
            case 'expiry': {
                if (!value) return 'MM/YY';
                const date = value as Date;

                return `${String(date.getMonth() + 1).padStart(2, '0')}/${String(
                    date.getFullYear(),
                ).slice(-2)}`;
            }
            case 'cvv':
                return '···';
            default:
                return '';
        }
    };

    const getInputValue = (field: TField, value: string | Date | null): string => {
        if (field === 'expiry' && value instanceof Date) {
            return `${String(value.getMonth() + 1).padStart(2, '0')}/${String(
                value.getFullYear(),
            ).slice(-2)}`;
        }

        return (value as string) || '';
    };

    const renderInput = (field: TField) => {
        const isVisible = fieldToStep(field) <= step;
        const isEditing = focusedField === field;

        if (!isVisible) return null;

        return isEditing ? (
            <MaskedInput
                key={field}
                inputClassName={styles.input}
                mask={getMask(field)}
                value={getInputValue(field, values[field])}
                onClick={() => {
                    // Не блокируем всплытие события
                    setFocusedField(field);
                }}
                onChange={(e) => handleChange(field, e.target.value)}
                onBlur={() => {
                    if (isValid[field]) setFocusedField(null);
                }}
                type={field === 'cvv' ? 'password' : 'text'}
            />
        ) : (
            <Typography.Text
                onClick={() => {
                    // Не блокируем всплытие события
                    setFocusedField(field);
                }}
            >
                {getDisplayValue(field, values[field])}
            </Typography.Text>
        );
    };

    if (selected?.key === ADD_CARD_KEY) {
        return (
            <div className={styles.multistepInput} {...innerProps}>
                {renderInput('card')}
                {renderInput('expiry')}
                {renderInput('cvv')}
                <Arrow />
            </div>
        );
    }

    return (
        <Field
            FormControlComponent={FormControlDesktop}
            selected={selected}
            label={selected ? null : label}
            innerProps={innerProps}
            {...restProps}
        />
    );
};

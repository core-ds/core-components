import React, { ChangeEvent, MouseEvent, ReactNode, useCallback, useEffect, useState } from 'react';
import cn from 'classnames';

import { MaskedInput } from '@alfalab/core-components-masked-input';
import { CameraMIcon } from '@alfalab/icons-glyph/CameraMIcon';
import { AlfaBankLIcon } from '@alfalab/icons-logotype/AlfaBankLIcon';
import { MastercardLIcon } from '@alfalab/icons-logotype/MastercardLIcon';
import { MirXxlIcon } from '@alfalab/icons-logotype/MirXxlIcon';
import { VisaXxlIcon } from '@alfalab/icons-logotype/VisaXxlIcon';

import { getDefaultInputLabel } from './helpers/getDefaultInputLabel';
import { MaskTypeEnum } from './enums';
import { MaskType } from './types';
import { validateCardNumber } from './utils';

import styles from './index.module.css';

export type BankCardProps = {
    /**
     * Дополнительный класс
     */
    className?: string;

    /**
     * Цвет фона карты
     */
    backgroundColor?: string;

    /**
     * Иконка логотипа банка (размер L)
     */
    bankLogo?: ReactNode;

    /**
     * Лэйбл поля ввода
     */
    inputLabel?: string;

    /**
     * Значение поля ввода
     */
    value?: string;

    /**
     * Обработчик ввода
     */
    onChange?: (event: ChangeEvent<HTMLInputElement>, payload: { value: string }) => void;

    /**
     * Обработчик вызова камеры
     */
    onUsePhoto?: (event: MouseEvent<HTMLButtonElement>) => void;

    /**
     * Идентификатор для систем автоматизированного тестирования
     */
    dataTestId?: string;

    /**
     * Тип вводимой маски. Позволяет устанавливать необходимый тип номера (номер карты или номер счёта)
     * Если параметр не передавать - работает с обоими типами номеров
     */
    maskType?: MaskType;
};

// prettier-ignore
const cardMask = [/\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/];
// prettier-ignore
const accountNumberMask = [/\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/];

const getBrandIcon = (value = '') => {
    // Показываем логотип только после ввода всех цифр карты
    if (value.replace(/\s/g, '').length === 16 && validateCardNumber(value)) {
        if (value.startsWith('2')) return <MirXxlIcon />;
        if (value.startsWith('4')) return <VisaXxlIcon />;
        if (value.startsWith('5')) return <MastercardLIcon />;
        if (value.startsWith('6')) return <MastercardLIcon />;
    }

    return null;
};

export const BankCard = React.forwardRef<HTMLInputElement, BankCardProps>(
    (
        {
            bankLogo = <AlfaBankLIcon />,
            backgroundColor = '#EF3124',
            value,
            className,
            onUsePhoto,
            onChange,
            dataTestId,
            maskType = MaskTypeEnum.Default,
            inputLabel = getDefaultInputLabel(maskType),
        },
        ref,
    ) => {
        const uncontrolled = value === undefined;

        const [brandIcon, setBrandIcon] = useState<ReactNode>(getBrandIcon(value));

        const getMask = useCallback(
            (newValue: string) => {
                switch (maskType) {
                    case MaskTypeEnum.Card:
                        return cardMask;
                    case MaskTypeEnum.AccountNumber:
                        return accountNumberMask;
                    case MaskTypeEnum.Default:
                    default:
                        return newValue.length <= cardMask.length ? cardMask : accountNumberMask;
                }
            },
            [maskType],
        );

        const handleInputChange = useCallback(
            (event: ChangeEvent<HTMLInputElement>, payload: { value: string }) => {
                if (uncontrolled) {
                    setBrandIcon(getBrandIcon(event.target.value));
                }

                if (onChange) {
                    onChange(event, payload);
                }
            },
            [onChange, uncontrolled],
        );

        const renderRightAddons = useCallback(
            () => (
                <button type='button' className={styles.usePhoto} onClick={onUsePhoto}>
                    <CameraMIcon />
                </button>
            ),
            [onUsePhoto],
        );

        useEffect(() => {
            setBrandIcon(getBrandIcon(value));
        }, [value]);

        return (
            <div className={cn(styles.component, className)}>
                <div className={styles.aspectRatioContainer}>
                    <div className={styles.content} style={{ backgroundColor }}>
                        <div className={styles.bankLogo}>{bankLogo}</div>

                        <MaskedInput
                            ref={ref}
                            value={value}
                            mask={getMask}
                            block={true}
                            label={inputLabel}
                            size='m'
                            rightAddons={renderRightAddons()}
                            inputClassName={styles.input}
                            labelClassName={styles.label}
                            filledClassName={styles.filled}
                            focusedClassName={styles.focused}
                            onChange={handleInputChange}
                            dataTestId={dataTestId}
                            inputMode='numeric'
                            pattern='[0-9]*'
                            breakpoint={1}
                        />

                        {brandIcon && <div className={styles.brandLogo}>{brandIcon}</div>}
                    </div>
                </div>
            </div>
        );
    },
);

BankCard.displayName = 'BankCard';

/* eslint-disable complexity, no-param-reassign */
import React, { useCallback, useRef } from 'react';
import mergeRefs from 'react-merge-refs';
import { conformToMask, type TextMaskConfig } from 'text-mask-core';

import { MaskedInput, type MaskedInputProps } from '@alfalab/core-components-masked-input';

import { checkInsertBefore } from './utils/check-insert-before';
import { deleteFormatting, deleteMaskChar, getInsertedNumber, setCaretPosition } from './utils';

const mask = [
    '+',
    '7',
    ' ',
    /([0-6]|[8-9])/,
    /\d/,
    /\d/,
    ' ',
    /\d/,
    /\d/,
    /\d/,
    ' ',
    /\d/,
    /\d/,
    ' ',
    /\d/,
    /\d/,
];

const countryPrefix = '+7 ';

export type PhoneInputProps = Omit<MaskedInputProps, 'onBeforeDisplay' | 'type' | 'mask'> & {
    clearableCountryCode?: boolean;
};

export const PhoneInput = React.forwardRef<HTMLInputElement, PhoneInputProps>(
    ({ clearableCountryCode = true, ...restProps }, ref) => {
        const inputRef = useRef<HTMLInputElement>(null);

        const handleBeforeDisplay = useCallback(
            (conformedValue: string, config: TextMaskConfig) => {
                const { rawValue, previousConformedValue, currentCaretPosition } = config;

                const previousValueWithoutFormatting = previousConformedValue
                    ? deleteFormatting(previousConformedValue)
                    : '';

                // Вставка номера с 10 или 11 цифрами без кода страны
                const digits = rawValue.replace(/\D/g, '');

                if ((digits.length === 10 || digits.length === 11) && !rawValue.startsWith('+7')) {
                    let processedDigits = digits;

                    if (
                        digits.length === 11 &&
                        (digits.startsWith('7') || digits.startsWith('8'))
                    ) {
                        processedDigits = digits.slice(1);
                    }
                    const masked = conformToMask(`+7${processedDigits}`, mask, config);

                    return masked.conformedValue;
                }

                /*
                 * Удаляем лишний символ маски при вводе или вставке значений перед знаком + или после него.
                 */
                if (checkInsertBefore(previousConformedValue, rawValue)) {
                    const newRaw = deleteMaskChar(previousValueWithoutFormatting, rawValue);

                    conformedValue = conformToMask(newRaw, mask, config).conformedValue;
                }

                const currentValueWithoutFormatting = deleteFormatting(conformedValue) || '';

                /*
                 * код ниже нужен для фикса следующих багов библиотеки text-mask:
                 * 1) так как код страны указан в маске жестко как "+7",
                 * то при удалении цифры перед ним каретка устанавливается перед кодом страны
                 * 2) в номере телефона есть пробелы и дефисы,
                 * при редактировании цифр рядом с этими символами каретка перескакивает через них,
                 * а не остается на том же месте, на котором была до редактирования
                 */
                if (
                    previousConformedValue &&
                    (([3, 6].includes(currentCaretPosition) &&
                        Math.abs(
                            previousValueWithoutFormatting.length -
                                currentValueWithoutFormatting.length,
                        ) === 1) ||
                        ([7, 10, 13].includes(currentCaretPosition) &&
                            previousConformedValue.length > currentCaretPosition))
                ) {
                    setCaretPosition({ position: currentCaretPosition, inputRef });
                }

                // // В режиме clearableCountryCode удаляет лишний пробел, чтобы можно было стереть код города.
                if (rawValue === '+7' && conformedValue === '' && clearableCountryCode) {
                    setCaretPosition({ position: countryPrefix.length - 1, inputRef });
                }

                // Удаление цифры перед кодом страны удаляет только саму цифру, код остается ("+7 1" -> "+7 ")
                if (rawValue === countryPrefix) {
                    return rawValue;
                }

                const insertedNumber = getInsertedNumber({
                    rawValue,
                    clearableCountryCode,
                    countryPrefix,
                    previousConformedValue,
                });

                // Вставка номера, начинающегося с 8 или 7: 89990313131, 71112223344
                if (
                    (insertedNumber.startsWith('7') || insertedNumber.startsWith('8')) &&
                    insertedNumber.length >= 10
                ) {
                    const masked = conformToMask(`+7${insertedNumber.slice(1)}`, mask, config);

                    return masked.conformedValue;
                }

                // Если ввод начат с 7 или 8 - выводит "+7 " и дает продолжить ввод со след. цифры
                if (rawValue.length === 1 && ['7', '8'].includes(rawValue[0])) {
                    return countryPrefix;
                }

                // Запрет на удаление кода страны
                if (!clearableCountryCode && !conformedValue) {
                    setCaretPosition({ position: countryPrefix.length, inputRef });

                    return rawValue.length ? false : countryPrefix;
                }

                return conformedValue;
            },
            [clearableCountryCode],
        );

        return (
            <MaskedInput
                {...restProps}
                defaultValue={clearableCountryCode ? restProps.defaultValue : countryPrefix}
                mask={mask}
                onBeforeDisplay={handleBeforeDisplay}
                type='tel'
                ref={mergeRefs([ref, inputRef])}
            />
        );
    },
);

PhoneInput.displayName = 'PhoneInputs';

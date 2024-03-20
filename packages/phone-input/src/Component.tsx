/* eslint-disable complexity, no-param-reassign */
import React, { useCallback, useRef } from 'react';
import mergeRefs from 'react-merge-refs';
import { conformToMask, TextMaskConfig } from 'text-mask-core';

import { MaskedInput, MaskedInputProps } from '@alfalab/core-components-masked-input';

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

                /*
                 * Удаляем лишний символ маски при вводе или вставке значений перед знаком + или после него.
                 */
                if (previousConformedValue && rawValue.indexOf('+7') !== 0) {
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

                // Удаление цифры перед кодом страны удаляет только саму цифру, код остается ("+7 1" -> "+7 ")
                if (rawValue === countryPrefix) {
                    return rawValue;
                }

                // Вставка номера с 10 цифрами без кода страны
                if (rawValue.length === 10 && conformedValue.length === mask.length) {
                    const masked = conformToMask(`+7${rawValue}`, mask, config);

                    return masked.conformedValue;
                }

                /*
                 * Код нужен для исправления ошибки в библиотеке text-mask: если цифра 7 находится на второй позиции при вставке, то она удаляется
                 * Это происходит потому что цифра 7 есть уже в маске
                 */
                if (rawValue[1] === '7') {
                    const masked = conformToMask(`+7${rawValue}`, mask, config);

                    return masked.conformedValue;
                }

                const insertedNumber = getInsertedNumber({
                    rawValue,
                    clearableCountryCode,
                    countryPrefix,
                    previousConformedValue,
                });

                // Вставка номера, начинающегося с 8 или 7: 89990313131, 71112223344
                if (
                    conformedValue.length === mask.length &&
                    (insertedNumber.startsWith('8') || insertedNumber.startsWith('7'))
                ) {
                    const masked = conformToMask(`+7${insertedNumber.slice(1)}`, mask, config);

                    return masked.conformedValue;
                }

                // Если ввод начат с 7 или 8 - выводит "+7 " и дает продолжить ввод со след. цифры
                if (rawValue.length === 1 && ['7', '8'].includes(rawValue[0])) {
                    return countryPrefix;
                }

                const abortCountryCodeClearing = !clearableCountryCode && !conformedValue;

                if (abortCountryCodeClearing) {
                    setCaretPosition({ position: countryPrefix.length, inputRef });

                    if (!rawValue.length) return countryPrefix;

                    return false;
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

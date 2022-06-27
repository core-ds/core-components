import React, { ChangeEvent, forwardRef, useEffect, useRef, useState } from 'react';
import cn from 'classnames';

import { AsYouType, CountryCode } from 'libphonenumber-js';

import { OptionShape, SelectProps } from '@alfalab/core-components-select';
import { Country, getCountries, getCountriesHash } from '@alfalab/utils';
import {
    InputAutocomplete,
    InputAutocompleteProps,
} from '@alfalab/core-components-input-autocomplete';
import { CountriesSelect } from './components';
import { formatPhoneWithUnclearableCountryCode } from './utils/format-phone-with-unclearable-country-code';
import { useCaretAvoidCountryCode } from './useCaretAvoidCountryCode';

import styles from './index.module.css';

const countriesHash = getCountriesHash();

const MAX_DIAL_CODE_LENGTH = 4;

const MASK_SYMBOLS = [' ', '-', '(', ')'];

const DEFAULT_MAX_PHONE_LEN: MaxPhoneLen = { RU: 11 };

type MaxPhoneLen = Record<string, number>;

export type IntlPhoneInputProps = Partial<Omit<InputAutocompleteProps, 'onChange'>> &
    Pick<SelectProps, 'preventFlip'> & {
        /**
         * Значение
         */
        value: string;

        /**
         * Набор цветов для компонента
         */
        colors?: 'default' | 'inverted';

        /**
         * Обработчик события изменения значения
         */
        onChange: (value: string) => void;

        /**
         * Дефолтный код страны
         */
        defaultCountryIso2?: string;

        /**
         * Обработчик события изменения страны
         */
        onCountryChange?: (countryCode: CountryCode) => void;

        /**
         * Список стран
         */
        countries?: Country[];

        /**
         * Возможность стереть код страны
         */
        clearableCountryCode?: boolean;

        /**
         * Ограничение длин вводимых номеров по странам.
         */
        maxPhoneLen?: MaxPhoneLen;
    };

export const IntlPhoneInput = forwardRef<HTMLInputElement, IntlPhoneInputProps>(
    (
        {
            disabled = false,
            readOnly = false,
            size = 'm',
            colors = 'default',
            options = [],
            countries = getCountries(),
            clearableCountryCode = true,
            className,
            value,
            onChange,
            onCountryChange,
            defaultCountryIso2 = 'ru',
            preventFlip,
            inputProps,
            maxPhoneLen = DEFAULT_MAX_PHONE_LEN,
            ...restProps
        },
        ref,
    ) => {
        const [countryIso2, setCountryIso2] = useState(defaultCountryIso2.toLowerCase());

        const inputRef = useRef<HTMLInputElement>(null);
        const [inputWrapperRef, setInputWrapperRef] = useState<HTMLDivElement | null>(null);

        const [caretPos, setCaretPos] = useState<number>();

        const phoneLibUtils = useRef<typeof AsYouType>();

        const formatPhone = (inputValue: string) => {
            let newValue = inputValue;

            if (phoneLibUtils.current) {
                const Utils = phoneLibUtils.current;
                const utils = new Utils(countryIso2.toUpperCase() as CountryCode);

                newValue = utils.input(inputValue);
            }

            return newValue;
        };

        const setCountryByIso2 = (iso2: string) => {
            const country = countriesHash[iso2];

            const inputValue = `+${country.dialCode}`;

            onChange(inputValue);
            setCountryIso2(country.iso2);

            return country;
        };

        const handleCountryChange = (countryCode: string) => {
            if (onCountryChange) {
                onCountryChange(countryCode.toUpperCase() as CountryCode);
            }
        };

        const setCountryByDialCode = (inputValue: string) => {
            for (let i = 0; i < countries.length; i++) {
                const country = countries[i];

                if (new RegExp(`^\\+${country.dialCode}`).test(inputValue)) {
                    // Сначала проверяем, если приоритет не указан
                    if (country.priority === undefined) {
                        onChange(formatPhone(inputValue));
                        setCountryIso2(country.iso2);
                        handleCountryChange(country.iso2);

                        break;
                    }

                    // Если страна уже была выставлена через селект, и коды совпадают
                    if (countryIso2 === country.iso2) {
                        onChange(formatPhone(inputValue));
                        setCountryIso2(country.iso2);
                        handleCountryChange(country.iso2);

                        break;
                        // Если не совпадают - выбираем по приоритету
                    } else if (country.priority === 0) {
                        onChange(formatPhone(inputValue));
                        setCountryIso2(country.iso2);
                        handleCountryChange(country.iso2);

                        break;
                    }
                }
            }
        };

        const setCountryByDialCodeWithLengthCheck = (inputValue: string) => {
            if (value.length < MAX_DIAL_CODE_LENGTH) {
                setCountryByDialCode(inputValue);
            }
        };

        const addCountryCode = (inputValue: string) => {
            const country = countriesHash[countryIso2];

            if (clearableCountryCode) {
                return inputValue.length === 1 && inputValue !== '+'
                    ? `+${inputValue}`
                    : inputValue;
            }
            return formatPhoneWithUnclearableCountryCode(inputValue, country);
        };

        const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
            setCountryByDialCodeWithLengthCheck(event.target.value);
            onChange(formatPhone(addCountryCode(event.target.value)));
        };

        const handleSelectChange: Required<SelectProps>['onChange'] = ({ selected }) => {
            if (selected) {
                const country = setCountryByIso2(selected.value);
                const inputValue = `+${country.dialCode}`;

                if (inputRef.current) {
                    inputRef.current.focus();
                    inputRef.current.setSelectionRange(inputValue.length, inputValue.length);
                }

                handleCountryChange(country.iso2);
            }
        };

        const handleChange = (payload: {
            selected: OptionShape | null;
            selectedMultiple: OptionShape[];
            name?: string;
        }) => {
            const { selected } = payload;
            if (!selected) return;
            setCountryByDialCodeWithLengthCheck(selected.key);
            onChange(formatPhone(selected.key));
        };

        const country = countriesHash[countryIso2];
        const countryCodeLength = `+${country.dialCode}`.length;

        const handleInputNewChar = (
            event: React.KeyboardEvent<HTMLInputElement>,
            caretPosition: number,
        ) => {
            const input = event.target as HTMLInputElement;
            const currentValue = input.value;
            const maxLen = maxPhoneLen?.[countryIso2.toUpperCase()];
            // Если задана длина номера и номер полностью заполнен, то перезатираем цифры, если каретка не в самом конце.
            const shouldReplace = !!maxLen && maxLen === currentValue.replace(/\D/g, '').length;

            let endPhonePart = currentValue.slice(caretPosition);

            if (shouldReplace) {
                let cursor = 0;

                while (MASK_SYMBOLS.includes(endPhonePart.charAt(cursor))) {
                    cursor += 1;
                }

                endPhonePart = endPhonePart.slice(cursor + 1);
            }

            let newValue = currentValue.slice(0, caretPosition) + event.key + endPhonePart;

            // Запрещаем ввод, если указана длина номера и номер уже заполнен.
            if (maxLen && newValue.replace(/\D/g, '').length > maxLen) {
                newValue = newValue.slice(0, -1);
            }

            newValue = formatPhone(addCountryCode(newValue));

            let newCaretPosition;
            const isFormatJumps = !shouldReplace && newValue.length - currentValue.length <= 0;

            // Ситуация, когда происходят скачки номера из-за форматирования, например +7 999 999 99 99 -> +799999999999
            if (isFormatJumps) {
                let phonePart = currentValue.slice(0, caretPosition) + event.key;
                let cursor = 0;

                while (cursor < phonePart.length && cursor <= newValue.length) {
                    const currChar = phonePart.charAt(cursor);
                    const newValChar = newValue.charAt(cursor);

                    if (currChar !== newValChar) {
                        if (MASK_SYMBOLS.includes(currChar)) {
                            phonePart = phonePart.slice(0, cursor) + phonePart.slice(cursor + 1);
                            // eslint-disable-next-line no-continue
                            continue;
                        } else {
                            phonePart =
                                phonePart.slice(0, cursor) + newValChar + phonePart.slice(cursor);
                        }
                    }
                    cursor += 1;
                }

                newCaretPosition = cursor;
            } else {
                let cursor = 0;

                while (
                    newValue.charAt(caretPosition + cursor) &&
                    newValue.charAt(caretPosition + cursor) !== event.key
                ) {
                    cursor += 1;
                }

                cursor += 1;

                newCaretPosition = caretPosition + cursor;
            }

            setCaretPos(newCaretPosition);
            setCountryByDialCodeWithLengthCheck(newValue);
            onChange(newValue);
        };

        const handleDeleteChar = (
            event: React.KeyboardEvent<HTMLInputElement>,
            caretPosition: number,
        ) => {
            const input = event.target as HTMLInputElement;

            if (!clearableCountryCode && caretPosition <= countryCodeLength) return;

            const currentValue = input.value;
            let deletedCharsCount = 1;

            // Высчитываем новое положение каретки с учетом символов маски.
            while (
                caretPosition - deletedCharsCount > 0 &&
                MASK_SYMBOLS.includes(currentValue.charAt(caretPosition - deletedCharsCount))
            ) {
                deletedCharsCount += 1;
            }

            let newCaretPosition = caretPosition - deletedCharsCount;

            const newValue = formatPhone(
                addCountryCode(
                    currentValue.slice(0, newCaretPosition) + currentValue.slice(caretPosition),
                ),
            );

            const isFormatJumps = newValue.length - currentValue.length >= 0;
            // Обрабатываем ситуацию, когда происходят скачки номера из-за форматирования, например +799999999999 => +7 999 999 99 99
            if (isFormatJumps) {
                let phonePart = currentValue.slice(0, newCaretPosition);
                let cursor = 0;

                while (cursor < phonePart.length) {
                    const currChar = newValue.charAt(cursor);

                    if (currChar !== phonePart.charAt(cursor)) {
                        phonePart = phonePart.slice(0, cursor) + currChar + phonePart.slice(cursor);
                    }
                    cursor += 1;
                }

                newCaretPosition = cursor;
            }

            setCaretPos(newCaretPosition);
            setCountryByDialCodeWithLengthCheck(newValue);
            onChange(newValue);
        };

        const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
            const input = event.target as HTMLInputElement;
            const caretPosition = input.selectionStart;

            if (!caretPosition) {
                return;
            }

            if (event.key === 'Backspace') {
                event.preventDefault();

                handleDeleteChar(event, caretPosition);
            }

            if (event.key.length === 1 && /[0-9+]/.test(event.key)) {
                event.preventDefault();

                handleInputNewChar(event, caretPosition);
            }
        };

        useEffect(() => {
            if (inputRef.current && caretPos !== undefined) {
                inputRef.current.setSelectionRange(caretPos, caretPos);
                setCaretPos(undefined);
            }
        }, [caretPos]);

        useEffect(() => {
            if (phoneLibUtils.current) return;

            import(
                /* webpackChunkName: "libphonenumber" */ 'libphonenumber-js/bundle/libphonenumber-js.min'
            )
                .then(utils => {
                    phoneLibUtils.current = utils.AsYouType;

                    setCountryByDialCode(value);
                })
                .catch(error => `An error occurred while loading libphonenumber-js:\n${error}`);

            /* eslint-disable-next-line react-hooks/exhaustive-deps */
        }, [value]);

        useCaretAvoidCountryCode({ inputRef, countryCodeLength, clearableCountryCode });

        return (
            <InputAutocomplete
                {...restProps}
                ref={ref}
                inputProps={{
                    ...inputProps,
                    ref: inputRef,
                    wrapperRef: setInputWrapperRef,
                    type: 'tel',
                    colors,
                    className: cn(className, styles[size]),
                    addonsClassName: styles.addons,
                    onKeyDown: handleKeyDown,
                    leftAddons: countries.length > 1 && (
                        <CountriesSelect
                            dataTestId='countries-select'
                            disabled={disabled || readOnly}
                            size={size}
                            selected={countryIso2}
                            countries={countries}
                            onChange={handleSelectChange}
                            fieldWidth={
                                inputWrapperRef && inputWrapperRef.getBoundingClientRect().width
                            }
                            preventFlip={preventFlip}
                        />
                    ),
                }}
                optionsListWidth='field'
                closeOnSelect={true}
                onInput={handleInputChange}
                onChange={handleChange}
                options={options}
                disabled={disabled}
                readOnly={readOnly}
                size={size}
                className={className}
                value={value}
            />
        );
    },
);

IntlPhoneInput.defaultProps = {
    size: 'm',
    defaultCountryIso2: 'ru',
};

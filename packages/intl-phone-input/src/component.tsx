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
import { calculateCaretPos } from './utils/calculateCaretPos';
import { useCaretAvoidCountryCode } from './useCaretAvoidCountryCode';

import styles from './index.module.css';

const countriesHash = getCountriesHash();

const MAX_DIAL_CODE_LENGTH = 4;

const MASK_SYMBOLS = [' ', '-', '(', ')'];

const MAX_PHONE_LEN = 15;

const DEFAULT_MAX_PHONE_LEN_BY_COUNTRY: MaxPhoneLenByCountry = { RU: 11 };

type MaxPhoneLenByCountry = Record<string, number>;

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
        maxPhoneLen?: MaxPhoneLenByCountry;
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
            maxPhoneLen = DEFAULT_MAX_PHONE_LEN_BY_COUNTRY,
            ...restProps
        },
        ref,
    ) => {
        const [countryIso2, setCountryIso2] = useState(defaultCountryIso2.toLowerCase());
        const [fieldWidth, setFieldWidth] = useState(0);

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
            const maxPhoneLength = maxPhoneLen?.[countryIso2.toUpperCase()] || MAX_PHONE_LEN;
            // Если номер полностью заполнен, то перезатираем цифры, если каретка не в самом конце.
            const shouldReplace = maxPhoneLength === currentValue.replace(/\D/g, '').length;

            let endPhonePart = currentValue.slice(caretPosition);

            if (shouldReplace) {
                let cursor = 0;

                while (MASK_SYMBOLS.includes(endPhonePart.charAt(cursor))) {
                    cursor += 1;
                }

                endPhonePart = endPhonePart.slice(cursor + 1);
            }

            let newValue = currentValue.slice(0, caretPosition) + event.key + endPhonePart;

            // Запрещаем ввод, если номер уже заполнен.
            if (newValue.replace(/\D/g, '').length > maxPhoneLength) {
                newValue = newValue.slice(0, -1);
            }

            newValue = formatPhone(addCountryCode(newValue));

            let phonePartWithoutMask =
                currentValue.slice(0, caretPosition).replace(/\D/g, '') + event.key;

            if (shouldReplace && phonePartWithoutMask.length > maxPhoneLength) {
                phonePartWithoutMask = phonePartWithoutMask.slice(0, -1);
            }

            setCaretPos(calculateCaretPos(phonePartWithoutMask, newValue));
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

            const isMaskSymbol = (count: number) => {
                const isMask = MASK_SYMBOLS.includes(currentValue.charAt(caretPosition - count));
                const isPossibleToRemove = clearableCountryCode
                    ? caretPosition - count > 0
                    : caretPosition - count > countryCodeLength;

                return isMask && isPossibleToRemove;
            };

            let deletedCharsCount = 1;

            // Высчитываем кол-во символов, которые нужно удалить.
            while (isMaskSymbol(deletedCharsCount)) {
                deletedCharsCount += 1;
            }

            const phonePart = currentValue.slice(0, caretPosition - deletedCharsCount);
            const newValue = formatPhone(
                addCountryCode(phonePart + currentValue.slice(caretPosition)),
            );

            const phonePartWithoutMask = phonePart.replace(/[^0-9+]+/g, '');

            setCaretPos(calculateCaretPos(phonePartWithoutMask, newValue));
            setCountryByDialCodeWithLengthCheck(newValue);
            onChange(newValue);
        };

        const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
            const input = event.target as HTMLInputElement;
            const caretPosition = input.selectionStart || 0;

            // Нажат только Backspace, не сочетание клавиш с ним.
            if (!event.shiftKey && !event.ctrlKey && !event.metaKey && event.key === 'Backspace') {
                if (!caretPosition) return;

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

        useEffect(() => {
            if (inputWrapperRef) {
                setFieldWidth(inputWrapperRef.getBoundingClientRect().width);
            }
        }, [inputWrapperRef]);

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
                            fieldWidth={fieldWidth}
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

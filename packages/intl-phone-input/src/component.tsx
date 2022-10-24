import React, { ChangeEvent, forwardRef, useEffect, useRef, useState } from 'react';
import cn from 'classnames';
import { AsYouType, CountryCode } from 'libphonenumber-js';

import {
    InputAutocomplete,
    InputAutocompleteProps,
} from '@alfalab/core-components-input-autocomplete';
import { OptionShape, SelectProps } from '@alfalab/core-components-select';
import WorldMagnifierMIcon from '@alfalab/icons-glyph/WorldMagnifierMIcon';
import { Country, getCountries, getCountriesHash } from '@alfalab/utils';

import { calculateCaretPos } from './utils/calculateCaretPos';
import { formatPhoneWithUnclearableCountryCode } from './utils/format-phone-with-unclearable-country-code';
import { preparePasteData } from './utils/preparePasteData';
import { CountriesSelect, FlagIcon } from './components';
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
        onCountryChange?: (countryCode?: CountryCode) => void;

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

        /*
         * Отключает выбор страны через селект
         */
        hideCountrySelect?: boolean;

        /*
         * Разрешает состояние без выбранной страны
         */
        canBeEmptyCountry?: boolean;

        /*
         * Подставляет +7 при выбранной стране 'ru' и вводе первых цифр номера.
         * При canBeEmptyCountry - работает только с дефолтным значением 'ru'
         */
        ruNumberPriority?: boolean;

        /*
         * Разрешает очищать поле крестиком
         */
        clear?: boolean;
    };

export const IntlPhoneInput = forwardRef<HTMLInputElement, IntlPhoneInputProps>(
    (
        {
            disabled = false,
            readOnly = false,
            hideCountrySelect = false,
            canBeEmptyCountry = false,
            ruNumberPriority = false,
            clear = false,
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
        const [countryIso2, setCountryIso2] = useState<string | undefined>(
            defaultCountryIso2.toLowerCase(),
        );

        const inputRef = useRef<HTMLInputElement>(null);
        const [inputWrapperRef, setInputWrapperRef] = useState<HTMLDivElement | null>(null);

        const [caretPos, setCaretPos] = useState<number>();

        const phoneLibUtils = useRef<typeof AsYouType>();

        const formatPhone = (inputValue: string) => {
            let newValue = inputValue;

            if (phoneLibUtils.current) {
                const Utils = phoneLibUtils.current;
                const utils = new Utils(
                    countryIso2 ? (countryIso2.toUpperCase() as CountryCode) : undefined,
                );

                newValue = utils.input(inputValue);
            }

            if (countryIso2 === 'ru') {
                const parts = newValue.split(' ');

                newValue = parts.reduce((acc, part, index) => {
                    if (index === 0) {
                        return part;
                    }
                    if (index > 2) {
                        return `${acc}-${part}`;
                    }

                    return `${acc} ${part}`;
                }, '');
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

        const handleCountryChange = (countryCode?: string) => {
            if (onCountryChange) {
                onCountryChange(
                    countryCode ? (countryCode.toUpperCase() as CountryCode) : undefined,
                );
            }
        };

        const getCountryByNumber = (inputValue: string) => {
            // dialcode казахстанских номеров совпадает с российскими, поэтому проверяем отдельно
            if (new RegExp('^\\+7(\\s)?7').test(inputValue)) {
                const kzCoutry = countries.find((item) => item.iso2 === 'kz');

                if (kzCoutry) {
                    return kzCoutry;
                }
            }

            const targetCountry = countries.find((country) => {
                if (new RegExp(`^\\+${country.dialCode}`).test(inputValue)) {
                    // Сначала проверяем, если приоритет не указан
                    if (country.priority === undefined) {
                        return true;
                    }

                    // Если страна уже была выставлена через селект, и коды совпадают
                    if (countryIso2 === country.iso2 && countryIso2 !== 'kz') {
                        return true;
                    }

                    // Если не совпадают - выбираем по приоритету
                    if (country.priority === 0) {
                        return true;
                    }

                    return false;
                }

                return false;
            });

            return targetCountry;
        };

        const setCountryByDialCode = (inputValue: string) => {
            const country = getCountryByNumber(inputValue);

            onChange(formatPhone(inputValue));
            if (country) {
                setCountryIso2(country.iso2);
                handleCountryChange(country.iso2);
            } else if (canBeEmptyCountry) {
                setCountryIso2(undefined);
                handleCountryChange(undefined);
            }
        };

        const setCountryByDialCodeWithLengthCheck = (inputValue: string) => {
            if (inputRef.current) {
                const { selectionStart } = inputRef.current;

                if ((selectionStart || 0) <= MAX_DIAL_CODE_LENGTH) {
                    setCountryByDialCode(inputValue);
                }
            }
        };

        const addCountryCode = (inputValue: string) => {
            if (clearableCountryCode || !countryIso2) {
                return inputValue.length === 1 && inputValue !== '+'
                    ? `+${inputValue}`
                    : inputValue;
            }
            const country = countriesHash[countryIso2];

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

        const country = countryIso2 && countriesHash[countryIso2];
        const countryCodeLength = country ? `+${country.dialCode}`.length : 0;
        const isEmptyValue = clearableCountryCode
            ? value === '' || value === '+'
            : value.length <= countryCodeLength;

        const handleInputNewChar = (
            event: React.KeyboardEvent<HTMLInputElement>,
            caretPosition: number,
        ) => {
            const input = event.target as HTMLInputElement;
            const currentValue = input.value;
            const maxPhoneLength =
                (countryIso2 && maxPhoneLen?.[countryIso2.toUpperCase()]) || MAX_PHONE_LEN;
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

            const newValueDecimal = newValue.replace(/\D/g, '');

            // Запрещаем ввод, если номер уже заполнен.
            if (newValueDecimal.length > maxPhoneLength) {
                newValue = newValue.slice(0, -1);
            }

            if (ruNumberPriority && !value && countryIso2 === 'ru') {
                if (newValue === '7' || newValue === '8') {
                    newValue = '+7';
                } else if (newValueDecimal.length === 1) {
                    newValue = `+7${newValueDecimal}`;
                }
            }

            newValue = formatPhone(addCountryCode(newValue));

            let phonePartWithoutMask =
                currentValue.slice(0, caretPosition).replace(/\D/g, '') + event.key;

            if (shouldReplace && phonePartWithoutMask.length > maxPhoneLength) {
                phonePartWithoutMask = phonePartWithoutMask.slice(0, -1);
            }

            if (newValue && newValue[0] !== '+') {
                newValue = `+${newValue}`;
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

        const handleClear = () => {
            if (clearableCountryCode) {
                onChange('+');
                if (canBeEmptyCountry) {
                    setCountryIso2(undefined);
                    handleCountryChange(undefined);
                }
            } else {
                onChange(value.substring(0, countryCodeLength));
            }
        };

        const handlePaste: React.ClipboardEventHandler<HTMLInputElement> = (event) => {
            event.preventDefault();
            const text = event.clipboardData?.getData('Text');

            if (!text || !inputRef.current) {
                return;
            }

            const { selectionStart, selectionEnd } = inputRef.current;
            const preparedNumber = preparePasteData(
                value,
                text,
                selectionStart || 0,
                selectionEnd || 0,
            );
            const targetCountry = getCountryByNumber(preparedNumber);
            const maxPhoneLength =
                (targetCountry && maxPhoneLen?.[targetCountry.iso2.toUpperCase()]) || MAX_PHONE_LEN;
            const resultNumber = preparedNumber.substring(0, maxPhoneLength + 1);

            if (resultNumber) {
                setCountryIso2(targetCountry ? targetCountry.iso2 : undefined);
                onChange(formatPhone(addCountryCode(resultNumber)));
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
                .then((utils) => {
                    phoneLibUtils.current = utils.AsYouType;

                    if (canBeEmptyCountry) {
                        onChange(formatPhone(value));
                    } else {
                        setCountryByDialCode(value);
                    }
                })
                .catch((error) => `An error occurred while loading libphonenumber-js:\n${error}`);

            /* eslint-disable-next-line react-hooks/exhaustive-deps */
        }, [value]);

        useCaretAvoidCountryCode({ inputRef, countryCodeLength, clearableCountryCode });

        return (
            <InputAutocomplete
                {...restProps}
                ref={ref}
                inputProps={{
                    clear: clear && !isEmptyValue,
                    onClear: handleClear,
                    ...inputProps,
                    ref: inputRef,
                    wrapperRef: setInputWrapperRef,
                    type: 'tel',
                    colors,
                    className: cn(className, styles[size]),
                    addonsClassName: styles.addons,
                    onKeyDown: handleKeyDown,
                    onPaste: handlePaste,
                    leftAddons: hideCountrySelect ? (
                        <span className={styles.flagIconWrapper}>
                            {countryIso2 ? (
                                <FlagIcon country={countryIso2} />
                            ) : (
                                <WorldMagnifierMIcon className={styles.emptyCountryIcon} />
                            )}
                        </span>
                    ) : (
                        countries.length > 1 && (
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
                        )
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

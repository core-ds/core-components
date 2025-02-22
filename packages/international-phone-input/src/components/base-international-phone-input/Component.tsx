import React, {
    ChangeEvent,
    forwardRef,
    MouseEvent,
    useEffect,
    useMemo,
    useRef,
    useState,
} from 'react';
import mergeRefs from 'react-merge-refs';
import { maskitoTransform } from '@maskito/core';
import { useMaskito } from '@maskito/react';

import type { InputAutocompleteProps } from '@alfalab/core-components-input-autocomplete';
import { AnyObject, BaseOption } from '@alfalab/core-components-select/shared';
import type { BaseSelectChangePayload } from '@alfalab/core-components-select/typings';
import { isNullable, useElementWidth } from '@alfalab/core-components-shared';

import type { BaseInternationalPhoneInputProps, Country } from '../../types';
import {
    createMaskOptions,
    filterPhones,
    findCountry,
    getClear,
    getInitialValueFromCountry,
    getPhoneData,
    initCountries,
} from '../../utils';
import { CountrySelect } from '../country-select';

import styles from './index.module.css';

export const BaseInternationalPhoneInput = forwardRef<
    HTMLInputElement,
    BaseInternationalPhoneInputProps
>(
    (
        {
            clearableCountryCode: clearableCountryCodeFromProps = true,
            value,
            country: countryProp,
            filterFn,
            onChange,
            onCountryChange,
            countrySelectProps,
            countries,
            defaultIso2,
            disabled,
            options,
            size = 56,
            Input,
            InputAutocomplete,
            SelectComponent,
            view,
            clear: clearProp,
            open: openProps,
            defaultOpen,
            customCountriesList,
            ...restProps
        },
        ref,
    ) => {
        const lastCountryRef = useRef<Country | null>(null);
        const countriesData = useMemo(
            () => initCountries(countries, customCountriesList),
            [countries, customCountriesList],
        );
        const inputRef = useRef<HTMLInputElement>(null);
        const [inputWrapperWidth, inputWrapperRef] = useElementWidth<HTMLDivElement>();
        const [open, setOpen] = useState<boolean | undefined>(defaultOpen);
        const [openCountry, setOpenCountry] = useState<boolean | undefined>(
            countrySelectProps?.defaultOpen,
        );
        const [selectedCountry, setSelectedCountry] = useState<Country | undefined>(() =>
            findCountry(countriesData, value, defaultIso2, countryProp),
        );
        const filteredOptions = filterPhones(value, options, filterFn);
        const country = countryProp ?? selectedCountry;

        const handleCountryChange = (nextCountry?: Country) => {
            if (countryProp === undefined) setSelectedCountry(nextCountry);
            onCountryChange?.(nextCountry);
        };

        const preserveCountryCode = clearableCountryCodeFromProps === 'preserve';
        const clearableCountryCode = preserveCountryCode || clearableCountryCodeFromProps;
        const maskOptions = useMemo(
            () =>
                createMaskOptions(
                    country,
                    clearableCountryCode,
                    preserveCountryCode,
                    lastCountryRef,
                ),
            [country, clearableCountryCode, preserveCountryCode],
        );

        const maskRef = useMaskito({ options: maskOptions });

        const changeNumber = (phone: string) => {
            onChange?.(phone);
        };

        const updatePhoneData = (phone: string) => {
            const { nextCountry, nextPhone } = getPhoneData(phone, countriesData, defaultIso2);

            if (nextCountry !== country) {
                handleCountryChange?.(nextCountry);
            }
            changeNumber(nextPhone);
        };

        const handleSelectCountry = ({ selected }: BaseSelectChangePayload) => {
            const nextCountry = selected?.value as Country;

            handleCountryChange?.(nextCountry);

            if (nextCountry) {
                changeNumber(getInitialValueFromCountry(nextCountry.countryCode));
            }

            requestAnimationFrame(() => inputRef.current?.focus());
        };

        const handleOptionSelect = (payload: BaseSelectChangePayload | string) => {
            updatePhoneData(
                maskitoTransform(
                    typeof payload === 'string' ? payload : payload.selected?.key || '',
                    maskOptions,
                ),
            );
        };

        const handleInput = ({ target: { value: inputValue } }: ChangeEvent<HTMLInputElement>) => {
            updatePhoneData(inputValue);
        };

        const handleClear = (event: MouseEvent<HTMLButtonElement>) => {
            restProps.inputProps?.onClear?.(event);

            if (clearableCountryCode) {
                const nextCountry = findCountry(countriesData, '', defaultIso2, countryProp);

                changeNumber('');
                handleCountryChange(nextCountry);
            } else {
                changeNumber(country ? getInitialValueFromCountry(country.countryCode) : '');
            }
        };

        useEffect(() => {
            if (value) {
                const newValue = maskitoTransform(value, maskOptions);

                if (value !== newValue) {
                    updatePhoneData(newValue);
                }
            }
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [value, maskOptions]);

        const openPhoneSelect: InputAutocompleteProps['onOpen'] = (payload) => {
            if (openProps === undefined) setOpen(payload.open);
            restProps.onOpen?.(payload);
        };

        const openCountrySelect: InputAutocompleteProps['onOpen'] = (payload) => {
            if (countrySelectProps?.open === undefined) setOpenCountry(payload.open);
            countrySelectProps?.onOpen?.(payload);
        };

        const handlePhoneSelectOpen: InputAutocompleteProps['onOpen'] = (payload) => {
            if (payload.open) {
                openCountrySelect({ open: false });
            }

            openPhoneSelect(payload);
        };

        const handleCountrySelectOpen: InputAutocompleteProps['onOpen'] = (payload) => {
            if (payload.open) {
                openPhoneSelect({ open: false });
            }
            openCountrySelect(payload);
        };

        const showPhoneSelect = Boolean(open || openProps);
        const showCountrySelect = Boolean(openCountry || countrySelectProps?.open);

        const renderCountrySelect = (compact = false) => (
            <CountrySelect
                dataTestId={restProps?.dataTestId}
                {...countrySelectProps}
                view={view}
                SelectComponent={SelectComponent}
                disabled={disabled || countrySelectProps?.disabled}
                onChange={handleSelectCountry}
                country={country}
                countries={compact ? [] : countriesData}
                fieldWidth={inputWrapperWidth}
                onOpen={handleCountrySelectOpen}
                open={showCountrySelect}
            />
        );

        const inputProps = {
            className: styles.component,
            ref: mergeRefs([maskRef, ref, inputRef]),
            wrapperRef: inputWrapperRef,
            addonsClassName: styles.addons,
            type: 'tel',
            clear: getClear(clearProp, clearableCountryCode, value, country?.countryCode),
            ...restProps.inputProps,
        } as const;

        useEffect(() => {
            if (!preserveCountryCode || isNullable(country)) {
                return;
            }

            lastCountryRef.current = country;
        }, [country, preserveCountryCode]);

        return Array.isArray(options) ? (
            <InputAutocomplete
                closeOnSelect={true}
                Option={BaseOption}
                size={size}
                {...(restProps as InputAutocompleteProps)}
                disabled={disabled}
                options={filteredOptions}
                value={value}
                open={showPhoneSelect}
                onOpen={handlePhoneSelectOpen}
                onChange={handleOptionSelect}
                onInput={(phone) => updatePhoneData(phone)}
                inputProps={{
                    ...inputProps,
                    onClear: handleClear,
                    onInput: handleInput,
                    leftAddons: renderCountrySelect(view === 'mobile'),
                }}
                fieldProps={{
                    ...(restProps.fieldProps as AnyObject),
                    className: inputProps.className,
                    addonsClassName: inputProps.addonsClassName,
                    ...(view === 'mobile' ? { leftAddons: renderCountrySelect() } : null),
                }}
            />
        ) : (
            <Input
                {...restProps}
                {...inputProps}
                onClear={inputProps.clear ? handleClear : undefined}
                leftAddons={renderCountrySelect()}
                size={size}
                onInput={handleInput}
                value={value}
                disabled={disabled}
            />
        );
    },
);

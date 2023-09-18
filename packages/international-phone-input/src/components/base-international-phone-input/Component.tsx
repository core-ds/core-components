import React, { ChangeEvent, forwardRef, useEffect, useMemo, useRef } from 'react';
import mergeRefs from 'react-merge-refs';
import { maskitoTransform } from '@maskito/core';
import { useMaskito } from '@maskito/react';

import type { InputAutocompleteProps } from '@alfalab/core-components-input-autocomplete';
import { BaseOption } from '@alfalab/core-components-select/shared';
import type { BaseSelectChangePayload } from '@alfalab/core-components-select/typings';

import type { BaseInternationalPhoneInputProps, Country } from '../../types';
import { createMaskOptions, getPhoneData } from '../../utils';
import { CountrySelect } from '../country-select';

import styles from './index.module.css';

export const BaseInternationalPhoneInput = forwardRef<
    HTMLInputElement,
    BaseInternationalPhoneInputProps
>(
    (
        {
            clearableCountryCode,
            value,
            country,
            onChange,
            onCountryChange,
            countrySelectProps,
            countries,
            defaultIso2,
            disabled,
            options,
            size = 'm',
            Input,
            InputAutocomplete,
            SelectComponent,
            view,
            bottomSheetHeaderAddonsProps,
            countriesData,
            clear,
            ...restProps
        },
        ref,
    ) => {
        const inputRef = useRef<HTMLInputElement>(null);
        const inputWrapperRef = useRef<HTMLDivElement>(null);

        const maskOptions = useMemo(
            () => createMaskOptions(country, clearableCountryCode),
            [country, clearableCountryCode],
        );

        const maskRef = useMaskito({ options: maskOptions });

        const changeNumber = (e: ChangeEvent<HTMLInputElement> | null, phone: string) => {
            onChange?.(e, { value: phone });
        };

        const updatePhoneData = (phone: string, e: ChangeEvent<HTMLInputElement> | null) => {
            const { nextCountry, nextPhone } = getPhoneData(phone, countriesData, defaultIso2);

            if (nextCountry !== country) {
                onCountryChange?.(nextCountry);
            }
            changeNumber(e, nextPhone);
        };

        const handleSelectCountry = ({ selected }: BaseSelectChangePayload) => {
            const nextCountry = selected?.value as Country;

            onCountryChange?.(nextCountry);

            if (nextCountry) {
                changeNumber(null, `+${nextCountry.dialCode}`);
            }

            requestAnimationFrame(() => inputRef.current?.focus());
        };

        const handleOptionSelect = (payload: BaseSelectChangePayload | string) => {
            updatePhoneData(
                maskitoTransform(
                    typeof payload === 'string' ? payload : payload.selected?.key || '',
                    maskOptions,
                ),
                null,
            );
        };

        const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
            updatePhoneData(e.target.value, e);
        };

        const handleClear = () => {
            if (clearableCountryCode) {
                changeNumber(null, '');
            } else {
                changeNumber(null, `+${country?.countryCode}` || '');
            }
        };

        useEffect(() => {
            if (value) {
                const newValue = maskitoTransform(value, maskOptions);

                if (value !== newValue) {
                    updatePhoneData(newValue, null);
                }
            }
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [value, maskOptions]);

        const inputProps = {
            className: styles.component,
            ref: mergeRefs([maskRef, ref, inputRef]),
            wrapperRef: inputWrapperRef,
            addonsClassName: styles.addons,
            type: 'tel',
        } as const;

        const renderCountrySelect = () => (
            <CountrySelect
                {...countrySelectProps}
                view={view}
                SelectComponent={SelectComponent}
                disabled={disabled || countrySelectProps?.disabled}
                onChange={handleSelectCountry}
                country={country}
                countries={countriesData}
                fieldWidth={inputWrapperRef.current?.getBoundingClientRect().width}
            />
        );

        return Array.isArray(options) ? (
            <InputAutocomplete
                closeOnSelect={true}
                Option={BaseOption}
                size={size}
                {...(restProps as InputAutocompleteProps)}
                disabled={disabled}
                options={options}
                value={value}
                onChange={handleOptionSelect}
                bottomSheetHeaderAddonsProps={{
                    ...bottomSheetHeaderAddonsProps,
                    ...inputProps,
                }}
                inputProps={{
                    ...inputProps,
                    clear,
                    onClear: handleClear,
                    leftAddons: renderCountrySelect(),
                    onInput: handleInput,
                }}
                fieldProps={{
                    className: inputProps.className,
                    addonsClassName: inputProps.addonsClassName,
                    leftAddons: renderCountrySelect(),
                }}
            />
        ) : (
            <Input
                {...restProps}
                {...inputProps}
                onClear={clear ? handleClear : undefined}
                clear={clear}
                leftAddons={renderCountrySelect()}
                size={size}
                onInput={handleInput}
                value={value}
                disabled={disabled}
            />
        );
    },
);

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
import loadable from '@loadable/component';
import {maskitoTransform} from '@maskito/core';
import {useMaskito} from '@maskito/react';

import type {InputAutocompleteProps} from '@alfalab/core-components-input-autocomplete';
import {AnyObject, BaseOption} from '@alfalab/core-components-select/shared';
import type {BaseSelectChangePayload} from '@alfalab/core-components-select/typings';

import {countriesDataExUssr, TCountriesData} from '../../data/country-data';
import type {BaseInternationalPhoneInputProps, Country} from '../../types';
import {
    createMaskOptions,
    filterPhones,
    findCountry,
    getClear,
    getPhoneData,
    initCountries,
} from '../../utils';
import {CountrySelect} from '../country-select';
import {flagSpriteExUssr} from '../flag-icon/flagSprite';

import styles from './index.module.css';

const loadWorldData = async () => {
    const { worldData } = await loadable(
        () => import(/* webpackChunkName: "international-phone-input.world-data" */ '../../utils/world-data'),
       {resolveComponent: m => m.worldData}
    ).load();

    return worldData
}

export const BaseInternationalPhoneInput = forwardRef<
    HTMLInputElement,
    BaseInternationalPhoneInputProps
>(
    (
        {
            clearableCountryCode,
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
            ...restProps
        },
        ref,
    ) => {
        const [countriesDataSet, setCountriesDataSet] = useState<TCountriesData[]>(
            [
                ...countriesDataExUssr,
                ['Ещё', null, 'more'] as TCountriesData
            ]
        );
        const [flagSprite, setFlagSprite] = useState(flagSpriteExUssr);
        const [dataType, setDataType] = useState<'exUssr' | 'world'>('exUssr');

        const countriesData = useMemo(() => initCountries(countriesDataSet, countries), [countries, countriesDataSet]);

        const inputRef = useRef<HTMLInputElement | null>(null);
        const inputWrapperRef = useRef<HTMLDivElement | null>(null);

        const [open, setOpen] = useState<boolean | undefined>(defaultOpen);
        const [openCountry, setOpenCountry] = useState<boolean | undefined>(
            countrySelectProps?.defaultOpen,
        );
        const [selectedCountry, setSelectedCountry] = useState<Country | undefined>(() =>
            findCountry(countriesData, value, defaultIso2, countryProp),
        );
        const filteredOptions = filterPhones(value, options, filterFn);
        const country = countryProp ?? selectedCountry;

        const handleCountryChange = async (nextCountry?: Country) => {
            if (dataType === 'exUssr' && nextCountry?.iso2 === 'more') {
                const worldData = await loadWorldData().catch(e => {
                    // eslint-disable-next-line no-console
                    console.error(e)
                });

                if (worldData?.flagSpriteWorld && worldData?.countriesDataWorld) {
                    setFlagSprite({...flagSpriteExUssr, ...worldData.flagSpriteWorld})
                    setCountriesDataSet([...countriesDataExUssr, ...worldData.countriesDataWorld].sort())
                    setDataType('world');
                }

                return
            }

            if (countryProp === undefined) setSelectedCountry(nextCountry);
            onCountryChange?.(nextCountry);
        };

        const maskOptions = useMemo(
            () => createMaskOptions(country, clearableCountryCode),
            [country, clearableCountryCode],
        );

        const maskRef = useMaskito({options: maskOptions});

        const changeNumber = (phone: string) => {
            onChange?.(phone);
        };

        const updatePhoneData = (phone: string) => {
            const {nextCountry, nextPhone} = getPhoneData(phone, countriesData, defaultIso2);

            if (nextCountry !== country) {
                handleCountryChange?.(nextCountry);
            }
            changeNumber(nextPhone);
        };

        const handleSelectCountry = ({selected}: BaseSelectChangePayload) => {
            const nextCountry = selected?.value as Country;

            handleCountryChange?.(nextCountry);

            if (nextCountry) {
                changeNumber(`+${nextCountry.dialCode}`);
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

        const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
            updatePhoneData(e.target.value);
        };

        const handleClear = (event: MouseEvent<HTMLButtonElement>) => {
            restProps.inputProps?.onClear?.(event);

            if (clearableCountryCode) {
                const nextCountry = findCountry(countriesData, '', defaultIso2, countryProp);

                changeNumber('');
                handleCountryChange(nextCountry);
            } else {
                changeNumber(`+${country?.countryCode}` || '');
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
                openCountrySelect({open: false});
            }

            openPhoneSelect(payload);
        };

        const handleCountrySelectOpen: InputAutocompleteProps['onOpen'] = (payload) => {
            if (payload.open) {
                openPhoneSelect({open: false});
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
                fieldWidth={inputWrapperRef.current?.getBoundingClientRect().width}
                flagSprite={flagSprite}
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
                    ...(view === 'mobile' ? {leftAddons: renderCountrySelect()} : null),
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

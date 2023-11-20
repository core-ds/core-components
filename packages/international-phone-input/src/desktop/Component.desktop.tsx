import React, { forwardRef, useMemo, useState } from 'react';

import { InputDesktop } from '@alfalab/core-components-input/desktop';
import { InputAutocompleteDesktop } from '@alfalab/core-components-input-autocomplete/desktop';
import { SelectDesktop } from '@alfalab/core-components-select/desktop';

import { BaseInternationalPhoneInput } from '../components/base-international-phone-input';
import type {
    BaseInternationalPhoneInputProps,
    Country,
    InternationalPhoneInputDesktopProps,
} from '../types';
import { filterPhones, findCountry, getClear, initCountries } from '../utils';

export const InternationalPhoneInputDesktop = forwardRef<
    HTMLInputElement,
    InternationalPhoneInputDesktopProps
>(
    (
        {
            options,
            country: countryProp,
            countries,
            onCountryChange,
            value,
            filterFn,
            defaultIso2,
            clear,
            clearableCountryCode = true,
            ...restProps
        },
        ref,
    ) => {
        const countriesData = useMemo(() => initCountries(countries), [countries]);
        const [selectedCountry, setSelectedCountry] = useState<Country | undefined>(() =>
            findCountry(countriesData, value, defaultIso2, countryProp),
        );
        const filteredOptions = filterPhones(value, options, filterFn);
        const country = countryProp ?? selectedCountry;

        const handleCountryChange = (nextCountry?: Country) => {
            if (countryProp === undefined) setSelectedCountry(nextCountry);
            onCountryChange?.(nextCountry);
        };

        return (
            <BaseInternationalPhoneInput
                countriesData={countriesData}
                selected={value}
                {...restProps}
                clear={getClear(clear, clearableCountryCode, value, country?.countryCode)}
                clearableCountryCode={clearableCountryCode}
                country={country}
                onCountryChange={handleCountryChange}
                defaultIso2={defaultIso2}
                value={value}
                view='desktop'
                options={filteredOptions}
                ref={ref}
                SelectComponent={SelectDesktop}
                Input={InputDesktop}
                InputAutocomplete={
                    InputAutocompleteDesktop as BaseInternationalPhoneInputProps['InputAutocomplete']
                }
            />
        );
    },
);

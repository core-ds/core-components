import React, { ChangeEvent, forwardRef, useMemo, useState } from 'react';

import { InputMobile } from '@alfalab/core-components-input/mobile';
import {
    InputAutocompleteMobile,
    InputAutocompleteMobileProps,
} from '@alfalab/core-components-input-autocomplete/mobile';
import { SelectMobile } from '@alfalab/core-components-select/mobile';

import { BaseInternationalPhoneInput } from '../components/base-international-phone-input';
import { CountrySelect } from '../components/country-select';
import type {
    BaseInternationalPhoneInputProps,
    Country,
    InternationalPhoneInputMobileProps,
} from '../types';
import { filterPhones, findCountry, getClear, getPhoneData, initCountries } from '../utils';

export const InternationalPhoneInputMobile = forwardRef<
    HTMLInputElement,
    InternationalPhoneInputMobileProps
>(
    (
        {
            options,
            country: countryProp,
            onCountryChange,
            value,
            filterFn,
            countries,
            defaultIso2,
            clear: clearProp,
            clearableCountryCode = true,
            ...restProps
        },
        ref,
    ) => {
        const typedRestProps = restProps as Partial<InputAutocompleteMobileProps>;
        const countriesData = useMemo(() => initCountries(countries), [countries]);
        const [filter, setFilter] = useState('');
        const [filterCountry, setFilterCountry] = useState<Country>();
        const [selectedCountry, setSelectedCountry] = useState<Country | undefined>(() =>
            findCountry(countriesData, value, defaultIso2, countryProp),
        );
        const filteredOptions = filterPhones(filter, options, filterFn);
        const country = countryProp ?? selectedCountry;
        const countryCode = country?.countryCode;

        const handleCountryChange = (nextCountry?: Country) => {
            if (countryProp === undefined) setSelectedCountry(nextCountry);
            onCountryChange?.(nextCountry);
        };

        const handleFilter = (event: ChangeEvent<HTMLInputElement>) => {
            const { nextPhone, nextCountry } = getPhoneData(
                event.target.value,
                countriesData,
                defaultIso2,
            );

            setFilter(nextPhone);
            setFilterCountry(nextCountry);
        };

        const handleFilterClear = () => {
            const withCountryCode = !clearableCountryCode && filterCountry?.countryCode;

            setFilter(withCountryCode ? `+${filterCountry.countryCode}` : '');
        };

        const handleEnter = (node: HTMLElement, isAppearing: boolean) => {
            typedRestProps.bottomSheetProps?.transitionProps?.onEnter?.(node, isAppearing);
            setFilterCountry(country);
            setFilter(countryCode ? `+${country.countryCode}` : '');
        };

        const isAutocomplete = Array.isArray(options);

        const props = isAutocomplete
            ? (() => {
                  const clear = getClear(clearProp, clearableCountryCode, filter, countryCode);

                  return {
                      filter,
                      onFilter: handleFilter,
                      onClearFilter: clear ? handleFilterClear : undefined,
                      bottomSheetHeaderAddonsProps: {
                          ...typedRestProps.bottomSheetHeaderAddonsProps,
                          leftAddons: (
                              <CountrySelect
                                  SelectComponent={SelectMobile}
                                  view='mobile'
                                  country={filterCountry}
                              />
                          ),
                      },
                      bottomSheetProps: {
                          ...typedRestProps.bottomSheetProps,
                          transitionProps: {
                              ...typedRestProps.bottomSheetProps?.transitionProps,
                              onEnter: handleEnter,
                          },
                      },
                  };
              })()
            : {
                  clear: getClear(clearProp, clearableCountryCode, value, countryCode),
              };

        return (
            <BaseInternationalPhoneInput
                selected={value}
                {...restProps}
                {...props}
                clearableCountryCode={clearableCountryCode}
                onCountryChange={handleCountryChange}
                country={country}
                defaultIso2={defaultIso2}
                countriesData={countriesData}
                value={value}
                options={filteredOptions}
                view='mobile'
                ref={ref}
                SelectComponent={SelectMobile}
                Input={InputMobile}
                InputAutocomplete={
                    InputAutocompleteMobile as BaseInternationalPhoneInputProps['InputAutocomplete']
                }
            />
        );
    },
);

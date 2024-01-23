import type { MaskitoOptions } from '@maskito/core';

import type { InputAutocompleteDesktopProps } from '@alfalab/core-components-input-autocomplete/desktop';
import { GroupShape, isGroup, OptionShape } from '@alfalab/core-components-select/shared';
import { getDataTestId, maskUtils } from '@alfalab/core-components-shared';

import { DEFAULT_PHONE_FORMAT } from '../consts';
import { countriesData } from '../data/country-data';
import type { AreaItem, Country } from '../types';

export function initCountries(iso2s?: string[]) {
    const filteredCountriesData = Array.isArray(iso2s)
        ? countriesData.filter((country) => iso2s.includes(country[2]))
        : countriesData;

    return filteredCountriesData.map((country) => {
        const countryItem: Country = {
            name: country[0],
            regions: country[1],
            iso2: country[2],
            countryCode: country[3],
            dialCode: country[3],
            format: country[4],
            priority: country[5] || 0,
        };

        const areaItems: AreaItem[] = [];

        if (country[6]) {
            country[6]?.forEach((areaCode) => {
                const areaItem: Partial<AreaItem> = { ...countryItem };

                areaItem.dialCode = country[3] + areaCode;
                areaItem.isAreaCode = true;
                areaItem.areaCodeLength = areaCode.length;

                areaItems.push(areaItem as AreaItem);
            });
        }

        if (areaItems.length > 0) {
            countryItem.mainCode = true;

            return [countryItem, ...areaItems];
        }

        return [countryItem];
    });
}

export function findCountry(
    countries: Country[][],
    value?: string,
    iso2?: string,
    country?: Country,
) {
    if (country) return country;

    if (value) {
        const inputNumber = clearMask(value);
        const nextCountry = guessCountry(inputNumber, countries);

        if (nextCountry) return nextCountry;
    }

    if (!iso2) return undefined;

    return countries.find((c) => c[0].iso2 === iso2)?.[0];
}

export function guessCountry(inputNumber: string, data: Country[][]) {
    const inputNumberDialCode = inputNumber.slice(0, 6);
    const result = data.reduce((selectedCountry, countryData) => {
        let guess;

        countryData.forEach((country) => {
            if (inputNumberDialCode.startsWith(country.dialCode)) {
                const selectedCountryDialCode = selectedCountry?.dialCode || '';
                const selectedCountryPriority = selectedCountry?.priority || 100;

                if (country.dialCode.length > selectedCountryDialCode.length) {
                    guess = country;
                }

                if (
                    country.dialCode.length === selectedCountryDialCode.length &&
                    country.priority < selectedCountryPriority
                ) {
                    guess = country;
                }
            }
        });

        return guess || selectedCountry;
    }, undefined as Country | undefined);

    if (!result && inputNumber.length > 5 && inputNumber.startsWith('8'))
        return data.find((countryData) => countryData[0].iso2 === 'ru')?.[0];

    return result;
}

export function clearMask(value: string) {
    return value.replace(/\D/g, '');
}

function itemToMask(item: string) {
    return item === '.' ? /\d/ : item;
}

function prepareDefaultFormat(countryCode?: string, clearableCountryCode?: boolean) {
    if (!countryCode) return ['+', ...DEFAULT_PHONE_FORMAT.split('').map(itemToMask)];

    const removeDots = (count: number) => {
        let removed = 0;
        let res = DEFAULT_PHONE_FORMAT;

        while (removed < count) {
            res = res.replace(/\./, '');
            removed += 1;
        }

        return res.trim();
    };

    if (clearableCountryCode) {
        return [
            '+',
            ...countryCode.split('').map(() => /\d/),
            ' ',
            ...removeDots(countryCode.length).split('').map(itemToMask).reverse(),
        ];
    }

    return [
        '+',
        ...countryCode.split(''),
        ' ',
        ...removeDots(countryCode.length).split('').map(itemToMask).reverse(),
    ];
}

export function createPhoneMaskExpression(
    country?: Country,
    clearableCountryCode?: boolean,
): Array<RegExp | string> {
    const { countryCode, format } = country || {};

    if (!countryCode || !format) {
        return prepareDefaultFormat(countryCode, clearableCountryCode);
    }

    return [
        '+',
        ...(clearableCountryCode ? countryCode.split('').map(() => /\d/) : countryCode.split('')),
        ' ',
        ...format.split('').map((item) => (item === '.' ? /\d/ : item)),
    ];
}

export function createMaskOptions(
    country?: Country,
    clearableCountryCode?: boolean,
): MaskitoOptions {
    const prefixLen =
        !clearableCountryCode && country?.countryCode ? country.countryCode.length + 1 : 0;

    const mask = createPhoneMaskExpression(country, clearableCountryCode);

    return {
        mask,
        preprocessors: [
            maskUtils.insertionPhonePreprocessor(mask, country?.countryCode, clearableCountryCode),
        ],
        postprocessors: [
            maskUtils.prefixPostprocessor(prefixLen ? `+${country?.countryCode}` : ''),
        ],
        plugins: [
            maskUtils.caretGuard((value, [from, to]) => [
                from === to ? prefixLen : 0,
                value.length,
            ]),
        ],
    };
}

function defaultFilterFn(value = '', option: OptionShape) {
    return clearMask(option.key).includes(clearMask(value));
}

const EMPTY_OPTIONS: OptionShape[] = [];

export const filterPhones = (
    value = '',
    options?: InputAutocompleteDesktopProps['options'],
    filterFn = defaultFilterFn,
) => {
    if (!options || options.length === 0) return EMPTY_OPTIONS;

    const filteredOptions: InputAutocompleteDesktopProps['options'] = [];

    options.forEach((option) => {
        if (isGroup(option)) {
            const group: GroupShape = {
                ...option,
                options: [],
            };

            option.options.forEach((groupOption) => {
                if (filterFn(value, groupOption)) group.options.push(groupOption);
            });

            if (group.options.length) filteredOptions.push(group);
        } else if (filterFn(value, option)) filteredOptions.push(option);
    });

    return filteredOptions;
};

export function getPhoneData(phone: string, countries: Country[][], defaultIso2?: string) {
    let nextPhone = phone;
    const inputNumber = clearMask(nextPhone);
    const nextCountry = findCountry(countries, phone, defaultIso2);

    if (nextCountry?.iso2 === 'ru' && inputNumber.length > 5 && inputNumber.startsWith('8')) {
        nextPhone = phone.replace(/\+?8/, '+7');
    }

    return {
        nextPhone,
        nextCountry,
    };
}

export function getClear(
    clear?: boolean,
    clearableCountryCode?: boolean,
    value = '',
    countryCode = '',
) {
    if (!clear) return false;

    const trimmedValue = value.trim();

    return clearableCountryCode
        ? trimmedValue !== '' && trimmedValue !== '+'
        : trimmedValue.length > countryCode.length + 1;
}

export function getInternationalPhoneInputDesktopTestIds(dataTestId: string) {
    return {
        fieldAutocompleteWrapper: dataTestId,
        fieldAutocompleteInner: `${dataTestId}-field-form-control-inner`,
        fieldAutocompleteFormControl: `${dataTestId}-field-form-control`,
        fieldAutocompleteLeftAddons: `${dataTestId}-field-form-control-left-addons`,
        fieldAutocompleteRightAddons: `${dataTestId}-field-form-control-right-addons`,
        fieldAutocompleteError: `${dataTestId}-field-form-control-error-message`,
        fieldAutocompleteHint: `${dataTestId}-field-form-control-hint`,
        option: getDataTestId(dataTestId, 'option'),
        optionsList: getDataTestId(dataTestId, 'options-list'),
        countryOption: getDataTestId(dataTestId, 'country-select-option'),
        countryOptionsList: getDataTestId(dataTestId, 'country-select-options-list'),
        field: dataTestId,
        fieldInner: getDataTestId(dataTestId, 'form-control-inner'),
        fieldFormControl: getDataTestId(dataTestId, 'form-control'),
        fieldLeftAddons: getDataTestId(dataTestId, 'form-control-left-addons'),
        fieldRightAddons: getDataTestId(dataTestId, 'form-control-right-addons'),
        fieldError: getDataTestId(dataTestId, 'form-control-error-message'),
        fieldHint: getDataTestId(dataTestId, 'form-control-hint'),
    };
}

export function getInternationalPhoneInputMobileTestIds(dataTestId: string) {
    return {
        fieldAutocompleteWrapper: dataTestId,
        fieldAutocompleteInner: getDataTestId(dataTestId, 'field-form-control-inner'),
        fieldAutocompleteFormControl: getDataTestId(dataTestId, 'field-form-control'),
        fieldAutocompleteLeftAddons: getDataTestId(dataTestId, 'field-form-control-left-addons'),
        fieldAutocompleteRightAddons: getDataTestId(dataTestId, 'field-form-control-right-addons'),
        fieldAutocompleteError: getDataTestId(dataTestId, 'field-form-control-error-message'),
        fieldAutocompleteHint: getDataTestId(dataTestId, 'field-form-control-hint'),
        option: getDataTestId(dataTestId, 'option'),
        optionsList: getDataTestId(dataTestId, 'options-list'),
        bottomSheet: getDataTestId(dataTestId, 'bottom-sheet'),
        bottomSheetHeader: getDataTestId(dataTestId, 'bottom-sheet-header'),
        bottomSheetContent: getDataTestId(dataTestId, 'bottom-sheet-content'),
        countryOption: getDataTestId(dataTestId, 'country-select-option'),
        countryOptionsList: getDataTestId(dataTestId, 'country-select-options-list'),
        countryBottomSheet: getDataTestId(dataTestId, 'country-select-bottom-sheet'),
        countryBottomSheetHeader: getDataTestId(dataTestId, 'country-select-bottom-sheet-header'),
        countryBottomSheetContent: getDataTestId(dataTestId, 'country-select-bottom-sheet-content'),
        clearButton: getDataTestId(dataTestId, 'clear'),
        applyButton: getDataTestId(dataTestId, 'apply'),
        field: dataTestId,
        fieldInner: getDataTestId(dataTestId, 'form-control-inner'),
        fieldFormControl: getDataTestId(dataTestId, 'form-control'),
        fieldLeftAddons: getDataTestId(dataTestId, 'form-control-left-addons'),
        fieldRightAddons: getDataTestId(dataTestId, 'form-control-right-addons'),
        fieldError: getDataTestId(dataTestId, 'form-control-error-message'),
        fieldHint: getDataTestId(dataTestId, 'form-control-hint'),
        searchInput: getDataTestId(dataTestId, 'search'),
        searchFormControl: getDataTestId(dataTestId, 'search-form-control'),
        searchInner: getDataTestId(dataTestId, 'search-form-control-inner'),
        searchLeftAddons: getDataTestId(dataTestId, 'search-form-control-left-addons'),
        searchRightAddons: getDataTestId(dataTestId, 'search-form-control-right-addons'),
        searchError: getDataTestId(dataTestId, 'search-form-control-error-message'),
        searchHint: getDataTestId(dataTestId, 'search-form-control-hint'),
    };
}

import { maskitoTransform } from '@maskito/core';

import { maskUtils } from '@alfalab/core-components-shared';

import {
    createPhoneMaskExpression,
    findCountry,
    getInitialValueFromCountry,
    initCountries,
} from './utils';

describe('maskito debug', () => {
    it('prints transforms with digit mask + prefix postprocessor', () => {
        const countries = initCountries();
        const country = findCountry(countries, '+7', 'ru');
        // Force clearable mask expression (digits) but keep non-clearable processors
        const mask = createPhoneMaskExpression(country, true);
        const prefix = getInitialValueFromCountry(country!.countryCode);
        const prefixLen = prefix.length;
        const options = {
            mask,
            preprocessors: [
                maskUtils.insertionPhonePreprocessor(mask, country!.countryCode, false),
            ],
            postprocessors: [maskUtils.prefixPostprocessor(prefix)],
            plugins: [
                maskUtils.caretGuard((value, [from, to]) => [
                    from === to ? prefixLen : 0,
                    value.length,
                ]),
            ],
        };

        // eslint-disable-next-line no-console
        console.log('mask', mask, 'prefix', prefix);

        for (const v of ['+7', '+7 ', '+', '', '+7 928 123 45 67', '7', '+7 928', '+78']) {
            // eslint-disable-next-line no-console
            console.log(JSON.stringify(v), '->', JSON.stringify(maskitoTransform(v, options)));
        }

        expect(maskitoTransform('+', options)).toBe('+7');
        expect(maskitoTransform('+7 928 123 45 67', options)).toBe('+7 928 123 45 67');
    });
});

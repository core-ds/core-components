import { getPureTokenValue } from './get-pure-token-value';
import bluetintColorVars from '@alfalab/core-components-vars/colors-bluetint-map';

describe('getPureTokenValue', () => {
    type Case = {
        color: string;
        expected?: string;
    };

    const cases: Case[] = [
        {
            color: '--color-dark-accent-primary',
            expected: bluetintColorVars['--color-dark-accent-primary'],
        },
        {
            color: '--color-light-bg-neutral',
            expected: bluetintColorVars['--color-light-bg-neutral'],
        },
    ];

    it.each(cases)('getPureTokenValue (%#)', ({ color, expected }) => {
        expect(getPureTokenValue({ token: color })).toBe(expected);
    });
});

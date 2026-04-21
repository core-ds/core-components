import { createPipsFormat } from './createPipsFormat';

describe('Unit/utils/function/createPipsFormat', () => {
    it.each([
        {
            description: 'all mode shows pips, custom dots and integer values',
            input: {
                customDots: [25, 50, 75],
                pipsValues: [10, 20, 30],
                pipsLabel: 'all' as const,
            },
            checks: [
                { value: 25, expected: 25 },
                { value: 10, expected: 10 },
                { value: 15, expected: 15 },
                { value: 15.5, expected: '' },
            ],
        },
        {
            description: 'pipsOnly mode shows only pips labels',
            input: {
                customDots: [25, 50, 75],
                pipsValues: [10, 20, 30],
                pipsLabel: 'pipsOnly' as const,
            },
            checks: [
                { value: 25, expected: '' },
                { value: 10, expected: 10 },
                { value: 15, expected: '' },
                { value: 15.5, expected: '' },
            ],
        },
        {
            description: 'customPipsOnly mode shows only custom dot labels',
            input: {
                customDots: [25, 50, 75],
                pipsValues: [10, 20, 30],
                pipsLabel: 'customPipsOnly' as const,
            },
            checks: [
                { value: 25, expected: 25 },
                { value: 10, expected: '' },
                { value: 15, expected: '' },
                { value: 15.5, expected: '' },
            ],
        },
        {
            description: 'none mode hides all labels',
            input: {
                customDots: [25, 50, 75],
                pipsValues: [10, 20, 30],
                pipsLabel: 'none' as const,
            },
            checks: [
                { value: 25, expected: '' },
                { value: 10, expected: '' },
                { value: 15, expected: '' },
            ],
        },
    ])('$description', ({ input, checks }) => {
        const format = createPipsFormat(input);

        checks.forEach(({ value, expected }) => {
            expect(format.to(value)).toBe(expected);
        });
    });

    it('handles corner numeric values', () => {
        const format = createPipsFormat({
            customDots: [1.5, 2.5],
            pipsValues: [],
            pipsLabel: 'all',
        });

        expect(format.to(1.5)).toBe(1.5);
        expect(format.to(Number.NaN)).toBe('');
        expect(format.to(Infinity)).toBe('');
        expect(format.to(-Infinity)).toBe('');
    });
});

import { createPipsFormat } from './createPipsFormat';

describe('Unit/utils/function/createPipsFormat', () => {
    describe('Success cases', () => {
        it.each([
            {
                description:
                    'Should return value for custom dot when showNumbers=true and hideCustomDotsNumbers=false',
                input: {
                    customDots: [25, 50, 75],
                    showNumbers: true,
                    hideCustomDotsNumbers: false,
                    pipsValues: [],
                    value: 25,
                },
                expected: 25,
            },
            {
                description:
                    'Should return empty string for custom dot when hideCustomDotsNumbers=true',
                input: {
                    customDots: [25, 50, 75],
                    showNumbers: true,
                    hideCustomDotsNumbers: true,
                    pipsValues: [],
                    value: 25,
                },
                expected: '',
            },
            {
                description: 'Should return value for integer when custom dots exist',
                input: {
                    customDots: [25, 50, 75],
                    showNumbers: true,
                    hideCustomDotsNumbers: false,
                    pipsValues: [],
                    value: 10,
                },
                expected: 10,
            },
            {
                description: 'Should return empty string for decimal when custom dots exist',
                input: {
                    customDots: [25, 50, 75],
                    showNumbers: true,
                    hideCustomDotsNumbers: false,
                    pipsValues: [],
                    value: 10.5,
                },
                expected: '',
            },
            {
                description: 'Should return value for any number when no custom dots',
                input: {
                    customDots: [],
                    showNumbers: true,
                    hideCustomDotsNumbers: false,
                    pipsValues: [],
                    value: 10,
                },
                expected: 10,
            },
            {
                description: 'Should return empty string for decimal when no custom dots',
                input: {
                    customDots: [],
                    showNumbers: true,
                    hideCustomDotsNumbers: false,
                    pipsValues: [],
                    value: 10.5,
                },
                expected: '',
            },
        ])('$description', ({ input, expected }) => {
            const { customDots, showNumbers, hideCustomDotsNumbers, pipsValues, value } = input;

            const format = createPipsFormat({
                customDots: customDots || [],
                showNumbers,
                hideCustomDotsNumbers,
                pipsValues: pipsValues || [],
            });
            const result = format.to(value);
            expect(result).toBe(expected);
        });
    });

    describe('Edge cases', () => {
        it.each([
            {
                description: 'Should handle zero as custom dot',
                input: {
                    customDots: [0],
                    showNumbers: true,
                    hideCustomDotsNumbers: false,
                    pipsValues: [],
                    value: 0,
                },
                expected: 0,
            },
            {
                description: 'Should handle negative custom dots',
                input: {
                    customDots: [-5, 0, 5],
                    showNumbers: true,
                    hideCustomDotsNumbers: false,
                    pipsValues: [],
                    value: -5,
                },
                expected: -5,
            },
            {
                description: 'Should handle decimal custom dots',
                input: {
                    customDots: [1.5, 2.5],
                    showNumbers: true,
                    hideCustomDotsNumbers: false,
                    pipsValues: [],
                    value: 1.5,
                },
                expected: 1.5,
            },
            {
                description: 'Should return empty string when showNumbers=false',
                input: {
                    customDots: [25, 50, 75],
                    showNumbers: false,
                    hideCustomDotsNumbers: false,
                    pipsValues: [],
                    value: 25,
                },
                expected: '',
            },
            {
                description: 'Should return empty string for any value when showNumbers=false',
                input: {
                    customDots: [25, 50, 75],
                    showNumbers: false,
                    hideCustomDotsNumbers: true,
                    pipsValues: [],
                    value: 10,
                },
                expected: '',
            },
            {
                description: 'Should handle integer-like decimal values for custom dots',
                input: {
                    customDots: [25, 50, 75],
                    showNumbers: true,
                    hideCustomDotsNumbers: false,
                    pipsValues: [],
                    value: 25.0,
                },
                expected: 25,
            },
        ])('$description', ({ input, expected }) => {
            const { customDots, showNumbers, hideCustomDotsNumbers, pipsValues, value } = input;

            const format = createPipsFormat({
                customDots: customDots || [],
                showNumbers,
                hideCustomDotsNumbers,
                pipsValues: pipsValues || [],
            });

            const result = format.to(value);
            expect(result).toBe(expected);
        });
    });

    describe('Pips integration cases', () => {
        it.each([
            {
                description: 'Should return value for pips value when pips integration exists',
                input: {
                    customDots: [25, 50, 75],
                    showNumbers: true,
                    hideCustomDotsNumbers: false,
                    pipsValues: [10, 20, 30],
                    value: 10,
                },
                expected: 10,
            },
            {
                description: 'Should return value for custom dot when pips integration exists',
                input: {
                    customDots: [25, 50, 75],
                    showNumbers: true,
                    hideCustomDotsNumbers: false,
                    pipsValues: [10, 20, 30],
                    value: 25,
                },
                expected: 25,
            },
            {
                description:
                    'Should return empty string for custom dot when hideCustomDotsNumbers=true and pips integration exists',
                input: {
                    customDots: [25, 50, 75],
                    showNumbers: true,
                    hideCustomDotsNumbers: true,
                    pipsValues: [10, 20, 30],
                    value: 25,
                },
                expected: '',
            },
            {
                description: 'Should return value for integer when pips integration exists',
                input: {
                    customDots: [25, 50, 75],
                    showNumbers: true,
                    hideCustomDotsNumbers: false,
                    pipsValues: [10, 20, 30],
                    value: 15,
                },
                expected: 15,
            },
            {
                description: 'Should return empty string for decimal when pips integration exists',
                input: {
                    customDots: [25, 50, 75],
                    showNumbers: true,
                    hideCustomDotsNumbers: false,
                    pipsValues: [10, 20, 30],
                    value: 15.5,
                },
                expected: '',
            },
            {
                description: 'Should return empty string for pips value when showNumbers=false',
                input: {
                    customDots: [25, 50, 75],
                    showNumbers: false,
                    hideCustomDotsNumbers: false,
                    pipsValues: [10, 20, 30],
                    value: 10,
                },
                expected: '',
            },
        ])('$description', ({ input, expected }) => {
            const { customDots, showNumbers, hideCustomDotsNumbers, pipsValues, value } = input;

            const format = createPipsFormat({
                customDots: customDots || [],
                showNumbers,
                hideCustomDotsNumbers,
                pipsValues: pipsValues || [],
            });

            const result = format.to(value);
            expect(result).toBe(expected);
        });
    });

    describe('Error cases', () => {
        it.each([
            {
                description: 'Should handle NaN values gracefully',
                input: {
                    customDots: [25, 50, 75],
                    showNumbers: true,
                    hideCustomDotsNumbers: false,
                    pipsValues: [],
                    value: NaN,
                },
                expected: '',
            },
            {
                description: 'Should handle Infinity values gracefully',
                input: {
                    customDots: [25, 50, 75],
                    showNumbers: true,
                    hideCustomDotsNumbers: false,
                    pipsValues: [],
                    value: Infinity,
                },
                expected: '',
            },
            {
                description: 'Should handle negative Infinity values gracefully',
                input: {
                    customDots: [25, 50, 75],
                    showNumbers: true,
                    hideCustomDotsNumbers: false,
                    pipsValues: [],
                    value: -Infinity,
                },
                expected: '',
            },
            {
                description: 'Should handle very large integer values',
                input: {
                    customDots: [25, 50, 75],
                    showNumbers: true,
                    hideCustomDotsNumbers: false,
                    pipsValues: [],
                    value: Number.MAX_SAFE_INTEGER,
                },
                expected: Number.MAX_SAFE_INTEGER,
            },
            {
                description: 'Should handle very small integer values',
                input: {
                    customDots: [25, 50, 75],
                    showNumbers: true,
                    hideCustomDotsNumbers: false,
                    pipsValues: [],
                    value: Number.MIN_SAFE_INTEGER,
                },
                expected: Number.MIN_SAFE_INTEGER,
            },
        ])('$description', ({ input, expected }) => {
            const { customDots, showNumbers, hideCustomDotsNumbers, pipsValues, value } = input;

            const format = createPipsFormat({
                customDots: customDots || [],
                showNumbers,
                hideCustomDotsNumbers,
                pipsValues: pipsValues || [],
            });

            const result = format.to(value);
            expect(result).toBe(expected);
        });
    });

    describe('Function behavior', () => {
        it.each([
            {
                description: 'Should create a reusable format function',
                input: {
                    customDots: [25, 50, 75],
                    showNumbers: true,
                    hideCustomDotsNumbers: false,
                    pipsValues: [],
                },
                testCases: [
                    { value: 25, expected: 25 },
                    { value: 50, expected: 50 },
                    { value: 10, expected: 10 },
                    { value: 10.5, expected: '' },
                ],
            },
            {
                description: 'Should handle different showNumbers settings - with numbers',
                input: {
                    customDots: [25, 50, 75],
                    showNumbers: true,
                    hideCustomDotsNumbers: false,
                    pipsValues: [],
                },
                testCases: [{ value: 25, expected: 25 }],
            },
            {
                description: 'Should handle different showNumbers settings - without numbers',
                input: {
                    customDots: [25, 50, 75],
                    showNumbers: false,
                    hideCustomDotsNumbers: false,
                    pipsValues: [],
                },
                testCases: [{ value: 25, expected: '' }],
            },
            {
                description: 'Should handle different hideCustomDotsNumbers settings - show custom',
                input: {
                    customDots: [25, 50, 75],
                    showNumbers: true,
                    hideCustomDotsNumbers: false,
                    pipsValues: [],
                },
                testCases: [{ value: 25, expected: 25 }],
            },
            {
                description: 'Should handle different hideCustomDotsNumbers settings - hide custom',
                input: {
                    customDots: [25, 50, 75],
                    showNumbers: true,
                    hideCustomDotsNumbers: true,
                    pipsValues: [],
                },
                testCases: [{ value: 25, expected: '' }],
            },
            {
                description: 'Should handle pips integration correctly',
                input: {
                    customDots: [25, 50, 75],
                    showNumbers: true,
                    hideCustomDotsNumbers: false,
                    pipsValues: [10, 20, 30],
                },
                testCases: [
                    { value: 10, expected: 10 }, // pips value
                    { value: 25, expected: 25 }, // custom dot
                    { value: 15, expected: 15 }, // integer
                    { value: 15.5, expected: '' }, // decimal
                ],
            },
        ])('$description', ({ input, testCases }) => {
            const format = createPipsFormat(input);

            testCases.forEach(({ value, expected }) => {
                expect(format.to(value)).toBe(expected);
            });
        });
    });
});

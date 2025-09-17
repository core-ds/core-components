import { createPipsFormat } from './createPipsFormat';

// todo: после upgrade jest до 27+ переписать на it.each и $description
describe('Unit/utils/function/createPipsFormat', () => {
    describe('Success cases', () => {
        const successCases = [
            {
                input: {
                    customDots: [25, 50, 75],
                    showNumbers: true,
                    hideCustomDotsNumbers: false,
                    pipsValues: undefined,
                    value: 25,
                },
                expected: 25,
                description:
                    'Should return value for custom dot when showNumbers=true and hideCustomDotsNumbers=false',
            },
            {
                input: {
                    customDots: [25, 50, 75],
                    showNumbers: true,
                    hideCustomDotsNumbers: true,
                    pipsValues: undefined,
                    value: 25,
                },
                expected: '',
                description:
                    'Should return empty string for custom dot when hideCustomDotsNumbers=true',
            },
            {
                input: {
                    customDots: [25, 50, 75],
                    showNumbers: true,
                    hideCustomDotsNumbers: false,
                    pipsValues: undefined,
                    value: 10,
                },
                expected: 10,
                description: 'Should return value for integer when custom dots exist',
            },
            {
                input: {
                    customDots: [25, 50, 75],
                    showNumbers: true,
                    hideCustomDotsNumbers: false,
                    pipsValues: undefined,
                    value: 10.5,
                },
                expected: '',
                description: 'Should return empty string for decimal when custom dots exist',
            },
            {
                input: {
                    customDots: undefined,
                    showNumbers: true,
                    hideCustomDotsNumbers: false,
                    pipsValues: undefined,
                    value: 10,
                },
                expected: 10,
                description: 'Should return value for any number when no custom dots',
            },
            {
                input: {
                    customDots: [],
                    showNumbers: true,
                    hideCustomDotsNumbers: false,
                    pipsValues: undefined,
                    value: 10.5,
                },
                expected: 10.5,
                description: 'Should return value for decimal when no custom dots',
            },
        ];

        successCases.forEach(({ input, expected, description }) => {
            it(description, () => {
                const { customDots, showNumbers, hideCustomDotsNumbers, pipsValues } = input;

                const format = createPipsFormat({
                    customDots,
                    showNumbers,
                    hideCustomDotsNumbers,
                    pipsValues,
                });
                const result = format.to(input.value);
                expect(result).toBe(expected);
            });
        });
    });

    describe('Edge cases', () => {
        const edgeCases = [
            {
                input: {
                    customDots: [0],
                    showNumbers: true,
                    hideCustomDotsNumbers: false,
                    pipsValues: undefined,
                    value: 0,
                },
                expected: 0,
                description: 'Should handle zero as custom dot',
            },
            {
                input: {
                    customDots: [-5, 0, 5],
                    showNumbers: true,
                    hideCustomDotsNumbers: false,
                    pipsValues: undefined,
                    value: -5,
                },
                expected: -5,
                description: 'Should handle negative custom dots',
            },
            {
                input: {
                    customDots: [1.5, 2.5],
                    showNumbers: true,
                    hideCustomDotsNumbers: false,
                    pipsValues: undefined,
                    value: 1.5,
                },
                expected: 1.5,
                description: 'Should handle decimal custom dots',
            },
            {
                input: {
                    customDots: [25, 50, 75],
                    showNumbers: false,
                    hideCustomDotsNumbers: false,
                    pipsValues: undefined,
                    value: 25,
                },
                expected: '',
                description: 'Should return empty string when showNumbers=false',
            },
            {
                input: {
                    customDots: [25, 50, 75],
                    showNumbers: false,
                    hideCustomDotsNumbers: true,
                    pipsValues: undefined,
                    value: 10,
                },
                expected: '',
                description: 'Should return empty string for any value when showNumbers=false',
            },
            {
                input: {
                    customDots: [25, 50, 75],
                    showNumbers: true,
                    hideCustomDotsNumbers: false,
                    pipsValues: undefined,
                    value: 25.0,
                },
                expected: 25,
                description: 'Should handle integer-like decimal values for custom dots',
            },
        ];

        edgeCases.forEach(({ input, expected, description }) => {
            it(description, () => {
                const { customDots, showNumbers, hideCustomDotsNumbers, pipsValues } = input;

                const format = createPipsFormat({
                    customDots,
                    showNumbers,
                    hideCustomDotsNumbers,
                    pipsValues,
                });

                const result = format.to(input.value);
                expect(result).toBe(expected);
            });
        });
    });

    describe('Pips integration cases', () => {
        const pipsCases = [
            {
                input: {
                    customDots: [25, 50, 75],
                    showNumbers: true,
                    hideCustomDotsNumbers: false,
                    pipsValues: [10, 20, 30],
                    value: 10,
                },
                expected: 10,
                description: 'Should return value for pips value when pips integration exists',
            },
            {
                input: {
                    customDots: [25, 50, 75],
                    showNumbers: true,
                    hideCustomDotsNumbers: false,
                    pipsValues: [10, 20, 30],
                    value: 25,
                },
                expected: 25,
                description: 'Should return value for custom dot when pips integration exists',
            },
            {
                input: {
                    customDots: [25, 50, 75],
                    showNumbers: true,
                    hideCustomDotsNumbers: true,
                    pipsValues: [10, 20, 30],
                    value: 25,
                },
                expected: '',
                description:
                    'Should return empty string for custom dot when hideCustomDotsNumbers=true and pips integration exists',
            },
            {
                input: {
                    customDots: [25, 50, 75],
                    showNumbers: true,
                    hideCustomDotsNumbers: false,
                    pipsValues: [10, 20, 30],
                    value: 15,
                },
                expected: 15,
                description: 'Should return value for integer when pips integration exists',
            },
            {
                input: {
                    customDots: [25, 50, 75],
                    showNumbers: true,
                    hideCustomDotsNumbers: false,
                    pipsValues: [10, 20, 30],
                    value: 15.5,
                },
                expected: '',
                description: 'Should return empty string for decimal when pips integration exists',
            },
            {
                input: {
                    customDots: [25, 50, 75],
                    showNumbers: false,
                    hideCustomDotsNumbers: false,
                    pipsValues: [10, 20, 30],
                    value: 10,
                },
                expected: '',
                description: 'Should return empty string for pips value when showNumbers=false',
            },
        ];

        pipsCases.forEach(({ input, expected, description }) => {
            it(description, () => {
                const { customDots, showNumbers, hideCustomDotsNumbers, pipsValues } = input;

                const format = createPipsFormat({
                    customDots,
                    showNumbers,
                    hideCustomDotsNumbers,
                    pipsValues,
                });

                const result = format.to(input.value);
                expect(result).toBe(expected);
            });
        });
    });

    describe('Error cases', () => {
        const errorCases = [
            {
                input: {
                    customDots: [25, 50, 75],
                    showNumbers: true,
                    hideCustomDotsNumbers: false,
                    pipsValues: undefined,
                    value: NaN,
                },
                expected: '',
                description: 'Should handle NaN values gracefully',
            },
            {
                input: {
                    customDots: [25, 50, 75],
                    showNumbers: true,
                    hideCustomDotsNumbers: false,
                    pipsValues: undefined,
                    value: Infinity,
                },
                expected: '',
                description: 'Should handle Infinity values gracefully',
            },
            {
                input: {
                    customDots: [25, 50, 75],
                    showNumbers: true,
                    hideCustomDotsNumbers: false,
                    pipsValues: undefined,
                    value: -Infinity,
                },
                expected: '',
                description: 'Should handle negative Infinity values gracefully',
            },
            {
                input: {
                    customDots: [25, 50, 75],
                    showNumbers: true,
                    hideCustomDotsNumbers: false,
                    pipsValues: undefined,
                    value: Number.MAX_SAFE_INTEGER,
                },
                expected: Number.MAX_SAFE_INTEGER,
                description: 'Should handle very large integer values',
            },
            {
                input: {
                    customDots: [25, 50, 75],
                    showNumbers: true,
                    hideCustomDotsNumbers: false,
                    pipsValues: undefined,
                    value: Number.MIN_SAFE_INTEGER,
                },
                expected: Number.MIN_SAFE_INTEGER,
                description: 'Should handle very small integer values',
            },
        ];

        errorCases.forEach(({ input, expected, description }) => {
            it(description, () => {
                const { customDots, showNumbers, hideCustomDotsNumbers, pipsValues } = input;

                const format = createPipsFormat({
                    customDots,
                    showNumbers,
                    hideCustomDotsNumbers,
                    pipsValues,
                });

                const result = format.to(input.value);
                expect(result).toBe(expected);
            });
        });
    });

    describe('Function behavior', () => {
        it('Should create a reusable format function', () => {
            const format = createPipsFormat({
                customDots: [25, 50, 75],
                showNumbers: true,
                hideCustomDotsNumbers: false,
                pipsValues: undefined,
            });

            expect(format.to(25)).toBe(25);
            expect(format.to(50)).toBe(50);
            expect(format.to(10)).toBe(10);
            expect(format.to(10.5)).toBe('');
        });

        it('Should handle different showNumbers settings', () => {
            const formatWithNumbers = createPipsFormat({
                customDots: [25, 50, 75],
                showNumbers: true,
                hideCustomDotsNumbers: false,
                pipsValues: undefined,
            });
            const formatWithoutNumbers = createPipsFormat({
                customDots: [25, 50, 75],
                showNumbers: false,
                hideCustomDotsNumbers: false,
                pipsValues: undefined,
            });

            expect(formatWithNumbers.to(25)).toBe(25);
            expect(formatWithoutNumbers.to(25)).toBe('');
        });

        it('Should handle different hideCustomDotsNumbers settings', () => {
            const formatShowCustom = createPipsFormat({
                customDots: [25, 50, 75],
                showNumbers: true,
                hideCustomDotsNumbers: false,
                pipsValues: undefined,
            });
            const formatHideCustom = createPipsFormat({
                customDots: [25, 50, 75],
                showNumbers: true,
                hideCustomDotsNumbers: true,
                pipsValues: undefined,
            });

            expect(formatShowCustom.to(25)).toBe(25);
            expect(formatHideCustom.to(25)).toBe('');
        });

        it('Should handle pips integration correctly', () => {
            const format = createPipsFormat({
                customDots: [25, 50, 75],
                showNumbers: true,
                hideCustomDotsNumbers: false,
                pipsValues: [10, 20, 30],
            });

            expect(format.to(10)).toBe(10); // pips value
            expect(format.to(25)).toBe(25); // custom dot
            expect(format.to(15)).toBe(15); // integer
            expect(format.to(15.5)).toBe(''); // decimal
        });
    });
});

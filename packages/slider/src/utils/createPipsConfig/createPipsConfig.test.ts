import { createPipsConfig } from './createPipsConfig';

// todo: после upgrade jest до 27+ переписать на it.each и $description
describe('Unit/utils/function/createPipsConfig', () => {
    describe('Success cases', () => {
        const successCases = [
            {
                description: 'Should create step pips config with default parameters',
                input: {
                    min: 0,
                    max: 100,
                    step: 10,
                    dotsSlider: 'step' as const,
                    showNumbers: true,
                },
                expected: {
                    mode: 'values',
                    values: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
                },
            },
            {
                description: 'Should create custom pips config with custom dots',
                input: {
                    min: 0,
                    max: 50,
                    step: 5,
                    dotsSlider: 'custom' as const,
                    customDots: [10, 25, 40],
                    showNumbers: true,
                },
                expected: {
                    mode: 'values',
                    values: [10, 25, 40],
                    filter: expect.any(Function),
                    format: expect.any(Object),
                },
            },
            // {
            //     description: 'Should merge pips and custom dots when both provided',
            //     input: {
            //         min: 0,
            //         max: 100,
            //         step: 10,
            //         dotsSlider: 'step' as const,
            //         showNumbers: true,
            //         hideCustomDotsNumbers: false,
            //         pips: { mode: 'values', values: [0, 25, 50, 75, 100] } as any,
            //         customDots: [10, 30, 60, 90],
            //     },
            //     expected: {
            //         mode: 'values',
            //         values: [0, 10, 20, 30, 50, 60, 75, 90, 100],
            //     },
            // },
        ];

        successCases.forEach(({ input, expected, description }) => {
            it(description, () => {
                const result = createPipsConfig(input);
                expect(result).toMatchObject(expected);
            });
        });
    });

    describe('Edge cases', () => {
        const edgeCases = [
            {
                input: {
                    min: 0,
                    max: 0,
                    step: 1,
                    dotsSlider: 'step' as const,
                    showNumbers: true,
                    hideCustomDotsNumbers: false,
                    pips: undefined,
                    customDots: undefined,
                },
                expected: {
                    mode: 'values',
                    values: [0],
                },
                description: 'Should handle min equals max',
            },
            {
                input: {
                    min: -10,
                    max: 10,
                    step: 5,
                    dotsSlider: 'custom' as const,
                    showNumbers: true,
                    hideCustomDotsNumbers: false,
                    pips: undefined,
                    customDots: [-5, 0, 5],
                },
                expected: {
                    mode: 'values',
                    values: [-5, 0, 5],
                    filter: expect.any(Function),
                    format: expect.any(Object),
                },
                description: 'Should handle negative range with custom dots',
            },
            {
                input: {
                    min: 0,
                    max: 1,
                    step: 0.25,
                    dotsSlider: 'step' as const,
                    showNumbers: true,
                    hideCustomDotsNumbers: false,
                    pips: undefined,
                    customDots: undefined,
                },
                expected: {
                    mode: 'values',
                    values: [0, 0.25, 0.5, 0.75, 1],
                },
                description: 'Should handle decimal step values',
            },
            {
                input: {
                    min: 0,
                    max: 100,
                    step: 10,
                    dotsSlider: 'custom' as const,
                    showNumbers: true,
                    hideCustomDotsNumbers: false,
                    pips: undefined,
                    customDots: [],
                },
                expected: {
                    mode: 'values',
                    values: [],
                    filter: expect.any(Function),
                    format: expect.any(Object),
                },
                description: 'Should handle empty custom dots array',
            },
        ];

        edgeCases.forEach(({ input, expected, description }) => {
            it(description, () => {
                const result = createPipsConfig(input);
                expect(result).toMatchObject(expected);
            });
        });
    });

    describe('Pips integration cases', () => {
        const pipsCases = [
            {
                input: {
                    min: 0,
                    max: 100,
                    step: 10,
                    dotsSlider: 'custom' as const,
                    showNumbers: true,
                    hideCustomDotsNumbers: false,
                    pips: { mode: 'values', values: [0, 25, 50, 75, 100] } as any,
                    customDots: [10, 30, 60, 90],
                },
                expected: {
                    mode: 'values',
                    values: [0, 10, 25, 30, 50, 60, 75, 90, 100],
                    filter: expect.any(Function),
                    format: expect.any(Object),
                },
                description: 'Should merge pips values with custom dots',
            },
            {
                input: {
                    min: 0,
                    max: 100,
                    step: 10,
                    dotsSlider: 'custom' as const,
                    showNumbers: true,
                    hideCustomDotsNumbers: true,
                    pips: { mode: 'values', values: [0, 25, 50, 75, 100] } as any,
                    customDots: [10, 30, 60, 90],
                },
                expected: {
                    mode: 'values',
                    values: [0, 10, 25, 30, 50, 60, 75, 90, 100],
                    filter: expect.any(Function),
                    format: expect.any(Object),
                },
                description:
                    'Should merge pips values with custom dots and hideCustomDotsNumbers=true',
            },
            {
                input: {
                    min: 0,
                    max: 100,
                    step: 10,
                    dotsSlider: 'custom' as const,
                    showNumbers: false,
                    hideCustomDotsNumbers: false,
                    pips: { mode: 'values', values: [0, 25, 50, 75, 100] } as any,
                    customDots: [10, 30, 60, 90],
                },
                expected: {
                    mode: 'values',
                    values: [0, 10, 25, 30, 50, 60, 75, 90, 100],
                    filter: expect.any(Function),
                    format: expect.any(Object),
                },
                description: 'Should merge pips values with custom dots and showNumbers=false',
            },
        ];

        pipsCases.forEach(({ input, expected, description }) => {
            it(description, () => {
                const result = createPipsConfig(input);
                expect(result).toMatchObject(expected);
            });
        });
    });

    describe('Return pips directly cases', () => {
        const returnPipsCases = [
            {
                input: {
                    min: 0,
                    max: 100,
                    step: 10,
                    dotsSlider: 'step' as const,
                    showNumbers: true,
                    hideCustomDotsNumbers: false,
                    pips: { mode: 'values', values: [0, 25, 50, 75, 100] } as any,
                    customDots: undefined,
                },
                expected: { mode: 'values', values: [0, 25, 50, 75, 100] },
                description: 'Should return pips directly when no custom dots',
            },
            {
                input: {
                    min: 0,
                    max: 100,
                    step: 10,
                    dotsSlider: 'step' as const,
                    showNumbers: true,
                    hideCustomDotsNumbers: false,
                    pips: { mode: 'values', values: [0, 25, 50, 75, 100] } as any,
                    customDots: [],
                },
                expected: { mode: 'values', values: [0, 25, 50, 75, 100] },
                description: 'Should return pips directly when custom dots is empty array',
            },
        ];

        returnPipsCases.forEach(({ input, expected, description }) => {
            it(description, () => {
                const result = createPipsConfig(input);
                expect(result).toEqual(expected);
            });
        });
    });

    describe('Error cases', () => {
        const errorCases = [
            {
                input: {
                    min: NaN,
                    max: 100,
                    step: 10,
                    dotsSlider: 'step' as const,
                    showNumbers: true,
                    hideCustomDotsNumbers: false,
                    pips: undefined,
                    customDots: undefined,
                },
                expected: {
                    mode: 'values',
                    values: [],
                },
                description: 'Should handle NaN min value',
            },
        ];

        errorCases.forEach(({ input, expected, description }) => {
            it(description, () => {
                const result = createPipsConfig(input);
                expect(result).toMatchObject(expected);
            });
        });
    });

    describe('Function behavior', () => {
        it('Should use default values when not provided', () => {
            const result = createPipsConfig({
                min: 0,
                max: 10,
                step: 1,
                dotsSlider: 'step',
                showNumbers: true,
            });

            expect(result).toMatchObject({
                mode: 'values',
                values: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
            });
        });

        it('Should handle different dotsSlider values', () => {
            const stepResult = createPipsConfig({
                min: 0,
                max: 10,
                step: 2,
                dotsSlider: 'step',
                showNumbers: true,
            });

            const customResult = createPipsConfig({
                min: 0,
                max: 10,
                step: 2,
                dotsSlider: 'custom',
                showNumbers: true,
                customDots: [2, 6, 8],
            });

            expect(stepResult).toMatchObject({
                mode: 'values',
                values: [0, 2, 4, 6, 8, 10],
            });

            expect(customResult).toMatchObject({
                mode: 'values',
                values: [2, 6, 8],
            });
        });

        it('Should extract pips values correctly', () => {
            const result = createPipsConfig({
                min: 0,
                max: 100,
                step: 10,
                dotsSlider: 'custom',
                showNumbers: true,
                customDots: [25, 50, 75],
                pips: { mode: 'values', values: [0, 25, 50, 75, 100] } as any,
            });

            expect(result).toMatchObject({
                mode: 'values',
                values: expect.arrayContaining([0, 25, 50, 75, 100]),
            });
        });
    });
});

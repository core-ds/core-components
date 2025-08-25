import { createPipsFilter } from './createPipsFilter';

// todo: после upgrade jest до 27+ переписать на it.each и $description
describe('Unit/utils/function/createPipsFilter', () => {
    describe('Success cases', () => {
        const successCases = [
            {
                input: { customDots: [25, 50, 75], value: 25, type: 0 as const },
                expected: 1,
                description: 'Should return 1 for custom dot value',
            },
            {
                input: { customDots: [25, 50, 75], value: 50, type: 0 as const },
                expected: 1,
                description: 'Should return 1 for another custom dot value',
            },
            {
                input: { customDots: [25, 50, 75], value: 10, type: 0 as const },
                expected: 0,
                description: 'Should return 0 for integer value when custom dots exist',
            },
            {
                input: { customDots: [25, 50, 75], value: 10.5, type: 0 as const },
                expected: -1,
                description: 'Should return -1 for decimal value when custom dots exist',
            },
            {
                input: { customDots: [], value: 10, type: 1 as const },
                expected: 1,
                description: 'Should return original type when custom dots is empty array',
            },
            {
                input: { customDots: undefined, value: 10, type: 2 as const },
                expected: 2,
                description: 'Should return original type when no custom dots',
            },
        ];

        successCases.forEach(({ input, expected, description }) => {
            it(description, () => {
                const filter = createPipsFilter(input.customDots);
                const result = filter(input.value, input.type);

                expect(result).toBe(expected);
            });
        });
    });

    describe('Edge cases', () => {
        const edgeCases = [
            {
                input: { customDots: [0], value: 0, type: 0 as const },
                expected: 1,
                description: 'Should handle zero as custom dot',
            },
            {
                input: { customDots: [-5, 0, 5], value: -5, type: 0 as const },
                expected: 1,
                description: 'Should handle negative custom dots',
            },
            {
                input: { customDots: [1.5, 2.5], value: 1.5, type: 0 as const },
                expected: 1,
                description: 'Should handle decimal custom dots',
            },
            {
                input: { customDots: [25, 50, 75], value: 25.0, type: 0 as const },
                expected: 1,
                description: 'Should handle integer-like decimal values',
            },
            {
                input: { customDots: [25, 50, 75], value: 25.1, type: 0 as const },
                expected: -1,
                description: 'Should return -1 for decimal values even if close to integer',
            },
            {
                input: { customDots: [25, 50, 75], value: 0, type: 0 as const },
                expected: 0,
                description: 'Should return 0 for zero when it is not a custom dot',
            },
        ];

        edgeCases.forEach(({ input, expected, description }) => {
            it(description, () => {
                const filter = createPipsFilter(input.customDots);
                const result = filter(input.value, input.type);
                expect(result).toBe(expected);
            });
        });
    });

    describe('Error cases', () => {
        const errorCases = [
            {
                input: { customDots: [25, 50, 75], value: NaN, type: 0 as const },
                expected: -1,
                description: 'Should handle NaN values gracefully',
            },
            {
                input: { customDots: [25, 50, 75], value: Infinity, type: 0 as const },
                expected: -1,
                description: 'Should handle Infinity values gracefully',
            },
            {
                input: { customDots: [25, 50, 75], value: -Infinity, type: 0 as const },
                expected: -1,
                description: 'Should handle negative Infinity values gracefully',
            },
            {
                input: {
                    customDots: [25, 50, 75],
                    value: Number.MAX_SAFE_INTEGER,
                    type: 0 as const,
                },
                expected: 0,
                description: 'Should handle very large integer values',
            },
            {
                input: {
                    customDots: [25, 50, 75],
                    value: Number.MIN_SAFE_INTEGER,
                    type: 0 as const,
                },
                expected: 0,
                description: 'Should handle very small integer values',
            },
            {
                input: { customDots: [25, 50, 75], value: 25, type: -1 as const },
                expected: 1,
                description: 'Should override original type -1 for custom dots',
            },
            {
                input: { customDots: [25, 50, 75], value: 25, type: 2 as const },
                expected: 1,
                description: 'Should override original type 2 for custom dots',
            },
        ];

        errorCases.forEach(({ input, expected, description }) => {
            it(description, () => {
                const filter = createPipsFilter(input.customDots);
                const result = filter(input.value, input.type);
                expect(result).toBe(expected);
            });
        });
    });

    describe('Function behavior', () => {
        it('Should create a reusable filter function', () => {
            const filter = createPipsFilter([25, 50, 75]);

            expect(filter(25, 0)).toBe(1);
            expect(filter(50, 0)).toBe(1);
            expect(filter(10, 0)).toBe(0);
            expect(filter(10.5, 0)).toBe(-1);
        });

        it('Should handle different original types correctly', () => {
            const filter = createPipsFilter([25, 50, 75]);

            expect(filter(25, -1)).toBe(1); // custom dot overrides -1
            expect(filter(25, 0)).toBe(1); // custom dot overrides 0
            expect(filter(25, 1)).toBe(1); // custom dot overrides 1
            expect(filter(25, 2)).toBe(1); // custom dot overrides 2
        });

        it('Should preserve original type when no custom dots', () => {
            const filter = createPipsFilter();

            expect(filter(10, -1)).toBe(-1);
            expect(filter(10, 0)).toBe(0);
            expect(filter(10, 1)).toBe(1);
            expect(filter(10, 2)).toBe(2);
        });
    });
});

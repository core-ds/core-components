import { resolveBackground } from './resolveBackground';
import { PRESET_COLORS } from '../types';

describe('resolveBackground', () => {
    describe('SUCCESS CASES', () => {
        it.each(PRESET_COLORS)('should return preset color for "%s"', (color) => {
            const result = resolveBackground(color);

            expect(result).toBe(color);
            expect(typeof result).toBe('string');
        });
    });

    describe('EDGE CASES', () => {
        it.each`
            input                                  | description
            ${''}                                  | ${'empty string'}
            ${undefined}                           | ${'undefined'}
            ${' positive '}                        | ${'string with whitespace'}
            ${'positive1'}                         | ${'similar but not preset string'}
            ${'posit'}                             | ${'partial match'}
            ${'POSITIVE'}                          | ${'case mismatch'}
            ${'--color-light-accent-primary'}      | ${'custom color tokens'}
            ${'#fff'}                              | ${'hex colors'}
            ${'rgb(255, 255, 255)'}                | ${'rgb colors'}
            ${'var(--color-light-accent-primary)'} | ${'var() tokens'}
        `('should return undefined for $description', ({ input }) => {
            const result = resolveBackground(input);

            expect(result).toBeUndefined();
        });
    });

    describe('ERROR CASES', () => {
        it.each`
            input   | description
            ${123}  | ${'non-string number'}
            ${true} | ${'non-string boolean'}
            ${{}}   | ${'non-string object'}
            ${[]}   | ${'non-string array'}
            ${null} | ${'null'}
        `('should return undefined for $description', ({ input }) => {
            const result = resolveBackground(input as unknown as string);

            expect(result).toBeUndefined();
        });
    });
});

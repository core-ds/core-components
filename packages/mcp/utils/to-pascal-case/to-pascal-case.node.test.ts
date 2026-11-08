import { toPascalCase } from './to-pascal-case.mjs';

describe('toPascalCase', () => {
    test('single word', () => {
        expect(toPascalCase('word')).toBe('Word');
    });

    test('two words joined by a hyphen', () => {
        expect(toPascalCase('word-word')).toBe('WordWord');
    });

    test('three words joined by hyphens', () => {
        expect(toPascalCase('word-word-word')).toBe('WordWordWord');
    });

    test('acronym stays regular capitalization when no dictionary is passed', () => {
        expect(toPascalCase('cdn-icon')).toBe('CdnIcon');
    });

    test('acronym from the passed dictionary is fully uppercased', () => {
        expect(toPascalCase('cdn-icon', new Set(['cdn']))).toBe('CDNIcon');
    });
});

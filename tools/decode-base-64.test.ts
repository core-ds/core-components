import { decodeBase64 } from './decode-base-64';

describe('decodeBase64', () => {
    const cases: [string, string][] = [
        ['SGVsbG8=', 'Hello'],
        ['V29ybGQ=', 'World'],
        ['SGVsbG8sIFdvcmxkIQ==', 'Hello, World!'],
        ['0J/RgNC40LLQtdGC', 'Привет'],
        ['cXdlcnR5MTIzNDU2', 'qwerty123456'],
        ['aHR0cHM6Ly93d3cuZXhhbXBsZS5jb20v', 'https://www.example.com/'],
        ['', ''],
    ];

    it.each(cases)('decodeBase64("%s")', (input, expected) => {
        expect(decodeBase64(input)).toBe(expected);
    });
});

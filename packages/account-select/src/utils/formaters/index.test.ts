import { getMaskedCardNumber, formatCardNumber } from './index';

describe('getMaskedCardNumber', () => {
    it('should return original value if less than 16 characters', () => {
        expect(getMaskedCardNumber('123456789')).toBe('123456789');
    });

    it('should return original value if empty', () => {
        expect(getMaskedCardNumber('')).toBe('');
    });

    it('should return masked number with last 4 digits', () => {
        expect(getMaskedCardNumber('1234567890123456')).toBe('··3456');
    });

    it('should handle spaces in card number', () => {
        expect(getMaskedCardNumber('1234 5678 9012 3456')).toBe('··3456');
    });

    it('should handle card number with multiple spaces', () => {
        expect(getMaskedCardNumber('1234  5678  9012  3456')).toBe('··3456');
    });

    const testCases = [
        ['4111111111111111', '··1111'],
        ['5500000000000004', '··0004'],
        ['2201382000000013', '··0013'],
        ['6759649826438453', '··8453'],
    ];

    it.each(testCases)('should mask card number %s correctly', (input, expected) => {
        expect(getMaskedCardNumber(input)).toBe(expected);
    });
});

describe('formatCardNumber', () => {
    it('should format card number with spaces every 4 digits', () => {
        expect(formatCardNumber('1234567890123456')).toBe('1234 5678 9012 3456');
    });

    it('should handle already formatted card number', () => {
        expect(formatCardNumber('1234 5678 9012 3456')).toBe('1234 5678 9012 3456');
    });

    it('should handle short card number', () => {
        expect(formatCardNumber('1234')).toBe('1234');
        expect(formatCardNumber('12345')).toBe('1234 5');
    });

    it('should handle empty string', () => {
        expect(formatCardNumber('')).toBe('');
    });

    it('should remove existing spaces and reformat', () => {
        expect(formatCardNumber('1234  5678  9012  3456')).toBe('1234 5678 9012 3456');
    });

    const testCases = [
        ['4111111111111111', '4111 1111 1111 1111'],
        ['5500000000000004', '5500 0000 0000 0004'],
        ['220138200000001', '2201 3820 0000 001'],
        ['67596498264384', '6759 6498 2643 84'],
        ['123', '123'],
    ];

    it.each(testCases)('should format card number %s correctly', (input, expected) => {
        expect(formatCardNumber(input)).toBe(expected);
    });
});

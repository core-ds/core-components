import { validateCardNumber, validateExpiry, validateCvv } from './index';

describe('validateCardNumber', () => {
    it('should return true for valid 16-digit card number', () => {
        expect(validateCardNumber('1234567890123456')).toBe(true);
    });

    it('should return false for card number shorter than 16 digits', () => {
        expect(validateCardNumber('123456789012345')).toBe(false);
        expect(validateCardNumber('12345')).toBe(false);
        expect(validateCardNumber('')).toBe(false);
    });

    it('should return false for card number longer than 16 digits', () => {
        expect(validateCardNumber('12345678901234567')).toBe(false);
        expect(validateCardNumber('123456789012345678')).toBe(false);
    });

    const validCardNumbers = [
        '4111111111111111',
        '5500000000000004',
        '2201382000000013',
        '6759649826438453',
        '0000000000000000',
        '9999999999999999',
    ];

    it.each(validCardNumbers)('should validate card number %s as true', (cardNumber) => {
        expect(validateCardNumber(cardNumber)).toBe(true);
    });

    const invalidCardNumbers = ['411111111111111', '41111111111111111', '411', ''];

    it.each(invalidCardNumbers)('should validate card number %s as false', (cardNumber) => {
        expect(validateCardNumber(cardNumber)).toBe(false);
    });
});

describe('validateExpiry', () => {
    it('should return true for valid future expiry', () => {
        const futureYear = (new Date().getFullYear() % 100) + 2;
        expect(validateExpiry(`12/${futureYear.toString().padStart(2, '0')}`)).toBe(true);
    });

    it('should return false for past years', () => {
        expect(validateExpiry('12/20')).toBe(false);
        expect(validateExpiry('01/19')).toBe(false);
    });

    it('should return false for invalid format', () => {
        expect(validateExpiry('1/24')).toBe(false);
        expect(validateExpiry('12/2')).toBe(false);
        expect(validateExpiry('12/234')).toBe(false);
        expect(validateExpiry('123/24')).toBe(false);
        expect(validateExpiry('')).toBe(false);
        expect(validateExpiry('1224')).toBe(false);
    });

    it('should return false for invalid month', () => {
        expect(validateExpiry('00/25')).toBe(false);
        expect(validateExpiry('13/25')).toBe(false);
        expect(validateExpiry('99/25')).toBe(false);
    });

    const invalidTestCases = ['12/20', '00/25', '13/25', '1/24', '12/2', ''];

    it.each(invalidTestCases)('should validate expiry %s as false', (expiry) => {
        expect(validateExpiry(expiry)).toBe(false);
    });
});

describe('validateCvv', () => {
    it('should return true for valid 3-digit string CVV', () => {
        expect(validateCvv('123')).toBe(true);
        expect(validateCvv('000')).toBe(true);
        expect(validateCvv('999')).toBe(true);
    });

    it('should return true for valid 3-digit number CVV', () => {
        expect(validateCvv(123)).toBe(true);
        expect(validateCvv(0)).toBe(false);
        expect(validateCvv(999)).toBe(true);
        expect(validateCvv(42)).toBe(false);
    });

    it('should return false for invalid string CVV', () => {
        expect(validateCvv('12')).toBe(false);
        expect(validateCvv('1234')).toBe(false);
        expect(validateCvv('')).toBe(false);
        expect(validateCvv('abc')).toBe(false);
    });

    it('should return false for invalid number CVV', () => {
        expect(validateCvv(12)).toBe(false);
        expect(validateCvv(1234)).toBe(false);
        expect(validateCvv(1)).toBe(false);
    });

    it('should return false for undefined', () => {
        expect(validateCvv(undefined)).toBe(false);
    });

    const validTestCases: Array<[string | number, boolean]> = [
        ['123', true],
        ['000', true],
        ['999', true],
        [123, true],
        [999, true],
    ];

    it.each(validTestCases)('should validate CVV %s as %s', (cvv, expected) => {
        expect(validateCvv(cvv)).toBe(expected);
    });

    const invalidTestCases: Array<[string | number | undefined, boolean]> = [
        ['12', false],
        ['1234', false],
        ['', false],
        ['abc', false],
        [12, false],
        [1234, false],
        [1, false],
        [undefined, false],
    ];

    it.each(invalidTestCases)('should validate CVV %s as %s', (cvv, expected) => {
        expect(validateCvv(cvv)).toBe(expected);
    });
});

import { normalizeValue, getItemState } from './calculate-value';

describe('normalizeValue', () => {
    it('should return 0 for negative values', () => {
        expect(normalizeValue(-1, 5)).toBe(0);
        expect(normalizeValue(-10, 5)).toBe(0);
    });

    it('should return 0 for NaN', () => {
        expect(normalizeValue(NaN, 5)).toBe(0);
    });

    it('should cap value at count', () => {
        expect(normalizeValue(10, 5)).toBe(5);
        expect(normalizeValue(7, 5)).toBe(5);
    });

    it('should floor value', () => {
        expect(normalizeValue(3.7, 5)).toBe(3);
        expect(normalizeValue(3.2, 5)).toBe(3);
    });

    it('should handle values at boundary', () => {
        expect(normalizeValue(5, 5)).toBe(5);
        expect(normalizeValue(4, 5)).toBe(4);
    });
});

describe('getItemState', () => {
    it('should return true when value >= itemValue', () => {
        expect(getItemState(0, 1)).toBe(true);
        expect(getItemState(2, 3)).toBe(true);
        expect(getItemState(0, 5)).toBe(true);
    });

    it('should return false when value < itemValue', () => {
        expect(getItemState(2, 1)).toBe(false);
        expect(getItemState(4, 3)).toBe(false);
    });

    it('should return true when value equals itemValue', () => {
        expect(getItemState(0, 1)).toBe(true);
        expect(getItemState(1, 2)).toBe(true);
    });
});

import { calculateValue, getItemState, normalizeValue } from './calculate-value';

describe('calculateValue', () => {
    it('should return index + 1 for full value', () => {
        expect(calculateValue(0, false, false)).toBe(1);
        expect(calculateValue(2, false, false)).toBe(3);
        expect(calculateValue(4, false, false)).toBe(5);
    });

    it('should return index + 0.5 for half value when allowHalf', () => {
        expect(calculateValue(0, true, true)).toBe(0.5);
        expect(calculateValue(2, true, true)).toBe(2.5);
        expect(calculateValue(4, true, true)).toBe(4.5);
    });

    it('should ignore isHalf when allowHalf is false', () => {
        expect(calculateValue(0, true, false)).toBe(1);
        expect(calculateValue(2, true, false)).toBe(3);
    });
});

describe('getItemState', () => {
    it('should return isActive=true when value >= itemValue', () => {
        expect(getItemState(0, 1)).toEqual({ isActive: true, isHalfActive: false });
        expect(getItemState(2, 3)).toEqual({ isActive: true, isHalfActive: false });
        expect(getItemState(0, 5)).toEqual({ isActive: true, isHalfActive: false });
    });

    it('should return isActive=false when value < itemValue', () => {
        expect(getItemState(2, 1)).toEqual({ isActive: false, isHalfActive: false });
        expect(getItemState(4, 3)).toEqual({ isActive: false, isHalfActive: false });
    });

    it('should return isHalfActive=true for partial values', () => {
        expect(getItemState(1, 1.5)).toEqual({ isActive: false, isHalfActive: true });
        expect(getItemState(2, 2.5)).toEqual({ isActive: false, isHalfActive: true });
    });

    it('should return isActive=true when value equals itemValue', () => {
        expect(getItemState(0, 1)).toEqual({ isActive: true, isHalfActive: false });
        expect(getItemState(1, 2)).toEqual({ isActive: true, isHalfActive: false });
    });
});

describe('normalizeValue', () => {
    it('should return 0 for negative values', () => {
        expect(normalizeValue(-1, 5, false)).toBe(0);
        expect(normalizeValue(-10, 5, false)).toBe(0);
    });

    it('should return 0 for NaN', () => {
        expect(normalizeValue(NaN, 5, false)).toBe(0);
    });

    it('should cap value at count', () => {
        expect(normalizeValue(10, 5, false)).toBe(5);
        expect(normalizeValue(7, 5, false)).toBe(5);
    });

    it('should floor value when allowHalf is false', () => {
        expect(normalizeValue(3.7, 5, false)).toBe(3);
        expect(normalizeValue(3.2, 5, false)).toBe(3);
    });

    it('should round to nearest 0.5 when allowHalf is true', () => {
        expect(normalizeValue(3.2, 5, true)).toBe(3);
        expect(normalizeValue(3.4, 5, true)).toBe(3.5);
        expect(normalizeValue(3.6, 5, true)).toBe(3.5);
        expect(normalizeValue(3.75, 5, true)).toBe(4);
    });

    it('should handle allowHalf with values at boundary', () => {
        expect(normalizeValue(5, 5, true)).toBe(5);
        expect(normalizeValue(4.5, 5, true)).toBe(4.5);
    });
});

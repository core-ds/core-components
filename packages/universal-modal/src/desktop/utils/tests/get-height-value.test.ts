import { getHeightValue } from '../get-height-value';

describe('getHeightValue', () => {
    it('hugContent', () => {
        expect(getHeightValue('hugContent')).toBeUndefined();
    });

    it('fullHeight', () => {
        expect(getHeightValue('fullHeight')).toBe('100%');
    });

    it('number', () => {
        expect(getHeightValue(500)).toBe(500);
    });
});

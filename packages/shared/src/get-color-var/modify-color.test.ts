import { modifyColor } from './modify-color';

describe('modifyColor', () => {
    it('should convert ARGB color to RGBA format', () => {
        expect(modifyColor('#FF0000FF')).toBe('rgba(0, 0, 255, 1.00)');
        expect(modifyColor('#8000FF00')).toBe('rgba(0, 255, 0, 0.50)');
        expect(modifyColor('#00000000')).toBe('rgba(0, 0, 0, 0.00)');
    });
});

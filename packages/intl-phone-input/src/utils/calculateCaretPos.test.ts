import { calculateCaretPos } from './calculateCaretPos';

describe('test function "calculateCaretPos"', () => {
    it('should calculate valid caret position when add digit', () => {
        expect(calculateCaretPos('79644', '+7 964 4')).toBe(8);
        expect(calculateCaretPos('896', '8 (964) 467-45-67')).toBe(5);
        expect(calculateCaretPos('89644', '8 (964) 467-45-67')).toBe(9);
        expect(calculateCaretPos('79644674567', '+7 (964) 467-45-67')).toBe(18);
    });
});

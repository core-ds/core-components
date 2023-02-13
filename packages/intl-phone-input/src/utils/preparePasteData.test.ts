import { preparePasteData } from './preparePasteData';

describe('preparePasteData', () => {
    it('should return number with +7 when paste number start with "7" or "8" in empty field', () => {
        expect(preparePasteData('', '79491234567', 0, 0)).toEqual('+79491234567');
        expect(preparePasteData('', '89491234567', 0, 0)).toEqual('+79491234567');
    });

    it('should return number with + when paste number doesn\'t start with "7" or "8" in empty field', () => {
        expect(preparePasteData('', '6491234567', 0, 0)).toEqual('+6491234567');
        expect(preparePasteData('', '9491234567', 0, 0)).toEqual('+9491234567');
    });

    it('should return number with +7 when paste number doesn\'t start with "7" or "8" in empty field with ruNumberPriority', () => {
        expect(preparePasteData('', '6491234567', 0, 0, true)).toEqual('+76491234567');
        expect(preparePasteData('', '9491234567', 0, 0, true)).toEqual('+79491234567');
    });

    it('should return number when paste number start with "+" in empty field', () => {
        expect(preparePasteData('', '+79491234567', 0, 0)).toEqual('+79491234567');
    });

    it('should return number when paste number with letters in empty field', () => {
        expect(preparePasteData('', '123aaa456', 0, 0)).toEqual('+123456');
    });

    it('should return number when paste number in field with "+"', () => {
        expect(preparePasteData('+', '79491234567', 0, 0)).toEqual('+79491234567');
    });

    it('should return number when paste number in field with partitial number', () => {
        expect(preparePasteData('+7949', '1234567', 5, 5)).toEqual('+79491234567');
    });

    it('should return old number when paste only letters in field with partitial number', () => {
        expect(preparePasteData('+7949', 'aaaaaaa', 5, 5)).toEqual('+7949');
    });

    it('should return number when paste number in the middle of field', () => {
        expect(preparePasteData('+7949', '1234567', 2, 2)).toEqual('+71234567949');
    });
});

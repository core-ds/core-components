import { getBorderCorners } from './getBorderCorners';
import styles from '../index.module.css';

describe('test function "getBorderCorners"', () => {
    it('should get same corners', () => {
        expect(getBorderCorners(8)).toStrictEqual({
            [styles[`border-bottom-right-8`]]: 8,
            [styles[`border-bottom-left-8`]]: 8,
            [styles[`border-top-right-8`]]: 8,
            [styles[`border-top-left-8`]]: 8,
        });
    });
    it('should get undefined if to send undefined to function', () => {
        expect(getBorderCorners(undefined)).toBe(undefined);
    });
    it('should get different corners', () => {
        expect(
            getBorderCorners({
                bottomRight: 8,
                bottomLeft: 8,
                topRight: 16,
                topLeft: 16,
            }),
        ).toStrictEqual({
            [styles[`border-bottom-right-8`]]: 8,
            [styles[`border-bottom-left-8`]]: 8,
            [styles[`border-top-right-16`]]: 16,
            [styles[`border-top-left-16`]]: 16,
        });
    });
});

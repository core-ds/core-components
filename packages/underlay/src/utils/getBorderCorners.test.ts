import { getBorderCorners } from './getBorderCorners';
import styles from '../index.module.css';

describe('test function "getBorderCorners"', () => {
    it('should get same corners', () => {
        expect(getBorderCorners('m')).toStrictEqual({
            [styles[`border-bottom-right-m`]]: 'm',
            [styles[`border-bottom-left-m`]]: 'm',
            [styles[`border-top-right-m`]]: 'm',
            [styles[`border-top-left-m`]]: 'm',
        });
    });
    it('should get undefined if to send undefined to function', () => {
        expect(getBorderCorners(undefined)).toBe(undefined);
    });
    it('should get different corners', () => {
        expect(
            getBorderCorners({
                bottomRight: 'm',
                bottomLeft: 'm',
                topRight: 'xl',
                topLeft: 'xl',
            }),
        ).toStrictEqual({
            [styles[`border-bottom-right-m`]]: 'm',
            [styles[`border-bottom-left-m`]]: 'm',
            [styles[`border-top-right-xl`]]: 'xl',
            [styles[`border-top-left-xl`]]: 'xl',
        });
    });
});

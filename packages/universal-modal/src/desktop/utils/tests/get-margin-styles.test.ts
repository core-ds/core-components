import { getMarginStyles } from '../get-margin-styles';
import { Margin } from '../../../typings/margin-type';

const styles = new Proxy(
    {},
    {
        get: (_target, prop: string) => prop,
    },
);

describe('getMarginStyles', () => {
    it('without margin', () => {
        expect(getMarginStyles({ styles, margin: undefined })).toEqual([
            'marginTop-0',
            'marginRight-0',
            'marginBottom-0',
            'marginLeft-0',
        ]);
    });

    it('with margin', () => {
        const margin: Margin = { top: 48, right: 16, bottom: 24, left: 16 };

        expect(getMarginStyles({ styles, margin })).toEqual([
            'marginTop-48',
            'marginRight-16',
            'marginBottom-24',
            'marginLeft-16',
        ]);
    });

    it('partial margin', () => {
        const margin: Margin = { right: 16, left: 16 };

        expect(getMarginStyles({ styles, margin })).toEqual([
            'marginTop-0',
            'marginRight-16',
            'marginBottom-0',
            'marginLeft-16',
        ]);
    });

    it('empty margin object', () => {
        const margin: Margin = {};

        expect(getMarginStyles({ styles, margin })).toEqual([
            'marginTop-0',
            'marginRight-0',
            'marginBottom-0',
            'marginLeft-0',
        ]);
    });
});

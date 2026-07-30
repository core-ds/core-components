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
        expect(getMarginStyles({ styles, margin: undefined })).toEqual({});
    });

    it('with margin', () => {
        const margin: Margin = { top: 48, right: 16, bottom: 24, left: 16 };

        expect(getMarginStyles({ styles, margin })).toEqual({
            'marginTop-48': true,
            'marginRight-16': true,
            'marginBottom-24': true,
            'marginLeft-16': true,
        });
    });

    it('partial margin', () => {
        const margin: Margin = { right: 16, left: 16 };

        expect(getMarginStyles({ styles, margin })).toEqual({
            'marginTop-undefined': false,
            'marginRight-16': true,
            'marginBottom-undefined': false,
            'marginLeft-16': true,
        });
    });
});

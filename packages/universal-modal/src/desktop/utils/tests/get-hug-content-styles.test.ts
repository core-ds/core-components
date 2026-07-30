import { getHugContentStyles } from '../get-hug-content-styles';
import { Margin } from '../../../typings/margin-type';

const styles = new Proxy(
    {},
    {
        get: (_target, prop: string) => prop,
    },
);

describe('getHugContentStyles', () => {
    it('height !== hugContent', () => {
        expect(getHugContentStyles({ styles, margin: undefined, height: 500 })).toEqual({});
    });

    it('height === hugContent, without margin', () => {
        expect(getHugContentStyles({ styles, margin: undefined, height: 'hugContent' })).toEqual({
            hugContent: true,
        });
    });

    it('height = hugContent, with margin, with top/bottom', () => {
        const margin: Margin = { top: 48, bottom: 24 };

        expect(getHugContentStyles({ styles, margin, height: 'hugContent' })).toEqual({
            hugContent: true,
            'topGap-48': true,
            'bottomGap-24': true,
        });
    });

    it('height = hugContent, with margin, without top/bottom', () => {
        const margin: Margin = { right: 16, left: 16 };

        expect(getHugContentStyles({ styles, margin, height: 'hugContent' })).toEqual({
            hugContent: true,
            'topGap-undefined': false,
            'bottomGap-undefined': false,
        });
    });
});

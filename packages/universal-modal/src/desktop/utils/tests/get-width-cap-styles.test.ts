import { getWidthCapStyles } from '../get-width-cap-styles';
import { Margin } from '../../../typings/margin-type';

const styles = new Proxy(
    {},
    {
        get: (_target, prop: string) => prop,
    },
);

describe('getWidthCapStyles', () => {
    it('without margin', () => {
        expect(getWidthCapStyles({ styles, margin: undefined })).toEqual([
            'widthCap',
            'widthGap-0-0',
        ]);
    });

    it('with margin, with left/right', () => {
        const margin: Margin = { left: 48, right: 24 };

        expect(getWidthCapStyles({ styles, margin })).toEqual(['widthCap', 'widthGap-48-24']);
    });

    it('with margin, without left/right', () => {
        const margin: Margin = { top: 16, bottom: 16 };

        expect(getWidthCapStyles({ styles, margin })).toEqual(['widthCap', 'widthGap-0-0']);
    });

    it('with empty margin object', () => {
        const margin: Margin = {};

        expect(getWidthCapStyles({ styles, margin })).toEqual(['widthCap', 'widthGap-0-0']);
    });
});

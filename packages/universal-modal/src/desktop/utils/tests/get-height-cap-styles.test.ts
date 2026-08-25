import { getHeightCapStyles } from '../get-height-cap-styles';
import { Margin } from '../../../typings/margin-type';

const styles = new Proxy(
    {},
    {
        get: (_target, prop: string) => prop,
    },
);

describe('getHeightCapStyles', () => {
    it('without margin', () => {
        expect(getHeightCapStyles({ styles, margin: undefined })).toEqual({
            heightCap: true,
            'heightGap-0-0': true,
        });
    });

    it('with margin, with top/bottom', () => {
        const margin: Margin = { top: 48, bottom: 24 };

        expect(getHeightCapStyles({ styles, margin })).toEqual({
            heightCap: true,
            'heightGap-48-24': true,
        });
    });

    it('with margin, without top/bottom', () => {
        const margin: Margin = { left: 16, right: 16 };

        expect(getHeightCapStyles({ styles, margin })).toEqual({
            heightCap: true,
            'heightGap-0-0': true,
        });
    });

    it('with empty margin object', () => {
        const margin: Margin = {};

        expect(getHeightCapStyles({ styles, margin })).toEqual({
            heightCap: true,
            'heightGap-0-0': true,
        });
    });
});

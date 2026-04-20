import { getHeightStyle } from '../get-height-style';
import { Margin } from '../../../typings/margin-type';

const margin: Margin = { top: 2, right: 2, bottom: 2, left: 2 };

describe('getHeightStyle', () => {
    it('hugContent', () => {
        expect(getHeightStyle('hugContent', margin)).toEqual({
            maxHeight: 'calc(100% - 2px - 2px)',
        });
    });

    it('fullHeight', () => {
        expect(getHeightStyle('fullHeight', margin)).toEqual({
            height: 'calc(100% - 2px - 2px)',
        });
    });

    it('height more than viewport height', () => {
        expect(getHeightStyle(2048, margin)).toEqual({
            height: 'calc(100% - 2px - 2px)',
        });
    });

    it('height', () => {
        expect(getHeightStyle(2, margin)).toEqual({
            height: 2,
        });
    });
});

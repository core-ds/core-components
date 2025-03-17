import { forwardRef } from 'react';
import { BaseCheckboxGroup } from './Component';

describe('BaseCheckboxGroup', () => {
    it('should be wrapped in forwardRef', () => {
        const forwardRefType = forwardRef(() => null).$$typeof;

        expect(BaseCheckboxGroup.$$typeof).toEqual(forwardRefType);
    });
});

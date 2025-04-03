import React, { createRef } from 'react';
import { render } from '@testing-library/react';
import { BaseCheckboxGroup } from './Component';

describe('BaseCheckboxGroup', () => {
    it('should pass the ref to the DOM element', () => {
        const styles = { mockClassName: 'mockStyles' };
        const passedRef = createRef<HTMLDivElement>();

        render(
            <BaseCheckboxGroup ref={passedRef} styles={styles}>
                <div>Test Child</div>
            </BaseCheckboxGroup>,
        );

        expect(passedRef.current).not.toBeNull();
    });
});

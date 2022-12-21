/* eslint-disable no-shadow */
import React from 'react';
import { render, screen } from '@testing-library/react';
import { Addon } from './component';

describe('GenericWrapper.Addon', () => {
    it('should set data-test-id attribute', () => {
        render(<Addon dataTestId='data-test-id'>test</Addon>);

        screen.getByTestId('data-test-id');
    });

    it('should set custom className', () => {
        render(
            <Addon dataTestId='data-test-id' className='className'>
                test
            </Addon>,
        );

        expect(screen.getByTestId('data-test-id').classList.contains('className')).toBe(true);
    });
});

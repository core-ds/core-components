/* eslint-disable no-shadow */
import React from 'react';
import { render, screen } from '@testing-library/react';
import { Addon } from '.';

describe('GenericWrapper.DataContent.Addon', () => {
    it('should set data-test-id attribute', () => {
        render(<Addon leftSide={{ content: 'test' }} dataTestId='data-test-id' />);

        screen.getByTestId('data-test-id');
    });

    it('should set custom className', () => {
        render(
            <Addon
                leftSide={{ content: 'testLeft', className: 'leftSide' }}
                rightSide={{ content: 'testRight', className: 'rightSide' }}
                dataTestId='data-test-id'
                className='className'
            />,
        );

        expect(screen.getByTestId('data-test-id').classList.contains('className')).toBe(true);
        expect(screen.getByText('testLeft').classList.contains('leftSide')).toBe(true);
        expect(screen.getByText('testRight').classList.contains('rightSide')).toBe(true);
    });
});

/* eslint-disable no-shadow */
import React from 'react';
import { render, screen } from '@testing-library/react';
import { DataContent } from '.';

describe('GenericWrapper.DataContent', () => {
    it('should set data-test-id attribute', () => {
        render(
            <DataContent dataTestId='data-test-id'>
                <DataContent.Addon leftSide={{ content: 'test' }} />
            </DataContent>,
        );

        screen.getByTestId('data-test-id');
    });

    it('should set custom className', () => {
        render(
            <DataContent dataTestId='data-test-id' className='className'>
                <DataContent.Addon leftSide={{ content: 'test' }} />
            </DataContent>,
        );

        expect(screen.getByTestId('data-test-id').classList.contains('className')).toBe(true);
    });
});

/* eslint-disable no-shadow */
import React from 'react';
import { render, screen } from '@testing-library/react';
import { GenericWrapper, ReducedGapType } from './Component';

describe('GenericWrapper', () => {
    it('should render child elements correctly', () => {
        render(
            <GenericWrapper
                padding={{ top: 'm' as unknown as ReducedGapType }}
                alignItems='center'
                justifyContent='center'
            >
                <GenericWrapper>random string</GenericWrapper>
                <GenericWrapper>
                    <div>random div</div>
                </GenericWrapper>
                <GenericWrapper>
                    <input placeholder='test-input' />
                </GenericWrapper>
            </GenericWrapper>,
        );

        screen.getByText('random string');
        screen.getByText('random div');
        screen.getByPlaceholderText('test-input');
    });

    it('should set data-test-id attribute', () => {
        render(
            <GenericWrapper dataTestId='data-test-id'>
                <GenericWrapper>test</GenericWrapper>
            </GenericWrapper>,
        );

        screen.getByTestId('data-test-id');
    });

    it('should set custom className', () => {
        render(
            <GenericWrapper dataTestId='data-test-id' className='className'>
                <GenericWrapper>test</GenericWrapper>
            </GenericWrapper>,
        );

        expect(screen.getByTestId('data-test-id').classList.contains('className')).toBe(true);
    });

    it('should set class `gap`', () => {
        const { container } = render(
            <GenericWrapper gap={2}>
                <GenericWrapper>test</GenericWrapper>
            </GenericWrapper>,
        );

        expect(container.firstElementChild).toHaveClass('gap-2');
    });
});

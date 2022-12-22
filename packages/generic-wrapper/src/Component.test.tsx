/* eslint-disable no-shadow */
import React from 'react';
import { render, screen } from '@testing-library/react';
import { GenericWrapper, ReducedGapType } from './Component';

describe('GenericWrapper', () => {
    it('should render GenericWrapper.Addon correctly inside of GenericWrapper', () => {
        render(
            <GenericWrapper
                padding={{ top: 'm' as unknown as ReducedGapType }}
                alignItems='center'
                justifyContent='center'
            >
                <GenericWrapper.Addon>random string</GenericWrapper.Addon>
                <GenericWrapper.Addon>
                    <div>random div</div>
                </GenericWrapper.Addon>
                <GenericWrapper.Addon>
                    <GenericWrapper.DataContent>
                        <GenericWrapper.Line
                            leftSide={{ content: 'leftSide' }}
                            rightSide={{
                                content: 'rightSide',
                                gapSize: 'm' as unknown as ReducedGapType,
                            }}
                            alignItems='center'
                        />
                    </GenericWrapper.DataContent>
                </GenericWrapper.Addon>
            </GenericWrapper>,
        );

        screen.getByText('random div');
        screen.getByText('random string');
        screen.getByText('leftSide');
        screen.getByText('rightSide');
    });

    it('should set data-test-id attribute', () => {
        render(
            <GenericWrapper dataTestId='data-test-id'>
                <GenericWrapper.Addon>test</GenericWrapper.Addon>
            </GenericWrapper>,
        );

        screen.getByTestId('data-test-id');
    });

    it('should set custom className', () => {
        render(
            <GenericWrapper dataTestId='data-test-id' className='className'>
                <GenericWrapper.Addon>test</GenericWrapper.Addon>
            </GenericWrapper>,
        );

        expect(screen.getByTestId('data-test-id').classList.contains('className')).toBe(true);
    });
});

describe('GenericWrapper.DataContent', () => {
    it('should set data-test-id attribute', () => {
        render(
            <GenericWrapper.DataContent dataTestId='data-test-id'>
                <GenericWrapper.Line leftSide={{ content: 'test' }} />
            </GenericWrapper.DataContent>,
        );

        screen.getByTestId('data-test-id');
    });

    it('should set custom className', () => {
        render(
            <GenericWrapper.DataContent dataTestId='data-test-id' className='className'>
                <GenericWrapper.Line leftSide={{ content: 'test' }} />
            </GenericWrapper.DataContent>,
        );

        expect(screen.getByTestId('data-test-id').classList.contains('className')).toBe(true);
    });
});

describe('GenericWrapper.Line', () => {
    it('should set data-test-id attribute', () => {
        render(<GenericWrapper.Line leftSide={{ content: 'test' }} dataTestId='data-test-id' />);

        screen.getByTestId('data-test-id');
    });

    it('should set custom className', () => {
        render(
            <GenericWrapper.Line
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

describe('GenericWrapper.Addon', () => {
    it('should set data-test-id attribute', () => {
        render(<GenericWrapper.Addon dataTestId='data-test-id'>test</GenericWrapper.Addon>);

        screen.getByTestId('data-test-id');
    });

    it('should set custom className', () => {
        render(
            <GenericWrapper.Addon dataTestId='data-test-id' className='className'>
                test
            </GenericWrapper.Addon>,
        );

        expect(screen.getByTestId('data-test-id').classList.contains('className')).toBe(true);
    });
});

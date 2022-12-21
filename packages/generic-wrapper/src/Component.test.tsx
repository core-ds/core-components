/* eslint-disable no-shadow */
import React from 'react';
import { render, screen } from '@testing-library/react';
import { GenericWrapper, ReducedGapType } from '.';

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
                        <GenericWrapper.DataContent.Addon
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

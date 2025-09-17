import React from 'react';
import { fireEvent, render } from '@testing-library/react';

import { Underlay } from './index';

describe('Underlay', () => {
    describe('Snapshots tests', () => {
        it('should match snapshot', () => {
            const { container } = render(
                <Underlay
                    borderSize={2}
                    backgroundColor='info'
                    borderColor='graphic-link'
                    shadow='shadow-l'
                >
                    Content
                </Underlay>,
            );

            expect(container).toMatchSnapshot();
        });
    });

    it('should set `data-test-id` attribute', () => {
        const dataTestId = 'test-id';
        const { getByTestId } = render(<Underlay dataTestId={dataTestId} />);

        expect(getByTestId(dataTestId).tagName).toBe('DIV');
    });

    describe('Classes tests', () => {
        it('should set `className` class', () => {
            const className = 'test-class';
            const dataTestId = 'test-id';
            const { getByTestId } = render(
                <Underlay className={className} dataTestId={dataTestId} />,
            );

            expect(getByTestId(dataTestId)).toHaveClass(className);
        });

        it('should set `background-accent` class if `backgroundColor` prop is `accent`', () => {
            const backgroundColor = 'accent';
            const dataTestId = 'test-id';
            const { getByTestId } = render(
                <Underlay backgroundColor={backgroundColor} dataTestId={dataTestId} />,
            );

            expect(getByTestId(dataTestId)).toHaveClass(`background-${backgroundColor}`);
        });

        it('should set `border-color-accent` class if `borderColor` prop is `accent`', () => {
            const borderColor = 'accent';
            const dataTestId = 'test-id';
            const { getByTestId } = render(
                <Underlay borderColor={borderColor} dataTestId={dataTestId} />,
            );

            expect(getByTestId(dataTestId)).toHaveClass(`border-color-${borderColor}`);
        });

        it('should set `shadow-xs` class if `shadow` prop is `shadow-xs`', () => {
            const shadow = 'shadow-xs';
            const dataTestId = 'test-id';
            const { getByTestId } = render(<Underlay shadow={shadow} dataTestId={dataTestId} />);

            expect(getByTestId(dataTestId)).toHaveClass(shadow);
        });

        it('should set `border-width-1` class if `borderSize` prop is `1`', () => {
            const borderSize = 1;
            const dataTestId = 'test-id';
            const { getByTestId } = render(
                <Underlay borderSize={borderSize} dataTestId={dataTestId} />,
            );

            expect(getByTestId(dataTestId)).toHaveClass(`border-width-${borderSize}`);
        });
    });

    describe('Callbacks tests', () => {
        it('should call `onClick` prop', async () => {
            const cb = jest.fn();
            const dataTestId = 'test-id';
            const { getByTestId } = render(<Underlay onClick={cb} dataTestId={dataTestId} />);

            const el = getByTestId(dataTestId);

            fireEvent.click(el);

            expect(cb).toHaveBeenCalledTimes(1);
        });
    });

    it('should unmount without errors', () => {
        const { unmount } = render(<Underlay />);

        expect(unmount).not.toThrow();
    });
});

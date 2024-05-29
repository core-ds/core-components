import React from 'react';
import { render, screen } from '@testing-library/react';

import { StatusBadge, StatusBadgeProps } from '.';

const viewOptions: StatusBadgeProps['view'][] = [
    'positive-checkmark',
    'negative-cross',
    'negative-alert',
    'negative-block',
    'attention-alert',
    'neutral-information',
    'neutral-operation',
    'neutral-cross',
];

const sizeOptions: StatusBadgeProps['size'][] = [16, 20, 24, 32, 40];

describe('Badge', () => {
    describe('Snapshots tests', () => {
        for (const view of viewOptions) {
            it('should match snapshot with view=' + view, () => {
                const { container } = render(<StatusBadge view={view} />);

                expect(container).toMatchSnapshot();
            });
        }
    });

    it('should set `data-test-id` attribute', () => {
        const dataTestId = 'test-id';
        const { getByTestId } = render(
            <StatusBadge view='positive-checkmark' dataTestId={dataTestId} />,
        );

        expect(getByTestId(dataTestId).tagName).toBe('DIV');
    });

    describe('Classes tests', () => {
        it('should set `className` class', () => {
            const dataTestId = 'test-id';
            const className = 'test-class';
            const { getByTestId } = render(
                <StatusBadge
                    view='positive-checkmark'
                    className={className}
                    dataTestId={dataTestId}
                />,
            );

            expect(getByTestId(dataTestId)).toHaveClass(className);
        });

        for (const view of viewOptions) {
            it(`should set ${view} class`, () => {
                const { container } = render(<StatusBadge view={view} />);

                expect(container.getElementsByClassName('component')[0]).toHaveClass(view);
            });
        }

        for (const size of sizeOptions) {
            it(`should set size-${size} class`, () => {
                const { container } = render(<StatusBadge view='positive-checkmark' size={size} />);

                expect(container.getElementsByClassName('component')[0]).toHaveClass(
                    `size-${size}`,
                );
            });
        }
    });

    it('should unmount without errors', () => {
        const { unmount } = render(<StatusBadge view='positive-checkmark' />);

        expect(unmount).not.toThrowError();
    });

    describe('Custom icons', () => {
        it('Check custom icon', () => {
            render(
                <StatusBadge
                    view='positive-checkmark'
                    size={24}
                    customIcons={{ 'positive-checkmark': { 24: () => <div>Icon</div> } }}
                />,
            );

            expect(screen.queryByText('Icon')).toBeTruthy();
        });

        it('Custom icon snapshot', () => {
            const { container } = render(
                <StatusBadge
                    view='positive-checkmark'
                    size={24}
                    customIcons={{ 'positive-checkmark': { 24: () => <div>Icon</div> } }}
                />,
            );

            expect(container).toMatchSnapshot();
        });
    });
});

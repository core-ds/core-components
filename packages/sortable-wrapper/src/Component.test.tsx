import React from 'react';
import { act, fireEvent, render } from '@testing-library/react';
import { SortableWrapper, SortableWrapperProps } from '.';

const testId = 'sortable';
const containerTestId = `${testId}-container`;
const itemTestId = `${testId}-item`;

const TestSortableWrapper = (props?: Partial<SortableWrapperProps>) => {
    return (
        <SortableWrapper
            {...props}
            dataTestId={testId}
            items={[{ id: 1 }]}
            renderItem={(item) => <div>{item.id}</div>}
        />
    );
};

describe('Scrollbar', () => {
    describe('Display tests', () => {
        it('should display correctly', () => {
            const { container } = render(<TestSortableWrapper />);

            expect(container).toMatchSnapshot();
        });
    });

    describe('Props tests', () => {
        it('should set className on container', async () => {
            const containerClassName = 'container';
            const itemClassName = 'itemClassName';
            const { getByTestId } = render(
                <TestSortableWrapper
                    className={containerClassName}
                    itemClassName={itemClassName}
                />,
            );

            const container = getByTestId(containerTestId);
            const item = getByTestId(itemTestId + '_1');

            expect(item).toHaveClass(itemClassName);
            expect(container).toHaveClass(containerClassName);
        });

        it('should set paddings', async () => {
            const { getByTestId } = render(
                <TestSortableWrapper
                    padding={{ top: '3xs', right: 'm', bottom: '2xs', left: 's' }}
                />,
            );

            const container = getByTestId(containerTestId);

            expect(container).toHaveClass(
                'padding-top-3xs',
                'padding-right-m',
                'padding-bottom-2xs',
                'padding-left-s',
            );
        });

        it('should set view', async () => {
            const { getByTestId } = render(<TestSortableWrapper view='secondary' />);

            const container = getByTestId(containerTestId);
            const item = getByTestId(itemTestId + '_1');

            expect(container).toHaveClass('secondary');
            expect(item).toHaveClass('secondary');
        });

        it('should call onDragStart', async () => {
            const onDragStart = jest.fn();

            const { getByTestId } = render(<TestSortableWrapper onDragStart={onDragStart} />);

            const item = getByTestId(itemTestId + '_1');

            await act(async () => {
                fireEvent.mouseDown(item);
            });

            expect(onDragStart).toBeCalledTimes(1);
        });

        it('should set border-radius', async () => {
            const { getByTestId } = render(<TestSortableWrapper borderRadius='m' />);

            const container = getByTestId(containerTestId);
            const item = getByTestId(itemTestId + '_1');

            expect(container).toHaveClass('border-radius-m');
            expect(item).toHaveClass('border-radius-m');
        });

        it('should set activator class', async () => {
            const { getByTestId } = render(<TestSortableWrapper activatorNode='control' />);

            const item = getByTestId(itemTestId + '_1');

            expect(item).toHaveClass('activator-control');
        });
    });

    describe('Render tests', () => {
        it('should unmount without errors', () => {
            const { unmount } = render(<TestSortableWrapper />);

            expect(unmount).not.toThrowError();
        });
    });
});

import React from 'react';
import { act, fireEvent, render } from '@testing-library/react';
import { SortableList, SortableListProps } from '.';
import { getSortableListTestIds } from './utils';

const items = [{ id: 1 }];
const testId = 'sortable';
const containerTestId = `${testId}-container`;
const itemTestId = `${testId}-item`;

const SortableListWrapper = (props?: Partial<SortableListProps>) => {
    return (
        <SortableList
            {...props}
            dataTestId={testId}
            items={items}
            renderItem={(item) => <div>{item.id}</div>}
        />
    );
};

describe('ScrollableList', () => {
    describe('Display tests', () => {
        it('should display correctly', () => {
            const { container } = render(<SortableListWrapper />);

            expect(container).toMatchSnapshot();
        });
    });

    describe('Props tests', () => {
        it('should set className on container', async () => {
            const containerClassName = 'container';
            const itemClassName = 'itemClassName';
            const { getByTestId } = render(
                <SortableListWrapper
                    className={containerClassName}
                    itemClassName={itemClassName}
                />,
            );

            const container = getByTestId(containerTestId);
            const item = getByTestId(itemTestId + '_1');

            expect(item).toHaveClass(itemClassName);
            expect(container).toHaveClass(containerClassName);
        });

        it('should set itemContentClassName on item content wrapper', async () => {
            const itemContentClassName = 'itemContentClassName';
            const { getByTestId } = render(
                <SortableListWrapper itemContentClassName={itemContentClassName} />,
            );

            const item = getByTestId(itemTestId + '_1');

            expect(item.firstElementChild).toHaveClass(itemContentClassName);
        });

        it('should set paddings as obj prop', async () => {
            const { getByTestId } = render(
                <SortableListWrapper
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

        it('should set paddings as string prop', async () => {
            const { getByTestId } = render(<SortableListWrapper padding='m' />);

            const container = getByTestId(containerTestId);

            expect(container).toHaveClass(
                'padding-top-m',
                'padding-right-m',
                'padding-bottom-m',
                'padding-left-m',
            );
        });

        it('should set view', async () => {
            const { getByTestId } = render(<SortableListWrapper view='secondary' />);

            const container = getByTestId(containerTestId);
            const item = getByTestId(itemTestId + '_1');

            expect(container).toHaveClass('secondary');
            expect(item).toHaveClass('secondary');
        });

        it('should call onDragStart', async () => {
            const onDragStart = jest.fn();

            const { getByTestId } = render(<SortableListWrapper onDragStart={onDragStart} />);

            const item = getByTestId(itemTestId + '_1');

            await act(async () => {
                fireEvent.mouseDown(item);
            });

            expect(onDragStart).toBeCalledTimes(1);
        });

        it('should call onDragEnd', async () => {
            const onDragEnd = jest.fn();

            const { getByTestId } = render(<SortableListWrapper onDragEnd={onDragEnd} />);

            const item = getByTestId(itemTestId + '_1');

            await act(async () => {
                fireEvent.mouseDown(item);
            });

            await act(async () => {
                fireEvent.mouseUp(item);
            });

            expect(onDragEnd).toBeCalledTimes(1);
            expect(onDragEnd).toBeCalledWith(expect.anything(), items);
        });

        it('should set border-radius', async () => {
            const { getByTestId } = render(<SortableListWrapper borderRadius='m' />);

            const container = getByTestId(containerTestId);
            const item = getByTestId(itemTestId + '_1');

            expect(container).toHaveClass('border-radius-m');
            expect(item).toHaveClass('border-radius-m');
        });

        it('should set activator class', async () => {
            const { getByTestId } = render(<SortableListWrapper activatorNode='control' />);

            const item = getByTestId(itemTestId + '_1');

            expect(item).toHaveClass('activator-control');
        });

        it('should set control-padding-right class', () => {
            const { getByTestId } = render(<SortableListWrapper controlPadding='s' />);

            const item = getByTestId(itemTestId + '_1');
            const icon = item.childNodes[1];

            expect(icon).toHaveClass('control-right-padding-s');
        });

        it('should set control-padding-left class', () => {
            const { getByTestId } = render(
                <SortableListWrapper controlPadding='s' controlPosition='left' />,
            );

            const item = getByTestId(itemTestId + '_1');
            const icon = item.childNodes[0];

            expect(icon).toHaveClass('control-left-padding-s');
        });

        it('should have data-test-id', () => {
            const { getByTestId } = render(<SortableListWrapper />);

            const testIds = getSortableListTestIds(testId, 1);

            expect(getByTestId(testIds.sortableList)).toBeInTheDocument();
            expect(getByTestId(testIds.item)).toBeInTheDocument();
        });
    });

    describe('Render tests', () => {
        it('should unmount without errors', () => {
            const { unmount } = render(<SortableListWrapper />);

            expect(unmount).not.toThrowError();
        });
    });
});

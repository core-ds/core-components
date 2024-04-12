import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';

import { Segment, SegmentedControl, SegmentedControlProps } from './index';

const SEGMENT_TEST_ID = 'SEGMENT';

const renderComponent = ({
    selectedId,
    onChange,
    ...restProps
}: Omit<SegmentedControlProps, 'children'>) => (
    <SegmentedControl onChange={onChange} selectedId={selectedId} {...restProps}>
        <Segment id={1} title={'Label 1'} />
        <Segment dataTestId={SEGMENT_TEST_ID} id={2} title={'Label 2'} />
        <Segment id={3} title={'Label 3'} />
        <Segment id={4} title={'Label 4'} />
    </SegmentedControl>
);

describe('segmented-control', () => {
    it('should display correctly', () => {
        const { container } = render(renderComponent({ onChange: () => null, selectedId: 1 }));
        expect(container).toMatchSnapshot();
    });

    it('should onChange get correct id', () => {
        const onChange = jest.fn();
        render(
            renderComponent({
                onChange,
                selectedId: 1,
            }),
        );

        fireEvent.click(screen.getByTestId(SEGMENT_TEST_ID));

        expect(onChange).toBeCalledWith(2);
    });

    it('should set dataTestId', () => {
        const dataTestId = 'data-test-id';
        const { getByTestId } = render(
            renderComponent({ selectedId: 2, onChange: () => null, dataTestId }),
        );

        expect(getByTestId(dataTestId)).toBeInTheDocument();
    });

    it('should set className', () => {
        const className = 'customClassName';
        const { container } = render(
            renderComponent({
                onChange: () => null,
                className,
                selectedId: 2,
            }),
        );

        expect(container.firstElementChild).toHaveClass(className);
    });

    it('should set custom style', () => {
        const style = { padding: 20 };
        const { container } = render(
            renderComponent({
                onChange: () => null,
                style,
                selectedId: 2,
            }),
        );

        const firstElement = container.firstChild;

        expect(firstElement).toHaveStyle('padding: 20px');
    });
});

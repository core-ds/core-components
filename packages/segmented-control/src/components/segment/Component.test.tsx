import React from 'react';

import { fireEvent, render } from '@testing-library/react';
import { AScoresCircleMIcon } from '@alfalab/icons-glyph/AScoresCircleMIcon';

import { Segment, SegmentProps } from '../../index';
import { SegmentedControlContext } from '../../context';

const renderComponent = ({ id, title, ...restProps }: SegmentProps) => (
    <Segment id={id} title={title} {...restProps} />
);

describe('segment', () => {
    it('should display correctly', () => {
        const { container } = render(renderComponent({ id: 1, title: 'Title' }));

        expect(container).toMatchSnapshot();
    });

    it('should set className', () => {
        const className = 'customClassName';
        const { container } = render(renderComponent({ id: 1, title: 'Label', className }));

        expect(container.firstElementChild).toHaveClass(className);
    });

    it('should set dataTestId', () => {
        const dataTestId = 'custom-data-test-id';
        const { getByTestId } = render(renderComponent({ id: 1, title: 'Label', dataTestId }));

        expect(getByTestId(dataTestId)).toBeInTheDocument();
    });

    it('should call onChange on click', () => {
        const onChange = jest.fn();
        const dataTestId = 'dataTestIDD';

        const { getByTestId } = render(
            <SegmentedControlContext.Provider value={{ onChange }}>
                {renderComponent({ id: 1, title: 'Label', dataTestId })}
            </SegmentedControlContext.Provider>,
        );

        fireEvent.click(getByTestId(dataTestId));

        expect(onChange).toHaveBeenCalledTimes(1);
    });

    it('render with icon as title', () => {
        const { container } = render(
            renderComponent({ id: 1, title: React.createElement(AScoresCircleMIcon) }),
        );

        expect(container).toMatchSnapshot();
    });
});

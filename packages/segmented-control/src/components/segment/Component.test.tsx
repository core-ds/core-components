import React from 'react';

import { fireEvent, render } from '@testing-library/react';
import { AScoresCircleMIcon } from '@alfalab/icons-glyph/AScoresCircleMIcon';
import { Diamonds20Icon } from '@alfalab/icons-glyph-26/Diamonds20Icon';

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

    it('should not render addons by default', () => {
        const dataTestId = 'segment';
        const { queryByTestId } = render(renderComponent({ id: 1, title: 'Label', dataTestId }));

        expect(queryByTestId(`${dataTestId}-left-addon`)).not.toBeInTheDocument();
        expect(queryByTestId(`${dataTestId}-right-addon`)).not.toBeInTheDocument();
    });

    it('should render left and right addons', () => {
        const dataTestId = 'segment';
        const { getByTestId } = render(
            renderComponent({
                id: 1,
                title: 'Label',
                dataTestId,
                addons: {
                    left: { content: <span data-test-id='left-icon' /> },
                    right: { content: <span data-test-id='right-icon' /> },
                },
            }),
        );

        const left = getByTestId(`${dataTestId}-left-addon`);
        const right = getByTestId(`${dataTestId}-right-addon`);

        expect(left).toContainElement(getByTestId('left-icon'));
        expect(right).toContainElement(getByTestId('right-icon'));
        expect(left).toHaveAttribute('aria-hidden', 'true');
        expect(right).toHaveAttribute('aria-hidden', 'true');
    });

    it('should render only left addon', () => {
        const dataTestId = 'segment';
        const { getByTestId, queryByTestId } = render(
            renderComponent({
                id: 1,
                title: 'Label',
                dataTestId,
                addons: { left: { content: <Diamonds20Icon /> } },
            }),
        );

        expect(getByTestId(`${dataTestId}-left-addon`)).toBeInTheDocument();
        expect(queryByTestId(`${dataTestId}-right-addon`)).not.toBeInTheDocument();
    });

    it('should not render title wrapper when title is null', () => {
        const dataTestId = 'segment';
        const { getByTestId } = render(
            renderComponent({
                id: 1,
                title: null,
                dataTestId,
                addons: { left: { content: <span /> } },
            }),
        );

        expect(getByTestId(dataTestId).querySelector('.title')).toBeNull();
        expect(getByTestId(`${dataTestId}-left-addon`)).toBeInTheDocument();
    });

    it('render with icon as title', () => {
        const { container } = render(
            renderComponent({ id: 1, title: React.createElement(AScoresCircleMIcon) }),
        );

        expect(container).toMatchSnapshot();
    });
});

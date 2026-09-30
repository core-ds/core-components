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

        expect(onChange).toHaveBeenCalledWith(2);
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

    it('should not apply contentWidth class by default', () => {
        const dataTestId = 'data-test-id';
        const { getByTestId } = render(
            renderComponent({ onChange: () => null, selectedId: 1, dataTestId }),
        );

        expect(getByTestId(dataTestId).firstElementChild).not.toHaveClass('contentWidth');
    });

    it('should apply contentWidth class when segmentWidth is content', () => {
        const dataTestId = 'data-test-id';
        const { getByTestId } = render(
            renderComponent({
                onChange: () => null,
                selectedId: 1,
                dataTestId,
                segmentWidth: 'content',
            }),
        );

        expect(getByTestId(dataTestId).firstElementChild).toHaveClass('contentWidth');
    });

    it('should indent title on the side without addon', () => {
        const { getByTestId } = render(
            <SegmentedControl onChange={() => null} selectedId={1} size={48}>
                <Segment
                    id={1}
                    dataTestId='left'
                    title='Label 1'
                    addons={{ left: { content: <svg /> } }}
                />
                <Segment
                    id={2}
                    dataTestId='right'
                    title='Label 2'
                    addons={{ right: { content: <svg /> } }}
                />
                <Segment
                    id={3}
                    dataTestId='both'
                    title='Label 3'
                    addons={{ left: { content: <svg /> }, right: { content: <svg /> } }}
                />
            </SegmentedControl>,
        );

        const getTitle = (testId: string) => getByTestId(testId).querySelector('.title');

        expect(getTitle('left')).toHaveClass('titleIndentRight48');
        expect(getTitle('left')).not.toHaveClass('titleIndentLeft48');
        expect(getTitle('right')).toHaveClass('titleIndentLeft48');
        expect(getTitle('right')).not.toHaveClass('titleIndentRight48');
        expect(getTitle('both')).not.toHaveClass('titleIndentLeft48');
        expect(getTitle('both')).not.toHaveClass('titleIndentRight48');
    });

    it('should not apply withAddons class when addons object is empty', () => {
        const { getByTestId } = render(
            <SegmentedControl onChange={() => null} selectedId={1}>
                <Segment
                    id={1}
                    dataTestId='empty'
                    title='Label 1'
                    addons={{ left: undefined, right: undefined }}
                />
                <Segment
                    id={2}
                    dataTestId='left'
                    title='Label 2'
                    addons={{ left: { content: <svg /> } }}
                />
            </SegmentedControl>,
        );

        expect(getByTestId('empty')).not.toHaveClass('withAddons');
        expect(getByTestId('left')).toHaveClass('withAddons');
    });

    it('should render skeleton when skeleton.visible is true', () => {
        const dataTestId = 'skeleton-test-id';
        render(
            renderComponent({
                onChange: () => null,
                selectedId: 2,
                skeleton: { visible: true },
                dataTestId,
            }),
        );

        expect(screen.getByTestId(dataTestId)).toBeInTheDocument();
        expect(screen.queryByTestId(SEGMENT_TEST_ID)).not.toBeInTheDocument();
    });
});

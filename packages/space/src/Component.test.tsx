import React, { FC, useEffect } from 'react';
import { fireEvent, render } from '@testing-library/react';

import { CardImage } from '@alfalab/core-components-card-image';

import { Space } from './index';

// TODO: more tests
describe('Space', () => {
    describe('Display tests', () => {
        it('should display with children like boolean or string or others react children type correctly', () => {
            expect(
                render(
                    <Space>
                        {0 && <CardImage cardId='EG' />}
                        {false && <CardImage cardId='GQ' />}
                        {null && <CardImage cardId='SU' />}
                        {'' && <CardImage cardId='EG' />}
                    </Space>,
                ),
            ).toMatchSnapshot();
        });

        it('should display radio group with one child correctly', () => {
            expect(
                render(
                    <Space>
                        <CardImage cardId='EG' />
                    </Space>,
                ),
            ).toMatchSnapshot();
        });

        it('should not add trailing margin when the last child renders null', () => {
            const Empty = () => null;

            const { container } = render(
                <Space useCssGaps={false} direction='vertical' size={[8, 20]}>
                    <div>Visible child</div>
                    <Empty />
                </Space>,
            );

            const space = container.firstElementChild;
            const visibleItem = space?.firstElementChild;
            const emptyItem = space?.lastElementChild;
            const visibleItems = space?.querySelectorAll('.spaceItem:not(:empty)');
            const lastVisibleItem = visibleItems?.item((visibleItems?.length ?? 0) - 1);

            expect(visibleItem).toHaveStyle('margin-bottom: 20px');
            expect(lastVisibleItem).toBe(visibleItem);
            expect(emptyItem).toBeEmptyDOMElement();
        });

        it('should not add gap before the first visible child without css gaps', () => {
            const Empty = () => null;

            const { container } = render(
                <Space useCssGaps={false} direction='vertical'>
                    <Empty />
                    <div>First visible child</div>
                    <div>Second visible child</div>
                </Space>,
            );

            const space = container.firstElementChild;
            const emptyItem = space?.firstElementChild;
            const firstVisibleItem = emptyItem?.nextElementSibling;
            const secondVisibleItem = firstVisibleItem?.nextElementSibling;

            expect(emptyItem).toBeEmptyDOMElement();
            expect(firstVisibleItem).toHaveStyle('margin-bottom: 16px');
            expect(secondVisibleItem).not.toHaveStyle('margin-bottom: 16px');
        });

        it('should preserve gaps between visible children separated by empty children without css gaps', () => {
            const Empty = () => null;

            const { container } = render(
                <Space useCssGaps={false} direction='vertical'>
                    <div>First visible child</div>
                    <Empty />
                    <div>Second visible child</div>
                    <Empty />
                    <div>Third visible child</div>
                </Space>,
            );

            const space = container.firstElementChild;
            const firstVisibleItem = space?.firstElementChild;
            const firstEmptyItem = firstVisibleItem?.nextElementSibling;
            const secondVisibleItem = firstEmptyItem?.nextElementSibling;
            const secondEmptyItem = secondVisibleItem?.nextElementSibling;
            const thirdVisibleItem = secondEmptyItem?.nextElementSibling;

            expect(firstEmptyItem).toBeEmptyDOMElement();
            expect(secondEmptyItem).toBeEmptyDOMElement();
            expect(firstVisibleItem).toHaveStyle('margin-bottom: 16px');
            expect(secondVisibleItem).toHaveStyle('margin-bottom: 16px');
            expect(thirdVisibleItem).not.toHaveStyle('margin-bottom: 16px');
        });

        it('should preserve gaps between horizontal children without css gaps', () => {
            const Empty = () => null;

            const { container } = render(
                <Space useCssGaps={false} direction='horizontal' size={[8, 20]}>
                    <div>First child</div>
                    <div>Second child</div>
                    <Empty />
                </Space>,
            );

            const space = container.firstElementChild;
            const firstItem = space?.firstElementChild;
            const secondItem = firstItem?.nextElementSibling;
            const emptyItem = space?.lastElementChild;

            const visibleItems = space?.querySelectorAll('.spaceItem:not(:empty)');
            const lastVisibleItem = visibleItems?.item((visibleItems?.length ?? 0) - 1);

            expect(firstItem).toHaveStyle('margin-right: 8px');
            expect(secondItem).toHaveStyle('margin-right: 8px');
            expect(lastVisibleItem).toBe(secondItem);
            expect(emptyItem).toBeEmptyDOMElement();
        });

        it('should update the last visible item when a child stops rendering content', () => {
            const Toggle = () => {
                const [visible, setVisible] = React.useState(true);

                return visible ? (
                    <button type='button' onClick={() => setVisible(false)}>
                        Hide
                    </button>
                ) : null;
            };

            const { container, getByRole } = render(
                <Space useCssGaps={false} direction='vertical'>
                    <div>Visible child</div>
                    <Toggle />
                </Space>,
            );

            const space = container.firstElementChild;
            const firstItem = space?.firstElementChild;
            const secondItem = firstItem?.nextElementSibling;
            const getLastVisibleItem = () => {
                const visibleItems = space?.querySelectorAll('.spaceItem:not(:empty)');

                return visibleItems?.item((visibleItems?.length ?? 0) - 1);
            };

            expect(getLastVisibleItem()).toBe(secondItem);

            fireEvent.click(getByRole('button'));

            expect(secondItem).toBeEmptyDOMElement();
            expect(getLastVisibleItem()).toBe(firstItem);
        });

        it('should unmount only 1 child component when it removed', () => {
            const unmountSpy = jest.fn();

            const Child: FC<{ id: string; handlerUnmount: jest.Mock }> = ({
                id,
                handlerUnmount,
            }) => {
                useEffect(() => {
                    return () => {
                        handlerUnmount(id);
                    };
                }, [id, handlerUnmount]);

                return <div>Child {id}</div>;
            };

            const { rerender } = render(
                <Space>
                    <Child key='1' id='1' handlerUnmount={unmountSpy} />
                    <Child key='2' id='2' handlerUnmount={unmountSpy} />
                    <Child key='3' id='3' handlerUnmount={unmountSpy} />
                </Space>,
            );

            rerender(
                <Space>
                    <Child key='1' id='1' handlerUnmount={unmountSpy} />
                    <Child key='3' id='3' handlerUnmount={unmountSpy} />
                </Space>,
            );

            expect(unmountSpy).toHaveBeenCalledTimes(1);
            expect(unmountSpy).toHaveBeenCalledWith('2');
        });
    });
});

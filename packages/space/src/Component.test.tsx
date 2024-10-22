import React, { FC, useEffect } from 'react';
import { render } from '@testing-library/react';

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

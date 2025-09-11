import React from 'react';
import { render } from '@testing-library/react';

import { Accordion, AccordionProps } from '.';

const renderComponent = (props: Partial<AccordionProps> = {}) =>
    render(
        <Accordion header='Зачем нужен аккордeон?' {...props}>
            Используется для создания интерактивных списков, которые можно разворачивать и
            сворачивать для отображения дополнительной информации
        </Accordion>,
    );

describe('Accordion', () => {
    describe('Display test', () => {
        it('should match snapshots for base', () => {
            const { container } = renderComponent();

            expect(container).toMatchSnapshot();
        });
    });

    describe('Accordion className test', () => {
        it('should set "dataTestId" prop', () => {
            const dataTestId = 'data-test-id';
            const { getByTestId } = renderComponent({ dataTestId });

            expect(getByTestId(dataTestId).tagName).toBe('DIV');
        });

        it('should set "className" prop', () => {
            const dataTestId = 'data-test-id';
            const className = 'class-name';
            const { getByTestId } = renderComponent({ dataTestId, className });

            expect(getByTestId(dataTestId)).toHaveClass(className);
        });

        it('should set "headerClassName" prop', () => {
            const headerClassName = 'class-name';
            const { getByText } = renderComponent({ headerClassName });

            const header = getByText('Зачем нужен аккордeон?').parentElement;

            expect(header).toHaveClass(headerClassName);
        });

        it('should set "controlClassName" prop', () => {
            const controlClassName = 'class-name';
            const { container } = renderComponent({ controlClassName });

            const control = container.querySelector(`.control`);

            expect(control).toHaveClass(controlClassName);
        });

        it('should set "containerClassName" prop', () => {
            const containerClassName = 'class-name';
            const { container } = renderComponent({ containerClassName });

            const body = container.querySelector(`.${containerClassName}`);

            expect(body).toHaveClass(containerClassName);
        });

        it('should set "bodyClassName" prop', () => {
            const bodyClassName = 'class-name';
            const { container } = renderComponent({ bodyClassName });

            const body = container.querySelector(`.${bodyClassName}`);

            expect(body).toHaveClass(bodyClassName);
        });
    });

    describe('Accordion callbacks calls', () => {
        it('should call "onExpandedChange" prop', () => {
            const onExpandedChange = jest.fn();
            const { getByRole } = renderComponent({
                onExpandedChange,
            });
            const control = getByRole('button');

            control.click();

            expect(onExpandedChange).toHaveBeenCalledTimes(1);
        });
    });

    describe('Accordion content visibility', () => {
        it('should set "controlPosition" prop', () => {
            const { container } = renderComponent({ controlPosition: 'start' });

            const control = container.querySelector(`.control`);

            expect(control).toHaveClass('startPosition');
        });

        it('should set "expanded" prop', () => {
            const { container, debug } = renderComponent({ expanded: true });

            const expandedClassName = 'expandedBody';
            const body = container.querySelector(`.${expandedClassName}`);

            expect(body).toHaveClass(expandedClassName);
        });
    });
});

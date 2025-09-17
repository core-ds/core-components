import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';

import { Collapse } from './index';

const paragraph = (
    <p style={{ margin: '0 0 16px 0' }}>
        Банк, основанный в 1990 году, является универсальным банком, осуществляющим все основные
        виды банковских операций, представленных на рынке финансовых услуг, включая обслуживание
        частных и корпоративных клиентов, инвестиционный банковский бизнес, торговое финансирование
        и т.д.
    </p>
);

describe('Collapse', () => {
    describe('Display tests', () => {
        it('should display childrens correctly', () => {
            const { container } = render(
                <Collapse collapsedLabel='Показать'>
                    {paragraph}
                    {paragraph}
                </Collapse>,
            );

            expect(container).toMatchSnapshot();
        });

        it('should display one child correctly', () => {
            const { container } = render(<Collapse collapsedLabel='Показать'>test text</Collapse>);

            expect(container).toMatchSnapshot();
        });
    });

    describe('Collapse className test', () => {
        it('should set `data-test-id` attribute', () => {
            const dataTestId = 'test-id';
            const { getByTestId } = render(
                <Collapse dataTestId={dataTestId} collapsedLabel='Показать'>
                    {paragraph}
                </Collapse>,
            );

            expect(getByTestId(dataTestId).tagName).toBe('DIV');
        });

        it('should set `className` class', () => {
            const dataTestId = 'test-id';
            const className = 'test-class';
            const { getByTestId } = render(
                <Collapse dataTestId={dataTestId} className={className} collapsedLabel='Показать'>
                    {paragraph}
                </Collapse>,
            );

            expect(getByTestId(dataTestId)).toHaveClass(className);
        });

        it('should have `expandedContent` class when defaultExpanded is passed', () => {
            const dataTestId = 'test-id';
            const expandedClassName = 'expandedContent';
            const { getByTestId } = render(
                <Collapse dataTestId={dataTestId} collapsedLabel='Показать' defaultExpanded={true}>
                    {paragraph}
                </Collapse>,
            );

            expect(getByTestId(dataTestId).firstChild).toHaveClass(expandedClassName);
        });

        it('should set `expandedclassName` class', () => {
            const dataTestId = 'test-id';
            const expandedContentClassName = 'expanded-test-class';
            const { getByTestId } = render(
                <Collapse
                    dataTestId={dataTestId}
                    expandedContentClassName={expandedContentClassName}
                    collapsedLabel='Показать'
                >
                    {paragraph}
                </Collapse>,
            );

            expect(getByTestId(dataTestId).firstChild).toHaveClass(expandedContentClassName);
        });
    });

    describe('Collapse content visibility', () => {
        it('should have class `.expandedContent` when button click', async () => {
            const buttonText = 'Показать';
            const expandedContentClassName = 'expanded-test-class';
            const expandedClassName = 'expandedContent';

            const { container } = render(
                <Collapse
                    expandedContentClassName={expandedContentClassName}
                    collapsedLabel={buttonText}
                >
                    {paragraph}
                </Collapse>,
            );

            const contentEl = container.getElementsByClassName(expandedContentClassName)[0];
            expect(contentEl).not.toHaveClass(expandedClassName);
            const buttonEl = container.getElementsByTagName('button')[0];
            fireEvent.click(buttonEl);
            await waitFor(() => {
                expect(contentEl).toHaveClass(expandedClassName);
            });
        });
    });

    describe('Collapse callbacks calls', () => {
        it('onExpandedChange callback should be called with argument', () => {
            const buttonText = 'Показать';
            const onExpandedChange = jest.fn();
            const { container } = render(
                <Collapse collapsedLabel={buttonText} onExpandedChange={onExpandedChange}>
                    {paragraph}
                </Collapse>,
            );
            const buttonEl = container.getElementsByTagName('button')[0];

            fireEvent.click(buttonEl);
            expect(onExpandedChange).toHaveBeenCalledWith(true);

            fireEvent.click(buttonEl);
            expect(onExpandedChange).toHaveBeenCalledWith(false);
        });
    });
});

import React from 'react';
import { render } from '@testing-library/react';

import { List } from './index';

describe('Snapshots tests', () => {
    it('should match snapshot', () => {
        expect(
            render(
                <List>
                    <List.Item>List</List.Item>
                </List>,
            ),
        ).toMatchSnapshot();
    });
    it('should match snapshot', () => {
        expect(
            render(
                <List tag='ol'>
                    <List.Item>List</List.Item>
                </List>,
            ),
        ).toMatchSnapshot();
    });
});

describe('Classes tests', () => {
    it('should set custom class', () => {
        const className = 'custom-class';

        const { container } = render(
            <List className={className}>
                <List.Item>List</List.Item>
            </List>,
        );

        expect(container.firstElementChild).toHaveClass(className);
    });

    it('should set reversed class', () => {
        const dataTestId = 'link-test-id';
        const { container } = render(
            <List tag='ol' reversed={true} dataTestId={dataTestId}>
                <List.Item>List</List.Item>
            </List>,
        );

        expect(container.firstElementChild).toHaveClass('reversed');
    });
});

describe('Attributes tests', () => {
    it('should set data-test-id attribute', () => {
        const dataTestId = 'link-test-id';

        const { container } = render(
            <List dataTestId={dataTestId}>
                <List.Item>List</List.Item>
            </List>,
        );

        const testIdAttr = container.firstElementChild?.getAttribute('data-test-id');

        expect(testIdAttr).toBe(dataTestId);
    });

    it('should be ol element', () => {
        const dataTestId = 'link-test-id';

        const { getByTestId } = render(
            <List tag='ol' dataTestId={dataTestId}>
                <List.Item>List</List.Item>
            </List>,
        );

        const listEl = getByTestId(dataTestId);

        expect(listEl.tagName).toBe('OL');
    });

    it('should set start attribute', () => {
        const dataTestId = 'link-test-id';
        const startValue = 10;
        const { container } = render(
            <List tag='ol' start={startValue} dataTestId={dataTestId}>
                List
            </List>,
        );

        const marker = container.querySelector('.slot');

        expect(marker).toHaveTextContent('10.');
    });
});

describe('Props tests', () => {
    it('should set marker', () => {
        const marker = '•';

        const { container } = render(
            <List marker={marker}>
                <List.Item>List</List.Item>
            </List>,
        );

        expect(container.querySelector('.item')?.firstElementChild).toHaveTextContent(marker);
    });
});

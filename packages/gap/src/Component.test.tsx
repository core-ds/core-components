import React from 'react';
import { render } from '@testing-library/react';

import { Gap } from './index';

describe('Snapshots tests', () => {
    it('should match snapshot', () => {
        expect(render(<Gap size='l' />)).toMatchSnapshot();
    });
});

describe('Classes tests', () => {
    it('should set custom class', () => {
        const className = 'custom-class';
        const { container } = render(<Gap size='l' className={className} />);

        expect(container.firstElementChild).toHaveClass(className);
    });
});

describe('Props tests', () => {
    it('should set data-test-id attribute', () => {
        const dataTestId = 'test-id';
        const { container } = render(<Gap size='l' dataTestId={dataTestId} />);
        const testIdAttr = container.firstElementChild?.getAttribute('data-test-id');

        expect(testIdAttr).toBe(dataTestId);
    });

    it('should render span if prop tag === span ', () => {
        const dataTestId = 'test-id';
        const { getByTestId } = render(<Gap size='l' dataTestId={dataTestId} tag='span' />);

        expect(getByTestId(dataTestId).tagName).toBe('SPAN');
    });

    it('should set size', () => {
        const dataTestId = 'test-id';
        const size = 'xl';
        const { getByTestId } = render(<Gap size={size} dataTestId={dataTestId} />);
        const gapEl = getByTestId(dataTestId);

        expect(gapEl).toHaveAttribute('data-gap-size', size);
    });
});

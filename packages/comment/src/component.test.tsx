import React from 'react';
import { render, screen } from '@testing-library/react';

import { Comment } from '.';

describe('comment', () => {
    it('should use a dataTestId prop', () => {
        const testId = 'test-identifier';
        const { container } = render(<Comment dataTestId={testId} />);

        expect(container.firstElementChild).toHaveAttribute('data-test-id', testId);
    });

    it('should use a className prop', () => {
        const className = 'test-class';
        const { container } = render(<Comment className={className} />);

        expect(container.firstElementChild).toHaveClass(className);
    });

    it('should have children', () => {
        render(
            <Comment>
                <div data-test-id='test-children'>comment</div>
            </Comment>,
        );

        expect(screen.getByTestId('test-children')).toBeInTheDocument();
    });

    it('should use a rowLimit prop', () => {
        render(<Comment dataTestId='test-identifier' rowLimit={2} />);

        expect(screen.getByTestId('test-identifier').firstElementChild).toHaveClass('rowLimit2');
    });
});

import React from 'react';
import { render, screen } from '@testing-library/react';

import { CommentView } from '.';

describe('comment view', () => {
    it('should use a dataTestId prop', () => {
        const testId = 'test-identifier';
        const { container } = render(<CommentView dataTestId={testId} />);

        expect(container.firstElementChild).toHaveAttribute('data-test-id', testId);
    });

    it('should use a className prop', () => {
        const className = 'test-class';
        const { container } = render(<CommentView className={className} />);

        expect(container.firstElementChild).toHaveClass(className);
    });

    it('should have children', () => {
        render(
            <CommentView>
                <div data-test-id='test-children'>comment</div>
            </CommentView>,
        );

        expect(screen.getByTestId('test-children')).toBeInTheDocument();
    });
});

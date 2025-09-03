import React from 'react';
import { render, screen } from '@testing-library/react';
import { Markdown } from '@alfalab/core-components-markdown';

Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(), // Deprecated
        removeListener: jest.fn(), // Deprecated
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
    })),
});

describe('Markdown', () => {
    describe('transformLinkUri test', () => {
        it('should not render incorrect link', () => {
            render(<Markdown>[Google](myapp://product/123)</Markdown>);

            const link = screen.getByText('Google').closest('a');

            expect(link).toHaveAttribute('href', 'javascript:void(0)');
        });

        it('should render incorrect link', () => {
            render(<Markdown transformLinkUri={false}>[Google](myapp://product/123)</Markdown>);

            const link = screen.getByText('Google').closest('a');

            expect(link).toHaveAttribute('href', 'myapp://product/123');
        });
    });
});

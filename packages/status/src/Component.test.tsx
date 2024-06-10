import React from 'react';
import { render } from '@testing-library/react';

import { Status, colors } from './index';

describe('Status', () => {
    describe('Snapshots tests', () => {
        it.each(['muted', 'contrast', 'muted-alt'] as const)(
            'should match view="%s" snapshot',
            (view) => {
                expect(render(<Status view={view}>Label</Status>).container).toMatchSnapshot();
            },
        );
    });

    it('should set `data-test-id` attribute', () => {
        const dataTestId = 'test-id';
        const { getByTestId } = render(<Status dataTestId={dataTestId} />);

        expect(getByTestId(dataTestId).tagName).toBe('SPAN');
    });

    describe('Classes tests', () => {
        it('should set `className` class', () => {
            const className = 'test-class';
            const { container } = render(<Status className={className} />);

            expect(container.firstElementChild).toHaveClass(className);
        });

        it('should set `view=muted-alt, color=green` by default', () => {
            const { container } = render(<Status />);

            expect(container.firstElementChild).toHaveClass('muted-alt');
            expect(container.firstElementChild).toHaveClass('green');
        });

        it.each(['muted-alt', 'contrast', 'muted'] as const)('should set view="%s"', (view) => {
            const { container } = render(<Status view={view}>Label</Status>);

            expect(container.firstElementChild).toHaveClass(view);
        });

        it.each(colors)('should set color="%s"', (color) => {
            const { container } = render(<Status color={color}>Label</Status>);

            expect(container.firstElementChild).toHaveClass(color);
        });
    });

    it('should unmount without errors', () => {
        const { unmount } = render(<Status />);

        expect(unmount).not.toThrowError();
    });
});

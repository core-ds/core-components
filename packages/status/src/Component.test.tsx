import React from 'react';
import { render } from '@testing-library/react';

import { Status } from './index';
import { COLORS, SIZES } from './consts';

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

        it('should set size=20 by default', () => {
            const { container } = render(<Status />);
            expect(container.firstElementChild).toHaveClass('size-20');
        });

        it('should set shape=rectangular by default', () => {
            const { container } = render(<Status />);
            expect(container.firstElementChild).toHaveClass('rectangular');
        });

        it('should set uppercase=true by default', () => {
            const { container } = render(<Status />);
            expect(container.firstElementChild).toHaveClass('uppercase');
        });

        it.each(['muted-alt', 'contrast', 'muted'] as const)('should set view="%s"', (view) => {
            const { container } = render(<Status view={view}>Label</Status>);

            expect(container.firstElementChild).toHaveClass(view);
        });

        it.each(COLORS)('should set color="%s"', (color) => {
            const { container } = render(<Status color={color}>Label</Status>);

            expect(container.firstElementChild).toHaveClass(color);
        });

        it.each(SIZES)('should set size="%s"', (size) => {
            const { container } = render(<Status size={size}>Label</Status>);

            expect(container.firstElementChild).toHaveClass(`size-${size}`);
        });

        it.each(['rectangular', 'rounded'] as const)('should set shape="%s"', (shape) => {
            const { container } = render(<Status shape={shape}>Label</Status>);

            expect(container.firstElementChild).toHaveClass(shape);
        });

        it('should set uppercase as default', () => {
            const { container } = render(<Status>Label</Status>);
            expect(container.firstElementChild).toHaveClass('uppercase');
        });

        it('should set uppercase', () => {
            const { container } = render(<Status uppercase={true}>Label</Status>);
            expect(container.firstElementChild).toHaveClass('uppercase');
        });

        it('should not set uppercase', () => {
            const { container } = render(<Status uppercase={false}>Label</Status>);
            expect(container.firstElementChild).not.toHaveClass('uppercase');
        });
    });

    it('should unmount without errors', () => {
        const { unmount } = render(<Status />);

        expect(unmount).not.toThrowError();
    });
});

import React from 'react';
import { render } from '@testing-library/react';

import { Text, TextProps } from './index';

describe('Text', () => {
    describe('Classes tests', () => {
        it('should set custom class', () => {
            const className = 'custom-class';
            const { container } = render(<Text className={className} />);

            expect(container.firstElementChild).toHaveClass(className);
        });

        it('should set class `paragraph-primary-medium` as default view', () => {
            const { container } = render(<Text />);

            expect(container.firstElementChild).toHaveClass('paragraph-primary-medium');
        });

        it('should set class `left` as default align', () => {
            const { container } = render(<Text />);

            expect(container.firstElementChild).toHaveClass('left');
        });

        it('should set class `center` align', () => {
            const { container } = render(<Text align='center' />);

            expect(container.firstElementChild).toHaveClass('center');
        });

        it('should set class `row-limit-2`', () => {
            const { container } = render(<Text rowLimit={2} />);

            expect(container.firstElementChild).toHaveClass('row-limit-2');
        });

        it('should set `color: red` to style attribute', () => {
            const { container } = render(<Text color='red' />);

            expect(container.firstElementChild).toHaveStyle({ color: 'rgb(255, 0, 0)' });
        });

        it('should set `backgroundColor: red` to style attribute', () => {
            const { container } = render(<Text textBackgroundColor='red' />);

            expect(container.firstElementChild).toHaveStyle({
                'background-color': 'rgb(255, 0, 0)',
            });
        });

        it('should set `view` class', () => {
            const views: Array<TextProps['view']> = [
                'paragraph-primary-medium',
                'paragraph-secondary-medium',
                'promo-system-medium',
                'accent-component-primary',
                'accent-primary-medium',
                'accent-secondary-medium',
                'headline-mobile-medium',
                'headline-system-medium',
                'headline-medium',
                'paragraph-component',
            ];

            views.forEach((view) => {
                if (!view) return;

                const { container } = render(<Text view={view} />);

                expect(container.firstElementChild).toHaveClass(`${view}`);
            });
        });

        it('should set class `monospace`', () => {
            const { container } = render(<Text monospaceNumbers={true} />);

            expect(container.firstElementChild).toHaveClass('monospace');
        });
    });

    describe('Attributes tests', () => {
        it('should set data-test-id attribute', () => {
            const dataTestId = 'Text-test-id';

            const { queryByTestId } = render(<Text dataTestId={dataTestId} />);

            expect(queryByTestId(dataTestId)).toBeInTheDocument();
        });

        it('should set tag correcly', () => {
            const { container, rerender } = render(<Text tag='h1' />);
            const tags: Array<TextProps['tag']> = [
                'h1',
                'h2',
                'h3',
                'h4',
                'h5',
                'h6',
                'div',
                'p',
                'span',
            ];

            tags.forEach((tag) => {
                if (!tag) return;

                const requiredTextTag = tag.toUpperCase();

                rerender(<Text tag={tag} />);

                expect(container.firstElementChild?.nodeName).toEqual(requiredTextTag);
            });
        });
    });
});

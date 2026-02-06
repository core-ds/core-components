import React from 'react';
import { render } from '@testing-library/react';

import { colors } from '../colors';
import { Title, TitleProps } from './index';

describe('Title', () => {
    describe('Classes tests', () => {
        it('should set custom class', () => {
            const className = 'custom-class';

            const { container } = render(<Title tag='h1' className={className} />);

            expect(container.firstElementChild).toHaveClass(className);
        });

        it('should set class `medium` as default view', () => {
            const { container } = render(<Title tag='h1' />);

            expect(container.firstElementChild).toHaveClass('medium');
        });

        it('should set class `medium` as default weight', () => {
            const { container } = render(<Title tag='h1' />);

            expect(container.firstElementChild).toHaveClass('medium');
        });

        it('should set `color` class', () => {
            colors.forEach((color) => {
                const { container } = render(<Title tag='h1' color={color} />);

                expect(container.firstElementChild).toHaveClass(color);
            });
        });

        it.each(['regular'] as Array<NonNullable<TitleProps['weight']>>)(
            'should set %s class',
            (weight) => {
                const { container } = render(<Title tag='h1' weight={weight} />);

                expect(container.firstElementChild).toHaveClass('regular-medium');
            },
        );
    });

    describe('Attributes tests', () => {
        it('should set data-test-id attribute', () => {
            const dataTestId = 'title-test-id';

            const { queryByTestId } = render(<Title tag='h1' dataTestId={dataTestId} />);

            expect(queryByTestId(dataTestId)).toBeInTheDocument();
        });

        it('should set tag correcly', () => {
            const { container, rerender } = render(<Title tag='h1' />);
            const tags: Array<TitleProps['tag']> = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'div'];

            tags.forEach((tag) => {
                if (!tag) return;

                const requiredTitleTag = tag.toUpperCase();

                rerender(<Title tag={tag} />);

                expect(container.firstElementChild?.nodeName).toEqual(requiredTitleTag);
            });
        });
    });
});

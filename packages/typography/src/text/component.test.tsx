import React from 'react';
import { render } from '@testing-library/react';

import { Text, DEFAULT_TEXT_VIEW } from './index';
import { VIEWS_TEXT, COLORS, WEIGHTS_TEXT, TAGS_ALL_TEXT } from '../types';

describe('Text', () => {
    describe('Classes tests', () => {
        it('should set paragraph class', () => {
            const className = 'paragraph';

            const { container } = render(<Text tag='p' defaultMargins={false} />);

            expect(container.firstElementChild).toHaveClass(className);
        });

        it('should set paragraphWithMargins class by default', () => {
            const className = 'paragraphWithMargins';

            const { container } = render(<Text tag='p' />);

            expect(container.firstElementChild).toHaveClass(className);
        });

        it('should set custom class', () => {
            const className = 'custom-class';

            const { container } = render(<Text className={className} />);

            expect(container.firstElementChild).toHaveClass(className);
        });

        it('should set class `primary-medium` as default view', () => {
            const { container } = render(<Text />);

            expect(container.firstElementChild).toHaveClass(`${DEFAULT_TEXT_VIEW}View`);
        });

        it('should set `view` class', () => {
            VIEWS_TEXT.forEach((view) => {
                const { container } = render(<Text view={view} />);

                expect(container.firstElementChild).toHaveClass(`${view}View`);
            });
        });

        it('should set `color` class', () => {
            COLORS.forEach((color) => {
                const { container } = render(<Text color={color} />);

                expect(container.firstElementChild).toHaveClass(`${color}Color`);
            });
        });

        it('should set `weight` class', () => {
            WEIGHTS_TEXT.forEach((weight) => {
                const { container } = render(<Text weight={weight} />);

                expect(container.firstElementChild).toHaveClass(`${weight}Weight`);
            });
        });

        it('should set `monospace` class if prop `monospaceNumbers` is present', () => {
            const { container } = render(<Text monospaceNumbers={true}>12345</Text>);

            expect(container.firstElementChild).toHaveClass('monospace');
        });
    });

    describe('Attributes tests', () => {
        it('should set data-test-id attribute', () => {
            const dataTestId = 'title-test-id';

            const { queryByTestId } = render(<Text dataTestId={dataTestId} />);

            expect(queryByTestId(dataTestId)).toBeInTheDocument();
        });

        it('should set span tag by default', () => {
            const defaultTextTag = 'SPAN';
            const { container } = render(<Text />);

            expect(container.firstElementChild?.nodeName).toEqual(defaultTextTag);
        });

        it('should set tag correcly', () => {
            const { container, rerender } = render(<Text />);

            TAGS_ALL_TEXT.forEach((tag) => {
                if (!tag) return;

                const requiredTextTag = tag.toUpperCase();

                rerender(<Text tag={tag} />);

                expect(container.firstElementChild?.nodeName).toEqual(requiredTextTag);
            });
        });
    });
});

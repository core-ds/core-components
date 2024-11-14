import React from 'react';
import { render } from '@testing-library/react';

import { COLORS, WEIGHTS_TITLE, FONTS, TAGS_TITLE, VIEWS_TITLE } from '../types';
import { TitleDesktop } from './';

describe('Title', () => {
    describe('Classes tests', () => {
        it('should set custom class', () => {
            const className = 'custom-class';

            const { container } = render(<TitleDesktop tag='h1' className={className} />);

            expect(container.firstElementChild).toHaveClass(className);
        });

        it('should set class `styrene-medium` as default view', () => {
            const { container } = render(<TitleDesktop tag='h1' />);

            expect(container.firstElementChild).toHaveClass('styreneFont_mediumView');
        });

        it('should set class `medium` as default weight', () => {
            const { container } = render(<TitleDesktop tag='h1' />);

            expect(container.firstElementChild).toHaveClass('mediumWeight');
        });

        it('should set `view` class according to the font', () => {
            FONTS.forEach((font) => {
                VIEWS_TITLE.forEach((view) => {
                    const { container } = render(<TitleDesktop tag='h1' view={view} font={font} />);

                    expect(container.firstElementChild).toHaveClass(`${font}Font_${view}View`);
                });
            });
        });

        it('should set `color` class', () => {
            COLORS.forEach((color) => {
                const { container } = render(<TitleDesktop tag='h1' color={color} />);

                expect(container.firstElementChild).toHaveClass(`${color}Color`);
            });
        });

        it('should set `weight` class', () => {
            WEIGHTS_TITLE.forEach((weight) => {
                const { container } = render(<TitleDesktop tag='h1' weight={weight} />);

                expect(container.firstElementChild).toHaveClass(`${weight}Weight`);
            });
        });
    });

    describe('Attributes tests', () => {
        it('should set data-test-id attribute', () => {
            const dataTestId = 'title-test-id';

            const { queryByTestId } = render(<TitleDesktop tag='h1' dataTestId={dataTestId} />);

            expect(queryByTestId(dataTestId)).toBeInTheDocument();
        });

        it('should set tag correctly', () => {
            const { container, rerender } = render(<TitleDesktop tag='h1' />);

            TAGS_TITLE.forEach((tag) => {
                const requiredTitleTag = tag.toUpperCase();

                rerender(<TitleDesktop tag={tag} />);

                expect(container.firstElementChild?.nodeName).toEqual(requiredTitleTag);
            });
        });
    });
});

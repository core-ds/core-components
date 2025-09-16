import React from 'react';
import { render } from '@testing-library/react';
import { CheckmarkCircleMIcon } from '@alfalab/icons-glyph/CheckmarkCircleMIcon';

import { Badge } from './index';

describe('Badge', () => {
    describe('Snapshots tests', () => {
        it('should match snapshot', () => {
            const { container } = render(<Badge view='count' content={100} />);

            expect(container).toMatchSnapshot();
        });

        it('should match snapshot with icon view', () => {
            const { container } = render(<Badge view='icon' content={<CheckmarkCircleMIcon />} />);

            expect(container).toMatchSnapshot();
        });
    });

    it('should set `data-test-id` attribute', () => {
        const dataTestId = 'test-id';
        const { getByTestId } = render(<Badge view='count' dataTestId={dataTestId} />);

        expect(getByTestId(dataTestId).tagName).toBe('DIV');
    });

    describe('Classes tests', () => {
        it('should set `className` class', () => {
            const dataTestId = 'test-id';
            const className = 'test-class';
            const { getByTestId } = render(
                <Badge view='count' className={className} dataTestId={dataTestId} />,
            );

            expect(getByTestId(dataTestId)).toHaveClass(className);
        });

        it('should set `outlineCount` class', () => {
            const { container } = render(<Badge view='count' visibleIconOutline={true} />);

            expect(container.getElementsByClassName('component')[0]).toHaveClass('outlineCount');
        });

        it('should set `size` class', () => {
            const size = 's';
            const { container } = render(<Badge view='icon' size={size} />);

            expect(container.firstElementChild).toHaveClass(size);
        });

        it('should set `view` class', () => {
            const { container } = render(<Badge view='count' />);

            expect(container.firstElementChild).toHaveClass('countWrapper');
        });

        it('should set `outline` class', () => {
            const { container } = render(<Badge view='icon' visibleIconOutline={true} />);

            expect(container.firstElementChild).toHaveClass('outline');
        });

        it('should set `outlineColor` class', () => {
            const { container } = render(<Badge view='icon' visibleColorOutline={true} />);

            expect(container.firstElementChild).toHaveClass('outlineColor');
        });

        it('should set `positive` class if `iconColor` prop is `positive`', () => {
            const iconColor = 'positive';
            const { container } = render(<Badge view='icon' iconColor={iconColor} />);

            expect(container.firstElementChild).toHaveClass(iconColor);
        });

        it('should set `isHidden` class if `content` prop lower than 0', () => {
            const dataTestId = 'test-id';
            const { getByTestId } = render(
                <Badge view='count' content={0} dataTestId={dataTestId} />,
            );

            expect(getByTestId(dataTestId).firstElementChild).toHaveClass('isHidden');
        });

        it('should set `dot` class without `content` prop', () => {
            const dataTestId = 'test-id';
            const { getByTestId } = render(<Badge view='count' dataTestId={dataTestId} />);
            expect(getByTestId(dataTestId).firstElementChild).toHaveClass('dot');
        });

        it('should set `grey` class', () => {
            const dataTestId = 'test-id';
            const { getByTestId } = render(
                <Badge
                    view='count'
                    color='specialbg-secondary-transparent'
                    dataTestId={dataTestId}
                />,
            );
            expect(getByTestId(dataTestId).firstElementChild).toHaveClass(
                'background-specialbg-secondary-transparent',
            );
        });

        it('should set `lightGraphicPrimary` class', () => {
            const dataTestId = 'test-id';
            const { getByTestId } = render(
                <Badge view='count' iconUnderlayColor='primary' dataTestId={dataTestId} />,
            );
            expect(getByTestId(dataTestId).firstElementChild).toHaveClass('graphic-primary');
        });
    });

    it('should contain `99+` if content is bigger than 99', () => {
        const { container } = render(<Badge view='count' content={100} />);

        expect(container).toHaveTextContent('99+');
    });

    it('should unmount without errors', () => {
        const { unmount } = render(<Badge view='count' />);

        expect(unmount).not.toThrow();
    });
});

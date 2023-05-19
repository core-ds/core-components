import React from 'react';
import { render } from '@testing-library/react';

import { Indicator } from './index';

describe('Indicator', () => {
    describe('Snapshots tests', () => {
        it('should match snapshot', () => {
            const { container } = render(<Indicator value={100} />);

            expect(container).toMatchSnapshot();
        });
    });

    it('should set `data-test-id` attribute', () => {
        const dataTestId = 'test-id';
        const { getByTestId } = render(<Indicator dataTestId={dataTestId} />);

        expect(getByTestId(dataTestId).tagName).toBe('DIV');
    });

    describe('Classes tests', () => {
        it('should set `className` class', () => {
            const dataTestId = 'test-id';
            const className = 'test-class';
            const { getByTestId } = render(
                <Indicator className={className} dataTestId={dataTestId} />,
            );

            expect(getByTestId(dataTestId)).toHaveClass(className);
        });

        it('should set `size` class', () => {
            const size = 's';
            const { container } = render(<Indicator size={size} />);

            expect(container.firstElementChild).toHaveClass(size);
        });

        it('should set `xs` class if value is empty', () => {
            const size = 'xs';
            const { container } = render(<Indicator />);

            expect(container.firstElementChild).toHaveClass(size);
        });

        it('should set `view` class', () => {
            const view = 'red';
            const { container } = render(<Indicator view={view} />);

            expect(container.firstElementChild).toHaveClass(view);
        });

        it('should set `color` style', () => {
            const color = 'var(--color-light-text-secondary)';
            const { container } = render(<Indicator color={color} />);

            expect(container.firstElementChild).toHaveStyle({ color });
        });

        it('should set `backgroundColor` style', () => {
            const backgroundColor = 'var(--color-light-bg-secondary)';
            const { container } = render(<Indicator backgroundColor={backgroundColor} />);

            expect(container.firstElementChild).toHaveStyle({ backgroundColor });
        });

        it('should set `border` styles', () => {
            const border = {
                color: 'var(--color-light-border-secondary)',
                width: 1,
                style: 'solid',
            } as const;

            const { container } = render(<Indicator border={border} />);

            expect(container.firstElementChild?.querySelector('.border')).toHaveStyle({
                borderColor: border.color,
                borderWidth: border.width,
                borderStyle: border.style,
            });
        });
    });

    it('should contain `99+` if value is bigger than 99', () => {
        const { container } = render(<Indicator value={100} />);

        expect(container).toHaveTextContent('99+');
    });

    it('should unmount without errors', () => {
        const { unmount } = render(<Indicator />);

        expect(unmount).not.toThrowError();
    });
});

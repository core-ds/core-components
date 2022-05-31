import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { ActionButton } from '.';

describe('ActionButton', () => {
    it('should use "icon" prop', () => {
        const icon = '⭐️';

        render(<ActionButton icon={<React.Fragment>{icon}</React.Fragment>} />);

        expect(screen.getByRole('img')).toHaveTextContent(icon);
    });

    it('should use "size" prop', () => {
        const size = 's';

        render(<ActionButton size={size} />);

        expect(screen.getByRole('button')).toHaveClass('s');
    });

    it('should use "size" prop "s" by default', () => {
        render(<ActionButton />);

        expect(screen.getByRole('button')).toHaveClass('s');
    });

    it('should use "iconWrapperClassName" prop', () => {
        const iconClassName = 'test-class';

        render(<ActionButton iconWrapperClassName={iconClassName} />);

        expect(screen.getByRole('img')).toHaveClass(iconClassName);
    });

    it('should use "href" prop and become a link', () => {
        const href = 'http://127.0.0.1';

        render(<ActionButton href={href} />);

        expect(screen.getByRole('button')).toHaveAttribute('href', href);
    });

    it('should use "disabled" prop (button)', () => {
        const { rerender } = render(<ActionButton />);

        expect(screen.getByRole('button')).not.toBeDisabled();

        rerender(<ActionButton disabled={true} />);

        expect(screen.getByRole('button')).toBeDisabled();
    });

    it('should use "disabled" prop (link)', () => {
        const { rerender } = render(<ActionButton href='http://localhost' />);

        expect(screen.getByRole('button')).not.toHaveAttribute('aria-disabled', 'true');

        rerender(<ActionButton href='http://localhost' disabled={true} />);

        expect(screen.getByRole('button')).toHaveAttribute('aria-disabled', 'true');
    });

    it('should use "loading" prop (button)', () => {
        const { rerender } = render(<ActionButton />);

        expect(screen.getByRole('button')).not.toBeDisabled();
        expect(screen.queryByTestId('loader')).toBeNull();

        rerender(<ActionButton loading={true} />);

        expect(screen.getByRole('button')).toBeDisabled();
        expect(screen.getByTestId('loader')).toBeInTheDocument();
    });

    it('should use "loading" prop (link)', () => {
        const { rerender } = render(<ActionButton href='http://localhost' />);

        expect(screen.getByRole('button')).not.toHaveAttribute('aria-disabled', 'true');
        expect(screen.queryByTestId('loader')).toBeNull();

        rerender(<ActionButton href='http://localhost' loading={true} />);

        expect(screen.getByRole('button')).toHaveAttribute('aria-disabled', 'true');
        expect(screen.getByTestId('loader')).toBeInTheDocument();
    });

    it('should use "dataTestId" prop', () => {
        const testId = 'test-identifier';

        render(<ActionButton dataTestId={testId} />);

        expect(screen.getByRole('button')).toHaveAttribute('data-test-id', testId);
    });

    it('should use "children" prop', () => {
        const label = 'Action Button';

        render(<ActionButton>{label}</ActionButton>);

        expect(screen.getByRole('button')).toHaveTextContent(label);
    });

    it('should use "className" prop', () => {
        const className = 'test-class';

        render(<ActionButton className={className} />);

        expect(screen.getByRole('button')).toHaveClass(className);
    });

    it('should call "onClick" prop', () => {
        const cb = jest.fn();

        render(<ActionButton onClick={cb} />);

        userEvent.click(screen.getByRole('button'));

        expect(cb).toBeCalledTimes(1);
    });
});

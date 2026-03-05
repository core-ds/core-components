import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { getActionButtonTestIds } from './utils';

import { ActionButton } from '.';

const dti = 'action-button';
const loaderDti = `${dti}-loader`;

describe('ActionButton', () => {
    it('should use "icon" prop', () => {
        const icon = '⭐️';

        render(<ActionButton icon={<React.Fragment>{icon}</React.Fragment>} />);

        expect(screen.getByText(icon)).toBeInTheDocument();
    });

    it('should use "size" prop', () => {
        const size = 48;

        render(<ActionButton icon={null} size={size} />);

        expect(screen.getByRole('button')).toHaveClass('size48');
    });

    it('should use "iconWrapperClassName" prop', () => {
        const iconClassName = 'test-class';
        const { container } = render(
            <ActionButton icon={null} iconWrapperClassName={iconClassName} />,
        );

        expect(container.querySelector(`.${iconClassName}`)).toBeInTheDocument();
    });

    it('should use "href" prop and become a link', () => {
        const href = 'http://127.0.0.1';

        render(<ActionButton icon={null} href={href} dataTestId={dti} />);

        expect(screen.getByTestId(dti)).toHaveAttribute('href', href);
    });

    it('should use "disabled" prop (button)', () => {
        const { rerender } = render(<ActionButton icon={null} />);

        expect(screen.getByRole('button')).not.toBeDisabled();

        rerender(<ActionButton icon={null} disabled={true} />);

        expect(screen.getByRole('button')).toBeDisabled();
    });

    it('should use "disabled" prop (link)', () => {
        const { rerender } = render(
            <ActionButton icon={null} href='http://localhost' dataTestId={dti} />,
        );

        expect(screen.getByTestId(dti)).not.toHaveAttribute('aria-disabled', 'true');

        rerender(
            <ActionButton icon={null} href='http://localhost' dataTestId={dti} disabled={true} />,
        );

        expect(screen.getByTestId(dti)).toHaveAttribute('aria-disabled', 'true');
    });

    it('should use "loading" prop (button)', () => {
        const { rerender } = render(<ActionButton icon={null} dataTestId={dti} />);

        expect(screen.getByRole('button')).not.toBeDisabled();
        expect(screen.queryByTestId(loaderDti)).toBeNull();

        rerender(<ActionButton icon={null} loading={true} dataTestId={dti} />);

        expect(screen.getByRole('button')).toBeDisabled();
        expect(screen.getByTestId(loaderDti)).toBeInTheDocument();
    });

    it('should use "loading" prop (link)', () => {
        const { rerender } = render(
            <ActionButton icon={null} href='http://localhost' dataTestId={dti} />,
        );

        expect(screen.getByTestId(dti)).not.toHaveAttribute('aria-disabled', 'true');
        expect(screen.queryByTestId(loaderDti)).toBeNull();

        rerender(
            <ActionButton icon={null} href='http://localhost' loading={true} dataTestId={dti} />,
        );

        expect(screen.getByTestId(dti)).toHaveAttribute('aria-disabled', 'true');
        expect(screen.getByTestId(loaderDti)).toBeInTheDocument();
    });

    it('should use "dataTestId" prop', () => {
        render(<ActionButton icon={null} dataTestId={dti} />);

        expect(screen.getByRole('button')).toHaveAttribute('data-test-id', dti);
    });

    it('should use "children" prop', () => {
        const label = 'Action Button';

        render(<ActionButton icon={null}>{label}</ActionButton>);

        expect(screen.getByRole('button')).toHaveTextContent(label);
    });

    it('should use "className" prop', () => {
        const className = 'test-class';

        render(<ActionButton icon={null} className={className} />);

        expect(screen.getByRole('button')).toHaveClass(className);
    });

    it('should call "onClick" prop', async () => {
        const cb = jest.fn();

        render(<ActionButton icon={null} onClick={cb} />);

        await userEvent.click(screen.getByRole('button'));

        expect(cb).toHaveBeenCalledTimes(1);
    });

    it('should have data-test-id', () => {
        const dti = 'action-button-dti';
        const { getByTestId } = render(<ActionButton icon={null} dataTestId={dti} loading />);

        const testIds = getActionButtonTestIds(dti);

        expect(getByTestId(testIds.actionButton)).toBeInTheDocument();
        expect(getByTestId(testIds.spinner)).toBeInTheDocument();
    });

    it('should pass "loaderClassName"', () => {
        const dti = 'action-button-dti';
        const loaderClassName = 'foo';
        const { getByTestId } = render(
            <ActionButton
                icon={null}
                dataTestId={dti}
                loading={true}
                loaderClassName={loaderClassName}
            />,
        );

        const testIds = getActionButtonTestIds(dti);

        expect(getByTestId(testIds.spinner)).toHaveClass(loaderClassName);
    });
});

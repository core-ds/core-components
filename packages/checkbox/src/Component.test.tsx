import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import { Checkbox } from './index';

describe('Checkbox', () => {
    describe('Display tests', () => {
        it('should display correctly', () => {
            expect(render(<Checkbox label='label' hint='hint' />)).toMatchSnapshot();
        });

        it('should display indeterminate correctly', () => {
            expect(
                render(<Checkbox label='label' hint='hint' indeterminate={true} />),
            ).toMatchSnapshot();
        });

        it('should display error state', () => {
            expect(render(<Checkbox label='label' hint='hint' error='error' />)).toMatchSnapshot();
        });
    });

    describe('Styles tests', () => {
        it('should set custom class', () => {
            const className = 'custom-class';
            const { container } = render(<Checkbox className={className} />);

            expect(container.firstElementChild).toHaveClass(className);
        });

        it('should set contentClassName', () => {
            const className = 'custom-class';
            const { container } = render(<Checkbox label='label' contentClassName={className} />);

            expect(container.querySelector('.content')).toHaveClass(className);
        });

        it('should set boxClassName', () => {
            const className = 'custom-class';
            const { container } = render(<Checkbox boxClassName={className} />);

            expect(container.querySelector('.box')).toHaveClass(className);
        });

        it('should set `checked` class', () => {
            const { container } = render(<Checkbox checked={true} />);

            expect(container.firstElementChild).toHaveClass('checked');
        });

        it('should set `disabled` class', () => {
            const { container } = render(<Checkbox disabled={true} />);

            expect(container.firstElementChild).toHaveClass('disabled');
        });

        it('should set `indeterminate` class', () => {
            const { container } = render(<Checkbox indeterminate={true} />);

            expect(container.firstElementChild).toHaveClass('indeterminate');
        });

        it('should set size 20 as default size', () => {
            const { container } = render(<Checkbox />);

            expect(container.firstElementChild).toHaveClass('size-20');
        });

        it('should set size 20', () => {
            const { container } = render(<Checkbox size={20} />);

            expect(container.firstElementChild).toHaveClass('size-20');
        });

        it('should set size 24', () => {
            const { container } = render(<Checkbox size={24} />);

            expect(container.firstElementChild).toHaveClass('size-24');
        });
    });

    describe('Attributes tests', () => {
        const dataTestId = 'test-id';

        const renderComponent = (props = {}) => {
            return render(<Checkbox dataTestId={dataTestId} {...props} />);
        };

        it('should set `data-test-id` atribute', () => {
            const { getByTestId } = renderComponent();

            expect(getByTestId(dataTestId).tagName).toBe('INPUT');
        });

        it('should set disabled attribute', () => {
            const { getByTestId } = renderComponent({ disabled: true });

            expect(getByTestId(dataTestId)).toBeDisabled();
        });

        it('should set checked attribute', () => {
            const { getByTestId } = renderComponent({ checked: true });

            expect(getByTestId(dataTestId)).toBeChecked();
        });

        it('should set name attribute', () => {
            const { getByTestId } = renderComponent({ name: 'checkbox-name' });

            expect(getByTestId(dataTestId)).toHaveAttribute('name', 'checkbox-name');
        });
    });

    describe('Render tests', () => {
        test('should unmount without errors', () => {
            const { unmount } = render(<Checkbox />);

            expect(unmount).not.toThrow();
        });
    });

    describe('Interaction tests', () => {
        test('should call `onChange` prop if not disabled', () => {
            const cb = jest.fn();

            const { container } = render(<Checkbox onChange={cb} checked={true} />);

            if (container.firstElementChild) {
                fireEvent.click(container.firstElementChild);
            }

            expect(cb).toHaveBeenCalledTimes(1);
        });

        test('should not call `onChange` prop if disabled', () => {
            const cb = jest.fn();

            const { container } = render(<Checkbox onChange={cb} disabled={true} />);

            if (container.firstElementChild) {
                fireEvent.click(container.firstElementChild);
            }

            expect(cb).not.toHaveBeenCalled();
        });

        test('should not call `onChange` prop if disabled and checked', () => {
            const cb = jest.fn();

            const { container } = render(<Checkbox onChange={cb} checked={true} disabled={true} />);

            if (container.firstElementChild) {
                fireEvent.click(container.firstElementChild);
            }

            expect(cb).not.toHaveBeenCalled();
        });

        test('should not call `onChange` prop if inactive', () => {
            const cb = jest.fn();

            const { container } = render(<Checkbox onChange={cb} inactive={true} />);

            if (container.firstElementChild) {
                fireEvent.click(container.firstElementChild);
            }

            expect(cb).not.toHaveBeenCalled();
        });

        test('should not call `onChange` prop if inactive and checked', () => {
            const cb = jest.fn();

            const { container } = render(<Checkbox onChange={cb} checked={true} inactive={true} />);

            if (container.firstElementChild) {
                fireEvent.click(container.firstElementChild);
            }

            expect(cb).not.toHaveBeenCalled();
        });

        test('should not call `onChange` on addon click', () => {
            const cb = jest.fn();
            const addonDti = 'addon';

            const { getByTestId } = render(
                <Checkbox onChange={cb} addons={<div data-test-id={addonDti} />} />,
            );

            fireEvent.click(getByTestId(addonDti));

            expect(cb).not.toHaveBeenCalled();
        });
    });
});

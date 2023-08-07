import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Textarea } from './index';

describe('Textarea', () => {
    Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: jest.fn().mockImplementation((query) => ({
            matches: false,
            media: query,
            onchange: null,
            addListener: jest.fn(), // Deprecated
            removeListener: jest.fn(), // Deprecated
            addEventListener: jest.fn(),
            removeEventListener: jest.fn(),
            dispatchEvent: jest.fn(),
        })),
    });

    describe('Snapshots tests', () => {
        it('should match snapshot', () => {
            const { container } = render(<Textarea value='value' nativeScrollbar={true} />);

            expect(container).toMatchSnapshot();
        });

        it('should match snapshot with default counter', () => {
            const { container } = render(
                <Textarea
                    value='value'
                    maxLength={500}
                    nativeScrollbar={true}
                    showCounter={true}
                />,
            );

            expect(container).toMatchSnapshot();
        });

        it('should match snapshot with custom counter', () => {
            const { container } = render(
                <Textarea
                    nativeScrollbar={true}
                    value='value'
                    maxLength={500}
                    showCounter={true}
                    getCounterText={() => 'Custom counter'}
                />,
            );

            expect(container).toMatchSnapshot();
        });

        it('should match snapshot with custom scrollbar', () => {
            const { container } = render(<Textarea nativeScrollbar={false} value='value' />);

            expect(container).toMatchSnapshot();
        });
    });

    it('should forward ref to textarea', () => {
        const textareaRef = jest.fn();
        const dataTestId = 'test-id';
        render(<Textarea ref={textareaRef} dataTestId={dataTestId} />);

        expect(textareaRef.mock.calls[0][0]).toEqual(screen.getByTestId(dataTestId));
    });

    it('should set `data-test-id` attribute to textarea', () => {
        const dataTestId = 'test-id';
        render(<Textarea block={true} dataTestId={dataTestId} />);

        expect(screen.getByTestId(dataTestId).tagName).toBe('TEXTAREA');
    });

    describe('Classes tests', () => {
        it('should set `className` class to form-control wrapper', () => {
            const { container } = render(<Textarea className='test-class' />);

            expect(container.querySelector('.test-class')).toHaveClass('component');
        });

        it('should set `textareaClassName` class to textarea', () => {
            const className = 'test-class';
            render(<Textarea textareaClassName={className} />);

            expect(screen.getByRole('textbox')).toHaveClass(className);
        });

        describe('when component is controlled', () => {
            it('should set `filled` class when value passed', () => {
                render(<Textarea value='some value' nativeScrollbar={true} />);

                expect(screen.getByRole('textbox')).toHaveClass('filled');
            });

            it('should not set `filled` class if the value is empty', () => {
                render(<Textarea value='' />);

                expect(screen.getByRole('textbox')).not.toHaveClass('filled');
            });

            it('should unset `filled` class if the value becomes empty', () => {
                const { rerender } = render(<Textarea value='some value' />);

                rerender(<Textarea value='' />);

                expect(screen.getByRole('textbox')).not.toHaveClass('filled');
            });
        });

        describe('when component is uncontrolled', () => {
            it('should set `filled` class when defaultValue passed', () => {
                render(<Textarea defaultValue='some value' nativeScrollbar={true} />);

                expect(screen.getByRole('textbox')).toHaveClass('filled');
            });

            it('should not set `filled` class if the value is empty', () => {
                render(<Textarea nativeScrollbar={true} />);

                expect(screen.getByRole('textbox')).not.toHaveClass('filled');
            });

            it('should unset `filled` class if value becomes empty', async () => {
                render(<Textarea defaultValue='some value' nativeScrollbar={true} />);

                const textarea = screen.getByRole('textbox') as HTMLInputElement;

                await userEvent.type(textarea, '{backspace}', {
                    initialSelectionStart: 0,
                    initialSelectionEnd: textarea.value.length,
                });

                fireEvent.blur(textarea);

                expect(textarea.value).toBe('');
                expect(textarea).not.toHaveClass('filled');
            });
        });

        it('should set `hasInnerLabel` class', () => {
            render(<Textarea label='label' />);

            expect(screen.getByRole('textbox')).toHaveClass('hasInnerLabel');
        });

        it('should set `resizeVertical` class', () => {
            const { container } = render(<Textarea resize='vertical' />);

            const inner = container.firstElementChild as HTMLElement;
            const inputWrapper = inner.firstElementChild as HTMLElement;

            expect(inputWrapper.firstElementChild).toHaveClass('resizeVertical');
        });

        it('should set `disabled` attribute', () => {
            render(<Textarea disabled={true} />);

            expect(screen.getByRole('textbox')).toHaveAttribute('disabled');
        });

        it('should set `maxHeight` style with autosize on', () => {
            render(<Textarea nativeScrollbar={true} autosize={true} maxHeight={100} />);

            expect(screen.getByRole('textbox')).toHaveStyle('max-height: 100px');
        });

        it('should set `maxHeight` style with autosize off', () => {
            render(<Textarea nativeScrollbar={true} autosize={false} maxHeight={100} />);

            expect(screen.getByRole('textbox')).toHaveStyle('max-height: 100px');
        });
    });

    describe('Callbacks tests', () => {
        it('should call `onChange` prop', () => {
            const cb = jest.fn();
            const value = '123';
            render(<Textarea onChange={cb} />);

            const textarea = screen.getByRole('textbox') as HTMLTextAreaElement;

            fireEvent.change(textarea, { target: { value } });

            expect(cb).toBeCalledTimes(1);
            expect(textarea.value).toBe(value);
        });

        it('should call `onFocus` prop', () => {
            const cb = jest.fn();
            render(<Textarea onFocus={cb} />);

            fireEvent.focus(screen.getByRole('textbox'));

            expect(cb).toBeCalledTimes(1);
        });

        it('should call `onBlur` prop', () => {
            const cb = jest.fn();
            render(<Textarea onBlur={cb} />);

            fireEvent.blur(screen.getByRole('textbox'));

            expect(cb).toBeCalledTimes(1);
        });

        it('should not call `onChange` prop if disabled', () => {
            const cb = jest.fn();
            render(<Textarea onChange={cb} disabled={true} />);

            const textarea = screen.getByRole('textbox') as HTMLTextAreaElement;

            userEvent.type(textarea, '123');

            expect(cb).not.toBeCalled();
        });
    });

    it('should unmount without errors', () => {
        const { unmount } = render(<Textarea value='value' onChange={jest.fn()} />);

        expect(unmount).not.toThrowError();
    });
});

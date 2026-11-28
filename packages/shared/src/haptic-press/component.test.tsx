import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';

import { HapticPress } from './index';

import * as os from '../os';

describe('HapticPress', () => {
    beforeEach(() => {
        jest.spyOn(os, 'isIOS').mockReturnValue(true);
        Object.defineProperty(HTMLInputElement.prototype, 'switch', {
            configurable: true,
            value: true,
        });
    });

    afterEach(() => {
        jest.restoreAllMocks();
        Reflect.deleteProperty(HTMLInputElement.prototype, 'switch');
    });

    it('submits once with the original button and keeps focus in the invalid field', () => {
        const submit = jest.fn((event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            screen.getByRole('textbox').focus();
        });
        const onChange = jest.fn();
        const { container } = render(
            <form noValidate={true} onSubmit={submit} onChange={onChange}>
                <input required={true} />
                <HapticPress>
                    <button type='submit'>Send</button>
                </HapticPress>
            </form>,
        );
        const button = screen.getByRole('button') as HTMLButtonElement;
        const control = container.querySelector('input[hidden]') as HTMLInputElement;
        fireEvent.click(control.parentElement!);
        expect(submit).toHaveBeenCalledTimes(1);
        expect((submit.mock.calls[0][0].nativeEvent as SubmitEvent).submitter).toBe(button);
        expect(screen.getByRole('textbox')).toHaveFocus();
        expect(control.form).toBeNull();
        expect(onChange).not.toHaveBeenCalled();
    });

    it('preserves cancellation of the original link action', () => {
        const click = jest.fn((event: React.MouseEvent) => event.preventDefault());
        const { container } = render(
            <HapticPress>
                <a href='#next' onClick={click}>
                    Next
                </a>
            </HapticPress>,
        );
        fireEvent.click(container.querySelector('label')!);
        expect(click).toHaveBeenCalledTimes(1);
        expect(click.mock.calls[0][0].isDefaultPrevented()).toBe(true);
        expect(window.location.hash).toBe('');
    });

    it('keeps the native control when iOS switch feedback is unavailable', () => {
        jest.spyOn(os, 'isIOS').mockReturnValue(false);
        const { container } = render(
            <HapticPress>
                <button type='button'>Send</button>
            </HapticPress>,
        );
        expect(container.querySelector('label')).toBeNull();
        expect(screen.getByRole('button')).toHaveTextContent('Send');
    });
});

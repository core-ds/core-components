import React, { createRef } from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { AccountSelectDesktop } from './desktop';
import { ADD_CARD_KEY, ERRORS } from './constants';
import { AccountSelect } from '.';
import { AccountSelectMobile } from './mobile';

it.each(['6212345678901234567', '5612345678901234567', '6759649826438453', '4111111111111111'])(
    'submits exactly the card number shown in the field: %s',
    async (typed) => {
        const onSubmit = jest.fn();
        const { getByPlaceholderText, getByText } = render(
            <AccountSelectDesktop
                selected={ADD_CARD_KEY}
                options={[{ key: 'card', content: 'Card', value: 'card' }]}
                cardAddingProps={{
                    content: 'Add card',
                    onSubmit,
                    needCVC: false,
                    needExpiryDate: false,
                }}
                OptionsList={() => null}
            />,
        );
        const input = getByPlaceholderText('Карта') as HTMLInputElement;

        await userEvent.type(input, typed);

        const shown = input.value.replace(/\D/g, '');

        expect(onSubmit).toHaveBeenLastCalledWith({ number: shown });
        expect(getByText(shown.slice(-4))).toBeInTheDocument();
    },
);

it.each([AccountSelectDesktop, AccountSelectMobile])(
    'exposes the card number input to assistive technology (%#)',
    async (Component) => {
        const { getByPlaceholderText, queryAllByRole, getByRole } = render(
            <Component
                selected={ADD_CARD_KEY}
                options={[{ key: 'card', content: 'Card', value: 'card' }]}
                cardAddingProps={{ content: 'Add card' }}
                OptionsList={() => null}
            />,
        );

        expect(queryAllByRole('textbox')).toContain(getByPlaceholderText('Карта'));
        const numberInput = getByRole('textbox', { name: 'Номер карты' });
        fireEvent.input(numberInput, { target: { value: '4111111111111111' } });
        await waitFor(() => expect(getByRole('textbox', { name: 'Срок действия' })).toHaveFocus());
        expect(getByRole('textbox', { name: 'Срок действия' })).toBeVisible();
        expect(getByRole('textbox', { name: 'CVC' })).toBeVisible();
    },
);

it('does not pin the desktop version on a mobile viewport when client="desktop"', () => {
    const originalMatchMedia = window.matchMedia;

    Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: jest.fn().mockImplementation((query) => ({
            matches: false,
            media: query,
            onchange: null,
            addListener: jest.fn(),
            removeListener: jest.fn(),
            addEventListener: jest.fn(),
            removeEventListener: jest.fn(),
            dispatchEvent: jest.fn(),
        })),
    });

    const { container } = render(
        <AccountSelect
            client='desktop'
            options={[{ key: 'card', content: 'Card', value: 'card' }]}
        />,
    );

    expect(container.querySelector('.accountSelect')).toBeNull();
    window.matchMedia = originalMatchMedia;
});

it.each([AccountSelectDesktop, AccountSelectMobile])(
    'shows the card validation error when error={undefined} is passed (%#)',
    async (Component) => {
        const { getByPlaceholderText, getByRole, queryByText } = render(
            <div>
                <Component
                    error={undefined}
                    selected={ADD_CARD_KEY}
                    options={[{ key: 'card', content: 'Card', value: 'card' }]}
                    cardAddingProps={{ content: 'Add card' }}
                />
                <button type='button'>outside</button>
            </div>,
        );
        const cardInput = getByPlaceholderText('Карта');

        fireEvent.input(cardInput, { target: { value: '1234' } });
        fireEvent.blur(cardInput, { relatedTarget: getByRole('button', { name: 'outside' }) });

        await waitFor(() => expect(queryByText(ERRORS.CARD_NUMBER_ERROR)).toBeInTheDocument());
    },
);

it.each([AccountSelect, AccountSelectDesktop, AccountSelectMobile])(
    'ref type matches the element it receives (%#)',
    (Component) => {
        const originalMatchMedia = window.matchMedia;
        window.matchMedia = jest.fn().mockImplementation((query) => ({
            matches: true,
            media: query,
            addListener: jest.fn(),
            removeListener: jest.fn(),
        }));
        const ref = createRef<HTMLDivElement>();

        render(<Component ref={ref} options={[{ key: 'card', content: 'Card', value: 'card' }]} />);

        expect(ref.current).toBeInstanceOf(HTMLDivElement);
        window.matchMedia = originalMatchMedia;
    },
);

it.each([AccountSelectDesktop, AccountSelectMobile])(
    'ignores card input when disabled (%#)',
    async (Component) => {
        const onSubmit = jest.fn();
        const { getByPlaceholderText } = render(
            <Component
                disabled={true}
                selected={ADD_CARD_KEY}
                options={[{ key: 'card', content: 'Card', value: 'card' }]}
                cardAddingProps={{
                    content: 'Add card',
                    onSubmit,
                    needCVC: false,
                    needExpiryDate: false,
                }}
            />,
        );
        const input = getByPlaceholderText('Карта');

        await userEvent.type(input, '4111111111111111');

        expect(input).toBeDisabled();
        expect(onSubmit).not.toHaveBeenCalled();
    },
);

describe('AccountSelectDesktop', () => {
    it('should remove inactive card fields from the layout while the card number is entered', async () => {
        const { getByPlaceholderText } = render(
            <AccountSelectDesktop
                selected={ADD_CARD_KEY}
                options={[{ key: 'card', content: 'Card', value: 'card' }]}
                cardAddingProps={{ content: 'Add card' }}
                OptionsList={() => null}
            />,
        );

        const cardInput = getByPlaceholderText('Карта');
        const expiryInput = getByPlaceholderText('ММ/ГГ');
        const cvcInput = getByPlaceholderText('CVC');

        await waitFor(() => expect(cardInput).toHaveFocus());
        expect(expiryInput).not.toBeVisible();
        expect(cvcInput).not.toBeVisible();

        fireEvent.input(cardInput, { target: { value: '4111111111111111' } });

        await waitFor(() => expect(expiryInput).toHaveFocus());
        expect(expiryInput).toBeVisible();
        expect(cvcInput).toBeVisible();
    });

    it('should keep card input focused and pristine on chevron click', async () => {
        const { container, getByPlaceholderText, queryByText } = render(
            <AccountSelectDesktop
                dataTestId='account-select'
                selected={ADD_CARD_KEY}
                options={[{ key: 'card', content: 'Card', value: 'card' }]}
                cardAddingProps={{ content: 'Add card' }}
                OptionsList={() => null}
            />,
        );

        const input = getByPlaceholderText('Карта');

        await waitFor(() => expect(input).toHaveFocus());

        fireEvent.input(input, { target: { value: '1234' } });

        const rightAddons = container.querySelector(
            '[data-test-id="account-select-field-form-control-right-addons"]',
        );

        expect(rightAddons).toBeInTheDocument();

        fireEvent.mouseDown(rightAddons as HTMLElement);
        fireEvent.blur(input, { relatedTarget: rightAddons });
        fireEvent.click(rightAddons as HTMLElement);

        await waitFor(() => expect(input).toHaveFocus());
        await waitFor(() => expect(queryByText(ERRORS.CARD_NUMBER_ERROR)).not.toBeInTheDocument());
    });

    it('should keep expiry field pristine on chevron click', async () => {
        const { container, getByPlaceholderText, queryByText } = render(
            <AccountSelectDesktop
                dataTestId='account-select'
                selected={ADD_CARD_KEY}
                options={[{ key: 'card', content: 'Card', value: 'card' }]}
                cardAddingProps={{ content: 'Add card' }}
                OptionsList={() => null}
            />,
        );

        const cardInput = getByPlaceholderText('Карта');
        const expiryInput = getByPlaceholderText('ММ/ГГ');
        const rightAddons = container.querySelector(
            '[data-test-id="account-select-field-form-control-right-addons"]',
        );

        expect(rightAddons).toBeInTheDocument();

        fireEvent.input(cardInput, { target: { value: '4111111111111111' } });

        fireEvent.focus(expiryInput);
        fireEvent.mouseDown(rightAddons as HTMLElement);
        fireEvent.blur(expiryInput, { relatedTarget: rightAddons });
        fireEvent.click(rightAddons as HTMLElement);

        await waitFor(() => expect(expiryInput).toHaveFocus());
        expect(queryByText(ERRORS.EXPIRY_EMPTY)).not.toBeInTheDocument();
        expect(queryByText(ERRORS.CVV_EMPTY)).not.toBeInTheDocument();
    });

    it('should keep CVC field pristine on chevron click', async () => {
        const { container, getByPlaceholderText, queryByText } = render(
            <AccountSelectDesktop
                dataTestId='account-select'
                selected={ADD_CARD_KEY}
                options={[{ key: 'card', content: 'Card', value: 'card' }]}
                cardAddingProps={{ content: 'Add card' }}
                OptionsList={() => null}
            />,
        );

        const cardInput = getByPlaceholderText('Карта');
        const expiryInput = getByPlaceholderText('ММ/ГГ');
        const cvcInput = getByPlaceholderText('CVC');
        const rightAddons = container.querySelector(
            '[data-test-id="account-select-field-form-control-right-addons"]',
        );

        expect(rightAddons).toBeInTheDocument();

        fireEvent.input(cardInput, { target: { value: '4111111111111111' } });
        fireEvent.input(expiryInput, { target: { value: '12/99' } });

        fireEvent.focus(cvcInput);
        fireEvent.mouseDown(rightAddons as HTMLElement);
        fireEvent.blur(cvcInput, { relatedTarget: rightAddons });
        fireEvent.click(rightAddons as HTMLElement);

        await waitFor(() => expect(cvcInput).toHaveFocus());
        expect(queryByText(ERRORS.CVV_EMPTY)).not.toBeInTheDocument();
        expect(queryByText(ERRORS.EXPIRY_EMPTY)).not.toBeInTheDocument();
    });

    it('should not validate CVC when cleared and focus moves to expiry field', async () => {
        const { getByPlaceholderText, getByRole, queryByText } = render(
            <div>
                <AccountSelectDesktop
                    selected={ADD_CARD_KEY}
                    options={[{ key: 'card', content: 'Card', value: 'card' }]}
                    cardAddingProps={{ content: 'Add card' }}
                    OptionsList={() => null}
                />
                <button type='button'>outside</button>
            </div>,
        );

        const cardInput = getByPlaceholderText('Карта');
        const expiryInput = getByPlaceholderText('ММ/ГГ');
        const cvcInput = getByPlaceholderText('CVC');
        const outsideButton = getByRole('button', { name: 'outside' });

        fireEvent.input(cardInput, { target: { value: '4111111111111111' } });
        fireEvent.focus(expiryInput);
        fireEvent.input(expiryInput, { target: { value: '12/99' } });
        fireEvent.focus(cvcInput);
        fireEvent.input(cvcInput, { target: { value: '123' } });

        fireEvent.blur(cvcInput, { relatedTarget: outsideButton });
        fireEvent.focus(cvcInput);
        fireEvent.input(cvcInput, { target: { value: '' } });
        fireEvent.blur(cvcInput, { relatedTarget: expiryInput });
        fireEvent.focus(expiryInput);

        await waitFor(() => expect(queryByText(ERRORS.CVV_EMPTY)).not.toBeInTheDocument());
    });

    it('should not show CVC error while expiry field is focused', async () => {
        const { getByPlaceholderText, getByRole, queryByText } = render(
            <div>
                <AccountSelectDesktop
                    selected={ADD_CARD_KEY}
                    options={[{ key: 'card', content: 'Card', value: 'card' }]}
                    cardAddingProps={{ content: 'Add card' }}
                    OptionsList={() => null}
                />
                <button type='button'>outside</button>
            </div>,
        );

        const cardInput = getByPlaceholderText('Карта');
        const expiryInput = getByPlaceholderText('ММ/ГГ');
        const cvcInput = getByPlaceholderText('CVC');
        const outsideButton = getByRole('button', { name: 'outside' });

        fireEvent.input(cardInput, { target: { value: '4111111111111111' } });
        fireEvent.focus(cvcInput);
        fireEvent.blur(cvcInput, { relatedTarget: outsideButton });
        fireEvent.focus(expiryInput);

        await waitFor(() => expect(queryByText(ERRORS.CVV_EMPTY)).not.toBeInTheDocument());
    });

    it('should not show expiry error while CVC field is focused', async () => {
        const { getByPlaceholderText, getByRole, queryByText } = render(
            <div>
                <AccountSelectDesktop
                    selected={ADD_CARD_KEY}
                    options={[{ key: 'card', content: 'Card', value: 'card' }]}
                    cardAddingProps={{ content: 'Add card' }}
                    OptionsList={() => null}
                />
                <button type='button'>outside</button>
            </div>,
        );

        const cardInput = getByPlaceholderText('Карта');
        const expiryInput = getByPlaceholderText('ММ/ГГ');
        const cvcInput = getByPlaceholderText('CVC');
        const outsideButton = getByRole('button', { name: 'outside' });

        fireEvent.input(cardInput, { target: { value: '4111111111111111' } });
        fireEvent.focus(expiryInput);
        fireEvent.blur(expiryInput, { relatedTarget: outsideButton });
        fireEvent.focus(cvcInput);

        await waitFor(() => expect(queryByText(ERRORS.EXPIRY_EMPTY)).not.toBeInTheDocument());
    });

    it('should show invalid expiry error and clear it after a character is deleted', async () => {
        const { getByPlaceholderText, queryByText } = render(
            <AccountSelectDesktop
                selected={ADD_CARD_KEY}
                options={[{ key: 'card', content: 'Card', value: 'card' }]}
                cardAddingProps={{ content: 'Add card' }}
                OptionsList={() => null}
            />,
        );

        const cardInput = getByPlaceholderText('Карта');
        const expiryInput = getByPlaceholderText('ММ/ГГ');

        fireEvent.input(cardInput, { target: { value: '4111111111111111' } });
        fireEvent.focus(expiryInput);
        fireEvent.input(expiryInput, { target: { value: '12/20' } });

        await waitFor(() => expect(queryByText(ERRORS.EXPIRY_ERROR)).toBeInTheDocument());

        fireEvent.input(expiryInput, { target: { value: '12/2' } });

        await waitFor(() => expect(queryByText(ERRORS.EXPIRY_ERROR)).not.toBeInTheDocument());
    });

    it('should reset card data when selected option changes from add card', async () => {
        const { getByPlaceholderText, rerender } = render(
            <AccountSelectDesktop
                selected={ADD_CARD_KEY}
                options={[{ key: 'card', content: 'Card', value: 'card' }]}
                cardAddingProps={{ content: 'Add card' }}
                OptionsList={() => null}
            />,
        );

        fireEvent.input(getByPlaceholderText('Карта'), {
            target: { value: '4111111111111111' },
        });
        fireEvent.input(getByPlaceholderText('ММ/ГГ'), { target: { value: '12/99' } });
        fireEvent.input(getByPlaceholderText('CVC'), { target: { value: '123' } });

        rerender(
            <AccountSelectDesktop
                selected='card'
                options={[{ key: 'card', content: 'Card', value: 'card' }]}
                cardAddingProps={{ content: 'Add card' }}
                OptionsList={() => null}
            />,
        );

        rerender(
            <AccountSelectDesktop
                selected={ADD_CARD_KEY}
                options={[{ key: 'card', content: 'Card', value: 'card' }]}
                cardAddingProps={{ content: 'Add card' }}
                OptionsList={() => null}
            />,
        );

        await waitFor(() => expect(getByPlaceholderText('Карта')).toHaveValue(''));
        expect(getByPlaceholderText('ММ/ГГ')).toHaveValue('');
        expect(getByPlaceholderText('CVC')).toHaveValue('');
    });

    it('should use the same card data contract for onInput and onSubmit', async () => {
        const handleInput = jest.fn();
        const handleSubmit = jest.fn();

        const { getByPlaceholderText } = render(
            <AccountSelectDesktop
                selected={ADD_CARD_KEY}
                options={[{ key: 'card', content: 'Card', value: 'card' }]}
                cardAddingProps={{
                    content: 'Add card',
                    expiryAsDate: false,
                    onInput: handleInput,
                    onSubmit: handleSubmit,
                }}
                OptionsList={() => null}
            />,
        );

        await userEvent.type(getByPlaceholderText('Карта'), '4111111111111111');
        fireEvent.input(getByPlaceholderText('ММ/ГГ'), { target: { value: '12/99' } });
        fireEvent.input(getByPlaceholderText('CVC'), { target: { value: '123' } });

        const cardData = {
            number: '4111111111111111',
            expiryDate: '12/99',
            CVC: '123',
        };

        await waitFor(() => expect(handleInput).toHaveBeenLastCalledWith(cardData));
        expect(handleSubmit).toHaveBeenCalledWith(cardData);
    });

    it('should submit card data without blurring completed field', async () => {
        const handleSubmit = jest.fn();

        const { getByPlaceholderText } = render(
            <AccountSelectDesktop
                selected={ADD_CARD_KEY}
                options={[{ key: 'card', content: 'Card', value: 'card' }]}
                cardAddingProps={{
                    content: 'Add card',
                    expiryAsDate: false,
                    onSubmit: handleSubmit,
                }}
                OptionsList={() => null}
            />,
        );

        await userEvent.type(getByPlaceholderText('Карта'), '4111111111111111');
        fireEvent.input(getByPlaceholderText('ММ/ГГ'), { target: { value: '12/99' } });

        const cvcInput = getByPlaceholderText('CVC');

        await userEvent.type(cvcInput, '123');

        await waitFor(() =>
            expect(handleSubmit).toHaveBeenCalledWith({
                number: '4111111111111111',
                expiryDate: '12/99',
                CVC: '123',
            }),
        );
        expect(cvcInput).toHaveFocus();
    });

    it('should delete digit before expiry slash on backspace', async () => {
        const { getByPlaceholderText } = render(
            <AccountSelectDesktop
                selected={ADD_CARD_KEY}
                options={[{ key: 'card', content: 'Card', value: 'card' }]}
                cardAddingProps={{ content: 'Add card' }}
                OptionsList={() => null}
            />,
        );

        const cardInput = getByPlaceholderText('Карта');
        const expiryInput = getByPlaceholderText('ММ/ГГ') as HTMLInputElement;

        fireEvent.input(cardInput, { target: { value: '4111111111111111' } });
        await userEvent.type(expiryInput, '1234');

        expect(expiryInput).toHaveValue('12/34');

        await userEvent.click(expiryInput);
        expiryInput.setSelectionRange(4, 4);
        await userEvent.keyboard('{Backspace}');

        expect(expiryInput).toHaveValue('12/4');

        expiryInput.setSelectionRange(3, 3);
        await userEvent.keyboard('{Backspace}');

        await waitFor(() => {
            expect(expiryInput).toHaveValue('14');
            expect(expiryInput.selectionStart).toBe(1);
            expect(expiryInput.selectionEnd).toBe(1);
        });
    });
});

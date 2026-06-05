import React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react';

import { AccountSelectDesktop } from './desktop';
import { ADD_CARD_KEY, ERRORS } from './constants';

describe('AccountSelectDesktop', () => {
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

        fireEvent.input(getByPlaceholderText('Карта'), {
            target: { value: '4111111111111111' },
        });
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
});

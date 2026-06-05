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
        fireEvent.click(rightAddons as HTMLElement);

        await waitFor(() => expect(input).toHaveFocus());
        await waitFor(() => expect(queryByText(ERRORS.CARD_NUMBER_ERROR)).not.toBeInTheDocument());
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
});

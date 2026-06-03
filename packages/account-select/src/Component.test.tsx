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
});

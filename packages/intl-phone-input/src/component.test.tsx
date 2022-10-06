import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { IntlPhoneInput } from './index';

describe('IntlPhoneInput', () => {
    const testId = 'intl-phone-input';

    it('should match snapshot', () => {
        const { container } = render(
            <IntlPhoneInput value='+7 111 111 11 11' onChange={jest.fn()} />,
        );

        expect(container).toMatchSnapshot();
    });

    it('should unmount without errors', () => {
        const { unmount } = render(
            <IntlPhoneInput value='+7 111 111 11 11' onChange={jest.fn()} />,
        );

        expect(unmount).not.toThrowError();
    });

    it('should call `onChange` callback after input was changed with dial code of country without priority', async () => {
        const onChange = jest.fn();
        render(<IntlPhoneInput value='' onChange={onChange} dataTestId={testId} />);

        const input = await screen.getByDisplayValue('');

        fireEvent.change(input, { target: { value: '+54' } });

        expect(onChange).toHaveBeenCalled();
        expect(onChange).toHaveBeenCalledWith('+54');
    });

    it('should call `onChange` callback after input was changed with dial code of country from NANP', async () => {
        const onChange = jest.fn();
        render(<IntlPhoneInput value='' onChange={onChange} dataTestId={testId} />);

        const input = await screen.getByDisplayValue('');

        fireEvent.change(input, { target: { value: '+1868' } });

        expect(onChange).toHaveBeenCalled();
        expect(onChange).toHaveBeenCalledWith('+1868');
    });

    it('should call `onChange` callback after input was changed with whole russian number', async () => {
        const onChange = jest.fn();
        render(<IntlPhoneInput value='' onChange={onChange} dataTestId={testId} />);

        const input = await screen.getByDisplayValue('');
        fireEvent.change(input, { target: { value: '+74957888878' } });

        expect(onChange).toHaveBeenCalled();
        expect(onChange).toHaveBeenCalledWith('+74957888878');
    });

    it('should have default country flag icon', () => {
        const { container } = render(<IntlPhoneInput value='' onChange={jest.fn()} />);

        const flagComponent = container.querySelector('.flagIcon');

        expect(flagComponent).toHaveClass('ru');
    });

    it('should have passed country flag icon', () => {
        const { container } = render(
            <IntlPhoneInput value='' onChange={jest.fn()} defaultCountryIso2='az' />,
        );

        const flagComponent = container.querySelector('.flagIcon');

        expect(flagComponent).toHaveClass('az');
    });

    it('should set new country flag icon from props', async () => {
        const { container } = render(<IntlPhoneInput value='+61' onChange={jest.fn()} />);

        await waitFor(() => expect(container.querySelector('.flagIcon')).toHaveClass('au'));
    });

    it('should call `onChange` callback after select was changed', async () => {
        const onChange = jest.fn();

        const { container, getAllByRole } = render(<IntlPhoneInput value='' onChange={onChange} />);

        const flagComponent = container.querySelector('.flagIcon');

        fireEvent.click(flagComponent as HTMLSpanElement);
        const option = getAllByRole('option')[0];
        fireEvent.click(option);

        waitFor(() => {
            expect(onChange).toHaveBeenCalled();
        });
    });

    it('should focus on input after select was changed', async () => {
        const { container, getAllByRole } = render(
            <IntlPhoneInput value='+7' onChange={() => null} dataTestId={testId} />,
        );
        const input = await screen.findByDisplayValue('+7');
        const flagComponent = container.querySelector('.flagIcon');

        fireEvent.click(flagComponent as HTMLSpanElement);
        fireEvent.click(getAllByRole('option')[0]);

        waitFor(() => {
            expect(document.activeElement).toBe(input);
        });
    });

    it('should call `onCountryChange` callback after country was changed', () => {
        const onCountryChange = jest.fn();
        const { container, getAllByRole } = render(
            <IntlPhoneInput
                value=''
                onChange={() => null}
                onCountryChange={onCountryChange}
                dataTestId={testId}
            />,
        );
        const flagComponent = container.querySelector('.flagIcon');

        fireEvent.click(flagComponent as HTMLSpanElement);
        fireEvent.click(getAllByRole('option')[0]);

        waitFor(() => {
            expect(onCountryChange).toBeCalledWith('AU');
            expect(onCountryChange).toHaveBeenCalledTimes(1);
        });
    });

    it('should call `onCountryChange` callback after input was changed', async () => {
        const onCountryChange = jest.fn();
        render(
            <IntlPhoneInput
                value=''
                onChange={() => null}
                dataTestId={testId}
                onCountryChange={onCountryChange}
                defaultCountryIso2='ru'
            />,
        );
        const input = await screen.getByDisplayValue('');

        fireEvent.change(input, { target: { value: '+998 12 345 67 89', selectionStart: 0 } });

        expect(onCountryChange).toBeCalledWith('UZ');
        expect(onCountryChange).toHaveBeenCalledTimes(1);
    });

    it('should remove country code', async () => {
        const onChange = jest.fn();
        render(<IntlPhoneInput value='+7' onChange={onChange} />);

        const input = await screen.findByDisplayValue('+7');
        fireEvent.change(input, { target: { value: '+' } });

        waitFor(() => {
            expect(onChange).toHaveBeenCalledWith('+');
            expect(input).toHaveValue('+');
        });
    });

    it('should not remove country code', async () => {
        const onChange = jest.fn();
        render(<IntlPhoneInput value='+7' onChange={onChange} clearableCountryCode={false} />);

        const input = await screen.findByDisplayValue('+7');
        fireEvent.change(input, { target: { value: '+' } });

        waitFor(() => {
            expect(onChange).not.toHaveBeenCalled();
            expect(input).toHaveValue('+7');
        });
    });

    it('should not show country select when one country is available', async () => {
        const countries = [
            {
                areaCodes: null,
                dialCode: '7',
                iso2: 'ru',
                name: 'Россия',
                priority: 0,
            },
        ];
        const { queryByTestId } = render(
            <IntlPhoneInput value='+7' countries={countries} onChange={() => null} />,
        );

        const countrySelect = queryByTestId('countries-select');

        expect(countrySelect).toBeNull();
    });

    it('should show empty country', async () => {
        const onCountryChange = jest.fn();
        render(
            <IntlPhoneInput
                value=''
                onChange={() => null}
                dataTestId={testId}
                onCountryChange={onCountryChange}
                canBeEmptyCountry={true}
                defaultCountryIso2='ru'
            />,
        );

        const input = screen.getByDisplayValue('');

        fireEvent.change(input, { target: { value: '+', selectionStart: 0 } });

        const icons = screen.getAllByRole('img');

        expect(icons[0]).toHaveClass('emptyCountryIcon');
        expect(onCountryChange).toBeCalledWith(undefined);
    });

    it('should call `onChange` with value "+7" when type "8" in empty field with `ruNumberPriority`', async () => {
        const onChange = jest.fn();
        render(
            <IntlPhoneInput
                value=''
                onChange={onChange}
                dataTestId={testId}
                ruNumberPriority={true}
                defaultCountryIso2='ru'
            />,
        );

        const input = screen.getByDisplayValue('');

        userEvent.type(input, '8');

        await waitFor(() => {
            expect(onChange).toBeCalledWith('+7');
        });
    });

    it('should call `onChange` with value "+7 9" when type "9" in empty field with `ruNumberPriority`', async () => {
        const onChange = jest.fn();
        render(
            <IntlPhoneInput
                value=''
                onChange={onChange}
                dataTestId={testId}
                ruNumberPriority={true}
                defaultCountryIso2='ru'
            />,
        );

        const input = screen.getByDisplayValue('');

        userEvent.type(input, '9');

        await waitFor(() => {
            expect(onChange).toBeCalledWith('+7 9');
        });
    });

    it('should call `onChange` with value "+7" when type "7" in empty field with `ruNumberPriority`', async () => {
        const onChange = jest.fn();
        render(
            <IntlPhoneInput
                value=''
                onChange={onChange}
                dataTestId={testId}
                ruNumberPriority={true}
                defaultCountryIso2='ru'
            />,
        );

        const input = screen.getByDisplayValue('');

        userEvent.type(input, '7');

        await waitFor(() => {
            expect(onChange).toBeCalledWith('+7');
        });
    });

    it('should not render country select when use `staticFlag`', () => {
        const onChange = jest.fn();
        render(
            <IntlPhoneInput
                value=''
                onChange={onChange}
                dataTestId={testId}
                staticFlag={true}
                defaultCountryIso2='ru'
            />,
        );

        const countrySelect = screen.queryByTestId('countries-select');

        expect(countrySelect).toBeNull();
    });

    it('should show "+" when clear value', async () => {
        const onChange = jest.fn();
        render(<IntlPhoneInput value='+7' onChange={onChange} canClear={true} />);

        const clearButton = await screen.findByLabelText('Очистить');

        expect(clearButton).toBeInTheDocument();

        fireEvent.click(clearButton);

        await waitFor(() => {
            expect(onChange).toBeCalledWith('+');
        });
    });
});

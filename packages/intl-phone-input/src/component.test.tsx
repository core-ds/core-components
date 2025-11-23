import React, { useState } from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { IntlPhoneInput } from './';

describe('IntlPhoneInput', () => {
    Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: jest.fn().mockImplementation((query) => ({
            matches: true,
            media: query,
            onchange: null,
            addListener: jest.fn(), // Deprecated
            removeListener: jest.fn(), // Deprecated
            addEventListener: jest.fn(),
            removeEventListener: jest.fn(),
            dispatchEvent: jest.fn(),
        })),
    });

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

        expect(unmount).not.toThrow();
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
        render(<IntlPhoneInput value='' onChange={jest.fn()} />);

        const flagComponent = screen.getByTestId('flag-icon-ru');

        expect(flagComponent).toBeInTheDocument();
    });

    it('should have passed country flag icon', () => {
        const { container } = render(
            <IntlPhoneInput value='' onChange={jest.fn()} defaultCountryIso2='az' />,
        );

        const flagComponent = container.querySelector('.flagIcon');

        expect(flagComponent).toHaveAttribute('data-test-id', 'flag-icon-az');
    });

    it('should set new country flag icon from props', async () => {
        const { container } = render(<IntlPhoneInput value='+61' onChange={jest.fn()} />);

        await waitFor(() =>
            expect(container.querySelector('.flagIcon')).toHaveAttribute(
                'data-test-id',
                'flag-icon-au',
            ),
        );
    });

    it('should call `onChange` callback after select was changed', async () => {
        const onChange = jest.fn();

        const { container, getAllByRole } = render(<IntlPhoneInput value='' onChange={onChange} />);

        const flagComponent = container.querySelector('.flagIcon');

        fireEvent.click(flagComponent as HTMLSpanElement);
        const option = await waitFor(() => getAllByRole('option')[0]);
        fireEvent.click(option);

        await waitFor(() => {
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
        const option = await waitFor(() => getAllByRole('option')[0]);
        fireEvent.click(option);

        await waitFor(() => {
            expect(document.activeElement).toBe(input);
        });
    });

    it('should call `onCountryChange` callback after country was changed', async () => {
        const onCountryChange = jest.fn();
        const { container, getAllByRole } = render(
            <IntlPhoneInput
                value=''
                onChange={() => null}
                onCountryChange={onCountryChange}
                dataTestId={testId}
            />,
        );

        const flagComponent = container.querySelector('span[class^=flagIcon]');
        fireEvent.click(flagComponent as HTMLSpanElement);
        const option = await waitFor(() => getAllByRole('option')[0]);
        fireEvent.click(option);

        await waitFor(() => expect(onCountryChange).toHaveBeenCalledTimes(1));
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

        expect(onCountryChange).toHaveBeenCalledWith('UZ');
        expect(onCountryChange).toHaveBeenCalledTimes(1);
    });

    it('should remove country code', async () => {
        const onChange = jest.fn();
        render(<IntlPhoneInput value='+7' onChange={onChange} />);

        const input = await screen.findByDisplayValue('+7');
        await userEvent.type(input, '{backspace}');

        await waitFor(() => {
            expect(onChange).toHaveBeenCalledWith('+');
        });
    });

    it('should not remove country code', async () => {
        const onChange = jest.fn();
        render(<IntlPhoneInput value='+7' onChange={onChange} clearableCountryCode={false} />);

        const input = await screen.findByDisplayValue('+7');
        fireEvent.change(input, { target: { value: '+' } });

        await waitFor(() => {
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
        expect(onCountryChange).toHaveBeenCalledWith(undefined);
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

        await userEvent.type(input, '8');

        await waitFor(() => {
            expect(onChange).toHaveBeenCalledWith('+7');
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

        await userEvent.type(input, '9');

        await waitFor(() => {
            expect(onChange).toHaveBeenCalledWith('+7 9');
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

        await userEvent.type(input, '7');

        await waitFor(() => {
            expect(onChange).toHaveBeenCalledWith('+7');
        });
    });

    it('should not render country select when use `hideCountrySelect`', () => {
        const onChange = jest.fn();
        render(
            <IntlPhoneInput
                value=''
                onChange={onChange}
                dataTestId={testId}
                hideCountrySelect={true}
                defaultCountryIso2='ru'
            />,
        );

        const countrySelect = screen.queryByTestId('countries-select');

        expect(countrySelect).toBeNull();
    });

    it('should show "+" when clear value', async () => {
        const onChange = jest.fn();
        render(<IntlPhoneInput value='+7' onChange={onChange} clear={true} />);

        const clearButton = await screen.findByLabelText('Очистить');

        expect(clearButton).toBeInTheDocument();

        fireEvent.click(clearButton);

        await waitFor(() => {
            expect(onChange).toHaveBeenCalledWith('+');
        });
    });

    it('should format number when set unformated value', async () => {
        const onChange = jest.fn();
        const onCountryChange = jest.fn();
        const RenderComponent = () => {
            const [value, setValue] = useState('+7 789 123 45 67');

            return (
                <React.Fragment>
                    <IntlPhoneInput
                        value={value}
                        onCountryChange={onCountryChange}
                        onChange={onChange}
                    />
                    <button
                        type='button'
                        data-test-id='intl-change-number'
                        onClick={() => setValue('+79491234567')}
                    >
                        Изменить номер
                    </button>
                </React.Fragment>
            );
        };
        render(<RenderComponent />);

        const btn = await screen.findByTestId('intl-change-number');

        fireEvent.click(btn);

        await waitFor(async () => {
            expect(onChange).toHaveBeenCalledWith('+7 949 123-45-67');
            expect(onCountryChange).toHaveBeenCalledWith('RU');
        });
    });

    it('should be not clearable country code', async () => {
        const onChange = jest.fn();
        render(
            <IntlPhoneInput
                clearableCountryCode={false}
                value='+7 928 123-45-67'
                onChange={onChange}
            />,
        );

        const input = screen.getByDisplayValue('+7 928 123-45-67');

        await userEvent.clear(input);

        await waitFor(() => {
            expect(onChange).toHaveBeenCalledWith('+7');
        });
    });

    it('should be remove chars in selection', async () => {
        const testId = 'input';
        const onChange = jest.fn();
        const { getByTestId } = render(
            <IntlPhoneInput
                inputProps={{ dataTestId: testId }}
                value='+7 983 123-45-67'
                onChange={onChange}
            />,
        );

        const input = getByTestId(testId) as HTMLInputElement;

        await userEvent.type(input, '{backspace}', {
            initialSelectionEnd: 13,
            initialSelectionStart: 10,
        });

        await waitFor(() => {
            expect(onChange).toHaveBeenCalledWith('+7 983 123-67');
        });
    });

    it('should not be call onChange', async () => {
        const testId = 'input';
        const onChange = jest.fn();
        const { getByTestId } = render(
            <IntlPhoneInput
                inputProps={{ dataTestId: testId }}
                value='+7 983 123-45-67'
                onChange={onChange}
            />,
        );

        const input = getByTestId(testId) as HTMLInputElement;

        await userEvent.type(input, 'f', {
            initialSelectionEnd: 10,
            initialSelectionStart: 10,
        });

        await waitFor(() => {
            expect(onChange).not.toHaveBeenCalled();
        });
    });

    it('should change country for 5 chars country code', async () => {
        const onCountryChange = jest.fn();
        const countries = [
            {
                name: 'Абхазия',
                iso2: 'ge-ab',
                priority: 0,
                dialCode: '7 940',
                areaCodes: null,
            },
            {
                areaCodes: null,
                dialCode: '7',
                iso2: 'ru',
                name: 'Россия',
                priority: 0,
            },
        ];

        render(
            <IntlPhoneInput
                value='+7 94'
                countries={countries}
                maxDialCodeLength={5}
                onCountryChange={onCountryChange}
                onChange={() => {}}
            />,
        );

        const input = await screen.getByDisplayValue('+7 94');
        await userEvent.type(input, '0');

        await waitFor(() => {
            expect(onCountryChange).toHaveBeenCalledWith('GE-AB');
        });
    });
});

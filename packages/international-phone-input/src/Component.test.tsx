import React, { useState } from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { InternationalPhoneInputDesktop, InternationalPhoneInputDesktopProps } from './desktop';

describe('InternationalPhoneInput', () => {
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

    const InternationalPhoneInputStateful = ({
        onChange,

        ...restProps
    }: InternationalPhoneInputDesktopProps) => {
        const [value, setValue] = useState('');

        const handleChange: InternationalPhoneInputDesktopProps['onChange'] = (e, payload) => {
            onChange?.(e, payload);
            setValue(payload.value);
        };
        return (
            <InternationalPhoneInputDesktop {...restProps} value={value} onChange={handleChange} />
        );
    };

    const testId = 'international-phone-input';

    it('should match snapshot', () => {
        const { container } = render(
            <InternationalPhoneInputDesktop value='+7 111 111 11 11' onChange={jest.fn()} />,
        );

        expect(container).toMatchSnapshot();
    });

    it('should unmount without errors', () => {
        const { unmount } = render(
            <InternationalPhoneInputDesktop value='+7 111 111 11 11' onChange={jest.fn()} />,
        );

        expect(unmount).not.toThrowError();
    });

    it('should call `onChange` callback after input was changed with dial code of country without priority', () => {
        const onChange = jest.fn();
        render(<InternationalPhoneInputDesktop value='' onChange={onChange} dataTestId={testId} />);

        const input = screen.getByDisplayValue('');

        fireEvent.input(input, { target: { value: '+54' } });

        expect(onChange).toHaveBeenCalledWith(expect.any(Object), { value: '+54' });
    });

    it('should call `onChange` callback after input was changed with dial code of country from NANP', async () => {
        const onChange = jest.fn();
        render(<InternationalPhoneInputStateful onChange={onChange} />);

        const input = screen.getByDisplayValue('');

        fireEvent.input(input, { target: { value: '+1868' } });

        await waitFor(() => {
            expect(onChange).toHaveBeenCalledWith(expect.any(Object), { value: '+1868' });
        });
    });

    it('should call `onChange` callback after input was changed with whole russian number', () => {
        const onChange = jest.fn();
        render(<InternationalPhoneInputStateful onChange={onChange} />);

        const input = screen.getByDisplayValue('');
        fireEvent.input(input, { target: { value: '+74957888878' } });

        expect(onChange).toHaveBeenCalledWith(expect.any(Object), { value: '+7 495 788-88-78' });
    });

    it('should have passed country flag icon', () => {
        const { container } = render(
            <InternationalPhoneInputDesktop value='' onChange={jest.fn()} defaultIso2='az' />,
        );

        const flagComponent = container.querySelector('.flagIcon');

        expect(flagComponent).toHaveAttribute('data-test-id', 'flag-icon-az');
    });

    it('should set new country flag icon from props', async () => {
        const { container } = render(<InternationalPhoneInputDesktop value='+61' />);

        await waitFor(() =>
            expect(container.querySelector('.flagIcon')).toHaveAttribute(
                'data-test-id',
                'flag-icon-au',
            ),
        );
    });

    it('should call `onChange` callback after select was changed', async () => {
        const onChange = jest.fn();

        const { container, getAllByRole } = render(
            <InternationalPhoneInputDesktop value='' onChange={onChange} />,
        );

        const flagComponent = container.querySelector('span[class^="flagIcon"]');

        fireEvent.click(flagComponent as HTMLSpanElement);
        const option = await waitFor(() => getAllByRole('option')[0]);
        fireEvent.click(option);

        expect(onChange).toHaveBeenCalled();
    });

    it('should focus on input after select was changed', async () => {
        const { container, getAllByRole } = render(
            <InternationalPhoneInputDesktop value='+7' onChange={() => null} dataTestId={testId} />,
        );
        const input = await screen.findByDisplayValue('+7');
        const flagComponent = container.querySelector('span[class^="flagIcon"]');

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
            <InternationalPhoneInputDesktop
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
            <InternationalPhoneInputDesktop
                value=''
                onChange={() => null}
                dataTestId={testId}
                onCountryChange={onCountryChange}
            />,
        );
        const input = screen.getByDisplayValue('');

        fireEvent.input(input, { target: { value: '+998 12 345 67 89', selectionStart: 0 } });

        expect(onCountryChange).toBeCalledWith(
            expect.objectContaining({
                iso2: 'uz',
            }),
        );
    });

    it('should remove country code', async () => {
        const onChange = jest.fn();
        render(<InternationalPhoneInputDesktop value='+7' onChange={onChange} />);

        const input = await screen.findByDisplayValue('+7');
        await userEvent.type(input, '{backspace}');

        await waitFor(() => {
            expect(onChange).toHaveBeenCalledWith(expect.any(Object), { value: '' });
        });
    });

    it('should not remove country code', async () => {
        const onChange = jest.fn();
        render(
            <InternationalPhoneInputDesktop
                value='+7'
                onChange={onChange}
                clearableCountryCode={false}
            />,
        );

        const input = await screen.findByDisplayValue('+7');
        fireEvent.input(input, { target: { value: '+' } });

        await waitFor(() => {
            expect(input).toHaveValue('+7 ');
        });
    });

    it('should not show country select when one country is available', async () => {
        const countries = ['ru'];
        const { queryByTestId } = render(
            <InternationalPhoneInputDesktop
                value='+7'
                countries={countries}
                onChange={() => null}
            />,
        );

        const countrySelect = queryByTestId('countries-select');

        expect(countrySelect).toBeNull();
    });

    it('should show empty country', async () => {
        const onCountryChange = jest.fn();
        render(
            <InternationalPhoneInputDesktop
                value=''
                onChange={() => null}
                dataTestId={testId}
                onCountryChange={onCountryChange}
            />,
        );

        const icons = screen.getAllByRole('img');

        expect(icons[0]).toHaveClass('emptyCountryIcon');
    });

    it('should not render country select when use `hideCountrySelect`', () => {
        const onChange = jest.fn();
        render(
            <InternationalPhoneInputDesktop
                value=''
                onChange={onChange}
                dataTestId={testId}
                countrySelectProps={{ hideCountrySelect: true }}
                defaultIso2='ru'
            />,
        );

        const countrySelect = screen.queryByTestId('countries-select');

        expect(countrySelect).toBeNull();
    });

    it('should clear value', async () => {
        const onChange = jest.fn();
        render(<InternationalPhoneInputDesktop value='+7' onChange={onChange} clear={true} />);

        const clearButton = await screen.findByLabelText('Очистить');

        expect(clearButton).toBeInTheDocument();

        fireEvent.click(clearButton);

        await waitFor(() => {
            expect(onChange).toBeCalledWith(null, { value: '' });
        });
    });

    it('should format number when set unformated value', async () => {
        const onChange = jest.fn();
        const onCountryChange = jest.fn();
        const RenderComponent = () => {
            const [value, setValue] = useState('+7 789 123 45 67');

            return (
                <React.Fragment>
                    <InternationalPhoneInputDesktop
                        value={value}
                        onCountryChange={onCountryChange}
                        onChange={(e, p) => {
                            setValue(p.value);
                            onChange(e, p);
                        }}
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
            expect(onChange).toHaveBeenCalledWith(expect.any(Object), {
                value: '+7 949 123-45-67',
            });
            expect(onCountryChange).toHaveBeenCalledWith(
                expect.objectContaining({
                    iso2: 'ru',
                }),
            );
        });
    });

    it('should be not clearable country code', async () => {
        const onChange = jest.fn();
        render(
            <InternationalPhoneInputDesktop
                clearableCountryCode={false}
                value='+7 928 123-45-67'
                onChange={onChange}
                defaultIso2='ru'
            />,
        );

        const input = screen.getByDisplayValue('+7 928 123-45-67');

        for (let i = 0; i < 20; i++) {
            await userEvent.type(input, '{backspace}');
        }

        expect(onChange).toHaveBeenCalledWith(expect.any(Object), { value: '+7' });
    });

    it('should be remove chars in selection', async () => {
        const testId = 'input';
        const onChange = jest.fn();
        const { getByTestId } = render(
            <InternationalPhoneInputDesktop
                dataTestId={testId}
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
            expect(onChange).toBeCalledWith(expect.any(Object), { value: '+7 983 123-67' });
        });
    });

    it('should not be call onChange', async () => {
        const testId = 'input';
        const onChange = jest.fn();
        const { getByTestId } = render(
            <InternationalPhoneInputDesktop
                dataTestId={testId}
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
            expect(onChange).not.toBeCalled();
        });
    });
});

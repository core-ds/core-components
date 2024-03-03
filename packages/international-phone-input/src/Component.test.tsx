import React, { useState } from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { InternationalPhoneInputDesktop, InternationalPhoneInputDesktopProps } from './desktop';
import { InternationalPhoneInputMobile } from './mobile';

import {
    getInternationalPhoneInputDesktopTestIds,
    getInternationalPhoneInputMobileTestIds,
} from './utils';

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

        const handleChange: InternationalPhoneInputDesktopProps['onChange'] = (phone) => {
            onChange?.(phone);
            setValue(phone);
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

        expect(onChange).toHaveBeenCalledWith('+54');
    });

    it('should call `onChange` callback after input was changed with dial code of country from NANP', async () => {
        const onChange = jest.fn();
        render(<InternationalPhoneInputStateful onChange={onChange} />);

        const input = screen.getByDisplayValue('');

        fireEvent.input(input, { target: { value: '+1868' } });

        await waitFor(() => {
            expect(onChange).toHaveBeenCalledWith('+1868');
        });
    });

    it('should call `onChange` callback after input was changed with whole russian number', () => {
        const onChange = jest.fn();
        render(<InternationalPhoneInputStateful onChange={onChange} />);

        const input = screen.getByDisplayValue('');
        fireEvent.input(input, { target: { value: '+74957888878' } });

        expect(onChange).toHaveBeenCalledWith('+7 495 788 88 78');
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

    it('should show a blank icon if the country code is not defined after changing the input', async () => {
        const onCountryChange = jest.fn();
        const { container } = render(
            <InternationalPhoneInputDesktop
                value=''
                onChange={() => null}
                dataTestId={testId}
                onCountryChange={onCountryChange}
                defaultIso2='az'
            />,
        );
        const input = screen.getByDisplayValue('');

        fireEvent.input(input, { target: { value: '+000 12 345 67 89', selectionStart: 0 } });

        const emptyCountryIcon = container.querySelector('.emptyCountryIcon');
        expect(emptyCountryIcon).toBeInTheDocument();
    });

    it('should clear the value and set the default flag', async () => {
        const onChange = jest.fn();
        const { container } = render(
            <InternationalPhoneInputDesktop
                value='+7'
                defaultIso2='az'
                onChange={onChange}
                clear={true}
                clearableCountryCode={true}
            />,
        );

        const clearButton = await screen.findByLabelText('Очистить');
        expect(clearButton).toBeInTheDocument();

        fireEvent.click(clearButton);

        const flagComponent = container.querySelector('.flagIcon');
        expect(flagComponent).toHaveAttribute('data-test-id', 'flag-icon-az');
    });

    it('should clear the value and set an empty icon', async () => {
        const onChange = jest.fn();
        const { container } = render(
            <InternationalPhoneInputDesktop
                value='+7'
                clearableCountryCode={true}
                onChange={onChange}
                onCountryChange={() => undefined}
                clear={true}
            />,
        );

        const clearButton = await screen.findByLabelText('Очистить');
        expect(clearButton).toBeInTheDocument();

        fireEvent.click(clearButton);

        const emptyCountryIcon = container.querySelector('.emptyCountryIcon');
        expect(emptyCountryIcon).toBeInTheDocument();
    });

    it('should remove country code', async () => {
        const onChange = jest.fn();
        render(<InternationalPhoneInputDesktop value='+7' onChange={onChange} />);

        const input = await screen.findByDisplayValue('+7');
        await userEvent.type(input, '{backspace}');

        await waitFor(() => {
            expect(onChange).toHaveBeenCalledWith('');
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
            expect(onChange).toBeCalledWith('');
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
                        onChange={(phone) => {
                            setValue(phone);
                            onChange(phone);
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
            expect(onChange).toHaveBeenCalledWith('+7 949 123 45 67');
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
                value='+7 928 123 45 67'
                onChange={onChange}
                defaultIso2='ru'
            />,
        );

        const input = screen.getByDisplayValue('+7 928 123 45 67');

        for (let i = 0; i < 20; i++) {
            await userEvent.type(input, '{backspace}');
        }

        expect(onChange).toHaveBeenCalledWith('+7');
    });

    it('should be remove chars in selection', async () => {
        const testId = 'input';
        const onChange = jest.fn();
        const { getByTestId } = render(
            <InternationalPhoneInputDesktop
                dataTestId={testId}
                value='+7 983 123 45 67'
                onChange={onChange}
            />,
        );

        const input = getByTestId(testId) as HTMLInputElement;

        await userEvent.type(input, '{backspace}', {
            initialSelectionEnd: 13,
            initialSelectionStart: 10,
        });

        await waitFor(() => {
            expect(onChange).toBeCalledWith('+7 983 123 67');
        });
    });

    it('should not be call onChange', async () => {
        const testId = 'input';
        const onChange = jest.fn();
        const { getByTestId } = render(
            <InternationalPhoneInputDesktop
                dataTestId={testId}
                value='+7 983 123 45 67'
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

    it('should set `data-test-id` attribute in mobile component autocomplete', () => {
        const dti = 'test-dti';
        const { getByTestId } = render(
            <InternationalPhoneInputMobile
                options={[{ key: '+7 921 681 53 98' }]}
                open={true}
                fieldProps={{
                    rightAddons: 'right',
                    error: 'error',
                }}
                inputProps={{
                    error: 'error',
                    rightAddons: 'right',
                }}
                dataTestId={dti}
            />,
        );

        const testIds = getInternationalPhoneInputMobileTestIds(dti);

        expect(getByTestId(testIds.optionsList)).toBeInTheDocument();
        expect(getByTestId(testIds.option)).toBeInTheDocument();
        expect(getByTestId(testIds.bottomSheet)).toBeInTheDocument();
        expect(getByTestId(testIds.bottomSheetHeader)).toBeInTheDocument();
        expect(getByTestId(testIds.bottomSheetContent)).toBeInTheDocument();
        expect(getByTestId(testIds.clearButton)).toBeInTheDocument();
        expect(getByTestId(testIds.applyButton)).toBeInTheDocument();
        expect(getByTestId(testIds.fieldAutocompleteWrapper)).toBeInTheDocument();
        expect(getByTestId(testIds.fieldAutocompleteInner)).toBeInTheDocument();
        expect(getByTestId(testIds.fieldAutocompleteFormControl)).toBeInTheDocument();
        expect(getByTestId(testIds.fieldAutocompleteRightAddons)).toBeInTheDocument();
        expect(getByTestId(testIds.fieldAutocompleteLeftAddons)).toBeInTheDocument();
        expect(getByTestId(testIds.fieldAutocompleteError)).toBeInTheDocument();
        expect(getByTestId(testIds.searchInput)).toBeInTheDocument();
        expect(getByTestId(testIds.searchFormControl)).toBeInTheDocument();
        expect(getByTestId(testIds.searchInner)).toBeInTheDocument();
        expect(getByTestId(testIds.searchLeftAddons)).toBeInTheDocument();
        expect(getByTestId(testIds.searchRightAddons)).toBeInTheDocument();
        expect(getByTestId(testIds.searchError)).toBeInTheDocument();

        const { getByTestId: getByTestIdHint } = render(
            <InternationalPhoneInputMobile
                options={[{ key: '+7 921 681 53 98' }]}
                open={true}
                fieldProps={{ hint: 'hint' }}
                inputProps={{ hint: 'hint' }}
                dataTestId={dti}
            />,
        );

        expect(getByTestIdHint(testIds.fieldAutocompleteHint)).toBeInTheDocument();
        expect(getByTestIdHint(testIds.searchHint)).toBeInTheDocument();
    });

    it('should set `data-test-id` attribute in mobile component country ', () => {
        const dti = 'test-dti';
        const { getByTestId, getAllByTestId } = render(
            <InternationalPhoneInputMobile countrySelectProps={{ open: true }} dataTestId={dti} />,
        );

        const testIds = getInternationalPhoneInputMobileTestIds(dti);

        expect(getAllByTestId(testIds.countryOption).length).toBe(16);
        expect(getByTestId(testIds.countryOptionsList)).toBeInTheDocument();
        expect(getByTestId(testIds.countryBottomSheet)).toBeInTheDocument();
        expect(getByTestId(testIds.countryBottomSheetHeader)).toBeInTheDocument();
        expect(getByTestId(testIds.countryBottomSheetContent)).toBeInTheDocument();
    });

    it('should set `data-test-id` attribute in mobile component no autocomplete', () => {
        const dti = 'test-dti';
        const { getByTestId } = render(
            <InternationalPhoneInputMobile
                options={undefined}
                error='error'
                rightAddons='right'
                dataTestId={dti}
            />,
        );

        const testIds = getInternationalPhoneInputMobileTestIds(dti);

        expect(getByTestId(testIds.field)).toBeInTheDocument();
        expect(getByTestId(testIds.fieldInner)).toBeInTheDocument();
        expect(getByTestId(testIds.fieldFormControl)).toBeInTheDocument();
        expect(getByTestId(testIds.fieldRightAddons)).toBeInTheDocument();
        expect(getByTestId(testIds.fieldLeftAddons)).toBeInTheDocument();
        expect(getByTestId(testIds.fieldError)).toBeInTheDocument();

        const { getByTestId: getByTestIdHint } = render(
            <InternationalPhoneInputMobile options={undefined} hint='hint' dataTestId={dti} />,
        );

        expect(getByTestIdHint(testIds.fieldHint)).toBeInTheDocument();
    });

    it('should set `data-test-id` attribute in desktop component autocomplete', () => {
        const dti = 'test-dti';

        const { getByTestId, container } = render(
            <InternationalPhoneInputDesktop
                options={[{ key: '+7 921 681 53 98' }]}
                open={true}
                error='error'
                inputProps={{
                    rightAddons: 'right',
                }}
                dataTestId={dti}
            />,
        );

        const testIds = getInternationalPhoneInputDesktopTestIds(dti);

        expect(getByTestId(testIds.optionsList)).toBeInTheDocument();
        expect(getByTestId(testIds.option)).toBeInTheDocument();
        expect(getByTestId(testIds.fieldAutocompleteWrapper)).toBeInTheDocument();
        expect(getByTestId(testIds.fieldAutocompleteInner)).toBeInTheDocument();
        expect(getByTestId(testIds.fieldAutocompleteFormControl)).toBeInTheDocument();
        expect(getByTestId(testIds.fieldAutocompleteLeftAddons)).toBeInTheDocument();
        expect(getByTestId(testIds.fieldAutocompleteRightAddons)).toBeInTheDocument();
        expect(getByTestId(testIds.fieldAutocompleteError)).toBeInTheDocument();

        const { getByTestId: getByTestIdHint } = render(
            <InternationalPhoneInputDesktop
                options={[{ key: '+7 921 681 53 98' }]}
                hint='hint'
                dataTestId={dti}
            />,
        );

        expect(getByTestIdHint(testIds.fieldAutocompleteHint)).toBeInTheDocument();
    });

    it('should set `data-test-id` attribute in desktop component country ', () => {
        const dti = 'test-dti';
        const { getByTestId, getAllByTestId } = render(
            <InternationalPhoneInputDesktop countrySelectProps={{ open: true }} dataTestId={dti} />,
        );

        const testIds = getInternationalPhoneInputDesktopTestIds(dti);

        expect(getAllByTestId(testIds.countryOption).length).toBe(16);
        expect(getByTestId(testIds.countryOptionsList)).toBeInTheDocument();
    });

    it('should set `data-test-id` attribute in desktop component no autocomplete', () => {
        const dti = 'test-dti';

        const { getByTestId, container } = render(
            <InternationalPhoneInputDesktop
                options={undefined}
                error='error'
                rightAddons='right'
                dataTestId={dti}
            />,
        );

        const testIds = getInternationalPhoneInputDesktopTestIds(dti);

        expect(getByTestId(testIds.field)).toBeInTheDocument();
        expect(getByTestId(testIds.fieldInner)).toBeInTheDocument();
        expect(getByTestId(testIds.fieldFormControl)).toBeInTheDocument();
        expect(getByTestId(testIds.fieldLeftAddons)).toBeInTheDocument();
        expect(getByTestId(testIds.fieldRightAddons)).toBeInTheDocument();
        expect(getByTestId(testIds.fieldError)).toBeInTheDocument();

        const { getByTestId: getByTestIdHint } = render(
            <InternationalPhoneInputDesktop options={undefined} hint='hint' dataTestId={dti} />,
        );

        expect(getByTestIdHint(testIds.fieldHint)).toBeInTheDocument();
    });
});

import React, { useState } from 'react';
import { fireEvent, render, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { InputAutocompleteMobile, InputAutocompleteMobileProps } from './mobile';

const dataTestId = 'test-id';

const options = [
    { key: '1', content: 'Neptunium' },
    { key: '2', content: 'Plutonium' },
];

const noop = () => {};

const InputAutocompleteMobileWrapper = (props: Partial<InputAutocompleteMobileProps>) => {
    const [value, setValue] = useState('');
    const [open, setOpen] = useState(props.open === undefined ? true : props.open);

    const handleOpen: InputAutocompleteMobileProps['onOpen'] = ({ open: isOpen }) => {
        setOpen(Boolean(isOpen));
    };

    const handleInput: InputAutocompleteMobileProps['onInput'] = (event, payload) => {
        setValue(payload.value);
        props?.onInput?.(event, payload);
    };

    return (
        <InputAutocompleteMobile
            open={open}
            onOpen={handleOpen}
            options={options}
            value={value}
            onChange={noop}
            {...props}
            onInput={handleInput}
            transitionProps={{
                timeout: 0,
                ...props.transitionProps,
            }}
        />
    );
};

describe('InputAutocompleteMobile', () => {
    describe('Snapshots tests', () => {
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

        it('should match snapshot in closed state', () => {
            const { baseElement } = render(<InputAutocompleteMobileWrapper open={false} />);

            expect(baseElement).toMatchSnapshot();
        });

        it('should match snapshot in open state', () => {
            const { baseElement } = render(<InputAutocompleteMobileWrapper />);

            expect(baseElement).toMatchSnapshot();
        });
    });

    describe('Props tests', () => {
        it('should set `data-test-id` attribute', () => {
            const { getByTestId } = render(
                <InputAutocompleteMobileWrapper dataTestId={dataTestId} />,
            );

            expect(getByTestId(dataTestId).tagName).toBe('DIV');
            expect(getByTestId(dataTestId).getAttribute('role')).toBe('combobox');
        });

        it('should be open, if open is `true`', () => {
            const { getByRole } = render(<InputAutocompleteMobileWrapper open={true} />);

            expect(getByRole('dialog')).toBeInTheDocument();
        });

        it('should render title', () => {
            const label = 'Label';

            const { getByRole } = render(
                <InputAutocompleteMobileWrapper label={label} open={true} />,
            );

            expect(getByRole('dialog').querySelector('div[class^="title"]')).toBeInTheDocument();
        });
    });

    describe('Interactions tests', () => {
        it('should close on cancel button click', async () => {
            const closeButtonId = dataTestId + '-clear';
            const handleEnter = jest.fn();

            const { getByTestId, getByRole, queryByTestId } = render(
                <InputAutocompleteMobileWrapper
                    dataTestId={dataTestId}
                    transitionProps={{
                        onEnter: handleEnter,
                    }}
                />,
            );

            await waitFor(() => expect(handleEnter).toHaveBeenCalled(), { timeout: 5000 });

            fireEvent.click(getByTestId(closeButtonId));

            await waitForElementToBeRemoved(() => getByRole('dialog'));

            expect(queryByTestId(closeButtonId)).not.toBeInTheDocument();
        });

        it('should close on continue button click', async () => {
            const continueButtonId = dataTestId + '-apply';
            const handleChange = jest.fn();

            const { getByTestId, getByRole, queryByTestId } = render(
                <InputAutocompleteMobileWrapper dataTestId={dataTestId} onChange={handleChange} />,
            );

            fireEvent.click(getByTestId(continueButtonId));

            await waitForElementToBeRemoved(() => getByRole('dialog'));

            expect(queryByTestId(continueButtonId)).not.toBeInTheDocument();
        });
    });

    describe('Callback tests', () => {
        it('should call onChange', async () => {
            const cb = jest.fn();
            const { findByText } = render(<InputAutocompleteMobileWrapper onChange={cb} />);

            const option = await findByText(options[0].content);
            fireEvent.click(option);
            expect(cb).toBeCalledTimes(1);
        });

        it('should call onBlur', async () => {
            const onBlur = jest.fn();
            const onExited = jest.fn();
            const { findByText } = render(
                <InputAutocompleteMobileWrapper onBlur={onBlur} transitionProps={{ onExited }} />,
            );

            const option = await findByText(options[0].content);

            fireEvent.click(option);
            await waitFor(() => expect(onExited).toBeCalled());
            await userEvent.tab();

            expect(onBlur).toBeCalled();
        });

        it('should restore prev value when click cancel ', async () => {
            const cb = jest.fn();
            const { queryByRole, getByTestId } = render(
                <InputAutocompleteMobileWrapper onInput={cb} dataTestId={dataTestId} />,
            );

            const input = queryByRole('textbox') as HTMLInputElement;

            fireEvent.change(input, { target: { value: '123' } });
            fireEvent.click(getByTestId(dataTestId + '-clear'));

            expect(cb).toHaveBeenNthCalledWith(2, expect.any(Object), { value: '' });
        });

        it('should restore prev value when click close button ', () => {
            const cb = jest.fn();
            const { queryByRole, getByTestId } = render(
                <InputAutocompleteMobileWrapper onInput={cb} dataTestId={dataTestId} />,
            );

            const input = queryByRole('textbox') as HTMLInputElement;

            fireEvent.change(input, { target: { value: '123' } });
            fireEvent.click(getByTestId(dataTestId + '-bottom-sheet-header-closer'));

            expect(cb).toHaveBeenNthCalledWith(2, expect.any(Object), { value: '' });
        });

        it('should apply new value when click continue ', () => {
            const cb = jest.fn();
            const { queryByRole, getByTestId } = render(
                <InputAutocompleteMobileWrapper onInput={cb} dataTestId={dataTestId} />,
            );

            const input = queryByRole('textbox') as HTMLInputElement;

            fireEvent.change(input, { target: { value: '123' } });
            fireEvent.click(getByTestId(dataTestId + '-apply'));

            expect(cb).toBeCalledTimes(1);
            expect(cb).toBeCalledWith(expect.any(Object), { value: '123' });
        });
    });

    describe('Render tests', () => {
        it('should unmount without errors', () => {
            const { unmount } = render(<InputAutocompleteMobileWrapper />);

            expect(unmount).not.toThrowError();
        });
    });
});

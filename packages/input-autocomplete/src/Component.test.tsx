import React, { useState } from 'react';
import { fireEvent, render, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { InputAutocompleteMobile, InputAutocompleteMobileProps } from './mobile';

const dataTestId = 'test-id';

const options = [
    { key: '1', content: 'Neptunium' },
    { key: '2', content: 'Plutonium' },
];

const InputAutocompleteMobileWrapper = (props: Partial<InputAutocompleteMobileProps>) => {
    const [open, setOpen] = useState(props.open === undefined ? true : props.open);

    const handleOpen: InputAutocompleteMobileProps['onOpen'] = ({ open: isOpen }) => {
        setOpen(Boolean(isOpen));
    };

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    const noop = () => {};
    return (
        <InputAutocompleteMobile
            open={open}
            onOpen={handleOpen}
            options={options}
            bottomSheetProps={{
                ...props.bottomSheetProps,
            }}
            value=''
            filter=''
            onChange={noop}
            onFilter={noop}
            {...props}
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
            const closeButtonId = 'close-id';
            const handleEntered = jest.fn();

            const { getByTestId, getByRole, queryByTestId } = render(
                <InputAutocompleteMobileWrapper
                    dataTestId={dataTestId}
                    cancelButtonProps={{
                        dataTestId: closeButtonId,
                    }}
                    bottomSheetProps={{
                        transitionProps: {
                            onEntered: handleEntered,
                        },
                    }}
                />,
            );

            await waitFor(() => expect(handleEntered).toHaveBeenCalledTimes(1), { timeout: 2000 });

            fireEvent.click(getByTestId(closeButtonId));

            await waitForElementToBeRemoved(() => getByRole('dialog'));

            expect(queryByTestId(closeButtonId)).not.toBeInTheDocument();
        });

        it('should close on continue button click', async () => {
            const continueButtonId = 'continue-id';
            const handleChange = jest.fn();

            const { getByTestId, getByRole, queryByTestId } = render(
                <InputAutocompleteMobileWrapper
                    dataTestId={dataTestId}
                    continueButtonProps={{
                        dataTestId: continueButtonId,
                    }}
                    onChange={handleChange}
                />,
            );

            fireEvent.click(getByTestId(continueButtonId));

            await waitForElementToBeRemoved(() => getByRole('dialog'));

            expect(handleChange).toBeCalledTimes(1);
            expect(queryByTestId(continueButtonId)).not.toBeInTheDocument();
        });
    });

    describe('Callback tests', () => {
        it('should call onChange', async () => {
            const cb = jest.fn();
            const { findByText } = render(<InputAutocompleteMobileWrapper onChange={cb} />);

            const option = await findByText(options[0].content);
            fireEvent.click(option);
            await waitFor(() => expect(cb).toBeCalledTimes(1));
        });

        it('should call onFilter', async () => {
            const cb = jest.fn();
            render(<InputAutocompleteMobileWrapper onFilter={cb} />);

            const input = document.querySelector('input') as HTMLInputElement;

            fireEvent.input(input, { target: { value: 'D' } });

            expect(cb).toBeCalledTimes(1);
        });

        it('should call onClearFilter', async () => {
            const cb = jest.fn();
            render(<InputAutocompleteMobileWrapper onClearFilter={cb} filter='123' />);

            const clearButton = document.querySelector('button[aria-label="Очистить"]') as Element;

            fireEvent.click(clearButton);

            expect(cb).toBeCalledTimes(1);
        });

        it('should call onCancel', async () => {
            const closeButtonId = 'close-id';
            const cb = jest.fn();
            const { getByTestId } = render(
                <InputAutocompleteMobileWrapper
                    onCancel={cb}
                    cancelButtonProps={{ dataTestId: closeButtonId }}
                />,
            );

            const closeButton = getByTestId(closeButtonId);

            await act(async () => {
                await fireEvent.click(closeButton);
            });

            expect(cb).toBeCalledTimes(1);
        });
    });

    describe('Render tests', () => {
        it('should unmount without errors', () => {
            const { unmount } = render(<InputAutocompleteMobileWrapper />);

            expect(unmount).not.toThrowError();
        });
    });
});

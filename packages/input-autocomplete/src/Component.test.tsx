import React, { useState } from 'react';
import { fireEvent, render, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
    InputAutocompleteMobile,
    InputAutocompleteMobileProps,
    InputAutocompleteModalMobile,
} from './mobile';
import { InputAutocompleteDesktop } from './desktop';
import { getInputAutocompleteDesktopTestIds, getInputAutocompleteMobileTestIds } from './utils';

const dataTestId = 'test-id';

const options = [
    { key: '1', content: 'Neptunium' },
    { key: '2', content: 'Plutonium' },
];

const COMPONENT_NAME = {
    InputAutocompleteMobile,
    InputAutocompleteModalMobile,
} as const;

const noop = () => {};

const InputAutocompleteMobileWrapper = (props: Partial<InputAutocompleteMobileProps>) => {
    const [value, setValue] = useState('');
    const [open, setOpen] = useState(props.open === undefined ? true : props.open);

    const handleOpen: InputAutocompleteMobileProps['onOpen'] = ({ open: isOpen }) => {
        setOpen(Boolean(isOpen));
    };

    const handleInput: InputAutocompleteMobileProps['onInput'] = (value) => {
        setValue(value);
        props?.onInput?.(value);
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
        (['InputAutocompleteMobile', 'InputAutocompleteModalMobile'] as const).forEach(
            (componentName) => {
                const Component = COMPONENT_NAME[componentName];

                describe(componentName, () => {
                    it('should set `data-test-id` attribute in mobile component', () => {
                        const { getByTestId } = render(
                            <Component
                                open={true}
                                options={[{ key: 'Fermium' }]}
                                fieldProps={{
                                    leftAddons: 'left',
                                    rightAddons: 'right',
                                    error: 'error',
                                }}
                                inputProps={{
                                    error: 'error',
                                    leftAddons: 'left',
                                    rightAddons: 'right',
                                }}
                                dataTestId={dataTestId}
                            />,
                        );

                        const testIds = getInputAutocompleteMobileTestIds(dataTestId);

                        if (componentName === 'InputAutocompleteMobile') {
                            expect(getByTestId(testIds.bottomSheet)).toBeInTheDocument();
                            expect(getByTestId(testIds.bottomSheetHeader)).toBeInTheDocument();
                            expect(getByTestId(testIds.bottomSheetContent)).toBeInTheDocument();
                        } else {
                            expect(getByTestId(testIds.modal)).toBeInTheDocument();
                            expect(getByTestId(testIds.modalHeader)).toBeInTheDocument();
                            expect(getByTestId(testIds.modalContent)).toBeInTheDocument();
                        }

                        expect(getByTestId(testIds.inputAutocomplete)).toBeInTheDocument();
                        expect(getByTestId(testIds.optionsList)).toBeInTheDocument();
                        expect(getByTestId(testIds.option)).toBeInTheDocument();
                        expect(getByTestId(testIds.clearButton)).toBeInTheDocument();
                        expect(getByTestId(testIds.applyButton)).toBeInTheDocument();
                        expect(getByTestId(testIds.fieldInner)).toBeInTheDocument();
                        expect(getByTestId(testIds.fieldFormControl)).toBeInTheDocument();
                        expect(getByTestId(testIds.fieldLeftAddons)).toBeInTheDocument();
                        expect(getByTestId(testIds.fieldRightAddons)).toBeInTheDocument();
                        expect(getByTestId(testIds.fieldError)).toBeInTheDocument();
                        expect(getByTestId(testIds.fieldErrorIcon)).toBeInTheDocument();
                        expect(getByTestId(testIds.searchInput)).toBeInTheDocument();
                        expect(getByTestId(testIds.searchFormControl)).toBeInTheDocument();
                        expect(getByTestId(testIds.searchInner)).toBeInTheDocument();
                        expect(getByTestId(testIds.searchLeftAddons)).toBeInTheDocument();
                        expect(getByTestId(testIds.searchRightAddons)).toBeInTheDocument();
                        expect(getByTestId(testIds.searchError)).toBeInTheDocument();
                        expect(getByTestId(dataTestId).tagName).toBe('DIV');
                        expect(getByTestId(dataTestId).getAttribute('role')).toBe('combobox');

                        const { getByTestId: getByTestIdHint } = render(
                            <Component
                                open={true}
                                options={[{ key: 'Fermium' }]}
                                fieldProps={{ hint: 'hint' }}
                                inputProps={{ hint: 'hint' }}
                                success={true}
                                dataTestId={dataTestId}
                            />,
                        );

                        expect(getByTestIdHint(testIds.fieldHint)).toBeInTheDocument();
                        expect(getByTestIdHint(testIds.searchHint)).toBeInTheDocument();
                        expect(getByTestId(testIds.fieldSuccessIcon)).toBeInTheDocument();
                    });
                });
            },
        );

        it('should set `data-test-id` attribute in desktop component', () => {
            const { getByTestId, container } = render(
                <InputAutocompleteDesktop
                    options={[{ key: 'Fermium' }]}
                    open={true}
                    error='error'
                    inputProps={{
                        leftAddons: 'left',
                        rightAddons: 'right',
                    }}
                    dataTestId={dataTestId}
                />,
            );

            const testIds = getInputAutocompleteDesktopTestIds(dataTestId);

            expect(getByTestId(testIds.inputAutocomplete)).toBeInTheDocument();
            expect(getByTestId(testIds.field)).toBeInTheDocument();
            expect(getByTestId(testIds.optionsList)).toBeInTheDocument();
            expect(getByTestId(testIds.option)).toBeInTheDocument();
            expect(getByTestId(testIds.fieldInner)).toBeInTheDocument();
            expect(getByTestId(testIds.fieldFormControl)).toBeInTheDocument();
            expect(getByTestId(testIds.fieldLeftAddons)).toBeInTheDocument();
            expect(getByTestId(testIds.fieldRightAddons)).toBeInTheDocument();
            expect(getByTestId(testIds.fieldError)).toBeInTheDocument();

            const { getByTestId: getByTestIdHint } = render(
                <InputAutocompleteDesktop
                    options={[{ key: 'Fermium' }]}
                    hint='hint'
                    dataTestId={dataTestId}
                />,
            );

            expect(getByTestIdHint(testIds.fieldHint)).toBeInTheDocument();
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

        it('should display title instead of label in bottom-sheet', () => {
            const label = 'Label';
            const title = 'Title';

            const { getByRole } = render(
                <InputAutocompleteMobileWrapper
                    title={title}
                    label={label}
                    open={true}
                    isBottomSheet={true}
                />,
            );

            expect(getByRole('dialog').querySelector('div[class^="header"]')?.textContent).toBe(
                title,
            );
        });

        it('should display title instead of label in modal', () => {
            const label = 'Label';
            const title = 'Title';

            const { getByRole } = render(
                <InputAutocompleteMobileWrapper
                    title={title}
                    label={label}
                    open={true}
                    isBottomSheet={false}
                />,
            );

            expect(getByRole('dialog').querySelector('div[class^="header"]')?.textContent).toBe(
                title,
            );
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

        it('should call onApply', async () => {
            const cb = jest.fn();
            const { getByTestId } = render(
                <InputAutocompleteMobileWrapper onApply={cb} dataTestId={dataTestId} />,
            );

            fireEvent.click(getByTestId(dataTestId + '-apply'));
            expect(cb).toBeCalledTimes(1);
        });

        it('should call onCancel', async () => {
            const cb = jest.fn();
            const { getByTestId } = render(
                <InputAutocompleteMobileWrapper onCancel={cb} dataTestId={dataTestId} />,
            );

            fireEvent.click(getByTestId(dataTestId + '-clear'));
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
            await waitFor(() => expect(onExited).toBeCalled(), {
                timeout: 4000,
            });
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

            expect(cb).toHaveBeenNthCalledWith(2, '');
        });

        it('should restore prev value when click close button ', () => {
            const cb = jest.fn();
            const { queryByRole, getByTestId } = render(
                <InputAutocompleteMobileWrapper onInput={cb} dataTestId={dataTestId} />,
            );

            const input = queryByRole('textbox') as HTMLInputElement;

            fireEvent.change(input, { target: { value: '123' } });
            fireEvent.click(getByTestId(dataTestId + '-bottom-sheet-header-closer'));

            expect(cb).toHaveBeenNthCalledWith(2, '');
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
            expect(cb).toBeCalledWith('123');
        });
    });

    describe('Render tests', () => {
        it('should unmount without errors', () => {
            const { unmount } = render(<InputAutocompleteMobileWrapper />);

            expect(unmount).not.toThrowError();
        });
    });
});

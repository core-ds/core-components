import React from 'react';
import { act, fireEvent, getByTestId, render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { CodeInputDesktop as CodeInput } from './desktop';

const getInputs = (container: HTMLElement) => container.querySelectorAll('input');

const getInput = (container: HTMLElement, index: number) => getInputs(container)[index];

describe('CodeInput', () => {
    describe('Display tests', () => {
        it('should display correctly', () => {
            const { container } = render(<CodeInput />);

            expect(container).toMatchSnapshot();
        });

        it('should display correctly with error', () => {
            const { container } = render(<CodeInput error='Error' />);

            expect(container).toMatchSnapshot();
        });
    });

    describe('Props tests', () => {
        it('should render 4 fields by default', () => {
            const { container } = render(<CodeInput />);

            const inputs = getInputs(container);

            expect(inputs.length).toBe(4);
        });

        it('should render passed fields count', () => {
            const fields = 5;

            const { container } = render(<CodeInput fields={fields} />);

            const inputs = getInputs(container);

            expect(inputs.length).toBe(fields);
        });

        it('should render initial values', () => {
            const initialValues = '1234';

            const { container } = render(<CodeInput initialValues={initialValues} />);

            const inputs = getInputs(container);

            expect(inputs[0]).toHaveValue(initialValues[0]);
            expect(inputs[1]).toHaveValue(initialValues[1]);
            expect(inputs[2]).toHaveValue(initialValues[2]);
            expect(inputs[3]).toHaveValue(initialValues[3]);
        });

        it('should reset values on errors with clearCodeOnError prop', async () => {
            const initialValues = '1234';
            const testId = 'code-input';

            const { container, getByTestId } = render(
                <CodeInput
                    initialValues={initialValues}
                    error={true}
                    clearCodeOnError={true}
                    dataTestId={testId}
                    errorVisibleDuration={300}
                />,
            );

            const inputs = getInputs(container);

            expect(inputs[0]).toHaveValue(initialValues[0]);
            expect(inputs[1]).toHaveValue(initialValues[1]);
            expect(inputs[2]).toHaveValue(initialValues[2]);
            expect(inputs[3]).toHaveValue(initialValues[3]);

            fireEvent.animationEnd(getByTestId(testId));

            await waitFor(() => {
                expect(inputs[0]).toHaveValue('');
                expect(inputs[1]).toHaveValue('');
                expect(inputs[2]).toHaveValue('');
                expect(inputs[3]).toHaveValue('');
            });
        });

        it('should render disabled inputs', () => {
            const { container } = render(<CodeInput disabled={true} />);

            const inputs = getInputs(container);

            expect(inputs[0]).toBeDisabled();
            expect(inputs[1]).toBeDisabled();
            expect(inputs[2]).toBeDisabled();
            expect(inputs[3]).toBeDisabled();
        });

        it('should render error', () => {
            const errorText = 'Error';

            const { getByRole, getByText } = render(<CodeInput error={errorText} />);

            const errorContainer = getByRole('alert');

            expect(errorContainer).toBeInTheDocument();
            expect(getByText(errorText)).toBeInTheDocument();
        });

        it('should set dataTestId', () => {
            const testId = 'testId';

            const { getByTestId } = render(<CodeInput dataTestId={testId} />);

            expect(getByTestId(testId)).toBeInTheDocument();
        });

        it('should set custom className', () => {
            const className = 'className';
            const testId = 'testId';

            const { getByTestId } = render(<CodeInput className={className} dataTestId={testId} />);

            expect(getByTestId(testId)).toHaveClass(className);
        });
    });

    describe('Interactions tests', () => {
        it('onChange should be called on user typing', async () => {
            const onChange = jest.fn();
            const onComplete = jest.fn();

            const { container } = render(<CodeInput onChange={onChange} onComplete={onComplete} />);

            const input = getInput(container, 0);

            await userEvent.type(input, '1234');

            expect(onChange).toHaveBeenCalled();
            expect(onChange).toHaveBeenCalledTimes(4);
            expect(onComplete).toHaveBeenCalled();
            expect(onComplete).toHaveBeenCalledTimes(1);
        });

        it('should be filled correctly', async () => {
            const { container, getByDisplayValue } = render(<CodeInput />);

            const input = getInput(container, 0);

            await userEvent.type(input, '1234');

            expect(getByDisplayValue('1')).toBeInTheDocument();
            expect(getByDisplayValue('2')).toBeInTheDocument();
            expect(getByDisplayValue('3')).toBeInTheDocument();
            expect(getByDisplayValue('4')).toBeInTheDocument();
        });

        it('should be filled correctly in copypast case', async () => {
            const { container, getByDisplayValue } = render(<CodeInput />);

            const input = getInput(container, 0);

            input.focus();
            await userEvent.paste('1234');

            expect(getByDisplayValue('1')).toBeInTheDocument();
            expect(getByDisplayValue('2')).toBeInTheDocument();
            expect(getByDisplayValue('3')).toBeInTheDocument();
            expect(getByDisplayValue('4')).toBeInTheDocument();
        });

        it('should be cut code properly in copypast case', async () => {
            const { container, getByDisplayValue } = render(<CodeInput />);

            const input = getInput(container, 0);

            input.focus();
            await userEvent.paste('12345');

            expect(getByDisplayValue('1')).toBeInTheDocument();
            expect(getByDisplayValue('2')).toBeInTheDocument();
            expect(getByDisplayValue('3')).toBeInTheDocument();
            expect(getByDisplayValue('4')).toBeInTheDocument();
        });

        it('should filter correctly', async () => {
            const { container, getByDisplayValue } = render(<CodeInput />);

            const input = getInput(container, 0);

            await userEvent.type(input, '1av2hv3yu4');

            expect(getByDisplayValue('1')).toBeInTheDocument();
            expect(getByDisplayValue('2')).toBeInTheDocument();
            expect(getByDisplayValue('3')).toBeInTheDocument();
            expect(getByDisplayValue('4')).toBeInTheDocument();
        });

        it('should be cleared correctly', async () => {
            const { container, queryByDisplayValue } = render(<CodeInput />);

            await userEvent.type(getInput(container, 0), '4321');
            await userEvent.type(getInput(container, 3), '{backspace}');
            await userEvent.type(getInput(container, 2), '{backspace}');
            await userEvent.type(getInput(container, 1), '{backspace}');
            await userEvent.type(getInput(container, 0), '{backspace}');

            expect(queryByDisplayValue('4')).not.toBeInTheDocument();
            expect(queryByDisplayValue('3')).not.toBeInTheDocument();
            expect(queryByDisplayValue('2')).not.toBeInTheDocument();
            expect(queryByDisplayValue('1')).not.toBeInTheDocument();
        });

        describe('lock input on error tests', () => {
            beforeEach(() => {
                jest.useFakeTimers();
            });

            afterEach(() => {
                jest.useRealTimers();
            });

            it('should lock input on error if clearCodeOnError is true', async () => {
                const handleChange = jest.fn();
                const user = userEvent.setup({
                    delay: null,
                    advanceTimers: jest.advanceTimersByTime,
                });

                const { container, getByDisplayValue, rerender, queryByDisplayValue } = render(
                    <CodeInput
                        clearCodeOnError={true}
                        onChange={handleChange}
                        dataTestId={'code-input'}
                    />,
                );

                const input = getInput(container, 0);

                await user.type(input, '1234');

                expect(getByDisplayValue('1')).toBeInTheDocument();
                expect(getByDisplayValue('2')).toBeInTheDocument();
                expect(getByDisplayValue('3')).toBeInTheDocument();
                expect(getByDisplayValue('4')).toBeInTheDocument();

                rerender(
                    <CodeInput
                        clearCodeOnError={true}
                        error={true}
                        onChange={handleChange}
                        dataTestId={'code-input'}
                    />,
                );

                //TODO: коллбеки состояния анимации не работают в тестах, issues не нашел, но когда починят - можно будет убрать
                fireEvent.animationStart(getByTestId(container, 'code-input'));
                await user.type(input, '5');

                expect(handleChange).toHaveBeenCalledTimes(4);
                expect(queryByDisplayValue('5')).not.toBeInTheDocument();

                act(() => jest.advanceTimersByTime(300));
                // TODO: аналогично комменту выше, выкидываю руками, потому что на изменение инпута это не происходит
                fireEvent.animationEnd(getByTestId(container, 'code-input'));
                act(() => jest.advanceTimersByTime(2000));

                await user.type(input, '6');
                expect(handleChange).toHaveBeenCalledTimes(5);
                expect(queryByDisplayValue('6')).toBeInTheDocument();
            });

            it('code input should not be cleared on error if clearCodeOnError is false', async () => {
                const user = userEvent.setup({
                    delay: null,
                    advanceTimers: jest.advanceTimersByTime,
                });
                const handleChange = jest.fn();

                const { container, getByDisplayValue, rerender, queryByDisplayValue } = render(
                    <CodeInput
                        clearCodeOnError={false}
                        onChange={handleChange}
                        dataTestId={'code-input'}
                    />,
                );

                const input = getInput(container, 0);

                await user.type(input, '1234');

                expect(getByDisplayValue('1')).toBeInTheDocument();
                expect(getByDisplayValue('2')).toBeInTheDocument();
                expect(getByDisplayValue('3')).toBeInTheDocument();
                expect(getByDisplayValue('4')).toBeInTheDocument();

                rerender(
                    <CodeInput
                        clearCodeOnError={false}
                        error={true}
                        onChange={handleChange}
                        dataTestId={'code-input'}
                    />,
                );

                fireEvent.animationStart(getByTestId(container, 'code-input'));
                await user.type(input, '5');

                expect(handleChange).toHaveBeenCalledTimes(5);
                expect(getByDisplayValue('5')).toBeInTheDocument();
            });
        });
    });
});

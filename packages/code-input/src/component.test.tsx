import React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';

import { CodeInputDesktop as CodeInput } from './desktop';

const getInputs = (container: HTMLElement) => container.querySelectorAll('input');

const getInput = (container: HTMLElement, index: number) => getInputs(container)[index];

const fillByArray = async (container: HTMLElement, values: Array<string | undefined>) => {
    const inputs = getInputs(container);

    for (let i = 0; i < values.length; i += 1) {
        const v = values[i];

        if (typeof v === 'string' && v.length > 0) {
            await userEvent.type(inputs[i], v);
        }
    }
};

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

        describe('focus first input on empty functionality', () => {
            it('should focus first input when clicking on any empty input', async () => {
                const { container } = render(<CodeInput />);

                const inputs = getInputs(container);
                const firstInput = inputs[0];
                const thirdInput = inputs[2];

                await userEvent.click(thirdInput);
                await waitFor(() => {
                    expect(firstInput).toHaveFocus();
                });
            });

            it('should focus target input when inputs are not all empty', async () => {
                const { container } = render(<CodeInput />);

                const inputs = getInputs(container);
                const firstInput = inputs[0];
                const secondInput = inputs[1];

                await userEvent.type(firstInput, '1');
                await userEvent.click(secondInput);

                expect(secondInput).toHaveFocus();
            });

            it('should focus first input when clicking on first input', async () => {
                const { container } = render(<CodeInput />);

                const inputs = getInputs(container);
                const firstInput = inputs[0];

                await userEvent.click(firstInput);

                expect(firstInput).toHaveFocus();
            });

            it('should focus first input after all inputs are cleared', async () => {
                const { container } = render(<CodeInput />);

                const inputs = getInputs(container);
                const firstInput = inputs[0];
                const secondInput = inputs[1];
                const thirdInput = inputs[2];

                await userEvent.type(firstInput, '12');

                await userEvent.type(secondInput, '{backspace}');
                await userEvent.type(firstInput, '{backspace}');

                // Ждем достаточно времени чтобы прошло пользовательское взаимодействие
                await new Promise((resolve) => setTimeout(resolve, 150));
                await userEvent.click(thirdInput);

                await waitFor(() => {
                    expect(firstInput).toHaveFocus();
                });
            });

            it('should not redirect focus during SMS autofill', async () => {
                const { container } = render(<CodeInput />);

                const inputs = getInputs(container);
                const thirdInput = inputs[2];
                const fourthInput = inputs[3];

                // Симулируем автозаполнение SMS
                await userEvent.type(thirdInput, '1234');

                expect(fourthInput).toHaveFocus();
                expect(inputs[0]).not.toHaveFocus();
            });

            it('should redirect focus to first input when clicking empty field without autofill', async () => {
                const { container } = render(<CodeInput />);

                const inputs = getInputs(container);
                const thirdInput = inputs[2];

                await userEvent.click(thirdInput);
                await waitFor(() => {
                    expect(inputs[0]).toHaveFocus();
                });
            });
        });

        describe('restrictFocus', () => {
            it('redirects focus to next empty when clicking on a later input (state: [1] [] [] [])', async () => {
                const { container } = render(<CodeInput restrictFocus={true} />);

                const inputs = getInputs(container);
                const firstInput = inputs[0];
                const secondInput = inputs[1];
                const thirdInput = inputs[2];

                await userEvent.type(firstInput, '1');
                await userEvent.click(thirdInput);

                expect(secondInput).toHaveFocus();
            });

            it('redirects focus to first empty when clicking far ahead (state: [1] [2] [] [])', async () => {
                const { container } = render(<CodeInput restrictFocus={true} />);

                const inputs = getInputs(container);
                const firstInput = inputs[0];
                const secondInput = inputs[1];
                const thirdInput = inputs[2];
                const fourthInput = inputs[3];

                await userEvent.type(firstInput, '1');
                await userEvent.type(secondInput, '2');

                await userEvent.click(fourthInput);

                expect(thirdInput).toHaveFocus();
            });

            it('keeps focus constrained after deletion (state: [1] [] [] []), clicking 3rd focuses 2nd', async () => {
                const { container } = render(<CodeInput restrictFocus={true} />);

                const inputs = getInputs(container);
                const firstInput = inputs[0];
                const secondInput = inputs[1];
                const thirdInput = inputs[2];

                await userEvent.type(firstInput, '12');
                await userEvent.type(secondInput, '{backspace}');

                await userEvent.click(thirdInput);

                expect(secondInput).toHaveFocus();
            });

            describe('click navigation cases', () => {
                it.each([
                    {
                        name: 'state [1] [] [] [], click idx 2 -> focuses idx 1',
                        fields: 4,
                        preset: ['1', undefined, undefined, undefined],
                        clickIndex: 2,
                        expectedFocus: 1,
                    },
                    {
                        name: 'state [1] [2] [] [], click idx 3 -> focuses idx 2',
                        fields: 4,
                        preset: ['1', '2', undefined, undefined],
                        clickIndex: 3,
                        expectedFocus: 2,
                    },
                    {
                        name: 'state [1] [2] [] [], click idx 2 -> focuses idx 2 (allowed)',
                        fields: 4,
                        preset: ['1', '2', undefined, undefined],
                        clickIndex: 2,
                        expectedFocus: 2,
                    },
                    {
                        name: 'state [1] [2] [3] [], click idx 1 -> focuses idx 1 (allowed)',
                        fields: 4,
                        preset: ['1', '2', '3', undefined],
                        clickIndex: 1,
                        expectedFocus: 1,
                    },
                    {
                        name: 'all empty, click idx 2 -> focuses idx 0',
                        fields: 4,
                        preset: [undefined, undefined, undefined, undefined],
                        clickIndex: 2,
                        expectedFocus: 0,
                    },
                ])('$name', async ({ fields, preset, clickIndex, expectedFocus }) => {
                    const { container } = render(
                        <CodeInput fields={fields} restrictFocus={true} />,
                    );

                    await fillByArray(container, preset);

                    const inputs = getInputs(container);
                    await userEvent.click(inputs[clickIndex]);

                    expect(inputs[expectedFocus]).toHaveFocus();
                });
            });

            it('ArrowRight focuses first empty when restricted', async () => {
                const { container } = render(<CodeInput fields={4} restrictFocus={true} />);

                await fillByArray(container, ['1', undefined, undefined, undefined]);

                const inputs = getInputs(container);
                inputs[0].focus();
                await userEvent.type(inputs[0], '{arrowright}');

                expect(inputs[1]).toHaveFocus();
            });

            describe('deletion restrictions', () => {
                it('click on any filled cell when fully filled keeps that cell focused', async () => {
                    const { container } = render(<CodeInput fields={4} restrictFocus={true} />);

                    await fillByArray(container, ['1', '2', '3', '4']);
                    const inputs = getInputs(container);

                    await userEvent.click(inputs[1]);
                    expect(inputs[1]).toHaveFocus();
                    await userEvent.click(inputs[3]);
                    expect(inputs[3]).toHaveFocus();
                });

                it('after deleting last, clicks on filled cells keep their focus and empty fields redirect', async () => {
                    const { container } = render(<CodeInput fields={5} restrictFocus={true} />);

                    await fillByArray(container, ['1', '2', '3', '4', '5']);
                    const inputs = getInputs(container);

                    // удаляем последнюю (5)
                    inputs[4].focus();
                    await userEvent.type(inputs[4], '{backspace}');

                    await userEvent.click(inputs[0]);
                    expect(inputs[0]).toHaveFocus();
                    await userEvent.click(inputs[2]);
                    expect(inputs[2]).toHaveFocus();

                    // клик по пустой ячейке (индекс 4) приводит к первой пустой
                    await userEvent.click(inputs[4]);
                    expect(inputs[4]).toHaveFocus();
                });
            });
        });
    });
});

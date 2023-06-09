import React, { ForwardRefRenderFunction } from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import * as popoverModule from '@alfalab/core-components-popover';

import { act } from 'react-dom/test-utils';
import { asyncRender } from '../../utils/test-utils';

import { FieldProps as BaseFieldProps, OptionsListProps, OptionProps } from './shared';
import { SelectDesktop as Select } from './desktop';

jest.mock('./components/field', () =>
    Object.assign({}, jest.requireActual('./components/field') as Record<any, any>),
);
const fieldModule = require('./components/field');

jest.mock('./components/options-list', () =>
    Object.assign({}, jest.requireActual('./components/options-list') as Record<any, any>),
);
const optionsListModule = require('./components/options-list');

jest.mock('./components/option', () =>
    Object.assign({}, jest.requireActual('./components/option') as Record<any, any>),
);
const optionModule = require('./components/option');

type PopoverComponent = {
    render?: ForwardRefRenderFunction<HTMLDivElement, popoverModule.PopoverProps>;
};

const baseProps = {
    options: [],
};

const options = [
    { key: '1', content: 'Neptunium' },
    { key: '2', content: 'Plutonium' },
    { key: '3', content: 'Americium' },
    { key: '4', content: 'Curium' },
    { key: '5', content: 'Berkelium' },
    { key: '6', content: 'Californium' },
    { key: '7', content: 'Einsteinium' },
    { key: '8', content: 'Fermium' },
];

describe('Select', () => {
    const PLACEHOLDER = 'placeholder';
    const LABEL_TEXT = 'label text';
    const HINT_TEXT = 'hint text';
    const ROLE_LISTBOX = 'listbox';
    const ROLE_COMBOBOX = 'combobox';

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

        it('should match snapshot', () =>
            expect(render(<Select {...baseProps} />)).toMatchSnapshot());

        it('should match snapshot with fatal error', () => {
            const { container } = render(<Select {...baseProps} error='Error' />);

            expect(container).toMatchSnapshot();
        });

        it('should match snapshot with visibleOptions', async () => {
            const { container } = await asyncRender(
                <Select {...baseProps} options={options} visibleOptions={2} defaultOpen={true} />,
            );

            expect(container).toMatchSnapshot();
        });
    });

    describe('test attributes', () => {
        it('should set `data-test-id`', () => {
            const testId = 'test-id';
            const { getByTestId } = render(<Select {...baseProps} dataTestId={testId} />);
            expect(getByTestId(testId)).toBeInTheDocument();
        });

        it('should set `id` attribute', () => {
            const id = 'select-id';
            const { container } = render(<Select {...baseProps} id={id} />);
            expect(container.querySelector(`#${id}-input`)).toBeInTheDocument();
        });

        it('should set `name` attribute only if has selected option', () => {
            const name = 'select-name';
            const props = {
                ...baseProps,
                options,
                name,
            };

            const selector = `[name^=${name}]`;

            const { container: containerSelected } = render(<Select {...props} selected='1' />);
            const { container: containerNotSelected } = render(<Select {...props} />);
            const { container: containerSelectedIncorrect } = render(
                <Select {...props} selected={`${options.length + 1}`} />,
            );

            expect(containerSelected.querySelector(selector)).toBeInTheDocument();
            expect(containerNotSelected.querySelector(selector)).not.toBeInTheDocument();
            expect(containerSelectedIncorrect.querySelector(selector)).not.toBeInTheDocument();
        });

        it('should set class for `block` and `size` props', () => {
            const { getByRole } = render(<Select {...baseProps} block={true} size='xl' />);

            const combobox = getByRole(ROLE_COMBOBOX);
            expect(combobox).toHaveClass('block');
            expect(combobox.querySelector('.block')).toHaveClass('xl');
        });

        it('should set custom class', () => {
            const className = 'custom-class';
            const { container } = render(<Select {...baseProps} className={className} />);

            expect(container.firstElementChild).toHaveClass(className);
        });

        it('should render label, if selected value', () => {
            const { getAllByText } = render(
                <Select {...baseProps} label={LABEL_TEXT} selected='1' options={options} />,
            );

            expect(getAllByText(LABEL_TEXT)[1]).toBeInTheDocument();
        });

        it('should render hint', () => {
            const { getByText } = render(<Select {...baseProps} hint={HINT_TEXT} />);

            expect(getByText(HINT_TEXT)).toBeInTheDocument();
        });

        it('should render error and hide hint', () => {
            const errorText = 'error text';
            const { getByText, queryByText } = render(
                <Select {...baseProps} hint={HINT_TEXT} error={errorText} />,
            );

            expect(queryByText(HINT_TEXT)).not.toBeInTheDocument();
            expect(getByText(errorText)).toBeInTheDocument();
        });

        it('should render placeholder', () => {
            const { getByText } = render(<Select {...baseProps} placeholder={PLACEHOLDER} />);

            expect(getByText(PLACEHOLDER)).toBeInTheDocument();
        });
    });

    it('should set selected option', () => {
        const selectedOption = options[1];
        const { getByText } = render(
            <Select {...baseProps} options={options} selected={selectedOption.key} />,
        );

        expect(getByText(selectedOption.content)).toBeInTheDocument();
    });

    describe('Behavior tests', () => {
        const optionContent = options[1].content;

        const pressArrowDownNTimes = async (target: HTMLElement, n: number) => {
            await act(async () => {
                await fireEvent.keyDown(target, { key: 'ArrowDown', code: 'ArrowDown' });
            });

            await new Promise((res) => {
                setTimeout(res, 100);
            });

            if (n > 0) {
                await pressArrowDownNTimes(target, n - 1);
            }
        };

        it('should be open by default with `defaultOpen==true`', async () => {
            const { getByRole } = await asyncRender(
                <Select {...baseProps} options={options} defaultOpen={true} />,
            );

            expect(getByRole(ROLE_LISTBOX)).toBeInTheDocument();
        });

        it('should allow multiple select', async () => {
            const optionsToSelect = [options[2].content, options[3].content, options[0].content];
            const expectedResult = optionsToSelect.join(', ');
            const expectedResultTruncated = optionsToSelect.slice(0, 2).join(', ');

            const { getByText, getByTestId } = render(
                <Select
                    {...baseProps}
                    label={LABEL_TEXT}
                    options={options}
                    multiple={true}
                    dataTestId='select'
                />,
            );

            const clickOption = async (index: number) =>
                waitFor(() => {
                    fireEvent.click(getByTestId('select-field'));
                    fireEvent.click(getByText(optionsToSelect[index]));
                });

            await clickOption(0);
            await clickOption(1);
            await clickOption(2);

            expect(getByText(expectedResult)).toBeInTheDocument();

            await waitFor(() => {
                fireEvent.click(getByTestId('select-field'));
                fireEvent.click(getByText(optionsToSelect[2]));
            });

            expect(getByText(expectedResultTruncated)).toBeInTheDocument();
        });

        it('should not allow unselect by default', async () => {
            const { getByText, findByText, getByTestId } = render(
                <Select {...baseProps} label={LABEL_TEXT} options={options} dataTestId='select' />,
            );

            const field = getByTestId('select-field');

            fireEvent.click(field);
            fireEvent.click(getByText(optionContent));

            expect(getByText(optionContent)).toBeInTheDocument();

            fireEvent.click(field);
            const option = await findByText(optionContent, { selector: '[role="option"] *' });
            fireEvent.click(option);

            expect(getByText(optionContent)).toBeInTheDocument();
        });

        it('should allow unselect', async () => {
            const { getByText, getByTestId, queryByText, findByText } = render(
                <Select
                    {...baseProps}
                    label={LABEL_TEXT}
                    options={options}
                    allowUnselect={true}
                    dataTestId='select'
                />,
            );

            const field = getByTestId('select-field');

            fireEvent.click(field);
            fireEvent.click(getByText(optionContent));

            expect(getByText(optionContent)).toBeInTheDocument();

            fireEvent.click(field);
            const option = await findByText(optionContent, { selector: '[role="option"] *' });
            fireEvent.click(option);

            expect(queryByText(optionContent)).not.toBeInTheDocument();
        });

        it('should not close on select', async () => {
            const { getByText, getByTestId, getByRole } = render(
                <Select
                    {...baseProps}
                    label={LABEL_TEXT}
                    options={options}
                    closeOnSelect={false}
                    dataTestId='select'
                />,
            );

            await userEvent.click(getByTestId('select-field'));
            await userEvent.click(getByText(optionContent));

            expect(getByRole(ROLE_LISTBOX)).toBeInTheDocument();
        });

        it('should add disabled class and aria-disabled', () => {
            const { getByRole } = render(
                <Select {...baseProps} label={LABEL_TEXT} options={options} disabled={true} />,
            );

            expect(document.querySelector('.disabled') as HTMLElement).toBeInTheDocument();

            const combobox = getByRole(ROLE_COMBOBOX);
            expect(combobox).toHaveAttribute('aria-disabled');
        });

        it('should add `focused` class', () => {
            render(<Select {...baseProps} label={LABEL_TEXT} options={options} />);

            fireEvent.focus(document.querySelector('.field') as HTMLElement);
            expect(document.querySelector('.focused') as HTMLElement).toBeInTheDocument();
        });

        it('should not allow circular navigation by default', async () => {
            render(<Select {...baseProps} options={options} />);

            const input = document.querySelector('.input') as HTMLElement;
            await pressArrowDownNTimes(input, options.length + 1);

            expect((document.querySelector('.highlighted .content') as HTMLElement).innerHTML).toBe(
                options[options.length - 1].content,
            );
        });

        it('should allow circular navigation', async () => {
            render(<Select {...baseProps} options={options} circularNavigation={true} />);

            const input = document.querySelector('.input') as HTMLElement;
            await pressArrowDownNTimes(input, options.length + 1);
            expect((document.querySelector('.highlighted .content') as HTMLElement).innerHTML).toBe(
                options[0].content,
            );
        });

        describe('Open/close tests', () => {
            it('should open list on click, close on click outside', async () => {
                const { getByTestId, queryByRole } = render(
                    <Select
                        {...baseProps}
                        options={options}
                        label={LABEL_TEXT}
                        dataTestId='select'
                    />,
                );

                fireEvent.click(getByTestId('select-field'));
                await waitFor(() => expect(queryByRole(ROLE_LISTBOX)).toBeInTheDocument());

                await userEvent.click(document.firstElementChild as HTMLElement);
                expect(queryByRole(ROLE_LISTBOX)).not.toBeInTheDocument();
            });

            it('should not open if disabled', async () => {
                const { getByTestId, queryByRole } = render(
                    <Select
                        {...baseProps}
                        label={LABEL_TEXT}
                        options={options}
                        disabled={true}
                        dataTestId='select'
                    />,
                );

                fireEvent.click(getByTestId('select-field'));
                expect(queryByRole(ROLE_LISTBOX)).not.toBeInTheDocument();
            });

            it('should close list on press escape', async () => {
                const { queryByRole } = render(
                    <Select {...baseProps} options={options} defaultOpen={true} />,
                );

                await waitFor(() => expect(queryByRole(ROLE_LISTBOX)).toBeInTheDocument());

                const input = document.querySelector('.field') as HTMLElement;
                fireEvent.keyDown(input, { key: 'Escape', code: 'Escape' });
                expect(queryByRole(ROLE_LISTBOX)).not.toBeInTheDocument();
            });

            it('should close list on press enter', async () => {
                const { queryByRole } = render(
                    <Select {...baseProps} options={options} defaultOpen={true} />,
                );

                await waitFor(() => expect(queryByRole(ROLE_LISTBOX)).toBeInTheDocument());

                const input = document.querySelector('.field') as HTMLElement;
                fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });
                expect(queryByRole(ROLE_LISTBOX)).not.toBeInTheDocument();
            });
        });

        describe('tests with autocomplete', () => {
            it('should open list on focus', async () => {
                const { getByRole } = render(
                    <Select {...baseProps} options={options} autocomplete={true} />,
                );

                await act(async () => {
                    await fireEvent.focus(document.querySelector('.field') as HTMLElement);
                });

                expect(getByRole(ROLE_LISTBOX)).toBeInTheDocument();
            });

            it('should open list on press a letter key', async () => {
                const { queryByRole, findByRole } = render(
                    <Select {...baseProps} options={options} autocomplete={true} />,
                );

                const input = document.querySelector('.field') as HTMLElement;
                fireEvent.focus(input);
                fireEvent.keyDown(input, { key: 'Escape', code: 'Escape' });
                expect(queryByRole(ROLE_LISTBOX)).not.toBeInTheDocument();

                fireEvent.keyDown(input, { key: 'a', code: 'KeyA' });
                const list = await findByRole(ROLE_LISTBOX);
                expect(list).toBeInTheDocument();
            });
        });
    });

    describe('Subcomponent', () => {
        it('should set `fieldClassName` class to field', () => {
            const className = 'custom-field-class';
            const { container } = render(<Select {...baseProps} fieldClassName={className} />);

            expect(container.getElementsByClassName(className).length).toBe(1);
        });

        it('should transfer props to Field', async () => {
            const spy = jest.spyOn(fieldModule, 'Field' as never);

            const propPrefix = 'field';

            const fieldProps: Partial<BaseFieldProps> = {
                size: 'l',
                selected: options[0],
                selectedMultiple: [options[1], options[2]],
                multiple: true,
                open: true,
                disabled: true,
                className: `${propPrefix}-classname`,
                placeholder: `${propPrefix}-placeholder`,
                error: `${propPrefix}-error`,
                hint: `${propPrefix}-hint`,
                dataTestId: `${propPrefix}-data-test-id`,
            };

            await asyncRender(<Select {...baseProps} fieldProps={fieldProps} />);

            expect(spy.mock.calls[0][0]).toMatchObject(fieldProps);
        });

        it('should transfer props to OptionsList', async () => {
            const spy = jest.spyOn(optionsListModule.OptionsList, 'render' as never);

            const optionsListProps: Partial<OptionsListProps> = {
                emptyPlaceholder: 'list-placeholder',
            };

            const expectedProps: Partial<OptionsListProps> = {
                options,
                flatOptions: options,
                highlightedIndex: -1,
                open: true,
                size: 'l',
                visibleOptions: 3,
                ...optionsListProps,
            };

            await asyncRender(
                <Select
                    {...baseProps}
                    defaultOpen={true}
                    options={options}
                    optionsListProps={optionsListProps}
                    size={expectedProps.size}
                    visibleOptions={expectedProps.visibleOptions}
                />,
            );

            const mockCalls = spy.mock.calls;
            const lastMockCall = mockCalls[mockCalls.length - 1];
            expect(lastMockCall[0]).toMatchObject(expectedProps);
        });

        it('should transfer optionProps to Option', async () => {
            const spy = jest.spyOn(optionModule, 'Option');

            const optionProps: Partial<
                Omit<OptionProps, 'innerProps'> & {
                    innerProps: Partial<OptionProps['innerProps']>;
                }
            > = {
                innerProps: {
                    onMouseDown: expect.any(Function),
                },
            };

            await asyncRender(
                <Select
                    {...baseProps}
                    defaultOpen={true}
                    options={options}
                    optionProps={optionProps}
                />,
            );

            const mockCalls = spy.mock.calls;
            const lastMockCall = mockCalls[mockCalls.length - 1];
            expect(lastMockCall[0]).toMatchObject(optionProps);
        });

        it('should set `optionClassName` class to each option', async () => {
            const optionClassName = 'option-class';

            await asyncRender(
                <Select
                    {...baseProps}
                    options={options}
                    defaultOpen={true}
                    optionClassName={optionClassName}
                />,
            );

            expect(document.getElementsByClassName(optionClassName).length).toBe(options.length);
        });

        it('should transfer props to Popover', async () => {
            const PopoverComponent = popoverModule.Popover as PopoverComponent;
            const spy = jest.spyOn(PopoverComponent, 'render');

            const cb = () => undefined;

            const expectedProps: Partial<popoverModule.PopoverProps> = {
                update: {
                    current: cb,
                },
                position: 'bottom',
                preventFlip: false,
                open: true,
            };

            await asyncRender(
                <Select
                    {...baseProps}
                    defaultOpen={true}
                    popoverPosition={expectedProps.position}
                    updatePopover={expectedProps.update}
                    preventFlip={false}
                />,
            );

            const mockCalls = spy.mock.calls;
            const lastMockCall = mockCalls[mockCalls.length - 1];
            expect(lastMockCall[0]).toMatchObject(expectedProps);
        });

        it('should set `optionListClassName` class to options list', () => {
            const optionsListClassName = 'options-list-class';
            const { container } = render(
                <Select
                    {...baseProps}
                    options={options}
                    optionsListClassName={optionsListClassName}
                />,
            );
            expect(container.getElementsByClassName(optionsListClassName)).not.toBeNull();
        });

        it('should set `popoverClassName` class to popover', () => {
            const optionsListClassName = 'popover-class';
            const { container } = render(
                <Select {...baseProps} options={options} popperClassName={optionsListClassName} />,
            );
            expect(container.getElementsByClassName(optionsListClassName)).not.toBeNull();
        });

        it('should rendered empty options list with flag `showEmptyOptionsList`', () => {
            const optionsListClassName = 'options-list-class';
            const { container } = render(
                <Select {...baseProps} optionsListClassName={optionsListClassName} />,
            );
            expect(container.getElementsByClassName(optionsListClassName)).not.toBeNull();
        });

        it('should show checkmark by default', async () => {
            render(<Select {...baseProps} options={options} dataTestId='select' />);

            userEvent.click(await screen.findByTestId('select-field'));

            expect(
                (await screen.findByTestId('select-options-list')).getElementsByClassName(
                    'checkmark',
                ).length,
            ).toBe(16);
        });

        it('should hide checkmark', async () => {
            const optionsWithHidedCheckMark = [
                { key: '1', showCheckMark: false, content: 'Neptunium' },
                { key: '2', showCheckMark: false, content: 'Plutonium' },
                { key: '3', showCheckMark: false, content: 'Americium' },
                { key: '4', showCheckMark: false, content: 'Curium' },
                { key: '5', showCheckMark: false, content: 'Berkelium' },
                { key: '6', showCheckMark: false, content: 'Californium' },
                { key: '7', showCheckMark: false, content: 'Einsteinium' },
                { key: '8', showCheckMark: false, content: 'Fermium' },
            ];

            render(
                <Select {...baseProps} options={optionsWithHidedCheckMark} dataTestId='select' />,
            );

            userEvent.click(await screen.findByTestId('select-field'));

            expect(
                (await screen.findByTestId('select-options-list')).getElementsByClassName(
                    'checkmark',
                ).length,
            ).toBe(0);
        });
    });

    describe('Callback tests', () => {
        it('should call onFocus and onBlur', async () => {
            const onFocus = jest.fn();
            const onBlur = jest.fn();
            render(
                <Select
                    {...baseProps}
                    options={options}
                    onFocus={onFocus}
                    defaultOpen={true}
                    onBlur={onBlur}
                />,
            );
            fireEvent.focus(document.querySelector('.field') as HTMLElement);
            fireEvent.blur(document.querySelector('.field') as HTMLElement);
            expect(onFocus).toBeCalledTimes(1);
            expect(onBlur).toBeCalledTimes(1);
        });

        it('should call onOpen', () => {
            const cb = jest.fn();
            const { container } = render(<Select {...baseProps} options={options} onOpen={cb} />);

            const input = container.querySelector('.contentWrapper') as HTMLInputElement;

            fireEvent.click(input);

            waitFor(() => {
                expect(cb).toBeCalledTimes(1);
            });
        });

        it('should call onChange', async () => {
            const cb = jest.fn();
            const { container, findByText } = render(
                <Select {...baseProps} options={options} onChange={cb} />,
            );

            const input = container.querySelector('.input') as HTMLInputElement;

            await fireEvent.click(input);

            const option = await findByText(options[0].content);
            await fireEvent.click(option);
            expect(cb).toBeCalledTimes(1);
        });

        it.skip('should call onScroll', async () => {
            const onScroll = jest.fn();

            const { getByTestId } = render(
                <Select
                    {...baseProps}
                    dataTestId='test-id'
                    options={options}
                    onScroll={onScroll}
                    defaultOpen={true}
                />,
            );

            fireEvent.scroll(getByTestId('test-id-options-list'));
            expect(onScroll).toBeCalledTimes(1);
        });

        it('should call valueRenderer', async () => {
            const valueRenderer = jest.fn();
            const { getByText, getByTestId } = render(
                <Select
                    {...baseProps}
                    options={options}
                    label={LABEL_TEXT}
                    valueRenderer={valueRenderer}
                    dataTestId='select'
                />,
            );

            fireEvent.click(getByTestId('select-field'));
            fireEvent.click(getByText(options[0].content));

            expect(valueRenderer).toBeCalled();
        });

        it('should call custom value renderer', async () => {
            const valueRenderer = jest.fn();
            const { getByText, getByTestId } = render(
                <Select
                    {...baseProps}
                    options={options}
                    label={LABEL_TEXT}
                    valueRenderer={valueRenderer}
                    dataTestId='select'
                />,
            );

            const optionToSelect = options[0];

            const expectedCallArgument = {
                selected: optionToSelect,
                selectedMultiple: [optionToSelect],
            };

            fireEvent.click(getByTestId('select-field'));
            fireEvent.click(getByText(optionToSelect.content));

            expect(valueRenderer).toHaveBeenLastCalledWith(expectedCallArgument);
        });
    });

    describe('Elements tests', () => {
        it('should not render Arrow', () => {
            const { container } = render(<Select {...baseProps} Arrow={false} />);

            expect(container.querySelector('.arrow')).toBeNull();
        });

        it('should render native select', () => {
            const { container } = render(
                <Select {...baseProps} options={options} nativeSelect={true} />,
            );

            expect(container.querySelectorAll('select option').length).toBe(options.length);
        });
    });
});

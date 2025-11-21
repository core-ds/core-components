import React, { ForwardRefRenderFunction } from 'react';
import { fireEvent, render, screen, waitFor, queryByText } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import * as popoverModule from '@alfalab/core-components-popover';

import { act } from 'react-dom/test-utils';
import { asyncRender } from '@alfalab/core-components-test-utils';

import {
    FieldProps as BaseFieldProps,
    OptionsListProps,
    OptionProps,
    useSelectWithApply,
    Arrow,
} from './shared';
import { SelectDesktop as Select } from './desktop';
import { SelectMobile, SelectModalMobile } from './mobile';
import { BaseOption } from './components';
import { getSelectTestIds } from './utils';
import { Environment } from 'downshift';

function SelectWithApplyComponent({ testId }: { testId: string }) {
    const selectProps = useSelectWithApply({
        searchProps: {
            componentProps: {
                error: 'error',
                leftAddons: 'left',
                rightAddons: 'right',
            },
        },
        showSearch: true,
        options: [{ key: '1', content: 'Neptunium' }],
        selected: [{ key: '1', content: 'Neptunium' }],
        onChange: jest.fn(),
    });

    return (
        <Select
            open={true}
            error='error'
            fieldProps={{
                leftAddons: 'left',
                rightAddons: 'right',
                error: 'error',
            }}
            {...selectProps}
            dataTestId={testId}
        />
    );
}

const COMPONENT_NAME = {
    SelectMobile,
    SelectModalMobile,
} as const;

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

const focusableOptions = options.map((o) => ({
    ...o,
    content: (
        <div tabIndex={0} data-test-id={`focusable-${o.key}`}>
            {o.content}
        </div>
    ),
}));

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
        it('should set `data-test-id` attribute in desktop component', () => {
            const testId = 'select-test-id';

            const { getByTestId } = render(<SelectWithApplyComponent testId={testId} />);

            const testIds = getSelectTestIds(testId);

            expect(getByTestId(testIds.select)).toBeInTheDocument();
            expect(getByTestId(testIds.optionsList)).toBeInTheDocument();
            expect(getByTestId(testIds.option)).toBeInTheDocument();
            expect(getByTestId(testIds.clearButton)).toBeInTheDocument();
            expect(getByTestId(testIds.applyButton)).toBeInTheDocument();
            expect(getByTestId(testIds.field)).toBeInTheDocument();
            expect(getByTestId(testIds.fieldFormControl)).toBeInTheDocument();
            expect(getByTestId(testIds.fieldLeftAddons)).toBeInTheDocument();
            expect(getByTestId(testIds.fieldRightAddons)).toBeInTheDocument();
            expect(getByTestId(testIds.fieldError)).toBeInTheDocument();
            expect(getByTestId(testIds.searchInput)).toBeInTheDocument();
            expect(getByTestId(testIds.searchFormControl)).toBeInTheDocument();
            expect(getByTestId(testIds.searchInner)).toBeInTheDocument();
            expect(getByTestId(testIds.searchLeftAddons)).toBeInTheDocument();
            expect(getByTestId(testIds.searchRightAddons)).toBeInTheDocument();
            expect(getByTestId(testIds.searchError)).toBeInTheDocument();

            const { getByTestId: getByTestIdHint } = render(
                <Select
                    open={true}
                    showSearch={true}
                    options={options}
                    fieldProps={{ hint: 'hint' }}
                    searchProps={{ componentProps: { hint: 'hint' } }}
                    selected={options[1].key}
                    clear={true}
                    dataTestId={testId}
                />,
            );

            expect(getByTestIdHint(testIds.fieldHint)).toBeInTheDocument();
            expect(getByTestId(testIds.fieldClearIcon)).toBeInTheDocument();
            expect(getByTestIdHint(testIds.searchHint)).toBeInTheDocument();
        });

        (['SelectMobile', 'SelectModalMobile'] as const).forEach((componentName) => {
            const Component = COMPONENT_NAME[componentName];

            describe(componentName, () => {
                it('should set `data-test-id` attribute in mobile component', () => {
                    const testId = 'select-test-id';

                    const { getByTestId } = render(
                        <Component
                            showSearch={true}
                            multiple={true}
                            open={true}
                            fieldProps={{
                                leftAddons: 'left',
                                rightAddons: 'right',
                                error: 'error',
                            }}
                            dataTestId={testId}
                            block={true}
                            searchProps={{
                                componentProps: {
                                    error: 'error',
                                    leftAddons: 'left',
                                    rightAddons: 'right',
                                },
                            }}
                            options={[{ key: '1', content: 'Neptunium' }]}
                        />,
                    );

                    const testIds = getSelectTestIds(testId);

                    if (componentName === 'SelectMobile') {
                        expect(getByTestId(testIds.bottomSheet)).toBeInTheDocument();
                        expect(getByTestId(testIds.bottomSheetHeader)).toBeInTheDocument();
                        expect(getByTestId(testIds.bottomSheetContent)).toBeInTheDocument();
                    } else {
                        expect(getByTestId(testIds.modal)).toBeInTheDocument();
                        expect(getByTestId(testIds.modalHeader)).toBeInTheDocument();
                        expect(getByTestId(testIds.modalContent)).toBeInTheDocument();
                    }

                    expect(getByTestId(testIds.select)).toBeInTheDocument();
                    expect(getByTestId(testIds.optionsList)).toBeInTheDocument();
                    expect(getByTestId(testIds.option)).toBeInTheDocument();
                    expect(getByTestId(testIds.clearButton)).toBeInTheDocument();
                    expect(getByTestId(testIds.applyButton)).toBeInTheDocument();
                    expect(getByTestId(testIds.field)).toBeInTheDocument();
                    expect(getByTestId(testIds.fieldFormControl)).toBeInTheDocument();
                    expect(getByTestId(testIds.fieldLeftAddons)).toBeInTheDocument();
                    expect(getByTestId(testIds.fieldRightAddons)).toBeInTheDocument();
                    expect(getByTestId(testIds.fieldError)).toBeInTheDocument();
                    expect(getByTestId(testIds.searchInput)).toBeInTheDocument();
                    expect(getByTestId(testIds.searchFormControl)).toBeInTheDocument();
                    expect(getByTestId(testIds.searchInner)).toBeInTheDocument();
                    expect(getByTestId(testIds.searchLeftAddons)).toBeInTheDocument();
                    expect(getByTestId(testIds.searchRightAddons)).toBeInTheDocument();
                    expect(getByTestId(testIds.searchError)).toBeInTheDocument();

                    const { getByTestId: getByTestIdHint } = render(
                        <Component
                            open={true}
                            showSearch={true}
                            options={options}
                            fieldProps={{ hint: 'hint' }}
                            searchProps={{ componentProps: { hint: 'hint' } }}
                            dataTestId={testId}
                            clear={true}
                            selected={options[1].key}
                        />,
                    );

                    expect(getByTestIdHint(testIds.fieldHint)).toBeInTheDocument();
                    expect(getByTestId(testIds.fieldClearIcon)).toBeInTheDocument();
                    expect(getByTestIdHint(testIds.searchHint)).toBeInTheDocument();
                });
            });
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
            const { getByRole } = render(<Select {...baseProps} block={true} size={72} />);

            const combobox = getByRole(ROLE_COMBOBOX);
            expect(combobox).toHaveClass('block');
            expect(combobox.querySelector('.block')).toHaveClass('size-72');
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
            const { getByText, rerender } = render(
                <Select {...baseProps} placeholder={PLACEHOLDER} />,
            );

            expect(getByText(PLACEHOLDER)).toBeInTheDocument();

            rerender(
                <Select
                    {...baseProps}
                    placeholder={PLACEHOLDER}
                    label={LABEL_TEXT}
                    labelView='outer'
                />,
            );

            expect(getByText(PLACEHOLDER)).toBeInTheDocument();

            rerender(
                <Select
                    {...baseProps}
                    placeholder={PLACEHOLDER}
                    label={LABEL_TEXT}
                    labelView='inner'
                    defaultOpen={true}
                />,
            );

            expect(getByText(PLACEHOLDER)).toBeInTheDocument();
        });

        it('should not render placeholder', async () => {
            const { rerender, container } = render(
                <Select {...baseProps} placeholder={PLACEHOLDER} label={LABEL_TEXT} />,
            );

            expect(await queryByText(container, PLACEHOLDER)).not.toBeInTheDocument();
        });
    });

    it('should set selected option', () => {
        const selectedOption = options[1];
        const { getByText } = render(
            <Select {...baseProps} options={options} selected={selectedOption.key} />,
        );

        expect(getByText(selectedOption.content)).toBeInTheDocument();
    });

    it('should be checked selected shape options', () => {
        const selectedOption = [{ ...options[1] }];
        render(
            <Select
                {...baseProps}
                options={options}
                selected={selectedOption}
                defaultOpen={true}
            />,
        );

        const selectedOptions = document.querySelectorAll('[role=option][class*=selected]');

        expect(selectedOptions.length).toBe(1);
    });

    it('should be checked selected shape options in SelectMobile', () => {
        const selectedOption = [{ ...options[1] }, { ...options[2] }];
        render(
            <SelectMobile
                {...baseProps}
                options={options}
                selected={selectedOption}
                defaultOpen={true}
            />,
        );

        const selectedOptions = document.querySelectorAll('[role=option][class*=selected]');

        expect(selectedOptions.length).toBe(2);
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
                size: 64,
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
                size: 64,
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

            const testProps: Partial<popoverModule.PopoverProps> = {
                update: {
                    current: cb,
                },
                position: 'bottom',
                preventFlip: false,
                open: true,
            };

            const additionalTestProps: Partial<popoverModule.PopoverProps> = {
                availableHeight: true,
            };

            const expectedProps = {
                ...testProps,
                ...additionalTestProps,
            };

            await asyncRender(
                <Select
                    {...baseProps}
                    defaultOpen={true}
                    popoverPosition={testProps.position}
                    updatePopover={testProps.update}
                    preventFlip={false}
                    popoverProps={additionalTestProps}
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

            await userEvent.click(await screen.findByTestId('select-field'));

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

            await userEvent.click(await screen.findByTestId('select-field'));

            expect(
                (await screen.findByTestId('select-options-list')).getElementsByClassName(
                    'checkmark',
                ).length,
            ).toBe(0);
        });

        it('should render option content when checkmark hidden for BaseOption', async () => {
            const optionsWithHidedCheckMark = [
                { key: '1', showCheckMark: false, content: 'Neptunium' },
                { key: '2', content: 'Plutonium' },
            ];

            render(
                <Select
                    {...baseProps}
                    options={optionsWithHidedCheckMark}
                    Option={BaseOption}
                    dataTestId='select'
                />,
            );

            await userEvent.click(await screen.findByTestId('select-field'));

            expect(await screen.findByText('Neptunium')).toBeInTheDocument();
        });

        it('should render option content when checkmark visible for BaseOption', async () => {
            render(
                <Select {...baseProps} options={options} Option={BaseOption} dataTestId='select' />,
            );

            await userEvent.click(await screen.findByTestId('select-field'));

            expect(await screen.findByText('Plutonium')).toBeInTheDocument();
        });

        describe('Checkbox rendering', () => {
            describe('SUCCESS CASES', () => {
                type OptionElements = {
                    checkboxLabel: Element | null | undefined;
                    checkbox: Element | null | undefined;
                    content: Element | null | undefined;
                    position: 'before' | 'after';
                };

                const getFirstOptionElements = async () => {
                    const optionsList = await screen.findByTestId('select-options-list');
                    const firstOption = optionsList.querySelector('[role="option"]');

                    expect(firstOption).toBeInTheDocument();

                    const checkboxLabel = firstOption?.querySelector('label');
                    const checkbox = firstOption?.querySelector('.box');
                    const content = firstOption?.querySelector('.content');

                    return { firstOption, checkboxLabel, checkbox, content };
                };

                const expectCheckboxPosition = ({
                    checkboxLabel,
                    checkbox,
                    content,
                    position,
                }: OptionElements) => {
                    expect(checkbox).toBeInTheDocument();
                    expect(content).toBeInTheDocument();

                    if (!(checkbox instanceof Element) || !(content instanceof Element)) {
                        return;
                    }

                    const relation = checkbox.compareDocumentPosition(content);

                    if (position === 'before') {
                        // Если чекбокс должен быть до контента, то content должен следовать после checkbox
                        expect(relation & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
                    } else {
                        // Если чекбокс должен быть после контента, то content должен предшествовать checkbox
                        expect(relation & Node.DOCUMENT_POSITION_PRECEDING).toBeTruthy();
                    }
                };

                it('should render checkbox when multiple=true with BaseOption', async () => {
                    render(
                        <Select
                            {...baseProps}
                            options={options}
                            Option={BaseOption}
                            multiple={true}
                            dataTestId='select'
                            defaultOpen={true}
                        />,
                    );

                    const { checkbox } = await getFirstOptionElements();

                    expect(checkbox).toBeInTheDocument();
                });

                const checkboxPositionCases = [
                    {
                        name: 'should position checkbox before content when checkmarkPosition=before (default Option)',
                        optionProps: { checkmarkPosition: 'before' as const },
                        expectedPosition: 'before' as const,
                    },
                    {
                        name: 'should position checkbox after content when checkmarkPosition=after (default Option)',
                        optionProps: { checkmarkPosition: 'after' as const },
                        expectedPosition: 'after' as const,
                    },
                ];

                it.each(checkboxPositionCases)(
                    '$name',
                    async ({ optionProps, expectedPosition }) => {
                        render(
                            <Select
                                {...baseProps}
                                options={options}
                                multiple={true}
                                optionProps={optionProps}
                                dataTestId='select'
                                defaultOpen={true}
                            />,
                        );

                        const { checkboxLabel, checkbox, content } = await getFirstOptionElements();

                        expectCheckboxPosition({
                            checkboxLabel,
                            checkbox,
                            content,
                            position: expectedPosition,
                        });
                    },
                );

                const getSelectAllElements = async () => {
                    const selectAllLabel = await screen.findByText('Выбрать все');
                    const checkboxContainer = selectAllLabel.closest('label');
                    const selectAllCheckbox = checkboxContainer?.querySelector('.box');

                    return { selectAllLabel, selectAllCheckbox, checkboxContainer };
                };

                const expectSelectAllPosition = async (position: 'before' | 'after') => {
                    const { selectAllLabel, selectAllCheckbox, checkboxContainer } =
                        await getSelectAllElements();

                    expect(selectAllCheckbox).toBeInTheDocument();
                    expect(selectAllLabel).toBeInTheDocument();

                    if (!checkboxContainer || !selectAllCheckbox || !selectAllLabel) {
                        return;
                    }

                    const containerChildren = Array.from(checkboxContainer.children);
                    const checkboxIndex = containerChildren.findIndex((child) =>
                        child.contains(selectAllCheckbox),
                    );
                    const labelIndex = containerChildren.findIndex((child) =>
                        child.contains(selectAllLabel),
                    );

                    if (position === 'before') {
                        expect(checkboxIndex).toBeLessThan(labelIndex);
                    } else {
                        expect(checkboxIndex).toBeGreaterThan(labelIndex);
                    }
                };

                const expectOptionCheckboxPosition = async (position: 'before' | 'after') => {
                    const { checkboxLabel, checkbox, content } = await getFirstOptionElements();

                    expectCheckboxPosition({
                        checkboxLabel,
                        checkbox,
                        content,
                        position,
                    });
                };

                type ComponentProps = {
                    useSelectPosition: 'before' | 'after';
                    optionPropsPosition: 'before' | 'after';
                };

                const Component = ({ useSelectPosition, optionPropsPosition }: ComponentProps) => {
                    const [selectedKeys, setSelectedKeys] = React.useState<string[]>([]);

                    const selectProps = useSelectWithApply({
                        options,
                        checkmarkPosition: useSelectPosition,
                        showHeaderWithSelectAll: true,
                        selected: selectedKeys,
                        onChange: ({ selectedMultiple }) => {
                            setSelectedKeys(selectedMultiple.map((option) => option.key));
                        },
                    });

                    return (
                        <Select
                            Option={BaseOption}
                            optionProps={{ checkmarkPosition: optionPropsPosition }}
                            dataTestId='select'
                            defaultOpen={true}
                            {...selectProps}
                        />
                    );
                };

                const selectAllCases = [
                    {
                        name: 'useSelectWithApply=after, optionProps=after',
                        useSelectPosition: 'after' as const,
                        optionPropsPosition: 'after' as const,
                    },
                    {
                        name: 'useSelectWithApply=after, optionProps=before',
                        useSelectPosition: 'after' as const,
                        optionPropsPosition: 'before' as const,
                    },
                    {
                        name: 'useSelectWithApply=before, optionProps=after',
                        useSelectPosition: 'before' as const,
                        optionPropsPosition: 'after' as const,
                    },
                    {
                        name: 'useSelectWithApply=before, optionProps=before',
                        useSelectPosition: 'before' as const,
                        optionPropsPosition: 'before' as const,
                    },
                ];

                it.each(selectAllCases)(
                    'should position checkboxes correctly: $name',
                    async ({ useSelectPosition, optionPropsPosition }) => {
                        render(
                            <Component
                                useSelectPosition={useSelectPosition}
                                optionPropsPosition={optionPropsPosition}
                            />,
                        );

                        await expectSelectAllPosition(useSelectPosition);
                        await expectOptionCheckboxPosition(optionPropsPosition);
                    },
                );
            });

            describe('EDGE CASES', () => {
                it('should not render checkbox when multiple=false', async () => {
                    render(
                        <Select
                            {...baseProps}
                            options={options}
                            multiple={false}
                            dataTestId='select'
                            defaultOpen={true}
                        />,
                    );

                    const optionsList = await screen.findByTestId('select-options-list');
                    const checkboxes = optionsList.querySelectorAll('.box');

                    expect(checkboxes.length).toBe(0);
                });
            });
        });

        describe('Checkmark rendering', () => {
            describe('SUCCESS CASES', () => {
                const checkmarkPositionCases = [
                    {
                        name: 'should position checkmark icon before content when checkmarkPosition=before and multiple=false',
                        optionProps: { checkmarkPosition: 'before' as const },
                        expectedPosition: 'before' as const,
                    },
                    {
                        name: 'should position checkmark icon after content when checkmarkPosition=after and multiple=false',
                        optionProps: { checkmarkPosition: 'after' as const },
                        expectedPosition: 'after' as const,
                    },
                ];

                it.each(checkmarkPositionCases)(
                    '$name',
                    async ({ optionProps, expectedPosition }) => {
                        render(
                            <Select
                                {...baseProps}
                                options={options}
                                Option={BaseOption}
                                multiple={false}
                                optionProps={optionProps}
                                dataTestId='select'
                                defaultOpen={true}
                            />,
                        );

                        const optionsList = await screen.findByTestId('select-options-list');
                        const firstOption = optionsList.querySelector('[role="option"]');

                        expect(firstOption).toBeInTheDocument();

                        const icon = firstOption?.querySelector('svg[class*="singleIcon"]');
                        const content = firstOption?.querySelector('.content');

                        expect(icon).toBeInTheDocument();
                        expect(content).toBeInTheDocument();

                        if (!(icon instanceof Element) || !(content instanceof Element)) {
                            return;
                        }

                        const relation = icon.compareDocumentPosition(content);

                        if (expectedPosition === 'before') {
                            // Если иконка должна быть до контента, то content должен следовать после icon
                            expect(relation & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
                        } else {
                            // Если иконка должна быть после контента, то content должен предшествовать icon
                            expect(relation & Node.DOCUMENT_POSITION_PRECEDING).toBeTruthy();
                        }
                    },
                );

                const checkmarkCases = [
                    {
                        name: 'should render Checkbox and not render checkmark icon when multiple is true for BaseOption',
                        props: { ...baseProps, options, Option: BaseOption, multiple: true },
                        selectors: ['.box'],
                        notSelectors: ['svg[class*="singleIcon"]'],
                    },
                    {
                        name: 'should render CheckmarkMIcon when multiple is false for BaseOption',
                        props: { ...baseProps, options, Option: BaseOption, multiple: false },
                        selectors: ['svg[class*="singleIcon"]'],
                        notSelectors: [],
                    },
                    {
                        name: 'should render Checkbox and not render checkmark icon when multiple is true (default Option)',
                        props: { ...baseProps, options, multiple: true },
                        selectors: ['.box'],
                        notSelectors: ['svg[class*="singleIcon"]'],
                    },
                    {
                        name: 'should render CheckmarkMIcon when multiple is false (default Option)',
                        props: { ...baseProps, options, multiple: false },
                        selectors: ['.checkmark.single', '.checkmark.single svg'],
                        notSelectors: [],
                    },
                ];

                it.each(checkmarkCases)(
                    '$name',
                    async ({ props, selectors, notSelectors = [] }) => {
                        render(
                            <Select
                                {...baseProps}
                                {...props}
                                options={props.options ?? options}
                                dataTestId='select'
                            />,
                        );

                        await userEvent.click(await screen.findByTestId('select-field'));

                        const optionsList = await screen.findByTestId('select-options-list');

                        selectors.forEach((selector) => {
                            const elements = optionsList.querySelectorAll(selector);
                            expect(elements.length).toBeGreaterThan(0);
                        });

                        notSelectors.forEach((selector) => {
                            const elements = optionsList.querySelectorAll(selector);
                            expect(elements.length).toBe(0);
                        });
                    },
                );
            });

            describe('EDGE CASES', () => {
                it('should not render checkmark when showCheckMark=false', async () => {
                    const optionsWithoutCheckmark = options.map((opt) => ({
                        ...opt,
                        showCheckMark: false,
                    }));

                    render(
                        <Select
                            {...baseProps}
                            options={optionsWithoutCheckmark}
                            Option={BaseOption}
                            multiple={false}
                            dataTestId='select'
                            defaultOpen={true}
                        />,
                    );

                    const optionsList = await screen.findByTestId('select-options-list');
                    const checkmarks = optionsList.querySelectorAll('svg[class*="singleIcon"]');
                    const checkboxes = optionsList.querySelectorAll('.box');

                    expect(checkmarks.length).toBe(0);
                    expect(checkboxes.length).toBe(0);
                });

                it('should not render checkmark when multiple=true', async () => {
                    render(
                        <Select
                            {...baseProps}
                            options={options}
                            Option={BaseOption}
                            multiple={true}
                            dataTestId='select'
                            defaultOpen={true}
                        />,
                    );

                    const optionsList = await screen.findByTestId('select-options-list');
                    const checkmarks = optionsList.querySelectorAll('svg[class*="singleIcon"]');

                    expect(checkmarks.length).toBe(0);
                });
            });
        });

        describe('Selection marker rendering', () => {
            describe('SUCCESS CASES', () => {
                it('should position selection marker (dot) before content when checkmarkPosition=before', async () => {
                    render(
                        <Select
                            {...baseProps}
                            options={options}
                            multiple={false}
                            optionProps={{ checkmarkPosition: 'before' }}
                            dataTestId='select'
                            defaultOpen={true}
                        />,
                    );

                    const optionsList = await screen.findByTestId('select-options-list');
                    const firstOption = optionsList.querySelector('[role="option"]');

                    expect(firstOption).toBeInTheDocument();

                    const selectionMarker = firstOption?.querySelector('.checkmark.single.before');
                    const content = firstOption?.querySelector('.content');

                    expect(selectionMarker).toBeInTheDocument();
                    expect(content).toBeInTheDocument();

                    if (!(selectionMarker instanceof Element) || !(content instanceof Element)) {
                        return;
                    }

                    // Проверка позиции selection marker относительно контента:
                    // compareDocumentPosition возвращает битовую маску, где:
                    // - DOCUMENT_POSITION_FOLLOWING означает, что content идет после selectionMarker
                    // - DOCUMENT_POSITION_PRECEDING означает, что content идет перед selectionMarker
                    const relation = selectionMarker.compareDocumentPosition(content);

                    // Если selection marker должен быть до контента, то content должен следовать после selectionMarker
                    expect(relation & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
                });

                it('should apply selected class to selection marker when option is selected', async () => {
                    render(
                        <Select
                            {...baseProps}
                            options={options}
                            multiple={false}
                            optionProps={{ checkmarkPosition: 'before' }}
                            selected={options[0].key}
                            dataTestId='select'
                            defaultOpen={true}
                        />,
                    );

                    const optionsList = await screen.findByTestId('select-options-list');
                    const selectedOption = optionsList.querySelector('[role="option"].selected');

                    expect(selectedOption).toBeInTheDocument();

                    const selectionMarker = selectedOption?.querySelector(
                        '.checkmark.single.before.selected',
                    );

                    expect(selectionMarker).toBeInTheDocument();
                });
            });

            describe('EDGE CASES', () => {
                it('should not render selection marker when multiple=true', async () => {
                    render(
                        <Select
                            {...baseProps}
                            options={options}
                            Option={BaseOption}
                            multiple={true}
                            dataTestId='select'
                            defaultOpen={true}
                        />,
                    );

                    const optionsList = await screen.findByTestId('select-options-list');
                    const selectionMarkers = optionsList.querySelectorAll('.checkmark.single');

                    expect(selectionMarkers.length).toBe(0);
                });

                it('should not render selection marker when showCheckMark=false', async () => {
                    const optionsWithoutCheckmark = options.map((opt) => ({
                        ...opt,
                        showCheckMark: false,
                    }));

                    render(
                        <Select
                            {...baseProps}
                            options={optionsWithoutCheckmark}
                            multiple={false}
                            dataTestId='select'
                            defaultOpen={true}
                        />,
                    );

                    const optionsList = await screen.findByTestId('select-options-list');
                    const selectionMarkers = optionsList.querySelectorAll('.checkmark.single');
                    const checkmarks = optionsList.querySelectorAll('svg[class*="singleIcon"]');
                    const checkboxes = optionsList.querySelectorAll('.box');

                    expect(selectionMarkers.length).toBe(0);
                    expect(checkmarks.length).toBe(0);
                    expect(checkboxes.length).toBe(0);
                });
            });
        });
    });

    describe('Callback tests', () => {
        it('should call onFocus and onBlur', async () => {
            const onFocus = jest.fn();
            const onBlur = jest.fn();
            render(
                <>
                    <Select
                        {...baseProps}
                        options={options}
                        onFocus={onFocus}
                        defaultOpen={true}
                        onBlur={onBlur}
                    />
                    <input />
                </>,
            );
            expect(onFocus).toHaveBeenCalledTimes(1);

            await userEvent.tab();
            expect(onBlur).toHaveBeenCalledTimes(1);
        });

        it('should not call onBlur when focusing inner focusable element', async () => {
            const onBlur = jest.fn();
            const { getByTestId } = render(
                <Select
                    {...baseProps}
                    selected={focusableOptions[0].key}
                    options={focusableOptions}
                    onBlur={onBlur}
                />,
            );

            await userEvent.click(getByTestId('focusable-1'));
            expect(onBlur).not.toHaveBeenCalled();
        });

        it('should call onOpen', () => {
            const cb = jest.fn();
            const { container } = render(<Select {...baseProps} options={options} onOpen={cb} />);

            const input = container.querySelector('.contentWrapper') as HTMLInputElement;

            fireEvent.click(input);

            waitFor(() => {
                expect(cb).toHaveBeenCalledTimes(1);
            });
        });

        it('should call onChange', async () => {
            const cb = jest.fn();
            const { container, findByText } = render(
                <Select {...baseProps} options={options} onChange={cb} />,
            );

            const input = container.querySelector('.input') as HTMLInputElement;

            fireEvent.click(input);

            const option = await findByText(options[0].content);
            fireEvent.click(option);
            expect(cb).toHaveBeenCalledTimes(1);
        });

        it('should call onScroll', () => {
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
            expect(onScroll).toHaveBeenCalledTimes(1);
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

            expect(valueRenderer).toHaveBeenCalled();
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

    describe('SelectMobile callback tests', () => {
        it('should call onFocus and onBlur', async () => {
            const onFocus = jest.fn();
            const onBlur = jest.fn();
            render(
                <SelectMobile {...baseProps} options={options} onFocus={onFocus} onBlur={onBlur} />,
            );
            fireEvent.focus(document.querySelector('.field') as HTMLElement);
            fireEvent.blur(document.querySelector('.field') as HTMLElement);
            expect(onFocus).toHaveBeenCalledTimes(1);
            expect(onBlur).toHaveBeenCalledTimes(1);
        });

        it('should call onScroll', () => {
            const onScroll = jest.fn();

            render(
                <SelectMobile
                    {...baseProps}
                    dataTestId='test-id'
                    options={options}
                    onScroll={onScroll}
                    defaultOpen={true}
                />,
            );

            fireEvent.scroll(document.querySelector('.sheetContainer') as HTMLElement);
            expect(onScroll).toHaveBeenCalledTimes(1);
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

    describe('Chevron tests', () => {
        it('should set `disabled` className', () => {
            const { container } = render(<Arrow disabled={true} />);

            expect(container.firstElementChild).toHaveClass('disabled');
        });
    });

    describe('Environment tests', () => {
        it('should pass environment prop to downshift', async () => {
            const mockEnvironment = {
                addEventListener: jest.fn(),
                removeEventListener: jest.fn(),
                document: document,
                Node: window.Node,
            };

            const { getByTestId } = render(
                <Select
                    {...baseProps}
                    options={options}
                    environment={mockEnvironment}
                    dataTestId='select'
                />,
            );

            expect(getByTestId('select')).toBeInTheDocument();

            fireEvent.click(getByTestId('select-field'));
            await waitFor(() => {
                expect(screen.getByRole('listbox')).toBeInTheDocument();
            });
        });

        it('should work with ShadowRoot-like environment', async () => {
            const mockShadowRootEnvironment: Environment = {
                addEventListener: jest.fn(),
                removeEventListener: jest.fn(),
                document: {
                    ...document,
                    // activeElement null или элемент из shadow DOM
                    activeElement: null,
                    elementFromPoint: jest.fn().mockReturnValue(null),
                    // ShadowRoot имеет свой document
                    ownerDocument: document,
                } as unknown as Document,
                Node: window.Node,
            };

            const { getByTestId } = render(
                <Select
                    {...baseProps}
                    options={options}
                    environment={mockShadowRootEnvironment}
                    dataTestId='select'
                />,
            );

            expect(getByTestId('select')).toBeInTheDocument();

            fireEvent.click(getByTestId('select-field'));
            await waitFor(() => {
                expect(screen.getByRole('listbox')).toBeInTheDocument();
            });

            const option = screen.getByText(options[0].content);
            fireEvent.click(option);
            expect(screen.getByText(options[0].content)).toBeInTheDocument();
        });

        it('should work without environment prop (default behavior)', async () => {
            const { getByTestId } = render(
                <Select {...baseProps} options={options} dataTestId='select' />,
            );

            expect(getByTestId('select')).toBeInTheDocument();

            fireEvent.click(getByTestId('select-field'));
            await waitFor(() => {
                expect(screen.getByRole('listbox')).toBeInTheDocument();
            });
        });
    });
});

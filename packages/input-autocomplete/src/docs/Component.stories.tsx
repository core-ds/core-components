import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { text, select, boolean } from '@storybook/addon-knobs';

import { Arrow, BaseOption, OptionShape } from '@alfalab/core-components-select/shared';
import {
    InputAutocomplete,
    InputAutocompleteProps,
} from '@alfalab/core-components-input-autocomplete';
import { InputAutocompleteDesktop } from '@alfalab/core-components-input-autocomplete/desktop';
import {
    InputAutocompleteMobile,
    InputAutocompleteModalMobile,
} from '@alfalab/core-components-input-autocomplete/mobile';

const matchOption = (option: OptionShape, inputValue = '') =>
    option.key.toLowerCase().includes(inputValue.toLowerCase());

const meta: Meta<typeof InputAutocomplete> = {
    title: 'Components/InputAutocomplete',
    component: InputAutocomplete,
    id: 'InputAutocomplete',
};

type Story = StoryObj<typeof InputAutocomplete>;

const renderComponent = (Component: any, props?: Partial<InputAutocompleteProps>) => {
    const options = [
        { key: 'Neptunium' },
        { key: 'Plutonium' },
        { key: 'Americium' },
        { key: 'Curium' },
        { key: 'Berkelium' },
        { key: 'Californium' },
        { key: 'Einsteinium' },
        { key: 'Fermium' },
        { key: 'Mendelevium' },
        { key: 'Nobelium' },
        { key: 'Lawrencium' },
        { key: 'Rutherfordium' },
        { key: 'Dubnium' },
        { key: 'Seaborgium' },
        { key: 'Bohrium' },
    ];

    const [value, setValue] = React.useState('');
    const handleInput: InputAutocompleteProps['onInput'] = (value) => {
        setValue(value);
    };
    const handleChange: InputAutocompleteProps['onChange'] = ({ selected }) => {
        setValue(selected ? selected.key : '');
    };
    const filteredOptions = options.filter((option) => matchOption(option, value));

    const Option = boolean('Default Option', true) ? undefined : BaseOption;

    return (
        <Component
            {...props}
            dataTestId='InputAutocomplete'
            options={filteredOptions}
            selected={boolean('prevent select', true) ? [] : undefined}
            block={boolean('block', false)}
            size={select('size', [40, 48, 56, 64, 72], 48)}
            disabled={boolean('disabled', false)}
            error={text('error', '')}
            success={boolean('success', false)}
            hint={text('hint', '')}
            allowUnselect={boolean('allowUnselect', true)}
            closeOnSelect={boolean('closeOnSelect', false)}
            Arrow={boolean('Arrow', false) ? Arrow : undefined}
            Option={Option}
            circularNavigation={boolean('circularNavigation', false)}
            placeholder={text('placeholder', 'Введите элемент')}
            label={text('label', 'Элемент')}
            labelView={select('labelView', ['inner', 'outer'], 'inner')}
            onChange={handleChange}
            onInput={handleInput}
            value={value}
            multiline={boolean('multiline', false)}
            inputProps={{
                ...props?.inputProps,
                onClear: () => setValue(''),
            }}
        />
    );
};

export const input_autocomplete: Story = {
    name: 'InputAutocomplete',
    render: () => renderComponent(InputAutocomplete),
};

export const input_autocomplete_desktop: Story = {
    name: 'InputAutocompleteDesktop',
    render: () => renderComponent(InputAutocompleteDesktop),
};

export const input_autocomplete_mobile: Story = {
    name: 'InputAutocompleteMobile',
    render: () => renderComponent(InputAutocompleteMobile, { inputProps: { clear: true } }),
};

export const input_autocomplete_modal_mobile: Story = {
    name: 'InputAutocompleteModalMobile',
    render: () => renderComponent(InputAutocompleteModalMobile, { inputProps: { clear: true } }),
};

export default meta;

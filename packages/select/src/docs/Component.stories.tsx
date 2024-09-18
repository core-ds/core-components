import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { text, boolean, number, select as selectKnob } from '@storybook/addon-knobs';

import { SelectDesktop } from '@alfalab/core-components-select/desktop';
import { Select as SelectResponsive } from '@alfalab/core-components-select';
import { SelectMobile, SelectModalMobile } from '@alfalab/core-components-select/mobile';
import { Arrow as ArrowComponent } from '@alfalab/core-components-select/components/arrow';

const options = [
    { key: '1', content: 'Neptunium' },
    { key: '2', content: 'Plutonium' },
    { key: '3', content: 'Americium' },
    { key: '4', content: 'Curium' },
    { key: '5', content: 'Berkelium' },
    { key: '6', content: 'Californium' },
    { key: '7', content: 'Einsteinium' },
    { key: '8', content: 'Fermium' },
    { key: '9', content: 'Vanadium' },
    { key: '10', content: 'Manganese' },
    { key: '11', content: 'Silicon' },
    { key: '12', content: 'Titanium' },
    { key: '13', content: 'Neptunium' },
    { key: '14', content: 'Plutonium' },
    { key: '15', content: 'Americium' },
    { key: '16', content: 'Curium' },
    { key: '17', content: 'Berkelium' },
];

const POSITION_OPTIONS = [
    'top',
    'top-start',
    'top-end',
    'bottom',
    'bottom-start',
    'bottom-end',
    'right',
    'right-start',
    'right-end',
    'left',
    'left-start',
    'left-end',
];

const meta: Meta<typeof SelectDesktop> = {
    title: 'Components/Select',
    component: SelectDesktop,
    id: 'Select',
};

type Story = StoryObj<typeof SelectDesktop>;

export const select: Story = {
    name: 'Select',
    render: () => {
        const [selected, setSelected] = React.useState([]);
        const handleChange = ({ selectedMultiple }) => {
            setSelected(selectedMultiple.map((option) => option.key));
        };
        const block = boolean('block', false);
        const size = selectKnob('size', [48, 56, 64, 72], 48);
        const disabled = boolean('disabled', false);
        const error = text('error', '');
        const hint = text('hint', '');
        const multiple = boolean('multiple', false);
        const allowUnselect = boolean('allowUnselect', true);
        const closeOnSelect = boolean('closeOnSelect', true);
        const Arrow = boolean('Arrow', true) ? ArrowComponent : () => null;
        const circularNavigation = boolean('circularNavigation', false);
        const nativeSelect = boolean('nativeSelect', false);
        const placeholder = text('placeholder', 'Выберите элемент');
        const label = text('label', 'Элемент');
        const labelView = selectKnob('labelView', ['inner', 'outer'], 'inner');
        const visibleOptions = number('visibleOptions', 5);
        const defaultOpen = boolean('defaultOpen', false);
        const popoverPosition = selectKnob('popoverPosition', POSITION_OPTIONS, 'bottom-start');
        const optionsListWidth = selectKnob('optionsListWidth', ['field', 'content'], 'field');
        const clear = boolean('clear', true);
        return (
            <div style={{ backgroundColor: 'transparent' }}>
                <SelectDesktop
                    block={block}
                    size={size}
                    disabled={disabled}
                    error={error}
                    hint={hint}
                    options={options}
                    multiple={multiple}
                    onChange={handleChange}
                    selected={selected}
                    allowUnselect={allowUnselect}
                    closeOnSelect={closeOnSelect}
                    Arrow={Arrow}
                    circularNavigation={circularNavigation}
                    nativeSelect={nativeSelect}
                    placeholder={placeholder}
                    label={label}
                    labelView={labelView}
                    visibleOptions={visibleOptions}
                    defaultOpen={defaultOpen}
                    popoverPosition={popoverPosition}
                    optionsListWidth={optionsListWidth}
                    clear={clear}
                />
            </div>
        );
    },
};

export const select_mobile: Story = {
    name: 'SelectMobile',
    render: () => {
        const [selected, setSelected] = React.useState([]);
        const handleChange = ({ selectedMultiple }) => {
            setSelected(selectedMultiple.map((option) => option.key));
        };
        const block = boolean('block', false);
        const size = selectKnob('size', [48, 56, 64, 72], 48);
        const disabled = boolean('disabled', false);
        const error = text('error', '');
        const hint = text('hint', '');
        const multiple = boolean('multiple', false);
        const allowUnselect = boolean('allowUnselect', true);
        const closeOnSelect = boolean('closeOnSelect', true);
        const Arrow = boolean('Arrow', true) ? ArrowComponent : () => null;
        const circularNavigation = boolean('circularNavigation', false);
        const placeholder = text('placeholder', 'Выберите элемент');
        const label = text('label', 'Элемент');
        const labelView = selectKnob('labelView', ['inner', 'outer'], 'inner');
        const defaultOpen = boolean('defaultOpen', false);
        const swipeable = boolean('swipeable', true);
        const clear = boolean('clear', true);
        return (
            <div style={{ backgroundColor: 'transparent' }}>
                <SelectMobile
                    block={block}
                    size={size}
                    disabled={disabled}
                    error={error}
                    hint={hint}
                    options={options}
                    multiple={multiple}
                    onChange={handleChange}
                    selected={selected}
                    allowUnselect={allowUnselect}
                    closeOnSelect={closeOnSelect}
                    Arrow={Arrow}
                    circularNavigation={circularNavigation}
                    placeholder={placeholder}
                    label={label}
                    labelView={labelView}
                    defaultOpen={defaultOpen}
                    swipeable={swipeable}
                    clear={clear}
                />
            </div>
        );
    },
};

export const select_responsive: Story = {
    name: 'SelectResponsive',
    render: () => {
        const [selected, setSelected] = React.useState([]);
        const handleChange = ({ selectedMultiple }) => {
            setSelected(selectedMultiple.map((option) => option.key));
        };
        const block = boolean('block', false);
        const size = selectKnob('size', [48, 56, 64, 72], 48);
        const disabled = boolean('disabled', false);
        const error = text('error', '');
        const hint = text('hint', '');
        const multiple = boolean('multiple', false);
        const allowUnselect = boolean('allowUnselect', true);
        const closeOnSelect = boolean('closeOnSelect', true);
        const Arrow = boolean('Arrow', true) ? ArrowComponent : () => null;
        const circularNavigation = boolean('circularNavigation', false);
        const nativeSelect = boolean('nativeSelect', false);
        const placeholder = text('placeholder', 'Выберите элемент');
        const label = text('label', 'Элемент');
        const labelView = selectKnob('labelView', ['inner', 'outer'], 'inner');
        const visibleOptions = number('visibleOptions', 5);
        const defaultOpen = boolean('defaultOpen', false);
        const popoverPosition = selectKnob('popoverPosition', POSITION_OPTIONS, 'bottom-start');
        const optionsListWidth = selectKnob('optionsListWidth', ['field', 'content'], 'field');
        const clear = boolean('clear', true);
        return (
            <div style={{ backgroundColor: 'transparent' }}>
                <SelectResponsive
                    block={block}
                    size={size}
                    disabled={disabled}
                    error={error}
                    hint={hint}
                    options={options}
                    multiple={multiple}
                    onChange={handleChange}
                    selected={selected}
                    allowUnselect={allowUnselect}
                    closeOnSelect={closeOnSelect}
                    Arrow={Arrow}
                    circularNavigation={circularNavigation}
                    nativeSelect={nativeSelect}
                    placeholder={placeholder}
                    label={label}
                    labelView={labelView}
                    visibleOptions={visibleOptions}
                    defaultOpen={defaultOpen}
                    popoverPosition={popoverPosition}
                    optionsListWidth={optionsListWidth}
                    clear={clear}
                />
            </div>
        );
    },
};

export const select_modal_mobile: Story = {
    name: 'SelectModalMobile',
    render: () => {
        const [selected, setSelected] = React.useState([]);
        const handleChange = ({ selectedMultiple }) => {
            setSelected(selectedMultiple.map((option) => option.key));
        };
        const block = boolean('block', false);
        const size = selectKnob('size', [48, 56, 64, 72], 48);
        const disabled = boolean('disabled', false);
        const error = text('error', '');
        const hint = text('hint', '');
        const multiple = boolean('multiple', false);
        const allowUnselect = boolean('allowUnselect', true);
        const closeOnSelect = boolean('closeOnSelect', true);
        const Arrow = boolean('Arrow', true) ? ArrowComponent : () => null;
        const circularNavigation = boolean('circularNavigation', false);
        const placeholder = text('placeholder', 'Выберите элемент');
        const label = text('label', 'Элемент');
        const labelView = selectKnob('labelView', ['inner', 'outer'], 'inner');
        const defaultOpen = boolean('defaultOpen', false);
        const clear = boolean('clear', true);
        return (
            <div style={{ backgroundColor: 'transparent' }}>
                <SelectModalMobile
                    block={block}
                    size={size}
                    disabled={disabled}
                    error={error}
                    hint={hint}
                    options={options}
                    multiple={multiple}
                    onChange={handleChange}
                    selected={selected}
                    allowUnselect={allowUnselect}
                    closeOnSelect={closeOnSelect}
                    Arrow={Arrow}
                    circularNavigation={circularNavigation}
                    placeholder={placeholder}
                    label={label}
                    labelView={labelView}
                    defaultOpen={defaultOpen}
                    clear={clear}
                />
            </div>
        );
    },
};

export default meta;

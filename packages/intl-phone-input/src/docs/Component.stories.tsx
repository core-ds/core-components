import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { text, select, boolean } from '@storybook/addon-knobs';
import { IntlPhoneInput } from '@alfalab/core-components-intl-phone-input';
import { IntlPhoneInputMobile } from '@alfalab/core-components-intl-phone-input/mobile';
import { IntlPhoneInputDesktop } from '@alfalab/core-components-intl-phone-input/desktop';

const meta: Meta<typeof IntlPhoneInput> = {
    title: 'Components/IntlPhoneInput',
    component: IntlPhoneInput,
    id: 'IntlPhoneInput',
};

type Story = StoryObj<typeof IntlPhoneInput>;

export const intl_phone_input: Story = {
    name: 'IntlPhoneInput',
    render: () => {
        const [value, setValue] = React.useState('+79647820725');
        const [selectedCountry, setSelectedCountry] = React.useState('RU');
        const handleChange = React.useCallback(
            (newValue) => {
                setValue(newValue);
            },
            [setValue],
        );
        const size = select('size', ['s', 'm', 'l', 'xl'], 'm');
        const block = boolean('block', false);
        const disabled = boolean('disabled', false);
        const hideCountrySelect = boolean('hideCountrySelect', false);
        const canBeEmptyCountry = boolean('canBeEmptyCountry', false);
        const ruNumberPriority = boolean('ruNumberPriority', false);
        const clear = boolean('clear', false);
        const label = text('label', 'Номер телефона');
        const clearableCountryCode = boolean('clearableCountryCode', true);
        const handleCountryChange = React.useCallback((countryCode) => {
            setSelectedCountry(countryCode);
        },[setSelectedCountry]);
        return (
            <>
                <IntlPhoneInput
                    value={value}
                    onChange={handleChange}
                    size={size}
                    block={block}
                    label={label}
                    disabled={disabled}
                    canBeEmptyCountry={canBeEmptyCountry}
                    hideCountrySelect={hideCountrySelect}
                    clear={clear}
                    ruNumberPriority={ruNumberPriority}
                    defaultCountryIso2='RU'
                    readOnly={boolean('readOnly', false)}
                    onCountryChange={handleCountryChange}
                    clearableCountryCode={clearableCountryCode}
                />
                <br />
                Код выбранной страны: <strong>{selectedCountry}</strong>
            </>
        );
    },
};

export const intl_phone_input_mobile: Story = {
    name: 'IntlPhoneInputMobile',
    render: () => {
        const [value, setValue] = React.useState('+79647820725');
        const [selectedCountry, setSelectedCountry] = React.useState('RU');
        const handleChange = React.useCallback(
            (newValue) => {
                setValue(newValue);
            },
            [setValue],
        );
        const size = select('size', ['s', 'm', 'l', 'xl'], 'm');
        const disabled = boolean('disabled', false);
        const hideCountrySelect = boolean('hideCountrySelect', false);
        const canBeEmptyCountry = boolean('canBeEmptyCountry', false);
        const ruNumberPriority = boolean('ruNumberPriority', false);
        const clear = boolean('clear', false);
        const label = text('label', 'Номер телефона');
        const clearableCountryCode = boolean('clearableCountryCode', true);
        const handleCountryChange = React.useCallback((countryCode) => {
            setSelectedCountry(countryCode);
        },[setSelectedCountry]);
        return (
            <div style={{width: 265}}>
                <IntlPhoneInputMobile
                    value={value}
                    onChange={handleChange}
                    size={size}
                    block={true}
                    label={label}
                    disabled={disabled}
                    canBeEmptyCountry={canBeEmptyCountry}
                    hideCountrySelect={hideCountrySelect}
                    clear={clear}
                    ruNumberPriority={ruNumberPriority}
                    defaultCountryIso2='RU'
                    onCountryChange={handleCountryChange}
                    clearableCountryCode={clearableCountryCode}
                />
                <br />
                Код выбранной страны: <strong>{selectedCountry}</strong>
            </div>
        );
    },
};

export const intl_phone_input_desktop: Story = {
    name: 'IntlPhoneInputDesktop',
    render: () => {
        const [value, setValue] = React.useState('+79647820725');
        const [selectedCountry, setSelectedCountry] = React.useState('RU');
        const handleChange = React.useCallback(
            (newValue) => {
                setValue(newValue);
            },
            [setValue],
        );
        const size = select('size', ['s', 'm', 'l', 'xl'], 'm');
        const block = boolean('block', false);
        const disabled = boolean('disabled', false);
        const hideCountrySelect = boolean('hideCountrySelect', false);
        const canBeEmptyCountry = boolean('canBeEmptyCountry', false);
        const ruNumberPriority = boolean('ruNumberPriority', false);
        const clear = boolean('clear', false);
        const label = text('label', 'Номер телефона');
        const clearableCountryCode = boolean('clearableCountryCode', true);
        const handleCountryChange = React.useCallback((countryCode) => {
            setSelectedCountry(countryCode);
        },[setSelectedCountry]);
        return (
            <>
                <IntlPhoneInputDesktop
                    value={value}
                    onChange={handleChange}
                    size={size}
                    block={block}
                    label={label}
                    disabled={disabled}
                    canBeEmptyCountry={canBeEmptyCountry}
                    hideCountrySelect={hideCountrySelect}
                    clear={clear}
                    ruNumberPriority={ruNumberPriority}
                    defaultCountryIso2='RU'
                    readOnly={boolean('readOnly', false)}
                    onCountryChange={handleCountryChange}
                    clearableCountryCode={clearableCountryCode}
                />
                <br />
                Код выбранной страны: <strong>{selectedCountry}</strong>
            </>
        );
    },
};

export default meta;

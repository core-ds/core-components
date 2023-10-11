import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
    InternationalPhoneInput,
    InternationalPhoneInputProps,
} from '@alfalab/core-components-international-phone-input';
import { boolean, text } from '@storybook/addon-knobs';

const meta: Meta<typeof InternationalPhoneInput> = {
    title: 'Components/InternationalPhoneInput',
    component: InternationalPhoneInput,
    id: 'InternationalPhoneInput',
};

type Story = StoryObj<typeof InternationalPhoneInput>;

const OPTIONS = [
    { key: '+7 921 681 53 98' },
    { key: '+7 921 681 52 97' },
    { key: '+7 921 681 52 96' },
    { key: '+7 921 681 52 95' },
    { key: '8 921 681 52 94' },
];

export const international_phone_input: Story = {
    name: 'InternationalPhoneInput',
    render: () => {
        const [value, setValue] = useState('');

        const handleChange: InternationalPhoneInputProps['onChange'] = (e, { value: phone }) => {
            setValue(phone);
        };

        return (
            <div style={{ width: '320px' }}>
                <InternationalPhoneInput
                    label='Номер телефона'
                    placeholder='Введите номер телефона'
                    value={value}
                    onChange={handleChange}
                    defaultIso2={text('defaultIso2', 'ru')}
                    options={boolean('options', false) ? OPTIONS : undefined}
                    block={true}
                    clearableCountryCode={boolean('clearableCountryCode', true)}
                    clear={boolean('clear', false)}
                />
            </div>
        );
    },
};

export default meta;

import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { text, select, boolean } from '@storybook/addon-knobs';
import { StarMIcon } from '@alfalab/icons-glyph/StarMIcon';
import { PhoneInput } from '@alfalab/core-components-phone-input';

const meta: Meta<typeof PhoneInput> = {
    title: 'Components/PhoneInput',
    component: PhoneInput,
    id: 'PhoneInput',
};

type Story = StoryObj<typeof PhoneInput>;

export const phone_input: Story = {
    name: 'PhoneInput',
    render: () => (
        <PhoneInput
            block={boolean('block', false)}
            size={select('size', ['s', 'm', 'l', 'xl'], 's')}
            error={text('error', '')}
            hint={text('hint', '')}
            label={text('label', '')}
            value={text('value', '')}
            clearableCountryCode={boolean('clearableCountryCode', true)}
            leftAddons={boolean('leftAddons', false) && <StarMIcon />}
            rightAddons={boolean('rightAddons', false) && <StarMIcon />}
            bottomAddons={boolean('bottomAddons', false) && <span>bottom text</span>}
        />
    ),
};

export default meta;

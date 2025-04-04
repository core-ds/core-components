import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { text, select, boolean } from '@storybook/addon-knobs';
import { StarMIcon } from '@alfalab/icons-glyph/StarMIcon';
import { PhoneInput } from '@balafla/core-components-phone-input';
import { DiamondsSIcon } from '@alfalab/icons-glyph/DiamondsSIcon';

const meta: Meta<typeof PhoneInput> = {
    title: 'Components/PhoneInput',
    component: PhoneInput,
    id: 'PhoneInput',
};

type Story = StoryObj<typeof PhoneInput>;

export const phone_input: Story = {
    name: 'PhoneInput',
    render: () => {
        const size = select('size', [40, 48, 56, 64, 72], 48);
        const IconComponent = size === 40 ? DiamondsSIcon : StarMIcon;

        return (
            <PhoneInput
                block={boolean('block', false)}
                size={size}
                error={text('error', '')}
                hint={text('hint', '')}
                label={text('label', '')}
                value={text('value', '')}
                clearableCountryCode={boolean('clearableCountryCode', true)}
                leftAddons={boolean('leftAddons', false) && <IconComponent />}
                rightAddons={boolean('rightAddons', false) && <IconComponent />}
                bottomAddons={boolean('bottomAddons', false) && <span>bottom text</span>}
                labelView={select('labelView', ['inner', 'outer'], 'inner')}
            />
        );
    },
};

export default meta;

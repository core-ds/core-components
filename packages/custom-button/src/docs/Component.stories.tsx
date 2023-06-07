import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { text, select, boolean, color } from '@storybook/addon-knobs';

import { StarMIcon } from '@alfalab/icons-glyph/StarMIcon';
import { CustomButton } from '@alfalab/core-components-custom-button';

const meta: Meta<typeof CustomButton> = {
    title: 'Components/CustomButton',
    component: CustomButton,
    id: 'CustomButton',
};

type Story = StoryObj<typeof CustomButton>;

const SIZES = ['xxs', 'xs', 's', 'm', 'l', 'xl'] as const;
const CONTENT_COLORS = ['white', 'black', 'static-white', 'static-black'] as const;
const STATE_TYPES = ['darkening', 'lightening', 'static-darkening', 'static-lightening'] as const;

export const custom_button: Story = {
    name: 'CustomButton',
    render: () => {
        return (
            <CustomButton
                size={select('size', SIZES, 'm')}
                backgroundColor={color('backgroundColor', '#FF45C3')}
                contentColor={select('contentColor', CONTENT_COLORS, 'white')}
                stateType={select('stateType', STATE_TYPES, 'darkening')}
                href={text('href', '')}
                loading={boolean('loading', false)}
                disabled={boolean('disabled', false)}
                block={boolean('block', false)}
                nowrap={boolean('nowrap', false)}
                leftAddons={boolean('leftAddons', false) && <StarMIcon />}
                rightAddons={boolean('rightAddons', false) && <StarMIcon />}
            >
                {text('label', 'Оплатить')}
            </CustomButton>
        );
    },
};

export default meta;

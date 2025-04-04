import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { text, select, boolean, number } from '@storybook/addon-knobs';
import { StarMIcon } from '@alfalab/icons-glyph/StarMIcon';
import { DiamondsSIcon } from '@alfalab/icons-glyph/DiamondsSIcon';
import { AmountInput } from '@balafla/core-components-amount-input';

const meta: Meta<typeof AmountInput> = {
    title: 'Components/AmountInput',
    component: AmountInput,
    id: 'AmountInput',
};

type Story = StoryObj<typeof AmountInput>;

export const amount_input: Story = {
    name: 'AmountInput',
    render: () => {
        const size = select('size', [40, 48, 56, 64, 72], 48);
        const IconComponent = size === 40 ? DiamondsSIcon : StarMIcon;

        return (
            <AmountInput
                value={number('value', null)}
                currency={text('currency', 'RUR')}
                suffix={text('suffix', undefined)}
                integerLength={number('integerLength', 9)}
                minority={number('minority', 100)}
                integersOnly={boolean('integersOnly', false)}
                positiveOnly={boolean('positiveOnly', true)}
                bold={boolean('bold', true)}
                block={boolean('block', false)}
                size={size}
                disabled={boolean('disabled', false)}
                placeholder={text('placeholder', undefined)}
                label={text('label', '')}
                hint={text('hint', '')}
                error={text('error', '')}
                leftAddons={boolean('leftAddons', false) && <IconComponent />}
                bottomAddons={boolean('bottomAddons', false) && <span>bottom text</span>}
                clear={boolean('clear', false)}
                readOnly={boolean('readOnly', false)}
                labelView={select('labelView', ['inner', 'outer'], 'inner')}
            />
        );
    },
};

export default meta;

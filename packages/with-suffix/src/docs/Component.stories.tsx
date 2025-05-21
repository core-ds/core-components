import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { text, select, boolean } from '@storybook/addon-knobs';
import { StarMIcon } from '@alfalab/icons-glyph/StarMIcon';
import { Input } from '@alfalab/core-components-input';
import { withSuffix as WithSuffix } from '@alfalab/core-components-with-suffix';

const SuffixInput = WithSuffix(Input);

const meta: Meta<typeof WithSuffix> = {
    title: 'Components/withSuffix',
    component: WithSuffix,
    id: 'withSuffix',
};

type Story = StoryObj<typeof WithSuffix>;

export const with_suffix: Story = {
    name: 'WithSuffix',
    render: () => (
        <SuffixInput
            suffix={text('suffix', ' ₽')}
            block={boolean('block', false)}
            clear={boolean('clear', false)}
            size={select('size', [48, 56, 64, 72], 48)}
            disabled={boolean('disabled', false)}
            label={text('label', '')}
            placeholder={text('placeholder', '')}
            rightAddons={boolean('rightAddons', false) && !text('error', '') && <StarMIcon />}
            leftAddons={boolean('leftAddons', false) && <StarMIcon />}
            bottomAddons={boolean('bottomAddons', false) && <span>bottom text</span>}
            readOnly={boolean('readOnly', false)}
        />
    ),
};

export default meta;

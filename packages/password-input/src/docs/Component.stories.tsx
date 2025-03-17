import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { text, select, boolean, object } from '@storybook/addon-knobs';
import { StarMIcon } from '@alfalab/icons-glyph/StarMIcon';
import { PasswordInput } from '@alfalab/core-components-password-input';

const meta: Meta<typeof PasswordInput> = {
    title: 'Components/PasswordInput',
    component: PasswordInput,
    id: 'PasswordInput',
};

type Story = StoryObj<typeof PasswordInput>;

export const password_input: Story = {
    name: 'PasswordInput',
    render: () => (
        <PasswordInput
            block={boolean('block', false)}
            size={select('size', [48, 56, 64, 72], 48)}
            disabled={boolean('disabled', false)}
            placeholder={text('placeholder', '')}
            label={text('label', '')}
            hint={text('hint', '')}
            error={text('error', '')}
            success={boolean('success', false)}
            leftAddons={boolean('leftAddons', false) && <StarMIcon />}
            rightAddons={boolean('rightAddons', false) && <StarMIcon />}
            bottomAddons={boolean('bottomAddons', false) && <span>bottom text</span>}
            readOnly={boolean('readOnly', false)}
            passwordHint={object('passwordHint', {
                visible: 'Скрыть введённые цифры',
                hidden: 'Показать введённые цифры',
            })}
        />
    ),
};

export default meta;

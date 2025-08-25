import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { text, select, boolean, number } from '@storybook/addon-knobs';
import { StarMIcon } from '@alfalab/icons-glyph/StarMIcon';
import { DiamondsSIcon } from '@alfalab/icons-glyph/DiamondsSIcon';
import { AmountInput, AmountInputProps } from '@alfalab/core-components-amount-input';

const meta: Meta<typeof AmountInput> = {
    title: 'Components/AmountInput',
    component: AmountInput,
    id: 'AmountInput',
};

type Story = StoryObj<typeof AmountInput>;

export const amount_input: Story = {
    name: 'AmountInput',
    render: () => {
        const [value, setValue] = useState(1000);

        const size = select('size', [40, 48, 56, 64, 72], 48);
        const IconComponent = size === 40 ? DiamondsSIcon : StarMIcon;

        const colors = select('colors', ['default', 'inverted'], 'default');

        const stepper = boolean('stepper', false);
        const step = stepper && number('step', 100);
        const min = stepper && number('min', 0);
        const max = stepper && number('max', 1500);

        const handleChange: AmountInputProps['onChange'] = (_, payload) => {
            if (payload?.value) {
                setValue(payload.value);
            }
        };

        return (
            <div
                style={{
                    backgroundColor:
                        colors === 'inverted'
                            ? 'var(--color-light-base-bg-primary-inverted)'
                            : 'transparent',
                    padding: '8px',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                }}
            >
                <AmountInput
                    value={value}
                    colors={colors}
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
                    disableUserInput={boolean('disableUserInput', false)}
                    placeholder={text('placeholder', undefined)}
                    label={text('label', '')}
                    hint={text('hint', '')}
                    error={text('error', '')}
                    leftAddons={boolean('leftAddons', false) && <IconComponent />}
                    bottomAddons={boolean('bottomAddons', false) && <span>bottom text</span>}
                    clear={boolean('clear', false)}
                    readOnly={boolean('readOnly', false)}
                    labelView={select('labelView', ['inner', 'outer'], 'inner')}
                    stepper={stepper && { step, min, max }}
                    onChange={handleChange}
                />
            </div>
        );
    },
};

export default meta;

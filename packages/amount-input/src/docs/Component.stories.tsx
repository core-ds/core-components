import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { text, select, boolean, number } from '@storybook/addon-knobs';
import { StarMIcon } from '@alfalab/icons-glyph/StarMIcon';
import { DiamondsSIcon } from '@alfalab/icons-glyph/DiamondsSIcon';
import { AmountInput, AmountInputProps } from '@alfalab/core-components-amount-input';
import { currency, CurrencyCodes } from '@alfalab/data';

const meta: Meta<typeof AmountInput> = {
    title: 'Components/AmountInput',
    component: AmountInput,
    id: 'AmountInput',
};

type Story = StoryObj<typeof AmountInput>;

function toUndefined<T>(value: T): T | undefined {
    return value || undefined;
}

export const amount_input: Story = {
    name: 'AmountInput',
    render: () => {
        const [value, setValue] = useState(1000);

        const size = select('size', [40, 48, 56, 64, 72], 48);
        const IconComponent = size === 40 ? DiamondsSIcon : StarMIcon;

        const colors = select('colors', ['default', 'inverted'], 'default');

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
                    currency={select(
                        'currency',
                        Object.keys(currency.CURRENCY_SYMBOLS) as CurrencyCodes[],
                        'RUR',
                    )}
                    suffix={toUndefined(text('suffix', ''))}
                    integerLength={number('integerLength', 9)}
                    minority={number('minority', 100)}
                    integersOnly={boolean('integersOnly', false)}
                    positiveOnly={boolean('positiveOnly', true)}
                    bold={boolean('bold', true)}
                    block={boolean('block', false)}
                    size={size}
                    disabled={boolean('disabled', false)}
                    readOnly={boolean('readOnly', false)}
                    disableUserInput={boolean('disableUserInput', false)}
                    placeholder={toUndefined(text('placeholder', ''))}
                    label={text('label', '')}
                    hint={text('hint', '')}
                    error={text('error', '')}
                    leftAddons={boolean('leftAddons', false) && <IconComponent />}
                    bottomAddons={boolean('bottomAddons', false) && <span>bottom text</span>}
                    clear={boolean('clear', false)}
                    labelView={select('labelView', ['inner', 'outer'], 'inner')}
                    stepper={
                        boolean('stepper', false)
                            ? {
                                  step: number('step', 100),
                                  min: number('min', 0),
                                  max: number('max', 1500),
                              }
                            : undefined
                    }
                    onChange={handleChange}
                    zeroValue={boolean('zeroValue', false)}
                    view={select(
                        'view',
                        ['default', 'withZeroMinorPart', 'shortMinorPart'],
                        'default',
                    )}
                />
            </div>
        );
    },
};

export default meta;

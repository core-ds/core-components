import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { text, select, boolean, number } from '@storybook/addon-knobs';
import { StarMIcon } from '@alfalab/icons-glyph/StarMIcon';
import { NumberInput } from '@alfalab/core-components-number-input';

const meta: Meta<typeof NumberInput> = {
    title: 'Components/NumberInput',
    component: NumberInput,
    id: 'NumberInput',
};

type Story = StoryObj<typeof NumberInput>;

export const number_input: Story = {
    name: 'NumberInput',
    render: () => {
        const colors = select('colors', ['default', 'inverted'], 'default');
        return (
            <div
                style={{
                    backgroundColor:
                        colors === 'inverted'
                            ? 'var(--color-light-bg-primary-inverted)'
                            : 'transparent',
                    padding: '8px',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                }}
            >
                <NumberInput
                    separator={select('separator', [',', '.'], ',')}
                    fractionLength={number('fractionLength', 2)}
                    allowSigns={boolean('showSigns', true)}
                    block={boolean('block', false)}
                    clear={boolean('clear', false)}
                    size={select('size', ['s', 'm', 'l', 'xl'], 's')}
                    colors={colors}
                    disabled={boolean('disabled', false)}
                    placeholder={text('placeholder', '')}
                    label={text('label', '')}
                    labelView={select('labelView', ['inner', 'outer'], 'inner')}
                    hint={text('hint', '')}
                    error={text('error', '')}
                    success={boolean('success', false)}
                    rightAddons={boolean('rightAddons', false) && <StarMIcon />}
                    leftAddons={boolean('leftAddons', false) && <StarMIcon />}
                    bottomAddons={boolean('bottomAddons', false) && <span>bottom text</span>}
                    readOnly={boolean('readOnly', false)}
                />
            </div>
        );
    },
};

export default meta;

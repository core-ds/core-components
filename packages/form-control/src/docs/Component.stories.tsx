import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { text, select, boolean } from '@storybook/addon-knobs';
import { StarMIcon } from '@alfalab/icons-glyph/StarMIcon';
import { FormControl } from '@alfalab/core-components-form-control';
import { FormControlMobile } from '@alfalab/core-components-form-control/mobile';
import { FormControlDesktop } from '@alfalab/core-components-form-control/desktop';

const meta: Meta<typeof FormControl> = {
    title: 'Components/FormControl',
    component: FormControl,
    id: 'FormControl',
};

type Story = StoryObj<typeof FormControl>;

export const form_control: Story = {
    name: 'FormControl',
    render: () => {
        const colors = select('colors', ['default', 'inverted'], 'default');
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
                <FormControl
                    block={boolean('block', true)}
                    size={select('size', [48, 56, 64, 72], 48)}
                    colors={colors}
                    disabled={boolean('disabled', false)}
                    filled={boolean('filled', false)}
                    focused={boolean('focused', false)}
                    label={text('label', '')}
                    labelView={select('labelView', ['inner', 'outer'], 'inner')}
                    hint={text('hint', '')}
                    error={text('error', '')}
                    rightAddons={boolean('rightAddons', false) && <StarMIcon />}
                    leftAddons={boolean('leftAddons', false) && <StarMIcon />}
                    bottomAddons={boolean('bottomAddons', false) && <span>bottom text</span>}
                />
            </div>
        );
    },
};

export const form_control_mobile: Story = {
    name: 'FormControlMobile',
    render: () => {
        const colors = select('colors', ['default', 'inverted'], 'default');
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
                <FormControlMobile
                    block={boolean('block', true)}
                    size={select('size', [48, 56, 64, 72], 48)}
                    colors={colors}
                    disabled={boolean('disabled', false)}
                    filled={boolean('filled', false)}
                    focused={boolean('focused', false)}
                    label={text('label', '')}
                    labelView={select('labelView', ['inner', 'outer'], 'inner')}
                    hint={text('hint', '')}
                    error={text('error', '')}
                    rightAddons={boolean('rightAddons', false) && <StarMIcon />}
                    leftAddons={boolean('leftAddons', false) && <StarMIcon />}
                    bottomAddons={boolean('bottomAddons', false) && <span>bottom text</span>}
                />
            </div>
        );
    },
};

export const form_control_desktop: Story = {
    name: 'FormControlDesktop',
    render: () => {
        const colors = select('colors', ['default', 'inverted'], 'default');
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
                <FormControlDesktop
                    block={boolean('block', true)}
                    size={select('size', [48, 56, 64, 72], 48)}
                    colors={colors}
                    disabled={boolean('disabled', false)}
                    filled={boolean('filled', false)}
                    focused={boolean('focused', false)}
                    label={text('label', '')}
                    labelView={select('labelView', ['inner', 'outer'], 'inner')}
                    hint={text('hint', '')}
                    error={text('error', '')}
                    rightAddons={boolean('rightAddons', false) && <StarMIcon />}
                    leftAddons={boolean('leftAddons', false) && <StarMIcon />}
                    bottomAddons={boolean('bottomAddons', false) && <span>bottom text</span>}
                />
            </div>
        );
    },
};

export default meta;

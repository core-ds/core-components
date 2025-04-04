import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { text, select, boolean } from '@storybook/addon-knobs';

import { StarMIcon } from '@alfalab/icons-glyph/StarMIcon';
import { StarSIcon } from '@alfalab/icons-glyph/StarSIcon';
import { Button } from '@balafla/core-components-button';
import { ButtonMobile } from '@balafla/core-components-button/mobile';
import { ButtonDesktop } from '@balafla/core-components-button/desktop';

const meta: Meta<typeof Button> = {
    title: 'Components/Button',
    component: Button,
    id: 'Button',
};

type Story = StoryObj<typeof Button>;

const VIEWS = ['accent', 'primary', 'secondary', 'outlined', 'transparent', 'text'] as const;
const SIZES = [32, 40, 48, 56, 64, 72] as const;

export const button: Story = {
    name: 'Button',
    render: () => {
        const colors = select('colors', ['default', 'inverted'], 'default');
        const size = select('size', SIZES, 56);
        const addons = [32, 40].includes(size) ? <StarSIcon /> : <StarMIcon />;
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
                <Button
                    view={select('view', VIEWS, 'primary')}
                    colors={colors}
                    size={size}
                    href={text('href', '')}
                    loading={boolean('loading', false)}
                    disabled={boolean('disabled', false)}
                    block={boolean('block', false)}
                    nowrap={boolean('nowrap', false)}
                    leftAddons={boolean('leftAddons', false) && addons}
                    rightAddons={boolean('rightAddons', false) && addons}
                >
                    {text('label', 'Оплатить')}
                </Button>
            </div>
        );
    },
};

export const button_mobile: Story = {
    name: 'ButtonMobile',
    render: () => {
        const colors = select('colors', ['default', 'inverted'], 'default');
        const size = select('size', SIZES, 56);
        const addons = [32, 40].includes(size) ? <StarSIcon /> : <StarMIcon />;
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
                <ButtonMobile
                    view={select('view', VIEWS, 'primary')}
                    colors={colors}
                    size={size}
                    href={text('href', '')}
                    loading={boolean('loading', false)}
                    disabled={boolean('disabled', false)}
                    block={boolean('block', false)}
                    nowrap={boolean('nowrap', false)}
                    leftAddons={boolean('leftAddons', false) && addons}
                    rightAddons={boolean('rightAddons', false) && addons}
                >
                    {text('label', 'Оплатить')}
                </ButtonMobile>
            </div>
        );
    },
};

export const button_desktop: Story = {
    name: 'ButtonDesktop',
    render: () => {
        const colors = select('colors', ['default', 'inverted'], 'default');
        const size = select('size', SIZES, 56);
        const addons = [32, 40].includes(size) ? <StarSIcon /> : <StarMIcon />;
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
                <ButtonDesktop
                    view={select('view', VIEWS, 'primary')}
                    colors={colors}
                    size={size}
                    href={text('href', '')}
                    loading={boolean('loading', false)}
                    disabled={boolean('disabled', false)}
                    block={boolean('block', false)}
                    nowrap={boolean('nowrap', false)}
                    leftAddons={boolean('leftAddons', false) && addons}
                    rightAddons={boolean('rightAddons', false) && addons}
                >
                    {text('label', 'Оплатить')}
                </ButtonDesktop>
            </div>
        );
    },
};

export default meta;

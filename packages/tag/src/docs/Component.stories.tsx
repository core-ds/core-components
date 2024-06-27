import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { text, select, boolean } from '@storybook/addon-knobs';

import { CopyMIcon } from '@alfalab/icons-glyph/CopyMIcon';
import { Tag } from '@alfalab/core-components-tag';
import { TagDesktop } from '@alfalab/core-components-tag/desktop';
import { TagMobile } from '@alfalab/core-components-tag/mobile';

const meta: Meta<typeof Tag> = {
    title: 'Components/Tag',
    component: Tag,
    id: 'Tag',
};

type Story = StoryObj<typeof Tag>;

const SIZES = ['xxs', 'xs', 's', 'm', 'l', 'xl'] as const;

export const tag: Story = {
    name: 'Tag',
    render: () => {
        const [checked, setChecked] = React.useState(false);
        const handleClick = () => setChecked(!checked);
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
                <Tag
                    size={select('size', SIZES, 'm')}
                    variant={select('variant', ['default', 'alt'], 'default')}
                    shape={select('shape', ['rounded', 'rectangular'], 'rounded')}
                    view={select('view', ['outlined', 'filled'], 'outlined')}
                    disabled={boolean('disabled', false)}
                    checked={checked || boolean('checked', false)}
                    rightAddons={boolean('rightAddons', false) && <CopyMIcon />}
                    onClick={handleClick}
                    colors={colors}
                >
                    {text('label', 'Оплатить')}
                </Tag>
            </div>
        );
    },
};

export const tag_mobile: Story = {
    name: 'TagMobile',
    render: () => {
        const [checked, setChecked] = React.useState(false);
        const handleClick = () => setChecked(!checked);
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
                <TagMobile
                    size={select('size', SIZES, 'm')}
                    variant={select('variant', ['default', 'alt'], 'default')}
                    shape={select('shape', ['rounded', 'rectangular'], 'rounded')}
                    view={select('view', ['outlined', 'filled'], 'outlined')}
                    disabled={boolean('disabled', false)}
                    checked={checked || boolean('checked', false)}
                    rightAddons={boolean('rightAddons', false) && <CopyMIcon />}
                    onClick={handleClick}
                    colors={colors}
                >
                    {text('label', 'Оплатить')}
                </TagMobile>
            </div>
        );
    },
};

export const tag_desktop: Story = {
    name: 'TagDesktop',
    render: () => {
        const [checked, setChecked] = React.useState(false);
        const handleClick = () => setChecked(!checked);
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
                <TagDesktop
                    size={select('size', SIZES, 'm')}
                    variant={select('variant', ['default', 'alt'], 'default')}
                    shape={select('shape', ['rounded', 'rectangular'], 'rounded')}
                    view={select('view', ['outlined', 'filled'], 'outlined')}
                    disabled={boolean('disabled', false)}
                    checked={checked || boolean('checked', false)}
                    rightAddons={boolean('rightAddons', false) && <CopyMIcon />}
                    onClick={handleClick}
                    colors={colors}
                >
                    {text('label', 'Оплатить')}
                </TagDesktop>
            </div>
        );
    },
};

export default meta;

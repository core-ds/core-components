import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { text, select, boolean } from '@storybook/addon-knobs';

import { CopyMIcon } from '@alfalab/icons-glyph/CopyMIcon';
import { SlidersSIcon } from '@alfalab/icons-glyph/SlidersSIcon';
import { Tag } from '@alfalab/core-components-tag';
import { TagDesktop } from '@alfalab/core-components-tag/desktop';
import { TagMobile } from '@alfalab/core-components-tag/mobile';

import { IndicatorTag } from '../components/indicator-tag';

const meta: Meta<typeof Tag> = {
    title: 'Components/Tag',
    component: Tag,
    id: 'Tag',
};

type Story = StoryObj<typeof Tag>;

const SIZES = [32, 40, 48, 56, 64, 72] as const;
const MOBILE_INDICATOR_SIZES = [32, 40, 48] as const;
const INDICATOR_MODE_OPTIONS = ['dot', 'count'] as const;

const storyWrapperStyle = (colors: 'default' | 'inverted'): React.CSSProperties => ({
    backgroundColor:
        colors === 'inverted' ? 'var(--color-light-base-bg-primary-inverted)' : 'transparent',
    padding: '8px',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
});

const indicatorStoryWrapperStyle = (colors: 'default' | 'inverted'): React.CSSProperties => ({
    backgroundColor:
        colors === 'inverted'
            ? 'var(--color-light-base-bg-primary-inverted)'
            : 'var(--color-light-base-bg-secondary)',
    padding: '8px',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
});

const getIndicatorPropsFromKnobs = () => {
    const mode = select('indicatorMode', INDICATOR_MODE_OPTIONS, 'dot');

    return mode === 'count' ? { mode: 'count' as const, value: 7 } : { mode: 'dot' as const };
};

export const tag: Story = {
    name: 'Tag',
    render: () => {
        const [checked, setChecked] = React.useState(false);
        const handleClick = () => setChecked(!checked);
        const colors = select('colors', ['default', 'inverted'], 'default');

        return (
            <div style={storyWrapperStyle(colors)}>
                <Tag
                    size={select('size', SIZES, 56)}
                    variant={select('variant', ['default', 'alt'], 'default')}
                    shape={select('shape', ['rounded', 'rectangular'], 'rounded')}
                    view={select(
                        'view',
                        ['outlined', 'filled', 'transparent', 'muted'],
                        'outlined',
                    )}
                    disabled={boolean('disabled', false)}
                    checked={checked || boolean('checked', false)}
                    showClear={boolean('showClear', false)}
                    onClear={() => setChecked(false)}
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
            <div style={storyWrapperStyle(colors)}>
                <TagMobile
                    size={select('size', SIZES, 56)}
                    variant={select('variant', ['default', 'alt'], 'default')}
                    shape={select('shape', ['rounded', 'rectangular'], 'rounded')}
                    view={select(
                        'view',
                        ['outlined', 'filled', 'transparent', 'muted'],
                        'outlined',
                    )}
                    disabled={boolean('disabled', false)}
                    checked={checked || boolean('checked', false)}
                    showClear={boolean('showClear', false)}
                    onClear={() => setChecked(false)}
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
            <div style={storyWrapperStyle(colors)}>
                <TagDesktop
                    size={select('size', SIZES, 56)}
                    variant={select('variant', ['default', 'alt'], 'default')}
                    shape={select('shape', ['rounded', 'rectangular'], 'rounded')}
                    view={select(
                        'view',
                        ['outlined', 'filled', 'transparent', 'muted'],
                        'outlined',
                    )}
                    disabled={boolean('disabled', false)}
                    checked={checked || boolean('checked', false)}
                    showClear={boolean('showClear', false)}
                    onClear={() => setChecked(false)}
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

export const tag_mobile_indicator: Story = {
    name: 'IndicatorTagMobile',
    render: () => {
        const colors = select('colors', ['default', 'inverted'], 'default');
        const indicatorProps = getIndicatorPropsFromKnobs();

        return (
            <div style={indicatorStoryWrapperStyle(colors)}>
                <TagMobile
                    key={indicatorProps.mode}
                    Component={IndicatorTag}
                    leftAddons={<SlidersSIcon height={16} width={16} />}
                    size={select('size', MOBILE_INDICATOR_SIZES, 40)}
                    shape={select('shape', ['rounded', 'rectangular'], 'rectangular')}
                    view={select('view', ['filled', 'muted'], 'filled')}
                    colors={colors}
                    checked={boolean('checked', false)}
                    indicatorProps={indicatorProps}
                    dataTestId={text('dataTestId', 'indicator-mobile-default')}
                />
            </div>
        );
    },
};

export const tag_desktop_indicator: Story = {
    name: 'IndicatorTagDesktop',
    render: () => {
        const colors = select('colors', ['default', 'inverted'], 'default');
        const indicatorProps = getIndicatorPropsFromKnobs();

        return (
            <div style={indicatorStoryWrapperStyle(colors)}>
                <TagDesktop
                    key={indicatorProps.mode}
                    Component={IndicatorTag}
                    leftAddons={<SlidersSIcon height={16} width={16} />}
                    size={select('size', MOBILE_INDICATOR_SIZES, 40)}
                    shape={select('shape', ['rounded', 'rectangular'], 'rectangular')}
                    view={select('view', ['filled', 'muted'], 'filled')}
                    colors={colors}
                    checked={boolean('checked', false)}
                    indicatorProps={indicatorProps}
                    dataTestId={text('dataTestId', 'indicator-desktop-default')}
                />
            </div>
        );
    },
};

export default meta;

import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { select } from '@storybook/addon-knobs';
import { Gap } from '@alfalab/core-components-gap';
import { CardImage } from '@alfalab/core-components-card-image';
import {
    stylesStringToObj,
    getQueryParam,
} from '@alfalab/core-components-screenshot-utils/screenshots-story/utils';

const SIZES = [
    '3xs',
    '2xs',
    'xs',
    's',
    'm',
    'l',
    'xl',
    '2xl',
    '3xl',
    '4xl',
    '5xl',
    '6xl',
    '7xl',
    '8xl',
    0,
    1,
    2,
    4,
    8,
    12,
    16,
    20,
    24,
    32,
    40,
    48,
    64,
    72,
    96,
    128,
    256,
];

const meta: Meta<typeof Gap> = {
    title: 'Components/Gap',
    component: Gap,
    id: 'Gap',
};

type Story = StoryObj<typeof Gap>;

export const gap: Story = {
    name: 'Gap',
    render: () => {
        const direction = select('direction', ['vertical', 'horizontal'], 'vertical');
        const stylesAddon = {
            width: '80px',
            height: '80px',
            borderRadius: '8px',
            backgroundColor: 'var(--color-light-neutral-translucent-200)',
        };
        const stylesGap = {
            display: 'flex',
            justifyContent: 'center',
            width: '28px',
            lineHeight: '24px',
            margin: '0 8px',
            borderRadius: '4px',
            backgroundColor: 'var(--color-light-status-negative)',
            color: 'var(--color-light-text-primary-inverted)',
        };
        const stylesWrapper = {
            display: 'flex',
            alignItems: 'center',
        };
        const previewStyles = stylesStringToObj(getQueryParam('wrapperStyles'));
        const isPreview = Object.keys(previewStyles).length > 0;
        return isPreview ? (
            <div style={previewStyles}>
                <div style={stylesWrapper}>
                    {[1, 2, 3].map((item) => (
                        <>
                            <div style={stylesAddon} />
                            {item !== 3 && <div style={stylesGap}>24</div>}
                        </>
                    ))}
                </div>
            </div>
        ) : (
            <div
                style={{
                    display: 'flex',
                    flexDirection: direction === 'vertical' ? 'column' : 'row',
                }}
            >
                <CardImage cardId='EG' />
                <Gap direction={direction} size={select('size', SIZES, 12)} />
                <CardImage cardId='EG' />
            </div>
        );
    },
};

export default meta;

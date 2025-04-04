import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { select, boolean, text } from '@storybook/addon-knobs';
import { Input } from '@balafla/core-components-input';
import { Space } from '@balafla/core-components-space';

import {
    stylesStringToObj,
    getQueryParam,
} from '../../../screenshot-utils/screenshots-story/utils';

const DIRECTIONS = ['horizontal', 'vertical'];
const ALIGNES = ['start', 'end', 'center'];
const SIZES = ['s', 'm', 'l', 8, 72];

const meta: Meta<typeof Space> = {
    title: 'Components/Space',
    component: Space,
    id: 'Space',
};

type Story = StoryObj<typeof Space>;

export const space: Story = {
    name: 'Space',
    render: () => {
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
            backgroundColor: 'var(--color-light-status-info)',
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
            <Space
                direction={select('direction', DIRECTIONS, 'horizontal')}
                size={select('size', SIZES, 'm')}
                align={select('align', ALIGNES, 'start')}
                wrap={boolean('wrap', false)}
                divider={text('divider', '')}
                fullWidth={boolean('fullWidth', false)}
                dataTestId={text('dataTestId', 'testIdSpace')}
            >
                <Input placeholder='Над вишней в цвету' />
                <Input placeholder='Спряталась за облака' />
                <Input placeholder='Скромница луна.' />
                <Input placeholder='(с) Мацуо Басе' />
            </Space>
        );
    },
};

export default meta;

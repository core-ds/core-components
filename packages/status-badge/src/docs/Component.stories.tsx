import React from 'react';
import { Story } from '@storybook/addon-docs';
import { Meta, StoryObj } from '@storybook/react';
import { select } from '@storybook/addon-knobs';

import { Gap } from '@alfalab/core-components-gap';
import { StatusBadge, StatusBadgeProps } from '@alfalab/core-components-status-badge';

import {
    stylesStringToObj,
    getQueryParam,
} from '../../../screenshot-utils/screenshots-story/utils';

const meta: Meta<typeof StatusBadge> = {
    title: 'Components/StatusBadge',
    component: StatusBadge,
    id: 'StatusBadge',
};

type Story = StoryObj<typeof StatusBadge>;

const viewOptions: StatusBadgeProps['view'][] = [
    'positive-checkmark',
    'negative-cross',
    'negative-alert',
    'negative-block',
    'attention-alert',
    'neutral-information',
    'neutral-operation',
    'neutral-cross',
];

export const status_badge: Story = {
    name: 'StatusBadge',
    render: () => {
        const previewStyles = stylesStringToObj(getQueryParam('wrapperStyles'));
        const isPreview = Object.keys(previewStyles).length > 0;
        const colors = select('colors', ['default', 'inverted'], 'default');
        return (
            <div
                style={{
                    ...(colors === 'inverted'
                        ? { backgroundColor: 'var(--color-light-base-bg-primary-inverted)' }
                        : previewStyles),
                }}
            >
                {isPreview ? (
                    <>
                        <StatusBadge view='positive-checkmark' />
                        <Gap size='xs' direction='horizontal' />
                        <StatusBadge view='attention-alert' />
                        <Gap size='xs' direction='horizontal' />
                        <StatusBadge view='negative-cross' />
                    </>
                ) : (
                    <StatusBadge
                        view={select('view', viewOptions, 'positive-checkmark')}
                        size={select('size', [16, 20, 24, 32, 40], 24)}
                        colors={colors}
                    />
                )}
            </div>
        );
    },
};

export default meta;

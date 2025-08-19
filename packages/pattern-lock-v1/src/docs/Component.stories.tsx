import React from 'react';
import { Story } from '@storybook/addon-docs';
import { radios, text, boolean } from '@storybook/addon-knobs';
import { Meta, StoryObj } from '@storybook/react';
import { PatternLockV1 } from '@alfalab/core-components-pattern-lock-v1';
import {
    stylesStringToObj,
    getQueryParam,
} from '@alfalab/core-components-screenshot-utils/screenshots-story/utils';

const meta: Meta<typeof PatternLockV1> = {
    title: 'Deprecated components/PatternLockV1',
    component: PatternLockV1,
    id: 'PatternLockV1',
};

type Story = StoryObj<typeof PatternLockV1>;

export const pattern_lock_v1: Story = {
    name: 'PatternLockV1',
    render: () => {
        const previewStyles = stylesStringToObj(getQueryParam('wrapperStyles'));
        const isPreview = Object.keys(previewStyles).length > 0;
        return (
            <div style={previewStyles}>
                {isPreview && (
                    <style>
                        {`
                    :root {
                        --color-light-bg-primary: var(--color-light-base-bg-secondary);
                    }`}
                    </style>
                )}
                <PatternLockV1
                    observeTokens={true}
                    themeState={radios(
                        'themeState',
                        { initial: 'initial', success: 'success', failure: 'failure' },
                        'initial',
                    )}
                    justifyNodes={radios(
                        'justifyNodes',
                        { 'space-around': 'space-around', 'space-between': 'space-between' },
                        'space-between',
                    )}
                    message={text('message', '')}
                    error={text('error', '')}
                    showForgotCodeBtn={boolean('showForgotCodeBtn', false) as false}
                />
            </div>
        );
    },
};

export default meta;

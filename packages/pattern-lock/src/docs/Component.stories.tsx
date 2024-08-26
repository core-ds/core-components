import React from 'react';
import { Story } from '@storybook/addon-docs';
import { radios, boolean } from '@storybook/addon-knobs';
import { Meta, StoryObj } from '@storybook/react';
import { PatternLock } from '@alfalab/core-components-pattern-lock';
import {
    stylesStringToObj,
    getQueryParam,
} from '../../../screenshot-utils/screenshots-story/utils';

const meta: Meta<typeof PatternLock> = {
    title: 'Components/PatternLock',
    component: PatternLock,
    id: 'PatternLock',
};

type Story = StoryObj<typeof PatternLock>;

export const pattern_lock: Story = {
    name: 'PatternLock',
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
                <PatternLock
                    observeTokens={true}
                    themeState={radios(
                        'themeState',
                        { initial: 'initial', success: 'success', failure: 'failure' },
                        'initial',
                    )}
                    showForgotCodeBtn={boolean('showForgotCodeBtn', false) as false}
                    disabled={boolean('disabled', false)}
                />
            </div>
        );
    },
};

export default meta;

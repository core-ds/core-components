import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { select, text, boolean } from '@storybook/addon-knobs';
import { NavigationBar } from '@alfalab/core-components-navigation-bar';
import {
    stylesStringToObj,
    getQueryParam,
} from '../../../screenshot-utils/screenshots-story/utils';

const meta: Meta<typeof NavigationBar> = {
    title: 'Components/NavigationBar',
    component: NavigationBar,
    id: 'NavigationBar',
};

type Story = StoryObj<typeof NavigationBar>;

export const navigation_bar: Story = {
    name: 'NavigationBar',
    render: () => {
        const align = select('align', ['left', 'center'], 'center');
        const backgroundColor = text('backgroundColor', '#3778FB1A');

        const wrapperStyles = {
            width: 360,
        };

        const commonStyles: React.CSSProperties = {
            backgroundColor: 'var(--color-light-status-muted-alt-info)',
            border: '1px dashed var(--color-light-status-info)',
            boxSizing: 'border-box',
            borderRadius: '8px',
            height: '40px',
        };

        const addonsStyles = {
            ...commonStyles,
            width: '48px',
        };

        const bottomAddonsStyles = {
            ...commonStyles,
            width: '100%',
        };
        const previewStyles = stylesStringToObj(getQueryParam('wrapperStyles'));
        return (
            <div style={previewStyles}>
                <div style={wrapperStyles}>
                    <NavigationBar
                        leftAddons={boolean('leftAddons', true) && <div style={addonsStyles} />}
                        rightAddons={boolean('rightAddons', true) && <div style={addonsStyles} />}
                        bottomAddons={
                            boolean('bottomAddons', true) && <div style={bottomAddonsStyles} />
                        }
                        backgroundColor={backgroundColor}
                        align={align}
                        border={boolean('border', false)}
                    >
                        {boolean('children', true) && <div style={commonStyles} />}
                    </NavigationBar>
                </div>
            </div>
        );
    },
};

export default meta;

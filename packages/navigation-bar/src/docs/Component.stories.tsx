import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { select, text, boolean } from '@storybook/addon-knobs';
import { NavigationBar } from '@alfalab/core-components-navigation-bar';
import { ActionIconAddon } from '@alfalab/core-components-navigation-bar/shared';
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
        const backgroundColor = text('backgroundColor', '');

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

        const bottomAddonsStyles = {
            ...commonStyles,
            width: '100%',
        };
        const previewStyles = stylesStringToObj(getQueryParam('wrapperStyles'));
        const leftAddons = select('leftAddons', ['back', 'floatingBack', 'none'], 'none');
        const rightAddons = select('rightAddons', ['close', 'none'], 'none');
        const title = text('title', '');

        return (
            <div style={previewStyles}>
                <div style={wrapperStyles}>
                    <NavigationBar
                        leftAddons={
                            leftAddons === 'none' ? null : <ActionIconAddon action={leftAddons} />
                        }
                        rightAddons={
                            rightAddons === 'none' ? null : <ActionIconAddon action={rightAddons} />
                        }
                        bottomAddons={
                            boolean('bottomAddons', false) && <div style={bottomAddonsStyles} />
                        }
                        backgroundColor={backgroundColor === '' ? undefined : backgroundColor}
                        align={align}
                        title={title === '' ? undefined : title}
                        border={boolean('border', false)}
                    >
                        {boolean('children', false) && <div style={commonStyles} />}
                    </NavigationBar>
                </div>
            </div>
        );
    },
};

export default meta;

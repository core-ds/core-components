import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { boolean, select, text } from '@storybook/addon-knobs';
import { StarLineMIcon } from '@alfalab/icons-glyph/StarLineMIcon';
import { DiamondsMIcon } from '@alfalab/icons-glyph/DiamondsMIcon';
import { ActionButton } from '@alfalab/core-components-action-button';

import {
    getQueryParam,
    stylesStringToObj,
} from '@alfalab/core-components-screenshot-utils/screenshots-story/utils';

const meta: Meta<typeof ActionButton> = {
    title: 'Components/ActionButton',
    component: ActionButton,
    id: 'ActionButton',
};

type Story = StoryObj<typeof ActionButton>;

export const action_button: Story = {
    name: 'ActionButton',
    render: () => {
        const iconsMap = {
            StarLineMIcon: StarLineMIcon,
            DiamondsMIcon: DiamondsMIcon,
        };
        const colors = select('colors', ['default', 'inverted', 'static'], 'default');
        const icon = select('icon', ['StarLineMIcon', 'DiamondsMIcon'], 'StarLineMIcon');
        const Icon = iconsMap[icon];
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
                    ...stylesStringToObj(getQueryParam('wrapperStyles')),
                }}
            >
                <ActionButton
                    colors={colors}
                    view={select('view', ['primary', 'secondary'], 'primary')}
                    href={text('href', '')}
                    icon={<Icon />}
                    size={select('size', [48], 48)}
                    disabled={boolean('disabled', false)}
                    loading={boolean('loading', false)}
                >
                    {text('children', 'Пополнить карту')}
                </ActionButton>
            </div>
        );
    },
};

export default meta;

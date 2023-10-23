import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { select, boolean } from '@storybook/addon-knobs';
import { StarMIcon } from '@alfalab/icons-glyph/StarMIcon';
import { DiamondsMIcon } from '@alfalab/icons-glyph/DiamondsMIcon';
import { IconButton } from '@alfalab/core-components-icon-button';
import {
    getQueryParam,
    stylesStringToObj,
} from '../../../screenshot-utils/screenshots-story/utils';

const meta: Meta<typeof IconButton> = {
    title: 'Components/IconButton',
    component: IconButton,
    id: 'IconButton',
};

type Story = StoryObj<typeof IconButton>;

export const icon_button: Story = {
    name: 'IconButton',
    render: () => {
        const iconsMap = {
            StarMIcon: StarMIcon,
            DiamondsMIcon: DiamondsMIcon,
        };
        const colors = select('colors', ['default', 'inverted'], 'default');
        const icon = select('icon', ['StarMIcon', 'DiamondsMIcon'], 'StarMIcon');
        const Icon = iconsMap[icon];
        return (
            <div
                style={{
                    backgroundColor:
                        colors === 'inverted'
                            ? 'var(--color-light-bg-primary-inverted)'
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
                <IconButton
                    size={select('size', ['xxs', 'xs', 's'], 's')}
                    view={select(
                        'view',
                        ['primary', 'secondary', 'tertiary', 'negative', 'transparent'],
                        'primary',
                    )}
                    icon={Icon}
                    colors={colors}
                    disabled={boolean('disabled', false)}
                    loading={boolean('loading', false)}
                />
            </div>
        );
    },
};

export default meta;

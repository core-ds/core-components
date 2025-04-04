import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { text, select, boolean } from '@storybook/addon-knobs';
import { StarMIcon } from '@alfalab/icons-glyph/StarMIcon';
import { Typography } from '@balafla/core-components-typography';
import { Link } from '@balafla/core-components-link';

const meta: Meta<typeof Link> = {
    title: 'Components/Link',
    component: Link,
    id: 'Link',
};

type Story = StoryObj<typeof Link>;

const VIEWS = ['primary', 'secondary', 'default'];

export const link: Story = {
    name: 'Link',
    render: () => {
        const colors = select('colors', ['default', 'inverted'], 'default');
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
                }}
            >
                <Typography.Text view='primary-medium'>
                    <Link
                        view={select('view', VIEWS, 'primary')}
                        pseudo={boolean('pseudo', false)}
                        underline={boolean('underline', true)}
                        href={text('href', '')}
                        leftAddons={boolean('leftAddons', false) && <StarMIcon />}
                        rightAddons={boolean('rightAddons', false) && <StarMIcon />}
                        colors={colors}
                    >
                        {text('text', 'Вернуться в интернет-банк')}
                    </Link>
                </Typography.Text>
            </div>
        );
    },
};

export default meta;

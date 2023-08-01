import React from 'react';
import type { StoryObj, Meta } from '@storybook/react';
import { Story } from '@storybook/addon-docs';
import { number, radios, text } from '@storybook/addon-knobs';

import { Markdown } from '@alfalab/core-components-markdown';

const meta: Meta<typeof Markdown> = {
    title: 'Components/Markdown',
    component: Markdown,
    id: 'Markdown',
};

type Story = StoryObj<typeof Markdown>;

export const markdown: Story = {
    name: 'Markdown',
    render: () => {
        const paddings = {
            paddingTop: number('paddingTop', null),
            paddingBottom: number('paddingBottom', null),
            paddingLeft: number('paddingLeft', null),
            paddingRight: number('paddingRight', null),
        };
        return (
            <Markdown
                paddings={paddings}
                font={radios('font', ['system', 'styrene'], 'system')}
                platform={radios('platform', ['desktop', 'mobile'], 'desktop')}
            >
                {text(
                    'children',
                    `
# h1

## h2

hello

1. 123

2. 333
   `,
                )}
            </Markdown>
        );
    },
};

export default meta;

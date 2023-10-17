import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { text, boolean } from '@storybook/addon-knobs';
import { ListHeader } from '@alfalab/core-components-list-header';

const meta: Meta<typeof ListHeader> = {
    title: 'Components/ListHeader',
    component: ListHeader,
    id: 'ListHeader',
};

type Story = StoryObj<typeof ListHeader>;

export const list_header: Story = {
    name: 'ListHeader',
    render: () => (
        <ListHeader
            title={text('title', 'Заголовок')}
            description={text('description', 'Описание')}
            filled={boolean('filled', true)}
        />
    ),
};

export default meta;

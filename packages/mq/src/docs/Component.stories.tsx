import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '@alfalab/core-components-button';
import { Space } from '@alfalab/core-components-space';
import { Typography } from '@alfalab/core-components-typography';
import { Mq } from '@alfalab/core-components-mq';

const meta: Meta<typeof Mq> = {
    title: 'Components/Mq',
    component: Mq,
    id: 'Mq',
};

type Story = StoryObj<typeof Mq>;

export const mq: Story = {
    name: 'Mq',
    render: () => (
        <Space>
            <Typography.Title view='small'>Сожми экран</Typography.Title>
            <Mq query='--mobile'>
                <Button>Mobile кнопка</Button>
            </Mq>
            <Mq query='--tablet-s'>
                <Button>Desktop кнопка</Button>
            </Mq>
        </Space>
    ),
};

export default meta;

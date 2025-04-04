import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { select, text, boolean } from '@storybook/addon-knobs';
import { Button } from '@balafla/core-components-button';
import { Alert } from '@balafla/core-components-alert';

const meta: Meta<typeof Alert> = {
    title: 'Deprecated components/Alert',
    component: Alert,
    id: 'Alert',
};

type Story = StoryObj<typeof Alert>;

export const alert: Story = {
    name: 'Alert',
    render: () => (
        <Alert
            view={select('view', ['common', 'negative', 'positive', 'attention'], 'common')}
            title={text('title', '')}
            hasCloser={boolean('hasCloser', false)}
            buttons={
                boolean('buttons', false)
                    ? [<Button>Хорошо</Button>, <Button>Подробнее</Button>]
                    : null
            }
        >
            {text('children', 'Вам одобрено. Согласитесь на предложение')}
        </Alert>
    ),
};

export default meta;

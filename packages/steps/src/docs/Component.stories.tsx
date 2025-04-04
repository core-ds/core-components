import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { number, boolean, select, text } from '@storybook/addon-knobs';
import { Steps } from '@balafla/core-components-steps';

const meta: Meta<typeof Steps> = {
    title: 'Components/Steps',
    component: Steps,
    id: 'Steps',
};

type Story = StoryObj<typeof Steps>;

export const steps: Story = {
    name: 'Steps',
    render: () => (
        <Steps
            activeStep={number('activeStep', 1)}
            defaultActiveStep={number('defaultActiveStep', 2)}
            isVerticalAlign={boolean('isVerticalAlign', false)}
            ordered={boolean('ordered', false)}
            interactive={boolean('interactive', true)}
            minSpaceBetweenSteps={select('minSpaceBetweenSteps', [16, 24, 32], 24)}
            completedDashColor={text('completedDashColor', '')}
        >
            <div>Шаг 1</div>
            <div>Шаг 2</div>
            <div>Шаг 3</div>
            <div>Шаг 4</div>
        </Steps>
    ),
};

export default meta;

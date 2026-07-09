import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { number, boolean, select, text } from '@storybook/addon-knobs';
import { Steps } from '@alfalab/core-components-steps';
import { Button } from '@alfalab/core-components-button';
import {
    getQueryParam,
    stylesStringToObj,
} from '@alfalab/core-components-screenshot-utils/screenshots-story/utils';

const meta: Meta<typeof Steps> = {
    title: 'Components/Steps',
    component: Steps,
    id: 'Steps',
};

type Story = StoryObj<typeof Steps>;

export const steps: Story = {
    name: 'Steps',
    render: () => {
        const previewStyles = stylesStringToObj(getQueryParam('wrapperStyles'));

        return (
            <div style={previewStyles}>
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
                </Steps>
            </div>
        );
    },
};

export const steps_vertical: Story = {
    name: 'Steps Vertical',
    render: () => {
        return (
            <Steps
                activeStep={number('activeStep', 2)}
                isVerticalAlign={true}
                fullWidth={boolean('fullWidth', false)}
            >
                <div>Шаг 1</div>
                <div>Шаг 2</div>
                <Button view='primary' size={32} block={true}>
                    Кнопка
                </Button>
                <div>Шаг 4</div>
            </Steps>
        );
    },
};

export default meta;

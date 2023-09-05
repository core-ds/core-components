import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { boolean, number } from '@storybook/addon-knobs';

import { StepperInput } from '@alfalab/core-components-stepper-input';
import { StepperInputDesktop } from '@alfalab/core-components-stepper-input/desktop';
import { StepperInputMobile } from '@alfalab/core-components-stepper-input/mobile';

const meta: Meta<typeof StepperInput> = {
    title: 'Components/StepperInput',
    component: StepperInput,
    id: 'StepperInput',
};

type Story = StoryObj<typeof StepperInput>;

const renderStory = (Component: typeof StepperInput) => {
    const [value, setValue] = React.useState<string>();

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement> | null,
        { valueString }: { valueString: string },
    ) => {
        setValue(valueString);
    };

    return (
        <Component
            value={value}
            onChange={handleChange}
            min={number('min', 0)}
            max={number('max', 10)}
            step={number('step', 1)}
            disableUserInput={boolean('disableUserInput', false)}
        />
    );
};

export const step_input: Story = {
    name: 'StepperInput',
    render: () => renderStory(StepperInput),
};

export const step_input_desktop: Story = {
    name: 'StepperInputDesktop',
    render: () => renderStory(StepperInputDesktop),
};

export const step_input_mobile: Story = {
    name: 'StepperInputMobile',
    render: () => renderStory(StepperInputMobile),
};

export default meta;

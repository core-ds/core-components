import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { text, boolean, number } from '@storybook/addon-knobs';
import { CodeInput } from '@alfalab/core-components-code-input';
import { CodeInputMobile } from '@alfalab/core-components-code-input/mobile';
import { CodeInputDesktop } from '@alfalab/core-components-code-input/desktop';


const meta: Meta<typeof CodeInput> = {
    title: 'Components/CodeInput',
    component: CodeInput,
    id: 'CodeInput',
};

type Story = StoryObj<typeof CodeInput>;

export const code_input: Story = {
    name: 'CodeInput',
    render: () => {
        return (
            <CodeInput
                fields={number('fields', 4)}
                disabled={boolean('disabled', false)}
                error={text('error', '')}
                initialValues='1234'
            />
        );
    },
};

export const code_input_mobile: Story = {
    name: 'CodeInputMobile',
    render: () => {
        return (
            <CodeInputMobile
                fields={number('fields', 4)}
                disabled={boolean('disabled', false)}
                error={text('error', '')}
                initialValues='1234'
            />
        );
    },
};

export const code_input_desktop: Story = {
    name: 'CodeInputDesktop',
    render: () => {
        return (
            <CodeInputDesktop
                fields={number('fields', 4)}
                disabled={boolean('disabled', false)}
                error={text('error', '')}
                initialValues='1234'
            />
        );
    },
};
    
export default meta;


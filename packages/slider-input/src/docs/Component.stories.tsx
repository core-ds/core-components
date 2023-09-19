import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { text, select, boolean, number } from '@storybook/addon-knobs';
import { SliderInput } from '@alfalab/core-components-slider-input';

const meta: Meta<typeof SliderInput> = {
    title: 'Components/SliderInput',
    component: SliderInput,
    id: 'SliderInput',
};

type Story = StoryObj<typeof SliderInput>;

export const slider_input: Story = {
    name: 'SliderInput',
    render: () => {
        const [value, setValue] = React.useState('50');
        const handleChange = (event, { value }) => setValue(value);
        return (
            <SliderInput
                value={value}
                onChange={handleChange}
                min={number('min', 0)}
                max={number('max', 100)}
                step={number('step', 1)}
                pips={
                    boolean('pips', false) && {
                        mode: 'values',
                        values: [0, 50, 100],
                    }
                }
                block={boolean('block', false)}
                size={select('size', ['s', 'm', 'l', 'xl'], 's')}
                disabled={boolean('disabled', false)}
                placeholder={text('placeholder', '')}
                label={text('label', '')}
                hint={text('hint', '')}
                info={text('info', '')}
                error={text('error', '')}
                readOnly={boolean('readOnly', false)}
            />
        );
    },
};

export default meta;

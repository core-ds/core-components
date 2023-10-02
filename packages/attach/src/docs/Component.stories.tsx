import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { text, select, boolean, number } from '@storybook/addon-knobs';
import { Attach } from '@alfalab/core-components-attach';

const meta: Meta<typeof Attach> = {
    title: 'Components/Attach',
    component: Attach,
    id: 'Attach',
};

type Story = StoryObj<typeof Attach>;

export const attach: Story = {
    name: 'Attach',
    render: () => {
        return (
            <Attach
                size={select('size', ['xxs', 'xs', 's', 'm', 'l'], 's')}
                buttonContent={text('buttonContent', undefined)}
                disabled={boolean('disabled', false)}
                maxFilenameLength={number('maxFilenameLength', undefined)}
                multiple={boolean('multiple', false)}
                noFileText={text('noFileText', undefined)}
                progressBarPercent={number('progressBarPercent', undefined)}
            />
        );
    },
};

export default meta;

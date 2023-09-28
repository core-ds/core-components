import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Grid } from '@alfalab/core-components-grid';

const meta: Meta<typeof Grid> = {
    title: 'Components/Grid',
    component: Grid,
    id: 'Grid',
};

type Story = StoryObj<typeof Grid>;

export const grid: Story = {
    name: 'Grid',
    render: () => {
        const style = {
            height: 30,
            background: '#ff5c5c',
        };
        return (
            <Grid.Row gutter={{ mobile: 0, tablet: 16, desktop: 24 }}>
                <Grid.Col>
                    <div style={style} />
                </Grid.Col>
                <Grid.Col>
                    <div style={{ ...style, background: '#f04539' }} />
                </Grid.Col>
                <Grid.Col>
                    <div style={style} />
                </Grid.Col>
            </Grid.Row>
        );
    },
};

export default meta;

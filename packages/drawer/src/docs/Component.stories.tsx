import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { boolean } from '@storybook/addon-knobs';
import { Button } from '@alfalab/core-components-button';
import { Drawer } from '@alfalab/core-components-drawer';

const meta: Meta<typeof Drawer> = {
    title: 'Components/Drawer',
    component: Drawer,
    id: 'Drawer',
};

type Story = StoryObj<typeof Drawer>;

export const drawer: Story = {
    name: 'Drawer',
    render: () => {
        const [open, setOpen] = React.useState(false);
        const handleModalOpen = () => setOpen(!open);
        return (
            <>
                <Button size='xs' onClick={handleModalOpen}>
                    Открыть Drawer
                </Button>
                <Drawer
                    open={open}
                    onClose={handleModalOpen}
                    keepMounted={boolean('keepMounted', false)}
                >
                    <div />
                </Drawer>
            </>
        );
    },
};

export default meta;

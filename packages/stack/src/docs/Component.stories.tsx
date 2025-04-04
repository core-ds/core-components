import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Stack } from '@balafla/core-components-stack';
import { Button } from '@balafla/core-components-button';
import { ModalDesktop } from '@balafla/core-components-modal/desktop';
import { Tooltip } from '@balafla/core-components-tooltip';

const meta: Meta<typeof Stack> = {
    title: 'Components/Stack',
    component: Stack,
    id: 'Stack',
};

type Story = StoryObj<typeof Stack>;

export const stack: Story = {
    name: 'Stack',
    render: () => {
        const [modalOpen, setModalOpen] = React.useState(false);

        return (
            <div>
                <Button
                    onClick={() => {
                        setModalOpen(true);
                    }}
                >
                    Открыть модал
                </Button>

                <ModalDesktop
                    open={modalOpen}
                    onClose={() => {
                        setModalOpen(false);
                    }}
                >
                    <ModalDesktop.Content>
                        <Tooltip content={<div>Tooltip</div>} trigger='click'>
                            <Button block={true}>Открыть тултип</Button>
                        </Tooltip>
                    </ModalDesktop.Content>
                </ModalDesktop>
            </div>
        );
    },
};

export default meta;

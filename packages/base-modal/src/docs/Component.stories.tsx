import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '@balafla/core-components-button';
import { BaseModal } from '@balafla/core-components-base-modal';

const meta: Meta<typeof BaseModal> = {
    title: 'Components/BaseModal',
    component: BaseModal,
    id: 'BaseModal',
};

type Story = StoryObj<typeof BaseModal>;

export const base_modal: Story = {
    name: 'BaseModal',
    render: () => {
        const [open, setOpen] = React.useState(false);
        const handleModalOpen = () => setOpen(!open);
        return (
            <>
                <Button type='button' size='xs' onClick={handleModalOpen}>
                    Открыть
                </Button>
                <BaseModal open={open} onClose={handleModalOpen}>
                    <div style={{ padding: '100px' }}>BaseModal</div>
                </BaseModal>
            </>
        );
    },
};

export default meta;

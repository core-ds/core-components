import React from 'react';
import { BaseModal } from '@alfalab/core-components-base-modal';
import { Button } from '@alfalab/core-components-button';
import { Wrapper } from './Wrapper';

const BaseModalExample = () => {
    const [open, setOpen] = React.useState(false);

    const handleModalOpen = () => setOpen(!open);

    return (
        <Wrapper>
            <Button type='button' size='xs' onClick={handleModalOpen}>
                Открыть
            </Button>

            <BaseModal open={open} onClose={handleModalOpen}>
                <div style={{ padding: '100px' }}>BaseModal</div>
            </BaseModal>
        </Wrapper>
    );
};

export default BaseModalExample;

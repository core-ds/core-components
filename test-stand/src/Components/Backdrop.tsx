import React from 'react';
import { Backdrop } from '@alfalab/core-components-backdrop';
import { Button } from '@alfalab/core-components-button';
import { Wrapper } from './Wrapper';

const BackdropExample = () => {
    const [open, setOpen] = React.useState(false);

    return (
        <Wrapper>
            <div style={{ zIndex: 1, position: 'relative' }}>
                <Button onClick={() => setOpen(!open)} size='xs'>
                    {open ? 'Закрыть' : 'Открыть'}
                </Button>
                <Backdrop open={open} onClick={() => setOpen(false)} />
            </div>
        </Wrapper>
    );
};

export default BackdropExample;

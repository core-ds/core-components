import React from 'react';
import { Button } from '@alfalab/core-components-button';
import { Popover } from '@alfalab/core-components-popover';
import { Wrapper } from './Wrapper';

const PopoverExample = () => {
    const [open, setOpen] = React.useState(false);

    const buttonRef = React.useRef(null);

    const toggle = () => {
        setOpen(!open);
    };

    return (
        <Wrapper>
            <div
                style={{
                    width: '100%',
                    height: '200px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Popover anchorElement={buttonRef.current} open={open} preventFlip={true}>
                    <div style={{ padding: '15px', width: '156px' }}>I am popover</div>
                </Popover>

                <Button ref={buttonRef} size='xs' onClick={toggle}>
                    {open ? 'Скрыть' : 'Показать'} Popover
                </Button>
            </div>
        </Wrapper>
    );
};

export default PopoverExample;

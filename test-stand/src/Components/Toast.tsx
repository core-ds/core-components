import React from 'react';
import { Button } from '@alfalab/core-components-button';
import { Toast } from '@alfalab/core-components-toast';
import { Wrapper } from './Wrapper';

const ToastExample = () => {
    const [anchorToastOpen, setAnchorToastOpen] = React.useState(false);

    const [fixedToastOpen, setFixedToastOpen] = React.useState(false);

    const buttonRef = React.useRef(null);

    return (
        <Wrapper>
            <div
                style={{
                    width: '100%',
                    height: '50vh',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'flex-start',
                    padding: '200px',
                    boxSizing: 'border-box',
                }}
            >
                <Toast
                    open={anchorToastOpen}
                    anchorElement={buttonRef.current}
                    position='left'
                    offset={[0, 8]}
                    badge='positive'
                    title='Скопировано'
                    hasCloser={false}
                    block={false}
                    onClose={() => {
                        setAnchorToastOpen(false);
                    }}
                    autoCloseDelay={1500}
                />
                <Toast
                    open={fixedToastOpen}
                    badge='positive'
                    title='Ваша карта удалена'
                    hasCloser={true}
                    block={true}
                    onClose={() => {
                        setFixedToastOpen(false);
                    }}
                    autoCloseDelay={3000}
                    actionButton={
                        <Button
                            size='s'
                            view='ghost'
                            onClick={() => {
                                setFixedToastOpen(false);
                            }}
                        >
                            Восстановить
                        </Button>
                    }
                    style={{ maxWidth: 'calc(100vw - 150px)' }}
                />
                <Button
                    ref={buttonRef}
                    onClick={() => {
                        setAnchorToastOpen(true);
                    }}
                >
                    Скопировать
                </Button>
                <Button
                    onClick={() => {
                        setFixedToastOpen(true);
                    }}
                    style={{ marginLeft: '20px' }}
                >
                    Удалить
                </Button>
            </div>
        </Wrapper>
    );
};

export default ToastExample;

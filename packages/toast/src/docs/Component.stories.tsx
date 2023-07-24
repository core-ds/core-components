import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { text, select, boolean, number } from '@storybook/addon-knobs';
import { Button } from '@alfalab/core-components-button';
import { Toast } from '@alfalab/core-components-toast';
import { ToastMobile } from '@alfalab/core-components-toast/mobile';
import { ToastDesktop } from '@alfalab/core-components-toast/desktop';

const meta: Meta<typeof Toast> = {
    title: 'Components/Toast',
    component: Toast,
    id: 'Toast',
};

type Story = StoryObj<typeof Toast>;

export const toast: Story = {
    name: 'Toast',
    render: () => {
        const POSITION_OPTIONS = [
            'top',
            'top-start',
            'top-end',
            'bottom',
            'bottom-start',
            'bottom-end',
            'right',
            'right-start',
            'right-end',
            'left',
            'left-start',
            'left-end',
        ];
        const [anchorToastOpen, setAnchorToastOpen] = React.useState(false);
        const [fixedToastOpen, setFixedToastOpen] = React.useState(false);
        const [buttonElement, setButtonElement] = React.useState(null);
        const handleButtonRef = (node) => {
            setButtonElement(node);
        };
        const containerRef = React.useRef();
        const isMobile = document.body.clientWidth < 450;
        return (
            <div
                style={{
                    width: '100vw',
                    height: '100vh',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    boxSizing: 'border-box',
                }}
            >
                <div
                    ref={containerRef}
                    style={{
                        position: 'relative',
                        padding: '100px',
                        border: '1px dashed black',
                    }}
                >
                    <Toast
                        anchorElement={buttonElement}
                        colors={select('colors', ['default', 'inverted'], 'default')}
                        open={anchorToastOpen}
                        position={select('position', POSITION_OPTIONS, 'left')}
                        offset={[number('offset[0]', 0), number('offset[1]', 8)]}
                        badge={select(
                            'badge',
                            ['negative', 'positive', 'attention', undefined],
                            'positive',
                        )}
                        title={text('title', 'Скопировано')}
                        hasCloser={boolean('hasCloser', true)}
                        block={boolean('block', false)}
                        bottomButtonPosition={boolean('bottomButtonPosition', false)}
                        onClose={() => {
                            setAnchorToastOpen(false);
                        }}
                        autoCloseDelay={number('autoCloseDelay', 3000)}
                    />
                    <Toast
                        colors={select('colors', ['default', 'inverted'], 'default')}
                        open={fixedToastOpen}
                        badge={select(
                            'badge',
                            ['negative', 'positive', 'attention', undefined],
                            'positive',
                        )}
                        title='Ваша карта удалена'
                        hasCloser={boolean('hasCloser', true)}
                        bottomButtonPosition={boolean('bottomButtonPosition', false)}
                        onClose={() => {
                            setFixedToastOpen(false);
                        }}
                        autoCloseDelay={number('autoCloseDelay', 3000)}
                        actionButton={
                            <Button
                                size={isMobile ? 'xs' : 's'}
                                view='ghost'
                                colors='inverted'
                                onClick={() => {
                                    setFixedToastOpen(false);
                                }}
                            >
                                Восстановить
                            </Button>
                        }
                        position='bottom-start'
                        offset={[0, 16]}
                        block={true}
                    />
                    <Button
                        ref={handleButtonRef}
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
            </div>
        );
    },
};

export const toast_mobile: Story = {
    name: 'ToastMobile',
    render: () => {
        const POSITION_OPTIONS = [
            'top',
            'top-start',
            'top-end',
            'bottom',
            'bottom-start',
            'bottom-end',
            'right',
            'right-start',
            'right-end',
            'left',
            'left-start',
            'left-end',
        ];
        const [anchorToastOpen, setAnchorToastOpen] = React.useState(false);
        const [fixedToastOpen, setFixedToastOpen] = React.useState(false);
        const [buttonElement, setButtonElement] = React.useState(null);
        const handleButtonRef = (node) => {
            setButtonElement(node);
        };
        const containerRef = React.useRef();
        return (
            <div
                style={{
                    width: '100vw',
                    height: '100vh',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    boxSizing: 'border-box',
                }}
            >
                <div
                    ref={containerRef}
                    style={{
                        position: 'relative',
                        padding: '100px',
                        border: '1px dashed black',
                    }}
                >
                    <ToastMobile
                        anchorElement={buttonElement}
                        colors={select('colors', ['default', 'inverted'], 'default')}
                        open={anchorToastOpen}
                        position={select('position', POSITION_OPTIONS, 'left')}
                        offset={[number('offset[0]', 0), number('offset[1]', 8)]}
                        badge={select(
                            'badge',
                            ['negative', 'positive', 'attention', undefined],
                            'positive',
                        )}
                        title={text('title', 'Скопировано')}
                        hasCloser={boolean('hasCloser', true)}
                        block={boolean('block', false)}
                        bottomButtonPosition={boolean('bottomButtonPosition', false)}
                        onClose={() => {
                            setAnchorToastOpen(false);
                        }}
                        autoCloseDelay={number('autoCloseDelay', 3000)}
                    />
                    <ToastMobile
                        colors={select('colors', ['default', 'inverted'], 'default')}
                        open={fixedToastOpen}
                        badge={select(
                            'badge',
                            ['negative', 'positive', 'attention', undefined],
                            'positive',
                        )}
                        title='Ваша карта удалена'
                        hasCloser={boolean('hasCloser', true)}
                        bottomButtonPosition={boolean('bottomButtonPosition', false)}
                        onClose={() => {
                            setFixedToastOpen(false);
                        }}
                        autoCloseDelay={number('autoCloseDelay', 3000)}
                        actionButton={
                            <Button
                                size='xs'
                                view='ghost'
                                colors='inverted'
                                onClick={() => {
                                    setFixedToastOpen(false);
                                }}
                            >
                                Восстановить
                            </Button>
                        }
                        position='bottom-start'
                        offset={[0, 16]}
                        block={true}
                    />
                    <Button
                        ref={handleButtonRef}
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
            </div>
        );
    },
};

export const toast_desktop: Story = {
    name: 'ToastDesktop',
    render: () => {
        const POSITION_OPTIONS = [
            'top',
            'top-start',
            'top-end',
            'bottom',
            'bottom-start',
            'bottom-end',
            'right',
            'right-start',
            'right-end',
            'left',
            'left-start',
            'left-end',
        ];
        const [anchorToastOpen, setAnchorToastOpen] = React.useState(false);
        const [fixedToastOpen, setFixedToastOpen] = React.useState(false);
        const [buttonElement, setButtonElement] = React.useState(null);
        const handleButtonRef = (node) => {
            setButtonElement(node);
        };
        const containerRef = React.useRef();
        return (
            <div
                style={{
                    width: '100vw',
                    height: '100vh',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    boxSizing: 'border-box',
                }}
            >
                <div
                    ref={containerRef}
                    style={{
                        position: 'relative',
                        padding: '100px',
                        border: '1px dashed black',
                    }}
                >
                    <ToastDesktop
                        anchorElement={buttonElement}
                        colors={select('colors', ['default', 'inverted'], 'default')}
                        open={anchorToastOpen}
                        position={select('position', POSITION_OPTIONS, 'left')}
                        offset={[number('offset[0]', 0), number('offset[1]', 8)]}
                        badge={select(
                            'badge',
                            ['negative', 'positive', 'attention', undefined],
                            'positive',
                        )}
                        title={text('title', 'Скопировано')}
                        hasCloser={boolean('hasCloser', true)}
                        block={boolean('block', false)}
                        onClose={() => {
                            setAnchorToastOpen(false);
                        }}
                        autoCloseDelay={number('autoCloseDelay', 3000)}
                    />
                    <ToastDesktop
                        colors={select('colors', ['default', 'inverted'], 'default')}
                        open={fixedToastOpen}
                        badge={select(
                            'badge',
                            ['negative', 'positive', 'attention', undefined],
                            'positive',
                        )}
                        title='Ваша карта удалена'
                        hasCloser={boolean('hasCloser', true)}
                        onClose={() => {
                            setFixedToastOpen(false);
                        }}
                        autoCloseDelay={number('autoCloseDelay', 3000)}
                        actionButton={
                            <Button
                                size='s'
                                view='ghost'
                                colors='inverted'
                                onClick={() => {
                                    setFixedToastOpen(false);
                                }}
                            >
                                Восстановить
                            </Button>
                        }
                        position='bottom-start'
                        offset={[0, 16]}
                        block={true}
                    />
                    <Button
                        ref={handleButtonRef}
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
            </div>
        );
    },
};

export default meta;

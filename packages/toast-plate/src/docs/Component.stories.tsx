import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { text, select, boolean } from '@storybook/addon-knobs';
import { Button } from '@alfalab/core-components-button';
import { ToastPlate } from '@alfalab/core-components-toast-plate';
import { ToastPlateMobile } from '@alfalab/core-components-toast-plate/mobile';
import { ToastPlateDesktop } from '@alfalab/core-components-toast-plate/desktop';

const meta: Meta<typeof ToastPlate> = {
    title: 'Components/ToastPlate',
    component: ToastPlate,
    id: 'ToastPlate',
};

type Story = StoryObj<typeof ToastPlate>;

export const toast_plate: Story = {
    name: 'ToastPlate',
    render: () => {
        const colors = select('colors', ['default', 'inverted'], 'default');
        const isMobile = document.body.clientWidth < 450;
        return (
            <div
                style={{
                    backgroundColor:
                        colors === 'inverted'
                            ? 'var(--color-light-bg-primary-inverted)'
                            : 'transparent',
                    padding: '10px',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                }}
            >
                <ToastPlate
                    colors={colors}
                    badge={select(
                        'badge',
                        [
                            'positive-checkmark',
                            'negative-cross',
                            'negative-alert',
                            'negative-block',
                            'attention-alert',
                            'neutral-information',
                            'neutral-operation',
                            'neutral-cross',
                            undefined,
                        ],
                        'positive-checkmark',
                    )}
                    title={text('title', 'Toast Title')}
                    hasCloser={boolean('hasCloser', true)}
                    block={boolean('block', false)}
                    onClose={Function.prototype}
                    bottomButtonPosition={boolean('bottomButtonPosition', false)}
                    actionButton={
                        boolean('renderActionButton', false) ? (
                            <Button
                                view='text'
                                colors={colors === 'default' ? 'inverted' : 'default'}
                                size={isMobile ? 'xs' : 's'}
                            >
                                Action Button
                            </Button>
                        ) : null
                    }
                >
                    {text('children', '')}
                </ToastPlate>
            </div>
        );
    },
};

export const toast_plate_mobile: Story = {
    name: 'ToastPlateMobile',
    render: () => {
        const colors = select('colors', ['default', 'inverted'], 'default');
        return (
            <div
                style={{
                    backgroundColor:
                        colors === 'inverted'
                            ? 'var(--color-light-bg-primary-inverted)'
                            : 'transparent',
                    padding: '10px',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                }}
            >
                <ToastPlateMobile
                    colors={colors}
                    badge={select(
                        'badge',
                        [
                            'positive-checkmark',
                            'negative-cross',
                            'negative-alert',
                            'negative-block',
                            'attention-alert',
                            'neutral-information',
                            'neutral-operation',
                            'neutral-cross',
                            undefined,
                        ],
                        'positive-checkmark',
                    )}
                    title={text('title', 'Toast Title')}
                    hasCloser={boolean('hasCloser', true)}
                    block={boolean('block', false)}
                    onClose={Function.prototype}
                    bottomButtonPosition={boolean('bottomButtonPosition', false)}
                    actionButton={
                        boolean('renderActionButton', false) ? (
                            <Button
                                view='text'
                                colors={colors === 'default' ? 'inverted' : 'default'}
                                size='xs'
                            >
                                Action Button
                            </Button>
                        ) : null
                    }
                >
                    {text('children', '')}
                </ToastPlateMobile>
            </div>
        );
    },
};

export const toast_plate_desktop: Story = {
    name: 'ToastPlateDesktop',
    render: () => {
        const colors = select('colors', ['default', 'inverted'], 'default');
        return (
            <div
                style={{
                    backgroundColor:
                        colors === 'inverted'
                            ? 'var(--color-light-bg-primary-inverted)'
                            : 'transparent',
                    padding: '10px',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                }}
            >
                <ToastPlateDesktop
                    colors={colors}
                    badge={select(
                        'badge',
                        [
                            'positive-checkmark',
                            'negative-cross',
                            'negative-alert',
                            'negative-block',
                            'attention-alert',
                            'neutral-information',
                            'neutral-operation',
                            'neutral-cross',
                            undefined,
                        ],
                        'positive-checkmark',
                    )}
                    title={text('title', 'Toast Title')}
                    hasCloser={boolean('hasCloser', true)}
                    block={boolean('block', false)}
                    onClose={Function.prototype}
                    actionButton={
                        boolean('renderActionButton', false) ? (
                            <Button
                                view='text'
                                colors={colors === 'default' ? 'inverted' : 'default'}
                                size='s'
                            >
                                Action Button
                            </Button>
                        ) : null
                    }
                >
                    {text('children', '')}
                </ToastPlateDesktop>
            </div>
        );
    },
};

export default meta;

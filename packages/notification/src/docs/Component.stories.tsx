import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { select, text, boolean, number } from '@storybook/addon-knobs';
import { Button } from '@balafla/core-components-button';
import { Notification } from '@balafla/core-components-notification';

const meta: Meta<typeof Notification> = {
    title: 'Components/Notification',
    component: Notification,
    id: 'Notification',
};

type Story = StoryObj<typeof Notification>;

export const notification: Story = {
    name: 'Notification',
    render: () => {
        const colors = select('colors', ['default', 'inverted'], 'default');
        return (
            <div
                style={{
                    backgroundColor:
                        colors === 'inverted'
                            ? 'var(--color-light-base-bg-primary-inverted)'
                            : 'transparent',
                    padding: '10px',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                }}
            >
                <Notification
                    colors={colors}
                    visible={boolean('visible', false)}
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
                    title={text('title', 'Поздравляем, полный успех')}
                    hasCloser={boolean('hasCloser', true)}
                    actionButton={
                        boolean('renderActionButton', false) ? (
                            <Button view='transparent' size='s' colors='inverted'>
                                Action Button
                            </Button>
                        ) : null
                    }
                    offset={number('offset', 48)}
                    onClose={() => {}}
                >
                    {text('children', 'Вам одобрено. Согласитесь на предложение')}
                </Notification>
            </div>
        );
    },
};

export default meta;

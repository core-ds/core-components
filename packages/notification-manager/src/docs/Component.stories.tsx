import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '@alfalab/core-components-button';
import { Notification } from '@alfalab/core-components-notification';
import { NotificationManager } from '@alfalab/core-components-notification-manager';

const meta: Meta<typeof NotificationManager> = {
    title: 'Components/NotificationManager',
    component: NotificationManager,
    id: 'NotificationManager',
};

type Story = StoryObj<typeof NotificationManager>;

export const notification_manager: Story = {
    name: 'NotificationManager',
    render: () => {
        const [notifications, setNotifications] = React.useState([]);
        const [count, setCount] = React.useState(0);
        const addNotification = () => {
            const newNotification = (
                <Notification
                    badge='positive'
                    title={`Нотификация #${count}`}
                    autoCloseDelay={3000}
                    id={count.toString()}
                    key={count.toString()}
                />
            );
            notifications.unshift(newNotification);
            setNotifications([...notifications]);
            setCount((val) => val + 1);
        };
        const removeNotification = React.useCallback((id) => {
            /**
             * Обратите внимание, что актуальный массив нотификаций
             * нужно брать из аргументов функции обновления состояния.
             */
            setNotifications((actualNotifications) =>
                actualNotifications.filter((notification) => notification.props.id !== id),
            );
        }, []);
        return (
            <div>
                <Button onClick={addNotification}>Добавить нотификацию</Button>
                <NotificationManager
                    notifications={notifications}
                    onRemoveNotification={removeNotification}
                />
            </div>
        );
    },
};

export default meta;

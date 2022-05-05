import React from 'react';
import { Button } from '@alfalab/core-components-button';
import { NotificationManager } from '@alfalab/core-components-notification-manager';
import { Notification } from '@alfalab/core-components-notification';
import { Wrapper } from './Wrapper';

const NotificationManagerExample = () => {
    const [notifications, setNotifications] = React.useState<JSX.Element[]>([]);

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
        setCount(val => val + 1);
    };

    const removeNotification = React.useCallback(id => {
        /**
         * Обратите внимание, что актуальный массив нотификаций
         * нужно брать из аргументов функции обновления состояния.
         */
        setNotifications(actualNotifications =>
            actualNotifications.filter(notification => notification.props.id !== id),
        );
    }, []);

    return (
        <Wrapper>
            <Button onClick={addNotification}>Добавить нотификацию</Button>
            <NotificationManager
                notifications={notifications}
                onRemoveNotification={removeNotification}
            />
        </Wrapper>
    );
};

export default NotificationManagerExample;

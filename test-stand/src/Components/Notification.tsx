import React from 'react';
import { Notification } from '@alfalab/core-components-notification';
import { Button } from '@alfalab/core-components-button';
import { Wrapper } from './Wrapper';

const NotificationExample = () => {
    const [isVisible, setIsVisible] = React.useState(false);

    const toggleVisiblity = React.useCallback(() => setIsVisible(prev => !prev), []);
    const hideNotification = React.useCallback(() => setIsVisible(false), []);

    return (
        <Wrapper>
            <Notification
                badge='positive'
                title='Компонент нотификации'
                visible={isVisible}
                offset={180}
                onClickOutside={hideNotification}
                onClose={hideNotification}
                onCloseTimeout={hideNotification}
            >
                Самая обыкновенная нотификация
            </Notification>
            <Button onClick={toggleVisiblity}>Тогглер</Button>
        </Wrapper>
    );
};

export default NotificationExample;

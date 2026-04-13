import {
    cloneElement,
    type FC,
    type ReactElement,
    type RefObject,
    useCallback,
    useMemo,
} from 'react';
import cn from 'classnames';

import { type NotificationProps as CoreNotificationProps } from '@alfalab/core-components-notification';

export type NotificationElement = ReactElement<CoreNotificationProps & { id: string }>;

type NotificationProps = {
    element: NotificationElement;
    className: string;
    onRemoveNotification: (id: string) => void;
    containerRef: RefObject<HTMLDivElement>;
};

export const Notification: FC<NotificationProps> = ({
    element,
    className,
    onRemoveNotification,
    containerRef,
}) => {
    const { onClose, onCloseTimeout } = element.props;

    const handleClose = useCallback(() => {
        if (onClose) {
            onClose();
        }

        onRemoveNotification(element.props.id);
    }, [onClose, onRemoveNotification, element.props.id]);

    const handleCloseTimeout = useCallback(() => {
        if (onCloseTimeout) {
            onCloseTimeout();
        }

        onRemoveNotification(element.props.id);
    }, [element.props.id, onCloseTimeout, onRemoveNotification]);

    const notificationProps = useMemo<CoreNotificationProps>(
        () => ({
            ...element.props,
            visible: true,
            className: cn(className, element.props.className),
            usePortal: false,
            offset: 0,
            onClose: handleClose,
            onCloseTimeout: handleCloseTimeout,
            containerRef,
        }),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [element, handleClose, handleCloseTimeout, containerRef],
    );

    return cloneElement(element, notificationProps);
};

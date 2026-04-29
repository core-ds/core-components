import React, {
    cloneElement,
    type FC,
    type ReactElement,
    useCallback,
    useMemo,
    useRef,
} from 'react';
import { CSSTransition } from 'react-transition-group';
import { type CSSTransitionProps } from 'react-transition-group/CSSTransition';
import cn from 'classnames';

import { type NotificationProps as CoreNotificationProps } from '@alfalab/core-components-notification';

import styles from './index.module.css';

export type NotificationElement = ReactElement<CoreNotificationProps & { id: string }>;

const TIMEOUT = {
    exit: 0,
    enter: 400,
};

const CSS_TRANSITION_CLASS_NAMES = {
    enter: styles.enter,
    enterActive: styles.enterActive,
};

type NotificationTransitionProps = Partial<
    Pick<CSSTransitionProps<HTMLDivElement>, 'in' | 'onExited' | 'appear' | 'enter' | 'exit'>
>;

interface NotificationProps extends NotificationTransitionProps {
    element: NotificationElement;
    className: string;
    onRemoveNotification: (id: string) => void;
}

export const Notification: FC<NotificationProps> = ({
    in: inProp,
    onExited,
    appear,
    enter,
    exit,
    element,
    className,
    onRemoveNotification,
}) => {
    const nodeRef = useRef<HTMLDivElement>(null);
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
            containerRef: nodeRef,
        }),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [element, handleClose, handleCloseTimeout, className],
    );

    return (
        <CSSTransition<HTMLDivElement>
            in={inProp}
            onExited={onExited}
            appear={appear}
            enter={enter}
            exit={exit}
            timeout={TIMEOUT}
            classNames={CSS_TRANSITION_CLASS_NAMES}
            unmountOnExit={true}
            nodeRef={nodeRef}
        >
            {cloneElement(element, notificationProps)}
        </CSSTransition>
    );
};

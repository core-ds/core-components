import React, { forwardRef, HTMLAttributes } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import cn from 'classnames';

import { Portal, PortalProps } from '@alfalab/core-components-portal';
import { Stack } from '@alfalab/core-components-stack';
import { stackingOrder } from '@alfalab/stack-context';

import { Notification, NotificationElement } from './components';

import styles from './index.module.css';

export type NotificationManagerProps = HTMLAttributes<HTMLDivElement> & {
    /**
     * Массив нотификаций.
     * В нотификации обязательно передавайте id.
     */
    notifications: NotificationElement[];

    /**
     * Дополнительный класс (native prop)
     */
    className?: string;

    /**
     * Идентификатор для систем автоматизированного тестирования
     */
    dataTestId?: string;

    /**
     * z-index компонента
     */
    zIndex?: number;

    /**
     * Отступ от верхнего края
     */
    offset?: number;

    /**
     * Удаление нотификации
     */
    onRemoveNotification: (id: string) => void;

    /**
     * Нода, компонент или функция возвращающая их
     *
     * Контейнер к которому будут добавляться порталы
     */
    container?: PortalProps['getPortalContainer'];
};

const CSS_TRANSITION_CLASS_NAMES = {
    enter: styles.enter,
    enterActive: styles.enterActive,
};

const TIMEOUT = {
    exit: 0,
    enter: 400,
};

export const NotificationManager = forwardRef<HTMLDivElement, NotificationManagerProps>(
    (
        {
            notifications,
            className,
            dataTestId,
            zIndex = stackingOrder.TOAST,
            style = {},
            offset,
            onRemoveNotification,
            container,
            ...restProps
        },
        ref,
    ) => (
        <Stack value={zIndex}>
            {(computedZIndex) => (
                <Portal getPortalContainer={container}>
                    <div
                        className={cn(styles.component, className)}
                        ref={ref}
                        data-test-id={dataTestId}
                        style={{
                            zIndex: computedZIndex,
                            top: offset,
                            ...style,
                        }}
                        {...restProps}
                    >
                        <TransitionGroup>
                            {notifications.map((element, index) => (
                                <CSSTransition
                                    key={element.props.id}
                                    timeout={TIMEOUT}
                                    classNames={CSS_TRANSITION_CLASS_NAMES}
                                    unmountOnExit={true}
                                >
                                    <Notification
                                        element={element}
                                        className={cn(styles.notification, {
                                            [styles.withoutMargin]: offset && index === 0,
                                        })}
                                        onRemoveNotification={onRemoveNotification}
                                    />
                                </CSSTransition>
                            ))}
                        </TransitionGroup>
                    </div>
                </Portal>
            )}
        </Stack>
    ),
);

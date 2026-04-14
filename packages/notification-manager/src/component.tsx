import React, { forwardRef, type HTMLAttributes } from 'react';
import { TransitionGroup } from 'react-transition-group';
import cn from 'classnames';

import { Portal, type PortalProps } from '@alfalab/core-components-portal';
import { Stack } from '@alfalab/core-components-stack';
import { stackingOrder } from '@alfalab/core-components-stack-context';

import { Notification, type NotificationElement } from './components';

import styles from './index.module.css';

export interface NotificationManagerProps extends HTMLAttributes<HTMLDivElement> {
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
}

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
                                <Notification
                                    key={element.props.id}
                                    element={element}
                                    onRemoveNotification={onRemoveNotification}
                                    className={cn(styles.notification, {
                                        [styles.withoutMargin]: offset && index === 0,
                                    })}
                                />
                            ))}
                        </TransitionGroup>
                    </div>
                </Portal>
            )}
        </Stack>
    ),
);

NotificationManager.displayName = 'NotificationManager';

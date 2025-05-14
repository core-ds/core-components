import React, { forwardRef, ReactNode, useEffect, useRef, useState } from 'react';
import { getDataTestId } from '@balafla/core-components-shared';
import cn from 'classnames';

import styles from './index.module.css';

export interface NavigationBarProps {
    /**
     * Заголовок
     */
    title?: string;

    /**
     * Подзаголовок
     */
    subtitle?: string;

    /**
     * Контент шапки
     */
    children?: ReactNode;

    /**
     * Выравнивание заголовка
     * @default center
     */
    align?: 'left' | 'center';

    /**
     * Цвет фона
     */
    backgroundColor?: string;

    /**
     * Наличие бордера
     */
    border?: boolean;

    /**
     * Фиксирует шапку
     */
    sticky?: boolean;

    /**
     * Слот снизу
     */
    bottomAddons?: ReactNode;

    /**
     * Слот слева
     */
    leftAddons?: ReactNode;

    /**
     * Слот справа
     */
    rightAddons?: ReactNode;

    /**
     * Дополнительный класс для контента
     */
    contentClassName?: string;

    /**
     * Дополнительный класс для обертки контента
     */
    contentWrapperClassName?: string;

    /**
     * Дополнительный класс
     */
    className?: string;

    /**
     * Дополнительный класс для правого аддона
     */
    rightAddonsClassName?: string;

    /**
     * Дополнительный класс для левого аддона
     */
    leftAddonsClassName?: string;

    /**
     * Дополнительный класс для нижнего аддона
     */
    bottomAddonsClassName?: string;

    /**
     * Идентификатор для систем автоматизированного тестирования.
     */
    dataTestId?: string;
}

export const NavigationBar = forwardRef<HTMLDivElement, NavigationBarProps>(
    (
        {
            align = 'center',
            rightAddons,
            leftAddons,
            bottomAddons,
            sticky,
            border,
            subtitle,
            title,
            children,
            backgroundColor = 'var(--color-light-base-bg-primary)',
            contentWrapperClassName,
            className,
            contentClassName,
            rightAddonsClassName,
            leftAddonsClassName,
            bottomAddonsClassName,
            dataTestId,
        },
        ref,
    ) => {
        const [titleMargin, setTitleMargin] = useState({ left: 0, right: 0 });
        const leftAddonsRef = useRef<HTMLDivElement>(null);
        const rightAddonsRef = useRef<HTMLDivElement>(null);
        const hasLeftAddons = leftAddons && align !== 'left';

        // добавляет отступ для того чтобы title находился по центру не зависимо от ширины аддонов
        useEffect(() => {
            const leftAddonsWidth = leftAddonsRef.current?.offsetWidth || 0;
            const rightAddonsWidth = rightAddonsRef.current?.offsetWidth || 0;

            const marginSize = Math.abs(rightAddonsWidth - leftAddonsWidth);
            const shouldAddLeftMargin = rightAddonsWidth - leftAddonsWidth > 0;

            setTitleMargin((prev) => {
                const newState = shouldAddLeftMargin
                    ? { left: marginSize, right: 0 }
                    : { left: 0, right: marginSize };

                const isStateChanged = prev.left !== newState.left || prev.right !== newState.right;

                return isStateChanged ? newState : prev;
            });
        }, [hasLeftAddons, leftAddons, rightAddons]);

        // add new info
        return (
            <div
                ref={ref}
                className={cn(
                    styles.component,
                    {
                        [styles.border]: border,
                        [styles.sticky]: sticky,
                    },
                    className,
                )}
                style={{
                    ...(backgroundColor && { backgroundColor }),
                }}
                data-test-id={dataTestId}
            >
                <div className={cn(styles.mainLine, styles[align], contentClassName)}>
                    {hasLeftAddons && (
                        <div className={cn(styles.addons, leftAddonsClassName)} ref={leftAddonsRef}>
                            {leftAddons}
                        </div>
                    )}

                    {children && <div className={styles.children}>{children}</div>}

                    {title && (
                        <div
                            className={cn(styles.content, contentWrapperClassName, {
                                [styles[align]]: !hasLeftAddons,
                            })}
                            style={{
                                ...(align === 'center'
                                    ? {
                                          marginLeft: titleMargin.left,
                                          marginRight: titleMargin.right,
                                      }
                                    : null),
                            }}
                        >
                            <div
                                className={cn(styles.title, {
                                    [styles[align]]: !hasLeftAddons && !subtitle,
                                })}
                                data-test-id={getDataTestId(dataTestId, 'title')}
                            >
                                {title}
                            </div>

                            {subtitle && (
                                <div
                                    className={styles.subtitle}
                                    data-test-id={getDataTestId(dataTestId, 'subtitle')}
                                >
                                    {subtitle}
                                </div>
                            )}
                        </div>
                    )}

                    {rightAddons && (
                        <div
                            className={cn(styles.rightAddons, styles.addons, rightAddonsClassName)}
                            ref={rightAddonsRef}
                        >
                            {rightAddons}
                        </div>
                    )}
                </div>

                {bottomAddons && <div className={bottomAddonsClassName}>{bottomAddons}</div>}
            </div>
        );
    },
);

NavigationBar.displayName = 'NavigationBar';

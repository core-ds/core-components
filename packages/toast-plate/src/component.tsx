import React, { forwardRef, HTMLAttributes, ReactNode, MouseEvent, useCallback } from 'react';
import cn from 'classnames';

import { IconButton } from '@alfalab/core-components-icon-button';
import { Badge } from '@alfalab/core-components-badge';
import { CheckmarkCircleMIcon } from '@alfalab/icons-glyph/CheckmarkCircleMIcon';
import { CrossCircleMIcon } from '@alfalab/icons-glyph/CrossCircleMIcon';
import { AlertCircleMIcon } from '@alfalab/icons-glyph/AlertCircleMIcon';
import { CrossMIcon } from '@alfalab/icons-glyph/CrossMIcon';

import styles from './index.module.css';

export type BadgeIcons = {
    negative: JSX.Element;
    positive: JSX.Element;
    attention: JSX.Element;
};

export type ToastPlateProps = HTMLAttributes<HTMLDivElement> & {
    /**
     * Дополнительный класс
     */
    className?: string;

    /**
     * Дополнительный класс для заголовка
     */
    titleClassName?: string;

    /**
     * Дополнительный класс для контентной области
     */
    contentClassName?: string;

    /**
     * Дополнительный класс для области с кнопкой действия
     */
    actionSectionClassName?: string;

    /**
     * Дочерние элементы
     */
    children?: ReactNode;

    /**
     * Заголовок компонента
     */
    title?: ReactNode;

    /**
     * Вид бэйджа
     */
    badge?: 'negative' | 'positive' | 'attention';

    /**
     * Слот слева, заменяет стандартную иконку
     */
    leftAddons?: ReactNode;

    /**
     * Кнопка действия
     */
    actionButton?: ReactNode;

    /**
     * Идентификатор для систем автоматизированного тестирования
     */
    dataTestId?: string;

    /**
     * Управляет отображением кнопки закрытия уведомления
     */
    hasCloser?: boolean;

    /**
     * Растягивает компонент на ширину контейнера
     */
    block?: boolean;

    /**
     * Обработчик клика по крестику
     */
    onClose?: (event?: MouseEvent<HTMLButtonElement>) => void;

    /**
     * Функция, с помощью которой можно переопределить иконки в Badge
     */
    getBadgeIcons?: (icons: BadgeIcons) => BadgeIcons;
};

const iconDefaultComponents = {
    negative: <CrossCircleMIcon className={styles.badgeIcon} />,
    positive: <CheckmarkCircleMIcon className={styles.badgeIcon} />,
    attention: <AlertCircleMIcon className={styles.badgeIcon} />,
};

export const ToastPlate = forwardRef<HTMLDivElement, ToastPlateProps>(
    (
        {
            dataTestId,
            className,
            titleClassName,
            contentClassName,
            actionSectionClassName,
            hasCloser,
            leftAddons,
            badge,
            title,
            children,
            actionButton,
            block,
            onClose,
            getBadgeIcons,
            ...restProps
        },
        ref,
    ) => {
        const needRenderLeftAddons = Boolean(leftAddons || badge);

        const iconComponents = getBadgeIcons
            ? getBadgeIcons(iconDefaultComponents)
            : iconDefaultComponents;

        const handleClose = useCallback(
            event => {
                if (onClose) {
                    onClose(event);
                }
            },
            [onClose],
        );

        return (
            <div
                className={cn(
                    styles.component,
                    { [styles.block]: block, [styles.hasCloser]: hasCloser },
                    className,
                )}
                ref={ref}
                data-test-id={dataTestId}
                {...restProps}
            >
                <div className={styles.contentWrap}>
                    <div
                        className={cn(contentClassName, styles.content, {
                            [styles.hasCloser]: hasCloser,
                            [styles.hasActionButton]: !!actionButton,
                        })}
                    >
                        {needRenderLeftAddons && (
                            <div className={styles.leftAddons}>
                                {leftAddons || (
                                    <Badge
                                        view='icon'
                                        content={badge && iconComponents[badge]}
                                        iconColor={badge}
                                        className={styles.badge}
                                        dataTestId='badge'
                                    />
                                )}
                            </div>
                        )}

                        <div>
                            {title && (
                                <div className={cn(titleClassName, styles.title)}>{title}</div>
                            )}
                            {children && <div className={styles.children}>{children}</div>}
                        </div>
                    </div>

                    {actionButton && (
                        <div
                            className={cn(actionSectionClassName, styles.actionSection, {
                                [styles.hasCloser]: hasCloser,
                            })}
                        >
                            {actionButton}
                        </div>
                    )}

                    {hasCloser && (
                        <div className={styles.closeButtonWrapper}>
                            <IconButton
                                icon={CrossMIcon}
                                colors='inverted'
                                className={cn(styles.closeButton)}
                                onClick={handleClose}
                                aria-label='закрыть'
                            />
                        </div>
                    )}
                </div>
            </div>
        );
    },
);

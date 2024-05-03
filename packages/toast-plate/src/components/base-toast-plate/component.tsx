import React, { forwardRef, HTMLAttributes, MouseEvent, ReactNode, useCallback } from 'react';
import cn from 'classnames';

import { IconButton } from '@alfalab/core-components-icon-button';
import { StatusBadge, StatusBadgeProps } from '@alfalab/core-components-status-badge';
import { CrossMIcon } from '@alfalab/icons-glyph/CrossMIcon';

import { useDeprecatedBadge } from './hooks/useDeprecatedBadge';
import { unsafe_BadgeProps } from './types/unsafeBadgeProps';
import { isUnsafeBadge } from './utils/isUnsafeBadge';

import defaultColors from './default.module.css';
import commonStyles from './index.module.css';
import invertedColors from './inverted.module.css';

const colorStyles = {
    default: defaultColors,
    inverted: invertedColors,
};

export type BaseToastPlateProps = HTMLAttributes<HTMLDivElement> & {
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
    badge?: unsafe_BadgeProps | StatusBadgeProps['view'];

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
     * Доп. класс враппера кнопки "закрыть".
     */
    closerWrapperClassName?: string;

    /**
     * Доп. класс кнопки "закрыть".
     */
    closerClassName?: string;

    /**
     * Растягивает компонент на ширину контейнера
     */
    block?: boolean;

    /**
     * Обработчик клика по крестику
     */
    onClose?: (event?: MouseEvent<HTMLButtonElement>) => void;

    /**
     * Набор цветов для компонента
     */
    colors?: 'default' | 'inverted';

    /**
     * Положение кнопки под заголовком компонента
     */
    bottomButtonPosition?: boolean;

    /**
     * Основные стили компонента.
     */
    styles?: { [key: string]: string };
};

export const BaseToastPlate = forwardRef<HTMLDivElement, BaseToastPlateProps>(
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
            colors = 'default',
            closerWrapperClassName,
            closerClassName,
            bottomButtonPosition = false,
            styles = {},
            ...restProps
        },
        ref,
    ) => {
        const needRenderLeftAddons = Boolean(leftAddons || badge);

        const { transformDeprecatedBadge } = useDeprecatedBadge();

        const handleClose = useCallback(
            (event: React.MouseEvent<HTMLButtonElement>) => {
                if (onClose) {
                    onClose(event);
                }
            },
            [onClose],
        );

        let statusBadgeView = badge;

        if (badge && isUnsafeBadge(badge)) {
            statusBadgeView = transformDeprecatedBadge(badge);
        }

        return (
            <div
                className={cn(
                    commonStyles.component,
                    colorStyles[colors].component,
                    { [commonStyles.block]: block, [commonStyles.hasCloser]: hasCloser },
                    className,
                )}
                ref={ref}
                data-test-id={dataTestId}
                {...restProps}
            >
                <div className={commonStyles.wrapper}>
                    <div className={commonStyles.contentWrapper}>
                        {needRenderLeftAddons && (
                            <div className={commonStyles.leftAddons}>
                                {leftAddons ||
                                    (badge && (
                                        <StatusBadge
                                            view={statusBadgeView as StatusBadgeProps['view']}
                                            dataTestId='badge'
                                        />
                                    ))}
                            </div>
                        )}
                        <div
                            className={cn(contentClassName, commonStyles.content, {
                                [commonStyles.hasCloser]: hasCloser,
                                [commonStyles.hasActionButton]: !!actionButton,
                                [commonStyles.direction]: bottomButtonPosition,
                            })}
                        >
                            <div className={commonStyles.contentTitle}>
                                {title && (
                                    <div
                                        className={cn(
                                            titleClassName,
                                            commonStyles.title,
                                            styles.title,
                                        )}
                                    >
                                        {title}
                                    </div>
                                )}
                                {children && (
                                    <div className={commonStyles.children}>{children}</div>
                                )}
                            </div>

                            {actionButton && (
                                <div
                                    className={cn(
                                        actionSectionClassName,
                                        commonStyles.actionSection,
                                        styles.actionSection,
                                        {
                                            [commonStyles.hasCloser]: hasCloser,
                                            [commonStyles.bottomButton]: bottomButtonPosition,
                                        },
                                    )}
                                >
                                    {actionButton}
                                </div>
                            )}
                        </div>
                    </div>
                    {hasCloser && (
                        <div
                            className={cn(
                                commonStyles.closeButtonWrapper,
                                styles.closeButtonWrapper,
                                colorStyles[colors].closeButtonWrapper,
                                closerWrapperClassName,
                            )}
                        >
                            <IconButton
                                icon={CrossMIcon}
                                colors={colors === 'default' ? 'inverted' : 'default'}
                                className={cn(
                                    commonStyles.closeButton,
                                    styles.closeButton,
                                    closerClassName,
                                )}
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

import React, { forwardRef, HTMLAttributes, MouseEvent, ReactNode, useCallback } from 'react';
import cn from 'classnames';

import { Badge } from '@alfalab/core-components-badge';
import { IconButton } from '@alfalab/core-components-icon-button';
import { AlertCircleMIcon } from '@alfalab/icons-glyph/AlertCircleMIcon';
import { CheckmarkCircleMIcon } from '@alfalab/icons-glyph/CheckmarkCircleMIcon';
import { CrossCircleMIcon } from '@alfalab/icons-glyph/CrossCircleMIcon';
import { CrossMIcon } from '@alfalab/icons-glyph/CrossMIcon';

import defaultColors from './default.module.css';
import commonStyles from './index.module.css';
import invertedColors from './inverted.module.css';

const colorStyles = {
    default: defaultColors,
    inverted: invertedColors,
};

export type BadgeIcons = {
    negative: JSX.Element;
    positive: JSX.Element;
    attention: JSX.Element;
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
     * Функция, с помощью которой можно переопределить иконки в Badge
     */
    getBadgeIcons?: (icons: BadgeIcons) => BadgeIcons;

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

const iconDefaultComponents = {
    negative: <CrossCircleMIcon className={commonStyles.badgeIcon} />,
    positive: <CheckmarkCircleMIcon className={commonStyles.badgeIcon} />,
    attention: <AlertCircleMIcon className={commonStyles.badgeIcon} />,
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
            getBadgeIcons,
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

        const iconComponents = getBadgeIcons
            ? getBadgeIcons(iconDefaultComponents)
            : iconDefaultComponents;

        const handleClose = useCallback(
            (event: React.MouseEvent<HTMLButtonElement>) => {
                if (onClose) {
                    onClose(event);
                }
            },
            [onClose],
        );

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
                                {leftAddons || (
                                    <Badge
                                        view='icon'
                                        content={badge && iconComponents[badge]}
                                        iconColor={badge}
                                        className={commonStyles.badge}
                                        dataTestId='badge'
                                        visibleColorOutline={true}
                                    />
                                )}
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

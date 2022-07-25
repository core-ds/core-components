import React, {
    forwardRef,
    useCallback,
    useState,
    ReactNode,
    MouseEvent,
    useRef,
    ReactElement,
    KeyboardEvent,
} from 'react';
import cn from 'classnames';
import mergeRefs from 'react-merge-refs';
import { useFocus } from '@alfalab/hooks';
import { Button, ComponentProps as ButtonProps } from '@alfalab/core-components-button';

import styles from './index.module.css';

export type PlateProps = {
    /**
     * Управление наличием закрывающего крестика
     */
    hasCloser?: boolean;

    /**
     * Управление наличием стрелки скрытия контента
     */
    foldable?: boolean;

    /**
     * Управление видимостью контента (controlled)
     */
    folded?: boolean;

    /**
     * Начальное состояние контента при foldable={ true }
     */
    defaultFolded?: boolean;

    /**
     * Слот слева
     */
    leftAddons?: ReactNode;

    /**
     * Слот для субаддонов (слева от крестика)
     */
    subAddons?: ReactNode | Array<ReactElement<ButtonProps>>;

    /**
     * Включить/выключить скругление
     */
    rounded?: boolean;

    /**
     * Включить/Выключить обводку
     */
    border?: boolean;

    /**
     * Включить/выключить тени
     */
    shadow?: boolean;

    /**
     * Включить/выключить ограничение максимальной ширины контента в 560px
     */
    limitContentWidth?: boolean;

    /**
     * Дочерние элементы
     */
    children?: ReactNode;

    /**
     * Заголовок компонента
     */
    title?: ReactNode;

    /**
     * Вид заголовка
     */
    titleView?: 'bold' | 'light';

    /**
     * Вид компонента
     */
    view?: 'common' | 'negative' | 'positive' | 'attention' | 'custom';

    /**
     * Набор действий
     */
    buttons?: ReactNode | Array<ReactElement<ButtonProps>>;

    /**
     * Дополнительный класс
     */
    className?: string;

    /**
     * Дополнительный класс для кнопок
     */
    buttonsClassName?: string;

    /**
     * Дополнительный класс для контента
     */
    contentClassName?: string;

    /**
     * Дополнительный класс для субаддонов
     */
    subAddonsClassName?: string;

    /**
     * Обработчик клика по плашке
     */
    onClick?: (event?: MouseEvent<HTMLDivElement>) => void;

    /**
     * Обработчик клика по крестику
     */
    onClose?: (event?: MouseEvent<HTMLButtonElement>) => void;

    /**
     * Обработчик сворачивания
     */
    onToggle?: (
        event: MouseEvent<HTMLElement> | KeyboardEvent<HTMLElement>,
        payload: { folded: boolean },
    ) => void;

    /**
     * Идентификатор для систем автоматизированного тестирования
     */
    dataTestId?: string;
};

export const Plate = forwardRef<HTMLDivElement, PlateProps>(
    (
        {
            hasCloser,
            foldable: foldableProp = false,
            folded: foldedProp,
            defaultFolded = true,
            rounded = true,
            limitContentWidth = true,
            leftAddons,
            subAddons,
            children,
            buttons,
            title,
            titleView = 'bold',
            view = 'common',
            border = view !== 'custom',
            shadow = view === 'custom',
            className,
            buttonsClassName,
            contentClassName,
            subAddonsClassName,
            dataTestId,
            onClick,
            onClose,
            onToggle,
        },
        ref,
    ) => {
        const plateRef = useRef<HTMLDivElement>(null);
        const contentRef = useRef<HTMLDivElement>(null);
        const subAddonsRef = useRef<HTMLDivElement>(null);

        const [focused] = useFocus(plateRef, 'keyboard');

        const [isHidden, setIsHidden] = useState(false);
        const [foldedState, setFoldedState] = useState(defaultFolded);

        const uncontrolled = foldedProp === undefined;

        const foldable = !!title && !!children && foldableProp;
        const folded = uncontrolled ? foldedState : foldedProp;

        const hasButtons = !!buttons && typeof buttons !== 'boolean';
        const hasContent = children || hasButtons;
        const hasSubAddons = !!subAddons && typeof subAddons !== 'boolean';
        const hasAnyAddons = leftAddons || subAddons || foldable || hasCloser;

        const handleClick = useCallback(
            event => {
                const eventInsideComponent =
                    plateRef.current && plateRef.current.contains(event.target);

                const eventInsideContent =
                    contentRef.current && contentRef.current.contains(event.target);

                const eventInsideSubAddons =
                    subAddonsRef.current && subAddonsRef.current.contains(event.target);

                const clickSimilarKeys = ['Enter', ' '].includes(event.key);

                const shouldChangeIsFolded =
                    eventInsideComponent &&
                    !eventInsideContent &&
                    !eventInsideSubAddons &&
                    (event.type === 'click' || clickSimilarKeys);

                if (foldable && shouldChangeIsFolded) {
                    if (uncontrolled) {
                        setFoldedState(!foldedState);
                    }

                    if (onToggle) {
                        onToggle(event, { folded: !(uncontrolled ? foldedState : foldedProp) });
                    }
                }

                if (onClick) {
                    onClick(event);
                }
            },
            [foldable, onClick, uncontrolled, onToggle, foldedState, foldedProp],
        );

        const handleClose = useCallback(
            event => {
                setIsHidden(true);

                if (onClose) {
                    onClose(event);
                }
            },
            [onClose],
        );

        const renderButtons = (
            _buttons: ReactNode,
            containerClassName: string,
            buttonClassName: string,
        ) => {
            const buttonsIsArray = Array.isArray(_buttons) && _buttons.length > 0;

            if (buttonsIsArray) {
                return (
                    <div className={containerClassName}>
                        {(_buttons as Array<ReactElement<ButtonProps>>).map((button, index) =>
                            button
                                ? React.cloneElement(button, {
                                      // eslint-disable-next-line react/no-array-index-key
                                      key: index,
                                      size: 'xxs',
                                      view: index === 0 ? 'secondary' : 'link',
                                      className: cn(button.props.className, buttonClassName),
                                  })
                                : null,
                        )}
                    </div>
                );
            }

            return <div className={containerClassName}>{buttons}</div>;
        };

        return (
            <div
                className={cn({
                    [styles.shadow]: shadow,
                    [styles.rounded]: rounded,
                })}
            >
                {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions */}
                <div
                    className={cn(
                        styles.component,
                        styles[view],
                        {
                            [styles.foldable]: foldable,
                            [styles.focused]: focused,
                            [styles.isHidden]: hasCloser && isHidden,
                            [styles.isFolded]: foldable && folded,
                            [styles.rounded]: rounded,
                            [styles.rect]: !rounded,
                            [styles.noBorder]: !border,
                        },
                        className,
                    )}
                    onClick={handleClick}
                    onKeyDown={handleClick}
                    role='alert'
                    ref={mergeRefs([plateRef, ref])}
                    /* eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex */
                    tabIndex={foldable ? 0 : -1}
                    data-test-id={dataTestId}
                >
                    <div className={styles.inner}>
                        {leftAddons && <div className={styles.leftAddons}>{leftAddons}</div>}
                        <div
                            className={cn(styles.contentContainer, contentClassName, {
                                [styles.withoutTitle]: !title && hasAnyAddons,
                                [styles.limitWidth]: limitContentWidth,
                            })}
                        >
                            {title && <div className={styles[titleView]}>{title}</div>}
                            {hasContent && (
                                <div
                                    ref={contentRef}
                                    className={cn(styles.content, {
                                        [styles.isFolded]: foldable && folded,
                                    })}
                                >
                                    {children && (
                                        <div className={styles.description}>{children}</div>
                                    )}

                                    {hasButtons && (
                                        <div className={styles.footer}>
                                            {renderButtons(
                                                buttons,
                                                buttonsClassName || '',
                                                styles.button,
                                            )}
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>

                        {hasSubAddons && (
                            <div ref={subAddonsRef} className={styles.subAddons}>
                                {renderButtons(
                                    subAddons,
                                    subAddonsClassName || '',
                                    styles.subAddonsButton,
                                )}
                            </div>
                        )}

                        {foldable && (
                            <div className={styles.rightAddons}>
                                <div
                                    className={cn(styles.folder, {
                                        [styles.isFolded]: folded,
                                    })}
                                />
                            </div>
                        )}

                        {hasCloser && !foldable && (
                            <div className={styles.rightAddons}>
                                <Button
                                    className={styles.closer}
                                    aria-label='закрыть'
                                    view='ghost'
                                    onClick={handleClose}
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    },
);

/**
 * Для отображения в сторибуке
 */
Plate.defaultProps = {
    foldable: false,
    defaultFolded: true,
    view: 'common',
};

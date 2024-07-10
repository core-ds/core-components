import React, {
    forwardRef,
    KeyboardEvent,
    MouseEvent,
    ReactElement,
    ReactNode,
    useCallback,
    useRef,
    useState,
} from 'react';
import mergeRefs from 'react-merge-refs';
import cn from 'classnames';

import { ButtonProps } from '@alfalab/core-components-button';
import { IconButton } from '@alfalab/core-components-icon-button';
import { useFocus } from '@alfalab/hooks';
import { ChevronDownMIcon } from '@alfalab/icons-glyph/ChevronDownMIcon';
import { CrossMIcon } from '@alfalab/icons-glyph/CrossMIcon';

import { ButtonList } from '../button-list/component';

import commonStyles from './index.module.css';

export type BasePlateProps = {
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
     * Фон компонента при view=custom
     */
    background?: string;

    /**
     * Цвет бордера у компонента при view=custom
     */
    borderColor?: string;

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

    /**
     * Количество строк
     */
    rowLimit?: 1 | 2 | 3;

    /**
     * Основные стили компонента.
     */
    styles?: { [key: string]: string };
};

/* eslint-disable complexity */
export const BasePlate = forwardRef<HTMLDivElement, BasePlateProps>(
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
            rowLimit,
            styles = {},
            background,
            borderColor,
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

        const rowLimitStyles = rowLimit && commonStyles[`rowLimit${rowLimit}`];

        const handleClick = useCallback(
            (event: React.MouseEvent<HTMLDivElement> | React.KeyboardEvent<HTMLDivElement>) => {
                const target = event.target as HTMLDivElement;
                const eventInsideComponent = plateRef.current && plateRef.current.contains(target);

                const eventInsideContent =
                    contentRef.current && contentRef.current.contains(target);

                const eventInsideSubAddons =
                    subAddonsRef.current && subAddonsRef.current.contains(target);

                const clickSimilarKeys = ['Enter', ' '].includes(
                    (event as React.KeyboardEvent<HTMLDivElement>).key,
                );

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
                    onClick(event as React.MouseEvent<HTMLDivElement>);
                }
            },
            [foldable, onClick, uncontrolled, onToggle, foldedState, foldedProp],
        );

        const handleClose = useCallback(
            (event: React.MouseEvent<HTMLButtonElement>) => {
                setIsHidden(true);

                if (onClose) {
                    onClose(event);
                }
            },
            [onClose],
        );

        return (
            // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
            <div
                className={cn(
                    commonStyles.component,
                    commonStyles[view],
                    {
                        [commonStyles.foldable]: foldable,
                        [commonStyles.focused]: focused,
                        [commonStyles.isHidden]: hasCloser && isHidden,
                        [commonStyles.isFolded]: foldable && folded,
                        [commonStyles.rounded]: rounded,
                        [commonStyles.rect]: !rounded,
                        [commonStyles.noBorder]: !border,
                        [commonStyles.shadow]: shadow,
                    },
                    className,
                )}
                style={{
                    ...(view === 'custom' && { background, borderColor }),
                }}
                onClick={handleClick}
                onKeyDown={handleClick}
                role='alert'
                ref={mergeRefs([plateRef, ref])}
                /* eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex */
                tabIndex={foldable ? 0 : -1}
                data-test-id={dataTestId}
            >
                <div className={commonStyles.inner}>
                    {leftAddons && <div className={commonStyles.leftAddons}>{leftAddons}</div>}
                    <div
                        className={cn(commonStyles.contentContainer, contentClassName, {
                            [commonStyles.withoutTitle]: !title && hasAnyAddons,
                            [commonStyles.limitWidth]: limitContentWidth,
                        })}
                    >
                        {title && (
                            <div
                                className={cn(commonStyles[titleView], {
                                    [styles[titleView]]: Boolean(styles[titleView]),
                                })}
                            >
                                {title}
                            </div>
                        )}
                        {hasContent && (
                            <div
                                ref={contentRef}
                                className={cn(commonStyles.content, {
                                    [commonStyles.isFolded]: foldable && folded,
                                })}
                            >
                                {children && (
                                    <div
                                        className={cn(
                                            commonStyles.description,
                                            styles.description,
                                            rowLimitStyles,
                                        )}
                                    >
                                        {children}
                                    </div>
                                )}

                                {hasButtons && (
                                    <div className={styles.footer}>
                                        <ButtonList
                                            buttons={buttons}
                                            containerClassName={cn(
                                                commonStyles.containerButton,
                                                buttonsClassName,
                                            )}
                                            buttonClassName={cn(
                                                commonStyles.button,
                                                buttonsClassName,
                                            )}
                                        />
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    {hasSubAddons && (
                        <div ref={subAddonsRef} className={commonStyles.subAddons}>
                            <ButtonList
                                buttons={subAddons}
                                containerClassName={cn(subAddonsClassName, commonStyles.rowReverse)}
                                buttonClassName={commonStyles.button}
                            />
                        </div>
                    )}

                    {foldable && (
                        <div className={commonStyles.rightAddons}>
                            <div
                                className={cn(commonStyles.folder, {
                                    [commonStyles.isFolded]: folded,
                                })}
                            >
                                <ChevronDownMIcon />
                            </div>
                        </div>
                    )}

                    {hasCloser && !foldable && (
                        <div className={commonStyles.rightAddons}>
                            <IconButton
                                className={commonStyles.closer}
                                aria-label='закрыть'
                                icon={CrossMIcon}
                                size='xxs'
                                onClick={handleClose}
                            />
                        </div>
                    )}
                </div>
            </div>
        );
    },
);

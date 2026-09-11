import React, { forwardRef, useRef, useState } from 'react';
import cn from 'classnames';

import { HeadlessCollapse } from '@alfalab/core-components-headless-collapse';
import { Link } from '@alfalab/core-components-link';
import { useLayoutEffect_SAFE_FOR_SSR } from '@alfalab/hooks';
import { ChevronDownSIcon } from '@alfalab/icons-glyph/ChevronDownSIcon';

import styles from './index.module.css';

export type CollapseProps = {
    /**
     * Состояние компонента
     *
     */
    expanded?: boolean;

    /**
     * Текст ссылки в `expanded` состоянии
     *
     */
    collapsedLabel?: string;

    /**
     * Текст ссылки в `collapsed` состоянии
     *
     */
    expandedLabel?: string;

    /**
     * Дочерние элементы `Collapse`
     */
    children?: React.ReactNode;

    /**
     * Дополнительный класс обертки
     */
    className?: string;

    /**
     * Дополнительный класс для скрываемого контента
     */
    expandedContentClassName?: string;

    /**
     * Идентификатор компонента в DOM
     */
    id?: string;

    /**
     * Начальное состояние uncontrolled компонента
     * @default false
     */
    defaultExpanded?: boolean;

    /**
     * Обработчик смены состояний `expanded/collapsed`
     */
    onExpandedChange?: (expanded: boolean) => void;

    /**
     * Обработчик события завершения анимации
     */
    onTransitionEnd?: (expanded: boolean) => void;

    /**
     * Идентификатор для систем автоматизированного тестирования
     */
    dataTestId?: string;

    /**
     * Набор цветов для компонента
     * @default default
     */
    colors?: 'default' | 'inverted';
};

export const Collapse = forwardRef<HTMLDivElement, CollapseProps>(
    (
        {
            expanded: expandedFromProps,
            collapsedLabel,
            expandedLabel,
            children,
            className,
            expandedContentClassName,
            id,
            onTransitionEnd,
            onExpandedChange,
            defaultExpanded = false,
            dataTestId,
            colors = 'default',
        },
        ref,
    ) => {
        const expandedInProps = expandedFromProps !== undefined;
        const contentRef = useRef<HTMLDivElement>(null);
        const [expanded, setExpanded] = useState(expandedFromProps ?? defaultExpanded);

        const handleTransitionEnd = () => {
            if (onTransitionEnd) onTransitionEnd(expanded);
        };

        const handleExpandedChange = () => {
            onExpandedChange?.(!expanded);

            if (!expandedInProps) {
                setExpanded(!expanded);
            }
        };

        useLayoutEffect_SAFE_FOR_SSR(() => {
            if (expandedInProps && expanded !== expandedFromProps) {
                setExpanded(expandedFromProps);
            }
        }, [expanded, expandedFromProps, expandedInProps]);

        return (
            <div
                ref={ref}
                className={cn(className, styles.collapse)}
                id={id}
                data-test-id={dataTestId}
            >
                <HeadlessCollapse
                    in={expanded}
                    nodeRef={contentRef}
                    getDimensionValue={(node) => node.getBoundingClientRect().height}
                >
                    {(state) => (
                        <div
                            ref={contentRef}
                            className={cn(expandedContentClassName, {
                                [styles.expanded]: state === 'entered',
                                [styles.collapsing]: state === 'exiting' || state === 'entering',
                                [styles.collapsed]: state === 'exited' || state === 'entered',
                            })}
                            onTransitionEnd={handleTransitionEnd}
                        >
                            <div>{children}</div>
                        </div>
                    )}
                </HeadlessCollapse>
                {(expandedLabel || collapsedLabel) && (
                    <Link
                        className={cn({ [styles.expandedLabel]: expanded })}
                        pseudo={true}
                        onClick={handleExpandedChange}
                        colors={colors}
                        rightAddons={
                            <ChevronDownSIcon
                                className={cn(styles.toggleIcon, {
                                    [styles.rotated]: expanded,
                                })}
                            />
                        }
                    >
                        {expanded ? expandedLabel : collapsedLabel}
                    </Link>
                )}
            </div>
        );
    },
);

Collapse.displayName = 'Collapse';

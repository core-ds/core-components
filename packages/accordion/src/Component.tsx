import React, {
    type AnchorHTMLAttributes,
    type FC,
    type KeyboardEvent,
    type ReactNode,
    useCallback,
    useRef,
    useState,
} from 'react';
import cn from 'classnames';

import {
    type AccordionAnimationVariant,
    useAccordionContentAnimation,
    useAccordionSpringAnimation,
} from '@alfalab/core-components-shared';
import { TypographyText } from '@alfalab/core-components-typography';

import { DefaultControlIcon } from './components';
import { useMeasureHeight } from './hooks';
import { type ControlPosition } from './typings';

import styles from './index.module.css';

export type AccordionProps = {
    /**
     * Состояние компонента
     */
    expanded?: boolean;

    /**
     * Элемент заголовка
     */
    header: ReactNode;

    /**
     * Слот для элемента управления
     */
    control?: ReactNode;

    /**
     * Указывает компоненту - где будет размещен control
     */
    controlPosition?: ControlPosition;

    /**
     * Начальное состояние uncontrolled компонента
     */
    defaultExpanded?: boolean;

    /**
     * Основной элемент для отображения содержимого
     */
    children?: ReactNode;

    /**
     * Дополнительный класс обертки
     */
    className?: string;

    /**
     * Дополнительный класс для контейнера с заголовком
     */
    containerClassName?: string;

    /**
     * Дополнительный класс для header
     */
    headerClassName?: string;

    /**
     * Дополнительный класс для control
     */
    controlClassName?: string;

    /**
     * Дополнительный класс для body
     */
    bodyClassName?: string;

    /**
     * Дополнительный класс для body content
     */
    bodyContentClassName?: string;

    /**
     * Обработчик смены состояний `expanded`
     */
    onExpandedChange?: (expanded: boolean) => void;

    /**
     * Идентификатор для систем автоматизированного тестирования
     */
    dataTestId?: string;

    animationVariant?: AccordionAnimationVariant;
} & AnchorHTMLAttributes<HTMLDivElement>;

export const Accordion: FC<AccordionProps> = ({
    expanded,
    defaultExpanded = false,
    header,
    control,
    controlPosition = 'end',
    children,
    className,
    containerClassName,
    headerClassName,
    controlClassName,
    bodyClassName,
    onExpandedChange,
    dataTestId,
    bodyContentClassName,
    animationVariant = 'css',
    ...rest
}) => {
    const uncontrolled = expanded === undefined;
    const [expandedState, setExpanded] = useState(uncontrolled ? defaultExpanded : expanded);
    const isExpanded = uncontrolled ? expandedState : expanded;

    const isStartPosition = controlPosition === 'start';

    const [contentHeight, measureRef] = useMeasureHeight();
    const bodyRef = useRef<HTMLDivElement>(null);
    const contentAnimRef = useRef<HTMLDivElement | null>(null);

    const contentRef = useCallback(
        (el: HTMLDivElement | null) => {
            contentAnimRef.current = el;
            if (typeof measureRef === 'function') measureRef(el);
        },
        [measureRef],
    );

    useAccordionSpringAnimation(bodyRef, Boolean(isExpanded), contentHeight, animationVariant);
    useAccordionContentAnimation(contentAnimRef, Boolean(isExpanded), animationVariant);

    const controlContent =
        control === undefined ? (
            <DefaultControlIcon expanded={isExpanded} startPosition={isStartPosition} />
        ) : (
            control
        );

    const headerContent =
        typeof header === 'string' ? (
            <TypographyText view='primary-large' weight='medium'>
                {header}
            </TypographyText>
        ) : (
            header
        );

    const bodyContent =
        typeof children === 'string' ? (
            <TypographyText view='primary-medium'>{children}</TypographyText>
        ) : (
            children
        );

    const handleExpandedChange = useCallback(() => {
        if (uncontrolled) {
            setExpanded(!isExpanded);
        }

        onExpandedChange?.(!isExpanded);
    }, [isExpanded, onExpandedChange, uncontrolled]);

    const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === 'Enter') {
            handleExpandedChange();
        }
    };

    return (
        <div {...rest} data-test-id={dataTestId} className={cn(styles.accordion, className)}>
            <div
                role='button'
                tabIndex={0}
                aria-expanded={isExpanded}
                onClick={handleExpandedChange}
                onKeyDown={handleKeyDown}
                className={cn(styles.container, containerClassName)}
            >
                <div
                    className={cn(styles.header, headerClassName, {
                        [styles.endPosition]: isStartPosition,
                    })}
                >
                    {headerContent}
                </div>

                <div
                    className={cn(styles.control, controlClassName, {
                        [styles.startPosition]: isStartPosition,
                    })}
                >
                    {controlContent}
                </div>
            </div>

            {animationVariant === 'spring' ? (
                <div ref={bodyRef} className={cn(styles.body2, bodyClassName)}>
                    {/* paddingTop сброшен — отступ анимируется через marginTop на родителе */}
                    <div
                        className={cn(styles.bodyContent, bodyContentClassName)}
                        ref={contentRef}
                        style={{ paddingTop: 0 }}
                    >
                        {bodyContent}
                    </div>
                </div>
            ) : (
                <div
                    className={cn(styles.body, bodyClassName, {
                        [styles.expandedBody]: isExpanded,
                    })}
                    style={{ height: isExpanded ? contentHeight : 0 }}
                >
                    <div className={cn(styles.bodyContent, bodyContentClassName)} ref={contentRef}>
                        {bodyContent}
                    </div>
                </div>
            )}
        </div>
    );
};

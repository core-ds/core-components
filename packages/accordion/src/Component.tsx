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
    SpringHeadlessCollapse,
    SpringTransition,
} from '@alfalab/core-components-animation-private';
import { TypographyText } from '@alfalab/core-components-typography';

import { DefaultControlIcon } from './components';
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
} & AnchorHTMLAttributes<HTMLDivElement>;

const spring = {
    enter: { stiffness: 426, damping: 41, mass: 1 },
    exit: { stiffness: 743, damping: 49, mass: 1, delay: 40 },
};

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
    ...rest
}) => {
    const uncontrolled = expanded === undefined;
    const [expandedState, setExpanded] = useState(uncontrolled ? defaultExpanded : expanded);
    const isExpanded = uncontrolled ? expandedState : expanded;

    const isStartPosition = controlPosition === 'start';

    const bodyRef = useRef<HTMLDivElement>(null);
    const bodyContentRef = useRef<HTMLDivElement>(null);

    const [isContentVisible, setContentVisible] = useState(isExpanded);

    if (!isExpanded && isContentVisible) {
        setContentVisible(false);
    }

    const showContent = useCallback(() => setContentVisible(true), []);

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

            <SpringHeadlessCollapse
                nodeRef={bodyRef}
                in={isExpanded}
                spring={spring}
                threshold={0.35}
                onThreshold={showContent}
            >
                {(status) => (
                    <div
                        ref={bodyRef}
                        className={cn(styles.body, bodyClassName, {
                            [styles.expandedBody]: status !== 'exited',
                            [styles.enteredBody]: status === 'entered',
                        })}
                    >
                        <SpringTransition
                            in={isContentVisible}
                            nodeRef={bodyContentRef}
                            enter={{ y: 0 }}
                            exit={{ y: -12 }}
                            spring={spring}
                        >
                            {(contentStatus) => (
                                <div
                                    ref={bodyContentRef}
                                    className={cn(styles.bodyContent, bodyContentClassName, {
                                        [styles.bodyContentEnter]:
                                            contentStatus === 'entering' ||
                                            contentStatus === 'entered',
                                        [styles.bodyContentExit]: contentStatus === 'exiting',
                                    })}
                                >
                                    {bodyContent}
                                </div>
                            )}
                        </SpringTransition>
                    </div>
                )}
            </SpringHeadlessCollapse>
        </div>
    );
};

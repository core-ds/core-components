import React, {
    AnchorHTMLAttributes,
    FC,
    KeyboardEvent,
    ReactNode,
    useCallback,
    useState,
} from 'react';
import cn from 'classnames';

import { Typography } from '@alfalab/core-components-typography';

import { DefaultControlIcon } from './components';
import { useRecalculateContentHeight } from './hooks';
import { ControlPosition } from './typings';

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
     * Обработчик смены состояний `expanded`
     */
    onExpandedChange?: (expanded: boolean) => void;

    /**
     * Идентификатор для систем автоматизированного тестирования
     */
    dataTestId?: string;
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
    ...rest
}) => {
    const uncontrolled = expanded === undefined;
    const [expandedState, setExpanded] = useState(uncontrolled ? defaultExpanded : expanded);
    const isExpanded = uncontrolled ? expandedState : expanded;

    const isStartPosition = controlPosition === 'start';

    const { contentRef, contentCaseRef } = useRecalculateContentHeight(isExpanded);

    const controlContent =
        control === undefined ? (
            <DefaultControlIcon expanded={isExpanded} startPosition={isStartPosition} />
        ) : (
            control
        );

    const headerContent =
        typeof header === 'string' ? (
            <Typography.Text view='primary-large' weight='medium'>
                {header}
            </Typography.Text>
        ) : (
            header
        );

    const bodyContent =
        typeof children === 'string' ? (
            <Typography.Text view='primary-medium'>{children}</Typography.Text>
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

            <div
                ref={contentRef}
                className={cn(styles.body, bodyClassName, { [styles.expandedBody]: isExpanded })}
            >
                <div className={cn(styles.bodyContent)} ref={contentCaseRef}>
                    {bodyContent}
                </div>
            </div>
        </div>
    );
};

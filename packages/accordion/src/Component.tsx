import React, {
    type AnchorHTMLAttributes,
    type FC,
    type KeyboardEvent,
    type ReactNode,
    useRef,
    useState,
} from 'react';
import cn from 'classnames';

import { HeadlessCollapse } from '@alfalab/core-components-headless-collapse';
import { TypographyText } from '@alfalab/core-components-typography';
import { useLayoutEffect_SAFE_FOR_SSR } from '@alfalab/hooks';

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

export const Accordion: FC<AccordionProps> = ({
    expanded: expandedFromProps,
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
    const expandedInProps = expandedFromProps !== undefined;
    const [expanded, setExpanded] = useState(expandedFromProps ?? defaultExpanded);
    const isStartPosition = controlPosition === 'start';
    const bodyRef = useRef<HTMLDivElement>(null);
    const controlContent =
        control === undefined ? (
            <DefaultControlIcon expanded={expanded} startPosition={isStartPosition} />
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

    const handleExpandedChange = () => {
        const nextExpanded = !expanded;

        onExpandedChange?.(nextExpanded);
        if (!expandedInProps) {
            setExpanded(nextExpanded);
        }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === 'Enter') {
            handleExpandedChange();
        }
    };

    useLayoutEffect_SAFE_FOR_SSR(() => {
        if (expandedInProps && expanded !== expandedFromProps) {
            setExpanded(expandedFromProps);
        }
    }, [expanded, expandedFromProps, expandedInProps]);

    return (
        <div {...rest} data-test-id={dataTestId} className={cn(styles.accordion, className)}>
            <div
                role='button'
                tabIndex={0}
                aria-expanded={expanded}
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
            <HeadlessCollapse in={expanded} nodeRef={bodyRef}>
                {(state) => (
                    <div
                        ref={bodyRef}
                        className={cn(bodyClassName, {
                            [styles.expanded]: state === 'entered',
                            [styles.collapsing]: state === 'exiting' || state === 'entering',
                            [styles.collapse]: state === 'exited' || state === 'entered',
                        })}
                    >
                        <div className={cn(styles.bodyContent, bodyContentClassName)}>
                            {bodyContent}
                        </div>
                    </div>
                )}
            </HeadlessCollapse>
        </div>
    );
};

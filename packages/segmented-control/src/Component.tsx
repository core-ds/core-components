import React, { type FC, type ReactElement, useCallback, useEffect, useRef } from 'react';
import { ResizeObserver as ResizeObserverPolyfill } from '@juggle/resize-observer';
import cn from 'classnames';

import { Skeleton, type SkeletonProps } from '@alfalab/core-components-skeleton';

import { type SegmentProps } from './components';
import { type ContextType, SegmentedControlContext } from './context';
import { type IDType } from './typing';

import defaultColors from './default.module.css';
import styles from './index.module.css';
import invertedColors from './inverted.module.css';

const colorStyles = {
    default: defaultColors,
    inverted: invertedColors,
};

export interface SegmentedControlProps {
    /**
     * Дополнительный className
     */
    className?: string;

    /**
     * Обработчик смены выбранного сегмента
     */
    onChange: ContextType['onChange'];

    /**
     * ID выбранного сегмента
     */
    selectedId: IDType;

    /**
     * Размер компонента
     * @description xs, xxs deprecated, используйте вместо них 40, 32 соответственно
     */
    size?: 'xs' | 'xxs' | 32 | 40;

    /**
     * Форма компонента
     */
    shape?: 'rounded' | 'rectangular';

    /**
     * Дочерние элементы
     */
    children: Array<ReactElement<SegmentProps>>;

    /**
     * Набор цветов для компонента
     */
    colors?: 'default' | 'inverted';

    /**
     * Идентификатор для систем автоматизированного тестирования
     */
    dataTestId?: string;

    /**
     * Дополнительные инлайн стили для враппера
     */
    style?: React.CSSProperties;

    /**
     * Отключает пользовательский ввод
     * @default false
     */
    disabled?: boolean;

    /**
     * Показывает скелетон вместо контента
     * @default false
     */
    showSkeleton?: boolean;

    /**
     * Настройки скелетона
     */
    skeletonProps?: Omit<SkeletonProps, 'visible'>;
};

const MAX_SEGMENTS = 5;

export const SIZE_TO_CLASSNAME_MAP = {
    xxs: 'size-32',
    xs: 'size-40',
    32: 'size-32',
    40: 'size-40',
};

export const SegmentedControl: FC<SegmentedControlProps> = ({
    className,
    selectedId,
    onChange,
    shape = 'rectangular',
    size = 32,
    children: defaultChildren,
    colors = 'default',
    dataTestId,
    style,
    disabled = false,
    showSkeleton = false,
    skeletonProps,
}) => {
    const wrapperRef = useRef<HTMLDivElement>(null);
    const innerRef = useRef<HTMLDivElement>(null);
    const selectedBoxRef = useRef<HTMLDivElement>(null);
    const children = defaultChildren.slice(0, MAX_SEGMENTS);
    const sizeClassName = SIZE_TO_CLASSNAME_MAP[size];

    const skeletonBorderRadius = (() => {
        if (shape === 'rounded') {
            return sizeClassName === 'size-40' ? 20 : 16;
        }

        return sizeClassName === 'size-40' ? 12 : 10;
    })();

    const selectedSegmentPosition = children.findIndex((item) => item.props.id === selectedId);
    const isPositionFounded = selectedSegmentPosition !== -1;
    const content = isPositionFounded && children[selectedSegmentPosition].props.children;
    const contentClassName =
        isPositionFounded && children[selectedSegmentPosition].props.contentClassName;

    const setSelectedBoxStyles = useCallback(() => {
        if (innerRef.current && selectedBoxRef.current) {
            const segments = Array.from(innerRef.current.children);
            const { width: parentWidth } = innerRef.current.getBoundingClientRect();
            const width = parentWidth / segments.length;
            const offsetLeft = width * selectedSegmentPosition;

            selectedBoxRef.current.style.width = `${width}px`;
            selectedBoxRef.current.style.transform = `translateX(${offsetLeft}px)`;
        }
    }, [selectedSegmentPosition]);

    const setSelectedBoxStylesRef = useRef(setSelectedBoxStyles);

    useEffect(() => {
        setSelectedBoxStylesRef.current = setSelectedBoxStyles;
        setSelectedBoxStyles();
    }, [setSelectedBoxStyles]);

    useEffect(() => {
        if (!wrapperRef.current) return undefined;

        const ResizeObserver = window.ResizeObserver || ResizeObserverPolyfill;

        const observer = new ResizeObserver(() => setSelectedBoxStylesRef.current());

        observer.observe(wrapperRef.current);

        return () => observer.disconnect();
    }, []);

    if (showSkeleton) {
        return (
            <Skeleton
                {...skeletonProps}
                visible={true}
                dataTestId={dataTestId}
                borderRadius={skeletonBorderRadius}
                className={cn(className, skeletonProps?.className)}
                style={{
                    ...style,
                    ...skeletonProps?.style,
                    height:
                        sizeClassName === 'size-40'
                            ? '40px'
                            : '32px',
                    width: '100%',
                }}
            />
        );
    }

    return (
        // eslint-disable-next-line react/jsx-no-constructed-context-values
        <SegmentedControlContext.Provider value={{ onChange, colors }}>
            <div ref={wrapperRef} className={className} style={style} data-test-id={dataTestId}>
                <div
                    className={cn(
                        styles.wrapper,
                        colorStyles[colors].wrapper,
                        styles[shape],
                        styles[sizeClassName],
                        {
                            [styles.disabled]: disabled,
                        },
                    )}
                >
                    <div className={cn(styles.container)}>
                        <div
                            className={cn(
                                styles.selectedBox,
                                colorStyles[colors].selectedBox,
                                styles[shape],
                            )}
                            ref={selectedBoxRef}
                        />
                        <div className={cn(styles.inner)} ref={innerRef}>
                            {React.Children.map(children, (item) =>
                                React.cloneElement(item, {
                                    className: cn(
                                        styles.segment,
                                        colorStyles[colors].segment,
                                        {
                                            [styles.selected]: item.props.id === selectedId,
                                            [colorStyles[colors].selected]:
                                                item.props.id === selectedId,
                                        },
                                        item.props.className,
                                    ),
                                }),
                            )}
                        </div>
                    </div>
                </div>
            </div>
            {content && <div className={cn(contentClassName)}>{content}</div>}
        </SegmentedControlContext.Provider>
    );
};

import React, { FC, ReactElement, useCallback, useEffect, useRef } from 'react';
import { ResizeObserver as ResizeObserverPolyfill } from '@juggle/resize-observer';
import cn from 'classnames';

import { SegmentProps } from './components';
import { ContextType, SegmentedControlContext } from './context';
import { IDType } from './typing';

import styles from './index.module.css';

export type SegmentedControlProps = {
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
     */
    size?: 'xs' | 'xxs';

    /**
     * Форма компонента
     */
    shape?: 'rounded' | 'rectangular';

    /**
     * Дочерние элементы
     */
    children: Array<ReactElement<SegmentProps>>;

    /**
     * Идентификатор для систем автоматизированного тестирования
     */
    dataTestId?: string;
};

const MAX_SEGMENTS = 5;

export const SegmentedControl: FC<SegmentedControlProps> = ({
    className,
    selectedId,
    onChange,
    shape = 'rectangular',
    size = 'xxs',
    children: defaultChildren,
    dataTestId,
}) => {
    const wrapperRef = useRef<HTMLDivElement>(null);
    const innerRef = useRef<HTMLDivElement>(null);
    const selectedBoxRef = useRef<HTMLDivElement>(null);
    const children = defaultChildren.slice(0, MAX_SEGMENTS);

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

    return (
        // eslint-disable-next-line react/jsx-no-constructed-context-values
        <SegmentedControlContext.Provider value={{ onChange }}>
            <div
                ref={wrapperRef}
                className={cn(styles.wrapper, styles[shape], styles[size], className)}
                data-test-id={dataTestId}
            >
                <div className={cn(styles.container)}>
                    <div className={cn(styles.selectedBox, styles[shape])} ref={selectedBoxRef} />
                    <div className={cn(styles.inner)} ref={innerRef}>
                        {React.Children.map(children, (item) =>
                            React.cloneElement(item, {
                                className: cn(
                                    styles.segment,
                                    {
                                        [styles.selected]: item.props.id === selectedId,
                                    },
                                    item.props.className,
                                ),
                            }),
                        )}
                    </div>
                </div>
            </div>
            {content && <div className={cn(contentClassName)}>{content}</div>}
        </SegmentedControlContext.Provider>
    );
};

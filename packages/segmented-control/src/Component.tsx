import React, { FC, ReactElement, useEffect, useMemo, useRef } from 'react';
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
     * Вид компонента
     */
    view?: 'rounded' | 'rect';

    /**
     * Дочерние элементы
     */
    children: Array<ReactElement<SegmentProps>>;

    /**
     * Идентификатор для систем автоматизированного тестирования
     */
    dataTestId?: string;
};

export const SegmentedControl: FC<SegmentedControlProps> = ({
    className,
    selectedId,
    onChange,
    view = 'rect',
    size = 'xxs',
    children,
    dataTestId,
}) => {
    const handler = useRef(onChange);
    const innerRef = useRef<HTMLDivElement>(null);
    const selectedBoxRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        handler.current = onChange;
    }, [onChange]);

    useEffect(() => {
        const selectedSegmentPosition = children.findIndex((item) => item.props.id === selectedId);

        if (selectedSegmentPosition !== -1 && innerRef.current && selectedBoxRef.current) {
            const selectedSegment = Array.from(innerRef.current.children)[
                selectedSegmentPosition
            ] as HTMLDivElement;
            const { width } = selectedSegment.getBoundingClientRect();

            selectedBoxRef.current.style.width = `${width}px`;
            selectedBoxRef.current.style.transform = `translateX(${selectedSegment.offsetLeft}px)`;
        }
    }, [children, selectedId]);

    const context: ContextType = useMemo(
        () => ({
            onChange: (id) => handler.current(id),
        }),
        [],
    );

    const { segments, content, contentClassName } = useMemo(() => {
        const selectedSegmentPosition = children.findIndex((item) => item.props.id === selectedId);
        const isPositionFounded = selectedSegmentPosition !== -1;

        const segments = React.Children.map(children, (item) =>
            React.cloneElement(item, {
                className: cn(
                    styles.segment,
                    {
                        [styles.selected]: item.props.id === selectedId,
                    },
                    item.props.className,
                ),
            }),
        );

        return {
            segments,
            content: isPositionFounded && children[selectedSegmentPosition].props.children,
            contentClassName:
                isPositionFounded && children[selectedSegmentPosition].props.contentClassName,
        };
    }, [selectedId, children]);

    return (
        <SegmentedControlContext.Provider value={context}>
            <div className={cn(styles.wrapper, styles[view], className)} data-test-id={dataTestId}>
                <div className={cn(styles.container)}>
                    <div className={cn(styles.selectedBox, styles[view])} ref={selectedBoxRef} />
                    <div className={cn(styles.inner, styles[size])} ref={innerRef}>
                        {segments}
                    </div>
                </div>
            </div>
            <div className={cn(contentClassName)}>{content}</div>
        </SegmentedControlContext.Provider>
    );
};

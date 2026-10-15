import React, {
    type FC,
    useCallback,
    useEffect,
    useLayoutEffect,
    useMemo,
    useRef,
    useState,
} from 'react';
import { ResizeObserver as ResizeObserverPolyfill } from '@juggle/resize-observer';
import cn from 'classnames';

import { Skeleton } from '@alfalab/core-components-skeleton';

import { type ContextType, SegmentedControlContext } from './context';
import { type SegmentedControlProps } from './typing';

import defaultColors from './default.module.css';
import styles from './index.module.css';
import invertedColors from './inverted.module.css';

const colorStyles = {
    default: defaultColors,
    inverted: invertedColors,
};

const MAX_SEGMENTS = 5;

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
    skeleton,
    view = 'default',
    segmentWidth = 'equal',
}) => {
    const wrapperRef = useRef<HTMLDivElement>(null);
    const innerRef = useRef<HTMLDivElement>(null);
    const selectedBoxRef = useRef<HTMLDivElement>(null);
    const isInitialLayoutRef = useRef(true);
    const [skipTransition, setSkipTransition] = useState(true);
    const children = defaultChildren.slice(0, MAX_SEGMENTS);
    const isSize40 = size === 40;

    const skeletonBorderRadius = (() => {
        if (shape === 'rounded') {
            return isSize40 ? 20 : 16;
        }

        return isSize40 ? 12 : 10;
    })();

    const selectedSegmentPosition = children.findIndex((item) => item.props.id === selectedId);
    const isPositionFounded = selectedSegmentPosition !== -1;
    const content = isPositionFounded && children[selectedSegmentPosition].props.children;
    const contentClassName =
        isPositionFounded && children[selectedSegmentPosition].props.contentClassName;

    const setSelectedBoxStyles = useCallback(() => {
        if (innerRef.current && selectedBoxRef.current) {
            const segment = innerRef.current.children[selectedSegmentPosition];

            if (!segment) {
                return;
            }

            const { left: parentLeft } = innerRef.current.getBoundingClientRect();
            const { left, width } = segment.getBoundingClientRect();

            selectedBoxRef.current.style.width = `${width}px`;
            selectedBoxRef.current.style.transform = `translateX(${left - parentLeft}px)`;
        }
    }, [selectedSegmentPosition]);

    const setSelectedBoxStylesRef = useRef(setSelectedBoxStyles);

    useLayoutEffect(() => {
        setSelectedBoxStylesRef.current = setSelectedBoxStyles;

        if (skeleton?.visible) {
            isInitialLayoutRef.current = true;
            setSkipTransition(true);

            return;
        }

        setSelectedBoxStyles();

        if (isInitialLayoutRef.current) {
            isInitialLayoutRef.current = false;

            requestAnimationFrame(() => {
                setSkipTransition(false);
            });
        }
    }, [setSelectedBoxStyles, skeleton?.visible]);

    useEffect(() => {
        if (skeleton?.visible || !wrapperRef.current) return undefined;

        const ResizeObserver = window.ResizeObserver || ResizeObserverPolyfill;

        const observer = new ResizeObserver(() => setSelectedBoxStylesRef.current());

        observer.observe(wrapperRef.current);

        if (innerRef.current) {
            observer.observe(innerRef.current);
        }

        return () => observer.disconnect();
    }, [skeleton?.visible]);

    const contextValue = useMemo<ContextType>(
        () => ({
            colors,
            size,
            selectedId,
            segmentWidth,
            onChange,
        }),
        [colors, size, selectedId, segmentWidth, onChange],
    );

    if (skeleton?.visible) {
        return (
            <Skeleton
                {...skeleton}
                colors={skeleton.colors ?? colors}
                dataTestId={dataTestId}
                borderRadius={skeletonBorderRadius}
                className={cn(className, styles.skeletonWrapper, skeleton.className)}
                style={{
                    ...skeleton.style,
                    height: size,
                }}
            />
        );
    }

    return (
        <SegmentedControlContext.Provider value={contextValue}>
            <div ref={wrapperRef} className={className} style={style} data-test-id={dataTestId}>
                <div
                    className={cn(
                        styles.wrapper,
                        colorStyles[colors].wrapper,
                        styles[shape],
                        styles[`size${size}`],
                        {
                            [styles.disabled]: disabled,
                            [colorStyles[colors].muted]: view === 'muted',
                            [styles.contentWidth]: segmentWidth === 'content',
                        },
                    )}
                >
                    <div className={cn(styles.container)}>
                        <div
                            className={cn(
                                styles.selectedBox,
                                colorStyles[colors].selectedBox,
                                styles[shape],
                                {
                                    [styles.noTransition]: skipTransition,
                                },
                            )}
                            ref={selectedBoxRef}
                        />
                        <div className={cn(styles.inner)} ref={innerRef}>
                            {children}
                        </div>
                    </div>
                </div>
            </div>
            {content && <div className={cn(contentClassName)}>{content}</div>}
        </SegmentedControlContext.Provider>
    );
};

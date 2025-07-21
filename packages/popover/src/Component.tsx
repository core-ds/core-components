import React, {
    CSSProperties,
    forwardRef,
    MutableRefObject,
    ReactNode,
    useEffect,
    useMemo,
    useRef,
    useState,
} from 'react';
import mergeRefs from 'react-merge-refs';
import { usePopper } from 'react-popper';
import { CSSTransition } from 'react-transition-group';
import { CSSTransitionProps } from 'react-transition-group/CSSTransition';
import { ResizeObserver as ResizeObserverPolyfill } from '@juggle/resize-observer';
import { BasePlacement, Modifier, Obj, VariationPlacement } from '@popperjs/core';
import cn from 'classnames';
import maxSize from 'popper-max-size-modifier';

import { Portal } from '@alfalab/core-components-portal';
import { isFn } from '@alfalab/core-components-shared';
import { Stack } from '@alfalab/core-components-stack';
import { useLayoutEffect_SAFE_FOR_SSR } from '@alfalab/hooks';
import { stackingOrder } from '@alfalab/stack-context';

import styles from './index.module.css';

type RefElement = HTMLElement | null;

type ModifierOptions<T> = T extends Modifier<unknown, infer V> ? V : never;

export type Position = BasePlacement | VariationPlacement;

type PopperModifier = {
    name: string;
    options: Obj;
};

export type PopoverProps = {
    /**
     * Управление состоянием поповера (открыт/закрыт)
     */
    open: boolean;

    /**
     * Элемент, относительного которого появляется поповер
     */
    anchorElement: RefElement;

    /**
     * Использовать ширину родительского элемента
     */
    useAnchorWidth?: boolean;

    /**
     * Позиционирование поповера
     */
    position?: Position;

    /**
     * Запрещает поповеру менять свою позицию.
     * Например, если места снизу недостаточно, то он все равно будет показан снизу
     */
    preventFlip?: boolean;

    /**
     * Запрещает поповеру менять свою позицию, если он не влезает в видимую область.
     */
    preventOverflow?: boolean;

    /**
     * Позволяет поповеру подствраивать свою высоту под границы экрана/элемента, если из-за величины контента он выходит за рамки области экрана/элемента
     */
    availableHeight?: boolean | (() => Element | null | undefined);

    /**
     * Если `true`, будет отрисована стрелочка
     */
    withArrow?: boolean;

    /**
     * Смещение поповера.
     * Если позиционирование top, bottom, то [x, y].
     * Если позиционирование left, right то [y, x].
     */
    offset?: [number, number];

    /**
     * Дополнительный класс для поповера
     */
    popperClassName?: string;

    /**
     * Дополнительный класс для стрелочки
     */
    arrowClassName?: string;

    /**
     * Функция, возвращающая контейнер, в который будет рендериться поповер
     */
    getPortalContainer?: () => HTMLElement;

    /**
     * CSSTransitionProps, прокидываются в компонент CSSTransitionProps.
     */
    transition?: CSSTransitionProps;

    /**
     * Выставляет кастомное свойство transition-duration
     */
    transitionDuration?: CSSProperties['transitionDuration'];

    /**
     * Рендерит компонент, обернутый в Transition
     */
    withTransition?: boolean;

    /**
     * Идентификатор для систем автоматизированного тестирования
     */
    dataTestId?: string;

    /**
     * Хранит функцию, с помощью которой можно обновить положение компонента
     */
    update?: MutableRefObject<(() => void) | undefined>;

    /**
     * Дополнительный класс
     */
    className?: string;

    /**
     * z-index компонента
     */
    zIndex?: number;

    /**
     * Если поповер не помещается в переданной позиции (position), он попробует открыться в другой позиции,
     * по очереди для каждой позиции из этого списка.
     * Если не передавать, то поповер открывается в противоположном направлении от переданного position.
     */
    fallbackPlacements?: Position[];

    /**
     * Контент
     */
    children?: ReactNode;

    /**
     *
     */
    scrollableContentClassName?: string;
};

const DEFAULT_TRANSITION: PopoverProps['transition'] = {
    timeout: 150,
};

const CSS_TRANSITION_CLASS_NAMES = {
    enter: styles.enter,
    enterActive: styles.enterActive,
    exit: styles.exit,
    exitActive: styles.exitActive,
};

const DEFAULT_OFFSET = [0, 0];

// Минимальное расстояние стрелки до края поповера
const MIN_DISTANCE_TO_EDGE = 24;

function getArrowPadding({
    placement,
}: {
    popper: { height: number; width: number };
    reference: { height: number; width: number };
    placement: Position;
}) {
    if (placement === 'right-end' || placement === 'left-end') {
        return { top: MIN_DISTANCE_TO_EDGE, right: 0, bottom: 0, left: 0 };
    }

    if (placement === 'top-start' || placement === 'bottom-start') {
        return { top: 0, right: MIN_DISTANCE_TO_EDGE, bottom: 0, left: 0 };
    }

    if (placement === 'right-start' || placement === 'left-start') {
        return { top: 0, right: 0, bottom: MIN_DISTANCE_TO_EDGE, left: 0 };
    }

    if (placement === 'top-end' || placement === 'bottom-end') {
        return { top: 0, right: 0, bottom: 0, left: MIN_DISTANCE_TO_EDGE };
    }

    return 0;
}

export const Popover = forwardRef<HTMLDivElement, PopoverProps>(
    (
        {
            children,
            getPortalContainer,
            transition = DEFAULT_TRANSITION,
            anchorElement,
            useAnchorWidth,
            offset = DEFAULT_OFFSET,
            withArrow = false,
            withTransition = true,
            position = 'left',
            preventFlip,
            popperClassName,
            arrowClassName,
            className,
            open,
            dataTestId,
            update,
            transitionDuration = `${transition.timeout}ms`,
            zIndex = stackingOrder.POPOVER,
            fallbackPlacements,
            preventOverflow = true,
            availableHeight = false,
            scrollableContentClassName,
        },
        ref,
    ) => {
        const [referenceElement, setReferenceElement] = useState<RefElement>(anchorElement);
        const [popperElement, setPopperElement] = useState<RefElement>(null);
        const [arrowElement, setArrowElement] = useState<RefElement>(null);
        const [maxSizeOptions, setMaxSizeOptions] = useState<
            Partial<ModifierOptions<typeof maxSize>>
        >(() => ({}));

        const updatePopperRef = useRef<() => void>();

        const popperRef = useRef<HTMLDivElement>(null);
        const innerRef = useRef<HTMLDivElement>(null);

        const popperModifiers = useMemo(() => {
            const modifiers: PopperModifier[] = [{ name: 'offset', options: { offset } }];

            if (withArrow) {
                modifiers.push({
                    name: 'arrow',
                    options: {
                        element: arrowElement,
                        padding: getArrowPadding,
                    },
                });
            }

            if (preventFlip) {
                modifiers.push({ name: 'flip', options: { fallbackPlacements: [] } });
            }

            if (fallbackPlacements) {
                modifiers.push({ name: 'flip', options: { fallbackPlacements } });
            }

            if (preventOverflow) {
                modifiers.push({ name: 'preventOverflow', options: { mainAxis: false } });
            }

            if (isFn(availableHeight) || availableHeight) {
                modifiers.push({ ...maxSize, options: maxSizeOptions });
            }

            return modifiers;
        }, [
            offset,
            withArrow,
            preventFlip,
            fallbackPlacements,
            preventOverflow,
            availableHeight,
            arrowElement,
            maxSizeOptions,
        ]);

        const {
            styles: popperStyles,
            attributes,
            update: updatePopper,
            state,
        } = usePopper(referenceElement, popperElement, {
            placement: position,
            modifiers: popperModifiers,
        });

        if (updatePopper) {
            updatePopperRef.current = updatePopper;
        }

        useLayoutEffect_SAFE_FOR_SSR(() => {
            const nextBoundry = isFn(availableHeight) ? availableHeight() ?? undefined : undefined;

            if (!(maxSizeOptions.boundary === nextBoundry)) {
                setMaxSizeOptions({ boundary: nextBoundry });
            }
        });

        useLayoutEffect_SAFE_FOR_SSR(() => {
            setReferenceElement(anchorElement);
        }, [anchorElement]);

        useEffect(() => {
            if (updatePopper) {
                updatePopper();
            }
        }, [updatePopper, arrowElement, children]);

        useEffect(() => {
            if (update && updatePopper) {
                // eslint-disable-next-line no-param-reassign
                update.current = updatePopper;
            }
        });

        useEffect(() => {
            if (useAnchorWidth) {
                const updatePopoverWidth = () => updatePopperRef.current?.();
                const ResizeObserver = window.ResizeObserver || ResizeObserverPolyfill;
                const observer = new ResizeObserver(updatePopoverWidth);

                if (anchorElement) {
                    observer.observe(anchorElement);
                }

                return () => {
                    observer.disconnect();
                };
            }

            return () => ({});
        }, [anchorElement, useAnchorWidth]);

        const renderContent = (computedZIndex: number) => (
            <div
                ref={mergeRefs([ref, popperRef, setPopperElement])}
                style={{
                    zIndex: computedZIndex,
                    width: useAnchorWidth ? referenceElement?.offsetWidth : undefined,
                    ...popperStyles.popper,
                    ...(popperStyles.popper?.transform ? null : { visibility: 'hidden' }),
                }}
                data-test-id={dataTestId}
                className={cn(styles.component, className)}
                {...attributes.popper}
            >
                <div
                    className={cn(styles.inner, popperClassName)}
                    ref={innerRef}
                    style={{
                        maxHeight:
                            isFn(availableHeight) || availableHeight
                                ? state?.modifiersData.maxSize?.height
                                : undefined,
                    }}
                >
                    <div
                        className={cn(scrollableContentClassName, {
                            [styles.scrollableContent]: isFn(availableHeight) || availableHeight,
                        })}
                    >
                        {children}
                    </div>

                    {withArrow && (
                        <div
                            ref={setArrowElement}
                            style={popperStyles.arrow}
                            className={cn(styles.arrow, arrowClassName)}
                        />
                    )}
                </div>
            </div>
        );

        return (
            <Stack value={zIndex}>
                {(computedZIndex) => (
                    <Portal getPortalContainer={getPortalContainer}>
                        {withTransition ? (
                            <CSSTransition
                                unmountOnExit={true}
                                classNames={CSS_TRANSITION_CLASS_NAMES}
                                nodeRef={popperRef}
                                {...transition}
                                in={open}
                                onEntering={(node: HTMLElement, isAppearing: boolean) => {
                                    // Меняем transition-duration только в случае, если передано значение отличное от дефолтного.
                                    if (
                                        innerRef.current &&
                                        transitionDuration !== `${DEFAULT_TRANSITION.timeout}ms`
                                    ) {
                                        innerRef.current.style.setProperty(
                                            'transition-duration',
                                            transitionDuration,
                                        );
                                    }
                                    transition?.onEntering?.(node, isAppearing);
                                }}
                            >
                                {renderContent(computedZIndex)}
                            </CSSTransition>
                        ) : (
                            open && renderContent(computedZIndex)
                        )}
                    </Portal>
                )}
            </Stack>
        );
    },
);

Popover.displayName = 'Popover';

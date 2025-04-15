import React, {
    CSSProperties,
    forwardRef,
    ForwardRefExoticComponent,
    ForwardRefRenderFunction,
    MutableRefObject,
    PropsWithoutRef,
    ReactNode,
    RefAttributes,
    RefObject,
    useImperativeHandle,
    useMemo,
    useRef,
    useState,
} from 'react';
import mergeRefs from 'react-merge-refs';
import { CSSTransition } from 'react-transition-group';
import { CSSTransitionProps } from 'react-transition-group/CSSTransition';
import {
    arrow,
    autoUpdate,
    flip,
    offset,
    Placement,
    shift,
    size,
    useFloating,
} from '@floating-ui/react-dom';
import cn from 'classnames';

import { Portal } from '@alfalab/core-components-portal';
import { Stack } from '@alfalab/core-components-stack';
import { stackingOrder } from '@alfalab/stack-context';

import styles from './index.module.css';

export type Position = Placement;

type RefElement = HTMLDivElement;

export type PopoverProps<AnchorElement extends HTMLElement = HTMLElement> = {
    /**
     * Управление состоянием поповера (открыт/закрыт)
     */
    open: boolean;

    /**
     * Элемент, относительного которого появляется поповер
     */
    anchorElement: AnchorElement | null | RefObject<AnchorElement>;

    /**
     * Использовать ширину родительского элемента
     * @default false
     */
    useAnchorWidth?: boolean;

    /**
     * Позиционирование поповера
     * @default left
     */
    position?: Position;

    /**
     * Запрещает поповеру менять свою позицию.
     * Например, если места снизу недостаточно, то он все равно будет показан снизу
     * @default false
     */
    preventFlip?: boolean;

    /**
     * Запрещает поповеру менять свою позицию, если он не влезает в видимую область.
     * @default true
     */
    preventOverflow?: boolean;

    /**
     * Позволяет поповеру подствраивать свою высоту под границы экрана, если из-за величины контента он выходит за рамки видимой области экрана
     * @default false
     */
    availableHeight?: boolean;

    /**
     * Если `true`, будет отрисована стрелочка
     * @default false
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
     * @default true
     */
    withTransition?: boolean;

    /**
     * Идентификатор для систем автоматизированного тестирования
     */
    dataTestId?: string;

    /**
     * Хранит функцию, с помощью которой можно обновить положение компонента
     * @deprecated Отсутствует необходимость использования в связи с миграцией на floating-ui
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
};

const DEFAULT_TRANSITION: NonNullable<PopoverProps['transition']> = {
    timeout: 150,
};

const CSS_TRANSITION_CLASS_NAMES = {
    enter: styles.enter,
    enterActive: styles.enterActive,
    exit: styles.exit,
    exitActive: styles.exitActive,
};

const DEFAULT_OFFSET: [number, number] = [0, 0];

// Минимальное расстояние стрелки до края поповера
const MIN_DISTANCE_TO_EDGE = 24;

function getArrowPadding(placement: Position) {
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

function PopoverRender<AnchorElement extends HTMLElement = HTMLElement>(
    ...[
        {
            children,
            getPortalContainer,
            transition = DEFAULT_TRANSITION,
            anchorElement,
            useAnchorWidth = false,
            offset: offsetFromProps = DEFAULT_OFFSET,
            withArrow = false,
            withTransition = true,
            position = 'left',
            preventFlip = false,
            popperClassName,
            arrowClassName,
            className,
            open,
            dataTestId,
            transitionDuration = `${transition.timeout}ms`,
            zIndex = stackingOrder.POPOVER,
            fallbackPlacements,
            preventOverflow = true,
            availableHeight = false,
            update: updateRef,
        },
        ref,
    ]: Parameters<ForwardRefRenderFunction<RefElement, PopoverProps<AnchorElement>>>
): ReturnType<ForwardRefRenderFunction<RefElement, PopoverProps<AnchorElement>>> {
    const arrowElementRef = useRef<HTMLDivElement>(null);
    const rootElementRef = useRef<RefElement>(null);
    const [height, setHeight] = useState<number>();
    const [width, setWidth] = useState<number>();

    const floatingMiddlewares = useMemo(() => {
        const [crossAxis, mainAxis] = offsetFromProps;
        const middlewares = [
            offset({ mainAxis, crossAxis }),
            flip({
                fallbackPlacements,
                mainAxis: !preventFlip,
                flipAlignment: false,
            }),
        ];

        if (!preventOverflow) {
            middlewares.push(shift());
        }

        middlewares.push(
            size({
                apply({ availableHeight: nextHeight, rects: { reference } }) {
                    setWidth(reference.width);
                    setHeight(nextHeight);
                },
            }),
        );

        if (withArrow) {
            middlewares.push(
                arrow((state) => ({
                    element: arrowElementRef,
                    padding: getArrowPadding(state.placement),
                })),
            );
        }

        return middlewares;
    }, [offsetFromProps, fallbackPlacements, preventFlip, withArrow, preventOverflow]);

    const { floatingStyles, refs, middlewareData, placement, update } = useFloating<HTMLElement>({
        placement: position,
        elements: {
            reference:
                anchorElement instanceof HTMLElement ? anchorElement : anchorElement?.current,
        },
        whileElementsMounted: autoUpdate,
        middleware: floatingMiddlewares,
        // strategy 'absolute' causes floating element resize on scroll so used 'fixed'
        strategy: 'fixed',
    });

    const renderContent = (computedZIndex: number) => (
        <div
            ref={mergeRefs([ref, rootElementRef, refs.setFloating])}
            style={{
                zIndex: computedZIndex,
                width: useAnchorWidth ? width : undefined,
                ...floatingStyles,
                ...(floatingStyles.transform ? null : { visibility: 'hidden' }),
            }}
            data-test-id={dataTestId}
            className={cn(styles.component, className)}
            data-popper-placement={placement}
        >
            <div
                className={cn(styles.inner, popperClassName)}
                style={
                    transitionDuration === `${DEFAULT_TRANSITION.timeout}ms`
                        ? undefined
                        : { transitionDuration }
                }
            >
                <div
                    className={cn({ [styles.scrollableContent]: availableHeight })}
                    style={{ height: availableHeight ? height : undefined }}
                >
                    {children}
                </div>
                {withArrow && (
                    <div
                        ref={arrowElementRef}
                        style={{
                            transform: `translate(${middlewareData.arrow?.x ?? 0}px, ${
                                middlewareData.arrow?.y ?? 0
                            }px)`,
                        }}
                        className={cn(styles.arrow, arrowClassName)}
                    />
                )}
            </div>
        </div>
    );

    useImperativeHandle(updateRef, () => update, [update]);

    return (
        <Stack value={zIndex}>
            {(computedZIndex) => (
                <Portal getPortalContainer={getPortalContainer}>
                    {withTransition ? (
                        <CSSTransition
                            unmountOnExit={true}
                            classNames={CSS_TRANSITION_CLASS_NAMES}
                            nodeRef={rootElementRef}
                            {...transition}
                            in={open}
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
}

export const Popover = forwardRef(PopoverRender) as ForwardRefExoticComponent<
    PropsWithoutRef<PopoverProps> & RefAttributes<RefElement>
> &
    (<AnchorElement extends HTMLElement = HTMLElement>(
        ...params: Parameters<
            ForwardRefExoticComponent<
                PropsWithoutRef<PopoverProps<AnchorElement>> & RefAttributes<RefElement>
            >
        >
    ) => ReturnType<
        ForwardRefExoticComponent<
            PropsWithoutRef<PopoverProps<AnchorElement>> & RefAttributes<RefElement>
        >
    >);

Popover.displayName = 'Popover';

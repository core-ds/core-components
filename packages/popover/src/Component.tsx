import React, {
    CSSProperties,
    forwardRef,
    MutableRefObject,
    ReactNode,
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
    offset as offsetMiddleware,
    Placement,
    useFloating,
} from '@floating-ui/react-dom';
import cn from 'classnames';

import { Portal } from '@alfalab/core-components-portal';
import { Stack } from '@alfalab/core-components-stack';
import { stackingOrder } from '@alfalab/stack-context';

import styles from './index.module.css';

type RefElement = HTMLElement | null;

export type Position = Placement;

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
     * Позволяет поповеру подствраивать свою высоту под границы экрана, если из-за величины контента он выходит за рамки видимой области экрана
     * @deprecated Отсутствует необходимость использования
     */
    availableHeight?: boolean;

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
     * @deprecated Отсутствует необходимость использования
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

const DEFAULT_TRANSITION: PopoverProps['transition'] = {
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

export const Popover = forwardRef<HTMLDivElement, PopoverProps>(
    (
        {
            children,
            getPortalContainer,
            transition = DEFAULT_TRANSITION,
            anchorElement: referenceElement,
            useAnchorWidth = false,
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
            transitionDuration = `${transition.timeout}ms`,
            zIndex = stackingOrder.POPOVER,
            fallbackPlacements,
            preventOverflow = true,
            availableHeight = false,
        },
        ref,
    ) => {
        const [arrowElement, setArrowElement] = useState<HTMLDivElement | null>(null);
        const popperRef = useRef<HTMLDivElement>(null);

        const floatingMiddlewares = useMemo(() => {
            const [crossAxis, mainAxis] = offset;
            const middlewares = [offsetMiddleware({ mainAxis, crossAxis })];

            if (withArrow) {
                middlewares.push(
                    arrow(
                        (state) => ({
                            element: arrowElement,
                            padding: getArrowPadding(state.placement),
                        }),
                        [arrowElement],
                    ),
                );
            }

            if (preventFlip || fallbackPlacements || preventOverflow) {
                middlewares.push(
                    flip({ flipAlignment: preventFlip, fallbackPlacements, mainAxis: false }),
                );
            }

            return middlewares;
        }, [offset, withArrow, preventFlip, fallbackPlacements, preventOverflow, arrowElement]);

        const { floatingStyles, refs, middlewareData, placement } = useFloating<HTMLElement>({
            placement: position,
            elements: { reference: referenceElement },
            whileElementsMounted: autoUpdate,
            middleware: floatingMiddlewares,
        });

        const renderContent = (computedZIndex: number) => (
            <div
                ref={mergeRefs([ref, popperRef, refs.setFloating])}
                style={{
                    zIndex: computedZIndex,
                    width: useAnchorWidth ? referenceElement?.offsetWidth : undefined,
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
                    <div className={cn({ [styles.scrollableContent]: availableHeight })}>
                        {children}
                    </div>
                    {withArrow && (
                        <div
                            ref={setArrowElement}
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

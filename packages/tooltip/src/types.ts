import type { MouseEvent, MutableRefObject, ReactElement, ReactNode } from 'react';
import React from 'react';

import type { BottomSheetProps } from '@alfalab/core-components-bottom-sheet';
import type { PopoverProps, Position } from '@alfalab/core-components-popover';

type Trigger = 'click' | 'hover';

export type TooltipDesktopProps = {
    /**
     * Контент тултипа
     */
    content: ReactNode;

    /**
     * Позиционирование тултипа
     */
    position?: Position;

    /**
     * Задержка перед открытием тултипа
     */
    onOpenDelay?: number;

    /**
     * Задержка перед закрытием тултипа
     */
    onCloseDelay?: number;

    /**
     * Обработчик открытия тултипа
     */
    onOpen?: () => void;

    /**
     * Обработчик закрытия тултипа
     */
    onClose?: () => void;

    /**
     * Событие, по которому происходит открытие тултипа
     */
    trigger?: Trigger;

    /**
     * Если `true`, то тултип будет открыт
     */
    open?: boolean;

    /**
     * Идентификатор для систем автоматизированного тестирования
     */
    dataTestId?: string;

    /**
     * Дочерние элементы тултипа.
     * При срабатывании событий на них, тултип будет открываться
     */
    children: ReactElement;

    /**
     * Смещение тултипа
     */
    offset?: [number, number];

    /**
     * Функция, возвращающая контейнер, в который будет рендериться тултип
     */
    getPortalContainer?: () => HTMLElement;

    /**
     * Дополнительный класс для стрелочки
     */
    arrowClassName?: string;

    /**
     * Дополнительный класс для контента
     */
    contentClassName?: string;

    /**
     * Дополнительный класс для поповера
     */
    popoverClassName?: string;

    /**
     * Дополнительный класс для обертки над дочерними элементами
     */
    targetClassName?: string;

    /**
     * Вид тултипа
     */
    view?: 'tooltip' | 'hint';

    /**
     * Хранит функцию, с помощью которой можно обновить положение компонента
     */
    updatePopover?: PopoverProps['update'];

    /**
     * z-index компонента
     */
    zIndex?: number;

    /**
     * Реф для обертки над дочерними элементами
     */
    targetRef?: MutableRefObject<HTMLElement | null>;

    /**
     * Если тултип не помещается в переданной позиции (position), он попробует открыться в другой позиции,
     * по очереди для каждой позиции из этого списка.
     * Если не передавать, то тултип открывается в противоположном направлении от переданного position.
     */
    fallbackPlacements?: PopoverProps['fallbackPlacements'];

    /**
     * Запрещает тултипу менять свою позицию, если он не влезает в видимую область.
     */
    preventOverflow?: PopoverProps['preventOverflow'];

    /**
     *  Позволяет тултипу подствраивать свою высоту под границы экрана, если из-за величины контента он выходит за рамки видимой области экрана
     */
    availableHeight?: PopoverProps['availableHeight'];

    /**
     *  Элемент, относительно которого будет позиционировать тултип.
     */
    anchor?: PopoverProps['anchorElement'];

    /**
     * Набор цветов для компонента
     */
    colors?: 'default' | 'inverted';

    /**
     * Использовать ширину родительского элемента
     */
    useAnchorWidth?: boolean;

    /**
     * Тэг для target обертки
     * @default div
     */
    targetTag?: 'div' | 'span';

    onTargetClick?: (event: MouseEvent<HTMLElement>) => void;
};

export type TooltipMobileProps = Omit<Partial<BottomSheetProps>, 'actionButton'> &
    Pick<
        TooltipDesktopProps,
        | 'content'
        | 'targetRef'
        | 'onOpen'
        | 'targetClassName'
        | 'children'
        | 'zIndex'
        | 'dataTestId'
        | 'getPortalContainer'
        | 'targetTag'
    > & {
        /**
         * Заголовок кнопки в футере
         */
        actionButtonTitle?: string;
    };

export type TooltipResponsiveProps = Omit<TooltipDesktopProps, 'onClose' | 'onOpen'> & {
    /**
     * Значение по-умолчанию для хука useMatchMedia
     */
    defaultMatchMediaValue?: boolean | (() => boolean);

    /**
     * Обработчик открытия
     */
    onOpen?: (event?: React.MouseEvent<HTMLElement>) => void;

    /**
     * Обработчик закрытия
     */
    onClose?: (event?: React.MouseEvent<HTMLElement>) => void;

    /**
     * Заголовок кнопки в футере
     */
    actionButtonTitle?: string;

    /**
     * Наличие компонента крестика
     * @deprecated(используйте bottomSheetProps.hasCloser)
     */
    hasCloser?: boolean;

    /**
     *  Дополнительные пропсы компонента BottomSheet
     */
    bottomSheetProps?: Partial<BottomSheetProps>;

    /**
     * Контрольная точка, с нее начинается desktop версия
     * @default 1024
     */
    breakpoint?: number;
};

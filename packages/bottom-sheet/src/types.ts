import type { HTMLAttributes, ReactElement, ReactNode, RefObject } from 'react';
import type { HandledEvents } from 'react-swipeable/es/types';
import type { TransitionProps } from 'react-transition-group/Transition';

import type { BaseModalProps } from '@alfalab/core-components-base-modal';
import type { NavigationBarPrivateProps as NavigationBarProps } from '@alfalab/core-components-navigation-bar-private';
import type { BackgroundColorType } from '@alfalab/core-components-types';

export type BottomSheetTitleAlign = 'center' | 'left';

export type BottomSheetProps = {
    /**
     * Метод, позволяющий донастраивать высоту контейнера для BottomSheet, например с учётом safe-area
     */
    adjustContainerHeight?: (height: number) => number;
    /**
     * Контент
     */
    children?: ReactNode;

    /**
     * Управление видимостью
     */
    open: boolean;

    /**
     * Заголовок
     */
    title?: ReactNode;

    /**
     * Размер заголовка
     */
    titleSize?: NavigationBarProps['titleSize'];

    /**
     * Подзаголовок.
     */
    subtitle?: NavigationBarProps['subtitle'];

    /**
     * Кнопка действия (обычно, это кнопка закрытия)
     */
    actionButton?: ReactNode;

    /**
     * Нода, компонент или функция возвращающая их
     *
     * Контейнер к которому будут добавляться порталы
     */
    container?: BaseModalProps['container'];

    /**
     * Рендерить ли в контейнер через портал.
     */
    usePortal?: BaseModalProps['usePortal'];

    /**
     * Дополнительный класс
     */
    className?: string;

    /**
     * Дополнительный класс
     */
    contentClassName?: string;

    /**
     * Дополнительные пропсы на контейнер.
     */
    containerProps?: HTMLAttributes<HTMLDivElement>;

    /**
     * Дополнительный класс
     */
    containerClassName?: string;

    /**
     * Цвет фона
     */
    backgroundColor?: Extract<BackgroundColorType, 'primary' | 'secondary'>;

    /**
     * Дополнительный класс шапки
     */
    headerClassName?: string;

    /**
     * Дополнительный класс футера
     */
    footerClassName?: string;

    /**
     * Дополнительный класс для аддонов
     */
    addonClassName?: string;

    /**
     * Дополнительный класс для компонента крестика
     */
    closerClassName?: string;

    /**
     * Дополнительный класс для компонента стрелки назад
     */
    backerClassName?: string;

    /**
     * Дополнительный класс для компонента модального окна
     */
    modalClassName?: string;

    /**
     * Дополнительный класс для обертки модального окна
     */
    modalWrapperClassName?: string;

    /**
     * Дефолтный маркер
     * @default true
     */
    showSwipeMarker?: boolean;

    /*
     * Дополнительный класс для маркера
     */
    swipeableMarkerClassName?: string;

    /**
     * Кастомный маркер
     */
    swipeableMarker?: ReactElement;

    /**
     * TransitionProps, прокидываются в компонент CSSTransitionProps.
     */
    transitionProps?: Partial<TransitionProps>;

    /**
     * Идентификатор для систем автоматизированного тестирования.
     * Для заголовка используется модификатор -header
     */
    dataTestId?: string;

    /**
     * z-index компонента
     */
    zIndex?: number;

    /**
     * Будет ли свайпаться шторка
     * @default true
     */
    swipeable?: boolean;

    /**
     * Будет ли свайпаться контент
     */
    swipeableContent?: boolean;

    /**
     * Порог свайпа
     */
    swipeThreshold?: number;

    /**
     * Слот слева
     */
    leftAddons?: ReactNode;

    /**
     * Слот справа
     */
    rightAddons?: ReactNode;

    /**
     * Слот снизу
     */
    bottomAddons?: ReactNode;

    /**
     * Наличие компонента крестика
     */
    hasCloser?: boolean;

    /**
     * Наличие компонента стрелки назад
     */
    hasBacker?: boolean;

    /**
     * Дополнительные пропсы для кнопки "Назад"
     */
    backButtonProps?: NavigationBarProps['backButtonProps'];

    /**
     * Выравнивание заголовка
     */
    titleAlign?: BottomSheetTitleAlign;

    /**
     * Фиксирует шапку
     */
    stickyHeader?: boolean;

    /**
     * Фиксирует футер
     */
    stickyFooter?: boolean;

    /**
     * Высота шторки
     */
    initialHeight?: 'default' | 'full';

    /**
     * Будет ли виден оверлэй
     */
    hideOverlay?: boolean;

    /**
     * Будет ли видна шапка
     */
    hideHeader?: boolean;

    /**
     * Будет ли обрезан заголовок
     */
    trimTitle?: boolean;

    /**
     * Запретить закрытие шторки кликом на оверлэй
     */
    disableOverlayClick?: boolean;

    /**
     * Отключает блокировку скролла при открытии модального окна
     */
    disableBlockingScroll?: boolean;

    /**
     * Отключает ловушку фокуса
     */
    disableFocusLock?: boolean;

    /**
     * @deprecated данный проп больше не используется, временно оставлен для обратной совместимости
     * Не анимировать шторку при изменении размера вьюпорта
     */
    ignoreScreenChange?: boolean;

    /**
     * Свойства для Бэкдропа
     */
    backdropProps?: BaseModalProps['backdropProps'];

    /**
     * Реф на контейнер, в котором происходит скролл
     */
    scrollableContainerRef?: RefObject<HTMLElement>;

    /**
     * Реф для управления компонентом.
     */
    bottomSheetInstanceRef?: RefObject<{ scrollToArea: (idx: number) => void }>;

    /**
     * Реф на контейнер, в котором находится шторка
     */
    sheetContainerRef?: RefObject<HTMLElement>;

    /**
     * Магнитные области видимой высоты шторки.
     * Можно использовать значения в пикселях - 10(число), либо в процентах - 10%(строка).
     * По-умолчанию -[0, window.innerHeight - '24px']
     * массив должен состоять минимум из 2 элементов
     */
    magneticAreas?: Array<number | string>;

    /**
     * Индекс точки из magneticAreas, к которому нужно примагнититься при первом открытии шторки.
     */
    initialActiveAreaIndex?: number;

    /**
     * Отключает скролл контентной области.
     */
    scrollLocked?: boolean;

    /**
     * Скрыть скроллбар внутри шторки
     */
    hideScrollbar?: boolean;

    /**
     * Верхний отступ шторки, если она открыта на максимальную высоту
     */
    headerOffset?: number;

    /**
     * Содержимое bottom-sheet всегда в DOM
     */
    keepMounted?: boolean;

    /**
     * Отключает автоматический перевод фокуса на bottom-sheet при открытии
     */
    disableAutoFocus?: boolean;

    /**
     * Отключает восстановление фокуса на предыдущем элементе после закрытия bottom-sheet
     */
    disableRestoreFocus?: boolean;

    /**
     * Отключает вызов `onClose` при нажатии Escape
     */
    disableEscapeKeyDown?: boolean;

    /**
     * Обработчик закрытия
     */
    onClose: () => void;

    /**
     * Обработчик нажатия на стрелку назад
     */
    onBack?: () => void;

    /**
     * Вызывается в начале анимации притягивания к одной из `magneticAreas`
     */
    onMagnetize?: (index: number) => void;

    /**
     * Вызывается после окончания анимации притягивания
     */
    onMagnetizeEnd?: (index: number) => void;

    /**
     * Вызывается при изменении положения шторки
     */
    onOffsetChange?: (offset: number, percent: number) => void;

    /**
     * Вызывается в начале свайпа
     */
    onSwipeStart?: (event: HandledEvents) => void;

    /**
     * Вызывается после окончания свайпа
     */
    onSwipeEnd?: (event: HandledEvents | null) => void;

    /**
     * Блокирует скролл когда модальное окно открыто. Работает только на iOS
     */
    iOSLock?: boolean;

    /**
     * Учитывать высоту виртуальной клавиатуры
     */
    virtualKeyboard?: boolean;
};

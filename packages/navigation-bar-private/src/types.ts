import React, { ElementType, ReactNode } from 'react';

import type { BackArrowAddonComponentProps } from './components/back-arrow-addon';
import type { CloserComponentProps } from './components/closer';

export type NavigationBarPrivateBaseProps = {
    /**
     * Контент шапки
     */
    children?: ReactNode;

    /**
     * Заголовок шапки
     */
    title?: ReactNode;

    /**
     * Подзаголовок (доступен только в мобильной версии)
     */
    subtitle?: ReactNode;

    /**
     * Размер заголовка (compact доступен только в мобильной версии)
     */
    titleSize?: 'default' | 'compact';

    /**
     * Доп. класс для аддонов
     */
    addonClassName?: string;

    /**
     * Слот слева
     */
    leftAddons?: ReactNode;

    /**
     * Слот справа
     */
    rightAddons?: ReactNode;

    /**
     * Дополнительный класс для closer
     */
    closerClassName?: string;

    /**
     * Слот снизу
     */
    bottomAddons?: ReactNode;

    /**
     * Наличие компонента крестика
     */
    hasCloser?: boolean;

    /**
     * Наличие кнопки "Назад"
     */
    hasBackButton?: boolean;

    /**
     * Дополнительный класс для правого аддона
     */
    backButtonClassName?: string;

    /**
     * Дополнительные пропсы для кнопки "Назад"
     */
    backButtonProps?: Omit<BackArrowAddonComponentProps, 'textOpacity' | 'onClick'>;

    /**
     * Дополнительный класс
     */
    className?: string;

    /**
     * Дополнительный класс для контента
     */
    contentClassName?: string;

    /**
     * Дополнительный класс для нижнего аддона
     */
    bottomAddonsClassName?: string;

    /**
     * Выравнивание заголовка
     */
    align?: 'left' | 'center';

    /**
     * Обрезать ли заголовок
     */
    trim?: boolean;

    /**
     * Фиксирует шапку
     */
    sticky?: boolean;

    /**
     * Идентификатор для систем автоматизированного тестирования
     */
    dataTestId?: string;

    /**
     * Фоновое изображение
     */
    imageUrl?: string;

    /**
     * Иконка closer.
     */
    closerIcon?: React.ElementType;

    /**
     * Обработчик закрытия
     */
    onClose?: CloserComponentProps['onClose'];

    /**
     * обработчик клика по кнопке "назад"
     */
    onBack?: () => void;

    /**
     * Ссылка на родительскую ноду overflow: auto
     */
    scrollableParentRef?: React.RefObject<HTMLDivElement>;
};

export type NavigationBarPrivateTransferProps = {
    BackArrowAddon: ElementType;
    Closer: ElementType;

    /**
     * Вид шапки - мобильный или десктоп
     */
    view: 'desktop' | 'mobile';
};

/** Общий тип для компонента */
export type NavigationBarPrivateComponentProps = NavigationBarPrivateBaseProps &
    NavigationBarPrivateTransferProps;

/** Общий публичный тип для desktop/mobile */
export type NavigationBarPrivateProps = NavigationBarPrivateBaseProps;

/** @deprecated Используйте типы NavigationBarPrivateDesktop / NavigationBarMobile  */
export type NavigationBarPrivateResponsiveProps = NavigationBarPrivateProps &
    Pick<NavigationBarPrivateTransferProps, 'view'>;

export type ContentParams = {
    extraClassName?: string;
    wrapperRef?: React.RefObject<HTMLDivElement>;
    style?: React.CSSProperties;
    hidden?: boolean;
};

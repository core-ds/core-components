import React, { ReactNode, RefObject } from 'react';

import { BackArrowAddonProps } from './components/back-arrow-addon';
import type { CloserProps } from './components/closer';

export type NavigationBarPrivateProps = {
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
    backButtonProps?: Omit<BackArrowAddonProps, 'view' | 'textOpacity' | 'onClick'>;

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
    onClose?: CloserProps['onClose'];

    /**
     * обработчик клика по кнопке "назад"
     */
    onBack?: () => void;

    /**
     * Вид шапки - мобильный или десктоп
     */
    view: 'desktop' | 'mobile';

    /**
     * Ссылка на родительскую ноду overflow: auto
     */
    scrollableParentRef?: React.RefObject<HTMLDivElement>;

    /**
     * Data атрибут для компонента
     */
    dataName?: string;

    /**
     * Дополнительный класс для title
     */
    titleClassName?: string;

    /**
     * Ref для title элемента
     */
    titleRef?: RefObject<HTMLDivElement>;
};

export type ContentParams = {
    extraClassName?: string;
    wrapperRef?: React.RefObject<HTMLDivElement>;
    style?: React.CSSProperties;
    hidden?: boolean;
};

import React, {ReactNode, RefObject} from 'react';

import type { CloserProps } from './components/closer';

export type NavigationBarProps = {
    /**
     * Контент шапки
     */
    children?: ReactNode;

    /**
     * Заголовок шапки
     */
    title?: string;

    /**
     * Подзаголовок (доступен только в мобильной версии)
     */
    subtitle?: string;

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
     * Ref крестика
     */
    closerRef?: RefObject<HTMLButtonElement>;

    /**
     * Наличие кнопки "Назад"
     */
    hasBackButton?: boolean;

    /**
     * Ref кнопки назад
     */
    backButtonRef?: RefObject<HTMLButtonElement>;

    /**
     * Дополнительный класс для правого аддона
     */
    backButtonClassName?: string;

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
};

export type ContentParams = {
    extraClassName?: string;
    ref?: React.RefObject<HTMLDivElement>;
    style?: React.CSSProperties;
    hidden?: boolean;
};

import { type CSSProperties, type ElementType, type ReactNode, type RefObject } from 'react';

import { type BackArrowAddonProps } from './components/back-arrow-addon';
import { type CloserProps } from './components/closer';

export type ColorType = 'default' | 'inverted';

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
     * @default left
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
    closerIcon?: ElementType;

    /**
     * Обработчик закрытия
     */
    onClose?: CloserProps['onClose'];

    /**
     * Дополнительные пропсы для компонента Closer.
     */
    closerProps?: Omit<CloserProps, 'view' | 'onClose'>;

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
    scrollableParentRef?: RefObject<HTMLDivElement>;

    /**
     * Data атрибут для компонента
     */
    dataName?: string;

    /**
     * Дополнительный класс для title
     */
    titleClassName?: string;

    /**
     * Дополнительный класс для subtitle
     */
    subtitleClassName?: string;

    /**
     * Ref для title элемента
     */
    titleRef?: RefObject<HTMLDivElement>;

    /**
     * Набор цветов для компонента
     */
    colors?: ColorType;
};

export type ContentParams = {
    extraClassName?: string;
    wrapperRef?: RefObject<HTMLDivElement>;
    style?: CSSProperties;
    hidden?: boolean;
    extraAlign?: NavigationBarPrivateProps['align'];
};

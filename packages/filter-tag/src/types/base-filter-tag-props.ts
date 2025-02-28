import { MouseEvent, ReactNode } from 'react';

export type BaseFilterTagProps = {
    /**
     * Состояние выбора
     */
    checked?: boolean;

    /**
     * Состояние открытия
     */
    open?: boolean;

    /**
     * Состояние блокировки
     */
    disabled?: boolean;

    /**
     * Обработчик клика
     */
    onClick?: (event: MouseEvent<HTMLDivElement>) => void;

    /**
     * Обработчик очистки
     */
    onClear?: () => void;

    /**
     * Контент
     */
    children?: ReactNode;

    /**
     * Идентификатор для систем автоматизированного тестирования
     */
    dataTestId?: string;

    /**
     * Размер компонента
     * @description xxs, xs, s deprecated, используйте вместо них 32, 40, 48 соответственно
     */
    size?: 'xxs' | 'xs' | 's' | 32 | 40 | 48;

    /**
     * Дополнительный класс
     */
    className?: string;

    /**
     * Показывать крестик для очистки выбора
     */
    showClear?: boolean;

    /**
     * Растягивает компонент на ширину контейнера
     * @default false
     */
    block?: boolean;

    /**
     * @deprecated данный проп больше не используется, временно оставлен для обратной совместимости
     * Используйте props shape и view
     * Вариант тега
     */
    variant?: 'default' | 'alt';

    /**
     * Форма тега
     */
    shape?: 'rounded' | 'rectangular';

    /**
     * Стиль тега
     */
    view?: 'outlined' | 'filled';

    /**
     * Набор цветов для компонента
     * @default default
     */
    colors?: 'default' | 'inverted';
};

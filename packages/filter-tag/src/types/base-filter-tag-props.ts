import { type MouseEvent, type ReactNode } from 'react';

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
     */
    size?: 32 | 40 | 48;

    /**
     * Дополнительный класс
     */
    className?: string;

    /**
     * Показывать крестик для очистки выбора
     * @default true
     */
    showClear?: boolean;

    /**
     * Показывать шеврон в выбранном состоянии
     * @default true
     */
    showArrow?: boolean;

    /**
     * Растягивает компонент на ширину контейнера
     * @default false
     */
    block?: boolean;

    /**
     * Форма тега
     * @default rounded
     */
    shape?: 'rounded' | 'rectangular';

    /**
     * Стиль тега
     */
    view?: 'outlined' | 'filled' | 'muted';

    /**
     * Набор цветов для компонента
     * @default default
     */
    colors?: 'default' | 'inverted';

    /**
     * Слот слева
     */
    leftAddons?: ReactNode;
};

export interface PageIndicatorDynamicProps {
    /**
     * Индекс выбранного элемента по-умолчанию
     * @default 0
     */
    defaultActiveElement?: number;
    /**
     * Индекс выбранного элемента
     */
    activeElement?: number;
    /**
     * Количество элементов (минимум 2)
     * @default 10
     */
    elements?: number;
    /**
     * Высота компонента
     * @default 8
     */
    size?: number;
    /**
     * Ширина выбранного элемента
     * @default size * 7
     */
    activeElementWidth?: number;
    /**
     * Расстояние между элементами
     * @default 8
     */
    gap?: number;
    /**
     * Продолжительность прогресса выбранного элемента, в миллисекундах
     * @default 3000
     */
    duration?: (activeElement: number) => number | number;
    /**
     * Обработчик при изменении выбранного элемента. Вызывается при заполнении прогресса предыдущего выбранного элемента
     */
    onActiveElementChange?: (nextActiveElement: number) => void;
    /**
     * Зациклен ли обход элементов
     * @default false
     */
    cycle?: boolean;
    /**
     * Активен ли прогресс выбранного элемента
     * @default true
     */
    active?: boolean;
    /**
     * Набор цветов для компонента
     * @default default
     */
    colors?: 'default' | 'inverted' | 'static' | 'static-inverted';
}

export interface PageIndicatorBulletProps {
    /**
     * Индекс выбранного элемента
     */
    activeElement: number;
    /**
     * Количество элементов (минимум 2)
     * @default 10
     */
    elements?: number;
    /**
     * Высота компонента
     * @default 8
     */
    size?: number;
    /**
     * Расстояние между элементами
     * @default 8
     */
    gap?: number;
    /**
     * Набор цветов для компонента
     * @default default
     */
    colors?: 'default' | 'inverted' | 'static' | 'static-inverted';
}

export interface PageIndicatorStepProps {
    /**
     * Индекс выбранного элемента
     */
    activeElement: number;
    /**
     * Количество элементов (минимум 2)
     * @default 10
     */
    elements?: number;
    /**
     * Высота компонента
     * @default 4
     */
    size?: number;
    /**
     * Расстояние между элементами
     * @default 4
     */
    gap?: number;
    /**
     * Набор цветов для компонента
     * @default default
     */
    colors?: 'default' | 'inverted' | 'static' | 'static-inverted';
}

export interface PageIndicatorRunnerProps {
    /**
     * Индекс выбранного элемента
     */
    activeElement: number;
    /**
     * Количество элементов (минимум 2)
     * @default 10
     */
    elements?: number;
    /**
     * Высота компонента
     * @default 4
     */
    size?: number;
    /**
     * Набор цветов для компонента
     * @default default
     */
    colors?: 'default' | 'inverted' | 'static' | 'static-inverted';
}

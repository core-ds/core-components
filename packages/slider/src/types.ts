type SubRange = number | [number] | [number, number];

/**
 * Типы отображения точек в noUiSlider pips
 *
 * @description
 * - -1: скрыть элемент
 * - 0: большая метка без точки (только число)
 * - 1: большая точка с числом
 * - 2: маленькая точка без числа
 */
export type PipsType = -1 | 0 | 1 | 2;

interface RangeOptions {
    min: SubRange;
    max: SubRange;
    [key: string]: SubRange;
}

export interface Pips {
    mode: 'range' | 'steps' | 'positions' | 'count' | 'values';
    values: number | number[];
    filter?: (value: number, type: PipsType) => PipsType;
    format?: {
        to: (value: number) => string | number;
        from?: (value: string) => number | false;
    };
    stepped?: boolean;
}

export interface SliderProps {
    /**
     * Мин. допустимое число
     */
    min?: number;

    /**
     * Макс. допустимое число
     */
    max?: number;

    /**
     * Шаг (должен нацело делить отрезок между мин и макс)
     */
    step?: number;

    /**
     * Отображение подписей
     * https://refreshless.com/nouislider/pips/
     */
    pips?: Pips;

    /**
     * Настройка шагов
     * https://refreshless.com/nouislider/pips/#section-range
     */
    range?: RangeOptions;

    /**
     * Флаг точной привязки к range
     * https://refreshless.com/nouislider/examples/#section-skipping
     */
    snap?: boolean;

    /**
     * Значение слайдера
     */
    value?: number;

    /**
     * Второе значение слайдера (значение второго ползунка)
     * если передать ValueTo, то слайдер будет работать как range
     */
    valueTo?: number;

    /**
     * Заблокированное состояние
     */
    disabled?: boolean;

    /**
     * Дополнительный класс
     */
    className?: string;

    /**
     * Поведение ползунка
     */
    behaviour?: 'unconstrained-tap' | 'tap';

    /**
     * Размер
     * @description s, m deprecated, используйте вместо них 2, 4 соответственно
     */
    size?: 's' | 'm' | 2 | 4;

    /**
     * Включение/отключение отображения точек на слайдере
     * @default false
     */
    dots?: boolean;

    /**
     * Тип отображения точек на слайдере: 'step' - по шагу, 'custom' - произвольные
     * @default 'step'
     */
    dotsSlider?: 'step' | 'custom';

    /**
     * Массив значений для произвольного размещения точек
     */
    customDots?: number[];

    /**
     * Включение/отключение отображения чисел под точками
     * Действует на все точки кроме customDots
     * @default true
     */
    showNumbers?: boolean;

    /**
     * Скрытие чисел только для кастомных точек
     * При hideCustomDotsNumbers=true числа скрываются только у customDots, остальные числа остаются видимыми
     * @default false
     */
    hideCustomDotsNumbers?: boolean;

    /**
     * Обработчик поля ввода
     */
    onChange?: (payload: { value: number; valueTo?: number }) => void;

    /**
     * @deprecated
     * Обработчик начала перетаскивания ползунка
     */
    onStart?: () => void;

    /**
     * Обработчик окончания перетаскивания ползунка
     * @description https://refreshless.com/nouislider/events-callbacks/#section-change
     */
    onEnd?: () => void;

    /**
     * Идентификатор для систем автоматизированного тестирования
     */
    dataTestId?: string;
}

export type CreatePipsConfigParams = {
    dotsSlider: 'step' | 'custom';
    pips?: Pips;
    pipsValues: number[];
    customDots: number[];
    hideCustomDotsNumbers: boolean;
    showNumbers: boolean;
} & Omit<Pips, 'mode' | 'values'>;

interface BasePipsParams {
    pipsValues: number[];
    customDots: number[];
    hideCustomDotsNumbers: boolean;
}

export interface PipsFilter extends BasePipsParams {
    mergeValues: number[];
}

export interface PipsFormat extends BasePipsParams {
    showNumbers: boolean;
}

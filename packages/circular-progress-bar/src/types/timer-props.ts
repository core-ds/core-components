export type TimerProps = {
    /**
     * В режиме timer=true компонент работает с секундами
     * Минимальное значение value=0
     * Максимальное значение value=3599
     * @default false
     */
    timer?: boolean;

    /**
     * forward: считаем от 0 до указанного значения
     * backward: считаем от указанного значения до 0
     * @default backward
     */
    counting?: 'forward' | 'backward';

    /**
     * Направление заполнения круга по мере отсчёта таймера
     * @default desc
     */
    directionType?: 'asc' | 'desc';
};

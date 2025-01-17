export type TimerProps = {
    /**
     * В режиме timer=true `Title` умеет работать с секундами.
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
     * Убывание или заполнение круга по мере отсчёта таймера
     * @default desc
     */
    directionType?: 'asc' | 'desc';
};

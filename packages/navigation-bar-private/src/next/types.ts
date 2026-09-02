import { type NavigationBarPrivateProps } from '../types';

export type NavigationBarPrivateNextProps = Omit<NavigationBarPrivateProps, 'align'> & {
    /**
     * Режим формулы компенсации отступов главной строки шапки
     * (см. `getUniversalModalTitleMargin`). Также определяет визуальное
     * выравнивание текста заголовка: `absolute` центрирует текст, `relative`
     * и `left` выравнивают его по левому краю.
     *
     * - `relative` — реальное центрирование с учётом фактической ширины
     *   left/right addons;
     * - `absolute` — математическое центрирование строки целиком, аддоны
     *   не учитываются;
     * - `left` — заглушка без какой-либо компенсации отступов (аналог
     *   `align='left'` в старом `NavigationBarPrivate`), текст заголовка
     *   всегда выровнен по левому краю.
     * @default relative
     */
    mainAlign?: 'left' | 'relative' | 'absolute';
};

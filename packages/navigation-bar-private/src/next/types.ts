import { type NavigationBarPrivateProps } from '../types';

// TODO ограничить доступ ко всем типам за исключением стилеобразующих
export type NavigationBarPrivateNextProps = Omit<
    NavigationBarPrivateProps,
    'align' | 'titleSize' | 'sticky' | 'imageUrl'
> & {
    /**
     * Фоновое изображение шапки
     *
     * - `src` — адрес изображения;
     * - `aspectRatio` — фиксированное соотношение сторон шапки (ширина / высота);
     * - `height` — фиксированная высота шапки.
     *
     * Задаётся либо `aspectRatio`, либо `height`. Контент может растянуть шапку по высоте.
     */
    image?: { src: string } & (
        | { aspectRatio: number; height?: never }
        | { height: number; aspectRatio?: never }
    );

    /**
     * Режим формулы компенсации отступов главной строки шапки
     *
     * - `relative` — реальное центрирование с учётом фактической ширины
     *   left/right addons;
     * - `absolute` — математическое центрирование строки целиком, аддоны
     *   не учитываются;
     * - `left` — заглушка без какой-либо компенсации отступов.
     * @default relative
     */
    headerMode?: 'left' | 'relative' | 'absolute';
};

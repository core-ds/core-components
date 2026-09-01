import { type NavigationBarPrivateProps } from '../types';

export type NavigationBarPrivateNextProps = Omit<NavigationBarPrivateProps, 'align'> & {
    /**
     * Режим формулы компенсации отступов главной строки шапки
     * (см. `getUniversalModalTitleMargin`). Не влияет на визуальное
     * выравнивание текста заголовка — см. `textAlign`.
     * @default left
     */
    mainAlign?: 'left' | 'center';

    /**
     * Визуальное выравнивание текста заголовка.
     * @default left
     */
    textAlign?: 'left' | 'center';
};

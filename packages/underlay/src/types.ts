import { BackgroundColorType, BorderColorType, ShadowType, GapType } from '../../types';

type PaddingSize = Omit<GapType, '5xl' | '6xl' | '7xl' | '8xl'>;

type PaddingType = {
    top?: PaddingSize;
    right?: PaddingSize;
    bottom?: PaddingSize;
    left?: PaddingSize;
};

type BorderRadiusType = 'm' | 'l' | 'xxl';

export type UnderlayProps = React.HTMLAttributes<HTMLDivElement> & {
    /**
     * Внутренние отступы
     */
    padding?: PaddingType | string;

    /**
     * Радиус
     */
    borderRadius?: BorderRadiusType;

    /**
     * Цвет фона
     */
    backgroundColor?: BackgroundColorType;

    /**
     * Ширина бордера
     */
    borderSize?: 1 | 2 | 4;

    /**
     * Цвет бордера
     */
    borderColor?: BorderColorType;

    /**
     * Тень
     */
    shadow?: ShadowType;

    /**
     * Дополнительный класс
     */
    className?: string;

    /**
     * Идентификатор для систем автоматизированного тестирования
     */
    dataTestId?: string;

    /**
     *  Содержимое подложки
     */
    children?: React.ReactNode;
};

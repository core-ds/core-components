import { type ElementType, type HTMLAttributes, type ReactNode } from 'react';

export type Size = 16 | 32 | 40 | 48 | 96 | 128 | 164;

export type OverlayProps = {
    /**
     * Набор цветов для компонента
     */
    colors?: 'default' | 'inverted';

    /**
     * Управление видимостью
     */
    visible?: boolean;
};

export type SingleCommonProps = {
    /**
     * Размер
     */
    size?: Size;

    /**
     * Идентификатор карты
     * (например: RM,SQ,SR)
     */
    cardId?: string;

    /**
     * Базовый URL сервиса с изображениями
     * (например: https://online.alfabank.ru/cards-images/cards/)
     */
    baseUrl?: string;

    /**
     * Какие слои показывать, через запятую без пробелов
     * (полный набор: BACKGROUND,CARD_NUMBER,CARD_HOLDER,PAY_PASS,CHIP,LOGO,PAYMENT_SYSTEM,RESERVED_1,RESERVED_2,VALID_DATE)
     */
    layers?: string;

    /**
     * Слот для иконки с оверлеем
     */
    icon?: ElementType;

    /**
     * Тень для компонента
     */
    shadow?: string;

    /**
     * Цвет иконки
     */
    iconColor?: string;

    /**
     * Фон для компонента
     */
    backgroundColor?: string;

    /**
     * Бордер для компонента
     */
    borderColor?: string;

    /**
     * Настройки оверлея
     */
    overlayProps?: OverlayProps;

    /**
     * Кнопка показать номер карты
     */
    eyeButton?: boolean;

    /**
     * Дополнительный класс
     */
    className?: string;

    /**
     * Имя владельца карты в верхнем регистре
     */
    cardholderNameUppercase?: boolean;

    /**
     * Имя владельца карты
     */
    cardholderName?: string;

    /**
     * Номер карты
     */
    cardNumber?: number;

    /**
     * (Устаревший) Количество карт
     * @deprecated Используйте 'numberOfCards'
     */
    numberOfСards?: number;

    /**
     * Количество карт
     */
    numberOfCards?: number;

    /**
     * Управление ориентацией стопки карт компонента
     */
    align?: 'bottom' | 'default';

    /**
     * Слот для кастомного контента компонента
     */
    contentAddons?: ReactNode;

    /**
     * Свойства для обертки кастомного контента
     */
    contentAddonsProps?: HTMLAttributes<HTMLDivElement>;

    /**
     * Обработчик клика по кнопке 'показать номер карты'
     */
    onEyeIconClick?: () => void;

    /**
     * Идентификатор для систем автоматизированного тестирования
     */
    dataTestId?: string;
};

// eslint-disable-next-line no-restricted-syntax
export type SingleProps = Omit<SingleCommonProps, 'numberOfСards' | 'numberOfCards' | 'align'>;

export type BankCardImageProps = Omit<
    SingleCommonProps,
    // eslint-disable-next-line no-restricted-syntax
    'size' | 'numberOfСards' | 'numberOfCards' | 'className' | 'dataTestId' | 'align'
>;

export type SizeStack = Exclude<Size, 48 | 96 | 164>;

export type ConditionalProps =
    | {
          /**
           * Размер
           */
          size?: SizeStack;

          /**
           * Управление ориентацией стопки карт компонента
           * для размеров 16, 32 - default (ориентация только вправо и вниз)
           * для размера 40 -  default или bottom (ориентация вправо и вниз или вниз)
           * для размера 164 - default (ориентация только влево)
           * @default default
           */
          align?: 'default';
      }
    | { size?: 40; align?: 'bottom' | 'default' };

export type StackProps = ConditionalProps & {
    /**
     * Дополнительный класс
     */
    className?: string;

    /**
     * Свойства для первой карты
     */
    firstCard?: BankCardImageProps;

    /**
     * Свойства для второй карты
     */
    secondCard?: BankCardImageProps;

    /**
     * (Устаревший) Количество карт
     * @deprecated Используйте 'numberOfCards'
     */
    numberOfСards?: number;

    /**
     * Количество карт
     */
    numberOfCards?: number;

    /**
     * Идентификатор для систем автоматизированного тестирования
     */
    dataTestId?: string;
};

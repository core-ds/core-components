import { ElementType } from 'react';

export type Size = [16, 24] | [32, 51] | [40, 65] | [48, 76] | [96, 152] | [128, 205] | [164, 264];

export type ImageProps = {
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
     * Фоновое изображение
     * (например: https://online.alfabank.ru/cards-images/cards/)
     */
    imageUrl?: string;

    /**
     * Какие слои показывать, через запятую без пробелов
     * (полный набор: BACKGROUND,CARD_NUMBER,CARD_HOLDER,PAY_PASS,CHIP,LOGO,PAYMENT_SYSTEM,RESERVED_1,RESERVED_2,VALID_DATE)
     */
    layers?: string;

    /**
     * Слот для иконки с оверлеем
     */
    statusIcon?: ElementType;

    /**
     * Тень для компонента
     */
    shadow?: string;

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
     * Количество карт
     */
    numberOfСards?: number;

    /**
     * Номер карты
     */
    maskedCardNumber?: number;

    /**
     * Набор цветов для компонента
     */
    colors?: 'default' | 'inverted';

    /**
     * Обработчик клика по кнопке 'показать номер карты'
     */
    onEyeIconClick?: () => void;

    /**
     * Идентификатор для систем автоматизированного тестирования
     */
    dataTestId?: string;
};

export type BankCardImageProps = Omit<
    ImageProps,
    'size' | 'numberOfСards' | 'className' | 'dataTestId'
>;

export type SizeStack = Exclude<Size, [96, 152] | [128, 205]>;

export type StackProps = {
    /**
     * Дополнительный класс
     */
    className?: string;

    /**
     * Размер
     */
    size?: SizeStack;

    /**
     * Свойства для первой карты
     */
    firstCard?: BankCardImageProps;

    /**
     * Свойства для второй карты
     */
    secondCard?: BankCardImageProps;

    /**
     * Количество карт
     */
    numberOfСards?: number;

    /**
     * Идентификатор для систем автоматизированного тестирования
     */
    dataTestId?: string;
};

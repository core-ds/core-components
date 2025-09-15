import { BankCardImageProps } from '@alfalab/core-components-product-cover/typings';
import { BaseSelectProps } from '@alfalab/core-components-select/shared';

export interface CardData {
    number: string;
    expiryDate?: string | Date;
    cvv?: string;
}

export interface CardAddingProps {
    /**
     * Идентификатор для тестирования
     */
    dataTestId?: string;

    /**
     * Контент для элемента добавления новой карты
     */
    content: React.ReactNode;

    /**
     * Обработчик ввода для новой карты
     */
    onInput?: (value: CardData) => void;

    /**
     * Обработчик отправки новой карты
     */
    onSubmit?: (value: CardData) => void;

    /**
     * Данные карты для отображения
     */
    cardImage?: Pick<
        BankCardImageProps,
        'baseUrl' | 'layers' | 'cardId' | 'backgroundColor' | 'borderColor'
    >;

    /**
     * Нужно ли отображать поле для ввода CVV
     */
    needCvv?: boolean;

    /**
     * Нужно ли отображать поле для ввода срока действия карты
     */
    needExpiryDate?: boolean;

    /**
     * Нужно ли отправлять срок действия карты в формате Date
     */
    expiryAsDate?: boolean;
}

export interface AccountSelectProps
    extends Omit<
        BaseSelectProps,
        | 'autocomplete'
        | 'Field'
        | 'nativeSelect'
        | 'searchProps'
        | 'showSearch'
        | 'Search'
        | 'valueRenderer'
    > {
    /**
     * Пропсы для добавления новой карты
     */
    cardAddingProps?: CardAddingProps;
}

export interface AccountSelectResonsiveProps extends AccountSelectProps {
    /**
     * Контрольная точка, с нее начинается desktop версия
     * @default 1024
     */
    breakpoint?: number;

    /**
     * Версия, которая будет использоваться при серверном рендеринге
     */
    client?: 'desktop' | 'mobile';
}

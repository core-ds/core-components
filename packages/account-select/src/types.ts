import { BaseSelectProps } from '@alfalab/core-components-select/shared';

export interface CardData {
    number: string;
    expiryDate: string;
    cvv: string;
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
     * Включить возможность добавления новой карты
     */
    hasNewCardAdding?: boolean;

    /**
     * Обработчик ввода для новой карты
     */
    onInput?: (value: CardData) => void;

    /**
     * Обработчик отправки новой карты
     */
    onSubmit?: (value: CardData) => void;
}

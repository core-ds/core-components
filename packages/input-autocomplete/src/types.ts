import type { ChangeEvent, FC, RefAttributes } from 'react';

import type { InputProps } from '@alfalab/core-components-input';
import type {
    BaseSelectProps,
    BottomSheetSelectMobileProps,
} from '@alfalab/core-components-select/shared';

export interface InputAutocompleteCommonProps
    extends Omit<
        BaseSelectProps,
        'autocomplete' | 'Field' | 'nativeSelect' | 'searchProps' | 'showSearch' | 'Search'
    > {
    /**
     * Компонент ввода значения
     */
    Input?: FC<InputProps & RefAttributes<HTMLInputElement>>;

    /**
     * Пропсы, которые будут прокинуты в инпут
     */
    inputProps?: InputProps & Record<string, unknown>;

    /**
     * Значение поля ввода
     */
    value?: string;

    /**
     * Поле доступно только для чтения
     */
    readOnly?: InputProps['readOnly'];

    /**
     * Отображение иконки успеха
     */
    success?: boolean;

    /**
     * Обработчик ввода
     */
    onInput?: (event: ChangeEvent<HTMLInputElement> | null, payload: { value: string }) => void;
}

type MobileProps = {
    /**
     *  Открывать в bottom-sheet
     */
    isBottomSheet?: boolean;

    /**
     * Пропсы анимации контента (CSSTransition)
     */
    transitionProps?: NonNullable<
        BottomSheetSelectMobileProps['bottomSheetProps']
    >['transitionProps'];

    /**
     * Обработчик нажатия на кнопку «Продолжить» в BottomSheet
     */
    onApply?: () => void;

    /**
     * Обработчик нажатия на кнопку «Отмена» в BottomSheet
     */
    onCancel?: () => void;
};

export type InputAutocompleteMobileProps = InputAutocompleteCommonProps & MobileProps;

export interface InputAutocompleteProps extends InputAutocompleteCommonProps {
    /**
     *  Пропсы для мобильного компонента
     */
    mobileProps?: MobileProps;

    /**
     * Контрольная точка, с нее начинается desktop версия
     * @default 1024
     */
    breakpoint?: number;

    /**
     * Значение по-умолчанию для хука useMatchMedia
     */
    defaultMatchMediaValue?: boolean | (() => boolean);
}

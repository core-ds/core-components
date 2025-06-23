import type { ComponentType, RefAttributes } from 'react';

import type { InputProps } from '@alfalab/core-components-input';
import type {
    BaseSelectProps,
    BottomSheetSelectMobileProps,
} from '@alfalab/core-components-select/shared';

type OnInputTypeReason = 'close' | 'change';

export interface InputAutocompleteCommonProps
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
     * Компонент ввода значения
     */
    Input?: ComponentType<InputProps & RefAttributes<HTMLInputElement>>;

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
    onInput?: (value: string, reason?: OnInputTypeReason) => void;
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
     * Обработчик нажатия на кнопку «Продолжить» в BottomSheet или модальном окне
     */
    onApply?: () => void;

    /**
     * Обработчик нажатия на кнопку «Отмена» в BottomSheet или модальном окне
     */
    onCancel?: () => void;

    /**
     * Заголовок в модальном окне или шторке.
     * Если не передан, то заголовок будет совпадать с label. Если не передан и label, то заголовок будет равен placeholder
     */
    title?: string;

    /**
     * Учитывать высоту виртуальной клавиатуры в BottomSheet
     * @default false
     */
    virtualKeyboard?: boolean;
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
     * Версия, которая будет использоваться при серверном рендеринге
     */
    client?: 'desktop' | 'mobile';

    /**
     * Значение по-умолчанию для хука useMatchMedia
     * @deprecated Используйте client
     */
    defaultMatchMediaValue?: boolean | (() => boolean);
}

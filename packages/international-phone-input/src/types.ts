import type { ChangeEvent, ElementType, FC } from 'react';
import { FocusEvent } from 'react';

import type { InputProps } from '@alfalab/core-components-input';
import type { InputDesktopProps } from '@alfalab/core-components-input/desktop';
import type { InputMobileProps } from '@alfalab/core-components-input/mobile';
import type { InputAutocompleteProps } from '@alfalab/core-components-input-autocomplete';
import type { InputAutocompleteDesktopProps } from '@alfalab/core-components-input-autocomplete/desktop';
import type { InputAutocompleteMobileProps } from '@alfalab/core-components-input-autocomplete/mobile';
import { OptionShape } from '@alfalab/core-components-select/typings';

import type { SharedCountrySelectProps } from './components/country-select';

export type Country = {
    name: string;
    regions?: string[];
    iso2: string;
    countryCode: string;
    dialCode: string;
    format?: string;
    priority: number;
    mainCode?: boolean;
};

export type AreaItem = Country & {
    isAreaCode: boolean;
    areaCodeLength: number;
};

type CommonPhoneInputProps = {
    /**
     *  Выбранная страна
     */
    country?: Country;

    /**
     * Список необходимых iso2 стран
     */
    countries?: string[];

    /**
     * Дефолтный код страны
     */
    defaultIso2?: string;

    /**
     * Возможность стереть код страны
     */
    clearableCountryCode?: boolean;

    /**
     *  Свойства селекта выбора стран
     */
    countrySelectProps?: SharedCountrySelectProps;

    /**
     *Показывать крестик очистки
     */
    clear?: boolean;

    /**
     * Функция фильтрации номеров для автокомплита
     */
    filterFn?: (value: string | undefined, option: OptionShape) => boolean;

    /**
     * Обработчик события изменения страны
     */
    onCountryChange?: (country?: Country) => void;

    /**
     *  Обработчик изменения номера
     */
    onChange?: (e: ChangeEvent<HTMLInputElement> | null, { value }: { value: string }) => void;

    /**
     * Обработчик блюра поля
     */
    onBlur?: (event: FocusEvent<HTMLDivElement | HTMLInputElement>) => void;

    /**
     * Обработчик фокуса поля
     */
    onFocus?: (event: FocusEvent<HTMLDivElement | HTMLInputElement>) => void;
};

export type BaseInternationalPhoneInputProps = CommonPhoneInputProps & {
    Input: FC<InputProps>;
    InputAutocomplete: FC<InputAutocompleteProps>;
    SelectComponent: ElementType;
    view: 'desktop' | 'mobile';
    countriesData: Country[][];
} & Omit<InputProps, 'onFocus' | 'onBlur' | 'onScroll'> &
    Partial<Omit<InputAutocompleteProps, 'onChange' | 'leftAddons' | 'onScroll'>>;

export type InternationalPhoneInputDesktopProps = CommonPhoneInputProps &
    (
        | ({ options?: never } & Omit<
              InputDesktopProps,
              'onFocus' | 'onBlur' | 'clear' | 'onClear' | 'onChange'
          >)
        | ({ options: InputAutocompleteDesktopProps['options'] } & Omit<
              InputAutocompleteDesktopProps,
              'onChange'
          >)
    );

export type InternationalPhoneInputMobileProps = CommonPhoneInputProps &
    (
        | ({ options?: never } & Omit<
              InputMobileProps,
              'onFocus' | 'onBlur' | 'clear' | 'onClear' | 'onChange'
          >)
        | ({ options: InputAutocompleteMobileProps['options'] } & Omit<
              InputAutocompleteMobileProps,
              'onChange' | 'onFilter' | 'filter' | 'onClearFilter'
          >)
    );

export type InternationalPhoneInputProps = InternationalPhoneInputDesktopProps &
    InternationalPhoneInputMobileProps & {
        /**
         * Контрольная точка, с нее начинается desktop версия
         * @default 1024
         */
        breakpoint?: number;

        /**
         * Значение по-умолчанию для хука useMatchMedia
         */
        defaultMatchMediaValue?: boolean | (() => boolean);
    };

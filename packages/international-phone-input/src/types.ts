import type { ElementType, FC, FocusEvent } from 'react';

import type { InputProps } from '@alfalab/core-components-input';
import type { InputDesktopProps } from '@alfalab/core-components-input/desktop';
import type { InputMobileProps } from '@alfalab/core-components-input/mobile';
import type { InputAutocompleteProps } from '@alfalab/core-components-input-autocomplete';
import type { InputAutocompleteDesktopProps } from '@alfalab/core-components-input-autocomplete/desktop';
import type { InputAutocompleteMobileProps } from '@alfalab/core-components-input-autocomplete/mobile';
import type { OptionShape } from '@alfalab/core-components-select/typings';
import type { Country } from '@alfalab/core-components-types';

import type { SharedCountrySelectProps } from './components/country-select';
import type { CountriesData } from './data/country-data';

export type { Country } from '@alfalab/core-components-types';

export type AreaItem = Country & {
    isAreaCode: boolean;
    areaCodeLength: number;
};

export type CommonPhoneInputProps = {
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
     * Список правил парсинга номеров телефонов по странам (для переопределения дефолтного)
     */
    customCountriesList?: CountriesData[];

    /**
     * Возможность стереть код страны
     * @default true
     * @description Используйте `'preserve'` для сохранения кода страны при автозаполнении (актуально для Safari). При этом код страны можно удалить в случае использования `true`
     */
    clearableCountryCode?: boolean | 'preserve';

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
    onChange?: (phone: string) => void;

    /**
     * Обработчик блюра поля
     */
    onBlur?: (event: FocusEvent<HTMLDivElement | HTMLInputElement>) => void;

    /**
     * Обработчик фокуса поля
     */
    onFocus?: (event: FocusEvent<HTMLDivElement | HTMLInputElement>) => void;

    /**
     * Включить автозаполнение номера
     *
     * @default true
     */
    autoFill?: boolean;
};

export type BaseInternationalPhoneInputProps = CommonPhoneInputProps & {
    Input: FC<InputProps>;
    InputAutocomplete: FC<InputAutocompleteProps>;
    SelectComponent: ElementType;
    view: 'desktop' | 'mobile';
} & Omit<InputProps, 'onFocus' | 'onBlur' | 'onScroll' | 'onInput' | 'onChange'> &
    Partial<Omit<InputAutocompleteProps, 'onChange' | 'leftAddons' | 'onScroll' | 'onInput'>>;

export type InternationalPhoneInputDesktopProps = CommonPhoneInputProps &
    (
        | Omit<
              InputDesktopProps,
              'onFocus' | 'onBlur' | 'clear' | 'onClear' | 'onChange' | 'onInput'
          >
        | (Required<Pick<InputAutocompleteDesktopProps, 'options'>> &
              Omit<InputAutocompleteDesktopProps, 'onChange' | 'onInput' | 'onClear'>)
    );

export type InternationalPhoneInputMobileProps = CommonPhoneInputProps &
    (
        | Omit<
              InputMobileProps,
              'onFocus' | 'onBlur' | 'clear' | 'onClear' | 'onChange' | 'onInput'
          >
        | (Required<Pick<InputAutocompleteMobileProps, 'options'>> &
              Omit<InputAutocompleteMobileProps, 'onChange' | 'onInput' | 'onClear'>)
    );

export type InternationalPhoneInputProps = InternationalPhoneInputDesktopProps &
    InternationalPhoneInputMobileProps & {
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
    };

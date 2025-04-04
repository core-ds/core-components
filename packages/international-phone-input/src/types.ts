import type { ElementType, FC } from 'react';
import { FocusEvent } from 'react';

import type { InputProps } from '@alfalab/core-components-input';
import type { InputDesktopProps } from '@alfalab/core-components-input/desktop';
import type { InputMobileProps } from '@alfalab/core-components-input/mobile';
import type { InputAutocompleteProps } from '@alfalab/core-components-input-autocomplete';
import type { InputAutocompleteDesktopProps } from '@alfalab/core-components-input-autocomplete/desktop';
import type { InputAutocompleteMobileProps } from '@alfalab/core-components-input-autocomplete/mobile';
import { OptionShape } from '@alfalab/core-components-select/typings';

import { Country } from '../../types';

import type { SharedCountrySelectProps } from './components/country-select';
import { CountriesData } from './data/country-data';

export { Country };

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
     * Размер компонента
     * @description s, m, l, xl deprecated, используйте вместо них 48, 56, 64, 72 соответственно
     */
    size?: 's' | 'm' | 'l' | 'xl' | 48 | 56 | 64 | 72;

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
        | ({ options?: never } & Omit<
              InputDesktopProps,
              'onFocus' | 'onBlur' | 'clear' | 'onClear' | 'onChange' | 'onInput'
          >)
        | ({ options: InputAutocompleteDesktopProps['options'] } & Omit<
              InputAutocompleteDesktopProps,
              'onChange' | 'onInput'
          >)
    );

export type InternationalPhoneInputMobileProps = CommonPhoneInputProps &
    (
        | ({ options?: never } & Omit<
              InputMobileProps,
              'onFocus' | 'onBlur' | 'clear' | 'onClear' | 'onChange' | 'onInput'
          >)
        | ({ options: InputAutocompleteMobileProps['options'] } & Omit<
              InputAutocompleteMobileProps,
              'onChange' | 'onInput'
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
         * Версия, которая будет использоваться при серверном рендеринге
         */
        client?: 'desktop' | 'mobile';

        /**
         * Значение по-умолчанию для хука useMatchMedia
         * @deprecated Используйте client
         */
        defaultMatchMediaValue?: boolean | (() => boolean);
    };

import { type ButtonPropsFactory } from '@alfalab/core-components-button/components/base-button-candidate';
import { type ButtonLayoutOwnProps } from '@alfalab/core-components-button/typings';

type OmitStrict<T, K extends keyof T> = Omit<T, K>;

export interface ComponentProps extends OmitStrict<ButtonLayoutOwnProps, 'layout'> {
    /**
     * Цвет кнопки
     */
    backgroundColor?: string;

    /**
     * Цвет контента
     */
    contentColor?: 'black' | 'white' | 'static-black' | 'static-white';

    /**
     * Затемнение или осветление кнопки при hover и active
     */
    stateType?: 'darkening' | 'lightening' | 'static-darkening' | 'static-lightening';

    /**
     * Блокировка кнопки
     */
    disabled?: boolean;

    /**
     * Тип цвета для заблокированного состояния
     * @default default
     */
    disableType?: 'default' | 'static' | 'inverted' | 'static-inverted';
}

interface ResponsiveProps {
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

export type CommonCustomButtonProps = ButtonPropsFactory<ComponentProps>;

export type CustomButtonProps = CommonCustomButtonProps & ResponsiveProps;

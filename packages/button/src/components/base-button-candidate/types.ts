import {
    type AnchorHTMLAttributes,
    type ButtonHTMLAttributes,
    type ComponentPropsWithoutRef,
    type ComponentType,
    type ElementType,
    type ReactNode,
} from 'react';

export interface DisableAttributes {
    /**
     * Заблокировать кнопку
     */
    disabled?: boolean;
}

export interface MaybeAnchorAttributes<T extends string | undefined> {
    /**
     * Выводит ссылку в виде кнопки
     */
    href?: T;
}

export interface BaseButtonContentProps {
    dataTestId?: string;
    loaderClassName?: string;
    loading?: boolean;
    children?: ReactNode;
}

export type ButtonComponentProps = DisableAttributes & ComponentPropsWithoutRef<'a' | 'button'>;

export interface BaseButtonCandidateOwnProps extends DisableAttributes {
    /**
     * Растягивает компонент на ширину контейнера
     * @default false
     */
    block?: boolean;

    /**
     * Дополнительный класс
     */
    className?: string;

    /**
     * Дополнительный класс для лоадера
     */
    loaderClassName?: string;

    /**
     * Дополнительный класc при отключении кнопки
     */
    disabledClassName?: string;

    /**
     * Идентификатор для систем автоматизированного тестирования
     * Для лоадера используется постфикс `${dataTestId}-loader`
     */
    dataTestId?: string;

    /**
     * Показать лоадер
     * @default false
     */
    loading?: boolean;

    /**
     * Кастомный компонент для кнопки
     */
    Component?: ElementType<ComponentPropsWithoutRef<'a' | 'button'>, 'a' | 'button'>;

    Content?: ComponentType<BaseButtonContentProps>;
}

type AnchorLikeProps<T> = MaybeAnchorAttributes<string> &
    T &
    Omit<AnchorHTMLAttributes<HTMLElement>, keyof T>;

type ButtonLikeProps<T> = MaybeAnchorAttributes<undefined> &
    T &
    Omit<ButtonHTMLAttributes<HTMLElement>, keyof T>;

export type ButtonPropsFactory<T> = AnchorLikeProps<T> | ButtonLikeProps<T>;

export type BaseButtonCandidateProps = ButtonPropsFactory<BaseButtonCandidateOwnProps>;

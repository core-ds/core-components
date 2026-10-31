import {
    type ComponentProps,
    type ComponentPropsWithoutRef,
    type ElementType,
    type RefAttributes,
} from 'react';

import {
    type ComposedPolymorphicProps,
    type PolymorphicComponentProps,
} from '@alfalab/core-components-polymorphic';

export interface DisableAttributes {
    /**
     * Заблокировать кнопку
     */
    disabled?: boolean;
    /**
     * Класс для заблокированной кнопки.
     * Используется в случае, когда выводится ссылка в виде кнопки.
     */
    disabledClassName?: string;
}

export interface MaybeAnchorAttributes<T extends string | undefined> {
    /**
     * Выводит ссылку в виде кнопки
     */
    href?: T;
}

export type ButtonPropsFactory<P, T extends string | undefined> = MaybeAnchorAttributes<T> &
    Omit<P, keyof MaybeAnchorAttributes<T> | keyof DisableAttributes> &
    DisableAttributes;

export type AnchorProps = ButtonPropsFactory<ComponentPropsWithoutRef<'a'>, string> &
    RefAttributes<HTMLElement>;

export type ButtonProps = ButtonPropsFactory<ComponentPropsWithoutRef<'button'>, undefined> &
    RefAttributes<HTMLElement>;

export type BaseButtonProps = AnchorProps | ButtonProps;

export type HeadlessButtonProps = PolymorphicComponentProps<
    | ElementType<ComposedPolymorphicProps<ComponentProps<'a'>>, 'a'>
    | ElementType<ComposedPolymorphicProps<ComponentProps<'button'>>, 'button'>,
    ComposedPolymorphicProps<{ componentProps: BaseButtonProps }>
>;

import { type ComponentProps, type ElementType, type ReactNode } from 'react';

import { type ButtonComponentProps } from '@alfalab/core-components-button/shared/base-button/pure-types';
import {
    type ComposedPolymorphicProps,
    type PolymorphicComponentProps,
} from '@alfalab/core-components-polymorphic';

export interface NoStyleButtonCustomProps {
    /**
     * Позволяет использовать кастомный компонент для кнопки (например Link из роутера)
     * @deprecated Используйте проп `as`
     */
    Component?: ElementType;

    /**
     * Идентификатор для систем автоматизированного тестирования
     * Для лоадера используется постфикс `-loader`
     */
    dataTestId?: string;

    /**
     * Дочерние элементы
     */
    children?: ReactNode;
}

export interface BaseButtonCustomProps extends NoStyleButtonCustomProps {
    /**
     * Форма кнопки
     * @default rectangular
     */
    shape?: 'rounded' | 'rectangular';

    /**
     * Ширина текстового контента
     * @default hug
     */
    textResizing?: 'fill' | 'hug';

    /**
     *  Подпись под лейблом (видна только в размерах >= 56)
     */
    hint?: ReactNode;

    /**
     * Слот слева
     */
    leftAddons?: ReactNode;

    /**
     * Слот справа
     */
    rightAddons?: ReactNode;

    /**
     * Размер компонента
     * @default 56
     */
    size?: 32 | 40 | 48 | 56 | 64 | 72;

    /**
     * Растягивает компонент на ширину контейнера
     * @default false
     */
    block?: boolean;
    /**
     * Показать лоадер
     * @default false
     */
    loading?: boolean;

    /**
     * Дополнительный класс при загрузке
     */
    loadingClassName?: string;

    /**
     * Дополнительный класс для спиннера
     * @deprecated Используйте `loaderClassName`
     */
    spinnerClassName?: string;

    /**
     * Дополнительный класс для лоадера
     */
    loaderClassName?: string;

    /**
     * Не переносить текст кнопки на новую строку
     * @default false
     */
    nowrap?: boolean;
    /**
     * Дополнительный класс для label
     */
    labelClassName?: string;

    /**
     * Дополнительный класс для hint
     */
    hintClassName?: string;

    /**
     * Основные стили компонента
     */
    styles?: { [key: string]: string };

    /**
     * Лэйаут кнопки
     */
    layout?: 'button' | 'text';
}

export type BaseButtonProps = BaseButtonCustomProps &
    PolymorphicComponentProps<
        | ElementType<ComposedPolymorphicProps<ComponentProps<'a'>>, 'a'>
        | ElementType<ComposedPolymorphicProps<ComponentProps<'button'>>, 'button'>
    > &
    ButtonComponentProps;

export type NoStyleButtonProps = NoStyleButtonCustomProps &
    PolymorphicComponentProps<
        | ElementType<ComposedPolymorphicProps<ComponentProps<'a'>>, 'a'>
        | ElementType<ComposedPolymorphicProps<ComponentProps<'button'>>, 'button'>
    > &
    ButtonComponentProps;

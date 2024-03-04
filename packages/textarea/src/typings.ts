import React, { ChangeEvent, ReactNode, TextareaHTMLAttributes } from 'react';

type NativeProps = TextareaHTMLAttributes<HTMLTextAreaElement>;

export type TextareaProps = Omit<
    NativeProps,
    'size' | 'style' | 'value' | 'defaultValue' | 'onChange'
> &
    TextareaIncomeProps;

export type TextareaIncomeProps = {
    /**
     * Значение поля ввода
     */
    value?: string;

    /**
     * Начальное значение поля
     */
    defaultValue?: string;

    /**
     * Растягивает компонент на ширину контейнера
     */
    block?: boolean;

    /**
     * Размер компонента
     * @description s, m, l, xl deprecated, используйте вместо них 48, 56, 64, 72 соответственно
     */
    size?: 's' | 'm' | 'l' | 'xl' | 48 | 56 | 64 | 72;

    /**
     * Набор цветов для компонента
     */
    colors?: 'default' | 'inverted';

    /**
     * Отображение ошибки
     */
    error?: ReactNode | boolean;

    /**
     * Текст подсказки
     */
    hint?: ReactNode;

    /**
     * Лейбл компонента
     */
    label?: React.ReactNode;

    /**
     * Вид лейбла внутри / снаружи
     */
    labelView?: 'inner' | 'outer';

    /**
     * Слот слева
     */
    leftAddons?: React.ReactNode;

    /**
     * Слот справа
     */
    rightAddons?: React.ReactNode;

    /**
     * Слот под компонентом
     */
    bottomAddons?: React.ReactNode;

    /**
     * Дополнительный класс
     */
    className?: string;

    /**
     * Дополнительный класс для поля
     */
    fieldClassName?: string;

    /**
     * Дополнительный класс textarea
     */
    textareaClassName?: string;

    /**
     * Управление возможностью подстраивать высоту компонента под высоту текста
     */
    autosize?: boolean;

    /**
     * Максимальное количество отображаемых строк (работает только вместе с autosize)
     */
    maxRows?: number;

    /**
     * Минимальное количество отображаемых строк (работает только вместе c autosize)
     */
    minRows?: number;

    /**
     * Максимальная высота элемента
     */
    maxHeight?: number;

    /**
     * Управление возможностью изменения размеров компонента (не работает вместе c autosize)
     */
    resize?: 'vertical' | 'none';

    /**
     * Обработчик ввода
     */
    onChange?: (event: ChangeEvent<HTMLTextAreaElement>, payload: { value: string }) => void;

    /**
     * Обработчик события изменения высоты компонента (работает только вместе c autosize)
     */
    onHeightChange?: (height?: number) => void;

    /**
     * Идентификатор для систем автоматизированного тестирования.
     * Для FormControl используется модификатор -form-control
     */
    dataTestId?: string;

    /**
     * Максимальное количество символов (native prop)
     */
    maxLength?: number;

    /**
     * Показывать счетчик введенных символов
     */
    showCounter?: boolean;

    /**
     * Функция, возвращающая текст для счетчика
     */
    getCounterText?: (textLength: number, maxLength?: number) => string;

    /**
     * Нужно ли использовать нативный скроллбар.
     */
    nativeScrollbar?: boolean;

    /**
     * Разрешить переполнение, если количество символов превышает maxLength
     */
    allowOverflow?: boolean;

    /**
     * Контрольная точка, с нее начинается desktop версия
     * @default 1024
     */
    breakpoint?: number;
};

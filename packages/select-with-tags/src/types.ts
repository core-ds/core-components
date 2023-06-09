import type { ChangeEvent, FC, ReactNode } from 'react';

import type { BaseSelectProps, OptionShape } from '@alfalab/core-components-select/shared';
import type { TagProps as TagPropsBase } from '@alfalab/core-components-tag';

export type OptionMatcher = (option: OptionShape, inputValue: string) => boolean;

export type TagProps = {
    option: OptionShape;
    handleDeleteTag?: (key: string) => void;
} & Omit<TagPropsBase, 'breakpoint'>;

export type TagComponent = FC<TagProps>;

export type SelectWithTagsProps = Omit<
    BaseSelectProps,
    'Field' | 'nativeSelect' | 'multiple' | 'autocomplete' | 'selected' | 'onChange'
> & {
    /**
     * Значение поля ввода
     */
    value: string;

    /**
     * Обработчик ввода
     */
    onInput: (event: ChangeEvent<HTMLInputElement>) => void;

    /**
     * Список выбранных пунктов (controlled-селект)
     */
    selected?: Array<OptionShape | string>;

    /**
     * Обработчик выбора
     */
    onChange?: (payload: {
        selectedMultiple: Array<OptionShape | string>;
        initiator?: OptionShape | null;
        name?: string;
    }) => void;

    /**
     * Режим автокомплита
     */
    autocomplete?: boolean;

    /**
     * Функция сравнения при поиске
     */
    match?: OptionMatcher;

    /**
     * Компонент Тэг
     */
    Tag?: TagComponent;

    /**
     * Показывать тэги только в одном ряду, а если не помещаются в один ряд - схлопнуть в одну кнопку
     */
    collapseTagList?: boolean;

    /**
     * Если текст не помещается в инпут, то нужно перенести инпут на новую строку.
     */
    moveInputToNewLine?: boolean;

    /**
     * Трансформировать текст компонента Тэг который отображает общее количество выбранных элементов
     */
    transformCollapsedTagText?: (collapsedCount: number) => string;

    /**
     * Трансформировать текст компонента Тэг
     */
    transformTagText?: (tagText?: ReactNode) => ReactNode;

    /**
     * Контрольная точка, с нее начинается desktop версия
     * @default 1024
     */
    breakpoint?: number;
};

import { CATEGORY } from './constant';

type CategoryType = typeof CATEGORY;

type Nullable<T> = T | null;

type EventParams = {
    /**
     * Категория события
     */
    category: CategoryType[keyof CategoryType];

    /**
     * Действие click, dnd
     * @default 'click'
     */
    action?: string;

    /**
     * Описание
     */
    label?: Nullable<string>;

    /**
     * Свойство
     */
    property?: Nullable<string>;

    /**
     * Значение
     */
    value?: Nullable<string>;

    /**
     * Пользовательские данные
     */
    dimension_1?: Nullable<string>;
    /**
     * Пользовательские данные
     */
    dimension_2?: Nullable<string>;
};

export const trackEvent = ({
    category,
    action = 'click',
    label,
    property,
    value,
    dimension_1,
    dimension_2,
}: EventParams) => {
    window.sp('trackStructEvent', category, action, label, property, value, [
        {
            schema: 'iglu:com.alfabank/custom_dimension/jsonschema/1-0-0',
            data: {
                '1': dimension_1,
                '2': dimension_2,
            },
        },
    ]);
};

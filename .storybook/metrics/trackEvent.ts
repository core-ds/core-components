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
};

const trackEvent = ({ category, action = 'click', label, property, value }: EventParams) => {
    window.sp('trackStructEvent', category, action, label, property, value);
};

export const TRACK_EVENT = {
    USER: () => {
        trackEvent({ category: CATEGORY.USERS, action: 'Page view' });
    },
    DOCS: (property: string) => {
        trackEvent({
            category: CATEGORY.COMPONENT,
            label: 'Docs',
            property,
        });
    },
    CANVAS: (property: string) => {
        trackEvent({
            category: CATEGORY.COMPONENT,
            label: 'Canvas',
            property,
        });
    },
    SEARCH_VALUE: (property: string) => {
        trackEvent({
            category: CATEGORY.SEARCH_VALUE,
            property,
        });
    },
};

import React, { Children, ReactNode } from 'react';
import cn from 'classnames';

import { Item } from './components/item';
import { isItem } from './utils';

import styles from './index.module.css';

export type TListContext = {
    /**
     * Упорядоченный список
     */
    orderedList?: boolean;

    /**
     * Маркер
     * @default '–' for ul and 'decimal' for ol
     */
    markerType?: 'lower-alpha' | 'decimal' | string | ReactNode;

    /**
     * Цвет маркера
     */
    colorMarker?: ColorMarkerType;

    /**
     * Список обратного счета
     */
    reversed?: boolean;

    /**
     * Номер пункта
     */
    index?: number;

    /**
     * Начало отсчета элементов списка
     */
    start?: number;
};

export const ListContext = React.createContext<TListContext>({});

type ColorMarkerType =
    | 'tertiary'
    | 'accent'
    | 'primary'
    | 'attention'
    | 'positive'
    | 'secondary'
    | 'tertiary-inverted'
    | 'primary-inverted'
    | 'secondary-inverted'
    | 'link'
    | 'negative';

export type ListProps = {
    /**
     * HTML тег
     * @default 'ul'
     */
    tag?: 'ul' | 'ol';

    /**
     * Маркер
     * @default '–' for ul and 'decimal' for ol
     */
    marker?: 'lower-alpha' | 'decimal' | string | ReactNode;

    /**
     * Css-класс для стилизации
     */
    className?: string;

    /**
     * Цвет маркера
     */
    colorMarker?: ColorMarkerType;

    /**
     * Список обратного счета
     */
    reversed?: boolean;

    /**
     * Начало отсчета элементов списка
     */
    start?: number;

    /**
     * Id компонента для тестов
     */
    dataTestId?: string;

    /**
     * Дочерние элементы
     */
    children?: ReactNode;
} & Omit<React.OlHTMLAttributes<HTMLOListElement>, 'type'>;

const ListComponent: React.FC<ListProps> = ({
    tag = 'ul',
    marker,
    className,
    dataTestId,
    colorMarker,
    children,
    reversed,
    start,
    ...restProps
}) => {
    const markerType = marker || (tag === 'ul' ? '–' : 'decimal');
    const alphaMarker = markerType === 'lower-alpha';
    const decimalMarker = markerType === 'decimal';
    const Component = tag === 'ul' || alphaMarker ? 'ul' : 'ol';

    const orderedList = Component === 'ol';

    const listClassNames = cn(
        styles.list,
        {
            [styles.lowerAlpha]: alphaMarker,
            [styles.decimal]: decimalMarker,
            [styles.reversed]: reversed,
        },
        className,
    );

    /* eslint-disable react/jsx-no-constructed-context-values */
    return (
        <Component className={listClassNames} data-test-id={dataTestId} {...restProps}>
            {Children.map(children, (child, index) => (
                <ListContext.Provider
                    value={{ orderedList, markerType, colorMarker, reversed, index, start }}
                >
                    {isItem(child) ? child : <Item>{child}</Item>}
                </ListContext.Provider>
            ))}
        </Component>
    );
};

export const List = Object.assign(ListComponent, {
    Item,
});

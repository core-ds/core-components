import React, { Children, ReactNode, useMemo } from 'react';
import cn from 'classnames';

import { ListItem } from './components/item';
import { isListItem } from './utils';

import styles from './index.module.css';

export type ListContext = {
    /**
     * Упорядоченный список
     */
    orderedList?: boolean;

    /**
     * Маркер
     * @default '—' for ul and 'decimal' for ol
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
};

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const ListContext = React.createContext<ListContext>({});

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
     * @default '—' for ul and 'decimal' for ol
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
    const markerType = marker || (tag === 'ul' ? '—' : 'decimal');
    const alphaMarker = markerType === 'lower-alpha';
    const decimalMarker = markerType === 'decimal';
    const Component = tag === 'ul' || alphaMarker ? 'ul' : 'ol';

    const orderedList = Component === 'ol';

    const listClassNames = cn(
        styles.ui,
        styles.list,
        colorMarker && styles[`color-marker-${colorMarker}`],
        {
            [styles.lowerAlpha]: alphaMarker,
            [styles.decimal]: decimalMarker,
            [styles.orderedList]: orderedList,
            [styles.reversed]: reversed,
        },
        className,
    );

    const ComponentProviderValue = useMemo(
        () => ({ orderedList, markerType, colorMarker, reversed }),
        [orderedList, markerType, colorMarker, reversed],
    );

    return (
        <Component
            className={listClassNames}
            style={{
                ...(start && { counterSet: `ordered ${start - 1}` }),
            }}
            data-test-id={dataTestId}
            {...restProps}
        >
            {isListItem(children) ? (
                <ListContext.Provider value={ComponentProviderValue}>
                    {children}
                </ListContext.Provider>
            ) : (
                Children.map(children, (child) => (
                    <ListContext.Provider value={ComponentProviderValue}>
                        <ListItem>{child}</ListItem>
                    </ListContext.Provider>
                ))
            )}
        </Component>
    );
};

export const List = Object.assign(ListComponent, {
    ListItem,
});

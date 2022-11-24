import React, { Children, ReactNode } from 'react';
import cn from 'classnames';

import styles from './index.module.css';

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
     * Id компонента для тестов
     */
    dataTestId?: string;

    /**
     * Дочерние элементы.
     */
    children?: ReactNode;
} & Omit<React.OlHTMLAttributes<HTMLOListElement>, 'type'>;
export const List: React.FC<ListProps> = ({
    tag = 'ul',
    marker,
    className,
    dataTestId,
    children,
    ...restProps
}) => {
    const markerType = marker || (tag === 'ul' ? '—' : 'decimal');
    const orderedMarker = markerType === 'decimal' || markerType === 'lower-alpha';
    const Component = tag === 'ol' || orderedMarker ? 'ol' : 'ul';
    const unorderedList = Component === 'ul';
    const orderedList = Component === 'ol';

    const listClassNames = cn(
        styles.list,
        {
            [styles.lowerAlpha]: markerType === 'lower-alpha',
            [styles.decimal]: markerType === 'decimal',
            [styles.orderedList]: orderedList,
        },
        className,
    );
    const itemClassNames = cn(styles.item, {
        [styles.unorderedItem]: unorderedList,
        [styles.orderedItem]: orderedList,
    });

    return (
        <Component className={listClassNames} data-test-id={dataTestId} {...restProps}>
            {Children.map(children, (child) => (
                <li className={itemClassNames}>
                    {unorderedList && <div className={styles.slot}>{markerType}</div>}
                    {child}
                </li>
            ))}
        </Component>
    );
};

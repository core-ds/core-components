import React, { ReactNode, useContext } from 'react';
import { Text } from '@balafla/core-components-typography';
import cn from 'classnames';

import { ListContext } from '../../Component';

import styles from './index.module.css';

export type ItemProps = {
    /**
     * Дополнительный текст
     */
    caption?: string;

    /**
     * Дочерние элементы.
     */
    children?: ReactNode;

    /**
     * Дополнительный класс
     */
    className?: string;

    /**
     * Дополнительный класс для маркера
     */
    markerClassName?: string;
};

export const Item: React.FC<ItemProps> = ({ caption, children, className, markerClassName }) => {
    const {
        orderedList,
        markerType,
        colorMarker,
        reversed,
        index = 0,
        start = 0,
    } = useContext(ListContext);

    const markerLowerAlpha = markerType === 'lower-alpha';

    const itemClassNames = cn(styles.item, className, {
        [styles.unorderedItem]: markerLowerAlpha,
        [styles.reversed]: reversed,
    });

    const isDisc = markerType === '•';

    const count = start === 0 ? index + 1 : start + index;
    const marker = orderedList || markerType === 'decimal' ? `${count}.` : markerType;

    return (
        <li className={cn(itemClassNames)}>
            {!markerLowerAlpha && (
                <Text
                    tag='div'
                    color={colorMarker}
                    monospaceNumbers={true}
                    view='primary-medium'
                    className={cn(styles.slot, markerClassName, {
                        [styles.disc]: isDisc && !orderedList,
                        [styles.defaultColor]: !colorMarker,
                    })}
                >
                    {marker}
                </Text>
            )}
            <div>
                <Text tag='div' view='primary-medium'>
                    {children}
                </Text>
                {caption && (
                    <Text
                        tag='div'
                        view='primary-small'
                        color='secondary'
                        className={styles.caption}
                    >
                        {caption}
                    </Text>
                )}
            </div>
        </li>
    );
};

Item.displayName = 'ListItem';

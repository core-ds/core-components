import React, { useContext, ReactNode } from 'react';
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
};

export const Item: React.FC<ItemProps> = ({ caption, children }) => {
    const {
        orderedList,
        markerType,
        colorMarker,
        reversed,
        index = 0,
        start = 0,
    } = useContext(ListContext);

    const markerLowerAlpha = markerType === 'lower-alpha';

    const itemClassNames = cn(styles.item, {
        [styles.unorderedItem]: markerLowerAlpha,
        [styles.orderedItem]: orderedList,
        [styles.reversed]: reversed,
    });

    const isDisc = markerType === '•';

    const count = start !== 0 ? start + index : index + 1;
    const marker = orderedList || markerType === 'decimal' ? `${count}.` : markerType;

    return (
        <li className={cn(itemClassNames)}>
            {!markerLowerAlpha && (
                <div
                    className={cn(
                        styles.slot,
                        colorMarker && styles[`color-marker-${colorMarker}`],
                        { [styles.disc]: isDisc && !orderedList },
                    )}
                >
                    {marker}
                </div>
            )}
            <div className={styles.content}>
                <span className={styles.children}>{children}</span>
                {caption && <div className={styles.caption}>{caption}</div>}
            </div>
        </li>
    );
};

Item.displayName = 'ListItem';

import React, { ReactNode, useContext } from 'react';
import cn from 'classnames';
import { ListContext } from '../../Component';

import styles from './index.module.css';

export type ListItemProps = {
    /**
     * Дополнительный текст
     */
    caption?: string;

    /**
     * Дочерние элементы.
     */
    children?: ReactNode;
};

export const ListItem: React.FC<ListItemProps> = ({ caption, children }) => {
    const { orderedList, markerType, colorMarker, reversed } = useContext(ListContext);

    const markerLowerAlpha = markerType === 'lower-alpha';

    const itemClassNames = cn(styles.item, {
        [styles.unorderedItem]: markerLowerAlpha,
        [styles.orderedItem]: orderedList,
        [styles.reversed]: reversed,
    });

    const isDisc = markerType === '•';
    return (
        <li className={cn(itemClassNames)}>
            {!orderedList && !markerLowerAlpha && (
                <div
                    className={cn(
                        styles.slot,
                        colorMarker && styles[`color-marker-${colorMarker}`],
                        { [styles.disc]: isDisc },
                    )}
                >
                    {markerType}
                </div>
            )}
            <div className={styles.content}>
                <span className={styles.children}>{children}</span>
                {caption && <div className={styles.caption}>{caption}</div>}
            </div>
        </li>
    );
};

import React, { ReactNode, useContext } from 'react';
import cn from 'classnames';

import { Typography } from '@alfalab/core-components-typography';

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
        [styles.reversed]: reversed,
    });

    const isDisc = markerType === '•';

    const count = start !== 0 ? start + index : index + 1;
    const marker = orderedList || markerType === 'decimal' ? `${count}.` : markerType;

    return (
        <li className={cn(itemClassNames)}>
            {!markerLowerAlpha && (
                <Typography.Text
                    tag='div'
                    color={colorMarker}
                    monospaceNumbers={true}
                    view='primary-medium'
                    className={cn(styles.slot, {
                        [styles.disc]: isDisc && !orderedList,
                        [styles.defaultColor]: !colorMarker,
                    })}
                >
                    {marker}
                </Typography.Text>
            )}
            <div>
                <Typography.Text tag='div' view='primary-medium'>
                    {children}
                </Typography.Text>
                {caption && (
                    <Typography.Text
                        tag='div'
                        view='primary-small'
                        color='secondary'
                        className={styles.caption}
                    >
                        {caption}
                    </Typography.Text>
                )}
            </div>
        </li>
    );
};

Item.displayName = 'ListItem';

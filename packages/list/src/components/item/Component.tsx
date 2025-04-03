import React, { ReactNode, useContext } from 'react';
import cn from 'classnames';

import { TypographyText } from '@alfalab/core-components-typography';

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
                <TypographyText
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
                </TypographyText>
            )}
            <div>
                <TypographyText tag='div' view='primary-medium'>
                    {children}
                </TypographyText>
                {caption && (
                    <TypographyText
                        tag='div'
                        view='primary-small'
                        color='secondary'
                        className={styles.caption}
                    >
                        {caption}
                    </TypographyText>
                )}
            </div>
        </li>
    );
};

Item.displayName = 'ListItem';

import React, { ElementType, FC } from 'react';
import cn from 'classnames';

import defaultColors from './default.module.css';
import styles from './index.module.css';
import invertedColors from './inverted.module.css';

const colorStyles = {
    default: defaultColors,
    inverted: invertedColors,
};

export type OverlayProps = {
    /**
     * Слот для иконки с оверлеем
     */
    icon?: ElementType;

    /**
     * Набор цветов для компонента
     */
    colors?: 'default' | 'inverted';
};

export const Overlay: FC<OverlayProps> = ({ icon: Icon, colors = 'default' }) => (
    <div className={cn(styles.overlay, colorStyles[colors].overlayBackground)}>
        {Icon && <Icon className={colorStyles[colors].iconColor} />}
    </div>
);

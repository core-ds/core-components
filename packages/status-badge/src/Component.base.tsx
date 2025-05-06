import React from 'react';
import cn from 'classnames';

import type { IconMap } from './consts/iconMap';
import { useStatusBadgeIcon } from './hooks/useStatusBadgeIcon';
import {
    StatusBadgeCustomIcon,
    StatusBadgeSizes,
    StatusBadgeViews,
} from './types/statusBadgePropTypes';

import defaultColors from './default.module.css';
import styles from './index.module.css';
import invertedColors from './inverted.module.css';

const colorStyles = {
    default: defaultColors,
    inverted: invertedColors,
};

export type StatusBadgeProps = {
    /**
     * Дополнительный класс
     */
    className?: string;

    /**
     * Размер компонента
     * @default 24
     */
    size?: StatusBadgeSizes;

    /**
     * Набор цветов для компонента
     */
    colors?: 'default' | 'inverted';

    /**
     * Вид бейджа.
     */
    view: StatusBadgeViews;

    /**
     * Идентификатор для систем автоматизированного тестирования
     */
    dataTestId?: string;

    /**
     * Кастомные иконки
     */
    customIcons?: StatusBadgeCustomIcon | StatusBadgeCustomIcon[];
};

type StatusBadgePrivateProps = {
    /**
     * Базовый набор иконок
     */
    iconMap: IconMap;
};

export const StatusBadgeBase = ({
    className,
    dataTestId,
    size = 24,
    view,
    colors = 'default',
    customIcons,
    iconMap,
}: StatusBadgeProps & StatusBadgePrivateProps) => {
    const { Icon } = useStatusBadgeIcon(view, size, iconMap, customIcons);

    return (
        <div
            className={cn(
                styles.component,
                className,
                styles[`size-${size}`],
                colorStyles[colors].component,
                colorStyles[colors][view],
            )}
            data-test-id={dataTestId}
        >
            <Icon />
        </div>
    );
};

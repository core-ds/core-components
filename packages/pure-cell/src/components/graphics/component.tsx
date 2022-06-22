import React from 'react';
import { Typography, Color } from '@alfalab/core-components-typography';
import { CDNIcon } from '@alfalab/core-components-cdn-icon';
import { Badge } from '@alfalab/core-components-badge';
import { SuperEllipse } from '@alfalab/core-components-icon-view/super-ellipse';
import cn from 'classnames';
import { GraphicsElement } from '../types';
import { getDataTestId } from '../../../../utils/getDataTestId';

import styles from './index.module.css';

export type Props = {
    /**
     * Компоненты
     */
    children: GraphicsElement;

    /**
     * Текст иконки
     */
    title?: string;

    /**
     * Цвет текста
     */
    titleColor?: Color;

    /**
     * Название иконки
     */
    iconName?: string;

    /**
     * Цвет иконки
     */
    iconColor?: string;

    /**
     * Цвет фона под иконкой
     */
    backgroundColor?: string;

    /**
     * Слот снизу
     */
    bottomBadgeSource?: boolean;

    /**
     * Название слота снизу
     */
    bottomBadgeName?: string;

    /**
     * Индикатор слота снизу
     */
    indicatorBottomBadge?: number;

    /**
     * Цвет слота снизу
     */
    bottomBadgeColor?:
        | 'positive'
        | 'attention'
        | 'link'
        | 'negative'
        | 'tertiary'
        | 'secondary'
        | 'primary';

    /**
     * Слот cверху
     */
    topBadgeSource?: boolean;

    /**
     * Индикатор слота cверху
     */
    indicatorTopBadge?: number;

    /**
     * Название слота cверху
     */
    topBadgeName?: string;

    /**
     * Цвет слота cверху
     */
    topBadgeColor?:
        | 'positive'
        | 'attention'
        | 'link'
        | 'negative'
        | 'tertiary'
        | 'secondary'
        | 'primary';

    /**
     * Идентификатор для систем автоматизированного тестирования
     */
    dataTestId?: string;
};

export const Graphics: React.FC<Props> = ({
    children,
    iconName = '',
    iconColor,
    title,
    titleColor,
    bottomBadgeSource,
    topBadgeSource,
    bottomBadgeColor,
    bottomBadgeName = '',
    topBadgeName = '',
    indicatorBottomBadge,
    indicatorTopBadge,
    backgroundColor,
    topBadgeColor,
    dataTestId,
}) => {
    const bottomBadgeChildren = indicatorBottomBadge ? (
        <Badge view='count' height={16} content={indicatorBottomBadge} />
    ) : (
        <CDNIcon className={cn(styles.iconCdn)} name={bottomBadgeName} color={bottomBadgeColor} />
    );

    const topBadgeChildren = indicatorTopBadge ? (
        <Badge view='count' height={16} content={indicatorTopBadge} />
    ) : (
        <CDNIcon className={cn(styles.iconCdn)} name={topBadgeName} color={topBadgeColor} />
    );

    return (
        <section className={styles.component} data-test-id={getDataTestId(dataTestId, 'graphics')}>
            {!title && !iconName ? (
                children
            ) : (
                <SuperEllipse
                    backgroundColor={backgroundColor}
                    size={48}
                    bottomAddons={bottomBadgeSource && bottomBadgeChildren}
                    topAddons={topBadgeSource && topBadgeChildren}
                >
                    {title ? (
                        <Typography.TitleMobile
                            tag='div'
                            color={titleColor}
                            view='small'
                            weight='bold'
                        >
                            {title}
                        </Typography.TitleMobile>
                    ) : (
                        <CDNIcon name={iconName} color={iconColor} />
                    )}
                </SuperEllipse>
            )}
        </section>
    );
};

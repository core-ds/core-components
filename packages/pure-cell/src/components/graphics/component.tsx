import React, { ReactNode } from 'react';
import { Typography, Color } from '@alfalab/core-components-typography';
import { CDNIcon } from '@alfalab/core-components-cdn-icon';
import { SuperEllipse } from '@alfalab/core-components-icon-view/super-ellipse';
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
    bottomAddons?: ReactNode;

    /**
     * Слот cверху
     */
    topAddons?: ReactNode;

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
    bottomAddons,
    topAddons,
    backgroundColor,
    dataTestId,
}) => {
    return (
        <section className={styles.component} data-test-id={getDataTestId(dataTestId, 'graphics')}>
            {!title && !iconName ? (
                children
            ) : (
                <SuperEllipse
                    backgroundColor={backgroundColor}
                    size={48}
                    bottomAddons={bottomAddons}
                    topAddons={topAddons}
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

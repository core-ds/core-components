import React, { useContext } from 'react';
import cn from 'classnames';

import { createPaddingStyle, getDataTestId } from '@alfalab/core-components-shared';

import { PaddingType } from '../../../../types';
import { SystemMessageContext } from '../../Context';

import type desktopStyles from './desktop.module.css';
import type mobileStyles from './mobile.module.css';

import styles from './index.module.css';

export type TitleProps = {
    /**
     * Дополнительно имя класса
     */
    className?: string;

    /**
     * HTML тег
     * @default h3
     */
    tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'div';

    /**
     * Заголовок
     */
    children: React.ReactNode;

    /**
     * Отступы
     */
    padding?: PaddingType;
};

type TitlePropsPrivate = {
    /**
     * Стили под д/м
     */
    stylesView: typeof desktopStyles | typeof mobileStyles;

    /**
     * Отступы под д/м
     */
    defaultPadding: Record<string, unknown>;
};

export const Title: React.FC<TitleProps & TitlePropsPrivate> = ({
    tag = 'h3',
    className,
    children,
    padding: paddingProp,
    stylesView,
    defaultPadding,
}) => {
    const { dataTestId } = useContext(SystemMessageContext);
    const padding = paddingProp ?? defaultPadding;

    const Component = tag;

    return (
        <Component
            className={cn(styles.component, className, stylesView.component)}
            data-test-id={getDataTestId(dataTestId, 'title')}
            style={createPaddingStyle(padding)}
        >
            {children}
        </Component>
    );
};

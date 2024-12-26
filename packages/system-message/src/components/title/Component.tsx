import React, { useContext } from 'react';
import cn from 'classnames';

import { createPaddingStyle, getDataTestId } from '@alfalab/core-components-shared';

import { PaddingType } from '../../../../types';
import { SystemMessageContext } from '../../Context';

import type desktopStyles from './desktop/styles.module.css';
import type mobileStyles from './mobile/styles.module.css';

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

type TitlePrivateProps = Omit<TitleProps, 'padding'> & {
    /**
     * Стили
     */
    styles: typeof desktopStyles | typeof mobileStyles;

    /**
     * Отступы
     */
    padding: PaddingType;
};

export const TitleBase: React.FC<TitleProps & TitlePrivateProps> = ({
    tag = 'h3',
    className,
    children,
    padding,
    styles,
}) => {
    const { dataTestId } = useContext(SystemMessageContext);

    const Component = tag;

    return (
        <Component
            className={cn(styles.component, className, styles.component)}
            data-test-id={getDataTestId(dataTestId, 'title')}
            style={createPaddingStyle(padding)}
        >
            {children}
        </Component>
    );
};

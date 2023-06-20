import React, { useContext } from 'react';
import cn from 'classnames';

import { getDataTestId } from '@alfalab/core-components-shared';

import { SystemMessageContext } from '../../Context';

import desktopStyles from './desktop.module.css';
import styles from './index.module.css';
import mobileStyles from './mobile.module.css';

type TitleProps = {
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
};

export const Title: React.FC<TitleProps> = ({ tag = 'h3', className, children }) => {
    const { dataTestId, view } = useContext(SystemMessageContext);

    const Component = tag;

    return (
        <Component
            className={cn(styles.component, className, {
                [desktopStyles.component]: view === 'desktop',
                [mobileStyles.component]: view === 'mobile',
            })}
            data-test-id={getDataTestId(dataTestId, 'title')}
        >
            {children}
        </Component>
    );
};

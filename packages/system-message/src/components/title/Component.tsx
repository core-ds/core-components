import React, { useContext } from 'react';
import cn from 'classnames';

import { createPaddingStyle, getDataTestId } from '@alfalab/core-components-shared';
import { type PaddingType } from '@alfalab/core-components-types';

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

    /**
     * Отступы
     */
    padding?: PaddingType;
};

const DEFAULT_DESKTOP_PADDING = { bottom: 16 };
const DEFAULT_MOBILE_PADDING = { bottom: 12 };

export const Title: React.FC<TitleProps> = ({
    tag = 'h3',
    className,
    children,
    padding: paddingProp,
}) => {
    const { dataTestId, view } = useContext(SystemMessageContext);
    const padding =
        paddingProp ?? (view === 'mobile' ? DEFAULT_MOBILE_PADDING : DEFAULT_DESKTOP_PADDING);

    const Component = tag;

    return (
        <Component
            className={cn(styles.component, className, {
                [desktopStyles.component]: view === 'desktop',
                [mobileStyles.component]: view === 'mobile',
            })}
            data-test-id={getDataTestId(dataTestId, 'title')}
            style={createPaddingStyle(padding)}
        >
            {children}
        </Component>
    );
};

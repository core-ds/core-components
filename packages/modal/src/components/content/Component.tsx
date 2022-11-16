import React, { FC, Ref, useContext } from 'react';
import cn from 'classnames';

import { ModalContext } from '../../Context';
import { ResponsiveContext } from '../../ResponsiveContext';
import { ContentProps } from '../../typings';

import desktopStyles from './desktop.module.css';
import styles from './index.module.css';
import mobileStyles from './mobile.module.css';

export const Content: FC<ContentProps> = ({ children, flex, className }) => {
    const { contentRef } = useContext(ModalContext);
    const { size, view } = useContext(ResponsiveContext);

    return (
        <div
            className={cn(styles.content, className, {
                [styles.flex]: flex,
                [desktopStyles[size]]: view === 'desktop' && size,
                [mobileStyles.content]: view === 'mobile',
            })}
            ref={contentRef as Ref<HTMLDivElement>}
        >
            {children}
        </div>
    );
};

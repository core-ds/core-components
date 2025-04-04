import React, { FC, Ref, useContext } from 'react';
import { getDataTestId } from '@balafla/core-components-shared';
import cn from 'classnames';

import { SIZE_TO_CLASSNAME_MAP } from '../../consts';
import { ModalContext } from '../../Context';
import { ResponsiveContext } from '../../ResponsiveContext';
import { ContentProps } from '../../typings';

import desktopStyles from './desktop.module.css';
import styles from './index.module.css';
import mobileStyles from './mobile.module.css';

export const Content: FC<ContentProps> = ({ children, flex, className }) => {
    const { contentRef, hasHeader } = useContext(ModalContext);
    const { size, view, dataTestId } = useContext(ResponsiveContext);

    return (
        <div
            className={cn(styles.content, className, {
                [styles.flex]: flex,
                [styles.withHeader]: hasHeader,
                [desktopStyles[SIZE_TO_CLASSNAME_MAP[size]]]: view === 'desktop' && size,
                [mobileStyles.content]: view === 'mobile',
            })}
            ref={contentRef as Ref<HTMLDivElement>}
            data-test-id={getDataTestId(dataTestId, 'content')}
        >
            {children}
        </div>
    );
};

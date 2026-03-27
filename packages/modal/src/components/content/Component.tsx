import React, { type FC, type Ref, useContext } from 'react';
import cn from 'classnames';

import { getDataTestId } from '@alfalab/core-components-shared';

import { ModalContext } from '../../Context';
import { ResponsiveContext } from '../../ResponsiveContext';
import { type ContentProps } from '../../typings';
import { getSizeStyle } from '../../utils';

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
                [desktopStyles[getSizeStyle(size)]]: view === 'desktop' && size,
                [mobileStyles.content]: view === 'mobile',
            })}
            ref={contentRef as Ref<HTMLDivElement>}
            data-test-id={getDataTestId(dataTestId, 'content')}
        >
            {children}
        </div>
    );
};

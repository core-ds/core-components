import React, { FC } from 'react';
import cn from 'classnames';

import CrossMIcon from '@alfalab/icons-glyph/CrossMIcon';

import { getDataTestId } from '../../../../utils/getDataTestId';
import { Closer } from '../closer/Component';

import { Header, HeaderProps } from './Component';

import styles from './mobile.module.css';

export type HeaderMobileProps = Omit<HeaderProps, 'closer'> & {
    /**
     * Наличие крестика
     */
    hasCloser?: boolean;
};

export const HeaderMobile: FC<HeaderMobileProps> = ({
    className,
    contentClassName,
    hasCloser = true,
    sticky,
    dataTestId,
    ...restProps
}) => (
    <Header
        className={cn(className, {
            [styles.sticky]: sticky,
        })}
        contentClassName={cn(styles.content, contentClassName)}
        closer={
            hasCloser ? (
                <Closer
                    icon={CrossMIcon}
                    size='xs'
                    dataTestId={getDataTestId(dataTestId, 'closer')}
                />
            ) : null
        }
        sticky={sticky}
        dataTestId={dataTestId}
        {...restProps}
    />
);

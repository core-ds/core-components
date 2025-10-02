import React, { type FC, Fragment } from 'react';
import cn from 'classnames';

import { getDataTestId } from '@alfalab/core-components-shared';
import { Spinner } from '@alfalab/core-components-spinner';

import { type BaseButtonContentProps } from '../base-button-candidate';

import styles from './index.module.css';

export const ButtonContent: FC<BaseButtonContentProps> = ({
    loading,
    children,
    loaderClassName,
    dataTestId,
}) => (
    <Fragment>
        {children}
        {loading && (
            <Spinner
                visible={true}
                preset={24}
                dataTestId={getDataTestId(dataTestId, 'loader')}
                className={cn(styles.component, loaderClassName)}
            />
        )}
    </Fragment>
);

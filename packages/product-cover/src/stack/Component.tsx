import React, { FC } from 'react';
import cn from 'classnames';

import { getDataTestId } from '@alfalab/core-components-shared';

import { Single } from '../single';
import { Size, StackProps } from '../typings';
import { getSizeSecondCard } from '../utils';

import styles from './index.module.css';

export const Stack: FC<StackProps> = ({
    firstCard,
    secondCard,
    size = 128,
    numberOfСards,
    className,
    align = 'default',
    dataTestId,
}) => {
    const sizeClassNames = `size-${size}`;
    const secondCardSize = getSizeSecondCard(size, align) as Size;

    const commonClassName = {
        [styles[sizeClassNames]]: true,
        [styles[align]]: Boolean(styles[align]),
    };

    return (
        <div
            className={cn(styles.wrapper, styles.componentStack, commonClassName, className)}
            data-test-id={dataTestId}
        >
            <Single
                {...firstCard}
                className={cn(styles.firstCard, commonClassName)}
                size={size}
                dataTestId={getDataTestId(dataTestId, 'first-card')}
            />
            <div className={cn(styles.wrapperSecondCard, commonClassName)}>
                <Single
                    {...secondCard}
                    size={secondCardSize}
                    align={align}
                    numberOfСards={numberOfСards}
                    dataTestId={getDataTestId(dataTestId, 'second-card')}
                />
            </div>
        </div>
    );
};

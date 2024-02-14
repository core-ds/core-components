import React, { FC } from 'react';
import cn from 'classnames';

import { getDataTestId } from '@alfalab/core-components-shared';

import { SIZE_TO_CLASS } from '../consts';
import { Image } from '../image';
import { StackProps } from '../typings';

import styles from './index.module.css';

export const Stack: FC<StackProps> = ({
    firstCard,
    secondCard,
    size = [164, 264],
    numberOfСards,
    className,
    dataTestId,
}) => {
    const [height, width] = size;
    const sizeClassNames = `${SIZE_TO_CLASS[`${height}-${width}`]}`;

    if (firstCard && secondCard) {
        return (
            <div
                className={cn(
                    styles.wrapper,
                    styles.componentStack,
                    styles[sizeClassNames],
                    className,
                )}
                data-test-id={dataTestId}
            >
                <Image
                    {...firstCard}
                    className={cn(styles.firstCard, styles[sizeClassNames])}
                    size={size}
                    dataTestId={getDataTestId(dataTestId, 'first-card')}
                />
                <div className={cn(styles.wrapperSecondCard, styles[sizeClassNames])}>
                    <Image
                        {...secondCard}
                        size={width === 264 ? [128, 205] : size}
                        numberOfСards={numberOfСards}
                        dataTestId={getDataTestId(dataTestId, 'second-card')}
                    />
                </div>
            </div>
        );
    }

    return (
        <div className={cn(styles.wrapper, styles.componentImage, styles[sizeClassNames])}>
            <Image
                {...firstCard}
                size={size}
                className={className}
                dataTestId={getDataTestId(dataTestId, 'first-card')}
            />
        </div>
    );
};

import React, { FC } from 'react';
import cn from 'classnames';

import { getDataTestId } from '@alfalab/core-components-shared';

import { ImageCard, Overlay, Text } from '../components';
import { SIZE_TO_CLASS } from '../consts';
import { ImageProps } from '../typings';

import styles from './index.module.css';

export const Image: FC<ImageProps> = ({
    size = [164, 264],
    statusIcon: Icon,
    cardId,
    layers,
    imageUrl,
    shadow,
    colors,
    eyeButton,
    cardholderNameUppercase,
    cardholderName,
    numberOfСards,
    maskedCardNumber,
    className,
    onEyeIconClick,
    dataTestId,
}) => {
    const [height, width] = size;
    const sizeClassNames = `${SIZE_TO_CLASS[`${height}-${width}`]}`;
    const userInfo = maskedCardNumber || cardholderName;
    const smallSize = sizeClassNames.includes('16-24');

    return (
        <div
            className={cn(styles.component, styles[sizeClassNames], className)}
            style={{ width, height, boxShadow: shadow }}
            data-test-id={dataTestId}
        >
            {Icon && <Overlay icon={Icon} colors={colors} />}

            <ImageCard
                width={width}
                height={height}
                cardId={cardId}
                layers={layers}
                imageUrl={imageUrl}
                numberOfСards={numberOfСards}
            />

            {userInfo && !smallSize && (
                <Text
                    maskedCardNumber={maskedCardNumber}
                    eyeButton={eyeButton}
                    cardholderNameUppercase={cardholderNameUppercase}
                    cardholderName={cardholderName}
                    numberOfСards={numberOfСards}
                    colors={colors}
                    size={size}
                    onEyeIconClick={onEyeIconClick}
                    dataTestId={getDataTestId(dataTestId, 'user-info')}
                />
            )}
        </div>
    );
};

import React, { FC } from 'react';
import cn from 'classnames';

import { getDataTestId } from '@alfalab/core-components-shared';

import { ImageCard, Overlay, Text } from '../components';
import { WIDTH_TO_SIZE } from '../consts';
import { SingleCommonProps } from '../typings';

import styles from './index.module.css';

export const Single: FC<SingleCommonProps> = ({
    size = 164,
    icon: Icon,
    cardId,
    layers,
    imageUrl,
    shadow,
    iconColor,
    backgroundColor,
    borderColor,
    overlayProps = { color: 'default', visible: false },
    eyeButton,
    cardholderNameUppercase,
    cardholderName,
    numberOfСards,
    maskedCardNumber,
    className,
    contentAddons,
    contentAddonsProps,
    onEyeIconClick,
    dataTestId,
}) => {
    const showContent = (maskedCardNumber || cardholderName) && size !== 16 && !contentAddons;

    return (
        <div
            className={cn(styles.component, styles[`size-${size}`], className)}
            style={{
                width: WIDTH_TO_SIZE[size],
                height: size,
                boxShadow: shadow,
                backgroundColor,
            }}
            data-test-id={dataTestId}
        >
            {Icon && <Icon color={iconColor} className={styles.icon} />}
            <Overlay color={overlayProps.color} visible={overlayProps.visible} />

            {borderColor && (
                <div
                    className={cn(styles.border)}
                    style={{ boxShadow: `inset 0 0 0 2px ${borderColor}` }}
                />
            )}

            <ImageCard
                width={WIDTH_TO_SIZE[size]}
                height={size}
                cardId={cardId}
                layers={layers}
                imageUrl={imageUrl}
                numberOfСards={numberOfСards}
            />

            {showContent && (
                <Text
                    maskedCardNumber={maskedCardNumber}
                    eyeButton={eyeButton}
                    cardholderNameUppercase={cardholderNameUppercase}
                    cardholderName={cardholderName}
                    numberOfСards={numberOfСards}
                    size={size}
                    onEyeIconClick={onEyeIconClick}
                    dataTestId={getDataTestId(dataTestId, 'user-info')}
                />
            )}

            {contentAddons && (
                <div
                    {...contentAddonsProps}
                    className={cn(styles.contentAddons, contentAddonsProps?.className)}
                >
                    {contentAddons}
                </div>
            )}
        </div>
    );
};

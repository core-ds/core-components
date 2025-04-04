import React, { FC } from 'react';
import { getDataTestId } from '@balafla/core-components-shared';
import cn from 'classnames';

import { ImageCard, Overlay, Text } from '../components';
import { WIDTH_TO_SIZE } from '../consts';
import { SingleCommonProps } from '../typings';

import styles from './index.module.css';

export const Single: FC<SingleCommonProps> = ({
    size = 164,
    icon: Icon,
    cardId,
    layers,
    baseUrl,
    shadow,
    iconColor,
    backgroundColor,
    borderColor,
    overlayProps = { colors: 'default', visible: false },
    eyeButton,
    cardholderNameUppercase,
    cardholderName,
    numberOfСards,
    align,
    cardNumber,
    className,
    contentAddons,
    contentAddonsProps,
    onEyeIconClick,
    dataTestId,
}) => {
    const hasContent = Boolean(cardNumber || cardholderName || numberOfСards);
    const showContent = hasContent && size !== 16 && !contentAddons;

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
            <Overlay colors={overlayProps.colors} visible={overlayProps.visible} />

            {borderColor && (
                <div
                    className={cn(styles.border)}
                    style={{ boxShadow: `inset 0 0 0 1px ${borderColor}` }}
                />
            )}

            <ImageCard
                width={WIDTH_TO_SIZE[size]}
                height={size}
                cardId={cardId}
                layers={layers}
                baseUrl={baseUrl}
                numberOfСards={numberOfСards}
            />

            {showContent && (
                <Text
                    cardNumber={cardNumber}
                    eyeButton={eyeButton}
                    cardholderNameUppercase={cardholderNameUppercase}
                    cardholderName={cardholderName}
                    numberOfСards={numberOfСards}
                    align={align}
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

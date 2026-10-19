import React, { type FC } from 'react';

import { useId, useImageLoadingState } from '@alfalab/hooks';

import { type SingleCommonProps } from '../../typings';

import styles from './index.module.css';

export type ImageCardProps = Pick<SingleCommonProps, 'imageProps'> & {
    /**
     * Идентификатор карты
     * (например: RM, SQ, SR)
     */
    cardId?: string;

    /**
     * Базовый URL сервиса с изображениями
     */
    baseUrl?: string;

    /**
     * Какие слои показывать, через запятую без пробелов
     * (полный набор: BACKGROUND,CARD_NUMBER,CARD_HOLDER,PAY_PASS,CHIP,LOGO,PAYMENT_SYSTEM,RESERVED_1,RESERVED_2,VALID_DATE)
     */
    layers?: string;

    /**
     * Ширина карты
     */
    width?: number;

    /**
     * Высота карты
     */
    height?: number;

    /**
     * (Устаревший) Количество карт
     * @deprecated Используйте 'numberOfCards'
     */
    numberOfСards?: number;

    /**
     * Количество карт
     */
    numberOfCards?: number;
};

export const ImageCard: FC<ImageCardProps> = ({
    baseUrl,
    cardId,
    layers,
    imageProps,
    width,
    height,
    numberOfСards,
    numberOfCards = numberOfСards,
}) => {
    const imagePatternId = useId();

    const cardImageProps = imageProps ?? {
        src: `${baseUrl}${cardId}/images?layers=${layers}&width=${width}`,
        srcSet: width
            ? `${baseUrl}${cardId}/images?layers=${layers}&width=${width * 2} 2x`
            : undefined,
    };

    const imageLoadingState = useImageLoadingState({ src: cardImageProps.src ?? '' });
    const imageLoadingState2x = useImageLoadingState({ src: cardImageProps.srcSet ?? '' });
    const imageFailed = imageLoadingState === 'error' || imageLoadingState2x === 'error';

    const renderCardMack = () => (
        <svg
            width='24'
            height='16'
            viewBox='0 0 24 16'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
            className={styles.cardMack}
        >
            {!imageFailed && (
                <defs>
                    <pattern id={imagePatternId} width='100%' height='100%'>
                        <image
                            href={cardImageProps.src}
                            width='100%'
                            height='100%'
                            preserveAspectRatio='xMidYMid slice'
                        />
                    </pattern>
                </defs>
            )}
            <path
                style={{
                    fill: imageFailed
                        ? 'var(--color-light-neutral-500)'
                        : `url(#${imagePatternId})`,
                }}
                d='M0 13V14C0 15.1046 0.89543 16 2 16H22C23.1046 16 24 15.1046 24 14V2C24 0.895431 23.1046 0 22 0H21V10C21 11.6569 19.6569 13 18 13H0Z'
            />
        </svg>
    );

    const renderImageCard = () => {
        if (!imageFailed) {
            return (
                // eslint-disable-next-line jsx-a11y/alt-text
                <img
                    className={styles.cardImage}
                    width={width}
                    height={height}
                    {...cardImageProps}
                />
            );
        }

        return null;
    };

    return height === 16 && numberOfCards ? renderCardMack() : renderImageCard();
};

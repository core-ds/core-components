import React from 'react';
import cn from 'classnames';

import { ButtonDesktop } from '@alfalab/core-components-button/desktop';
import { getDataTestId } from '@alfalab/core-components-shared';
import { Typography } from '@alfalab/core-components-typography';
import { EyeMIcon } from '@alfalab/icons-glyph/EyeMIcon';
import { pluralize } from '@alfalab/utils';

import { TYPOGRAPHY_COLORS, TYPOGRAPHY_VIEW_FOR_SIZE } from '../../consts';
import { Size } from '../../typings';

import defaultColors from './default.module.css';
import styles from './index.module.css';
import invertedColors from './inverted.module.css';

const colorStyles = {
    default: defaultColors,
    inverted: invertedColors,
};

export type TextProps = {
    /**
     * Кнопка показать номер карты
     */
    eyeButton?: boolean;

    /**
     * Размер
     */
    size?: Size;

    /**
     * Дополнительный класс
     */
    className?: string;

    /**
     * Имя владельца карты в верхнем регистре
     */
    cardholderNameUppercase?: boolean;

    /**
     * Имя владельца карты
     */
    cardholderName?: string;

    /**
     * Номер карты
     */
    maskedCardNumber?: number;

    /**
     * Количество карт
     */
    numberOfСards?: number;

    /**
     * Набор цветов для компонента
     */
    colors?: 'default' | 'inverted';

    /**
     * Обработчик клика по иконке 'показать номер карты'
     */
    onEyeIconClick?: () => void;

    /**
     * Идентификатор для систем автоматизированного тестирования.
     */
    dataTestId?: string;
};

function showNumberOfСards(sizeCard: string, numberOfСards?: number) {
    if (numberOfСards) {
        return (
            numberOfСards >= 2 &&
            numberOfСards < 10 &&
            ['48-76', '40-65', '32-51'].includes(sizeCard)
        );
    }

    return false;
}

export const Text: React.FC<TextProps> = ({
    cardholderNameUppercase,
    cardholderName,
    maskedCardNumber,
    numberOfСards,
    eyeButton,
    dataTestId,
    colors = 'default',
    size = [164, 264],
    onEyeIconClick,
}) => {
    const [height, width] = size;
    const sizeCard = `${[`${height}-${width}`]}`;
    const bigSize = sizeCard === '164-264';
    const visibleNumberOfСards = showNumberOfСards(sizeCard, numberOfСards);

    return (
        <div
            className={cn(styles.component, colorStyles[colors].textColor)}
            data-test-id={dataTestId}
        >
            {bigSize && cardholderName ? (
                <Typography.Text
                    tag='div'
                    view='secondary-medium'
                    weight='medium'
                    color={TYPOGRAPHY_COLORS[colors]}
                    className={styles.cardholderName}
                >
                    {cardholderNameUppercase ? cardholderName?.toUpperCase() : cardholderName}
                </Typography.Text>
            ) : null}

            {maskedCardNumber && !visibleNumberOfСards ? (
                <div className={styles.cardNumber}>
                    <Typography.Text
                        view={TYPOGRAPHY_VIEW_FOR_SIZE[sizeCard]}
                        weight='medium'
                        color={TYPOGRAPHY_COLORS[colors]}
                    >
                        {['164-264', '128-205'].includes(sizeCard) && '··\u2009'}
                        {String(maskedCardNumber).slice(-4)}
                    </Typography.Text>
                    {eyeButton && bigSize && (
                        <ButtonDesktop
                            view='ghost'
                            className={cn(styles.buttonEye, colorStyles[colors].buttonEye)}
                            dataTestId={getDataTestId(dataTestId, 'eye-btn')}
                            onClick={onEyeIconClick}
                            colors={colors}
                        >
                            <EyeMIcon />
                        </ButtonDesktop>
                    )}
                </div>
            ) : null}

            {visibleNumberOfСards && (
                <div className={styles.cardNumber}>
                    <Typography.Text
                        view={TYPOGRAPHY_VIEW_FOR_SIZE[sizeCard]}
                        weight='medium'
                        color={TYPOGRAPHY_COLORS[colors]}
                    >
                        {`+${numberOfСards}`}{' '}
                        {pluralize(numberOfСards || 0, 'карта', 'карты', 'карт')}
                    </Typography.Text>
                </div>
            )}
        </div>
    );
};

import React from 'react';
import cn from 'classnames';

import { ButtonDesktop } from '@alfalab/core-components-button/desktop';
import { getDataTestId } from '@alfalab/core-components-shared';
import { TypographyText } from '@alfalab/core-components-typography';
import { EyeMIcon } from '@alfalab/icons-glyph/EyeMIcon';
import { pluralize } from '@alfalab/utils';

import { TYPOGRAPHY_VIEW_FOR_SIZE } from '../../consts';
import { Size } from '../../typings';
import { showNumberOfCards } from '../../utils';

import styles from './index.module.css';

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
    cardNumber?: number;

    /**
     * (Устаревший) Количество карт
     * @deprecated Используйте 'numberOfCards'
     */
    numberOfСards?: number;

    /**
     * Количество карт
     */
    numberOfCards?: number;

    /**
     * Управление ориентацией стопки карт компонента
     */
    align?: 'bottom' | 'default';

    /**
     * Обработчик клика по иконке 'показать номер карты'
     */
    onEyeIconClick?: () => void;

    /**
     * Идентификатор для систем автоматизированного тестирования.
     */
    dataTestId?: string;
};

export const Text: React.FC<TextProps> = ({
    cardholderNameUppercase,
    cardholderName,
    cardNumber,
    numberOfСards,
    numberOfCards = numberOfСards,
    align,
    eyeButton,
    dataTestId,
    size = 164,
    onEyeIconClick,
}) => {
    const maxSize = size === 164;
    const visibleNumberOfCards = showNumberOfCards(size, numberOfCards, align);

    return (
        <div className={cn(styles.component)} data-test-id={dataTestId}>
            {maxSize && cardholderName ? (
                <TypographyText
                    tag='div'
                    view='secondary-medium'
                    weight='medium'
                    color='static-primary-light'
                    className={styles.cardholderName}
                >
                    {cardholderNameUppercase ? cardholderName?.toUpperCase() : cardholderName}
                </TypographyText>
            ) : null}

            {cardNumber && !visibleNumberOfCards ? (
                <div className={styles.cardNumber}>
                    <TypographyText
                        view={TYPOGRAPHY_VIEW_FOR_SIZE[size]}
                        weight='medium'
                        color='static-primary-light'
                    >
                        {[164, 128].includes(size) && '··\u2009'}
                        {String(cardNumber).slice(-4)}
                    </TypographyText>
                    {eyeButton && maxSize && (
                        <ButtonDesktop
                            view='text'
                            className={cn(styles.buttonEye)}
                            dataTestId={getDataTestId(dataTestId, 'eye-btn')}
                            onClick={onEyeIconClick}
                            colors='inverted'
                        >
                            <EyeMIcon />
                        </ButtonDesktop>
                    )}
                </div>
            ) : null}

            {visibleNumberOfCards && (
                <div className={styles.cardNumber}>
                    <TypographyText
                        view={TYPOGRAPHY_VIEW_FOR_SIZE[size]}
                        weight='medium'
                        color='static-primary-dark'
                    >
                        {`+${numberOfCards}\u00A0`}
                        {pluralize(numberOfCards || 0, 'карта', 'карты', 'карт')}
                    </TypographyText>
                </div>
            )}
        </div>
    );
};

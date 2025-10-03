import React from 'react';
import cn from 'classnames';

import { AMOUNT_MAJOR_MINOR_PARTS_SEPARATOR, formatAmount } from '@alfalab/utils';

import { trimTrailingZeros } from './utils/trimTrailingZeros';
import { type AmountProps } from './types';

import styles from './index.module.css';

/**
 * Компонент для отображения суммы, согласно следующему гайдлайну:
 * https://design.alfabank.ru/patterns/amount
 */
export const Amount: React.FC<AmountProps> = ({
    value,
    minority,
    currency,
    codeFormat = 'symbolic',
    view = 'default',
    bold,
    transparentMinor,
    rightAddons,
    showPlus = false,
    className,
    trimZero = false,
    dataTestId,
}) => {
    const { majorPart, minorPart, currencySymbol, currencySeparator } = formatAmount({
        value,
        currency,
        minority,
        view,
        codeFormat,
    });

    const defaultStyles = bold === undefined && transparentMinor === undefined;

    return (
        <span
            className={cn(styles.component, className, {
                [styles.bold]: bold === 'full' || bold === 'major',
                [styles.defaultStyles]: defaultStyles,
            })}
            data-test-id={dataTestId}
        >
            {showPlus && value > 0 ? '+' : ''}
            {majorPart}
            <span
                className={cn(styles.minorPartAndCurrency, {
                    [styles.transparentMinor]: transparentMinor,
                    [styles.normalMinor]: bold === 'major',
                    [styles.defaultMinor]: defaultStyles,
                })}
            >
                {minorPart && AMOUNT_MAJOR_MINOR_PARTS_SEPARATOR}
                {trimZero ? trimTrailingZeros(minorPart) : minorPart}
                {currency ? `${currencySeparator}${currencySymbol ?? currency}` : null}
                {rightAddons}
            </span>
        </span>
    );
};

import { type ReactNode } from 'react';

import { type CurrencyCodes } from '@alfalab/data';

export type AmountProps = {
    /**
     * Денежное значение в минорных единицах
     */
    value: number;

    /**
     * Валюта
     */
    currency?: CurrencyCodes;

    /**
     * Слот справа
     */
    rightAddons?: ReactNode;

    /**
     * Количество минорных единиц в валюте
     */
    minority?: number;

    /**
     * Делает минорную часть полупрозрачной
     */
    transparentMinor?: boolean;

    /**
     * Количество минорных единиц в валюте для Клика
     */
    minorUnits?: number;

    /**
     * default - не отображаем копейки, если их значение 0
     * withZeroMinorPart - отображаем копейки, даже если их значение равно 0
     */
    view?: 'default' | 'withZeroMinorPart';

    /**
     * Показывать значок + для положительных значений
     */
    showPlus?: boolean;

    /**
     * Дополнительный класс
     */
    className?: string;

    /**
     * Идентификатор для систем автоматизированного тестирования
     */
    dataTestId?: string;
};

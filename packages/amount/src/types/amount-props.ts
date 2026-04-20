import { type ReactNode } from 'react';

import { type CurrencyCodes } from '@alfalab/data';

export interface AmountProps {
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
    minority: number;

    /**
     * Формат отображения кода валюты
     */
    codeFormat?: 'letter' | 'symbolic';

    /**
     * default - не отображаем копейки, если их значение 0
     * withZeroMinorPart - отображаем копейки, даже если их значение равно 0
     */
    view?: 'default' | 'withZeroMinorPart';

    /**
     * Управление жирностью
     * @deprecated Используйте проп {@link AmountProps.fontWeight}
     */
    bold?: 'full' | 'major' | 'none';

    /**
     * Управление жирностью
     */
    fontWeight?: 'bold' | 'medium' | { major: 'bold' | 'medium' };

    /**
     * Делает минорную часть полупрозрачной
     */
    transparentMinor?: boolean;

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

    /**
     * Обрезать ноль в минорной части. Например: 1.70 -> 1.7
     * @default false
     */
    trimZero?: boolean;
}

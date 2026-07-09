import { type InputProps } from '@alfalab/core-components-input';
import { type CurrencyCodes } from '@alfalab/data';

export type AmountInputProps = Omit<InputProps, 'value' | 'defaultValue' | 'onChange' | 'type'> & {
    /**
     * Денежное значение в минорных единицах
     */
    value?: string | number | null;

    /**
     * Значение по-умолчанию в минорных единицах
     */
    defaultValue?: string | number | null;

    /**
     * Формат отображения кода валюты
     */
    codeFormat?: 'letter' | 'symbolic';

    /**
     * default - не отображаем копейки, если их значение 0
     * withZeroMinorPart - отображаем копейки, даже если их значение равно 0
     * @default default
     */
    view?: 'default' | 'withZeroMinorPart';

    /**
     * Валюта
     */
    currency?: CurrencyCodes;

    /**
     * Дополнительный закрепленный текст справа от основного значения. (по умолчанию — символ валюты)
     */
    suffix?: string | null;

    /**
     * Максимальное число знаков до запятой
     * max 15
     */
    integerLength?: number;

    /**
     * Минорные единицы
     */
    minority?: number;

    /**
     * Позволяет вводить только целые значения
     */
    integersOnly?: boolean;

    /**
     * @default - true. Нельзя вводить отрицательные значения.
     * Возможность вводить только положительные значения
     */
    positiveOnly?: boolean;

    /**
     * Обработчик события изменения значения
     */
    onChange?: (
        e: React.ChangeEvent<HTMLInputElement> | null,
        payload: {
            /**
             * Денежное значение в минорных единицах
             * Значение null - значит не установлено
             */
            value: number | null;
            /**
             * Значение инпута
             */
            valueString: string;
        },
    ) => void;

    /**
     * Делает минорную часть полупрозрачной
     */
    transparentMinor?: boolean;

    /**
     * Добавляет компонент "Stepper" в правый аддон
     */
    stepper?: {
        /**
         * Шаг инкремента / декремента
         */
        step: number;
        /**
         * Минимальное значение
         * @default Number.MIN_SAFE_INTEGER
         */
        min?: number;
        /**
         * Максимальное значение
         * @default Number.MAX_SAFE_INTEGER
         */
        max?: number;
    };
};

import React, { forwardRef, ReactNode } from 'react';
import cn from 'classnames';

import { Gap } from '@alfalab/core-components-gap';
import { getDataTestId } from '@alfalab/core-components-shared';

import { InputProgress } from './components/InputProgress';
import { KeyPad } from './components/KeyPad';
import { PassCodeProps } from './typings';

import commonStyles from './index.module.css';

export type BasePassCodeProps = {
    /**
     * Код
     */
    value: string;

    /**
     * Обработчик изменения кода
     */
    onChange: (code: string) => void;

    /**
     * Дополнительный класс
     */
    className?: string;

    /**
     * Отображение ошибки ввода
     */
    error?: boolean;

    /**
     * Отображение успешного ввода
     */
    success?: boolean;

    /**
     * Слот слева
     */
    leftAddons?: ReactNode;

    /**
     * Слот справа
     */
    rightAddons?: ReactNode;

    /**
     * Идентификатор для систем автоматизированного тестирования.
     * Для враппера используется модификатор -wrapper, ошибки -error,
     * сообщения над клавиатурой -message, блока с кодом -input-progress,
     * блока с цифрами -keypad
     */
    dataTestId?: string;

    /**
     * Контрольная точка, с нее начинается desktop версия
     * @default 1024
     */
    breakpoint?: number;

    /**
     * Значение по-умолчанию для хука useMatchMedia
     */
    defaultMatchMediaValue?: boolean | (() => boolean);

    /**
     * Стили компонента
     */
    styles?: { [key: string]: string };
};

export const PassCode = forwardRef<HTMLDivElement, PassCodeProps>(
    (
        {
            value = '',
            dataTestId,
            className,
            leftAddons,
            rightAddons,
            error,
            success,
            onChange,
            maxCodeLength = 10,
            codeLength,
            styles = {},
        },
        ref,
    ) => {
        const passwordLen = codeLength || maxCodeLength;

        const handleChange = (digit: number) => {
            const newValue = value.concat(digit.toString());

            if (newValue.length <= passwordLen) {
                onChange?.(newValue);
            }
        };

        const handleClear = () => {
            if (value.length > 0) {
                onChange?.(value?.slice(0, -1));
            }
        };

        return (
            <div
                className={cn(commonStyles.component, styles.component, className)}
                ref={ref}
                data-test-id={getDataTestId(dataTestId, 'wrapper')}
            >
                <div className={cn(commonStyles.inputProgressContainer)}>
                    <Gap size={16} />
                    <InputProgress
                        dataTestId={dataTestId}
                        value={value}
                        maxCodeLength={maxCodeLength}
                        codeLength={codeLength}
                        error={Boolean(error)}
                        success={success}
                    />
                    <Gap size={26} />
                </div>

                <KeyPad
                    dataTestId={dataTestId}
                    leftAddons={leftAddons}
                    rightAddons={rightAddons}
                    onClick={handleChange}
                    onClear={handleClear}
                    showClear={Boolean(value)}
                />
            </div>
        );
    },
);

PassCode.displayName = 'PassCode';

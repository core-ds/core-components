import React, { forwardRef, ReactNode } from 'react';
import cn from 'classnames';

import { Gap } from '@alfalab/core-components-gap';
import { getDataTestId } from '@alfalab/core-components-shared';

import { InputProgress } from './components/InputProgress';
import { KeyPad } from './components/KeyPad';

import styles from './index.module.css';

export type BasePassCodeProps = {
    /**
     * Код.
     */
    value: string;

    /**
     * Обработчик изменения кода.
     */
    onChange: (code: string) => void;

    /**
     * Дополнительный класс.
     */
    className?: string;

    /**
     * Отображение ошибки
     */
    error?: ReactNode;

    /**
     *  Сообщение над клавиатурой
     */
    message?: ReactNode;

    /**
     * Слот слева.
     */
    leftAddons?: ReactNode;

    /**
     * Слот справа.
     */
    rightAddons?: ReactNode;

    /**
     * Идентификатор для систем автоматизированного тестирования.
     * Для враппера используется модификатор -wrapper, ошибки -error,
     * сообщения над клавиатурой -message, блока с кодом -input-progress,
     * блока с цифрами -keypad
     */
    dataTestId?: string;
};

type PropsWithUnknownLen = {
    codeLength?: never;

    /**
     * Максимально возможная длина кода.
     * @default 10
     */
    maxCodeLength?: number;
};

type PropsWithLen = {
    maxCodeLength?: never;

    /**
     * Длина кода.
     */
    codeLength?: number;
};

type PassCodeProps = BasePassCodeProps & (PropsWithLen | PropsWithUnknownLen);

export const PassCodeV1 = forwardRef<HTMLDivElement, PassCodeProps>(
    (
        {
            value = '',
            dataTestId,
            className,
            leftAddons,
            rightAddons,
            error,
            message,
            onChange,
            maxCodeLength = 10,
            codeLength,
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

        const renderError = () => (
            <div
                className={cn(styles.message, styles.error)}
                data-test-id={getDataTestId(dataTestId, 'error')}
            >
                {error}
            </div>
        );

        const renderMessage = () => (
            <div className={styles.message} data-test-id={getDataTestId(dataTestId, 'message')}>
                {message}
            </div>
        );

        return (
            <div
                className={cn(styles.component, className)}
                ref={ref}
                data-test-id={getDataTestId(dataTestId, 'wrapper')}
            >
                {error ? renderError() : renderMessage()}

                <Gap size='m' />

                <InputProgress
                    dataTestId={dataTestId}
                    value={value}
                    maxCodeLength={maxCodeLength}
                    codeLength={codeLength}
                    error={Boolean(error)}
                />

                <Gap size='4xl' />

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

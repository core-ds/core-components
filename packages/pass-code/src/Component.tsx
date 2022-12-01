import React, { forwardRef, ReactNode } from 'react';
import cn from 'classnames';

import { Gap } from '@alfalab/core-components-gap';

import { getDataTestId } from '../../utils';

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
    error?: ReactNode | boolean;

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

export const PassCode = forwardRef<HTMLDivElement, PassCodeProps>(
    (
        {
            value = '',
            dataTestId,
            className,
            leftAddons,
            rightAddons,
            error,
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

        return (
            <div
                className={cn(styles.component, className)}
                ref={ref}
                data-test-id={getDataTestId(dataTestId, 'wrapper')}
            >
                <div className={styles.error} data-test-id={getDataTestId(dataTestId, 'error')}>
                    {error}
                </div>

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

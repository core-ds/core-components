import React, { forwardRef, ReactNode } from 'react';
import cn from 'classnames';

import { Gap } from '@alfalab/core-components-gap';
import { getDataTestId } from '@alfalab/core-components-shared';
import { Toast } from '@alfalab/core-components-toast';

import { InputProgress } from './components/InputProgress';
import { KeyPad } from './components/KeyPad';

import styles from './index.module.css';
import { useComponent } from './hooks/useComponent';

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
     * Отображение ошибки
     */
    error?: string;

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
        const { errorToastOpen, inputProgressRef, setErrorToastOpen } = useComponent(error);
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
                <div className={cn(styles.inputProgressContainer)} ref={inputProgressRef}>
                    <Toast
                        title={error}
                        open={errorToastOpen}
                        anchorElement={inputProgressRef.current}
                        fallbackPlacements={['top']}
                        position='top'
                        badge='negative-alert'
                        autoCloseDelay={2000}
                        onClose={() => setErrorToastOpen(false)}
                    />
                    <Gap size={16} />
                    <InputProgress
                        dataTestId={dataTestId}
                        value={value}
                        maxCodeLength={maxCodeLength}
                        codeLength={codeLength}
                        error={Boolean(error)}
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

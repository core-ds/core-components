import React, { type ReactNode } from 'react';

import { getDataTestId } from '@alfalab/core-components-shared';
import { BackspaceXxlIcon } from '@alfalab/icons-glyph/BackspaceXxlIcon';

import { KeyPadButton } from '../KeyPadButton';

import styles from './index.module.css';

export type KeyPadProps = {
    /**
     * Показать кнопку "очистить".
     */
    showClear: boolean;

    /**
     * Слот слева.
     */
    leftAddons?: ReactNode;

    /**
     * Слот справа.
     */
    rightAddons?: ReactNode;

    /**
     * Заголовок для правого слота
     */
    rightAddonsTitle?: string;

    /**
     * Идентификатор для автоматизированного тестирования.
     */
    dataTestId?: string;

    /**
     * Коллбэк нажатия на кнопку.
     */
    onClick: (digit: number) => void;

    /**
     * Коллбэк очистки кода.
     */
    onClear: () => void;
};

const CELL_COUNT = 12;
const CELLS = new Array(CELL_COUNT).fill(null).map((_, i) => {
    if (i === 10) return 0;

    return i + 1;
});

export const KeyPad: React.FC<KeyPadProps> = ({
    leftAddons,
    rightAddons,
    rightAddonsTitle,
    onClick,
    onClear,
    showClear,
    dataTestId,
}) => (
    <div className={styles.component} data-test-id={getDataTestId(dataTestId, 'keypad')}>
        {CELLS.map((digit, i) => {
            if (i === 9) {
                if (leftAddons) return leftAddons;

                return <div key='left-addons-empty' />;
            }

            if (i === 11) {
                if (showClear) {
                    return (
                        <KeyPadButton
                            key='clear-btn'
                            onClick={onClear}
                            view='text'
                            dataTestId={getDataTestId(dataTestId, 'backspace-button')}
                            title='Удалить последний символ'
                        >
                            <BackspaceXxlIcon />
                        </KeyPadButton>
                    );
                }

                if (rightAddons) {
                    if (rightAddonsTitle) {
                        return <div title={rightAddonsTitle}>{rightAddons}</div>;
                    }

                    return rightAddons;
                }

                return <div key='right-addon-empty' />;
            }

            return (
                <KeyPadButton
                    key={digit}
                    onClick={onClick}
                    view='secondary'
                    buttonClassName={styles.digit}
                    dataTestId={getDataTestId(dataTestId, 'keypad-button')}
                >
                    {digit}
                </KeyPadButton>
            );
        })}
    </div>
);

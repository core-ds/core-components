import React, { ReactNode, useCallback } from 'react';
import cn from 'classnames';

import { CheckmarkCircleMIcon } from '@alfalab/icons-glyph/CheckmarkCircleMIcon';

import styles from './index.module.css';

export type StepProps = {
    /**
     * Название шага
     */
    children: ReactNode;

    /**
     * Номер шага
     */
    stepNumber: number;

    /**
     * Маркер того, что текущий шаг выбран
     */
    isSelected: boolean;

    /**
     * Маркер того, что текущий шаг доступен для клика
     */
    disabled: boolean;

    /**
     * Управление отображением номера шага
     */
    ordered?: boolean;

    /**
     * Маркер того, что на текущем шаге есть ошибка
     */
    isError: boolean;

    /**
     * Маркер того, что текущий шаг нужно пометить как завершенный
     */
    isStepCompleted: boolean;

    /**
     * Обработчик нажатия на текущей шаг
     * @param stepNumber - номер шага
     */
    onClick: (stepNumber: number) => void;
};

export const Step: React.FC<StepProps> = ({
    children,
    stepNumber,
    isSelected,
    disabled,
    ordered,
    isError,
    isStepCompleted,
    onClick,
}) => {
    const handleClick = useCallback(() => {
        if (!disabled && onClick) {
            onClick(stepNumber);
        }
    }, [disabled, onClick, stepNumber]);

    const handleKeyClick = useCallback(
        (event: React.KeyboardEvent) => {
            if (event.key === 'Enter') {
                handleClick();
            }
        },
        [handleClick],
    );

    const getStepContent = useCallback(() => {
        if (isStepCompleted && !isError) {
            return <CheckmarkCircleMIcon />;
        }
        if (isError && !isSelected) {
            return '!';
        }
        if (!ordered) {
            return (
                <div className={styles.checkbox}>
                    <span className={styles.dot} />
                </div>
            );
        }

        return stepNumber;
    }, [isStepCompleted, isError, isSelected, ordered, stepNumber]);

    return (
        <div
            role='button'
            tabIndex={0}
            className={cn(styles.step, {
                [styles.completed]: isStepCompleted,
                [styles.error]: isError,
                [styles.selected]: isSelected,
                [styles.disabled]: disabled,
            })}
            onClick={handleClick}
            onKeyDown={handleKeyClick}
        >
            <div className={cn(styles.option, { [styles.unordered]: !ordered })}>
                {getStepContent()}
            </div>
            <div className={cn(styles.text)}>{children}</div>
        </div>
    );
};

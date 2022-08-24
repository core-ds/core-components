import React, { ReactNode, useRef } from 'react';
import cn from 'classnames';
import { useFocus } from '@alfalab/hooks';
import { Badge } from '@alfalab/core-components-badge';
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
    const stepRef = useRef<HTMLDivElement>(null);

    const [focused] = useFocus(stepRef, 'keyboard');

    const handleClick = () => {
        if (!disabled && onClick) {
            onClick(stepNumber);
        }
    };

    const handleKeyDown = (event: React.KeyboardEvent) => {
        if (event.key === 'Enter') {
            handleClick();
        }
    };

    const getStepContent = () => {
        if (isStepCompleted && !isError) {
            return (
                <Badge
                    size='l'
                    view='icon'
                    iconColor='positive'
                    className={styles.badge}
                    content={<CheckmarkCircleMIcon />}
                />
            );
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
    };

    return (
        <div
            role='button'
            tabIndex={0}
            ref={stepRef}
            className={cn(styles.step, {
                [styles.completed]: isStepCompleted,
                [styles.error]: isError,
                [styles.selected]: isSelected,
                [styles.disabled]: disabled,
                [styles.focused]: focused,
            })}
            onClick={handleClick}
            onKeyDown={handleKeyDown}
        >
            <div className={cn(styles.option, { [styles.unordered]: !ordered })}>
                {getStepContent()}
            </div>
            <div className={cn(styles.text)}>{children}</div>
        </div>
    );
};

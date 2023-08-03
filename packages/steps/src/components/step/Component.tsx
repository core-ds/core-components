import React, { ReactNode, useRef } from 'react';
import cn from 'classnames';

import { useFocus } from '@alfalab/hooks';
import { CheckmarkCircleMIcon } from '@alfalab/icons-glyph/CheckmarkCircleMIcon';
import { ClockMIcon } from '@alfalab/icons-glyph/ClockMIcon';
import { ExclamationCircleMIcon } from '@alfalab/icons-glyph/ExclamationCircleMIcon';

import { StepIndicator, StepIndicatorProps } from '../step-indicator';

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
     * Включение / отключение интерактивности шагов
     */
    interactive?: boolean;

    /**
     * Маркер того, что текущий шаг находится в состоянии "Positive"
     */
    isPositive: boolean;

    /**
     * Маркер того, что текущий шаг находится в состоянии "Error"
     */
    isError: boolean;

    /**
     * Маркер того, что текущий шаг находится в состоянии "Warning"
     */
    isWarning: boolean;

    /**
     * Маркер того, что текущий шаг находится в состоянии "Waiting"
     */
    isWaiting: boolean;

    /**
     * Маркер того, что текущий шаг нужно пометить как завершенный
     */
    isStepCompleted: boolean;

    /**
     * Свойства кастомного индикатора текущего шага
     */
    customStepIndicator?: StepIndicatorProps | null;

    /**
     * Управление ориентацией компонента
     * @default false
     */
    isVerticalAlign?: boolean;

    /**
     * Указывает, является ли текущий шаг последним в списке
     */
    isNotLastStep?: boolean;

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
    isPositive,
    isError,
    isWarning,
    isWaiting,
    customStepIndicator,
    isStepCompleted,
    onClick,
    interactive,
    isVerticalAlign,
    isNotLastStep,
}) => {
    const stepRef = useRef<HTMLDivElement>(null);

    const [focused] = useFocus(stepRef, 'keyboard');

    const handleButtonClick = () => {
        if (!disabled && interactive && onClick) {
            onClick(stepNumber);
        }
    };

    const handleTextClick = (e: React.MouseEvent<HTMLElement>) => {
        if (!interactive) {
            e.stopPropagation();
        }
    };

    const handleKeyDown = (event: React.KeyboardEvent) => {
        if (event.key === 'Enter') {
            handleButtonClick();
        }
    };

    const getStepIndicator = () => {
        if (customStepIndicator) {
            return <StepIndicator {...customStepIndicator} />;
        }
        if (isError) {
            return <StepIndicator iconColor='negative' content={<ExclamationCircleMIcon />} />;
        }
        if (isWarning) {
            return <StepIndicator iconColor='attention' content={<ExclamationCircleMIcon />} />;
        }
        if (isWaiting) {
            return <StepIndicator iconColor='secondary' content={<ClockMIcon />} />;
        }
        if (isPositive) {
            return <StepIndicator iconColor='positive' content={<CheckmarkCircleMIcon />} />;
        }
        if (isStepCompleted) {
            return (
                <StepIndicator
                    iconColor='positive'
                    content={<CheckmarkCircleMIcon />}
                    className={styles.completedIndicator}
                />
            );
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

    const renderDash = () => (
        <div
            className={cn(styles.dash, {
                [styles.vertical]: isVerticalAlign,
                [styles.completed]: isStepCompleted,
            })}
        />
    );

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
                [styles.vertical]: isVerticalAlign,
                [styles.interactive]: interactive,
            })}
            onClick={handleButtonClick}
            onKeyDown={handleKeyDown}
        >
            <div
                className={cn(styles.indicator, {
                    [styles.vertical]: isVerticalAlign,
                    [styles.interactive]: interactive,
                })}
            >
                <div
                    className={cn(styles.option, {
                        [styles.unordered]: !ordered,
                        [styles.vertical]: isVerticalAlign,
                        [styles.error]: isError,
                    })}
                >
                    {getStepIndicator()}
                </div>
                {isNotLastStep && isVerticalAlign && renderDash()}
            </div>
            {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
            <div
                className={cn(styles.text, {
                    [styles.interactive]: interactive,
                })}
                onClick={handleTextClick}
            >
                {children}
            </div>
            {isNotLastStep && !isVerticalAlign && renderDash()}
        </div>
    );
};

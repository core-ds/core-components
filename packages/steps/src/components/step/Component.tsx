import React, { type FC, useRef } from 'react';
import cn from 'classnames';

import { Badge } from '@alfalab/core-components-badge';
import { getDataTestId } from '@alfalab/core-components-shared';
import { useFocus } from '@alfalab/hooks';

import { type CommonProps } from '../../types/common-props';
import { StepIndicator, type StepIndicatorProps } from '../step-indicator';

import styles from './index.module.css';

interface StepProps extends CommonProps {
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
     * Маркер того, что текущий шаг находится в состоянии "Positive"
     */
    isPositive: boolean;

    /**
     * Маркер того, что текущий шаг находится в состоянии "Error"
     */
    isError: boolean;

    /**
     * Маркер того, что текущий шаг находится в состоянии "isCriticalError"
     */
    isCriticalError: boolean;

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
     * Указывает, является ли текущий шаг последним в списке
     */
    isNotLastStep?: boolean;

    /**
     * Обработчик нажатия на текущей шаг
     * @param stepNumber - номер шага
     */
    onClick: (stepNumber: number) => void;
}

export const Step: FC<StepProps> = ({
    children,
    stepNumber,
    isSelected,
    disabled,
    ordered,
    isPositive,
    isError,
    isCriticalError,
    isWarning,
    isWaiting,
    customStepIndicator,
    isStepCompleted,
    onClick,
    interactive,
    isVerticalAlign,
    isNotLastStep,
    fullWidth,
    minSpaceBetweenSteps = 24,
    completedDashColor,
    dataTestId,
}) => {
    const stepRef = useRef<HTMLDivElement>(null);

    const [focused] = useFocus(stepRef, 'keyboard');

    const isFullWidth = fullWidth && isVerticalAlign;

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
            return <Badge view='icon' size='l' {...customStepIndicator} />;
        }
        if (isCriticalError) {
            return <StepIndicator view='negative-cross' />;
        }
        if (isError) {
            return <StepIndicator view='negative-alert' />;
        }
        if (isWarning) {
            return <StepIndicator view='attention-alert' />;
        }
        if (isWaiting) {
            return <StepIndicator view='neutral-operation' />;
        }
        if (isPositive) {
            return <StepIndicator view='positive-checkmark' />;
        }
        if (isStepCompleted) {
            return (
                <StepIndicator view='positive-checkmark' className={styles.completedIndicator} />
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

    const getCustomDashColor = () => {
        if (isStepCompleted && completedDashColor) {
            return {
                borderColor: completedDashColor,
            };
        }

        return {};
    };

    const renderDash = () => (
        <div
            className={cn(styles.dash, {
                [styles.vertical]: isVerticalAlign,
                [styles.completed]: isStepCompleted,
            })}
            style={{
                ...getCustomDashColor(),
            }}
        />
    );

    return (
        <div
            data-test-id={getDataTestId(dataTestId, 'step')}
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
                [styles.fullWidth]: isFullWidth,
                [styles.horizontal]: !isVerticalAlign,
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
            <div
                className={cn(styles.textWrapper, styles[`gap-${minSpaceBetweenSteps}`], {
                    [styles.vertical]: isVerticalAlign,
                    [styles.fullWidth]: isFullWidth,
                })}
            >
                {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
                <div
                    className={cn(styles.text, {
                        [styles.interactive]: interactive,
                        [styles.fullWidth]: isFullWidth,
                    })}
                    onClick={handleTextClick}
                >
                    {children}
                </div>
            </div>
            {isNotLastStep && !isVerticalAlign && renderDash()}
        </div>
    );
};

import React, { useState } from 'react';
import cn from 'classnames';

import { Step } from './components/step';
import { StepIndicatorProps } from './components/step-indicator';
import { CommonProps } from './types/common-props';

import styles from './index.module.css';

export type StepsProps = {
    /**
     * Дополнительный класс
     */
    className?: string;

    /**
     * Активный шаг, указанный по умолчанию
     * @default 1
     */
    defaultActiveStep?: number;

    /**
     * Активный шаг
     */
    activeStep?: number;

    /**
     * Управление возможностью отключения пометки пройденного шага
     * @default true
     */
    isMarkCompletedSteps?: boolean;

    /**
     * Кастомный метод для управления состоянием disabled шага и
     * возможностью перехода на этот шаг
     * @param stepNumber - номер шага
     * @return Флаг состояния disabled
     */
    checkIsStepDisabled?: (stepNumber: number) => boolean;

    /**
     * Кастомный метод для управления состоянием шага error
     * @param stepNumber - номер шага
     * @return Флаг состояния error
     */
    checkIsStepError?: (stepNumber: number) => boolean;

    /**
     * Кастомный метод для управления состоянием шага criticalError
     * @param stepNumber - номер шага
     * @return Флаг состояния error
     */
    checkIsStepCriticalError?: (stepNumber: number) => boolean;

    /**
     * Кастомный метод для управления состоянием шага warning
     * @param stepNumber - номер шага
     * @return Флаг состояния warning
     */
    checkIsStepWarning?: (stepNumber: number) => boolean;

    /**
     * Кастомный метод для управления состоянием шага waiting
     * @param stepNumber - номер шага
     * @return Флаг состояния waiting
     */
    checkIsStepWaiting?: (stepNumber: number) => boolean;

    /**
     * Кастомный метод для управления состоянием шага positive
     * @param stepNumber - номер шага
     * @return Флаг состояния positive
     */
    checkIsStepPositive?: (stepNumber: number) => boolean;

    /**
     * Кастомный метод для установки кастомного индикатора шага
     * @param stepNumber - номер шага
     * @return Объект StepIndicatorProps { className, content, iconColor } или null
     */
    checkIsStepCustom?: (stepNumber: number) => StepIndicatorProps | null;

    /**
     * Обработчик клика на шаг
     * @param stepNumber - номер активного шага
     */
    onChange?: (stepNumber: number) => void;
} & CommonProps;

export const Steps: React.FC<StepsProps> = ({
    className,
    children,
    defaultActiveStep = 1,
    activeStep: activeStepProp,
    isMarkCompletedSteps = true,
    isVerticalAlign = false,
    ordered = true,
    interactive = true,
    fullWidth = false,
    minSpaceBetweenSteps = 24,
    checkIsStepDisabled,
    checkIsStepError,
    checkIsStepCriticalError,
    checkIsStepWarning,
    checkIsStepWaiting,
    checkIsStepPositive,
    checkIsStepCustom,
    onChange,
    dataTestId,
    completedDashColor,
}) => {
    const uncontrolled = activeStepProp === undefined;
    const [activeStep, setActiveStep] = useState(defaultActiveStep);

    const stepsLength = React.Children.count(children);

    const handleStepClick = (stepNumber: number) => {
        if (uncontrolled) {
            setActiveStep(stepNumber);
        }

        if (onChange) {
            onChange(stepNumber);
        }
    };

    if (!stepsLength) return null;

    const visibleActiveStep = uncontrolled ? activeStep : activeStepProp;

    return (
        <div
            className={cn(className, styles.component, {
                [styles.vertical]: isVerticalAlign,
            })}
            data-test-id={dataTestId}
        >
            {React.Children.map(children, (step, index) => {
                const stepNumber = index + 1;
                const isSelected = stepNumber === visibleActiveStep;
                const isStepCompleted = isMarkCompletedSteps && stepNumber < visibleActiveStep;
                const disabled = checkIsStepDisabled ? checkIsStepDisabled(stepNumber) : false;
                const isPositive = checkIsStepPositive ? checkIsStepPositive(stepNumber) : false;
                const isError = checkIsStepError ? checkIsStepError(stepNumber) : false;
                const isCriticalError = checkIsStepCriticalError
                    ? checkIsStepCriticalError(stepNumber)
                    : false;
                const isWarning = checkIsStepWarning ? checkIsStepWarning(stepNumber) : false;
                const isWaiting = checkIsStepWaiting ? checkIsStepWaiting(stepNumber) : false;
                const customStepIndicator = checkIsStepCustom && checkIsStepCustom(stepNumber);
                const isNotLastStep = stepsLength !== stepNumber;
                const isInteractive = !disabled && interactive;

                return (
                    <Step
                        stepNumber={stepNumber}
                        isSelected={isSelected}
                        isStepCompleted={isStepCompleted}
                        disabled={disabled}
                        isPositive={isPositive}
                        isError={isError}
                        isCriticalError={isCriticalError}
                        isWarning={isWarning}
                        isWaiting={isWaiting}
                        customStepIndicator={customStepIndicator}
                        onClick={handleStepClick}
                        ordered={ordered}
                        interactive={isInteractive}
                        isVerticalAlign={isVerticalAlign}
                        isNotLastStep={isNotLastStep}
                        key={stepNumber}
                        fullWidth={fullWidth}
                        minSpaceBetweenSteps={minSpaceBetweenSteps}
                        completedDashColor={completedDashColor}
                        dataTestId={dataTestId}
                    >
                        {step}
                    </Step>
                );
            })}
        </div>
    );
};

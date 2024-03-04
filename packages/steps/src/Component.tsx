import React, { ReactNode, useEffect, useState } from 'react';
import cn from 'classnames';

import { Step } from './components/step';
import { StepIndicatorProps } from './components/step-indicator';

import styles from './index.module.css';

export type StepsProps = {
    /**
     * Дополнительный класс
     */
    className?: string;

    /**
     * Дочерние элементы
     */
    children: ReactNode;

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
     * Управление ориентацией компонента
     * @default false
     */
    isVerticalAlign?: boolean;

    /**
     * Управление отображением номера шага
     */
    ordered?: boolean;

    /**
     * Включение / отключение интерактивности шагов
     */
    interactive?: boolean;

    /**
     * Растягивание шагов на всю ширину блока для вертикальной ориентации
     * @default false
     */
    fullWidth?: boolean;

    /**
     * Минимальное расстояние между шагами
     * @default 24
     */
    minSpaceBetweenSteps?: 8 | 16 | 24;

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

    /**
     * Идентификатор для систем автоматизированного тестирования
     */
    dataTestId?: string;
};

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
    checkIsStepWarning,
    checkIsStepWaiting,
    checkIsStepPositive,
    checkIsStepCustom,
    onChange,
    dataTestId,
}) => {
    const [activeStep, setActiveStep] = useState(activeStepProp || defaultActiveStep);

    const stepsLength = React.Children.count(children);

    useEffect(() => {
        if (activeStepProp) {
            setActiveStep(activeStepProp);
        }
    }, [activeStepProp]);

    const handleStepClick = (stepNumber: number) => {
        setActiveStep(stepNumber);

        if (onChange) {
            onChange(stepNumber);
        }
    };

    if (!stepsLength) return null;

    return (
        <div
            className={cn(className, styles.component, {
                [styles.vertical]: isVerticalAlign,
            })}
            data-test-id={dataTestId}
        >
            {React.Children.map(children, (step, index) => {
                const stepNumber = index + 1;
                const isSelected = stepNumber === activeStep;
                const isStepCompleted = isMarkCompletedSteps && stepNumber < activeStep;
                const disabled = checkIsStepDisabled ? checkIsStepDisabled(stepNumber) : false;
                const isPositive = checkIsStepPositive ? checkIsStepPositive(stepNumber) : false;
                const isError = checkIsStepError ? checkIsStepError(stepNumber) : false;
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
                    >
                        {step}
                    </Step>
                );
            })}
        </div>
    );
};

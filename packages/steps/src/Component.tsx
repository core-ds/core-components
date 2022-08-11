import React, { ReactNode, useCallback, useEffect, useMemo, useState } from 'react';
import cn from 'classnames';

import { Step } from './components/step';

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
    defaultValue?: number;

    /**
     * Активный шаг
     */
    value?: number;

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
     * Обработчик клика на шаг
     * @param stepNumber - номер активного шага
     */
    onChange?: (stepNumber: number) => void;

    /**
     * Идентификатор для систем автоматизированного тестирования
     */
    'data-test-id'?: string;
};

export const Steps: React.FC<StepsProps> = ({
    className,
    children,
    defaultValue = 1,
    value: propValue,
    isMarkCompletedSteps = true,
    isVerticalAlign = false,
    ordered = true,
    checkIsStepDisabled,
    checkIsStepError,
    onChange,
    'data-test-id': dataTestId,
}) => {
    const [value, setValue] = useState(propValue || defaultValue);

    const stepsLength = useMemo(() => {
        return React.Children.count(children);
    }, [children]);

    useEffect(() => {
        if (propValue) {
            setValue(propValue);
        }
    }, [propValue]);

    const handleStepClick = useCallback(
        (stepNumber: number) => {
            setValue(stepNumber);

            if (onChange) {
                onChange(stepNumber);
            }
        },
        [onChange],
    );

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
                const isSelected = stepNumber === value;
                const isStepCompleted = isMarkCompletedSteps && stepNumber < value;
                const disabled = checkIsStepDisabled ? !!checkIsStepDisabled(stepNumber) : false;
                const isError = checkIsStepError ? !!checkIsStepError(stepNumber) : false;
                const isNotLastElement = stepsLength !== stepNumber;

                return (
                    <React.Fragment key={stepNumber}>
                        <Step
                            stepNumber={stepNumber}
                            isSelected={isSelected}
                            isStepCompleted={isStepCompleted}
                            disabled={disabled}
                            isError={isError}
                            onClick={handleStepClick}
                            ordered={ordered}
                        >
                            {step}
                        </Step>
                        {isNotLastElement && (
                            <div
                                className={cn(styles.hyphen, {
                                    [styles.vertical]: isVerticalAlign,
                                    [styles.completed]: isStepCompleted,
                                })}
                            />
                        )}
                    </React.Fragment>
                );
            })}
        </div>
    );
};

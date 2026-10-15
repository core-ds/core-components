import React, { type Reducer, useEffect, useReducer, useRef, useState } from 'react';
import cn from 'classnames';

import { IconButtonDesktop } from '@alfalab/core-components-icon-button/desktop';
import { ScrollbarPrivate } from '@alfalab/core-components-scrollbar-private';
import { isEndScrollPosition, isStartScrollPosition, noop } from '@alfalab/core-components-shared';
import { ChevronLeftCompactSIcon } from '@alfalab/icons-glyph/ChevronLeftCompactSIcon';
import { ChevronRightCompactSIcon } from '@alfalab/icons-glyph/ChevronRightCompactSIcon';

import { Step } from './components/step';
import { type StepIndicatorProps } from './components/step-indicator';
import { type CommonProps } from './types/common-props';

import styles from './index.module.css';

export interface StepsProps extends CommonProps {
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

    /**
     * Скроллящийся контент компонента. Работает только в вертикальной ориентацией
     * @default false
     */
    scrollable?: boolean;
}

type ScrollPosition = {
    isStart: boolean;
    isEnd: boolean;
};

const scrollPositionReducer: Reducer<ScrollPosition | null, Element> = (_, element) => ({
    isStart: isStartScrollPosition(element, 'x'),
    isEnd: isEndScrollPosition(element, 'x'),
});

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
    scrollable = false,
}) => {
    const listNodeRef = useRef<HTMLDivElement>(null);
    const scrollableNodeRef = useRef<HTMLDivElement>(null);
    const contentNodeRef = useRef<HTMLDivElement>(null);
    const uncontrolled = activeStepProp === undefined;
    const [activeStep, setActiveStep] = useState(defaultActiveStep);
    const [showScrollControl, setShowScrollControl] = useState(false);
    const [scrollPosition, setScrollPosition] = useReducer(scrollPositionReducer, null);
    const childrenCount = React.Children.count(children);
    const shouldRender = childrenCount > 0;

    const scrollToStart = () => {
        const scrollableNode = scrollableNodeRef.current;

        if (scrollableNode) {
            scrollableNode.scrollTo({
                left: 0,
                behavior: 'smooth',
            });
        }
    };

    const scrollToEnd = () => {
        const scrollableNode = scrollableNodeRef.current;

        if (scrollableNode) {
            scrollableNode.scrollTo({
                left: scrollableNode.scrollWidth - scrollableNode.clientWidth,
                behavior: 'smooth',
            });
        }
    };

    useEffect(() => {
        const contentNode = contentNodeRef.current;
        const listNode = listNodeRef.current;

        if (shouldRender && !isVerticalAlign && scrollable && contentNode && listNode) {
            const resiveObserverCallback = () => {
                setShowScrollControl(listNode.scrollWidth > contentNode.clientWidth);

                const scrollableNode = scrollableNodeRef.current;

                if (scrollableNode) {
                    setScrollPosition(scrollableNode);
                }
            };

            const ro = new ResizeObserver(resiveObserverCallback);

            ro.observe(contentNode);
            ro.observe(listNode);

            return () => {
                ro.disconnect();
            };
        }

        return noop;
    }, [isVerticalAlign, scrollable, shouldRender]);

    const handleStepClick = (stepNumber: number) => {
        if (uncontrolled) {
            setActiveStep(stepNumber);
        }

        if (onChange) {
            onChange(stepNumber);
        }
    };

    if (!shouldRender) return null;

    const visibleActiveStep = uncontrolled ? activeStep : activeStepProp;

    const stepsRender = (
        <div
            ref={listNodeRef}
            data-test-id={dataTestId}
            className={cn(className, styles.component, { [styles.vertical]: isVerticalAlign })}
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
                const customStepIndicator = checkIsStepCustom?.(stepNumber);
                const isNotLastStep = childrenCount !== stepNumber;
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

    if (isVerticalAlign || !scrollable) {
        return stepsRender;
    }

    const handleScroll: React.UIEventHandler<HTMLDivElement> = (event) => {
        setScrollPosition(event.currentTarget);
    };

    return (
        <ScrollbarPrivate
            className={styles.scrollbar}
            scrollableNodeProps={{
                ref: scrollableNodeRef,
                onScroll: handleScroll,
            }}
            contentNodeProps={{
                ref: contentNodeRef,
                className: styles.content,
            }}
        >
            {stepsRender}
            <div className={cn(styles.scrollbarControl, { [styles.show]: showScrollControl })}>
                <IconButtonDesktop
                    size={40}
                    icon={ChevronLeftCompactSIcon}
                    onClick={scrollToStart}
                    disabled={scrollPosition?.isStart}
                />
                <IconButtonDesktop
                    size={40}
                    icon={ChevronRightCompactSIcon}
                    onClick={scrollToEnd}
                    disabled={scrollPosition?.isEnd}
                />
            </div>
        </ScrollbarPrivate>
    );
};
